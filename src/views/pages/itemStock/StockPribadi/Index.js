/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  // Card,
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
  // TabContent,
  TabPane,
} from "reactstrap";
import axios from "axios";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import Detail from "views/pages/itemStock/StockPribadi/Detail"

const StockPribadi = () => {
  const token = localStorage.token;
  const warehouse = localStorage.warehouse;
  const [hide, setHide] = useState(true);
  const [activeTab, setActiveTab] = useState("1");
  const [nameStock, setNameStock] = useState("");
  const [codeStock, setCodeStock] = useState("");
  const [allItemStock, setAllItemStock] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [totalItem, setTotalItem] = useState(0);
  const [currentSort, setCurrentSort] = useState("");
  const [rowIndex, setRowIndex] = useState(0);
  const [detailItemStok, setDetailItemStok] = useState(0)

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

  const updateDataTable = (page, perPage, sort,nameStock, codeStock) => {
    getItemOwnStock(page, perPage, sort,nameStock, codeStock);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
    setNameStock(nameStock);
    setCodeStock(codeStock);
  };

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`;
      updateDataTable(page, perPage, sort,nameStock, codeStock);
    }
  };

  useEffect(() => {
    getItemOwnStock(page, perPage, currentSort, "", "");
  }, []);

  const getItemOwnStock = async (page, perPage, currentSort, item_name = null, item_code = null) => {
    let filter = {
      page: page,
      per_page: perPage,
      warehouse_id: parseInt(warehouse)
    };
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
      `${process.env.REACT_APP_API_BASE_URL}/gudang-stock`,
      data,
      { headers }
    );
    setAllItemStock(res.data.response);
    setPage(res.data.current_page + 1);
    setPerpage(res.data.per_page);
    setTotalItem(res.data.total_item);
  };

  const reset = () => {
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
              <CardHeader>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>Stok Item</h3>
                </div>
              </CardHeader>
              <CardBody>
                      <Form>
                        <Row md="12">
                          <Col md="3">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Nama Item</Label>
                              <Input
                                type="text"
                                placeholder="Masukan Nama"
                                value={nameStock}
                                onChange={e => updateDataTable(1, perPage, currentSort, e.target.value, codeStock)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="3">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Kode Item</Label>
                              <Input
                                type="text"
                                placeholder="Masukan Kode Customer"
                                value={codeStock}
                                onChange={e => updateDataTable(1, perPage, currentSort, nameStock, e.target.value)}
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
                      dataField: "qty_terakhir",
                      text: "Stok",
                      sort: true,
                    },
                    // {
                    //   dataField: "qty_masuk",
                    //   text: "Stok Masuk",
                    //   sort: true,
                    // },
                    // {
                    //   dataField: "qty_keluar",
                    //   text: "Stok Keluar",
                    //   sort: true,
                    // },
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
              <Nav tabs>
                <NavItem>
                </NavItem>
              </Nav>
              {hide ? (
                <></>
              ) : (
                <>
                    <TabPane tabId="1">
                      <Row>
                        <Col md="12">
                          <Detail code={detailItemStok}/>
                        </Col>
                      </Row>
                    </TabPane>
                </>
              )}
          </div>
        </Row>
    </div>
  );
};

export default StockPribadi;
