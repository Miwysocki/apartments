import React from "react";
import OfertTile from "./components/OfertTile";
import Slides from "./components/Slides";
import TitlebarImageList from "./components/TitlebarImageList";
import "./style/Home.css";
function Home() {
  return (
    <div className="home">
      <Slides />
      <OfertTile />
      <TitlebarImageList></TitlebarImageList>
    </div>
  );
}

export default Home;
