"use client"
import Navbar from "../../../components/Navbar";
import ProductCarousel from "../../../components/ProductCarousel";
import styles from "../../../styles/ProductDetail.module.css";

async function fetchProductById(id) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product details');
  return res.json();
}

export default async function ProductDetailPage({ params }) {
  const product = await fetchProductById(params.id);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.left}>
          <ProductCarousel images={product.images} />
        </div>
        <div className={styles.right}>
          <h1>{product.title}</h1>
          <p>₹{product.price}</p>
          <p>{product.description}</p>
          <span>⭐ {product.rating}</span>
          <button className={styles.addToCart}>Add to Cart</button>
        </div>
      </div>
    </>
  );
}
