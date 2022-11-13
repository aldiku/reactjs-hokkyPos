/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { 
  Card, 
  Button, 
  Row, 
  Col, 
  CardBody, 
  CardHeader,
  ButtonGroup,
  Form, 
  FormGroup, 
  Label, 
  Input 
} from 'reactstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const IndexWarehousePusat = () => {
  const token = localStorage.token;
  const [rowIndex, setRowIndex] = useState(0);
  const [allWarehousePusat, setAllWarehousePusat] = useState([]);
  const redirectPrefix = `/admin/warehouse-pusat/edit/`;
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
      updateDataTable(page, perPage, currentSort, name);
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

  const updateDataTable = (page, perPage, sort, name) => {
    getWareHousePusat(page, perPage, sort, name);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
    setName(name);
    
  }

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`
      updateDataTable(page, perPage, sort, name)
    }
  }

  useEffect(() => {
    getWareHousePusat(page, perPage, currentSort, "", "");
  }, []);

  const getWareHousePusat= async (page, perPage, currentSort, warehouse_name = null) => {
    let filter = {
       page: page, 
       per_page: perPage,
       level:1,
      }
      if (warehouse_name !== null) {
        filter = Object.assign(filter, { warehouse_name: warehouse_name })
      }
    const data = filter;
    const headers = {
      'Authorization': `Bearer ${token}`,
    };
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/warehouse/pusat `, data, { headers })
      setAllWarehousePusat(res.data.response);
      setPage(res.data.current_page + 1);
      setPerpage(res.data.per_page);
      setTotalItem(res.data.total_item);
    }

  const reset = () => {
    setName("");
    updateDataTable(1, perPage, currentSort, "", "");
  }

  return (
    <div>
       <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3>List Pusat</h3>
                  <div style={{ textAlign: "right" }}>
                    <Link className="btn btn-info" to="/admin/warehouse/pusat/create">
                      Tambah
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                  <Form>
                        <Row md="12">
                          <Col md="3">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Nama Pusat</Label>
                              <Input
                                className="form-control-alternative"
                                type="text"
                                placeholder="Masukan Nama Pusat"
                                value={name}
                                onChange={e => updateDataTable(1, perPage, currentSort, e.target.value, name)}
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
                  data={allWarehousePusat}
                  keyField="id"
                  search={ {
                    defaultSearch: 'search something here'
                  } }
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
                      dataField: "warehouse_name",
                      text: "Pusat",
                      sort: true,
                    },
                    {
                      dataField: "province_name",
                      text: "Provinsi",
                      sort: true,
                    },
                    {
                      dataField: "city_name",
                      text: "Kota",
                      sort: true,
                    },
                    {
                      dataField: "jumlah_gudang",
                      text: "Jumlah Gudang",
                      sort: true,
                    },
                    {
                      dataField: "jumlah_toko",
                      text: "Jumlah Toko",
                      sort: true,
                    },
                    {
                      dataField: "warehouse_phone",
                      text: "Phone",
                      sort: true,
                    },
                    {
                      dataField: "",
                      text: "Aksi",
                      formatter: (cell, row, index) => {
                        return (
                          <ButtonGroup>
                            <Link
                              to={redirectPrefix + row.id}
                              id={"tooltip_" + row.id}
                              className="btn btn-secondary"
                            >
                              <i
                                className="fas fa-user-edit"
                                style={{ color: "blue" }}
                              > EDIT </i>
                            </Link>
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
    </div>
  );
}

export default IndexWarehousePusat;