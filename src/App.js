import React, { useReducer, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { AppContext } from "libs/context.js";

import AdminLayout from "layouts/Admin.js";
import CetakLayout from "layouts/Cetak.js";
import CustomersLayout from "layouts/Customer.js";
import AuthLayout from "layouts/Auth.js";

import { ToastContainer } from "react-toastify";
import moment from "moment";
moment.defaultFormat = "YYYY-MM-DD HH:mm:ss";

function init(initiate_data) {
  return initiate_data;
}

function reducer(cartKasir, action) {
  switch (action.type) {
    case "setUsernameSo":
      cartKasir.username_so = action.data_name;
      break;
    case "setPaymentMethod":
      cartKasir.payment_method = action.data_id;
      break;
    case "setKeteranganPayment":
      cartKasir.keterangan_payment = action.data_text;
      break;
    case "setUsernameKurir":
      cartKasir.username_kurir = action.data_text;
      break;

    case "setMember":
      cartKasir.member = action.data_id;
      break;
    case "setCustomer":
      cartKasir.customer = action.data_id;
      break;
    case "setPromo":
      cartKasir.customer = action.data_id;
      break;
    case "setJangkaWaktu":
      cartKasir.jangka_waktu = action.data_id;
      break;
    case "addItem":
      const index = cartKasir.item.findIndex(
        ({ item_id }) => item_id === action.id
      );
      if (index === -1)
        cartKasir.item.push({
          item_id: action.id,
          item_name: action.item_name,
          satuan: action.satuan,
          price: action.price,
          item_code: action.item_code,
          qty: 1,
          qty_fisik: 0,
          keterangan_fisik: " ",
        });
      else cartKasir.item[index].qty++;
      break;
    case "deleteItem":
      break;
    case "changeQtyItem":
      const check = cartKasir.item.findIndex(
        ({ item_id }) => item_id === action.id
      );
      cartKasir.item[check].qty = parseInt(action.qty);
      break;
    case "removeItem":
      const removedIndex = cartKasir.item.findIndex(
        ({ item_id }) => item_id === action.id
      );
      if (removedIndex === 0) {
        cartKasir.item.shift();
        break;
      }
      for (let i = 0; i < cartKasir.item.length; i++) {
        if (i === removedIndex) {
          cartKasir.item.splice(i, 1);
          i--;
        }
      }
      break;

    default:
      break;
  }
  return { ...cartKasir };
}

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [token, setToken] = useState("");
  const [userSession, setUserSession] = React.useState(null);
  const [cartKasir, dispatch] = useReducer(
    reducer,
    {
      username_so: null,
      payment_method: 1,
      keterangan_payment: null,
      status_barang: 1,
      so_type: 1,
      username_kurir: null,
      member: null,
      customer: null,
      receiving_counter: 1,
      promo: null,
      jangka_waktu: null,
      item: [],
    },
    init
  );

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        userHasAuthenticated,
        userName,
        setUserName,
        token,
        setToken,
        userSession,
        setUserSession,
        cartKasir,
        dispatch,
        init,
      }}
    >
      <ToastContainer />
      <BrowserRouter>
        <Switch>
          <Route path="/cetak" render={(props) => <CetakLayout {...props} />} />
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Route
            path="/customers"
            render={(props) => <CustomersLayout {...props} />}
          />
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          <Redirect from="/" to="/auth/login" />
        </Switch>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
