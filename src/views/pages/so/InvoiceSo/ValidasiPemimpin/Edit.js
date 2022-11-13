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
import { Link,useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function ValidasiPemimpinInvoiceSo(props) {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState("");
  const [pengiriman, setPengiriman] = useState([]);
  const [keterangan, setKeterangan] = useState("");
  const [savedItems, setSavedItems] = useState([]);
  const [codeso, setCodeSo] = useState("");
  const [adminfinance, setAdminFinance] = useState([]);
  const [statusaf, setStatusAf] = useState([]);
  const [statusd, setStatusD] = useState([]);
  const [pay1,setPay1] =useState([]);
  const [payment_method,setPaymentMethod] = useState([]);
  const [keteranganbayar,setKeteranganBayar] = useState("");
  const [ppn, setPPN] = useState(0);
  const [totaldiskon, setTotalDiskon] = useState(0);
  const [grandtotal, setGrandTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [diskonglobalnominal, setDiskonGlobalNominal] = useState();
  const [diskonglobalpersen,setDiskonGlobalPersen] = useState();
  const [ongkir, setOngkir] = useState(0);
  const [pajak, setPajak] = useState("");
  const [lainnya, setLainnya] = useState(0);
  const [coderfq, setCodeRfq] = useState("");
  const [payment_method1, setPaymentMethod1] = useState(0);
  const [allpajak, setAllPajak] = useState([]);
  const [pajakpersen, setPajakPersen] = useState(0);
  const [pajaknominal, setPajakNominal] = useState(0);
  const [allJangkaWaktu, setAllJangkaWaktu] = useState([]);
  const [jangkaWaktu,setJangkaWaktu] = useState(0);

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
        `${process.env.REACT_APP_API_BASE_URL}/invoice-so/get/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        getCustomer(data.data.response.customer_id);
        setStatusAf(data.data.response.status_af);
        setStatusD(data.data.response.status_d);
        setAdminFinance(data.data.response.admin_finance);
        getPajak(data.data.response.pajak_id);
        setCodeSo(data.data.response.so_code);
        setCodeRfq(data.data.response.code_sj);
        setOngkir(data.data.response.ongkir);
        setLainnya(data.data.response.lainnya);
        setPengiriman(data.data.response.pengiriman);
        setPay1(data.data.response.pay_1);
        setKeteranganBayar(data.data.response.keterangan1);
        setKeterangan(data.data.response.keterangan);
        setTotalPrice(data.data.response.price_total);
        getJangkaWaktu(data.data.response.jangka_waktu);
        setPaymentMethod(data.data.response.payment_method);
        setDiskonGlobalNominal(data.data.response.diskon_global_nominal);
        setDiskonGlobalPersen(data.data.response.diskon_global_persen);
        getItemDataSaved();
       
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

  const getItemDataSaved = () => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/invoice-so/item`, {

        invoice_id: props.match.params.id

    }).then(async response => {
        let stateItem = [];

        await Promise.all(response.data.response.map(async (data) => {
            stateItem = [...stateItem, {
                item_id: data.item_id,
                item_name:data.item_name,
                qty: data.qty,
                harga: data.harga,
                pembayaran: data.pembayaran,
                diskon_nominal : data.diskon_nominal,
                diskon_persen : data.diskon_persen,
                data: {
                    item_name: data.item_name,
                    harga: data.harga,
                    pembayaran: data.pembayaran,
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
                pembayaran:dataItem.pembayaran,
                diskon_nominal : dataItem.diskon_nominal,
                diskon_persen : dataItem.diskon_persen,
            }]);
    let data = {
        warehouse_id : parseInt(warehouse),
        code_so: codeso,
        status_af: parseInt(statusaf),
        status_d: parseInt(statusd),
        admin_finance: adminfinance,
        direktur:username,
        customer_id: parseInt(customer),
        pengiriman: parseInt(pengiriman),
        ongkir : parseFloat(ongkir),
        lainnya: parseFloat(lainnya),
        pay_1 : parseFloat(pay1),
        payment_method1 : parseInt(payment_method),
        keterangan1 : keteranganbayar,
        keterangan: keterangan ,
        items : dataItems
    };
    axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/invoice-so/update/${props.match.params.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          history.push("/admin/invoice-so");
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
      EditData();
    }
  };

  const formatRupiah = (money) => {
    return new Intl.NumberFormat('id-ID',
        { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
    ).format(money);
  }


  return (
    <>
    <SimpleHeader name="Validasi Direktur" parentName="SO" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
              <Card>
                <Form onSubmit={handleSubmit}>
                <CardBody>
                    <CardHeader>
                      <h3>Validasi Direktur</h3>
                    </CardHeader>
                    <CardBody>
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
                              disabled
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
                                Keterangan
                              </Label>
                              <Col sm={7}>
                                <Input
                                className="form-control-alternative"
                                disabled
                                  type="textarea"
                                  name="desc"
                                  rows = "4"
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
                              Metode Pembayaran
                            </Label>
                            <Col sm={7}>
                            <Input
                            disabled
                            className="form-control-alternative"
                                name="Tipe Po"
                                type="select"
                                value={payment_method}
                                onChange={(e) => {
                                    setPaymentMethod(e.target.value);
                                }}
                              >
                                <option value={""}>Pilih Metode Pembayaran</option>
                                <option value={1}>Tunai</option>
                                <option value={2}>Tempo</option>
                                <option value={3}>Dp Cicil</option>
                                <option value={4}>Dp Lunas</option>
                              </Input>
                            </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                Diskon
                              </Label>
                              <Col sm={3}>
                                <Input
                                disabled
                                autoComplete="off"
                                  className="form-control-alternative"
                                  type="number"
                                  placeholder="Diskon (%)"
                                  value={diskonglobalpersen}
                                  onChange={(e) => {
                                    setDiskonGlobalPersen(e.target.value);
                                  }}
                                />
                              </Col>
                              <Col sm={4}>
                                <Input
                                disabled
                                  autoComplete="off"
                                  className="form-control-alternative"
                                  type="number"
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
                              disabled
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
                              <Label for="exampleEmail" sm={4}>
                                Pajak
                              </Label>
                              <Col sm={3}>
                                <Input
                                disabled
                                autoComplete="off"
                                  className="form-control-alternative"
                                  type="number"
                                  placeholder="Pajak (%)"
                                  value={pajakpersen}
                                  onChange={(e) => {
                                    setPajakPersen(e.target.value);
                                  }}
                                />
                              </Col>
                              <Col sm={4}>
                                <Input
                                disabled
                                  autoComplete="off"
                                  className="form-control-alternative"
                                  type="number"
                                  name="lebar"
                                  placeholder="Pajak (N)"
                                  value={pajaknominal}
                                  onChange={(e) => {
                                    setPajakNominal(e.target.value);
                                  }}
                                />
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
                                disabled
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
                                disabled
                                  type="number"
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
                                for="exampleEmail"
                                sm={4}
                              >
                                Lain-Lain
                              </Label>
                              <Col sm={7}>
                                <Input
                                className="form-control-alternative"
                                disabled
                                  type="number"
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
                                disabled
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
                                disabled
                                  name="Tipe Po"
                                  type="select"
                                  value={payment_method1}
                                  onChange={(e) => {
                                      setPaymentMethod(e.target.value);
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
                                 disabled
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
                            <Col sm={7}>
                                <div style={{ display: "none" }}>
                                  <div className="custom-control custom-radio mb-3">
                                    <Input
                                      className="custom-control-input"
                                      id="customRadio5"
                                      name="custom-radio-4"
                                      type="radio"
                                      value={5}
                                      checked={statusaf === 5}
                                      onChange={() => setStatusAf(5)}
                                    />
                                    <Label
                                      className="custom-control-label"
                                      htmlFor="customRadio5"
                                    >
                                      Disetujui
                                    </Label>
                                  </div>
                                  <div
                                    className="custom-control custom-radio mb-3"
                                    style={{ marginLeft: "20px" }}
                                  >
                                    <Input
                                      className="custom-control-input"
                                      id="customRadio6"
                                      name="custom-radio-4"
                                      type="radio"
                                      value={4}
                                      checked={statusaf === 4}
                                      onChange={() => setStatusAf(4)}
                                    />
                                    <Label
                                      className="custom-control-label"
                                      htmlFor="customRadio4"
                                    >
                                      Ditolak
                                    </Label>
                                  </div>
                                </div>
                              </Col>
                            <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Validasi
                            </Label>
                              <Col sm={7}>
                                <div style={{ display: "flex" }}>
                                  <div className="custom-control custom-radio mb-3">
                                    <Input
                                      className="custom-control-input"
                                      id="customRadio12"
                                      name="custom-radio-5"
                                      type="radio"
                                      value={5}
                                      checked={statusd === 5}
                                      onChange={() => setStatusD(5)}
                                    />
                                    <Label
                                      className="custom-control-label"
                                      htmlFor="customRadio12"
                                    >
                                      Disetujui
                                    </Label>
                                  </div>
                                  <div
                                    className="custom-control custom-radio mb-3"
                                    style={{ marginLeft: "20px" }}
                                  >
                                    <Input
                                      className="custom-control-input"
                                      id="customRadio13"
                                      name="custom-radio-5"
                                      type="radio"
                                      value={4}
                                      checked={statusd === 4}
                                      onChange={() => setStatusD(4)}
                                    />
                                    <Label
                                      className="custom-control-label"
                                      htmlFor="customRadio13"
                                    >
                                      Ditolak
                                    </Label>
                                  </div>
                                </div>
                              </Col>
                            </FormGroup>
                          </Col>
                      </Row>
                      <br></br>
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
                              Sub Harga
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            savedItems.map((savedItem, key) => {
                                return (
                                  <tr key={key}>
                                  <td>{savedItem.data.item_name}</td>
                                  <td>{formatRupiah(savedItem.harga)}</td>
                                  <td>{savedItem.qty}</td>
                                  <td>{savedItem.diskon_persen}</td>
                                  <td>{formatRupiah(savedItem.diskon_nominal)}</td>
                                  <td>{formatRupiah(savedItem.harga * savedItem.qty - savedItem.diskon_nominal)}</td>
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
                      <Link className="btn btn-info" to="/admin/invoice-so">
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