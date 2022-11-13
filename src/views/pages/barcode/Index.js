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

const Barcode = (props) => {
  const token = localStorage.token;
  const warehouse = parseInt(localStorage.warehouse);
  const [activeTab, setActiveTab] = useState('1');
  const redirectPrefix = `/admin/alamat/edit/`;
  const [alert, setAlert] = React.useState(null);
  const [rowIndex, setRowIndex] = useState(0);
  const [allBarcode, setAllBarcode] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const [barcode, setBarcode] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemCode, setItemCode] = useState("");

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
      updateDataTable(page, perPage, currentSort, barcode, itemName, itemCode);
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

  const updateDataTable = (page, perPage, sort, barcode, itemName, itemCode) => {
    getAddress(page, perPage,sort, barcode, itemName, itemCode);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
    setBarcode(barcode);
    setItemName(itemName);
    setItemCode(itemCode);
  }

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`
      updateDataTable(page, perPage, sort, barcode, itemName, itemCode)
    }
  }

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  useEffect(() => {
    getAddress(page, perPage, currentSort, "", "", "");
  }, []);

  const getAddress = (page, perPage, currentSort, barcode = null,  item_name = null, kode_item = null) => {
    let filter = { page: page, per_page: perPage, warehouse_id: warehouse }
    if (barcode !== null) {
      filter = Object.assign(filter, { barcode: barcode })
    }
    if (item_name !== null) {
      filter = Object.assign(filter, { item_name: item_name })
    }
    if (kode_item !== null) {
      filter = Object.assign(filter, { kode_item: kode_item })
    }
    const data = filter;
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/barcode`, data, { headers
    })
    .then(data => {
        setAllBarcode(data.data.response);
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
    setBarcode("");
    setItemName("");
    setItemCode("");
    updateDataTable(1, perPage, currentSort, "", "", "");
  }

  return (
    <div>
      {alert}
      <SimpleHeader name="Barcode" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3>List Barcode</h3>
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
                              <Label htmlFor="exampleFormControlSelect3">Barcode</Label>
                              <Input
                                type="text"
                                placeholder="Masukan Barcode"
                                value={barcode}
                                onChange={e => updateDataTable(1, perPage, currentSort, e.target.value, itemName, itemCode)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Nama Item</Label>
                              <Input
                                type="text"
                                placeholder="Masukan Nama Item"
                                value={itemName}
                                onChange={e => updateDataTable(1, perPage, currentSort, barcode, e.target.value, itemCode)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Kode Item</Label>
                              <Input
                                type="text"
                                placeholder="Masukan Kode Item"
                                value={itemCode}
                                onChange={e => updateDataTable(1, perPage, currentSort, barcode, itemName, e.target.value)}
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
                  data={allBarcode}
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
                      dataField: "barcode",
                      text: "Barcode",
                      sort: true,
                    },
                    {
                        dataField: "kode_item",
                        text: "Kode Item",
                        sort: true,
                      },
                      {
                        dataField: "item_name",
                        text: "Nama Item",
                        sort: true,
                      },
                      {
                        dataField: "uom_code",
                        text: "Kode Uom",
                        sort: true,
                      },
                      {
                        dataField: "item_description",
                        text: "Item Deskripsi",
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

export default Barcode;
