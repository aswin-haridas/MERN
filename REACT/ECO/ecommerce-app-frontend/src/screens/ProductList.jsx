import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Toaster } from "react-hot-toast";

const categories = {
  men: ["All", "cargos", "casual", "formal", "jeans", "traditional"],
  women: [
    "All",
    "traditional tops",
    "formal tops",
    "casual tops",
    "traditional dresses",
    "formal dresses",
    "casual dresses",
    "skirts",
    "pants",
    "jeans",
  ],
};

const Container = styled.div`
  margin: 0 auto;
  background: #fff;
  border: 2px solid #000;
`;

const ProductListContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Sidebar = styled.div`
  padding: 1rem;
  border-right: 2px solid #000;
  min-width: 200px;
  background: #f9f9f9;

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 2px solid #000;
    width: 100%;
    overflow-x: auto;
    position: static;
  }

  h2 {
    font-size: 1.2rem;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 0.5rem;

      a {
        color: #000;
        text-decoration: none;
        font-size: 0.9rem;

        &:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          font-size: 0.8rem;
        }
      }
    }
  }
`;
  const ProductList = () => {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const gender = queryParams.get("gender")?.toLowerCase() || "";
    const category = queryParams.get("category")?.toLowerCase() || "";

    useEffect(() => {
      const controller = new AbortController();
      const fetchProducts = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/products", {
            signal: controller.signal,
          });
          let filteredProducts = response.data;

          if (gender) {
            filteredProducts = filteredProducts.filter((product) =>
              product.category.includes(gender)
            );
          }

          if (category && category !== "all") {
            filteredProducts = filteredProducts.filter((product) =>
              product.category.includes(category)
            );
          }

          setProducts(filteredProducts);

        } catch (error) {
          if (error.name === "AbortError") return;
          console.error("Error fetching products:", error);
        }
      };
      fetchProducts();
      return () => controller.abort();
    }, [gender, category]);

    const sidebarContent = useMemo(
      () =>
        Object.entries(categories).map(([gender, items]) => (
          <div key={gender}>
            <h2>{gender} Categories</h2>
            <ul>
              {items.map((category) => (
                <li key={category}>
                  <Link to={`/products?gender=${gender}&category=${category}`}>
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )),
      []
    );

    const productCards = useMemo(
      () =>
        products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        )),
      [products]
    );

    return (
      <>
        <Header />
        <Toaster />
        <Container>
          <ProductListContainer>
            <Sidebar>{sidebarContent}</Sidebar>
            <Grid>{productCards}</Grid>
          </ProductListContainer>
        </Container>
      </>
    );
  };
export default ProductList;
