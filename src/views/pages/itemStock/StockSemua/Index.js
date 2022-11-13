/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  CardBody,
  CardHeader,
  Form,
  Input,
  Col,
  FormGroup,
  Nav,
  NavItem,
  Label ,
  Button ,
  TabContent,
  TabPane,
} from "reactstrap";
import axios from "axios";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import Detail from "views/pages/itemStock/StockSemua/Detail.js"

const StockSemua = () => {
  const token = localStorage.token;
  const [activeTab, setActiveTab] = useState("1");
  const [alert, setAlert] = React.useState(null);
  const [hide, setHide] = useState(true);
  const [warehouse, setWarehouse] = useState("");
  const [warehouses, setWarehouses] = useState([]);
  const [nameStock, setNameStock] = useState("");
  const [codeStock, setCodeStock] = useState("");
  const [allItemStock, setAllItemStock] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [totalItem, setTotalItem] = useState(0);
  const [currentSort, setCurrentSort] = useState("");
  const [rowIndex, setRowIndex] = useState(0);
  const [detailItemStok, setDetailItemStok] = useState(0)

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
      updateDataTable(
        page,
        perPage,
        currentSort,
        warehouse,
        nameStock,
        codeStock
      );
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

  const updateDataTable = (page, perPage, sort,warehouse,nameStock, codeStock) => {
    geItemStock(page, perPage, sort,warehouse, nameStock, codeStock);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
    setWarehouse(warehouse);
    setNameStock(nameStock);
    setCodeStock(codeStock);
  };

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`;
      updateDataTable(page, perPage, sort, warehouse, nameStock, codeStock);
    }
  };

  useEffect(() => {
    geItemStock(page, perPage, currentSort, "", "");
  }, []);

  const geItemStock = async (page, perPage, currentSort, warehouse_id = null, item_name = null, item_code = null) => {
    let filter = {
      page: page,
      per_page: perPage,
    };
    if (warehouse_id !== null) {
      filter = Object.assign(filter, { warehouse_id: warehouse_id })
    }
    if (item_name !== null) {
      filter = Object.assign(filter, { item_name: item_name })
    }
    if (item_code !== null) {
        filter = Object.assign(filter, { item_code: item_code })
    }
    const data = filter;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/all-stock`,
      data,
      { headers }
    );
    setAllItemStock(res.data.response);
    setPage(res.data.current_page + 1);
    setPerpage(res.data.per_page);
    setTotalItem(res.data.total_item);
  };

  const reset = () => {
    setWarehouse([]);
    setNameStock("");
    setCodeStock("");
    updateDataTable(1, perPage, currentSort, "", "");
  }

  const rowEvents = {
    onDoubleClick: (e, row, rowIndex) => {
      setHide(false);
      setDetailItemStok(row.id);
    },
  };

  return (
    <div>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>Cabang</h3>
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
                                  value={warehouse}
                                  onChange={e => updateDataTable(1, perPage, currentSort, e.target.value, nameStock, codeStock)}
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
                              <Label htmlFor="exampleFormControlSelect3">Nama Item</Label>
                              <Input
                                type="text"
                                placeholder="Masukan Nama"
                                value={nameStock}
                                onChange={e => updateDataTable(1, perPage, currentSort, warehouse, e.target.value, codeStock)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="3">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Kode Item</Label>
                              <Input
                                type="text"
                                placeholder="Masukan Kode Item"
                                value={codeStock}
                                onChange={e => updateDataTable(1, perPage, currentSort, warehouse, nameStock, e.target.value)}
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
                  data={allItemStock}
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
                      dataField: "warehouse",
                      text: "Cabang",
                      sort: true,
                    },
                    {
                      dataField: "item_code",
                      text: "Kode Item",
                      sort: true,
                    },
                    {
                      dataField: "barcode",
                      text: "Barcode",
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
                      dataField: "qty_total",
                      text: "Stok",
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
            <Card>
              <Nav tabs>
                <NavItem>
                </NavItem>
              </Nav>
                <></>
                <>
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <Row>
                        <Col md="12">
                          <Detail />
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                </>
            </Card>
          </div>
        </Row>
    </div>
  );
};

export default StockSemua;
