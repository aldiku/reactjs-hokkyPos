/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  CardBody,
  CardHeader,
} from "reactstrap";
import axios from "axios";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const StockPribadi = () => {
  const token = localStorage.token;
  const warehouse = localStorage.warehouse;
  const [activeTab, setActiveTab] = useState("1");
  const [rowIndex, setRowIndex] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const [nameLowStock, setNameLowStock] = useState("");
  const [codeLowStock, setCodeLowStock] = useState("");

  const [allItemStock, setAllItemStock] = useState([]);

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
      updateDataTable(
        page,
        perPage,
        currentSort,
        nameLowStock,
        codeLowStock
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

  const updateDataTable = (page, perPage, sort,nameLowStock, codeLowStock) => {
    getItemLowStock(page, perPage, sort,nameLowStock, codeLowStock);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
    setNameLowStock(nameLowStock);
    setCodeLowStock(codeLowStock);
  };

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`;
      updateDataTable(page, perPage, sort, nameLowStock, codeLowStock);
    }
  };

  useEffect(() => {
    getItemLowStock(page, perPage, currentSort, "", "");
  }, []);

  const getItemLowStock = async (page, perPage, currentSort) => {
    let filter = {
      page: page,
      per_page: perPage,
      warehouse_id : parseInt(warehouse)
    };
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


  return (
    <div>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>List Own Item Stock</h3>
                </div>
              </CardHeader>
              <CardBody>
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
                      dataField: "item_name",
                      text: "Nama Item",
                      sort: true,
                    },
                    {
                      dataField: "sisa_stok",
                      text: "Sisa Stock",
                      sort: true,
                    },
                    {
                      dataField: "date",
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
};

export default StockPribadi;
