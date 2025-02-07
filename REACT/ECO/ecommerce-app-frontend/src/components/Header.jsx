import React from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import {
  PersonOutlineOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background-color: white;
  border-bottom: 1px solid #f0f0f0;
`;

const NavLinks = styled.div`
  flex: 1;
  display: flex;
  gap: 32px;

  div {
    font-size: 14px;
    cursor: pointer;
    letter-spacing: 1px;

    &:hover {
      color: #666;
    }
  }
`;

const Logo = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 2px;
`;

const IconContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;

  gap: 20px;

  svg {
    cursor: pointer;
    font-size: 22px;

    &:hover {
      color: #666;
    }
  }
`;

const Header = () => {
  const navigate = useNavigate();

  const handleGenderClick = (gender) => () => {
    navigate(`/products?gender=${gender}`);
  };

  const handleCart = () => {
    navigate("/cart");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <HeaderContainer>
      <NavLinks>
        <div onClick={handleGenderClick("men")}>MEN</div>
        <div onClick={handleGenderClick("women")}>WOMEN</div>
        {/* <div>ACCESSORIES</div> */}
      </NavLinks>
      <Logo>
        <div>Vestri</div>
      </Logo>
      <IconContainer>
        <FavoriteBorderOutlinedIcon/>
        <ShoppingBagOutlined onClick={handleCart} />
        <PersonOutlineOutlined onClick={handleProfile} />
      </IconContainer>
    </HeaderContainer>
  );
};

export default Header;