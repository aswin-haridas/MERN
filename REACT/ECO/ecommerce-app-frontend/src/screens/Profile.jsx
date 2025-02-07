  import React from 'react';
  import styled from 'styled-components';
  import { useAuth } from '../context/AuthContext';

  const Profile = () => {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
      try {
        await logout();
      } catch (error) {
        console.error('Logout error:', error);
      }
    };

    return (
      <Container>
        <UserInfo>
          <Title>Profile</Title>
          <Text>Email: {user?.email}</Text>
          <Text>Name: {user?.username || 'Not set'}</Text>
        </UserInfo>
        <LogoutButton onClick={handleLogout}>
          <LogoutText>Logout</LogoutText>
        </LogoutButton>
      </Container>
    );
  };

  const Container = styled.div`
    flex: 1;
    padding: 20px;
    background-color: #fff;
  `;

  const UserInfo = styled.div`
    margin-bottom: 30px;
  `;

  const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  `;

  const Text = styled.p`
    font-size: 16px;
    margin-bottom: 10px;
    color: #333;
  `;

  const LogoutButton = styled.button`
    background-color: #ff4444;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    border: none;
    cursor: pointer;
  `;

  const LogoutText = styled.span`
    color: #fff;
    font-size: 16px;
    font-weight: bold;
  `;

  export default Profile;