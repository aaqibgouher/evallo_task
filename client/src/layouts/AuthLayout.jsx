import { Grid, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Container>
      <Grid
        container
        spacing={3}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Grid item xs={4} md={4}>
          <Outlet />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AuthLayout;
