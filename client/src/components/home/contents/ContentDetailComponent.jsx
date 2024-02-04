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
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import ShowIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NoDataFoundComponent from "../../helper/NoDateFoundComponent";
import ContentListItemComponent from "./ContentListItemComponent";
import { getContentByIdAction } from "../../../actions/userAction";

const ContentDetailComponent = () => {
  const dispatch = useDispatch();
  const { contentId } = useParams();
  const [contents, setContents] = useState([]);
  const meState = useSelector((state) => state.userReducer.me);
  const contentState = useSelector((state) => state.userReducer.content);

  const getContentById = async () => {
    await dispatch(getContentByIdAction({ contentId }));
  };

  useEffect(() => {
    if (contentId) {
      getContentById();
    }
  }, [contentId]);

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
            {contentState?.title}
          </Typography>
        </Box>

        {/* details */}
        <Grid container spacing={2} sx={{ marginTop: "2rem" }}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Description
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {contentState?.description}
                </Typography>
                <Divider sx={{ marginY: "5px" }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Typography variant="h5" component="div">
                      Category
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {contentState?.category}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Typography variant="h5" component="div">
                      Status
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {contentState?.status}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Typography variant="h5" component="div">
                      Rating
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {contentState?.rating}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider sx={{ marginY: "5px" }} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            fdsfdfdsf
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ContentDetailComponent;
