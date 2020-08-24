import React, { useState } from "react";
import {
  Link,
  Box,
  Typography,
  Container,
  TextField,
  CssBaseline,
  Button,
  Avatar,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";

import tokenVerify from "../functions/tokenVerify";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Checktoken() {
  const [accesstoken, setState] = useState("");

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={useStyles().paper}>
        <Avatar className={useStyles().avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          LINE Rich Menu Uploader
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Access Token"
          name="access_token"
          autoFocus
          value={accesstoken}
          onChange={(event) => setState(event.target.value)}
        />
        <Button
          // type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={useStyles().submit}
          onClick={() => tokenVerify(accesstoken)}
        >
          Verify
        </Button>
      </div>
      <Box mt={8}>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="https://taewapon.site/">
            Taewapon.site
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </Container>
  );
}
