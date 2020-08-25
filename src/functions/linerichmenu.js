import axios from "axios";
const url = "http://localhost:4000";

const linerichmenu = {
  verify: async function (data) {
    let value = "";
    await axios
      .post(url + "/verify", { access_token: data })
      .then((res) => {
        if (res.data.scope === "P") {
          localStorage.token = data;
          value = true;
        } else {
          value = false;
        }
      })
      .catch((err) => {
        console.error(err);
      });
    return value;
  },

  menulist: async function (data) {
    let value = "";
    await axios
      .post(url + "/richmenu/list", { access_token: data })
      .then((res) => {
        value = res;
      })
      .catch((err) => {
        value = err;
      });
    return value;
  },
};

export default linerichmenu;
