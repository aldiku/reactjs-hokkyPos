/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, Row, Col, CardBody, CardHeader, Container, UncontrolledTooltip, ButtonGroup, Collapse, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import moment from "moment";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import SweetAlert from "react-bootstrap-sweetalert";

const Asset = (props) => {
  const token = localStorage.token;
  const [activeTab, setActiveTab] = useState('1');
  const redirectPrefix = `/admin/asset/edit/`;
  const [alert, setAlert] = React.useState(null);
  const [rowIndex, setRowIndex] = useState(0);
  const [allAsset, setAllAsset] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const [nameAsset, setNameAsset] = useState("");
  const [codeAsset, setCodeAsset] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
      updateDataTable(page, perPage, currentSort,  nameAsset, codeAsset, startDate, endDate);
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

  const updateDataTable = (page, perPage, sort, nameAsset, codeAsset, startDate, endDate) => {
    getAsset(page, perPage, sort, nameAsset, codeAsset, startDate, endDate);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
    setNameAsset(nameAsset);
    setCodeAsset(codeAsset);
    setStartDate(startDate);
    setEndDate(endDate);
  }

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`
      updateDataTable(page, perPage, sort,  nameAsset, codeAsset, startDate, endDate)
    }
  }

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  useEffect(() => {
    getAsset(page, perPage, currentSort, "", "", "", "", "");
  }, []);

  const getAsset = (page, perPage, currentSort, asset_name = null, asset_code = null, start_date = null, end_date = null) => {
    let filter = { page: page, per_page: perPage }
    if (asset_name !== null) {
      filter = Object.assign(filter, { asset_name: asset_name })
    }
    if (asset_code !== null) {
      filter = Object.assign(filter, { asset_code: asset_code })
    }
    if (start_date !== null) {
      filter = Object.assign(filter, { start_date: start_date })
    }   
    if (end_date !== null) {
      filter = Object.assign(filter, { end_date: end_date })
    }
    const data = filter;
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/asset`, data, { headers
    })
    .then(data => {
        setAllAsset(data.data.response);
        setPage(data.data.current_page + 1);
        setPerpage(data.data.per_page);
        setTotalItem(data.data.total_item);
    })
      .catch(function (error) {
        console.log(error)
      })
  }

  const delateAsset = (id) => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/asset/delete/${id}`, null, {

      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(function (response) {
        setSuccessAlert();
        getAsset();
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
        title="Asset deleted"
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
        onConfirm={() => delateAsset(id)}
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
    setNameAsset("");
    setCodeAsset("");
    setStartDate("");
    setEndDate("");
    updateDataTable(1, perPage, currentSort, "", "", "", "");
  }

  return (
    <div>
      {alert}
      <SimpleHeader name="Asset" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3>List Asset</h3>
                  <div style={{ textAlign: "right" }}>
                    <Link className="btn btn-info" to="/admin/asset/create">
                      Tambah
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
                          <Col md="3">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Nama Asset</Label>
                              <Input
                                type="text"
                                placeholder="Masukan Nama Asset"
                                value={nameAsset}
                                onChange={e => updateDataTable(1, perPage, currentSort, e.target.value, codeAsset, startDate, endDate)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="3">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Kode Asset</Label>
                              <Input
                                type="text"
                                placeholder="Masukan Kode Asset"
                                value={codeAsset}
                                onChange={e => updateDataTable(1, perPage, currentSort, nameAsset, e.target.value, startDate, endDate)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="3">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Start Date</Label>
                              <Input
                                id="example-date-input"
                                type="date"
                                value={startDate}
                                onChange={e => updateDataTable(1, perPage, currentSort, nameAsset, codeAsset, e.target.value, endDate)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="3">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">End Date</Label>
                              <Input
                                id="example-date-input"
                                type="date"
                                value={endDate}
                                onChange={e => updateDataTable(1, perPage, currentSort, nameAsset, codeAsset, startDate, e.target.value)}
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
                  data={allAsset}
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
                      dataField: "asset_code",
                      text: "Kode Asset",
                      sort: true,
                    },
                    {
                        dataField: "asset_name",
                        text: "Nama Asset",
                        sort: true,
                      },
                      {
                        dataField: "asset_type",
                        text: "Type Asset",
                        sort: true,
                      },
                      {
                        dataField: "buying_date",
                        text: "Tanggal Beli",
                        sort: true,
                        formatter: (cell, row) => {
                          return moment(cell).format("L")
                        }
                      },
                      {
                        dataField: "entered_qty",
                        text: "Jumlah",
                        sort: true,
                      },
                      {
                        dataField: "note",
                        text: "Note",
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
                              Delete Asset
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

export default Asset;
