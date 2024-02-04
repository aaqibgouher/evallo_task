import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
  Divider,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardActions,
  Box,
  Stack,
  Chip,
  Rating,
} from "@mui/material";
import ShowIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NoDataFoundComponent from "../../helper/NoDateFoundComponent";
import { getDashboardContentsAction } from "../../../actions/userAction";
import DashboardContentListItemComponent from "./DashboardContentListItemComponent";

const DashboardContentListComponent = () => {
  const dispatch = useDispatch();
  const [contents, setContents] = useState([]);
  const meState = useSelector((state) => state.userReducer.me);
  const contentsState = useSelector((state) => state.userReducer.contents);

  const getContents = async () => {
    try {
      await dispatch(getDashboardContentsAction());
    } catch (error) {
      console.log(error, "from get contents list component");
    }
  };

  useEffect(() => {
    getContents();
  }, []);

  useEffect(() => {
    setContents(contentsState);
  }, [contentsState]);

  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h3" component="div">
            Best Helpers
          </Typography>
        </Box>
        <Grid container spacing={3} sx={{ marginY: "2rem" }}>
          {contents && contents.length ? (
            contents.map((content) => (
              <Grid item key={content._id} xs={12} sm={6} md={4} lg={4}>
                <DashboardContentListItemComponent
                  key={content._id}
                  content={content}
                />
              </Grid>
            ))
          ) : (
            <NoDataFoundComponent />
          )}
        </Grid>
      </Box>
    </>
  );
};

export default DashboardContentListComponent;
