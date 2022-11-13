/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Row,
  CardBody,
  CardHeader,
  Container,
  UncontrolledTooltip,
  ButtonGroup,
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import SweetAlert from "react-bootstrap-sweetalert";

const OperationalDuration = (props) => {
  const token = localStorage.token;
  const warehouse = localStorage.warehouse;
  const redirectPrefix = `/admin/durasi-operasional/edit/`;
  const [alert, setAlert] = React.useState(null);
  const [rowIndex, setRowIndex] = useState(0);
  const [allDurationOperational, setAllDurationOperational] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [totalItem, setTotalItem] = useState(0);
  const [currentSort, setCurrentSort] = useState("");
  const allInfo = JSON.parse(localStorage.allinfo);
	const createButton = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Durasi Operasional").map((p) => p.read_access));


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

  const updateDataTable = (page, perPage, sort) => {
    getDurationOperasional(page, perPage, sort);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
  };

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`;
      updateDataTable(page, perPage, sort);
    }
  };

  useEffect(() => {
    getDurationOperasional(page, perPage, currentSort);
  }, []);

  const getDurationOperasional = (page, perPage, currentSort) => {
    let filter = { 
        page: page, 
        per_page: perPage,
        warehouse_id: parseInt(warehouse)
    };
    const data = filter;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/durasi-operasional`, data, { headers })
      .then((data) => {
        setAllDurationOperational(data.data.response);
        setPage(data.data.current_page + 1);
        setPerpage(data.data.per_page);
        setTotalItem(data.data.total_item);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const delatePajak = (id) => {
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/pajak/delete/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setSuccessAlert();
        getDurationOperasional();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const setSuccessAlert = () => {
    setAlert(
      <SweetAlert
        success
        showConfirm
        confirmBtnText="Ok"
        title="Pejak deleted"
        onCancel={hideAlert}
        onConfirm={hideAlert}
      />
    );
  };

  const setQuestionAlert = (id) => {
    setAlert(
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={() => delatePajak(id)}
        onCancel={hideAlert}
        focusCancelBtn
      />
    );
  };

  const hideAlert = () => {
    setAlert(null);
  };

  return (
    <div>
      {alert}
      <SimpleHeader name="Batas Waktu" parentName="Master" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>Batas Waktu</h3>
                  {/* {createButton && createButton === "YES" && (
                  <div style={{ textAlign: "right" }}>
                    <Link className="btn btn-info" to="/admin/durasi-operasional/create">
                      Tambah
                    </Link>
                  </div>
                  )} */}
                </div>
              </CardHeader>
              <CardBody>
                <ToolkitProvider
                  rowNumber={rowIndex}
                  data={allDurationOperational}
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
                        dataField: "durasi_po",
                        text: "Durasi Purchase Order",
                        sort: true,
                        formatter: (cell, row, index) => {
                          return ((row.durasi_po) + "Hari")
                        },
                      },
                    {
                      dataField: "durasi_so",
                      text: "Durasi Sales Order",
                      sort: true, 
                      formatter: (cell, row, index) => {
                        return ((row.durasi_so) + "Hari")
                      },  
                    },
                    {
                      dataField: "durasi_tw",
                      text: "Durasi Transfer Stok",
                      sort: true,
                      formatter: (cell, row, index) => {
                        return ((row.durasi_tw) + "Hari")
                      },
                    },
                    {
                      dataField: "",
                      text: "",
                      formatter: (cell, row, index) => {
                        return (
                          <ButtonGroup>
                            <Button>
                              <Link
                                to={redirectPrefix + row.id}
                                id={"tooltip_" + row.id}
                              >
                                <i className="fas fa-user-edit" /> Edit
                              </Link>
                            </Button>
                          </ButtonGroup>
                        );
                      },
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

export default OperationalDuration;
