import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const ContentComponent = () => {
  return (
    <>
      <Box>
        <Outlet />
      </Box>
    </>
  );
};

export default ContentComponent;
