import { Box, Button, Divider, Rating, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeedbackAction } from "../../../actions/userAction";

const AddFeedbackComponent = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const contentState = useSelector((state) => state.userReducer.content);

  const addFeedback = async () => {
    await dispatch(
      addFeedbackAction({ contentId: contentState?._id, message, rating })
    );
  };
  return (
    <>
      <Box>
        <TextField
          multiline
          rows={4}
          label="Description"
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ width: "100%" }}
        />
        <Rating
          sx={{ marginTop: "1rem" }}
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
        <Divider sx={{ marginY: "1rem" }} />
        <Button variant="contained" onClick={addFeedback}>
          Add
        </Button>
      </Box>
    </>
  );
};

export default AddFeedbackComponent;
