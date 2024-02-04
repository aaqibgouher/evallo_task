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
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NoDataFoundComponent from "../../helper/NoDateFoundComponent";
import ContentListItemComponent from "./ContentListItemComponent";
import {
  approveContentAction,
  getContentsAction,
} from "../../../actions/userAction";
import DoneIcon from "@mui/icons-material/Done";

const ContentListComponent = () => {
  const dispatch = useDispatch();
  const [contents, setContents] = useState([]);
  const meState = useSelector((state) => state.userReducer.me);
  const contentsState = useSelector((state) => state.userReducer.contents);

  const getContents = async () => {
    try {
      console.log(meState, "me");
      await dispatch(getContentsAction({ creatorId: meState._id }));
    } catch (error) {
      console.log(error, "from get contents list component");
    }
  };

  const truncateText = (text, numWords) => {
    const words = text.split(" ");
    if (words.length > numWords) {
      return words.slice(0, numWords).join(" ") + "...";
    }
    return text;
  };

  const approveContent = async (data) => {
    try {
      await dispatch(
        approveContentAction({ contentId: data._id, creatorId: meState?._id })
      );
    } catch (error) {
      console.log(error, "from approve content");
    }
  };

  useEffect(() => {
    setContents(contentsState);
  }, [contentsState]);

  useEffect(() => {
    if (meState) {
      getContents();
    }
  }, [meState]);

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
            My Contents
          </Typography>
          {meState?.role === "CREATOR" && (
            <Link to={`/content/add`}>
              <Button type="submit" variant="contained" color="primary">
                Add
              </Button>
            </Link>
          )}
        </Box>

        {/* Table */}
        {contents && contents.length ? (
          <Table sx={{ marginY: "2rem" }}>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Is Approved</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contents.map((content, index) => (
                <TableRow key={content._id}>
                  <TableCell>{content.title}</TableCell>
                  <TableCell>{truncateText(content.description, 20)}</TableCell>
                  <TableCell>{content.category}</TableCell>
                  {/* <TableCell>
                    {content.tags && content.tags.length ? (
                      content.tags.map((tag, tagIds) => (
                        <Chip key={tagIds} label={tag} variant="outlined" />
                      ))
                    ) : (
                      <Chip label="NA" variant="outlined" />
                    )}
                  </TableCell> */}
                  <TableCell>
                    <Chip
                      label={content.isApproved ? "Approved" : "Pending"}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip label={content.status} variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row">
                      {(meState?.role === "CREATOR" ||
                        meState?.role === "ADMIN") && (
                        <Link to={`/content/${content._id}`}>
                          <IconButton aria-label="view">
                            <ShowIcon />
                          </IconButton>
                        </Link>
                      )}

                      {meState?.role === "CREATOR" && (
                        <Link to={`/content/${content._id}`}>
                          <IconButton aria-label="edit">
                            <EditIcon />
                          </IconButton>
                        </Link>
                      )}

                      {meState?.role === "CREATOR" && (
                        <IconButton aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      )}

                      {meState?.role === "ADMIN" &&
                        content.status === "DRAFT" && (
                          <IconButton
                            aria-label="delete"
                            onClick={(e) => approveContent(content)}
                          >
                            <DoneIcon />
                          </IconButton>
                        )}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <NoDataFoundComponent />
        )}
      </Box>
    </>
  );
};

export default ContentListComponent;
