import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Card = styled.div`
  background: #fff;
  border: 2px solid #000;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    border: 1px solid #000;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 24rem;
  object-fit: cover;
  border-bottom: 2px solid #000;

  @media (max-width: 768px) {
    height: 14rem;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
`;

const Text = styled.p`
  font-family: "Noto Sans", serif;: Arial, sans-serif;
  padding: 0.3rem;
  color: #000;
  font-size: ${({ size }) => size || "1rem"};
  font-weight: ${({ bold }) => (bold ? "bold" : "normal")};

  @media (max-width: 768px) {
    font-size: ${({ size }) => (size ? "0.7rem" : "0.8rem")};
  }
`;

const ProductCard = ({ product }) => {
  return (
    <Card>
      <Link to={`/product/${product._id}`}>
        <ProductImage src={product.img} alt={product.title} loading="lazy" />
        <Text bold size="1.1rem">
          {product.title}
        </Text>
        <PriceContainer>
          <Text style={{ color: "#597445" }} bold>
            ₹{product.price}
          </Text>
        </PriceContainer>
      </Link>
    </Card>
  );
};

export default ProductCard;
