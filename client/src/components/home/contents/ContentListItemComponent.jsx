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

const ContentListItemComponent = ({ content }) => {
  const truncateText = (text, numWords) => {
    const words = text.split(" ");
    if (words.length > numWords) {
      return words.slice(0, numWords).join(" ") + "...";
    }
    return text;
  };

  return (
    <>
      <h1>List</h1>
    </>
  );
};

export default ContentListItemComponent;
