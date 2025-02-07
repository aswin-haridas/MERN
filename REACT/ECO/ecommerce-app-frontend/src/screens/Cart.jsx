import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import STRIPE_SECRET_KEY from "../services/stripe";
import StripeCheckout from "react-stripe-checkout";
const stripePromise = loadStripe(STRIPE_SECRET_KEY);

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const CartContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background: white;
  padding: 2rem;
  border: 1px solid #e0e0e0;
`;

const CartTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #000;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 10px;
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #e0e0e0;
  background: #fff;
`;

const ItemImage = styled.img`
  width: 200px;
  height: 300px;
  object-fit: cover;
  margin-right: 20px;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemTitle = styled.h2`
  font-size: 16px;
  margin: 0 0 5px 0;
  color: #000;
`;

const ItemPrice = styled.p`
  font-size: 14px;
  margin: 0 0 5px 0;
  color: #333;
`;

const ItemSize = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 10px 0;
`;

const RemoveButton = styled.button`
  background: none;
  border: 1px solid #000;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;

  &:hover {
    background: #000;
    color: #fff;
  }
`;

const CartSummary = styled.div`
  width: 30%;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;

  h2 {
    font-size: 18px;
    margin-bottom: 20px;
    color: #000;
  }
`;

const CheckoutButton = styled.button`
  margin-top: 20px;
  width: 100%;
  background: #000;
  color: #fff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
`;
// Cart Component
const Cart = () => {
  const { cart, clearCart, removeFromCart, calculateCartTotal } = useAuth();

  const [token, setToken] = useState(null);
  const onToken = (token) => {
    setToken(token);
  };

  console.log(token);

  const fetchClientSecret = useCallback(async () => {
    const { data } = await axios.post(
      "http://localhost:3000/api/payment/create-checkout-session",
      {
        items: cart,
      }
    );
    clearCart();

    return data.clientSecret;
  }, [cart]);

  fetchClientSecret();

  return (
    <>
      <Header />
      <Wrapper>
        <CartTitle>Your Cart</CartTitle>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <CartContainer>
              <CartItems>
                {cart.map((item) => (
                  <CartItem key={item.id}>
                    <ItemImage src={item.img} alt={item.title} />
                    <ItemInfo>
                      <ItemTitle>{item.title}</ItemTitle>
                      <ItemPrice>₹{item.price}</ItemPrice>
                      <ItemSize>Size: {item.size}</ItemSize>
                      <RemoveButton onClick={() => removeFromCart(item.id)}>
                        Remove
                      </RemoveButton>
                    </ItemInfo>
                  </CartItem>
                ))}
              </CartItems>
              <CartSummary>
                <h2>Cart Summary</h2>
                <p>Total Items: {cart.length}</p>
                <p>Total Price: ₹{calculateCartTotal()}</p>
                <p>Shipping: Free</p>
                <p>Tax: 0</p>
                <p>Total: ₹{calculateCartTotal()}</p>
                <StripeCheckout
                  shippingAddress
                  billingAddress
                  stripeKey={STRIPE_SECRET_KEY}
                  currency="INR"
                  description={`Your total is $${calculateCartTotal()}`}
                  amount={calculateCartTotal()}
                  token={onToken}
                >
                  <CheckoutButton>Checkout</CheckoutButton>
                </StripeCheckout>
              </CartSummary>
            </CartContainer>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default Cart;
