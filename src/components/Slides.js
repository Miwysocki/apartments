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
          <p>Explore nearby</p>
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
