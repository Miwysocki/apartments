import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../Header";
import { useOffert } from "../components/Offers/OffersManager";
const Search = () => {
  const { searchedPhrase } = useParams();
  const { searchByCity, listOffers } = useOffert();
  const searchedWords = searchedPhrase.split(",");
  const searchedCity = searchedWords[0];
  const [offers, setOffers] = useState();

  useEffect(() => {
    init();
  }, [searchedPhrase]);

  async function init() {
    const offers = await searchByCity(searchedCity);
    let list = listOffers(offers);
    setOffers(list);
  }

  return (
    <div>
      <Header />
      <br /> <br />
      aa a<br></br> a<div>{offers && offers}</div>
    </div>
  );
};

export default Search;
