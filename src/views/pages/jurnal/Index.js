/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  Row,
  Col,
  CardBody,
  CardHeader,
  Container,
  UncontrolledTooltip,
  ButtonGroup,
  Collapse,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import SweetAlert from "react-bootstrap-sweetalert";

const Jurnal = () => {
  const token = localStorage.token;
  const warehouse = parseInt(localStorage.warehouse);
  const [activeTab, setActiveTab] = useState("1");
  const [alert, setAlert] = React.useState(null);
  const [rowIndex, setRowIndex] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const [allSalary, setAllSalary] = useState([]);
  const [allJurnal, setAllJurnal] = useState([]);

  const [allCoa, setAllCoa] = useState([]);
  const [coa, setCoa] = useState("");
  const [allAccount, setAllAccount] = useState([]);
  const [account, setAccount] = useState("");
  const [typeJurnal, setTypeJurnal] = useState("");

  const [name, setName] = useState("");

  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [totalItem, setTotalItem] = useState(0);
  const [currentSort, setCurrentSort] = useState("");

  let paginationOption = {
    page: page,
    alwaysShowAllBtns: true,
    override: true,
    showTotal: true,
    withFirstAndLast: false,
    sizePerPage: perPage,
    totalSize: totalItem,
    onPageChange: (page) => {
      updateDataTable(page, perPage, currentSort, account, coa, typeJurnal);
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
                updateDataTable(page, e.target.value, currentSort);
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
  };

  useEffect(() => {
    getAccount();
    getCoa();
  }, []);

  const getAccount = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/account/list`, { headers })
      .then((data) => {
        setAllAccount(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getCoa = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/coa/list`, { headers })
      .then((data) => {
        setAllCoa(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateDataTable = (page, perPage, sort, account, coa, typeJurnal) => {
    getJurnal(page, perPage, sort, account, coa, typeJurnal);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
    setAccount(account);
    setCoa(coa);
    setTypeJurnal(typeJurnal);
  };

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`;
      updateDataTable(page, perPage, sort, account, coa, typeJurnal);
    }
  };

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    getJurnal(page, perPage, currentSort, "", "", "");
  }, []);

  const getJurnal = async (
    page,
    perPage,
    currentSort,
    account_id = 0,
    coa_id = 0,
    type = 0
  ) => {
    let filter = {
      page: page,
      per_page: perPage,
      warehouse_id: parseInt(warehouse),
    };
    if (account_id !== 0) {
      filter = Object.assign(filter, { account_id: parseInt(account_id) });
    }
    if (coa_id !== 0) {
      filter = Object.assign(filter, { coa_id: parseInt(coa_id) });
    }
    if (type !== 0) {
      filter = Object.assign(filter, { type: parseInt(type) });
    }
    const data = filter;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/jurnal`,
      data,
      { headers }
    );
    setAllJurnal(res.data.response);
    setPage(res.data.current_page + 1);
    setPerpage(res.data.per_page);
    setTotalItem(res.data.total_item);
  };

  const reset = () => {
    setAccount("");
    setCoa("");
    setTypeJurnal("");
    parseInt(warehouse);
    updateDataTable(1, perPage, currentSort, "", "", "");
  };

  return (
    <div>
      {alert}
      <SimpleHeader name="Jurnal" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>List Jurnal</h3>
                  <div style={{ textAlign: "right" }}>
                    <Link className="btn btn-info" to="/admin/jurnal/create">
                      Add
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <h3 onClick={toggleOpen}>
                  Filter &nbsp;
                  {isOpen === true ? (
                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                  ) : (
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                  )}
                </h3>
                <Collapse isOpen={isOpen}>
                  <Form>
                    <Row md="12">
                      <Col md="3">
                        <FormGroup>
                          <Label
                            className="form-control-label"
                            htmlFor="exampleFormControlSelect3"
                          >
                            Account
                          </Label>
                          <Input
                            name="account"
                            type="select"
                            value={account}
                            onChange={(e) =>
                              updateDataTable(
                                1,
                                perPage,
                                currentSort,
                                e.target.value,
                                coa,
                                typeJurnal
                              )
                            }
                          >
                            <option value="">Pilih Account</option>
                            {allAccount.map((dep, key) => {
                              return (
                                <option key={key} value={dep.id}>
                                  {dep.account_name}
                                </option>
                              );
                            })}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <Label
                            className="form-control-label"
                            htmlFor="exampleFormControlSelect3"
                          >
                            COA
                          </Label>
                          <Input
                            name="coa"
                            type="select"
                            value={coa}
                            onChange={(e) =>
                              updateDataTable(
                                1,
                                perPage,
                                currentSort,
                                account,
                                e.target.value,
                                typeJurnal
                              )
                            }
                          >
                            <option value="">Pilih COA</option>
                            {allCoa.map((dep, key) => {
                              return (
                                <option key={key} value={dep.id}>
                                  {dep.coa_name}
                                </option>
                              );
                            })}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <Label
                            className="form-control-label"
                            htmlFor="exampleFormControlSelect3"
                          >
                            Type
                          </Label>
                          <Input
                            name="type"
                            type="select"
                            value={typeJurnal}
                            onChange={(e) =>
                              updateDataTable(
                                1,
                                perPage,
                                currentSort,
                                account,
                                coa,
                                e.target.value
                              )
                            }
                          >
                            <option value="">Pilih Type</option>
                            <option value={1}>Debit</option>
                            <option value={2}>Credit</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button type="button" onClick={reset} color="secondary">
                          Reset
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Collapse>
                <ToolkitProvider
                  rowNumber={rowIndex}
                  data={allJurnal}
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
                      dataField: "pic",
                      text: "PIC",
                      sort: true,
                    },
                    {
                      dataField: "account",
                      text: "Account",
                      sort: true,
                    },
                    {
                      dataField: "coa",
                      text: "COA",
                      sort: true,
                    },
                    {
                      dataField: "type",
                      text: "Type",
                      sort: true,
                      formatter: (cell, row) => {
                        return row.type === 1 ? "Debit" : "Credit";
                      },
                    },
                    {
                      dataField: "saldo",
                      text: "Saldo",
                      sort: true,
                    },
                    {
                      dataField: "tanggal_transaksi",
                      text: "Tanggal Transaksi",
                      sort: true,
                    },
                    {
                      dataField: "deskripsi",
                      text: "Deskripsi",
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
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Jurnal;
