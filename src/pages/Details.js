import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../Header";
import { useOffert } from "../components/Offers/OffersManager";
import { ImageList, ImageListItem, Typography } from "@mui/material";
import HotelIcon from "@mui/icons-material/Hotel";
import "../style/Basic.css";

const Details = () => {
  const { id } = useParams();
  const { getOffertByID, getPictureURL } = useOffert();
  const [offert, setOffert] = useState();
  const [photos, setPhotos] = useState();
  const [selectedImage, setselectedImage] = useState();
  useEffect(() => {
    init();
    getPhotos();
  }, []);

  async function init() {
    const offert = await getOffertByID(id);
    setOffert(offert);
    return offert;
  }

  async function getPhotos() {
    let photosArr = [];
    let offert = await init();
    for await (const e of offert.photosURL) {
      const url = await getPictureURL(e);
      photosArr.push(url);
    }
    setPhotos(photosArr);
  }

  const imageClick = (photo) => {
    const img = document.getElementById("selectedPhoto");
    img.setAttribute("src", photo);
  };

  return (
    <div>
      <Header />
      <br></br>
      <br></br>
      <br></br>
      {offert && (
        <div style={{ marginLeft: 160 }}>
          {" "}
          <Typography component="div" variant="h4">
            {offert.apartmentName}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {offert.guests} <HotelIcon /> {offert.rooms} rooms
          </Typography>
        </div>
      )}

      <div>
        <div className="center">
          {photos && (
            <img
              style={{ maxHeight: 400 }}
              id="selectedPhoto"
              src={photos[0]}
              alt=""
            />
          )}
        </div>
        <div className="center">
          {" "}
          {photos && (
            <ImageList
              sx={{ height: 200 }}
              cols={photos.length}
              rowHeight={164}
            >
              {photos.map((item) => (
                <ImageListItem key={item.img}>
                  <Link to="#">
                    <img
                      src={item}
                      onClick={() => imageClick(item)}
                      alt={""}
                      loading="lazy"
                      style={{ height: 100 }}
                    />
                  </Link>
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
