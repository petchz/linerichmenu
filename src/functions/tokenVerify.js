import axios from "axios";
const url = "https://api.line.me/v2/oauth/verify";

function tokenVerify(value) {
  axios
    .post(
      url,
      { access_token: value },
      {
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
        credentials: "same-origin",
      }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
}

export default tokenVerify;
