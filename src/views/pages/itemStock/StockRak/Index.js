/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { 
    Card, 
    Button, 
    Row, 
    Col, 
    CardBody, 
    CardHeader, 
    Form, 
    FormGroup, 
    Label, 
    Input, 
    Collapse 
} from 'reactstrap';
import axios from 'axios';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const StokRak = () => {
  const token = localStorage.token;
  const warehouse = localStorage.warehouse;
  const [activeTab, setActiveTab] = useState('1');
  const [rowIndex, setRowIndex] = useState(0);
  const [allRakStock, setAllRakStock] = useState([]);
  const [koderak, setKodeRak] = useState("");
  const [itemname, setItemName] = useState("")
  const [itemcode, setItemCode] = useState("");
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
      updateDataTable(page, perPage, currentSort, koderak, itemname, itemcode);
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

  const updateDataTable = (page, perPage, sort, koderak, itemname, itemcode) => {
    getRakStok(page, perPage, sort, koderak, itemname, itemcode);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
    setKodeRak(koderak);
    setItemName(itemname);
    setItemCode(itemcode);
  }

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`
      updateDataTable(page, perPage, sort,  koderak, itemname, itemcode)
    }
  }

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  useEffect(() => {
    getRakStok(page, perPage, currentSort, "", "", "");
  }, []);

  const getRakStok = async (page, perPage, currentSort, code_rak = null, item_name = null, item_code = null) => {
    let filter = { 
      page: page, 
      per_page: perPage, 
      warehouse_id: parseInt(warehouse) 
    }
    if (code_rak !== null) {
      filter = Object.assign(filter, { code_rak: code_rak })
    }
    if (item_name !== null) {
      filter = Object.assign(filter, { item_name: item_name })
    }
    if (item_code !== null) {
      filter = Object.assign(filter, { item_code: item_code })
    }
    const data = filter;
    const headers = {
      'Authorization': `Bearer ${token}`,
    };
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/stok-rak`, data, { headers })
      setAllRakStock(res.data.response);
      setPage(res.data.current_page + 1);
      setPerpage(res.data.per_page);
      setTotalItem(res.data.total_item);
    }
  

  const reset = () => {
    setKodeRak("");
    setItemName("");
    setItemCode("");
    updateDataTable(1, perPage, currentSort, "", "", "");
  }

  return (
    <div>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3>Lokasi Item</h3>
                </div>
              </CardHeader>
              <CardBody>
                  <Form>
                        <Row md="12">
                          <Col md="3">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Kode Rak</Label>
                              <Input
                                type="text"
                                placeholder="Masukan Kode Rak"
                                value={koderak}
                                onChange={e => updateDataTable(1, perPage, currentSort, e.target.value, itemname,itemcode)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="3">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Nama Item</Label>
                              <Input
                                type="text"
                                placeholder="Masukan Nama Item"
                                value={itemname}
                                onChange={e => updateDataTable(1, perPage, currentSort, koderak, e.target.value, itemcode)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="3">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Kode Item</Label>
                              <Input
                                type="text"
                                placeholder="Masukan Kode Item"
                                value={itemcode}
                                onChange={e => updateDataTable(1, perPage, currentSort, koderak, itemname, e.target.value)}
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
                  data={allRakStock}
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
                      dataField: "code_rak",
                      text: "Kode Rak",
                      sort: true,
                    },
                    {
                      dataField: "item_code",
                      text: "Kode Item",
                      sort: true,
                    },
                    {
                      dataField: "item_name",
                      text: "Nama Item",
                      sort: true,
                    },
                    {
                      dataField: "satuan",
                      text: "Satuan",
                      sort: true,
                    },
                    {
                      dataField: "qty_awal",
                      text: "Stok Awal",
                      sort: true,
                    },
                    {
                      dataField: "qty_masuk",
                      text: "Stok Masuk",
                      sort: true,
                    },
                    {
                      dataField: "qty_keluar",
                      text: "Stok Keluar",
                      sort: true,
                    },
                    {
                      dataField: "sisa_stok",
                      text: "Sisa Stock",
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
    </div>
  );
}

export default StokRak;
