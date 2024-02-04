import React from "react";
import NoDataFoundImage from "../../assets/NoDataFoundImage.jpg"; // Assuming it's a JPEG image
import { Grid } from "@mui/material";

const NoDataFoundComponent = () => {
  return (
    <Grid container justifyContent="center">
      <img
        src={NoDataFoundImage}
        alt="No Data Found"
        style={{ height: "400px", width: "400px" }}
      />
    </Grid>
  );
};

export default NoDataFoundComponent;
