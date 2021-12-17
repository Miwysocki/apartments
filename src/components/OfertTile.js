import React from "react";
import "../style/OfertTile.css";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Content from "../Content.js";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const OfertTile = (props) => {
  return (
    <div>
      {" "}
      <Grid container spacing={3}>
        {Content.map((e) => {
          return (
            <div className="ofert" key={e.id}>
              <Grid>
                <Item>
                  <div className="ofert">
                    {" "}
                    <Link to={`/room/${e.id}`}>
                      <img src={e.img} alt="" />
                    </Link>{" "}
                    <p>{e.title}</p>
                    <p>{e.city}</p>
                    <p>{e.price}$</p>
                  </div>
                </Item>
              </Grid>
            </div>
          );
        })}
      </Grid>
    </div>
  );
};

export default OfertTile;
