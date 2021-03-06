import React from "react";
import { useEffect } from "react";
import { doc, collection, addDoc } from "firebase/firestore";
import db from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const OffersUpload = (props) => {
  const { currentUser } = useAuth();
  const storage = getStorage();
  const navigate = useNavigate();

  let offert = props.offert;
  offert.photosURL = [];

  async function uploadOffertPhotos() {
    offert.photos.forEach((file) => {
      let picUrl = currentUser.uid + "/" + file.name + ".jpg";
      let ImagesRef = ref(storage, "ofertImages/" + picUrl);

      uploadBytes(ImagesRef, file).then((snapshot) => {
        offert.photosURL.push(picUrl);
        if (!offert.photos) return;
        if (offert.photos[offert.photos.length - 1] === file) {
          //save offer after storing all photos
          uploadOffert();
        }
      });
    });
  }

  async function uploadOffert() {
    //setting details of offert
    offert.ownerID = currentUser.uid;
    let savingOF = offert;
    delete savingOF.step;
    delete savingOF.photos;
    delete savingOF.error;

    await addDoc(collection(db, "offers"), savingOF);
    navigate("/my-profile");
  }

  useEffect(() => {
    uploadOffertPhotos();
  }, []);

  return <div></div>;
};

export default OffersUpload;
