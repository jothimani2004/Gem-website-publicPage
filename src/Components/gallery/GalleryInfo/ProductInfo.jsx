import { FaWhatsapp } from "react-icons/fa";
import styles from "./ProductInfo.module.css";

const ProductInfo = ({ product }) => {
  const isValidSpec = (value) => {
    if (!value) return false;
    const lowerValue = String(value).toLowerCase();
    return !lowerValue.includes("null") && lowerValue !== "n/a";
  };

  const phoneNumber = "66948210195";
  const lotText = product?.lotNumber ? ` (Lot #${product.lotNumber})` : "";
  const weightText = product?.weight ? ` [${product.weight}]` : "";
  const priceText = product?.price != null && product.price !== "Enquire for Price"
    ? ` - $${Number(product.price).toLocaleString()}`
    : "";
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const defaultMsg = `Hello Aimpluss Gems! I'm interested in ${product?.name || "this gemstone"}${lotText}${weightText}${priceText}.\nIs this gemstone currently available?\nLink: ${pageUrl}`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMsg)}`;

  return (
    <div className={styles.info}>
      <h1 className={styles.title}>
        {product.name.split(" (")[0]}
        {product.lotNumber && (
          <span className={styles.lotNumber}> ({product.lotNumber})</span>
        )}
      </h1>

      {/* 💰 PRICE */}
      <div className={styles.priceBlock}>
        <span className={styles.priceLabel}>Price</span>
        {product.price != null && product.price !== "Enquire for Price" ? (
          <span className={styles.priceValue}>
            ${Number(product.price).toLocaleString()}
          </span>
        ) : (
          <span className={styles.priceEnquire}>Enquire for Price</span>
        )}
      </div>

      {/* 💬 WHATSAPP INQUIRY CTA */}
      <div className={styles.actionBlock}>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.inquireBtn}
          aria-label={`Inquire about ${product.name} on WhatsApp`}
        >
          <FaWhatsapp className={styles.inquireIcon} />
          <span>Inquire via WhatsApp</span>
        </a>
        <div className={styles.trustBadges}>
          <span className={styles.trustItem}>
            <i className="fa-solid fa-check"></i> 100% Natural & Certified
          </span>
          <span className={styles.trustItem}>
            <i className="fa-solid fa-plane"></i> Worldwide Express Shipping
          </span>
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.specsGrid}>
        {isValidSpec(product.shape) && (
          <div className={styles.specCard}>
            <span className={styles.specLabel}>Shape</span>
            <span className={styles.specValue}>{product.shape}</span>
          </div>
        )}
        {isValidSpec(product.weight) && (
          <div className={styles.specCard}>
            <span className={styles.specLabel}>Weight</span>
            <span className={styles.specValue}>{product.weight}</span>
          </div>
        )}
        {isValidSpec(product.color) && (
          <div className={styles.specCard}>
            <span className={styles.specLabel}>Color</span>
            <span className={styles.specValue}>{product.color}</span>
          </div>
        )}
        {isValidSpec(product.origin) && (
          <div className={styles.specCard}>
            <span className={styles.specLabel}>Origin</span>
            <span className={styles.specValue}>{product.origin}</span>
          </div>
        )}
      </div>

      <div className={styles.divider}></div>

      <div className={styles.descriptionBox}>
        <h4 className={styles.descTitle}>Description</h4>
        <p className={styles.descriptionText}>
          {product.description}
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;
