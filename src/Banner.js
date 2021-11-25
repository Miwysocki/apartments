import { Button } from "@mui/material";
import React, { useState } from "react";
import "./style/Banner.css";
import DateSearch from "./components/DateSearch.js";
function Banner() {
  const [showDates, setShowDates] = useState(false);

  return (
    <div className="cover">
      <div className="banner">
        <div className="banner_search">
          {/* <Button variant="outlined" onClick={() => setShowDates(!showDates)}>
            Search dates
          </Button> */}
          {showDates && <DateSearch />}
          <div className="banner_info">
            <h1>Find the best place for you!</h1>
            <h5>Your dream house is in your sight</h5>
            <Button variant="contained">Explore</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
