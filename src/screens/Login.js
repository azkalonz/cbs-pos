import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  makeStyles,
  Container,
  Box,
  useTheme,
  useMediaQuery,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Api from "../utils/api";

const queryString = require("query-string");
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Login(props) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div
      className={classes.root}
      style={{ minHeight: "100vh", overflow: "hidden" }}
    >
      <Box
        display="flex"
        width="100%"
        justifyContent="space-between"
        height="100vh"
        alignItems="stretch"
      >
        {!isMobile && (
          <Box flex={1} width="300" className={classes.loginLeftContent}>
            <Box className="logo" />
          </Box>
        )}
        <Box
          flex={1}
          width="55%"
          style={{
            background: "#f9f5fe",
          }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          className={isMobile ? classes.loginMobile : ""}
        >
          <Box width={!isMobile ? 360 : "80%"} maxWidth={435} minWidth={290}>
            <LoginContainer setLoading={props.setLoading} />
          </Box>
        </Box>
      </Box>
    </div>
  );
}

function LoginContainer(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const _handleLogin = async (e) => {
    props.setLoading(true);
    e.preventDefault();
    window.login_error = undefined;

    let res = await Api.post("/users/login", {
      body: {
        username,
        password,
      },
    }).catch((error) => {
      const { response } = error;
      if (response?.data?.error) {
        window.login_error = response.data.error;
      }
    });
    if (res?.success) {
      let redirect_url = queryString.parse(window.location.search).r;
      localStorage["auth"] = JSON.stringify(res.data);
      if (res?.change_password_required) {
        window.localStorage["first_loggon_pass"] = password;
      } else {
        window.localStorage.removeItem("first_loggon_pass");
      }
      window.location = redirect_url ? redirect_url : "/";
    } else {
      props.setLoading(false);
    }
  };
  return (
    <React.Fragment>
      <Box width="100%" display="flex" justifyContent="center" marginBottom={2}>
        {isMobile && <img src="/static/logo.png" width={60} />}
      </Box>
      <Typography
        style={{
          fontWeight: "bold",
          color: theme.palette.grey[800],
          fontSize: "1rem",
          textAlign: isMobile ? "center" : "left",
          zIndex: 2,
          position: "relative",
        }}
      >
        Sign in to Cebu Bakery Supply
      </Typography>
      <br />
      {window.login_error && (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          id="error"
          onClose={() =>
            (document.querySelector("#error").style.display = "none")
          }
        >
          <Alert severity="error" style={{ margin: "30px 0" }}>
            {/* {window.login_error} */}
            Invalid Username or Password
          </Alert>
        </Snackbar>
      )}
      <form action="#" onSubmit={() => false}>
        <TextField
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(event, value) => {
            if (event.keyCode == 13) _handleLogin(event);
          }}
          margin="normal"
          fullWidth
          className={!isMobile ? "themed-input" : "themed-input light"}
          id="email"
          label="Username"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          onKeyDown={(event, value) => {
            if (event.keyCode == 13) _handleLogin(event);
          }}
          fullWidth
          className={!isMobile ? "themed-input" : "themed-input light"}
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
      </form>
      <Typography variant="body2" align="right">
        <Link
          href="#forgot-password"
          style={{ color: isMobile ? "#fff" : theme.palette.primary.main }}
        >
          Forgot Password?
        </Link>
      </Typography>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        style={{ fontWeight: "bold", boxShadow: "none", height: 56 }}
        onClick={_handleLogin}
        className={classes.submit}
      >
        Sign In
      </Button>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  loginLeftContent: {
    backgroundImage:
      "url(/static/img/breadpattern.png), linear-gradient(-120deg," +
      theme.palette.secondary.main +
      ", " +
      theme.palette.primary.main +
      ")",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "50%, 100%",
    position: "relative",
    "& .logo": {
      width: "60%",
      height: "60%",
      background: "url(/static/logo.png) no-repeat center",
      backgroundSize: "100% auto",
    },
  },
  container: {
    background: theme.palette.type === "dark" ? "#222" : "#fff",
    padding: 30,
    position: "relative",
    zIndex: 10,
  },
  root: {
    display: "flex",
    alignItems: "center",
    background: theme.palette.primary.main,
    backgroundSize: "contain",
    position: "relative",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    height: theme.spacing(8),
    margin: theme.spacing(1),
    width: theme.spacing(8),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    "&:hover": {
      backgroundColor: "#FFDA53!important",
      boxShadow: "0 5px 10px 0 rgba(0,0,0,0.10)!important",
      borderRadius: 6,
    },
  },
}));

export default connect((states) => ({
  userInfo: states.userInfo,
}))(Login);
