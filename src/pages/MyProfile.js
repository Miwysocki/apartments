import React from "react";
import UserOffers from "../components/Offers/UserOffers";
import ProfileCard from "../components/ProfileCard";
import Header from "../Header";
import { useAuth } from "../contexts/AuthContext";

const MyProfile = () => {
  const { currentUser } = useAuth();
  return (
    <div>
      <div>
        <Header />
      </div>
      <br></br>
      <br></br>
      <br></br>

      <div style={{ marginLeft: "50px", marginTop: "30px" }}>
        <ProfileCard myProfile={true} userID={currentUser.uid} />
      </div>

      <div style={{ position: "absolute", right: 120, top: 100 }}>
        <h3>My offers</h3>

        <UserOffers userID={currentUser.uid} />
      </div>
    </div>
  );
};

export default MyProfile;
