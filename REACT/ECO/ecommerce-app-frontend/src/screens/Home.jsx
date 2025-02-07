import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Featured from "../components/Featured";
const Home = () => {
  return (
    <>
      <Header />
      <Banner />
      <Featured />
    </>
  );
};
export default Home;