import React from "react";
import banner1 from "../assets/promotionbanner1.png";
import banner2 from "../assets/promotionbanner2.png";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@mui/icons-material";

const Banner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const banners = [banner1, banner2];
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <AnimatePresence>
        <motion.img
          key={currentBanner}
          src={banners[currentBanner]}
          alt={`banner${currentBanner + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          style={{
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            filter: isHovered ? "brightness(85%)": "none",
            transition: "filter 0.3s ease",
          }}
        />
      </AnimatePresence>
      <div style={{ visibility: "hidden" }}>
        <img src={banners[0]} alt="spacer" style={{ width: "100%" }} />
      </div>
      <div
        onClick={() => navigate("/products")}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "200%",
          height: "200%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        <h1
          style={{
            fontSize: "60px",
            fontWeight: "400",
            color: "white",
            opacity: "0",
            padding: "10px 20px",
            position: "relative",
            textDecoration: "none",
            transition: "text-decoration 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.textDecoration = "underline";
            e.currentTarget.style.opacity = "1";
            setIsHovered(true);
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.textDecoration = "none";
            e.currentTarget.style.opacity = "0";
            setIsHovered(false)
          }}
        >
          Explore Now{" "}
          <SearchOutlined
            style={{
              fontSize: "60px",
              verticalAlign: "middle",
            }}
          />
        </h1>
      </div>
    </div>
  );
};

export default Banner;
