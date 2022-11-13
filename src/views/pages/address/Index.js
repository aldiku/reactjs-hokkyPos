/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, Row, Col, CardBody, CardHeader, Container, UncontrolledTooltip, ButtonGroup, Collapse, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import SimpleHeader from "components/Headers/SimpleHeader.js";
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import SweetAlert from "react-bootstrap-sweetalert";

const Address = (props) => {
  const token = localStorage.token;
  const [activeTab, setActiveTab] = useState('1');
  const redirectPrefix = `/admin/alamat/edit/`;
  const [alert, setAlert] = React.useState(null);
  const [rowIndex, setRowIndex] = useState(0);
  const [allAddress, setAllAddress] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [npwp, setNpwp] = useState("");

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
      updateDataTable(page, perPage, currentSort, province, city, address, phoneNumber, npwp);
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

  const updateDataTable = (page, perPage, sort, province, city, address, phoneNumber, npwp) => {
    getAddress(page, perPage,sort, province, city, address, phoneNumber, npwp);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
    setProvince(province);
    setCity(city);
    setAddress(address);
    setPhoneNumber(phoneNumber);
    setNpwp(npwp);
  }

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`
      updateDataTable(page, perPage, sort, province, city, address, phoneNumber, npwp)
    }
  }

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  useEffect(() => {
    getAddress(page, perPage, currentSort, "", "", "", "", "");
  }, []);

  const getAddress = (page, perPage, currentSort, province = null, city = null, address = null, phone = null, npwp = null) => {
    let filter = { page: page, per_page: perPage }
    if (province !== null) {
      filter = Object.assign(filter, { province: province })
    }
    if (city !== null) {
      filter = Object.assign(filter, { city: city })
    }
    if (address !== null) {
      filter = Object.assign(filter, { address: address })
    }
    if (phone !== null) {
      filter = Object.assign(filter, { phone: phone })
    }
    if (npwp !== null) {
      filter = Object.assign(filter, { npwp: npwp })
    }
    const data = filter;
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/address`, data, { headers
    })
    .then(data => {
        setAllAddress(data.data.response);
        setPage(data.data.current_page + 1);
        setPerpage(data.data.per_page);
        setTotalItem(data.data.total_item);
    })
      .catch(function (error) {
        console.log(error)
      })
  }

  const delateAddress = (id) => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/address/delete/${id}`, null, {

      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(function (response) {
        setSuccessAlert();
        getAddress();
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const setSuccessAlert = () => {
    setAlert(
      <SweetAlert
        success
        showConfirm
        confirmBtnText="Ok"
        title="Alamat deleted"
        onCancel={hideAlert}
        onConfirm={hideAlert}
      />
    )
  }

  const setQuestionAlert = (id) => {
    setAlert(
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={() => delateAddress(id)}
        onCancel={hideAlert}
        focusCancelBtn
      />
    )
  }

  const hideAlert = () => {
    setAlert(null);
  }

  const rowEvents = {
    onDoubleClick: (e, row, rowIndex) => {
      setHide(false);
      setSelectedAcquirerId(row.acquirer_id);
      setSelectAcquirerName(row.acquirer_name);
    }
  };

  const reset = () => {
    setProvince("");
    setCity("");
    setAddress("");
    setPhoneNumber("");
    setNpwp("");
    updateDataTable(1, perPage, currentSort, "", "", "", "", "");
  }

  return (
    <div>
      {alert}
      <SimpleHeader name="Alamat" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3>List Alamat</h3>
                  <div style={{ textAlign: "right" }}>
                    <Link className="btn btn-info" to="/admin/alamat/create">
                      Add
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
              <h3 onClick={toggleOpen} >Filter &nbsp;
                  {
                    isOpen === true ? <i className="fa fa-angle-down" aria-hidden="true"></i> : <i className="fa fa-angle-right" aria-hidden="true"></i>
                  }
                </h3>
                <Collapse isOpen={isOpen}>
                      <Form>
                        <Row md="12">
                          <Col md="4">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Province</Label>
                              <Input
                                type="text"
                                placeholder="Masukan Province"
                                value={province}
                                onChange={e => updateDataTable(1, perPage, currentSort, e.target.value, city, address, phoneNumber, npwp)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Kota</Label>
                              <Input
                                type="text"
                                placeholder="Masukan Kota"
                                value={city}
                                onChange={e => updateDataTable(1, perPage, currentSort, province, e.target.value, address, phoneNumber, npwp)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Alamat</Label>
                              <Input
                                type="text"
                                placeholder="Masukan Alamat"
                                value={address}
                                onChange={e => updateDataTable(1, perPage, currentSort, province, city, e.target.value, phoneNumber, npwp)}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row md="12">
                          <Col md="4">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Phone Number</Label>
                              <Input
                                type="text"
                                placeholder="Masukan Phone Number"
                                value={phoneNumber}
                                onChange={e => updateDataTable(1, perPage, currentSort, province, city, address, e.target.value, npwp)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">NPWP</Label>
                              <Input
                                type="text"
                                placeholder="Masukan NPWP"
                                value={npwp}
                                onChange={e => updateDataTable(1, perPage, currentSort, province, city, address, phoneNumber, e.target.value)}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Button type="button" onClick={reset} color="secondary">Reset</Button>
                          </Col>
                        </Row>
                      </Form>
                    </Collapse>
                <ToolkitProvider
                  rowNumber={rowIndex}
                  data={allAddress}
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
                      }
                    },
                    {
                      dataField: "province_name",
                      text: "Provice",
                      sort: true,
                    },
                    {
                        dataField: "city_name",
                        text: "Kota",
                        sort: true,
                      },
                      {
                        dataField: "address",
                        text: "Alamat",
                        sort: true,
                      },
                      {
                        dataField: "phone",
                        text: "Phone Number",
                        sort: true,
                      },
                      {
                        dataField: "fax",
                        text: "Fax",
                        sort: true,
                      },
                    {
                      dataField: "", text: "", formatter: (cell, row, index) => {
                        return (
                          <ButtonGroup>
                            <Button>
                              <Link
                                to={redirectPrefix + row.id}
                                id={"tooltip_" + row.id}
                              >
                                <i className="fas fa-user-edit" />
                              </Link>
                            </Button>
                            <UncontrolledTooltip delay={0} target={"tooltip_" + row.id}>
                              Edit
                            </UncontrolledTooltip>
                            <Button
                              id="btn-acquirer"
                              onClick={() => setQuestionAlert(row.id)}
                            >
                              <i className="fas fa-trash" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              placement="top"
                              target="btn-acquirer"
                            >
                              Delete Alamat
                            </UncontrolledTooltip>
                          </ButtonGroup>
                        )
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
                        rowEvents={rowEvents}
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
}

export default Address;
