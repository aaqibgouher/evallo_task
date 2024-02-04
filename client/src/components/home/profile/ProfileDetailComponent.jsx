import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";

const ProfileDetailComponent = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const meState = useSelector((state) => state.userReducer.me);

  useEffect(() => {
    if (meState) {
      setName(meState.name);
      setEmail(meState.email);
      setRole(meState.role);
    }
  }, [meState]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h3" component="div">
          Projects
        </Typography>
      </Box>
      <Grid container spacing={3} sx={{ marginY: "2rem" }}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{ padding: 2, textAlign: "center", height: "100%" }}
          >
            <AccountCircleIcon
              sx={{ width: 100, height: 100, margin: "auto" }}
            />
            <Typography variant="h5" sx={{ marginTop: 2 }}>
              {name}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2, height: "100%" }}>
            <form>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                value={email}
                disabled
              />
              <TextField
                fullWidth
                label="Role"
                variant="outlined"
                margin="normal"
                value={role}
                disabled
              />
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileDetailComponent;
