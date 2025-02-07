import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Form = styled.form`
  background: #fff;
  padding: 2rem;
  width: 24rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 18rem;
    padding: 1.5rem;
    border: 1px solid #000;
  }
`;

const Title = styled.h1`
  font-family: "Noto Sans", serif;
  font-size: 1.5rem;
  font-weight: bold;
  color: #000;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Input = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border: 2px solid #000;
  outline: none;

  &:focus {
    border-color: #597445;
  }

  @media (max-width: 768px) {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
`;

const Button = styled.button`
  padding: 0.8rem;
  font-size: 1rem;
  font-weight: bold;
  background: rgb(228, 136, 82);
  color: #fff;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-3px);
    background: rgb(227, 107, 55);
  }

  @media (max-width: 768px) {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
`;

const Message = styled.p`
  font-size: 1rem;
  text-align: center;
  color: ${({ isError }) => (isError ? "red" : "green")};

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/register', {
        username: username,
        email: email,
        password: password,
      });
      console.log(res.data.user);
      
      setMessage("Registration successful!");
      setUsername("");
      setEmail("");
      setPassword("");
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Register to Vestri</Title>
        <Input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Register</Button>
        {message && (
          <Message isError={!message.includes("successful")}>{message}</Message>
        )}
        <p style={{ textAlign: "center" }}>
          Already have an account ?? <Link to="/login">click here</Link>
        </p>
      </Form>
    </Container>
  );
};

export default RegisterPage;