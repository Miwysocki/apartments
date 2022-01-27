import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../Header";
import { useOffert } from "../components/Offers/OffersManager";
const Search = () => {
  const { searchedPhrase } = useParams();
  const { searchByCity } = useOffert();
  useEffect(() => {
    searchByCity(searchedPhrase);
  }, []);

  return (
    <div>
      <Header />
    </div>
  );
};

export default Search;
