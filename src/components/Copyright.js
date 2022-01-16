import React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const Copyright = () => {
  return (
    <div>
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="/">
          Apartments
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  );
};

export default Copyright;
