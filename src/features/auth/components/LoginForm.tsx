import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchLoginStatus } from "../services";
import {
  selectLoadingStatus,
  selectLoginErrorMessage,
} from "../slices/authSlice";
import { UserType } from "../types";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectLoginErrorMessage);
  const loadingStatus = useAppSelector(selectLoadingStatus);
  const isLoading = loadingStatus === "loading";

  const [toast, setToast] = useState({ open: false, message: "" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginDetails = {
      username: data.get("email") as string,
      password: data.get("password") as string,
    };
    const response: UserType = await dispatch(
      fetchLoginStatus(loginDetails)
    ).unwrap();

    if (response.accessToken) {
      navigate("/");
    }
  };
  useEffect(() => {
    if (error) {
      setToast({ message: error, open: true });
    }
  }, [error]);
  const handleCloseToast = () => setToast({ message: "", open: false });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {!isLoading ? "Log In" : "Loading..."}
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={toast.open}
        autoHideDuration={2000}
        onClose={handleCloseToast}
      >
        <Alert
          onClose={handleCloseToast}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginForm;
