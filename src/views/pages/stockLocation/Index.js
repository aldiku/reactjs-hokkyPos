/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, Row, Col, CardBody, CardHeader, Container, UncontrolledTooltip, ButtonGroup } from 'reactstrap';
import { Link } from "react-router-dom";
import classnames from 'classnames';
import axios from 'axios';
import SimpleHeader from "components/Headers/SimpleHeader.js";
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import SweetAlert from "react-bootstrap-sweetalert";

const StockLocation = (props) => {
  const token = localStorage.token;
  const [activeTab, setActiveTab] = useState('1');
  const redirectPrefix = `/admin/stock-location/edit/`;
  const [alert, setAlert] = React.useState(null);
  const [rowIndex, setRowIndex] = useState(0);

  const [stockLocation, setStockLocation] = useState([]);

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
      updateDataTable(page, perPage, currentSort);
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

  const updateDataTable = (page, perPage, sort) => {
    getStockLocation(page, perPage,sort);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
  }

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`
      updateDataTable(page, perPage, sort)
    }
  }

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  useEffect(() => {
    getStockLocation();
  }, []);

  const getStockLocation = () => {
    const data = { page: page, per_page: perPage };
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/warehouse/pusat`, data, { headers
    })
    .then(data => {
        setStockLocation(data.data.response);
        setPage(data.data.current_page);
        setPerpage(data.data.per_page);
        setTotalItem(data.data.total_item);
    })
      .catch(function (error) {
        console.log(error)
      })
  }

  const delateAcquirer = (acquirer_id) => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/acquirer/delete/${acquirer_id}`, null, {

      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(function (response) {
        setSuccessAlert();
        getAllAquirer();
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
        title="Acquirer deleted"
        onCancel={hideAlert}
        onConfirm={hideAlert}
      />
    )
  }

  const setQuestionAlert = (acquirer_id) => {
    setAlert(
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={() => delateAcquirer(acquirer_id)}
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

  return (
    <div>
      {alert}
      <SimpleHeader name="Stock Location" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3>List Stock Location</h3>
                  <div style={{ textAlign: "right" }}>
                    <Link className="btn btn-info" to="/admin/stock-location/create">
                      Add
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <ToolkitProvider
                  rowNumber={rowIndex}
                  data={stockLocation}
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
                      dataField: "warehouse_name",
                      text: "Name",
                      sort: true,
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
                        dataField: "jumlah_toko",
                        text: "Jumlah Toko",
                        sort: true,
                      },
                      {
                        dataField: "jumlah_gudang",
                        text: "Jumlah Gudang",
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
                              Delete Stock Location
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

export default StockLocation;
