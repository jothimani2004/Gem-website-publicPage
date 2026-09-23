import { useParams, Link } from "react-router-dom";
import styles from "./ProductDetails.module.css";
import { useEffect, useState } from "react";
import GemGallery from "../../Components/gallery/ImageGallery/GemGallery";
import ProductInfo from "../../Components/gallery/GalleryInfo/ProductInfo";
import RelatedGems from "../../Components/gem/RelatedGems/RelatedGems";
import api from "../../services/api";
import Loader from "../../Components/common/Loader/Loader";
import fallbackGem from "../../assets/images/gem2.png";
import SEO from "../../Components/common/SEO/SEO";



function ProductDetails({category}) {
  const {  gemName, id } = useParams();
  console.log("category", category);
  console.log("gemName", gemName);
  console.log("id", id);
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadCertificate = async (e) => {
    e.preventDefault();
    if (!product?.certificate || isDownloading) return;

    setIsDownloading(true);

    try {
      const response = await fetch(product.certificate);
      if (!response.ok) throw new Error("Failed to fetch certificate file");

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      // Extract file name from URL or create a default one
      const rawFileName = product.certificate.split("/").pop() || "";
      const cleanFileName = rawFileName ? rawFileName.split("?")[0] : "";
      const fallbackName = `${gemName || "Gem"}-Certificate.pdf`;
      const finalFileName = cleanFileName
        ? (cleanFileName.toLowerCase().endsWith(".pdf") ? cleanFileName : `${cleanFileName}.pdf`)
        : fallbackName;

      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", finalFileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Direct download failed, attempting fallback:", error);
      // Fallback: trigger direct link download
      const link = document.createElement("a");
      link.href = product.certificate;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("download", `${gemName || "Gem"}-Certificate.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setIsDownloading(false);
    }
  };

  // Route Validation (Non-blocking)
  useEffect(() => {
    const validateRoute = async () => {
      try {
        const typeResponse = await api.get("/public/get_gem_types");
        if (typeResponse.data?.result?.gems) {
          const allDivisions = typeResponse.data.result.gems;
          const divisionMatch = allDivisions.find(
            (div) => 
              div.division.toLowerCase() === category.toLowerCase() || 
              div.division.toLowerCase() === category.toLowerCase().replace("-", "")
          );

          if (divisionMatch && divisionMatch.gems) {
            const isValidGem = divisionMatch.gems.some(
              (g) => g.gemName.toLowerCase() === gemName.toLowerCase()
            );

            if (!isValidGem) {
              window.location.replace("/404-not-found");
            }
          } else {
            window.location.replace("/404-not-found");
          }
        }
      } catch (error) {
        console.error("Failed to validate route:", error);
      }
    };
    validateRoute();
  }, [category, gemName]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchGemDetails = async () => {
      try {
        const response = await api.get(`/public/each_gem_detail/based_on_id/${id}`);
        
        if (response.data && response.data.success && response.data.data.data.length > 0) {
          const gemData = response.data.data.data[0];
          console.log(gemData);
          
          setProduct({
            name: `${gemName} (${gemData.lot_number})`,
            lotNumber: gemData.lot_number,
            price: gemData.price != null ? gemData.price : "Enquire for Price",
            shape: gemData.shape_name || "N/A",
            weight: gemData.crt ? `${gemData.crt} Carat` : "N/A",
            color: gemData.color_name || "N/A",
            origin: "Verified Source",
            description: gemData.description || `Beautiful natural ${gemName}.`,
            certificate: gemData.pdf && gemData.pdf.file ? `https://d1wugj5ru4kx2.cloudfront.net/${gemData.pdf.file}` : null
          });

          let mappedImages = [];
          if (gemData.images && Array.isArray(gemData.images)) {
             mappedImages = gemData.images.map(img => `https://d1wugj5ru4kx2.cloudfront.net/${img.file}`);
          }
          if (gemData.video && gemData.video.file) {
             mappedImages.push(`https://d1wugj5ru4kx2.cloudfront.net/${gemData.video.file}#video`);
          }
          if (mappedImages.length === 0) {
             mappedImages.push(fallbackGem);
          }
          setImages(mappedImages);
        } else {
           window.location.replace("/404-not-found");
        }
      } catch (error) {
        console.error("Failed to fetch gem details:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGemDetails();

  }, [id, gemName]);

  if (loading) {
     return <Loader text="Retrieving Gem Specifications" fullScreen={true} />;
  }

  if (!product) {
     return <div className={styles.page} style={{textAlign:"center", padding:"50px"}}>Gem not found.</div>;
  }

  const productTitle = `${gemName} (Lot #${product.lotNumber}) — ${product.weight} Natural ${gemName}`;
  const productDescription = `Buy natural earth-mined ${gemName} (Lot #${product.lotNumber}). Weight: ${product.weight}, Shape: ${product.shape}, Color: ${product.color}. Certified loose gemstone from Aimpluss Gems.`;
  const primaryImage = images && images.length > 0 && !images[0].endsWith("#video") ? images[0] : fallbackGem;

  const productSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "name": product.name,
        "image": images.filter(img => typeof img === "string" && !img.endsWith("#video")),
        "description": product.description || productDescription,
        "sku": product.lotNumber,
        "mpn": product.lotNumber,
        "brand": {
          "@type": "Brand",
          "name": "Aimpluss Gems"
        },
        "offers": {
          "@type": "Offer",
          "url": `https://aimplussgems.com/${category}/${gemName}/${id}`,
          "priceCurrency": "USD",
          "price": typeof product.price === "number" ? product.price : 0,
          "priceValidUntil": "2030-12-31",
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://aimplussgems.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": category,
            "item": `https://aimplussgems.com/${category}`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": gemName,
            "item": `https://aimplussgems.com/${category}/${gemName}`
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": product.lotNumber,
            "item": `https://aimplussgems.com/${category}/${gemName}/${id}`
          }
        ]
      }
    ]
  };

  return (
    <div className={styles.page}>
      <SEO
        title={productTitle}
        description={productDescription}
        keywords={`natural ${gemName}, certified ${gemName}, ${gemName} lot ${product.lotNumber}, ${product.weight} ${gemName}, ${product.color} ${gemName}, loose ${gemName}`}
        canonical={`https://aimplussgems.com/${category}/${gemName}/${id}`}
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
               <Link to={`/${category}`} className={styles.link}>{category}</Link>
              <span className={styles.separator}>›</span>
               <Link to={`/${category}/${gemName}`} className={styles.link}>{gemName}</Link>
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
            src={`https://docs.google.com/gview?url=${encodeURIComponent(product.certificate)}&embedded=true`}
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
             {/* <p className={styles.certificateFallback}>
              <strong>Certification:</strong> After Purchasing I will Make GFCO Thailand
            </p> */}

        </div>
      )}

      {/* Bottom Section */}
      <div className={styles.bottom}>
        <RelatedGems category={category} />
      </div>
    </div>
  );
}

export default ProductDetails;
