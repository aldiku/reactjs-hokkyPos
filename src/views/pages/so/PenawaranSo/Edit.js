/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  
  Card,
  Button,
  Row,
  Col,
  CardBody,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter
  
} from "reactstrap";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function EditPenawaranSo(props)  {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [harga, setHarga] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState("");
  const [typereq, setTypeReq] = useState([]);
  const [pengiriman, setPengiriman] = useState([]);
  const [payment_method,setPaymentMethod] = useState([]);
  const [keterangan, setKeterangan] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [allJangkaWaktu, setAllJangkaWaktu] = useState([]);
  const [jangkaWaktu,setJangkaWaktu] = useState(0);
  const [qty, setQty] = useState(0);
  const [active, setActive] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [savedItems, setSavedItems] = useState([]);
  const [coderfq, setCodeRfq] = useState("");
  const [input, setInput] = useState("");
  const [pay1,setPay1] =useState([]);
  const [payment_method1,setPaymentMethod1] = useState([]);
  const [keteranganbayar,setKeteranganBayar] = useState("");
  const [editingItem, setEditingitem] = useState([]);
  const [manualaddress, setManualAddress] = useState("");
  const [allpajak, setAllPajak] = useState([]);
  const [ppn, setPPN] = useState(0);
  const [totaldiskon, setTotalDiskon] = useState(0);
  const [grandtotal, setGrandTotal] = useState(0);
  const [diskonglobalnominal, setDiskonGlobalNominal] = useState();
  const [diskonglobalpersen,setDiskonGlobalPersen] = useState();
  const [ongkir, setOngkir] = useState(0);
  const [pajak, setPajak] = useState("");
  const [lainnya, setLainnya] = useState(0);

  useEffect(() => {
		setGrandTotal(totalPrice + ppn - totaldiskon);
	}, [totalPrice, ppn, totaldiskon]);

  useEffect(() => {
    getById();
  }, []);

  const getById = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/sales-order/get/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        console.log(data);
        getCustomer(data.data.response.customer_id);
        getPajak(data.data.response.pajak_id);
        getItemDataSaved();
        setPaymentMethod(data.data.response.payment_method);
        getJangkaWaktu(data.data.response.jangka_waktu);
        setQty(data.data.response.qty_total);
        setKeterangan(data.data.response.keterangan);
        setOngkir(data.data.response.ongkir);
        setManualAddress(data.data.response.manual_address);
        setLainnya(data.data.response.lainnya);
        setTotalPrice(data.data.response.price_total);
        setPay1(data.data.response.pay_1);
        setPaymentMethod1(data.data.response.payment_method1);
        setKeteranganBayar(data.data.response.keterangan1);
        setCodeRfq(data.data.response.code_rfq);
        setPengiriman(data.data.response.pengiriman);
        setTypeReq(data.data.response.type);
        setDiskonGlobalNominal(data.data.response.diskon_global_nominal);
        setDiskonGlobalPersen(data.data.response.diskon_global_persen);
       
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getJangkaWaktu = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/jwkredit/list`, { headers })
      .then((data) => {
        setAllJangkaWaktu(data.data.response);
        setJangkaWaktu(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getPajak = (id) => {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `bearer ${token}`,
		};
		axios
			.get(`${process.env.REACT_APP_API_BASE_URL}/pajak/list`, { headers })
			.then((data) => {
				setAllPajak(data.data.response);
				setPajak(id);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

  const getItemDataSaved = () => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/sales-order/item`, {

        so_id: props.match.params.id

    }).then(async response => {
        let stateItem = [];
        let stateEditing=[];
        await Promise.all(response.data.response.map(async (data) => {
            stateItem = [...stateItem, {
                item_id: data.item_id,
                item_name:data.item_name,
                qty: data.qty,
                harga: data.harga,
                diskon_persen: data.diskon_persen,
                diskon_nominal: data.diskon_nominal,
                data: {
                    item_name: data.item_name,
                    harga: data.harga,
                    diskon_persen: data.diskon_persen,
                  diskon_nominal: data.diskon_nominal,
                  qty: data.qty,
                },
            }];
            stateEditing = [...stateEditing, {
                editing: false
            }];
        }));
        setEditingitem(stateEditing);
        setSavedItems(stateItem);
    })
}

