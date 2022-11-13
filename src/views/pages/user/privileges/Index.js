/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  CardBody,
  Form,
  Input,
  CardHeader,
  Row,
  Col,
  FormGroup,
  Label,
  UncontrolledTooltip,
  ButtonGroup,
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";

const Privileges = () => {
  const token = localStorage.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const redirectPrefix = `/admin/privileges/edit/`;
  const [rowIndex, setRowIndex] = useState(0);
  const [allPricelegesReturn, setAllPricelegesReturn] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);

  // const [warehouse, setWarehouse] = useState("");
  const [warehouses, setWarehouses] = useState([]);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  const [totalItem, setTotalItem] = useState(0);
  const [currentSort, setCurrentSort] = useState("");

  useEffect(() => {
    getWarehouse();
  }, []);


  const getWarehouse = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/warehouse/list/all`,
        { headers }
      )
      .then((data) => {
        setWarehouses(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  let paginationOption = {
    page: page,
    alwaysShowAllBtns: true,
    override: true,
    showTotal: true,
    withFirstAndLast: false,
    sizePerPage: perPage,
    totalSize: totalItem,
    onPageChange: (page) => {
      updateDataTable(page, perPage, currentSort, name, username);
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

  const updateDataTable = (page, perPage, sort, name, username) => {
    getPricelegesReturn(page, perPage, sort, name, username);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
    setName(name);
    setUsername(username);
  };

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`;
      updateDataTable(page, perPage, sort, name, username);
    }
  };

  useEffect(() => {
    getPricelegesReturn(page, perPage, currentSort, '', '');
  }, [currentSort, page, perPage]);

  const getPricelegesReturn = (page, perPage, currentSort, warehouse_id = null, name = null) => {
    let filter = { page: page, per_page: perPage };
    if (warehouse_id !== null) {
      filter = Object.assign(filter, { warehouse_id: warehouse_id });
    }
    if (name !== null) {
      filter = Object.assign(filter, { name: name });
    }
    const data = filter;
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/users/privileges`, data, {
        headers,
      })
      .then((data) => {
        setAllPricelegesReturn(data.data.response);
        setPage(data.data.current_page + 1);
        setPerpage(data.data.per_page);
        setTotalItem(data.data.total_item);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // const rowEvents = {
  //   onDoubleClick: (e, row, rowIndex) => {
  //     // setHide(false);
  //     // setSelectedAcquirerId(row.acquirer_id);
  //     // setSelectAcquirerName(row.acquirer_name);
  //   },
  // };

  const reset = () => {
    setName([]);
    setUsername("");
    updateDataTable(1, perPage, currentSort, "", "");
  }

  return (
    <Card>
      <CardHeader>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h3>List User Privileges</h3>
        </div>
      </CardHeader>
      <CardBody>
      <Form>
                        <Row md="12">
                          <Col md="3">
                            <FormGroup>
                              <Label> Cabang</Label>
                                <Input
                                  name="person"
                                  type="select"
                                  value={name}
                                  onChange={e => updateDataTable(1, perPage, currentSort, e.target.value, username)}
                                >
                                  <option value=''>Pilih Cabang</option>
                                  {warehouses.map((warehouse2, key) => {
                                      return (
                                        <option key={key} value={warehouse2.id}>
                                          {warehouse2.name}
                                        </option>
                                      );
                                    })}
                                </Input>
                            </FormGroup>
                            </Col>
                          <Col md="3">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Username</Label>
                              <Input
                                type="text"
                                placeholder="Masukan Nama"
                                value={username}
                                onChange={e => updateDataTable(1, perPage, currentSort, name, e.target.value)}
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
        <ToolkitProvider
          rowNumber={rowIndex}
          data={allPricelegesReturn}
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
              dataField: "privilege_name",
              text: "Fitur",
              sort: true,
            },
            {
              dataField: "create_access",
              text: "Create",
              sort: true,
            },
            {
              dataField: "read_access",
              text: "Read",
              sort: true,
            },
            {
              dataField: "update_access",
              text: "Update",
              sort: true,
            },
            {
              dataField: "delete_access",
              text: "Delete",
              sort: true,
            },
            {
              dataField: "",
              text: "",
              formatter: (cell, row, index) => {
                return (
                  <ButtonGroup>
                    <Button>
                      <Link
                        to={{
                          pathname: redirectPrefix + row.id,
                          state: row,
                        }}
                        id={"tooltip_" + row.id}
                      >
                        <i className="fas fa-user-edit" /> Edit
                      </Link>
                    </Button> 
                    &nbsp;
                    <Button>
                      <Link
                        to={{
                          pathname: redirectPrefix + row.id,
                          state: row,
                        }}
                        id={"tooltip_" + row.id}
                      >
                        <i className="fas fa-user-edit" /> Simpan
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
                // rowEvents={rowEvents}
                pagination={paginationFactory({
                  ...paginationOption,
                })}
                onTableChange={handleTableChange}
              />
            </div>
          )}
        </ToolkitProvider>
      </CardBody>
    </Card>
  );
};

export default Privileges;
