import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header";
import "../style/Basic.css";
import { useOffert } from "../components/Offers/OffersManager";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
const Search = () => {
  const { searchedPhrase } = useParams();
  const { searchByCity, listOffers } = useOffert();
  const searchedWords = searchedPhrase.split(",");
  const searchedCity = searchedWords[0];
  const [offers, setOffers] = useState();
  const [listedOffers, setListedOffers] = useState();
  const [mapPosition, setMapPosition] = useState();
  const [markers, setMarkers] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    init();
    centerMap();
  }, [searchedPhrase]);

  useEffect(() => {
    if (offers) listMarkers();
  }, [offers]);

  async function init() {
    const offers = await searchByCity(searchedCity);
    setOffers(offers);
    let list = listOffers(offers);
    setListedOffers(list);
  }
  async function centerMap() {
    const mapPos = await geocode(searchedPhrase);
    setMapPosition(mapPos);
  }

  function handleMarkerClick(offertID) {
    navigate("/room/" + offertID);
  }

  async function geocode(address) {
    //np. ('Los Angeles, CA')
    const result = await geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        return latLng;
      })
      .catch((error) => console.error("geocode error", error));
    return result;
  }

  async function listMarkers() {
    let markers = [];

    for (const e of offers) {
      const address = e.address + ", " + e.city;
      const latlng = await geocode(address);

      markers.push(
        <Marker
          position={{ lat: latlng.lat, lng: latlng.lng }}
          label={{ text: e.price, color: "white" }}
          labelStyle={{ background: "#ffd700" }}
          onClick={() => handleMarkerClick(e.offertID)}
        />
      );
    }
    setMarkers(markers);
  }

  const MapWithAMarker = withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: mapPosition.lat, lng: mapPosition.lng }}
    >
      {markers}
    </GoogleMap>
  ));

  return (
    <div>
      <Header />
      <br /> <br />
      <div>
        <div>{listedOffers && listedOffers}</div>
        <div>
          {mapPosition && (
            <MapWithAMarker
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
