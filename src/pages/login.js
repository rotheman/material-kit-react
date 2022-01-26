import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Facebook as FacebookIcon } from "../icons/facebook";
import { Google as GoogleIcon } from "../icons/google";
import { useAppContext } from "src/lib/contextLib";
import { useState } from "react";
import authService from "src/_services/auth.service";

const Login = () => {
  const router = useRouter();
  const { setCheckin } = useAppContext();
  const [userName, setUserName] = useState("email@sluz.ch");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [userNameErr, setUserNameErr] = useState({});
  const [userPasswordErr, setUserPasswordErr] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "email@sluz.ch",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: () => {
      console.log("email:" + formik.values.email + " password: " + formik.values.password)
      setUserName(formik.values.email);
      setUserPassword(formik.values.password);
      setMessage("");
      setLoading(true);

      authService.login(userName, userPassword).then(
        () => {
          //hold back authentication and build the current session in App.js first
          //in order to navigate to /dashboard during that time, global checkin must be enabled to pass the protected routes
          setCheckin(true);
          router.push("/");
          window.location.reload();
        },
        (error) => {
          const resMessage =
           "Falsche Zugangsdaten";

          setLoading(false);
          setMessage(resMessage);
        }
      );
    },
  });

  return (
    <>
      <Head>
        <title>Login | planBar Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <NextLink href="/" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Dashboard
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Login
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Log dich in dein planBar ein
              </Typography>
            </Box>

            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Passwort"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                disabled={loading}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                {loading && <span className="spinner-border spinner-border-sm"></span>}
                Login
              </Button>
            </Box>
            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            <Typography color="textSecondary" variant="body2">
              Noch kein Account?{" "}
              <Link
                to="/register"
                variant="subtitle2"
                underline="hover"
                sx={{
                  cursor: "pointer",
                }}
              >
                Sign Up
              </Link>
            </Typography>
            <Typography color="textSecondary" variant="body2">
              Fragen zum Projekt?{" "}
              <Link
                to="/faq"
                variant="subtitle2"
                underline="hover"
                sx={{
                  cursor: "pointer",
                }}
              >
                Consent
              </Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
