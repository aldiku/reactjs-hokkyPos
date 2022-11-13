/*eslint-disable*/
import React, { useEffect, useState, useReducer, useContext } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Input,
  Container,
  InputGroup,
  Button,
  InputGroupText,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import { toast } from "react-toastify";
import ModalPembayaran from "./ModalPembayaran";
import ModalAddMember from "./ModalAddMember";
import { AppContext } from "libs/context";
import ModalAddItem from "./ModalAddItem";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import ModalAddKurir from "./ModalAddKurir";

export default function CreateSalesOrder() {
  const token = localStorage.token;
  const warehouse = localStorage.warehouse;
  const username = localStorage.username;

  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [customer, setCustomer] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [barcode, setBarcode] = useState([]);
  const [active1, setActive1] = useState(0);
  const [filtered1, setFiltered1] = useState([]);
  const [isShow1, setIsShow1] = useState(false);
  const { cartKasir, dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({ type: "setUsernameSo", data_name: localStorage.username });
  }, []);

  useEffect(() => {
    let total = 0;
    cartKasir.item.forEach((item, index) => {
      total += item.price * item.qty;
    });
    setTotalPrice(total);
  }, [cartKasir, dispatch]);

  async function selectModal(id, data_id, data_name = null) {
    switch (id) {
      case "customer":
        setCustomer({
          id: data_id,
          name: data_name,
        });
        dispatch({ type: "setCustomer", data_id: data_id });
        break;
      case "customer":
        setCustomer({
          id: data_id,
          name: data_name,
        });
        dispatch({ type: "setUsernameKurir", data_id: data_name });
        break;
      case "item":
        const item = data_id;
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/items/${item.id}`
        );

        dispatch({
          type: "addItem",
          id: item.id,
          item_name: item.item_name,
          satuan: item.uom_code,
          item_code: item.item_code,
          price: res.data.response.items.price_1,
        });
        break;

      default:
        break;
    }
  }

  const onChange1 = (e) => {
    const barcode = e.currentTarget.value;

    axios.post(`${process.env.REACT_APP_API_BASE_URL}/items`, {
        page: 1,
        per_page: 10,
        barcode: parseInt(barcode),
        warehouse_id : parseInt(warehouse),
    }).then(async response => {
        let suggests = [];

        await Promise.all(response.data.response.map((data) =>
            suggests = [...suggests, data.barcode]
        ));

        setActive1(0);
        setFiltered1(suggests);
        setIsShow1(true);

    });

    setBarcode(e.currentTarget.value);
};

const onClick1 = e => {
    setActive1(0);
    setFiltered1([]);
    setIsShow1(false);
    setBarcode(e.currentTarget.innerText)
};

const onKeyDown1 = e => {
    if (e.keyCode === 13) { // enter key
        setActive1(0);
        setIsShow1(false);
        setBarcode(filtered1[active1])
    }
    else if (e.keyCode === 38) { // up arrow
        return (active1 === 0) ? null : setActive1(active1 - 1);
    }
    else if (e.keyCode === 40) { // down arrow
        return (active1 - 1 === filtered1.length) ? null : setActive1(active1 + 1);
    }
};

const AutoCompleTes1 = () => {
    if (isShow1 && barcode) {
        if (filtered1.length) {
            return (
                <ul className="autocomplete">
                    {filtered1.map((suggestion1, index1) => {
                        let className;
                        if (index1 === active1) {
                            className = "active";
                        }
                        return (
                            <li key={index1} className={className} onClick={onClick1}>
                                {suggestion1}
                            </li>
                        );
                    })}
                </ul>
            );
        } else {
            return (
                <div className="no-autocomplete">
                    <em>Not found</em>
                </div>
            );
        }
    }
    return <></>;
}


  return (
    <>
      <SimpleHeader name="Kasir" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Row>
                  <Col xs={6} className="mb-3">
                    <textarea
                      className="form-control"
                      disabled
                      style={{
                        fontSize: 50,
                        paddingTop: 20,
                        top: "50%",
                        height: 117,
                        resize: "none",
                      }}
                      value={
                        "Rp." +
                        totalPrice
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,") +
                        ",-"
                      }
                    ></textarea>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col xs={3}>
                    <div style={{ display: "flex" }}>
                      <Input
                          placeholder="Masukan Kode Barcode "
                          type="search"
                          style={{ height: 38 }}
                          onChange={onChange1}
                          onKeyDown={onKeyDown1}
                          value={barcode}
                      />
                      <AutoCompleTes1 />
                    </div>
                  </Col>
                  <Col xs={3}>
                    <ModalAddItem selectModal={selectModal} />
                  </Col>
                  <Col xs={3}>
                    <ModalPembayaran></ModalPembayaran>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col xs={3}>
                    <ModalAddMember
                      item={
                        cartKasir.customer == null ? "" : cartKasir.customer
                      }
                      selectModal={selectModal}
                    />
                  </Col>
                  <Col xs={3}>
                    <ModalAddKurir
                      item={
                        cartKasir.username_kurir == null
                          ? ""
                          : cartKasir.username_kurir
                      }
                      selectModal={selectModal}
                    />
                  </Col>
                </Row>
                <ToolkitProvider
                  rowNumb
                  keyField="cart"
                  data={cartKasir.item}
                  columns={[
                    {
                      dataField: "item_name",
                      text: "Nama Item",
                      sort: true,
                    },
                    {
                      dataField: "item_code",
                      text: "Kode item",
                      sort: true,
                    },
                    {
                      dataField: "satuan",
                      text: "Satuan item",
                      sort: true,
                    },
                    {
                      dataField: "price",
                      text: "Harga item",
                      sort: true,
                    },
                    {
                      dataField: "qty",
                      text: "Qty",
                      sort: true,
                      formatter: (cell, row, index) => {
                        {
                          console.log(row);
                        }
                        return (
                          <Input
                            type="number"
                            style={{ width: 50 }}
                            className="mb-0 mt-0 text-center"
                            bsSize="sm"
                            defaultValue={row.qty}
                            onChange={(event) => {
                              event.target.value > 0 &&
                                dispatch({
                                  type: "changeQtyItem",
                                  id: row.item_id,
                                  qty: event.target.value,
                                });
                            }}
                          />
                        );
                      },
                    },
                    {
                      dataField: "sub_total",
                      text: "Sub Total",
                      classes: "text-center",
                      formatter: (cell, row, index) => {
                        return (
                          <div key={index} className="text-center">
                            {row.qty * row.price}
                          </div>
                        );
                      },
                    },
                    {
                      dataField: "action",
                      text: "",
                      classes: "text-center",
                      formatter: (cell, row, index) => {
                        return (
                          <Button
                            key={index * 100}
                            size="sm"
                            onClick={() => {
                              dispatch({
                                type: "removeItem",
                                id: row.item_id,
                              });
                            }}
                            color="danger"
                          >
                            Remove
                          </Button>
                        );
                      },
                    },
                  ]}
                >
                  {(props) => (
                    <BootstrapTable bordered={false} {...props.baseProps} />
                  )}
                </ToolkitProvider>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}
