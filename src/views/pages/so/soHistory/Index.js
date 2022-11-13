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
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const HistorySo = () => {
  const token = localStorage.token;
  const warehouse = parseInt(localStorage.warehouse);
  const [activeTab, setActiveTab] = useState("1");
  const [alert, setAlert] = React.useState(null);
  const [rowIndex, setRowIndex] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const [allHistory, setAllHistory] = useState([]);

  const [usernameSo, setUsernameSo] = useState("");
  const [orderCode, setOrderCode] = useState("");
  const [soType, setSoType] = useState("");
  const [person, setPerson] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [persons, setPersons] = useState([]);

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
      updateDataTable(
        page,
        perPage,
        currentSort,
        usernameSo,
        orderCode,
        soType,
        person,
        startDate,
        endDate
      );
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

  const updateDataTable = (
    page,
    perPage,
    sort,
    usernameSo,
    orderCode,
    soType,
    person,
    startDate,
    endDate
  ) => {
    getHistoryPo(
      page,
      perPage,
      sort,
      usernameSo,
      orderCode,
      soType,
      person,
      startDate,
      endDate
    );
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
    setUsernameSo(usernameSo);
    setOrderCode(orderCode);
    setSoType(soType);
    setPerson(person);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`;
      updateDataTable(
        page,
        perPage,
        currentSort,
        usernameSo,
        orderCode,
        soType,
        person,
        startDate,
        endDate
      );
    }
  };

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    getHistoryPo(page, perPage, currentSort, "", "", "", "", "", "");
    getPerson();
  }, []);

  const getHistoryPo = async (
    page,
    perPage,
    currentSort,
    username_so = null,
    order_code = null,
    so_type = 0,
    person = 0,
    start_date = null,
    end_date = null
  ) => {
    let filter = {
      page: page,
      per_page: perPage,
      warehouse_id: parseInt(warehouse),
    };
    if (username_so !== null) {
      filter = Object.assign(filter, { username_so: username_so });
    }
    if (order_code !== null) {
      filter = Object.assign(filter, { order_code: order_code });
    }
    if (so_type !== 0) {
      filter = Object.assign(filter, { so_type: parseInt(so_type) });
    }
    if (person !== 0) {
      filter = Object.assign(filter, { person: parseInt(person) });
    }
    if (start_date !== null) {
      filter = Object.assign(filter, { start_date: start_date });
    }
    if (end_date !== null) {
      filter = Object.assign(filter, { end_date: end_date });
    }
    const data = filter;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/sales-order/history`,
      data,
      { headers }
    );
    setAllHistory(res.data.response_data);
    setPage(res.data.current_page + 1);
    setPerpage(res.data.per_page);
    setTotalItem(res.data.total_item);
  };

  const getPerson = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/person/list`, { headers })
      .then((data) => {
        setPersons(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const reset = () => {
    setUsernameSo("");
    setOrderCode("");
    setsoType("");
    setPerson("");
    setStartDate("");
    setEndDate("");
    updateDataTable(1, perPage, currentSort, "", "", "", "", "", "");
  };

  return (
    <div>
      {alert}
      <SimpleHeader name="History SO" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>List History SO</h3>
                  <div style={{ textAlign: "right" }}></div>
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
                          <Label htmlFor="exampleFormControlSelect3">
                            Username SO
                          </Label>
                          <Input
                            type="text"
                            placeholder="Masukan Username SO"
                            value={usernameSo}
                            onChange={(e) =>
                              updateDataTable(
                                1,
                                perPage,
                                currentSort,
                                e.target.value,
                                orderCode,
                                soType,
                                person,
                                startDate,
                                endDate
                              )
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label htmlFor="exampleFormControlSelect3">
                            Order Code
                          </Label>
                          <Input
                            type="text"
                            placeholder="Masukan Order Code"
                            value={orderCode}
                            onChange={(e) =>
                              updateDataTable(
                                1,
                                perPage,
                                currentSort,
                                usernameSo,
                                e.target.value,
                                soType,
                                person,
                                startDate,
                                endDate
                              )
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label
                            className="form-control-label"
                            htmlFor="exampleFormControlSelect3"
                          >
                            PO Type
                          </Label>
                          <Input
                            name="paymentMethod"
                            type="select"
                            value={soType}
                            onChange={(e) =>
                              updateDataTable(
                                1,
                                perPage,
                                currentSort,
                                usernameSo,
                                orderCode,
                                e.target.value,
                                person,
                                startDate,
                                endDate
                              )
                            }
                          >
                            <option value="">Pilih Payment Method</option>
                            <option value={1}>Konvensional</option>
                            <option value={2}>Indent</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="3">
                        <FormGroup>
                          <Label
                            className="form-control-label"
                            htmlFor="exampleFormControlSelect3"
                          >
                            Person
                          </Label>
                          <Input
                            name="person"
                            type="select"
                            value={person}
                            onChange={(e) =>
                              updateDataTable(
                                1,
                                perPage,
                                currentSort,
                                usernameSo,
                                orderCode,
                                soType,
                                e.target.value,
                                startDate,
                                endDate
                              )
                            }
                          >
                            <option value="">Pilih Person</option>
                            {persons.map((person, key) => {
                              return (
                                <option key={key} value={person.id}>
                                  {person.person_name}
                                </option>
                              );
                            })}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label htmlFor="exampleFormControlSelect3">
                            Start Date
                          </Label>
                          <Input
                            id="example-date-input"
                            type="date"
                            value={startDate}
                            onChange={(e) =>
                              updateDataTable(
                                1,
                                perPage,
                                currentSort,
                                usernameSo,
                                orderCode,
                                soType,
                                person,
                                e.target.value,
                                endDate
                              )
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label htmlFor="exampleFormControlSelect3">
                            End Date
                          </Label>
                          <Input
                            id="example-date-input"
                            type="date"
                            value={endDate}
                            onChange={(e) =>
                              updateDataTable(
                                1,
                                perPage,
                                currentSort,
                                usernameSo,
                                orderCode,
                                soType,
                                person,
                                startDate,
                                e.target.value
                              )
                            }
                          />
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
                  data={allHistory}
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
                      dataField: "order_code",
                      text: "Order Code",
                      sort: true,
                    },
                    {
                      dataField: "po_type",
                      text: "Type Po",
                      sort: true,
                      formatter: (cell, row) => {
                        return row.po_type === 1 ? "Konvensional" : "Indent";
                      },
                    },
                    {
                      dataField: "total_price",
                      text: "Total Harga",
                      sort: true,
                    },
                    {
                      dataField: "total_qty",
                      text: "Total Quantity",
                      sort: true,
                    },
                    {
                      dataField: "keterangan_payment",
                      text: "Keterangan Payment",
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

export default HistorySo;
