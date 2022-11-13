/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Label,
  FormGroup,
  Row,
  Input,
  Col,
  CardFooter,
  Container,
  Button,
  Form,
} from "reactstrap";

import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";


export default function Edit(props) {
  const username = localStorage.username;
  const token = localStorage.token;
  const warehouse = localStorage.warehouse;
  
  let history = useHistory();
  const [usernameso, setUsernameSo] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [customer, setCustomer] = useState("");
  const [customers, setCustomers] = useState([]);
  const [ordercode,setOrderCode]= useState("");
  const [jangkawaktu,setJangkaWaktu] = useState([]);
  const [keteranganpayment,setKeteranganPayment] = useState("");
  const [paymentmethod,setPaymentMethod] = useState("");
  const [keteranganso,setKeteranganSo] = useState("");
  const [termin,setTermin] = useState([]);
  const [durasitempo,setDurasiTempo] = useState("");
  const [soType, setSoType] = useState("");
  const [approve, setApprove] = useState([]);
  const [adminapprove,setAdminApprove] = useState([]);
  const [usernameadmin,setUsernameAdmin] = useState("");
  const [statusSo,setStatusSO] = useState("");
  const [rowIndex, setRowIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [totalItem, setTotalItem] = useState(0);
  const [currentSort, setCurrentSort] = useState("");

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
        getSo(data.data.response_data.id);
        setOrderCode(data.data.response_data.order_code);
        setUsernameSo(data.data.response_data.username_so);
        setPaymentMethod(data.data.response_data.payment_method);
        setKeteranganSo(data.data.response_data.keterangan_so);
        setJangkaWaktu(data.data.response_data.jangka_waktu);
        setKeteranganPayment(data.data.response_data.keterangan_payment );
        setTermin(data.data.response_data.is_cicil);
        setDurasiTempo(data.data.response_data.durasi_so);
        setCustomer(data.data.response_data.customer);
        setSoType(data.data.response_data.so_type);
        setApprove(data.data.response_data.approve);
        setAdminApprove(data.data.response_data.admin_approval);
        setUsernameAdmin(data.data.response_data.username_admin);
        setStatusSO(data.data.response_data.so_status);

      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getSo = (soId) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const data = {
      so_id: parseInt(soId),
    };
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/sales-order/so-items`,
        data,
        {
          headers,
        }
      )
      .then((data) => {
        getCustomer();

      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getCustomer = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/customer/list`, { headers })
      .then((data) => {
        setCustomers(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let paginationOption = {
    page: page,
    alwaysShowAllBtns: true,
    override: true,
    showTotal: true,
    withFirstAndLast: false,
    sizePerPage: perPage,
    totalSize: totalItem,
    onPageChange: (page) => {
      updateDataTable(page, perPage, currentSort, uomCode, description);
    },
    sizePerPageRenderer: () => (
      <div className="dataTables_length" id="datatable-basic_length">
        <label>
          Show{" "}
          {
            <select
              name="datatable-basic_length"
              aria-controls="datatable-basic"
              className="form-control form-control-sm"
              onChange={(e) => {
                updateDataTable(page, e.target.value, currentSort)
              }}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          }{" "}
          entries.
        </label>
      </div>
    ),
  }

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`
      updateDataTable(page, perPage, sort,  uomCode, description)
    }
  }


  function EditData() {
    setLoading(true);
    let data = {

        warehouse_id : parseInt(warehouse),
        username_so : usernameso,
        payment_method : paymentmethod,
        jangka_waktu : jangkawaktu,
        keterangan_payment : keteranganpayment,
        is_cicil: parseInt(termin),
        approve: parseInt(approve),
        keterangan_so: keteranganso,
        username_admin: username,
        admin_approval: parseInt(adminapprove),
        keterangan_admin: "",
        username_validator : "",
        clear : 0,
        keterangan_validator : "",
        username_gudang : "",
        status_barang : 0,
        keterangan_gudang : "",
        username_kurir : "",
        member : 1,
        customer : customer,
        address_id:1,
        active_flag : 1,
        so_type: soType,
        so_status : 1,
        promo_id: 0,
        items : [
        ]
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

  const handleSubmit = (e) => {
    e.preventDefault();
    {
      EditData();
    }
  };

  return (
    <div> 
      <SimpleHeader name="Validasi Admin Sales Order" parentName="SO" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Card>
                <Form onSubmit={handleSubmit}> 
                  <CardBody>
                    <Row md="12">
                        <Col md="6">
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Kode SO
                            </Label>
                            <Col sm={7}>
                              <Input
                              disabled
                                type="text"
                                name="desc"
                                placeholder="Masukan Keterangan PO"
                                value={ordercode}
                                onChange={(e) => {
                                 
                                }}
                              />
                              
                            </Col>
                          </FormGroup>
                            <Col sm={7}>
                              <Input
                                type="hidden"
                                name="desc"
                                placeholder="Masukan Username So"
                                value={usernameso}
                                onChange={(e) => {
                                  setUsernameSo(e.target.value);
                                 
                                }}
                              />
                              
                            </Col>
                          
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                                Customer
                            </Label>
                            <Col sm={7}>
                            <Input
                            disabled
                                name="kategory"
                                type="select"
                                value={customer}
                                onChange={(e) => {
                                  setCustomer(e.target.value);
                                }}
                              >
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
                              keterangan SO
                            </Label>
                            <Col sm={7}>
                              <Input
                              disabled
                                type="text"
                                name="desc"
                                placeholder="Masukan Keterangan SO"
                                value={keteranganso}
                                onChange={(e) => {
                                  setKeteranganSo(e.target.value);
                                }}
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Status SO
                            </Label>
                            <Col sm={7}>
                            <Input
                            disabled
                                name="paymentMethod"
                                type="select"
                                value={statusSo}
                                onChange={(e) => {
                                  setSoType(e.target.value);
                                }}
                              >
                               
                                <option value={1}>Kasir</option>
                                <option value={2}>Sales</option>
                                <option value={2}>Canvasing</option>
                              </Input>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Tipe SO
                            </Label>
                            <Col sm={7}>
                            <Input
                            disabled
                                name="paymentMethod"
                                type="select"
                                value={soType}
                                onChange={(e) => {
                                  setSoType(e.target.value);
                                }}
                              >
                                <option value="">Pilih Payment Method</option>
                                <option value={1}>Ready</option>
                                <option value={2}>Indent</option>
                              </Input>
                            </Col>
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Durasi Tempo
                            </Label>
                            <Col sm={7}>
                            <Input
                            disabled
                                type="text"
                                name="barcode"
                                placeholder="Masukan Durasi Tempo"
                                value={durasitempo}
                                onChange={(e) => {
                                  setDurasiTempo(e.target.value);
                                  
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
                            <Col sm={7}>
                            <Input
                            disabled
                                type="number"
                                name="jangkawaktu"
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
                              Termin
                            </Label>
                            <Col sm={7}>
                            <Input
                            disabled
                            name="satuan"
                            type="select"
                            value={termin}
                            onChange={(e) => {
                              setTermin(e.target.value);
                            }}
                          >
                            
                            <option value={1}>Lunas</option>
                            <option value={2}>Belum Lunas</option>
                            
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
                          disabled
                          name="paymentMethod"
                          type="select"
                          value={paymentmethod}
                          onChange={(e) => {
                            setPaymentMethod(e.target.value);
                          }}
                        >
                          <option value="">Pilih Payment Method</option>
                          <option value={1}>Tunai</option>
                          <option value={2}>Tempo/Termin/Utang</option>
                        </Input>
                            </Col>
                          </FormGroup>
                              <Col sm={6}>
                                <div style={{ display: "none" }}>
                                  <div className="custom-control custom-radio mb-3">
                                    <Input
                                      className="custom-control-input"
                                      id="customRadio8"
                                      name="custom-radio-3"
                                      type="radio"
                                      value={1}
                                      checked={approve === 1}
                                      onChange={() => setApprove(1)}
                                    />
                                    <Label
                                      className="custom-control-label"
                                      htmlFor="customRadio8"
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
                                      id="customRadio9"
                                      name="custom-radio-3"
                                      type="radio"
                                      value={2}
                                      checked={approve === 2}
                                      onChange={() => setApprove(2)}
                                    />
                                    <Label
                                      className="custom-control-label"
                                      htmlFor="customRadio9"
                                    >
                                      Ditolak
                                    </Label>
                                  </div>
                                  <div
                                    className="custom-control custom-radio mb-3"
                                    style={{ marginLeft: "20px" }}
                                  >
                                    <Input
                                      className="custom-control-input"
                                      id="customRadio10"
                                      name="custom-radio-3"
                                      type="radio"
                                      value={3}
                                      checked={approve === 3}
                                      onChange={() => setApprove(3)}
                                    />
                                    <Label
                                      className="custom-control-label"
                                      htmlFor="customRadio10"
                                    >
                                      Dibatalkan
                                    </Label>
                                  </div>
                                </div>
                              </Col>
                          
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Admin Approval
                            </Label>
                              <Col sm={6}>
                                <div style={{ display: "flex" }}>
                                  <div className="custom-control custom-radio mb-3">
                                    <Input
                                      className="custom-control-input"
                                      id="customRadio11"
                                      name="custom-radio-4"
                                      type="radio"
                                      value={1}
                                      checked={adminapprove === 1}
                                      onChange={() => setAdminApprove(1)}
                                    />
                                    <Label
                                      className="custom-control-label"
                                      htmlFor="customRadio11"
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
                                      id="customRadio12"
                                      name="custom-radio-4"
                                      type="radio"
                                      value={2}
                                      checked={adminapprove === 2}
                                      onChange={() => setAdminApprove(2)}
                                    />
                                    <Label
                                      className="custom-control-label"
                                      htmlFor="customRadio12"
                                    >
                                      Ditolak
                                    </Label>
                                  </div>
                                  <div
                                    className="custom-control custom-radio mb-3"
                                    style={{ marginLeft: "20px" }}
                                  >
                                    <Input
                                      className="custom-control-input"
                                      id="customRadio13"
                                      name="custom-radio-4"
                                      type="radio"
                                      value={3}
                                      checked={adminapprove === 3}
                                      onChange={() => setAdminApprove(3)}
                                    />
                                    <Label
                                      className="custom-control-label"
                                      htmlFor="customRadio13"
                                    >
                                      Dibatalkan
                                    </Label>
                                  </div>
                                </div>
                              </Col>
                          </FormGroup>
                        </Col>
                    </Row>
                    <ToolkitProvider
                            rowNumber={rowIndex}
                            data={""}
                            keyField="id"
                            columns={[
                                {
                                  dataField: "no",
                                  text: "No",
                                  sort: true,
                                  page: 1,
                                  formatter: (cell, row, index) => {
                                    let currentRow = ++index;
                                    return currentRow + rowIndex;
                                  }
                                },
                                {
                                  dataField: "kode_Item",
                                  text: "Kode Item",
                                  sort: true,
                                },
                                {
                                  dataField: "Qty",
                                  text: "Qty ",
                                  sort: true,
                                },
                                {
                                  dataField: "satuan",
                                  text: "Satuan ",
                                  sort: true,
                                },
                                {
                                  dataField: "Harga",
                                  text: "Harga ",
                                  sort: true,
                                },
                              ]}
                          >
                            {(props) => (
                              <div className="py-4 table-responsive">
                                <BootstrapTable
                                  remote
                                  {...props.baseProps}
                                  bootstrap4={true}
                                  bordered={false}
                                  hover={true}
                                  pagination={paginationFactory({ ...paginationOption })}
                                  onTableChange={handleTableChange}
                                />
                              </div>
                            )}
                    </ToolkitProvider>
                  </CardBody>
                  <CardFooter>
                  <Row md="12">
                    <Col md="9">
                    </Col>
                    <Col md="3">
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
                    <Link className="btn btn-info" to="/admin/so">
                      Kembali
                    </Link>
                    </Col>
                  </Row>
                  </CardFooter>
                  </Form>
                  </Card>
              </CardBody>
              </Card>
          </div>
        </Row>
        </Container>
    </div>
  );
}
