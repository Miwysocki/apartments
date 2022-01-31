import React, { useEffect, useState } from "react";
import "../style/OfertTile.css";

import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import db from "../firebase";
import OffertCard from "./Offers/OffertCard";

const OfertTile = (props) => {
  const [offersListed, setOffersListed] = useState();
  const offersRef = collection(db, "offers");
  const q = query(offersRef, orderBy("price"), limit(3));

  useEffect(() => {
    mapOffers();
  }, []);

  async function getOffers() {
    const querySnapshot = await getDocs(q);
    let offers = [];
    querySnapshot.forEach((doc) => {
      offers.push(doc.data());
      offers[offers.length - 1].offertID = doc.id;
    });
    return offers;
  }

  async function mapOffers() {
    const offers = await getOffers();
    const offersListed = offers.map((data, id) => {
      return (
        <div key={id}>
          <OffertCard offert={data} isVertical={true} />
        </div>
      );
    });
    setOffersListed(offersListed);
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      {" "}
      {offersListed}
    </div>
  );
};

export default OfertTile;
