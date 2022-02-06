import React, { useEffect } from "react";
import Header from "../Header";
import Banner from "../Banner";
import Home from "../Home";
import Footer from "../components/Footer";

const Homepage = () => {
  useEffect(() => {
    getLocation();
  }, []);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  function showPosition(position) {
    console.log("position:", position);
  }
  return (
    <div>
      <Header />
      <Banner />
      <Home />
      <Footer />
    </div>
  );
};

export default Homepage;
