import React from "react";
import OfertTile from "./components/OfertTile";
import Slides from "./components/Slides";
import Test from "./components/Test";
import TitlebarImageList from "./components/TitlebarImageList";
import "./style/Home.css";
function Home() {
  return (
    <div className="home">
      {/* <Test /> */}
      <Slides />
      <OfertTile />
      <TitlebarImageList></TitlebarImageList>
    </div>
  );
}

export default Home;
