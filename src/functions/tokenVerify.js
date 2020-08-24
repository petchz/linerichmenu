import axios from "axios";
const url = "https://api.line.me/v2/oauth/verify";

function tokenVerify(value) {
  axios
    .post(
      url,
      { access_token: value },
      {
        withCredentials: false,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
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