import styles from "./ProductInfo.module.css";

const ProductInfo = ({ product }) => {
  return (
    <div className={styles.info}>

      <h1 className={styles.title}>{product.name}</h1>

      <p className={styles.price}>
       
      </p>

      <div className={styles.specs}>
        <p><strong>Shape:</strong> {product.shape}</p>
        <p><strong>Weight:</strong> {product.weight}</p>
        <p><strong>Color:</strong> {product.color}</p>
        <p><strong>Origin:</strong> {product.origin}</p>
      </div>

      <p className={styles.description}>
        {product.description}
      </p>


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

        </div>
      )}
    
    </div>
  );
};

export default ProductInfo;
