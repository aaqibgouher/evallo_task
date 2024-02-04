import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Rating,
  Typography,
} from "@mui/material";
import NoDataFoundComponent from "../../helper/NoDateFoundComponent";

const FeedbacksComponent = ({ feedbacks }) => {
  return (
    <Box>
      {feedbacks && feedbacks.length ? (
        feedbacks.map((feedback, index) => (
          <Card key={index} sx={{ marginTop: "1rem" }}>
            <CardHeader
              avatar={<Avatar>{feedback.from.name[0]}</Avatar>}
              title={feedback.message}
            />
            <CardContent>
              <Rating
                name={`rating-${index}`}
                value={feedback.rating}
                readOnly
                size="small"
              />
            </CardContent>
          </Card>
        ))
      ) : (
        <NoDataFoundComponent />
      )}
    </Box>
  );
};

export default FeedbacksComponent;
