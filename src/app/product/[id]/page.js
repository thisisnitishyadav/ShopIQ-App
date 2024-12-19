"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../../components/Navbar";
import ProductCarousel from "../../../components/ProductCarousel";
import styles from "../../../styles/ProductDetail.module.css";

async function fetchProductById(id) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product details");
  return res.json();
}

export default function ProductDetailPage() {
  const params = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const fetchedProduct = await fetchProductById(params.id);
        setProduct(fetchedProduct);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [params.id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.left}>
          <ProductCarousel images={product.images} />
        </div>
        <div className={styles.right}>
          <h1 className={styles.title}>{product.title}</h1>
          <h2 className={styles.description}>{product.description}</h2>
          <p className={styles.price}>₹{product.price}</p>
          <span className={styles.rating}>Ratings: {product.rating} ⭐</span>
          <button className={styles.addToCart}>Add to Cart</button>
        </div>
      </div>
    </>
  );
}
