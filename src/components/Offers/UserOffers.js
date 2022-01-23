import React from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../../firebase";
import { useEffect, useState } from "react";
import OffertCard from "./OffertCard";

const UserOffers = (props) => {
  const userID = props.userID;
  const [offers, setOffers] = useState();

  useEffect(() => {
    mapOffers();
  }, []);

  async function getOffers() {
    //get all user offerts
    let offers = [];
    const q = query(collection(db, "offers"), where("ownerID", "==", userID));
    const querySnapshot = await getDocs(q);

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
          <OffertCard offert={data} />
        </div>
      );
    });
    setOffers(offersListed);
  }

  return <div>{offers}</div>;
};

export default UserOffers;
