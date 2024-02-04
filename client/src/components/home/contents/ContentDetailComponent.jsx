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
import FeedbacksComponent from "./FeedbackComponent";
import { SET_DIALOG } from "../../../types";

const ContentDetailComponent = () => {
  const dispatch = useDispatch();
  const { contentId } = useParams();
  const [contents, setContents] = useState([]);
  const meState = useSelector((state) => state.userReducer.me);
  const contentState = useSelector((state) => state.userReducer.content);

  const getContentById = async () => {
    await dispatch(getContentByIdAction({ contentId }));
  };

  const formatDate = (isoDate) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    const formattedDate = new Date(isoDate).toLocaleString("en-US", options);
    console.log(formattedDate, "for");
    return formattedDate;
  };

  const openDialog = async () => {
    await dispatch({
      type: SET_DIALOG,
      payload: {
        open: true,
        title: "Add Feedback",
        type: "ADD_FEEDBACK_CONTENT",
      },
    });
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
                    <Rating
                      name="disabled"
                      value={contentState?.rating || 2}
                      readOnly
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Divider sx={{ marginY: "5px" }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Typography variant="h5" component="div">
                      Created By
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {contentState?.user.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Typography variant="h5" component="div">
                      Created On
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {contentState?.createdAt
                        ? formatDate(contentState?.createdAt)
                        : ""}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider sx={{ marginY: "5px" }} />
                <Box>
                  {contentState?.tags && contentState?.tags.length ? (
                    contentState?.tags.map((tag, tagId) => (
                      <Chip
                        label={tag}
                        variant="outlined"
                        key={tagId}
                        sx={{ marginY: "2px" }}
                      />
                    ))
                  ) : (
                    <Chip
                      label="No tags"
                      variant="outlined"
                      sx={{ marginY: "2px" }}
                    />
                  )}
                </Box>
                <Divider sx={{ marginY: "5px" }} />
                {contentState &&
                  contentState?.metadata &&
                  contentState?.metadata.fileDetail && (
                    <Box>
                      <Grid item>
                        <Typography variant="h5" component="div">
                          Link
                        </Typography>
                        <Link
                          to={contentState?.metadata.fileDetail.downloadUrl}
                          target="_blank"
                        >
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {contentState?.metadata?.fileDetail?.downloadUrl}
                          </Typography>
                        </Link>
                      </Grid>
                    </Box>
                  )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h5" component="div">
                    Feedbacks
                  </Typography>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={openDialog}
                  >
                    Add
                  </Button>
                </Box>
              </CardContent>
            </Card>
            <Box sx={{ marginTop: "2rem" }}>
              <FeedbacksComponent feedbacks={contentState?.feedbacks} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ContentDetailComponent;