const getCustomer = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/customer/list`,
        { headers }
      )
      .then((data) => {
        setCustomers(data.data.response);
        setCustomer(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  function EditData() {
    setLoading(true);
    
   }

  function EditData() {
    setLoading(true);
    let dataItems = [];
        savedItems.map((dataItem) => dataItems = [...dataItems, 
            { 
                item_id: dataItem.item_id, 
                qty: dataItem.qty, 
                harga:dataItem.harga,
                diskon_nominal:dataItem.diskon_nominal,
                diskon_persen:dataItem.diskon_persen,
            }]);
    let data = {
        warehouse_id : parseInt(warehouse),
        username : username,
        code_rfq: coderfq,
        customer_id: parseInt(customer),
        type : parseInt(typereq),
        pengiriman: parseInt(pengiriman),
        status_ph : 3,
        payment_method: parseInt(payment_method),
        pay_1:parseFloat(pay1),
        manual_address: manualaddress,
        payment_method1: parseFloat(payment_method1),
        keterangan1 : keteranganbayar,
        ongkir: parseFloat(ongkir),
        lainnya:parseFloat(lainnya),
        pajak_id: parseInt(pajak),
        jangka_waktu:parseInt(jangkaWaktu),
        keterangan: keterangan,
        diskon_global_nominal: parseFloat(diskonglobalnominal),
        diskon_global_persen : parseFloat(diskonglobalpersen),
        items : dataItems
    };
    axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/sales-order/update/${props.match.params.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          history.push("/admin/sales-order");
        })
        .then((json) => {
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
  }

// const getItemData = () => {
//     axios.post(`${process.env.REACT_APP_API_BASE_URL}/so-item/page`, {
//         page: 1,
//         per_page: 1,
//         warehouse_id: parseInt(warehouse),
//         item_name: input
//     }).then(async response => {
//         const length = response.data.response.length;
//         if (length === 0)
//             return;

//         const idItem = response.data.response[0].id;

//         axios.get(`${process.env.REACT_APP_API_BASE_URL}/so-item/get/${idItem}`)
//             .then(async response => {
//                 return {
//                     item: response.data.response,
//                 };
//             }).then((data) => {
//                 let stateItem = [...savedItems, {
//                     item_id: idItem,
//                     qty: parseInt(qty),
//                     harga: harga,
//                     diskon_nominal:0,
//                     diskon_persen:0,
//                     data: data.item,
//                 }];

//                 setTotalPrice(totalPrice + harga * parseInt(qty));
//                 setSavedItems(stateItem);
//             });
//     });
// }

const getItemData = () => {
  axios.post(`${process.env.REACT_APP_API_BASE_URL}/items`, {
    page: 1,
    per_page: 1,
    item_name: input,
    warehouse_id: parseInt(warehouse)
  }).then(async (response) => {
      const length = response.data.response.length;
      if (length === 0) return;

      const idItem = response.data.response[0].id;
      const diskonnominal = 0 ;
      const diskonpersen = 0 ;
      const qtyy = 1;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(
          `${process.env.REACT_APP_API_BASE_URL}/items-by-price?item_id=${idItem}&qty=${qtyy}
      `,
          { headers }
        )
        .then(async response => {
          return {
              item: response.data.response[0],
          };

      }).then((data) => {
          
          let stateItem = [...savedItems, {
              item_id: idItem,
              item_name : data.item_name,
              qty: qty,
              harga: harga,
              diskon_persen: diskonpersen,
              diskon_nominal: diskonnominal,
              data: data.item,
          }];

          let stateEditing = [...editingItem, {
              editing: false
          }];
          setEditingitem(stateEditing);
          setTotalPrice(totalPrice + harga * qty - diskonnominal);
          setSavedItems(stateItem);
          
      });
  });
}

const saveItem = () => {
    if (qty === '' || qty <= 0)
        return;
    getItemData();
}

const onChange = (e) => {
  
    const input = e.currentTarget.value;

    axios.post(`${process.env.REACT_APP_API_BASE_URL}/items`, {
        page: 1,
        per_page: 10,
        item_name: input,
        warehouse_id: parseInt(warehouse)
    }).then(async response => {
        let suggests = [];

        await Promise.all(response.data.response.map((data) =>
            suggests = [...suggests, data.item_name]
        ));

        setActive(0);
        setFiltered(suggests);
        setIsShow(true);
    });

    setInput(e.currentTarget.value);
};
const onClick = e => {
    setActive(0);
    setFiltered([]);
    setIsShow(false);
    setInput(e.currentTarget.innerText)
};
const onKeyDown = e => {
    if (e.keyCode === 13) { // enter key
        setActive(0);
        setIsShow(false);
        setInput(filtered[active])
    }
    else if (e.keyCode === 38) { // up arrow
        return (active === 0) ? null : setActive(active - 1);
    }
    else if (e.keyCode === 40) { // down arrow
        return (active - 1 === filtered.length) ? null : setActive(active + 1);
    }
};

const AutoCompleTes = () => {
    if (isShow && input) {
        if (filtered.length) {
            return (
                <ul className="autocomplete">
                    {filtered.map((suggestion, index) => {
                        let className;
                        if (index === active) {
                            className = "active";
                        }
                        return (
                            <li key={index} className={className} onClick={onClick}>
                                {suggestion}
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

const formatRupiah = (money) => {
  return new Intl.NumberFormat('id-ID',
      { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
  ).format(money);
}
  
  const handleSubmit = (e) => {
    e.preventDefault();
    {
      EditData();
    }
  };

  const deleteItem = (id) => {
    let array = [...savedItems];

    let index = array.findIndex(object => {
        return object.item_id === id;
    });

    if (index !== -1) {
        setTotalPrice(totalPrice - array[index].harga * array[index].qty - array[index].diskon_nominal);
        array.splice(index, 1);
        setSavedItems(array);
    }
}

const changeItemDataTable = async (arg) => {
  setTotalPrice(totalPrice + savedItems[arg.index].harga * savedItems[arg.index].qty - savedItems[arg.index].diskon_nominal);

  setSavedItems([
      ...savedItems.slice(0, arg.index),
      Object.assign({}, savedItems[arg.index], {
          data: {
              item_name: arg.itemName,
              qty :savedItems[arg.index].qty,
              harga: savedItems[arg.index].harga,
              diskon_nominal: savedItems[arg.index].diskon_nominal,
              diskon_persen: savedItems[arg.index].diskon_persen,
          }
      }),
      ...savedItems.slice(arg.index + 1)
  ]);

  changePriceStatus(arg.index, false);
}

const changePriceStatus = (index, status) => {
setEditingitem([
    ...editingItem.slice(0, index),
    Object.assign({}, editingItem[index], { editing: status }),
    ...editingItem.slice(index + 1)
]);
}

  return (
    <>
    <SimpleHeader name="Edit Sales Order" parentName="SO" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
              <Card>
                <Form onSubmit={handleSubmit}>
                <CardBody>
                    <CardHeader>
                      <h3>Edit Sales Order</h3>
                    </CardHeader>
                    <CardBody>
                          <Col md="6">
                          <Input
                          className="form-control-alternative"
                                  type="hidden"
                                  name="desc"
                                  placeholder="Masukan Keterangan"
                                  value={coderfq}
                                  onChange={(e) => {
                                    setCodeRfq(e.target.value);
                                  }}
                                />
                          </Col>
                      <Row md="12">
                          <Col md="6">
                          <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Customer
                              </Label>
                              <Col sm={7}>
                              <Input
                              className="form-control-alternative"
                                  name="customer"
                                  type="select"
                                  value={customer}
                                  onChange={(e) => {
                                    setCustomer(e.target.value);
                                  }}
                                >
                                  <option value=''>Pilih Customer</option>
                                  {customers.map((customer, key) => {
                                      return (
                                        <option key={key} value={customer.id}>
                                          {customer.name}
                                        </option>
                                      );
                                    })}
                                  </Input>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Tipe Request
                            </Label>
                            <Col sm={7}>
                            <Input
                            className="form-control-alternative"
                                name="Tipe Request"
                                type="select"
                                value={typereq}
                                onChange={(e) => {
                                  setTypeReq(e.target.value);
                                }}
                              >
                                <option value="">Pilih Request</option>
                                <option value={1}>Customer Request</option>
                                <option value={2}>Stok Request</option>
                              </Input>
                            </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Keterangan
                              </Label>
                              <Col sm={7}>
                                <Input
                                className="form-control-alternative"
                                  type="textarea"
                                  rows = "4"
                                  name="desc"
                                  placeholder="Masukan Keterangan"
                                  value={keterangan}
                                  onChange={(e) => {
                                    setKeterangan(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Alamat
                              </Label>
                              <Col sm={7}>
                                <Input
                                className="form-control-alternative"
                                  type="textarea"
                                  name="keterangan"
                                  rows = "4"
                                  placeholder="Masukan Alamat"
                                  value={manualaddress}
                                  onChange={(e) => {
                                    setManualAddress(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                Diskon
                              </Label>
                              <Col sm={3}>
                                <Input
                                autoComplete="off"
                                  className="form-control-alternative"
                                  type="text"
                                  placeholder="Diskon (%)"
                                  value={diskonglobalpersen}
                                  onChange={(e) => {
                                    setDiskonGlobalPersen(e.target.value);
                                  }}
                                />
                              </Col>
                              <Col sm={3}>
                                <Input
                                  autoComplete="off"
                                  className="form-control-alternative"
                                  type="text"
                                  name="lebar"
                                  placeholder="Diskon (N)"
                                  value={diskonglobalnominal}
                                  onChange={(e) => {
                                    setDiskonGlobalNominal(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                          </Col>
                          <Col md="6">
                          <FormGroup row>
														<Label for="exampleEmail" sm={4}>
															PPN
														</Label>
														<Col sm={7}>
															<Input
                                className="form-control-alternative"
																type="select"
																value={pajak}
																onChange={(e) => {
																	setPajak(e.target.value);
																}}>
                                <option value=''>Pilih PPN</option>
                                  {allpajak.map((warehouse2, key) => {
                                    return (
                                        <option key={key} value={warehouse2.id}>
                                          {warehouse2.keterangan}
                                        </option>
                                    );
                                  })}
                                </Input>
														</Col>
													</FormGroup>
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Pengiriman
                            </Label>
                            <Col sm={7}>
                            <Input
                            className="form-control-alternative"
                                name="Tipe Request"
                                type="select"
                                value={pengiriman}
                                onChange={(e) => {
                                  setPengiriman(e.target.value);
                                }}
                              >
                                <option value="">Pilih Request</option>
                                <option value={1}>Ambil Sendiri</option>
                                <option value={2}>Delivery</option>
                              </Input>
                            </Col>
                            </FormGroup>
                            <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Metode Pembayaran
                            </Label>
                            <Col sm={7}>
                            <Input
                            className="form-control-alternative"
                                name="Tipe Po"
                                type="select"
                                value={payment_method}
                                onChange={(e) => {
                                    setPaymentMethod(e.target.value);
                                }}
                              >
                                <option value={1}>Tunai</option>
                                <option value={2}>Termin</option>
                              </Input>
                            </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Jangka Waktu
                              </Label>
                              <Col sm={4}>
                                <Input
                                className="form-control-alternative"
                                  type="select"
                                  name="desc"
                                  value={jangkaWaktu}
                                  onChange={(e) => {
                                    setJangkaWaktu(e.target.value);
                                  }}
                                >
                                <option value="">Pilih</option>
                                {allJangkaWaktu.map((waktu, key) => {
                                  return (
                                    <option key={key} value={waktu.durasi}>
                                      {waktu.durasi}
                                    </option>
                                  );
                                })}
                              </Input>
                              </Col> 
                              <Label for="exampleEmail" sm={4}>
                                <b>Hari</b>
                              </Label>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Ongkir
                              </Label>
                              <Col sm={7}>
                                <Input
                                className="form-control-alternative"
                                  type="text"
                                  name="desc"
                                  placeholder="Masukan Ongkir"
                                  value={ongkir}
                                  onChange={(e) => {
                                    setOngkir(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup>
                            <FormGroup row>
                              <Label
                              disabled
                                for="exampleEmail"
                                sm={4}
                              >
                                Lain-Lain
                              </Label>
                              <Col sm={7}>
                                <Input
                                className="form-control-alternative"
                                  type="text"
                                  name="desc"
                                  placeholder="Masukan Lainnya"
                                  value={lainnya}
                                  onChange={(e) => {
                                    setLainnya(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup>
                          </Col>
                      </Row>
                        <Col xs="12">
                            <hr />
                        </Col>
                      <Row md="12">
                        <Col md="6">
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Bayar
                            </Label>
                            <Col sm={7}>
                              <Input
                              className="form-control-alternative"
                                name="person"
                                type="text"
                                placeholder="Masukan Pembayaran Total"
                                value={pay1}
                                onChange={(e) => {
                                  setPay1(e.target.value);
                                }}
                              />
                            </Col>
                          </FormGroup>
                        </Col>
                        <Col md="6">
                        <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Metode Pembayaran
                            </Label>
                            <Col sm={7}>
                              <Input
                              className="form-control-alternative"
                                name="Tipe Po"
                                type="select"
                                value={payment_method1}
                                onChange={(e) => {
                                    setPaymentMethod1(e.target.value);
                                }}
                              >
                                <option value={""}>Pilih Metode Pembayaran</option>
                                <option value={1}>Tunai</option>
                                <option value={2}>Transfer</option>
                                <option value={3}>Termin Of Payment</option>
                                <option value={4}>Indent DP</option>
                                <option value={5}>Indent Lunas</option>
                              </Input>
                            </Col>                             
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row md="12">
                          <Col md="6">
                          </Col>
                          <Col md="6">
                          <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Keterangan
                              </Label>
                              <Col sm={7}>
                                <Input
                                className="form-control-alternative"
                                  type="text"
                                  name="desc"
                                  placeholder="Masukan Keterangan Pembayaran"
                                  value={keteranganbayar}
                                  onChange={(e) => {
                                    setKeteranganBayar(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup>
                          </Col>
                      </Row>
                      <Col xs="12">
                            <hr />
                      </Col>
                    <Row md="12">
                          <Col md="6">
                            <FormGroup row>
                              <Label
                                  for="exampleEmail"
                                  sm={4}
                                >
                                  Item
                                </Label>
                               <Col sm={7}>
                              <Input
                              className="form-control-alternative"
                                  placeholder="Item ..."
                                  type="text"
                                  onChange={onChange}
                                  onKeyDown={onKeyDown}
                                  value={input}
                              />
                              </Col>
                              <AutoCompleTes />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                          <FormGroup row>
                            <Label
                                  for="exampleEmail"
                                  sm={4}
                                >
                                  Quantity
                              </Label>
                            <Col sm={7}>
                              <Input
                              className="form-control-alternative"
                                  placeholder="Quantity"
                                  type="number"
                                  style={{ height: 38 }}
                                  onChange={(e) => setQty(e.target.value)}
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label
                                  for="exampleEmail"
                                  sm={4}
                                >
                                  Harga
                              </Label>
                            <Col sm={7}>
                              <Input
                              className="form-control-alternative"
                                  placeholder="Harga"
                                  type="text"
                                  style={{ height: 38 }}
                                  onChange={(e) => setHarga(e.target.value)}
                              />
                            </Col>
                          </FormGroup>
                          </Col>
                      </Row>
                    {/* <Col xl="12">
                        <Button color="primary" className="mb-3" onClick={() => saveItem()}>Add</Button>
                    </Col> */}
                    <Row md="12">
                        <Col md="6">
                        </Col>
                        <Col md="6">
                          <FormGroup row>
                            <Label
                                  for="exampleEmail"
                                  sm={4}
                                >
                              </Label>
                            <Col sm={6}>
                            <Button color="primary" onClick={() => saveItem()}>Tambah</Button>
                            </Col>
                          </FormGroup>
                        </Col>
                      </Row>
                      <br></br>
                      <br></br>
                      <br></br>
                      <Table>
                        <thead>
                        <tr>
                            <th>
                            Nama Item
                            </th>
                            <th>
                            Harga Per Item
                            </th>
                            <th>
                            Quantity
                            </th>
                            <th>
                            Diskon %
                            </th>
                            <th>
                            Diskon (N)
                            </th>
                            <th>
                            Sub Harga
                            </th>
                            <th>
                            
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            savedItems.map((savedItem, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{savedItem.data.item_name}</td>
                                        <td>
                                            {editingItem[key].editing ? (
                                                <Input
                                                className="form-control-alternative"
                                                    placeholder="Harga Per Item"
                                                    type="number"
                                                    row="3"
                                                    value={savedItems[key].harga}
                                                    onChange={(e) => {
                                                        setSavedItems([
                                                            ...savedItems.slice(0, key),
                                                            Object.assign({}, savedItems[key], { harga: e.target.value, totalPrice: e.target.value * savedItem.qty }),
                                                            ...savedItems.slice(key + 1)
                                                        ]);
                                                    }}
                                                />
                                            ) : (
                                                    <>{formatRupiah(savedItem.harga)}</>
                                                )}
                                        </td>
                                        <td>
                                            {editingItem[key].editing ? (
                                                    <Input
                                                    className="form-control-alternative"
                                                        placeholder="qty"
                                                        type="number"
                                                        value={savedItems[key].qty}
                                                        onChange={(e) => {
                                                            setSavedItems([
                                                                ...savedItems.slice(0, key),
                                                                Object.assign({}, savedItems[key], { qty: e.target.value, totalPrice: savedItem.harga * e.target.value }),
                                                                ...savedItems.slice(key + 1)
                                                            ]);
                                                        }}
                                                    />
                                            ) : (
                                                        <>{savedItem.qty}</>
                                                    )}
                                        </td>
                                        <td>
                                            {editingItem[key].editing ? (
                                                <Input
                                                className="form-control-alternative"
                                                    placeholder="Diskon Persen"
                                                    type="number"
                                                    value={savedItems[key].diskon_persen}
                                                    onChange={(e) => {
                                                        setSavedItems([
                                                            ...savedItems.slice(0, key),
                                                            Object.assign({}, savedItems[key], { diskon_persen: e.target.value, totalPrice: savedItem.harga * savedItem.qty / e.target.value}),
                                                            ...savedItems.slice(key + 1)
                                                        ]);
                                                    }}
                                                />
                                            ) : (
                                                    <>{savedItem.diskon_persen}</>
                                                )}
                                        </td>
                                        <td>
                                            {editingItem[key].editing ? (
                                                <Input
                                                className="form-control-alternative"
                                                    placeholder="Diskon nominal"
                                                    type="number"
                                                    value={savedItems[key].diskon_nominal}
                                                    onChange={(e) => {
                                                        setSavedItems([
                                                            ...savedItems.slice(0, key),
                                                            Object.assign({}, savedItems[key], { diskon_nominal: e.target.value, totalPrice: savedItem.harga * savedItem.qty - e.target.value }),
                                                            ...savedItems.slice(key + 1)
                                                        ]);
                                                    }}
                                                />
                                            ) : (
                                                    <>{formatRupiah(savedItem.diskon_nominal)}</>
                                                )}
                                        </td>
                                        <td>
                                            {editingItem[key].editing ? (
                                                <Input
                                                className="form-control-alternative"
                                                    placeholder="Total"
                                                    type="number"
                                                    value={savedItems[key].totalPrice}
                                                    disabled
                                                />
                                            ) : (
                                              <>{formatRupiah(savedItem.harga * savedItem.qty - savedItem.diskon_nominal)}</>
                                                )}
                                        </td>
                                        <td>
                                            {editingItem[key].editing ? (
                                                <>
                                                    <Button color="warning" onClick={() => changeItemDataTable({
                                                        index: key,
                                                        itemName: savedItem.data.item_name,
                                                        qty: savedItem.qty,
                                                        harga : savedItem.harga,
                                                        diskon_nominal: savedItem.diskon_nominal,
                                                        diskon_persen: savedItem.diskon_persen,
                                                    })}>Update</Button>
                                                    <Button color="danger" onClick={() => {
                                                        setSavedItems([
                                                            ...savedItems.slice(0, key),
                                                            Object.assign({}, savedItems[key], { 
                                                              itemName: savedItem.item_name,
                                                              harga: savedItem.harga,  
                                                              diskon_nominal: savedItem.data.diskon_nominal, 
                                                              diskon_persen: savedItem.data.diskon_persen,  
                                                              qty: savedItem.qty,}),
                                                            ...savedItems.slice(key + 1)
                                                        ]);
                                                        changePriceStatus(key, false);
                                                    }}>Cancel</Button>
                                                </>
                                            ) : (
                                                    <>
                                                        <Button color="warning" onClick={() => changePriceStatus(key, true)}>Edit</Button>
                                                        <Button color="danger" onClick={() => deleteItem(savedItem.item_id)}>Delete</Button>
                                                    </>
                                                )}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                      </Table>
                    </CardBody>
                    <CardFooter >
                      <Row md="12">
                          <Col md="4">
                          </Col>
                          <Col md="4">
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                                size="small"
                              >
                                Sub Total
                              </Label>
                              <Col sm={6}>
                              <Input
                              className="form-control-alternative"
                                  disabled
                                  type="text"
                                  name="barcode"
                                  placeholder="Harga Total"
                                  value={totalPrice}
                                  onChange={(e) => {
                                    setTotalPrice(e.target.value);
                                  }}
                                  
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Total Diskon
                              </Label>
                              <Col sm={6}>
                              <Input
                              className="form-control-alternative"
                                  disabled
                                  type="text"
                                  name="barcode"
                                  placeholder="Total Diskon"
                                  value={totaldiskon}
                                  onChange={(e) => {
                                    setTotalDiskon(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                PPN
                              </Label>
                              <Col sm={6}>
                              <Input
                              className="form-control-alternative"
                                  disabled
                                  type="text"
                                  name="barcode"
                                  placeholder="PPN"
                                  value={ppn}
                                  onChange={(e) => {
                                    setPPN(e.target.value);
                                  }}
                                  
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Grand Total
                              </Label>
                              <Col sm={6}>
                              <Input
                              className="form-control-alternative"
                                  disabled
                                  type="text"
                                  name="barcode"
                                  placeholder="Grand Total"
                                  value={grandtotal}
                                  onChange={(e) => {
                                    setGrandTotal(e.target.value);
                                  }}
                                  
                                />
                              </Col>
                            </FormGroup>
                          </Col>
                          <Col md="4">
                          </Col>
                      </Row>
                    </CardFooter>
                </CardBody>
                <CardFooter>
                      {!isLoading && (
                        <Button color="primary" type="submit">
                          Simpan
                        </Button>
                      )}
                      {isLoading && (
                        <Button color="primary" disabled>
                          <i className="fas fa-spinner fa-spin"></i>
                          {""}
                          loading...
                        </Button>
                      )}
                      <Link className="btn btn-info" to="/admin/sales-order">
                        Kembali
                      </Link>
                </CardFooter>
                </Form>
              </Card>
          </div>
        </Row>
    </Container>
    </>
  );
}