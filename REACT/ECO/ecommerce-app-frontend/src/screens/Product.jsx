import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const ProductContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const ProductImage = styled.img`
  object-fit: cover;
  height: 400px;
  width: 300px;
  @media (max-width: 768px) {
    height: 250px;
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
`;

const Title = styled.h1`
  font-family: "Noto Sans", serif;
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  padding: 0.5rem;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Price = styled.p`
  font-family: "Noto Sans", serif;
  font-size: 1.8rem;
  color: black;
  font-weight: bold;
  padding: 0.5rem;
`;

const Description = styled.p`
  font-family: "Noto Sans", serif;
  font-size: 1rem;
  line-height: 1.5;
  padding: 1rem;
  white-space: pre-wrap;
`;

const Button = styled.button`
  background: white;
  color: black;
  width: 300px;
  border: 2px solid black;
  padding: 1rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  text-transform: uppercase;
  font-weight: bold;

  &:hover {
    background: black;
    color: white;
  }
`;

const Button2 = styled.button`
  background: white;
  color: black;
  width: 300px;
  border: 2px solid black;
  padding: 1rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  text-transform: uppercase;
  font-weight: bold;

  &:hover {
    background: rgb(152, 17, 35);
    color: white;
  }
`;

const SizeContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
`;

const SizeButton = styled.button`
  padding: 0.5rem 1rem;
  border: 2px solid black;
  background: ${(props) => (props.selected ? "black" : "white")};
  color: ${(props) => (props.selected ? "white" : "black")};
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1rem;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: black;
    color: white;
  }
`;

const CategoryTags = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: #f0f0f0;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.9rem;
  text-transform: capitalize;
`;

const Product = () => {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const { id } = useParams();
  const { addToCart } = useAuth();

  const navigate = useNavigate();

  const addItemToCart = async (itemData) => {
    try {
      const response = await axios.post("http://localhost:3000/api/cart", itemData);
      console.log("Item added:", response.data);
    } catch (error) {
      console.error("Error adding item:", error.response.data);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size before adding to cart.");
      return;
    }
    const cartItem = {
      ...product,
      size: selectedSize,
    };
    addToCart(cartItem);
    addItemToCart(cartItem);
    navigate("/cart");
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <ProductContainer>

        <ImageContainer>
          <ProductImage
            src={product.img || "/placeholder-image.png"}
            alt={product.title || "Product Image"}
          />
        </ImageContainer>
        <InfoContainer>
          <Title>{product.title || "No title available"}</Title>
          <Price>₹{product.price || "N/A"}</Price>
          <Description>
            {product.desc || "No description available"}
          </Description>
          <div>
            <h3>Available Sizes:</h3>
            <SizeContainer>
              {product.size &&
                product.size.map((size) => (
                  <SizeButton
                    key={size}
                    selected={selectedSize === size}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </SizeButton>
                ))}
            </SizeContainer>
          </div>
          <div>
            <h3>Categories:</h3>
            <CategoryTags>
              {product.category &&
                product.category.map((cat) => <Tag key={cat}>{cat}</Tag>)}
            </CategoryTags>
          </div>
          <Button onClick={handleAddToCart} disabled={!selectedSize}>
            {selectedSize ? "Add to Cart" : "Select a Size"}
          </Button>
        </InfoContainer>
      </ProductContainer>
    </>
  );
};

export default Product;