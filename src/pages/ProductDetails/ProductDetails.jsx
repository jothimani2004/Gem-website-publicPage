import { useParams, Link } from "react-router-dom";
import styles from "./ProductDetails.module.css";
import { useEffect, useState } from "react";
import GemGallery from "../../Components/gallery/ImageGallery/GemGallery";
import ProductInfo from "../../Components/gallery/GalleryInfo/ProductInfo";
import RelatedGems from "../../Components/gem/RelatedGems/RelatedGems";
import api from "../../services/api";
import Loader from "../../Components/common/Loader/Loader";

function ProductDetails() {
  const { category, gemName, id } = useParams();
  
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchGemDetails = async () => {
      try {
        const response = await api.get(`/public/each_gem_detail/based_on_id/${id}`);
        
        if (response.data && response.data.success && response.data.data.data.length > 0) {
          const gemData = response.data.data.data[0];
          console.log(gemData);
          
        
          
          setProduct({
            name: `${gemName} (${gemData.lot_number || id})`,
            price: "Enquire for Price",
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
             // fallback placeholder
             mappedImages.push("https://via.placeholder.com/600x400?text=No+Image+Available");
          }
          setImages(mappedImages);
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

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link to="/" style={{textTransform: "capitalize"}}>{category}</Link> / <Link to={`/${category}/${gemName}`}>{gemName}</Link> / <span>Lot #{id}</span>
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
            src={product.certificate}
            title="Gem Certificate"
            className={styles.pdfViewer}
          />

          {/* Download Button */}
          <a
            href={product.certificate}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.downloadBtn}
          >
            Download Certificate
          </a>
             <p className={styles.certificateFallback}>
              <strong>Certification:</strong> After Purchasing I will Make GFCO Thailand
            </p>

        </div>
      )}

      {/* Bottom Section */}
      <div className={styles.bottom}>
        <RelatedGems />
      </div>
    </div>
  );
}

export default ProductDetails;
