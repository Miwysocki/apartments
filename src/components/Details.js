import React from "react";
import { useParams } from "react-router-dom";
import Content from "../Content";
import Header from "../Header";
import "../style/Details.css";
const Details = () => {
  const { id } = useParams();

  const content = Content.map((post) => (
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  ));

  const tits = Content.map((e) => <h1>{e.title}</h1>);
  const pickedOfert = Content.find((e) => e.id == id);

  return (
    <div>
      <Header />
      <div>
        {pickedOfert.city}
        <h1>{pickedOfert.title}</h1>
      </div>
    </div>
  );
};

export default Details;
