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
import CodeIcon from "@material-ui/icons/Code";
import { makeStyles } from "@material-ui/core/styles";

import linerichmenu from "../functions/linerichmenu";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#00B900",
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
          <CodeIcon />
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
          disabled={accesstoken.length > 80 ? false : true}
          onClick={() => linerichmenu.verify(accesstoken)}
        >
          Verify
        </Button>
      </div>
      <Box mt={8}>
        <Typography variant="body2" color="textSecondary" align="center" hidden>
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
