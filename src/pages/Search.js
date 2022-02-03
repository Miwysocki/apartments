import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header";
import "../style/Basic.css";
import { useOffert } from "../components/Offers/OffersManager";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import { Box, Grid, Typography } from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import Paid from "@mui/icons-material/Paid";
import { width } from "@mui/system";
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
  const [sorting, setSorting] = useState("");
  const [maxPrice, setMaxPrice] = useState();
  const [priceFilter, setPriceFilter] = useState([0, 500]);

  useEffect(() => {
    init();
    centerMap();
  }, [searchedPhrase]);

  useEffect(() => {
    if (offers) listMarkers();
  }, []);

  useEffect(() => {
    if (!offers) return;
    //filter price
    const minPrice = priceFilter[0];
    const maxPrice = priceFilter[1];
    const filteredOffers = offers.filter(function (el) {
      return el.price >= minPrice && el.price <= maxPrice;
    });
    let list = listOffers(filteredOffers, sorting);
    setListedOffers(list);
  }, [sorting, priceFilter]);

  async function init() {
    const offers = await searchByCity(searchedCity);
    setOffers(offers);
    let list = listOffers(offers);
    setListedOffers(list);
    //setting max price for filters
    const maxPrice = Math.max.apply(
      Math,
      offers.map(function (o) {
        return o.price;
      })
    );
    setMaxPrice(maxPrice);
    let pr = [0, maxPrice];
    setPriceFilter(pr);
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

  const handleSorting = (event) => {
    setSorting(event.target.value);
  };

  const handleSlider = (event, newValue) => {
    setPriceFilter(newValue);
  };

  const MapWithAMarker = withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: mapPosition.lat, lng: mapPosition.lng }}
    >
      {markers}
    </GoogleMap>
  ));

  return (
    <div>
      <Header />
      <br /> <br />
      <br />
      <div>
        <Grid container marginTop={2} spacing={1}>
          <Grid item xs={2}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="">Sort by</InputLabel>
              <Select
                labelId=""
                id=""
                value={sorting}
                label="Sort by"
                onChange={handleSorting}
              >
                {/* <MenuItem value="">
              <em>None</em>
            </MenuItem> */}
                <MenuItem value={"price:ascending"}>Price: ascending</MenuItem>
                <MenuItem value={"price:descending"}>
                  Price: descending
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            <Typography id="input-slider" gutterBottom>
              Price
            </Typography>
            <Slider
              max={maxPrice}
              getAriaLabel={() => "Minimum distance"}
              value={priceFilter}
              onChange={handleSlider}
              valueLabelDisplay="auto"
              disableSwap
            />
          </Grid>
        </Grid>
      </div>
      <div>
        <div>{listedOffers && listedOffers}</div>
        <div style={{}}>
          {mapPosition && (
            <MapWithAMarker
              containerElement={
                <div
                  style={{
                    position: "fixed",
                    right: 30,
                    top: 180,

                    height: `60vh`,
                    width: "55vw",
                  }}
                />
              }
              mapElement={<div style={{ height: `100%` }} />}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
