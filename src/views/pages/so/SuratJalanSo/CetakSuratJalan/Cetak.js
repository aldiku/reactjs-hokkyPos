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
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";

export default function CetakSuratJalanSO(props) {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [keterangan, setKeterangan] = useState("");
  const [supplier, setSupplier] = useState("");
  const [jangkaWaktu,setJangkaWaktu] = useState([]);
  const [warehouserfq, setWarehouseRfq] = useState("");
  const [coderfq, setCodeRfq] = useState("");
  const [ongkir, setOngkir] = useState(0);
  const [lainnya, setLainnya] = useState(0);
  const [listItem,setListItem] = useState([]);
  const [waktu,setWaktu] = useState("");
  const [hargatotal, setHargaTotal] = useState([]);
  const [rowIndex, setRowIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [validator, setValidator] = useState("");
  const [validator1, setValidator1] = useState("");
  const [alamat , setAlamat] = useState("");
  const [sales, setSales] = useState("")

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
        `${process.env.REACT_APP_API_BASE_URL}/surat-jalan-so/cetak/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        setCodeRfq(data.data.response.sj.sj_code);
        setSupplier(data.data.response.sj.customer);
        setAlamat(data.data.response.sj.address);
        setSales(data.data.response.sj.sales);
        setWaktu(data.data.response.sj.created)
        setWarehouseRfq(data.data.response.sj.warehouse);
        setHargaTotal(data.data.response.sj.price_total);
        setKeterangan(data.data.response.sj.keterangan);
        setOngkir(data.data.response.sj.ongkir);
        // setCodePo(data.data.response.sj.po_code);
        // setLainnya(data.data.response.sj.lainnya);
        setValidator(data.data.response.sj.validator);
        setListItem(data.data.response.list);
       
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
        <Row>
          <div className="col">
            <CardBody>
<Card>
                <CardBody>
                    <CardHeader>
                        <Row md="12">
                            <Col md="8">
                                <img
                                    style={{ width: "20%" }}
                                    src={require("assets/img/theme/Hokky1.png").default}
                                />
                            </Col>
                            <Col md="4">
                                Head Office : {warehouserfq}<br></br>
                                Jl Menganti Karangan No.562 <br></br>
                                Surabaya - Jawa Timur<br></br>
                                Phone : 081 217 85 3300<br></br>
                                Email : hokkybangunan.sby@gmail.com
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardHeader>
                        <Row md="12">
                            <Col md="12">
                                <h3><b><center>SURAT JALAN</center></b></h3>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                      <Row md="12">
                          <Col md="6">
                            <div className="row align-items-center mb-3">
                                <div className="col-3">Kode SJ</div>
                                <div className="col-1 text-center">:</div>
                                <div className="col-5 ">
                                    <b>{coderfq}</b>
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <div className="col-3">Issuing Date</div>
                                <div className="col-1 text-center">:</div>
                                <div className="col-4 ">
                                    <b>{waktu}</b>
                                </div>
                            </div>
                          </Col>
                          <Col md="6">
                            {/* <div className="row align-items-center mb-3">
                                <div className="col-4">Pengiriman</div>
                                <div className="col-1 text-center">:</div>
                                <div className="col-4 ">
                                    <b>{pengiriman}</b>
                                </div>
                            </div> */}
                            <div className="row align-items-center mb-3">
                                <div className="col-4">Customer</div>
                                <div className="col-1 text-center">:</div>
                                <div className="col-4 ">
                                    <b>{supplier}</b>
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <div className="col-4">Keterangan</div>
                                <div className="col-1 text-center">:</div>
                                <div className="col-4 ">
                                    <b>{keterangan}</b>
                                </div>
                            </div>
                          </Col>
                      </Row>
                      <ToolkitProvider
                  rowNumber={rowIndex}
                  data={listItem}
                  keyField="id"
                  columns={[
                    {
                      dataField: "no",
                      text: "#",
                      sort: true,
                      page: 1,
                      formatter: (cell, row, index) => {
                        let currentRow = ++index;
                        return currentRow + rowIndex;
                      },
                    },
                    {
                      dataField: "item_name",
                      text: "Nama Item",
                      sort: true,
                    },
                    {
                        dataField: "barcode",
                        text: "Barcode",
                        sort: true,
                      },
                    {
                      dataField: "satuan",
                      text: "Satuan",
                      sort: true,
                    },
                    {
                      dataField: "qty",
                      text: "Qty",
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
                        // pagination={paginationFactory()}
                      />
                    </div>
                  )}
                </ToolkitProvider>
                    </CardBody>
                    <Table>
                    <CardHeader></CardHeader>
                    <center>Terms of Price, delivery & shipping required</center>
                    <CardFooter></CardFooter>
                        <tbody>
                          <tr>
                            <td>
                            <Row md="24">
                                <Col md="3">
                                  <div className="row align-items-center mb-3">
                                      <div className="col-4">Kepala Gudang</div>
                                      <div className="col-1 text-center">:</div>
                                      <div className="col-5 ">
                                          <b>{validator}</b>
                                      </div>
                                  </div>
                                  <div className="row align-items-center mb-3">
                                      <div className="col-4">Signature</div>
                                      <div className="col-1 text-center">:</div>
                                      <div className="col-4 ">
                                          <b>---------------------------</b>
                                      </div>
                                  </div>
                                </Col>
                                {/* <Col md="3">
                                  <div className="row align-items-center mb-3">
                                      <div className="col-4">Head Store</div>
                                      <div className="col-1 text-center">:</div>
                                      <div className="col-5 ">
                                          <b>---------------------------</b>
                                      </div>
                                  </div>
                                  <div className="row align-items-center mb-3">
                                      <div className="col-4">Issuing Time</div>
                                      <div className="col-1 text-center">:</div>
                                      <div className="col-4 ">
                                          <b>---------------------------</b>
                                      </div>
                                  </div>
                                  <div className="row align-items-center mb-3">
                                      <div className="col-4">Signature</div>
                                      <div className="col-1 text-center">:</div>
                                      <div className="col-4 ">
                                          <b>---------------------------</b>
                                      </div>
                                  </div>
                                </Col>
                                <Col md="3">
                                  <div className="row align-items-center mb-3">
                                      <div className="col-4">Finance</div>
                                      <div className="col-1 text-center">:</div>
                                      <div className="col-5 ">
                                          <b>---------------------------</b>
                                      </div>
                                  </div>
                                  <div className="row align-items-center mb-3">
                                      <div className="col-4">Issuing Time</div>
                                      <div className="col-1 text-center">:</div>
                                      <div className="col-4 ">
                                          <b>---------------------------</b>
                                      </div>
                                  </div>
                                  <div className="row align-items-center mb-3">
                                      <div className="col-4">Signature</div>
                                      <div className="col-1 text-center">:</div>
                                      <div className="col-4 ">
                                          <b>---------------------------</b>
                                      </div>
                                  </div>
                                </Col>
                                <Col md="3">
                                  <div className="row align-items-center mb-3">
                                      <div className="col-4">SPV Sales</div>
                                      <div className="col-1 text-center">:</div>
                                      <div className="col-5 ">
                                          <b>---------------------------</b>
                                      </div>
                                  </div>
                                  <div className="row align-items-center mb-3">
                                      <div className="col-4">Issuing Time</div>
                                      <div className="col-1 text-center">:</div>
                                      <div className="col-4 ">
                                          <b>---------------------------</b>
                                      </div>
                                  </div>
                                  <div className="row align-items-center mb-3">
                                      <div className="col-4">Signature</div>
                                      <div className="col-1 text-center">:</div>
                                      <div className="col-4 ">
                                          <b>---------------------------</b>
                                      </div>
                                  </div>
                                </Col> */}
                            </Row>
                            {/* <Col xs="25">
                              <hr />
                            </Col>
                            <Row md="12">
                            <Col md="3">
                                  <div className="row align-items-center mb-3">
                                      <div className="col-4">Gudang</div>
                                      <div className="col-1 text-center">:</div>
                                      <div className="col-5 ">
                                          <b>---------------------------</b>
                                      </div>
                                  </div>
                                  <div className="row align-items-center mb-3">
                                      <div className="col-4">Issuing Time</div>
                                      <div className="col-1 text-center">:</div>
                                      <div className="col-4 ">
                                          <b>---------------------------</b>
                                      </div>
                                  </div>
                                  <div className="row align-items-center mb-3">
                                      <div className="col-4">Signature</div>
                                      <div className="col-1 text-center">:</div>
                                      <div className="col-4 ">
                                          <b>---------------------------</b>
                                      </div>
                                  </div>
                                </Col>
                                <Col md="3">
                                  <div className="row align-items-center mb-3">
                                      <div className="col-4">Security</div>
                                      <div className="col-1 text-center">:</div>
                                      <div className="col-5 ">
                                          <b>---------------------------</b>
                                      </div>
                                  </div>
                                  <div className="row align-items-center mb-3">
                                      <div className="col-4">Issuing Time</div>
                                      <div className="col-1 text-center">:</div>
                                      <div className="col-4 ">
                                          <b>---------------------------</b>
                                      </div>
                                  </div>
                                  <div className="row align-items-center mb-3">
                                      <div className="col-4">Signature</div>
                                      <div className="col-1 text-center">:</div>
                                      <div className="col-4 ">
                                          <b>---------------------------</b>
                                      </div>
                                  </div>
                                </Col>
                                <Col md="3">
                                  <div className="row align-items-center mb-3">
                                      <div className="col-4">Driver</div>
                                      <div className="col-1 text-center">:</div>
                                      <div className="col-5 ">
                                          <b>---------------------------</b>
                                      </div>
                                  </div>
                                  <div className="row align-items-center mb-3">
                                      <div className="col-4">Issuing Time</div>
                                      <div className="col-1 text-center">:</div>
                                      <div className="col-4 ">
                                          <b>---------------------------</b>
                                      </div>
                                  </div>
                                  <div className="row align-items-center mb-3">
                                      <div className="col-4">Signature</div>
                                      <div className="col-1 text-center">:</div>
                                      <div className="col-4 ">
                                          <b>---------------------------</b>
                                      </div>
                                  </div>
                                </Col>
                                <Col md="3">
                                  <div className="row align-items-center mb-3">
                                      <div className="col-4">Penerima</div>
                                      <div className="col-1 text-center">:</div>
                                      <div className="col-5 ">
                                          <b>---------------------------</b>
                                      </div>
                                  </div>
                                  <div className="row align-items-center mb-3">
                                      <div className="col-4">Issuing Time</div>
                                      <div className="col-1 text-center">:</div>
                                      <div className="col-4 ">
                                          <b>---------------------------</b>
                                      </div>
                                  </div>
                                  <div className="row align-items-center mb-3">
                                      <div className="col-4">Signature</div>
                                      <div className="col-1 text-center">:</div>
                                      <div className="col-4 ">
                                          <b>---------------------------</b>
                                      </div>
                                  </div>
                                </Col>
                            </Row> */}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                </CardBody>
              </Card>
            </CardBody>
              
          </div>
        </Row>
    </>
  );
}