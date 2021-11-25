import React from "react";
import Slides from "./components/Slides";
import TitlebarImageList from "./components/TitlebarImageList";
import "./style/Home.css";
function Home() {
  return (
    <div className="home">
      <Slides />

      <TitlebarImageList></TitlebarImageList>
    </div>
  );
}

export default Home;
