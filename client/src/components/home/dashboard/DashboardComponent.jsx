import { Box, Divider } from "@mui/material";
import DashboardContentListComponent from "./DashboardContentListComponent";

const DashboardComponent = () => {
  // Example data or function to retrieve data
  const totalProjects = 20;

  return (
    <>
      <Box>
        <DashboardContentListComponent />
      </Box>
    </>
  );
};

export default DashboardComponent;
