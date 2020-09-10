import axios from "axios";
const url = process.env.REACT_APP_URL;

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

  getdefault: async function (data) {
    let value = "";
    await axios
      .get(url + "/richmenu/defaultmenu", {
        headers: {
          access_token: data,
        },
      })
      .then((res) => {
        value = res;
      })
      .catch((err) => {
        value = err;
      });
    return value;
  },

  setdefault: async function (data) {
    let value = "";
    await axios
      .post(url + "/richmenu/defaultmenu", {
        access_token: data.access_token,
        menuid: data.menuid,
      })
      .then((res) => {
        value = res;
      })
      .catch((err) => {
        value = err;
      });
    return value;
  },

  newmenu: async function (data) {
    let value = "";
    await axios
      .post(url + "/richmenu/new", {
        access_token: data.access_token,
        menu: data.menu,
      })
      .then((res) => {
        value = res;
      })
      .catch((err) => {
        value = err;
      });
    return value;
  },

  delmenu: async function (data) {
    let value = "";
    await axios
      .post(url + "/richmenu/del", {
        access_token: data.access_token,
        menuid: data.menuid,
      })
      .then((res) => {
        value = res;
      })
      .catch((err) => {
        value = err;
      });
    return value;
  },

  getimage: async function (data) {
    let value = "";
    await axios
      .post(url + "/richmenu/image", {
        access_token: data.access_token,
        menuid: data.menuid,
      })
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
