import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchSignupStatus } from "../services";
import {
  selectLoadingStatus,
  selectLoginErrorMessage,
} from "../slices/authSlice";
import { SignupResponseType } from "../types";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectLoginErrorMessage);
  const loadingStatus = useAppSelector(selectLoadingStatus);
  const isLoading = loadingStatus === "loading";

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "error" as "error" | "success",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const confirmPassword = data.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setToast({
        message: "Passwords do not match",
        open: true,
        severity: "error",
      });
      return;
    }

    try {
      const response: SignupResponseType = await dispatch(
        fetchSignupStatus({
          name,
          email,
          password,
          confirmPassword,
        }),
      ).unwrap();

      if (response?.message) {
        setToast({
          message: response.message,
          open: true,
          severity: "success",
        });
        navigate("/login");
      }
    } catch {
      // Error is handled via Redux state + useEffect toast
    }
  };

  useEffect(() => {
    if (error) {
      setToast({ message: error, open: true, severity: "error" });
    }
  }, [error]);

  const handleCloseToast = () =>
    setToast((prev) => ({ ...prev, message: "", open: false }));

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
          Sign up
        </Typography>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {!isLoading ? "Sign Up" : <CircularProgress size={25} />}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar
        open={toast.open}
        autoHideDuration={2000}
        onClose={handleCloseToast}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SignupForm;
