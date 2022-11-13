/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, CardBody, CardHeader, Collapse, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const ItemGrade = () => {
  const token = localStorage.token;
  const warehouse = parseInt(localStorage.warehouse);
  const [activeTab, setActiveTab] = useState('1');
  const [alert, setAlert] = React.useState(null);
  const [rowIndex, setRowIndex] = useState(0);
  const [itemMerek, setItemMerek] = useState([]);
  const [nilai, setNilai] = useState("");
  const [description, setDescription] = useState("");
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
      updateDataTable(page, perPage, currentSort, nilai, description);
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

  const updateDataTable = (page, perPage, sort, nilai, description) => {
    getMerek(page, perPage, sort, nilai, description);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
    setNilai(nilai);
    setDescription(description)
  }

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`
      updateDataTable(page, perPage, sort, nilai, description)
    }
  }

  useEffect(() => {
    getMerek(page, perPage, currentSort, "", "");
  }, []);

  const getMerek = async (page, perPage, currentSort, nilai = null, keterangan = null) => {
    let filter = { page: page, per_page: perPage }
    if (nilai !== null) {
      filter = Object.assign(filter, { nilai: nilai })
    }
    if (keterangan !== null) {
        filter = Object.assign(filter, { keterangan: keterangan })
      }
    const data = filter;
    const headers = {
      'Authorization': `Bearer ${token}`,
    };
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/item-grade`, data, { headers })
      setItemMerek(res.data.response);
      setPage(res.data.current_page + 1);
      setPerpage(res.data.per_page);
      setTotalItem(res.data.total_item);
    }

  const rowEvents = {
    onDoubleClick: (e, row, rowIndex) => {
      setHide(false);
      setSelectedAcquirerId(row.acquirer_id);
      setSelectAcquirerName(row.acquirer_name);
    }
  };

  const reset = () => {
    setNilai("");
    setDescription("");
    updateDataTable(1, perPage, currentSort, "", "");
  }

  return (
    <div>
      {alert}
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3>List Item Grade</h3>
                  <div style={{ textAlign: "right" }}>
                    <Link className="btn btn-info" to="/admin/item-grade/create">
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
                          <Label htmlFor="exampleFormControlSelect3">Nilai</Label>
                          <Input
                            type="text"
                            placeholder="Masukan Nilai"
                            value={nilai}
                            onChange={e => updateDataTable(1, perPage, currentSort, e.target.value, description)}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label htmlFor="exampleFormControlSelect3">Keterangan</Label>
                          <Input
                            type="text"
                            placeholder="Masukan Keterangan"
                            value={description}
                            onChange={e => updateDataTable(1, perPage, currentSort, nilai, e.target.value)}
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
                  data={itemMerek}
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
                        dataField: "nilai",
                        text: "Nilai",
                        sort: true,
                      },
                    {
                      dataField: "keterangan",
                      text: "Keterangan",
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
    </div>
  );
}

export default ItemGrade;
