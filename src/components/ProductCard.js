import Link from "next/link";
import styles from "../styles/ProductCard.module.css";

const ProductCard = ({ product }) => {
  return (
    <div className={styles.card}>
      <Link href={`/product/${product.id}`}>
        <img src={product.thumbnail} alt={product.title} className={styles.image} />
        <div className={styles.details}>
          <h3>{product.title}</h3>
          <p>₹{product.price}</p>
          <span>Ratings: {product.rating} ⭐ </span>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

