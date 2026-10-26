import { useParams, Link, useNavigate } from "react-router-dom";
import styles from "./ProductDetails.module.css";
import { useEffect, useState } from "react";
import GemGallery from "../../Components/gallery/ImageGallery/GemGallery";
import ProductInfo from "../../Components/gallery/GalleryInfo/ProductInfo";
import RelatedGems from "../../Components/gem/RelatedGems/RelatedGems";
import api from "../../services/api";
import Loader from "../../Components/common/Loader/Loader";
import fallbackGem from "../../assets/images/gem2.png";
import SEO from "../../Components/common/SEO/SEO";
import { CLOUDFRONT_URL } from "../../utils/constants";

function ProductDetails({ category: propCategory }) {
  const { gemName: paramGemName, id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  // Resolved gemName & category derived from backend data (gem_id)
  const [resolvedCategory, setResolvedCategory] = useState(propCategory || "Precious");
  const [resolvedGemName, setResolvedGemName] = useState(
    paramGemName ? decodeURIComponent(paramGemName.replace(/\+/g, " ")) : ""
  );

  const handleDownloadCertificate = async (e) => {
    e.preventDefault();
    if (!product?.certificate || isDownloading) return;

    setIsDownloading(true);

    const activeGemName = resolvedGemName || paramGemName || "Gem";
    const cleanGemName = activeGemName.replace(/[^a-zA-Z0-9\s-]/g, "").trim();
    const lotSuffix = product?.lotNumber ? `-${product.lotNumber}` : (id ? `-${id}` : "");
    const finalFileName = `${cleanGemName}${lotSuffix}-Certificate.pdf`;

    try {
      const response = await fetch(product.certificate);
      if (!response.ok) throw new Error("Failed to fetch certificate file");

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", finalFileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Direct download failed, attempting fallback:", error);
      const link = document.createElement("a");
      link.href = product.certificate;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("download", finalFileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    let isMounted = true;

    const fetchGemAndValidate = async () => {
      try {
        setLoading(true);

        const [gemDetailRes, typesRes] = await Promise.all([
          api.get(`/public/each_gem_detail/based_on_id/${id}`),
          api.get("/public/get_gem_types"),
        ]);

        if (!isMounted) return;

        if (
          !gemDetailRes.data ||
          !gemDetailRes.data.success ||
          !gemDetailRes.data.data?.data?.length
        ) {
          navigate("/404-not-found", { replace: true });
          return;
        }

        const gemData = gemDetailRes.data.data.data[0];

        // 1. Resolve true gem name and category from gemData.gem_id
        let trueGemName = paramGemName ? decodeURIComponent(paramGemName.replace(/\+/g, " ")) : "";
        let trueCategory = propCategory || "Precious";

        if (typesRes.data?.result?.gems) {
          const allDivisions = typesRes.data.result.gems;
          for (const div of allDivisions) {
            const match = div.gems?.find(
              (g) => (g.gemId ?? g.gem_id ?? g.id) === gemData.gem_id
            );
            if (match) {
              trueGemName = match.gemName;
              const cleanDiv = (div.division || "").toLowerCase().replace(/[\s-_]/g, "");
              trueCategory = cleanDiv === "precious" ? "Precious" : "Semi-Precious";
              break;
            }
          }
        }

        setResolvedGemName(trueGemName);
        setResolvedCategory(trueCategory);

        // 2. Synchronize URL if gemName or category in the URL doesn't match the actual gem
        const urlGemNameDecoded = paramGemName ? decodeURIComponent(paramGemName.replace(/\+/g, " ")) : "";
        const urlCatDecoded = propCategory || "";

        if (
          trueGemName &&
          (urlGemNameDecoded.toLowerCase() !== trueGemName.toLowerCase() ||
           urlCatDecoded.toLowerCase() !== trueCategory.toLowerCase())
        ) {
          navigate(`/${trueCategory}/${encodeURIComponent(trueGemName)}/${id}`, {
            replace: true,
          });
        }

        // 3. Set product state with accurate gem name
        setProduct({
          name: `${trueGemName} (${gemData.lot_number})`,
          lotNumber: gemData.lot_number,
          price: gemData.price != null ? gemData.price : "Enquire for Price",
          shape: gemData.shape_name || "N/A",
          weight: gemData.crt ? `${gemData.crt} Carat` : "N/A",
          color: gemData.color_name || "N/A",
          origin: "Verified Source",
          description: gemData.description || `Beautiful natural ${trueGemName}.`,
          certificate:
            gemData.pdf && gemData.pdf.file
              ? `${CLOUDFRONT_URL}/${gemData.pdf.file}`
              : null,
        });

        let mappedImages = [];
        if (gemData.images && Array.isArray(gemData.images)) {
          mappedImages = gemData.images.map((img) => `${CLOUDFRONT_URL}/${img.file}`);
        }
        if (gemData.video && gemData.video.file) {
          mappedImages.push(`${CLOUDFRONT_URL}/${gemData.video.file}#video`);
        }
        if (mappedImages.length === 0) {
          mappedImages.push(fallbackGem);
        }
        setImages(mappedImages);
      } catch (error) {
        console.error("Failed to load gemstone specifications:", error);
        if (isMounted) {
          navigate("/404-not-found", { replace: true });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchGemAndValidate();

    return () => {
      isMounted = false;
    };
  }, [id, paramGemName, propCategory, navigate]);

  if (loading) {
    return <Loader text="Retrieving Gem Specifications" fullScreen={true} />;
  }

  if (!product) {
    return (
      <div className={styles.page} style={{ textAlign: "center", padding: "50px" }}>
        Gem not found.
      </div>
    );
  }

  const currentGemName = resolvedGemName || (paramGemName ? decodeURIComponent(paramGemName.replace(/\+/g, " ")) : "Gemstone");
  const currentCategory = resolvedCategory || propCategory || "Precious";
  const encodedGemName = encodeURIComponent(currentGemName);

  const productTitle = `${currentGemName} (Lot #${product.lotNumber}) — ${product.weight} Natural ${currentGemName}`;
  const productDescription = `Buy natural earth-mined ${currentGemName} (Lot #${product.lotNumber}). Weight: ${product.weight}, Shape: ${product.shape}, Color: ${product.color}. Certified loose gemstone from Aimpluss Gems.`;
  const primaryImage = images && images.length > 0 && !images[0].endsWith("#video") ? images[0] : fallbackGem;

  const productSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "name": product.name,
        "image": images.filter((img) => typeof img === "string" && !img.endsWith("#video")),
        "description": product.description || productDescription,
        "sku": product.lotNumber,
        "mpn": product.lotNumber,
        "brand": {
          "@type": "Brand",
          "name": "Aimpluss Gems",
        },
        "offers": {
          "@type": "Offer",
          "url": `https://aimplussgems.com/${currentCategory}/${encodedGemName}/${id}`,
          "priceCurrency": "USD",
          "price": typeof product.price === "number" ? product.price : 0,
          "priceValidUntil": "2030-12-31",
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition",
        },
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://aimplussgems.com/",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": currentCategory,
            "item": `https://aimplussgems.com/${currentCategory}`,
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": currentGemName,
            "item": `https://aimplussgems.com/${currentCategory}/${encodedGemName}`,
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": product.lotNumber,
            "item": `https://aimplussgems.com/${currentCategory}/${encodedGemName}/${id}`,
          },
        ],
      },
    ],
  };

  return (
    <div className={styles.page}>
      <SEO
        title={productTitle}
        description={productDescription}
        keywords={`natural ${currentGemName}, certified ${currentGemName}, ${currentGemName} lot ${product.lotNumber}, ${product.weight} ${currentGemName}, ${product.color} ${currentGemName}, loose ${currentGemName}`}
        canonical={`https://aimplussgems.com/${currentCategory}/${encodedGemName}/${id}`}
        ogImage={primaryImage}
        ogType="product"
        schema={productSchema}
      />

      {/* 💎 BEAUTIFUL BREADCRUMB */}
      <div className={styles.breadcrumb}>
        <Link to="/" className={styles.link}>
          Home
        </Link>
        <span className={styles.separator}>›</span>
        <Link to={`/${currentCategory}`} className={styles.link}>
          {currentCategory}
        </Link>
        <span className={styles.separator}>›</span>
        <Link to={`/${currentCategory}/${encodedGemName}`} className={styles.link}>
          {currentGemName}
        </Link>
        <span className={styles.separator}>›</span>
        <span className={styles.current}>{product.lotNumber}</span>
      </div>

      {/* Main Section */}
      <div className={styles.main}>
        <div className={styles.gallery}>
          <GemGallery media={images} />
        </div>

        <div className={styles.info}>
          <h3 className={styles.subheading}>Gem Info</h3>
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Certificate Section */}
      {product.certificate && (
        <div className={styles.certificateSection}>
          <h3 className={styles.certTitle}>Certificate</h3>

          {/* PDF Viewer */}
          <iframe
            src={`https://docs.google.com/gview?url=${encodeURIComponent(
              product.certificate
            )}&embedded=true`}
            title="Gem Certificate"
            className={styles.pdfViewer}
          />

          {/* Download Button */}
          <button
            type="button"
            onClick={handleDownloadCertificate}
            disabled={isDownloading}
            className={styles.downloadBtn}
          >
            {isDownloading ? "Downloading..." : "Download Certificate"}
          </button>
        </div>
      )}

      {/* Bottom Section */}
      <div className={styles.bottom}>
        <RelatedGems category={currentCategory} gemName={currentGemName} id={id} />
      </div>
    </div>
  );
}

export default ProductDetails;
