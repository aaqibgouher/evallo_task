import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const ProfileComponent = () => {
  return (
    <>
      <Box>
        <Outlet />
      </Box>
    </>
  );
};

export default ProfileComponent;
