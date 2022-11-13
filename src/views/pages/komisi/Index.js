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

const Komisi = () => {
  const token = localStorage.token;
  const userId = parseInt(localStorage.userId);
  const [activeTab, setActiveTab] = useState('1');
  const redirectPrefix = `/admin/departemen/edit/`;
  const [alert, setAlert] = React.useState(null);
  const [rowIndex, setRowIndex] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const [allKomisi, setAllKomisi] = useState([]);

  const [codeTransaction, setCodeTransaction] = useState("");
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
      updateDataTable(page, perPage, currentSort, codeTransaction, startDate, endDate);
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

  const updateDataTable = (page, perPage, sort, codeTransaction, startDate, endDate) => {
    getKomisi(page, perPage, sort, codeTransaction, startDate, endDate);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
    setCodeTransaction(codeTransaction);
    setStartDate(startDate);
    setEndDate(endDate)
  }

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`
      updateDataTable(page, perPage, sort,  codeTransaction, startDate, endDate)
    }
  }

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  useEffect(() => {
    getKomisi(page, perPage, currentSort, "", "", "");
  }, []);

  const getKomisi = async (page, perPage, currentSort, trans_code  = null, start_date  = null, end_date  = null) => {
    let filter = { page: page, per_page: perPage, user_id: parseInt(userId) }
    if (trans_code !== null) {
      filter = Object.assign(filter, { trans_code: trans_code })
    }
    if (start_date !== null) {
      filter = Object.assign(filter, { start_date: start_date })
    }
    if (end_date !== null) {
      filter = Object.assign(filter, { end_date: end_date })
    }
    const data = filter;
    const headers = {
      'Authorization': `Bearer ${token}`,
    };
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/komisi/page`, data, { headers })
      setAllKomisi(res.data.response);
      setPage(res.data.current_page + 1);
      setPerpage(res.data.per_page);
      setTotalItem(res.data.total_item);
    }

  const delateDepartment = (id) => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/department/delete/${id}`, null, {

      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(function (response) {
        setSuccessAlert();
        getKomisi();
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
        title="Departemen deleted"
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
        onConfirm={() => delateDepartment(id)}
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
    setCodeTransaction("");
    setStartDate("");
    setEndDate("");
    updateDataTable(1, perPage, currentSort, "", "", "");
  }

  return (
    <div>
      {alert}
      <SimpleHeader name="Komisi" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3>List Komisi</h3>
                  <div style={{ textAlign: "right" }}>
                    {/* <Link className="btn btn-info" to="/admin/departemen/create">
                      Add
                    </Link> */}
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
                              <Label htmlFor="exampleFormControlSelect3">Kode Transaksi</Label>
                              <Input
                                type="text"
                                placeholder="Masukan Kode Transaksi"
                                value={codeTransaction}
                                onChange={e => updateDataTable(1, perPage, currentSort, e.target.value, startDate, endDate)}
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
                                onChange={e => updateDataTable(1, perPage, currentSort, codeTransaction, e.target.value, endDate)}
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
                                onChange={e => updateDataTable(1, perPage, currentSort, codeTransaction, startDate, e.target.value)}
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
                  data={allKomisi}
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
                      dataField: "name",
                      text: "Nama",
                      sort: true,
                    },
                    {
                      dataField: "trans_code",
                      text: "Kode Transaksi",
                      sort: true,
                    },
                    {
                      dataField: "komisi",
                      text: "Kode",
                      sort: true,
                    },
                    {
                      dataField: "tanggal",
                      text: "Tanggal",
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

export default Komisi;
