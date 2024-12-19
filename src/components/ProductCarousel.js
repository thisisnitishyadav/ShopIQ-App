import styles from "../styles/ProductCarousel.module.css";

const ProductCarousel = ({ images }) => {
  return (
    <div className={styles.carousel}>
      {images.map((image, index) => (
        <div key={index} className={styles.slide}>
          <img src={image} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default ProductCarousel;
