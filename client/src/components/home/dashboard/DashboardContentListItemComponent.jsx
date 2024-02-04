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
import { Link } from "react-router-dom";

const DashboardContentListItemComponent = ({ content }) => {
  const truncateText = (text, numWords) => {
    const words = text.split(" ");
    if (words.length > numWords) {
      return words.slice(0, numWords).join(" ") + "...";
    }
    return text;
  };

  return (
    <Link to={`/content/${content._id}`} style={{ textDecoration: "none" }}>
      <Card sx={{ height: "100%" }}>
        <CardMedia
          sx={{ height: 140 }}
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrwMUmX3Gjrf_OX3c1Avy4rx0nUPKj6aGjsCRgokD5CA051c67v9QQQjBpl3vmdr_39VA&usqp=CAU"
          title="green iguana"
        />
        <CardContent sx={{ overflow: "hidden" }}>
          <Typography gutterBottom variant="h5" component="div">
            {content.title}
          </Typography>
          <Box sx={{ height: "5rem" }}>
            <Typography variant="body2" color="text.secondary">
              {truncateText(content.description, 20)}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Chip
              label={`Created By: ${content.user.name}`}
              variant="outlined"
            />
            {content.rating > 0 && (
              <Rating
                name="disabled"
                value={content.rating}
                readOnly
                size="small"
              />
            )}
          </Box>
        </CardContent>
        <Divider />
        <CardContent>
          {content.tags && content.tags.length ? (
            content.tags.map((tag, tagId) => (
              <Chip
                label={tag}
                variant="outlined"
                key={tagId}
                sx={{ marginY: "2px" }}
              />
            ))
          ) : (
            <Chip label="No tags" variant="outlined" sx={{ marginY: "2px" }} />
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default DashboardContentListItemComponent;
