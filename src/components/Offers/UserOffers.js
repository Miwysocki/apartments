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
    });
    return offers;
  }

  async function mapOffers() {
    const offers = await getOffers();
    console.log("po get" + offers);
    const offersListed = offers.map((data, id) => {
      return (
        <div key={id}>
          {/* <h2>{data.apartmentName}</h2>
          <p>b</p> */}
          <OffertCard offert={data} />
        </div>
      );
    });
    setOffers(offersListed);
  }

  return <div>{offers}</div>;
};

export default UserOffers;
