import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  TextField,
  TextareaAutosize,
  Select,
  MenuItem,
  Button,
  InputLabel,
  Chip,
  FormControl,
  Input,
  FormHelperText,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addContentAction,
  editContentAction,
  getContentByIdAction,
} from "../../../actions/userAction";
import { useNavigate, useParams } from "react-router-dom";

const EditContentComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { contentId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [status, setStatus] = useState("");
  const [file, setFile] = useState(null);
  const categoriesState = useSelector((state) => state.userReducer.categories);
  const statusState = useSelector((state) => state.userReducer.status);
  const contentState = useSelector((state) => state.userReducer.content);

  const handleTagInputChange = (event) => {
    setTagInput(event.target.value);
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const editContent = async () => {
    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append(`tags`, tags.join(", "));
      formData.append("status", status);
      formData.append("file", file);

      const res = await dispatch(editContentAction(contentId, formData));

      if (!res || res.status !== 200) throw "Something wrong";

      // redirect to dashboard
      navigate("/content");
    } catch (error) {
      console.log(error, "from add content");
    }
  };

  const getContentById = async () => {
    await dispatch(getContentByIdAction({ contentId }));
  };

  useEffect(() => {
    if (contentId) {
      getContentById();
    }
  }, [contentId]);

  useEffect(() => {
    if (contentState) {
      setTitle(contentState?.title);
      setDescription(contentState?.description);
      setCategory(contentState?.category);
      setTags(contentState?.tags);
      setStatus(contentState?.status);
    }
  }, [contentState]);

  return (
    <Box>
      <Typography variant="h3" component="div" mb={3}>
        Edit Content
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {/* Form Fields */}
            <TextField
              label="Title"
              fullWidth
              variant="outlined"
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              multiline
              rows={4}
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ width: "100%" }}
            />
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categoriesState && categoriesState.length ? (
                  categoriesState.map((cat, catIdx) => (
                    <MenuItem key={catIdx} value={cat.value}>
                      {cat.label}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="category1">No categories</MenuItem>
                )}
              </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined" margin="normal">
              <TextField
                label="Tags"
                value={tagInput}
                onChange={handleTagInputChange}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleAddTag();
                  }
                }}
                helperText="Press Enter to add a tag"
              />
              <Box sx={{ marginTop: 1 }}>
                {tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleDeleteTag(tag)}
                    sx={{ margin: 0.5 }}
                  />
                ))}
              </Box>
            </FormControl>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel id="category-label">Status</InputLabel>
              <Select
                labelId="category-label"
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {statusState && statusState.length ? (
                  statusState.map((sts, stsIdx) => (
                    <MenuItem key={stsIdx} value={sts.value}>
                      {sts.label}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="category1">No status</MenuItem>
                )}
              </Select>
            </FormControl>
            <input
              accept="image/*, video/*, audio/*, application/pdf"
              style={{ display: "none" }}
              id="file-input"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="file-input">
              <Button variant="outlined" component="span" mt={2}>
                Upload File
              </Button>
            </label>
            <br />
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: "2rem" }}
              onClick={editContent}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditContentComponent;
