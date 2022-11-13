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
  
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function EditPermintaanBarang(props) {
    const token = localStorage.token;
    const warehouse = localStorage.warehouse;
    const username = localStorage.username;
    let history = useHistory();
    const [persons, setPersons] = useState([]);
    const [person, setPerson] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [rfq_code,setRfqCode] = useState("");
    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState("");
    const [qty,setQty] = useState([]);
    const [harga,setHarga] = useState([]);
    const [active, setActive] = useState(0);
    const [typereq,setTypeReq] = useState([]);
    const [pengiriman, setPengiriman] = useState([]);
    const [keterangan,setKeterangan] = useState("");
    const [input, setInput] = useState("");
    const [totalPrice,setTotalPrice] = useState(0);
    const [filtered, setFiltered] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [allpajak, setAllPajak] = useState([]);
    const [ppn, setPPN] = useState(0);
    const [totaldiskon, setTotalDiskon] = useState(0);
    const [grandtotal, setGrandTotal] = useState(0);
    const [savedItems, setSavedItems] = useState([]);
    const [editingItem, setEditingitem] = useState([]);
    const [alamat, setAlamat] = useState("");
    const [diskonglobalnominal, setDiskonGlobalNominal] = useState(0);
    const [diskonglobalpersen,setDiskonGlobalPersen] = useState(0);
    const [ongkir, setOngkir] = useState(0);
    const [pajak, setPajak] = useState("");
    const [payment, setPayment] = useState("");
    const [allJangkaWaktu, setAllJangkaWaktu] = useState([]);
    const [jangkaWaktu,setJangkaWaktu] = useState(0);
    const [lainnya, setLainnya] = useState(0);
  
    useEffect(() => {
      setGrandTotal(totalPrice + ppn - totaldiskon);
    }, [totalPrice, ppn, totaldiskon]);
  
    useEffect(() => {
      getById();
      getPajak();
    }, []);
  
    const getById = () => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(
          `${process.env.REACT_APP_API_BASE_URL}/rfq-so/get/${props.match.params.id}`,
          { headers }
        )
        .then((data) => {
          getCustomer(data.data.response.customer_id);
          getPajak(data.data.response.pajak_id);
          getItemDataSaved();
          setRfqCode(data.data.response.rfq_code);
          setQty(data.data.response.qty_total);
          setHarga(data.data.response.harga);
          setTypeReq(data.data.response.type);
          setPengiriman(data.data.response.pengiriman);
          setKeterangan(data.data.response.keterangan);
          setTotalPrice(data.data.response.price_total);
          getJangkaWaktu(data.data.response.jangka_waktu);
          setOngkir(data.data.response.ongkir);
          setLainnya(data.data.response.lainnya);
          setPayment(data.data.response.payment_method);
          setDiskonGlobalNominal(data.data.response.diskon_global_nominal);
          setDiskonGlobalPersen(data.data.response.diskon_global_persen);
          setAlamat(data.data.response.manual_address);
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
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/rfq-so/item`, {

            rfq_id: props.match.params.id

        }).then(async response => {
            let stateItem = [];
            let stateEditing = [];

            await Promise.all(response.data.response.map(async (data) => {
                stateItem = [...stateItem, {
                    item_id: data.item_id,
                    item_name:data.item_name,
                    qty: data.qty,
                    harga : data.harga,
                    diskon_nominal : data.diskon_nominal,
                    diskon_persen : data.diskon_persen,
                    data: {
                        item_name: data.item_name,
                        harga: data.harga,
                        qty: data.qty,
                        diskon_nominal : data.diskon_nominal,
                        diskon_persen : data.diskon_persen,
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
      let dataItems = [];
        savedItems.map((dataItem) => dataItems = [...dataItems, 
            { 
                item_id: dataItem.item_id, 
                qty: dataItem.qty, 
                harga : dataItem.harga,
                diskon_nominal: dataItem.diskon_nominal,
                diskon_persen : dataItem.diskon_persen,
            }]);
        let data = {
        warehouse_id : parseInt(warehouse),
        pajak_id : parseInt(pajak),
        username : username,
        customer_id: parseInt(customer),
        status_rfq: 3,
        status : 3,
        pengiriman : parseInt(pengiriman),
        type : parseInt(typereq),
        keterangan: keterangan,
        manual_address : alamat, 
        diskon_global_nominal : diskonglobalnominal,
        diskon_global_persen : diskonglobalpersen,
        ongkir : parseInt(ongkir),
        lainnya : parseInt(lainnya),
        payment_method: parseInt(payment),
        jangka_waktu : parseInt(jangkaWaktu),
        items : dataItems
        };
      axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/rfq-so/update/${props.match.params.id}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          history.push("/admin/penawaran-barang");
          
        })
        .then((json) => {
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
 
    const handleSubmit = (e) => {
      e.preventDefault();
      {
        
      saveItem();
      setInput();
      setQty();
      setHarga();
  
      }
    };
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
  
  const changePriceStatus = (index, status) => {
    setEditingitem([
        ...editingItem.slice(0, index),
        Object.assign({}, editingItem[index], { editing: status }),
        ...editingItem.slice(index + 1)
    ]);
  }
  
  const changeItemDataTable = async (arg) => {
      setTotalPrice(totalPrice + savedItems[arg.index].harga * savedItems[arg.index].qty - savedItems[arg.index].diskon_nominal);
  
      setSavedItems([
          ...savedItems.slice(0, arg.index),
          Object.assign({}, savedItems[arg.index], {
              data: {
                  item_name: arg.itemName,
                  qty:savedItems[arg.index].qty,
                  harga: savedItems[arg.index].harga,
                  diskon_nominal: savedItems[arg.index].diskon_nominal,
                  diskon_persen: savedItems[arg.index].diskon_persen,
              }
          }),
          ...savedItems.slice(arg.index + 1)
      ]);
  
      changePriceStatus(arg.index, false);
  }
  
  const formatRupiah = (money) => {
      return new Intl.NumberFormat('id-ID',
          { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
      ).format(money);
    }
        
  return (
    <>
    <SimpleHeader name="Edit Penawaran SO" parentName="PSO" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
              <Card>
                
                <CardBody>
                    <CardHeader>
                      <h3>Edit Penawaran SO</h3>
                    </CardHeader>
                    <CardBody>
                      <Row md="12">
                      <Col md="6">
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={3}
                              >
                                Customer
                              </Label>
                              <Col sm={6}>
                              <Input
                              className="form-control-alternative"
                                  name="person"
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
                              sm={3}
                            >
                              Tipe Request
                            </Label>
                            <Col sm={6}>
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
                              sm={3}
                            >
                              Pengiriman
                            </Label>
                            <Col sm={6}>
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
                                <option value={3}>Kurir</option>
                              </Input>
                            </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={3}
                              >
                                Alamat
                              </Label>
                              <Col sm={6}>
                                <Input
                                className="form-control-alternative"
                                  type="textarea"
                                  name="keterangan"
                                  rows = "4"
                                  placeholder="Masukan Alamat"
                                  value={alamat}
                                  onChange={(e) => {
                                    setAlamat(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={3}
                              >
                                Keterangan
                              </Label>
                              <Col sm={6}>
                                <Input
                                className="form-control-alternative"
                                  type="textarea"
                                  name="keterangan"
                                  rows="6"
                                  placeholder="Masukan Keterangan"
                                  value={keterangan}
                                  onChange={(e) => {
                                    setKeterangan(e.target.value);
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
                                Kode RFQ
                              </Label>
                              <Col sm={7}>
                                <Input
                                className="form-control-alternative"
                                disabled
                                  type="text"
                                  name="desc"
                                  placeholder="Masukan RfqCode"
                                  value={rfq_code}
                                  onChange={(e) => {
                                    setRfqCode(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup>
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
                              Metode Pembayaran
                            </Label>
                            <Col sm={7}>
                            <Input
                            className="form-control-alternative"
                                name="Tipe Po"
                                type="select"
                                value={payment}
                                onChange={(e) => {
                                    setPayment(e.target.value);
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
                            <FormGroup row>
                              <Label
                              disabled
                                for="exampleEmail"
                                sm={4}
                              >
                                Diskon Nominal
                              </Label>
                              <Col sm={7}>
                                <Input
                                className="form-control-alternative"
                                  type="text"
                                  name="desc"
                                  placeholder="Masukan Diskon Nominal"
                                  value={diskonglobalnominal}
                                  onChange={(e) => {
                                    setDiskonGlobalNominal(e.target.value);
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
                                Diskon Persen
                              </Label>
                              <Col sm={7}>
                                <Input
                                className="form-control-alternative"
                                  type="text"
                                  name="desc"
                                  placeholder="Masukan Diskon Persen"
                                  value={diskonglobalpersen}
                                  onChange={(e) => {
                                    setDiskonGlobalPersen(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup>
                          </Col>
                      </Row>
                    </CardBody>
                    <Col xs="12">
                        <hr />
                        <h3>Tambah Item</h3>
                    </Col>
                    <CardBody>
                      <Form onSubmit={handleSubmit}>
                        <Row md="12">
                            <Col md="6">
                              <FormGroup row>
                                <Label
                                    for="exampleEmail"
                                    sm={3}
                                  >
                                    Item
                                  </Label>
                                <Col sm={6}>
                                <Input
                                className="form-control-alternative"
                                    placeholder="Item ..."
                                    type="search"
                                    style={{ height: 38 }}
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
                                    sm={3}
                                  >
                                    Quantity
                                </Label>
                              <Col sm={6}>
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
                                    sm={3}
                                  >
                                    Harga
                                </Label>
                              <Col sm={6}>
                                <Input
                                className="form-control-alternative"
                                    placeholder="Quantity"
                                    type="number"
                                    style={{ height: 38 }}
                                    onChange={(e) => setHarga(e.target.value)}
                                />
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
                                    sm={3}
                                  >
                                </Label>
                              <Col sm={6}>
                              <Button color="primary" className="mb-3" onClick={() => saveItem()}>Tambah</Button>
                              </Col>
                            </FormGroup>
                            </Col>
                        </Row>
                      </Form>
                      <Col xl="12">
                      </Col>
                      <Table>
                              <thead>
                                <tr>
                                  <th>
                                    Nama Item
                                  </th>
                                  <th>
                                    Harga
                                  </th>
                                  <th>
                                    Qty
                                  </th>
                                  <th>
                                    Diskon %
                                  </th>
                                  <th>
                                    Diskon (N)
                                  </th>
                                  <th>
                                    Sub Total
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
                                                        qty: savedItem.data.qty,
                                                        harga : savedItem.data.harga,
                                                        diskon_nominal: savedItem.data.diskon_nominal,
                                                        diskon_persen: savedItem.data.diskon_persen,
                                                    })}>Update</Button>
                                                    <Button color="danger" onClick={() => {
                                                        setSavedItems([
                                                            ...savedItems.slice(0, key),
                                                            Object.assign({}, savedItems[key], { harga: savedItem.harga,  diskon_nominal: savedItem.diskon_nominal, diskon_persen: savedItem.diskon_persen,  qty: savedItem.qty,}),
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
                        <Button color="primary" onClick={()=> EditData()}>
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
                      <Link className="btn btn-info" to="/admin/penawaran-barang">
                        Kembali
                      </Link>
                </CardFooter>
                
              </Card>
          </div>
        </Row>
    </Container>  
    </>
  );
}
