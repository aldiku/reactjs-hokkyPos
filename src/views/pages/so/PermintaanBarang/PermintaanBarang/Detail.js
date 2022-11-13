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

export default function DetailPermintaanBarang(props) {
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
    const [savedItems, setSavedItems] = useState([]);
    const [totalPrice,setTotalPrice] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [allpajak, setAllPajak] = useState([]);
    const [ppn, setPPN] = useState(0);
    const [totaldiskon, setTotalDiskon] = useState(0);
    const [grandtotal, setGrandTotal] = useState(0);
    const [alamat, setAlamat] = useState("");
    const [diskonglobalnominal, setDiskonGlobalNominal] = useState(0);
    const [diskonglobalpersen,setDiskonGlobalPersen] = useState(0);
    const [ongkir, setOngkir] = useState(0);
    const [pajak, setPajak] = useState("");
    const [payment, setPayment] = useState("");
    const [jangkawaktu,setJangkaWaktu] = useState(0);
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
          setJangkaWaktu(data.data.response.jangka_waktu);
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
            }));

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
    
    const formatRupiah = (money) => {
        return new Intl.NumberFormat('id-ID',
            { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
        ).format(money);
      }
        
  return (
    <>
    <SimpleHeader name="Detail Penawaran SO" parentName="SO" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
              <Card>
                <CardBody>
                    <CardHeader>
                      <h3>Detail Penawaran SO</h3>
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
                              <Col sm={7}>
                                <Input
                                className="form-control-alternative"
                                  type="number"
                                  name="desc"
                                  placeholder="Masukan Jangka Waktu"
                                  value={jangkawaktu}
                                  onChange={(e) => {
                                    setJangkaWaktu(e.target.value);
                                  }}
                                />
                              </Col>                             
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
                    <CardBody>
                      <Table>
                              <thead>
                                <tr>
                                  <th>
                                    Nama Item
                                  </th>
                                  <th>
                                    Quantity
                                  </th>
                                  <th>
                                    Harga
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                    savedItems.map((savedItem, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{savedItem.data.item_name}</td>
                                                <td>{savedItem.qty}</td>
                                                <td>{formatRupiah(savedItem.harga)}</td>
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
