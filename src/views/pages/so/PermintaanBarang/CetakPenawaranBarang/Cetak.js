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
} from "reactstrap";
import axios from "axios";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";

export default function CetakPenawaranBarang(props) {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  const [savedItems, setSavedItems] = useState([]);
  const [usernamea, setUsernamea] = useState("");
  const [codepo, setCodePo] = useState("");
  const [payment_method,setPaymentMethod] = useState([]);
  const [keterangan, setKeterangan] = useState("");
  const [supplier, setSupplier] = useState("");
  const [jangkaWaktu,setJangkaWaktu] = useState([]);
  const [warehouserfq, setWarehouseRfq] = useState("");
  const [coderfq, setCodeRfq] = useState([]);
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
        `${process.env.REACT_APP_API_BASE_URL}/rfq-so/cetak/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        setCodeRfq(data.data.response.rfqso.rfq_code);
        setSupplier(data.data.response.rfqso.customer);
        setPaymentMethod(data.data.response.rfqso.payment_method);
        setJangkaWaktu(data.data.response.rfqso.jangka_waktu);
        setWaktu(data.data.response.rfqso.created)
        setWarehouseRfq(data.data.response.rfqso.warehouse);
        setHargaTotal(data.data.response.rfqso.price_total);
        setKeterangan(data.data.response.rfqso.keterangan);
        // setOngkir(data.data.response.rfqso.ongkir);
        // setCodePo(data.data.response.rfqso.po_code);
        // setLainnya(data.data.response.rfqso.lainnya);
        setValidator(data.data.response.rfqso.validator);
        setListItem(data.data.response.list);
       
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
        <Row>
          <div className="col">
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
                                <h3><b><center>OFFERING</center></b></h3>
                            </Col>
                        </Row>
                    </CardHeader>
                    <Table>
                        <tbody>
                            <tr>
                                <td>
                                    <Row md="24">
                                        <Col md="6">
                                        <div className="row align-items-center mb-3">
                                            <div className="col-4">Kode RFQ</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-5 ">
                                                <b>{coderfq}</b>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mb-3">
                                            <div className="col-4">Issuing Date</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-4 ">
                                                <b>{waktu}</b>
                                            </div>
                                        </div>
                                        {/* <div className="row align-items-center mb-3">
                                            <div className="col-4">Issuing Kode RFQ</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-4 ">
                                                <b>{coderfq}</b>
                                            </div>
                                        </div> */}
                                        <div className="row align-items-center mb-3">
                                            <div className="col-4">Keterangan</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-4 ">
                                                <b>{keterangan}</b>
                                            </div>
                                        </div>
                                        {/* <div className="row align-items-center mb-3">
                                            <div className="col-4"></div>
                                            <div className="col-1 text-center"></div>
                                            <div className="col-4 ">
                                            </div>
                                        </div>
                                        <div className="row align-items-center mb-3">
                                            <div className="col-4">Alamat Kirim</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-4 ">
                                                <b>---------------------------</b>
                                            </div>
                                        </div> */}
                                        </Col>
                                        <Col md="6">
                                        <div className="row align-items-center mb-3">
                                            <div className="col-4">Customer Name</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-5 ">
                                                <b>{supplier}</b>
                                            </div>
                                        </div>
                                        {/* <div className="row align-items-center mb-3">
                                            <div className="col-4">Address</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-4 ">
                                                <b>---------------------------</b>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mb-3">
                                            <div className="col-4">Telephone</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-4 ">
                                                <b>---------------------------</b>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mb-3">
                                            <div className="col-4">Email</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-4 ">
                                                <b>---------------------------</b>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mb-3">
                                            <div className="col-4">Name Sales</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-4 ">
                                                <b>{usernamea}</b>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mb-3">
                                            <div className="col-4">Bank Account</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-4 ">
                                                <b>---------------------------</b>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mb-3">
                                            <div className="col-4">Npwp</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-4 ">
                                                <b>---------------------------</b>
                                            </div>
                                        </div> */}
                                        </Col>
                                    </Row>
                                </td>
                            </tr>
                            </tbody>
                    </Table>
                    <CardBody>
                      <br></br>
                      {/* <Table>
                        <thead>
                        <tr>
                            <th>
                            <b>Kode Item</b>
                            </th>
                            <th>
                            <b>Nama Item</b>
                            </th>
                            <th>
                            <b>Brand</b>
                            </th>
                            <th>
                            <b>Qty</b>
                            </th>
                            <th>
                            <b>Sat</b>
                            </th>
                            <th>
                            <b>Price List</b>
                            </th>
                            <th>
                            <b>Disc %</b>
                            </th>
                            <th>
                            <b>Disc %</b>
                            </th>
                            <th>
                            <b>Unit Price</b>
                            </th>
                            <th>
                            <b>Total Price</b>
                            </th>
                            <th>
                            <b>Delivery</b>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            savedItems.map((savedItem, key) => {
                                return (
                                    <tr key={key}><td>{savedItem.qty}</td>
                                        <td>{savedItem.data.item_name}</td>
                                        <td>{savedItem.qty_total}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                      </Table> */}
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
                      dataField: "satuan",
                      text: "Satuan",
                      sort: true,
                    },
                    {
                      dataField: "qty",
                      text: "Qty",
                      sort: true,
                    },
                    {
                        dataField: "harga",
                        text: "Harga",
                        sort: true,
                        formatter: (cell, row) => {
                            return formatRupiah(row.harga)
                        }
                    },
                    {
                      dataField: "diskon_persen",
                      text: "Diskon (%)",
                      sort: true,
                    },
                    {
                      dataField: "diskon_nominal",
                      text: "Diskon (N)",
                      sort: true,
                    },
                    {
                        dataField: "sub_total",
                        text: "Sub Total",
                        sort: true,
                        formatter: (cell, row) => {
                            return formatRupiah(row.sub_total)
                        }
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
                    <CardHeader></CardHeader>
                        <center>Terms of Price, delivery & shipping required</center>
                        <CardFooter></CardFooter>
                    <Table>
                            <tbody>
                            <tr>
                                <td>
                                <Row md="12">
                                    <Col md="4">
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Sales Order</div>
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
                                    {/* <Col md="4">
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Head Store</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-5 ">
                                            <b>---------------------------</b>
                                        </div>
                                    </div>
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Signature</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-4 ">
                                            <b>{username}</b>
                                        </div>
                                    </div>
                                    </Col>
                                    <Col md="4">
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Head Purchasing</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-5 ">
                                            <b>---------------------------</b>
                                        </div>
                                    </div>
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Signature</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-4 ">
                                            <b>{username}</b>
                                        </div>
                                    </div>
                                    </Col> */}
                                </Row>
                                {/* <Col xs="25">
                                <hr />
                                </Col>
                                <Row md="12">
                                <Col md="4">
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Merchandiser</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-5 ">
                                            <b>---------------------------</b>
                                        </div>
                                    </div>
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Signature</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-4 ">
                                            <b>{username}</b>
                                        </div>
                                    </div>
                                    </Col>
                                <Col md="4">
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Delivery Place</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-5 ">
                                            <b>-------------------------- CIF</b>
                                        </div>
                                    </div>
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Shipping & Packing</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-4 ">
                                            <b>-------------------------- Days</b>
                                        </div>
                                    </div>
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Validity of Offer</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-4 ">
                                            <b>-------------------------- Days</b>
                                        </div>
                                    </div>
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Availability</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-4 ">
                                            <b>-------------------------- Days</b>
                                        </div>
                                    </div>
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Quote Validity</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-4 ">
                                            <b>-------------------------- Days</b>
                                        </div>
                                    </div>
                                    </Col>
                                    <Col md="4">
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Supplier Name</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-5 ">
                                            <b>---------------------------</b>
                                        </div>
                                    </div>
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Signature</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-4 ">
                                            <b>{username}</b>
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
          </div>
        </Row>
    </>
  );
}