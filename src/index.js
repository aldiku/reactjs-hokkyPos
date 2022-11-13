/*!

=========================================================
* Argon Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
import ReactDOM from "react-dom";
// react library for routing
import App from "./App.js";
import axios from "axios";
import history from "../src/utils/History.js";

// plugins styles from node_modules
import "react-notification-alert/dist/animate.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "@fullcalendar/common/main.min.css";
import "@fullcalendar/daygrid/main.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "select2/dist/css/select2.min.css";
import "quill/dist/quill.core.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// plugins styles downloaded
import "assets/vendor/nucleo/css/nucleo.css";
// core styles
import "assets/scss/argon-dashboard-pro-react.scss?v1.2.0";
import "assets/css/custom.css";
import "react-toastify/dist/ReactToastify.css";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error.response !== undefined) {
      let response = error.response;
      if (response.status === 401 && response.status === 403) {
        history.push("/auth/login");
        window.location.reload();
      }
    }
    return Promise.reject(error);
  }
);

ReactDOM.render(<App />, document.getElementById("root"));
