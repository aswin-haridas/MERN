  import { useState, useEffect } from "react";
  import axios from "axios";
  import ProductCard from "./ProductCard";
  import styled from "styled-components";

  const FeaturedContainer = styled.div`
    padding: 2rem;
    
    h2 {
      text-align: center;
      margin-bottom: 2rem;
    }

    .featured-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      padding: 1rem;
    }
  `;

  const Featured = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const res = await axios.get("http://localhost:3000/api/products");
          setProducts(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchProducts();
    }, []);


    const featured = products
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);

    return (
      <FeaturedContainer>
        <h2>Featured Products</h2>
        <div className="featured-grid">
          {featured.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </FeaturedContainer>
    );
  };

  export default Featured;