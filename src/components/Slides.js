import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import "../style/Slides.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
<Carousel responsive={responsive}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</Carousel>;

const Slides = () => {
  const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
  } = require("react-google-maps");
  const navigate = useNavigate();
  const [currentPosition, setCurrentPosition] = useState();
  const [city, setCity] = useState();
  const geocoder = new window.google.maps.Geocoder();

  useEffect(() => {
    getCurrentLocation();
  }, []);

  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    setCurrentPosition(position);
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    codeLatLng(lat, lng);
  }

  async function handleExploreNerby() {
    if (currentPosition) {
      const lat = currentPosition.coords.latitude;
      const lng = currentPosition.coords.longitude;

      navigate("/search/" + city);
    }
  }
  function codeLatLng(lat, lng) {
    let city = "";

    var latlng = new window.google.maps.LatLng(lat, lng);

    const g = geocoder.geocode({ latLng: latlng }, function (results, status) {
      if (status == window.google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          for (var i = 0; i < results[0].address_components.length; i++) {
            for (
              var b = 0;
              b < results[0].address_components[i].types.length;
              b++
            ) {
              if (
                results[0].address_components[i].types[b] ==
                "administrative_area_level_2"
              ) {
                city = results[0].address_components[i].long_name;
                setCity(city);
                break;
              }
            }
          }
        } else {
          alert("No results found");
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
  }

  return (
    <div>
      <Carousel
        responsive={responsive}
        swipeable={false}
        draggable={false}
        showDots={true}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        <div className="tile">
          <img
            src="https://d2bgjx2gb489de.cloudfront.net/gbb-blogs/wp-content/uploads/2017/08/31151834/Giethoorn_625076066-870x400.jpg"
            alt=""
          />
          <p>Unique Places</p>
        </div>

        <div className="tile" onClick={handleExploreNerby}>
          {" "}
          <img
            src="https://images.pexels.com/photos/1252500/pexels-photo-1252500.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt=""
          />
          <p>Explore nerby</p>
        </div>
        <div className="tile">
          <img
            src="https://images.pexels.com/photos/4825709/pexels-photo-4825709.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt=""
          />
          <p>Guides</p>
        </div>
      </Carousel>
    </div>
  );
};

export default Slides;

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    author: "@bkristastucchio",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    author: "@rollelflex_graphy726",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
    author: "@helloimnik",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    author: "@nolanissac",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    author: "@hjrc33",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
    author: "@tjdragotta",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    author: "@katie_wasserman",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    author: "@silverdalex",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    author: "@shelleypauls",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
    author: "@peterlaster",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    author: "@southside_customs",
    cols: 2,
  },
];
