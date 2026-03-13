import { useParams } from "react-router-dom";
import styles from "./ProductDetails.module.css";
import { useEffect } from "react";
import GemGallery from "../../Components/gallery/ImageGallery/GemGallery";
import ProductInfo from "../../Components/gallery/GalleryInfo/ProductInfo";
import gem1 from "../../assets/images/gem1 (1).png";
import gem2 from "../../assets/images/gem2.png";
import gem3 from "../../assets/images/gem3.png";
import gem4 from "../../assets/images/gem4.png";
import gem5 from "../../assets/images/gem5.png";
import gem6 from "../../assets/images/gem6.png";
import gem7 from "../../assets/images/gem7.mp4";
import gem8 from "../../assets/images/gem8.png";
import gem9 from "../../assets/images/gem9.png";
import Gemgrid from "../../Components/gem/GemGrid/Gemgrid";
import RelatedGems from "../../Components/gem/RelatedGems/RelatedGems";
function ProductDetails() {
  const { category, gemName, id } = useParams();

  const images=[gem1,gem2,gem3, gem4, gem5, gem6, gem7, gem8, gem9];
  const product = {
    name: "Natural Blue Sapphire",
    price: 45000,
    shape: "Oval",
    weight: "2.5 Carat",
    color: "Royal Blue",
    origin: "Ceylon",
    description:
      "Premium quality natural sapphire sourced from Sri Lanka."
  };

  useEffect(() => {
    
    console.log("hello from product show page");

  },[]);





  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        {category} / {gemName} / Lot #{id}
      </div>

      {/* Main Section */}
      <div className={styles.main}>
        <div className={styles.gallery}>
        
          
            <GemGallery media= {images} />
          
         
        </div>

        <div className={styles.info}>
          <h3>Gem Info</h3>


          <ProductInfo product={product} />
          <p>
            <strong>Certification:</strong> After Purchasing I will Make GFCO Thailand
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className={styles.bottom}>
      <RelatedGems />

        
      </div>
    </div>
  );
}

export default ProductDetails;
