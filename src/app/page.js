"use client"; // Ensures this is a client-side component

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import styles from "../styles/Home.module.css";

 const metadata = {
  title: "Product Listing",
  description: "Browse our product catalog",
};

// Fetch products function
async function fetchProducts(limit = 12, skip = 0) {
  const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default function HomePage() {
  const [products, setProducts] = useState([]); // Initialize as empty array
  const [offset, setOffset] = useState(12); // Track pagination
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error handling state

  // Fetch initial products on component mount
  useEffect(() => {
    const loadInitialProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data.products);
      } catch (err) {
        setError("Failed to load products");
      }
    };

    loadInitialProducts();
  }, []);

  // Load more products
  const loadMoreProducts = async () => {
    setLoading(true);
    try {
      const res = await fetchProducts(12, offset);
      setProducts((prevProducts) => [...prevProducts, ...res.products]);
      setOffset((prevOffset) => prevOffset + 12);
    } catch (err) {
      setError("Failed to load more products");
    } finally {
      setLoading(false);
    }
  };

  // Render
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1>Product Listing</h1>
        {error && <p className="error">{error}</p>}
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <button onClick={loadMoreProducts} className={styles.showMore}>
            Show More
          </button>
        )}
      </div>
    </>
  );
}
