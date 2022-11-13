/*eslint-disable*/
import React, { useEffect, useState } from "react";
// import store from "./snippets/redux";
import { Card, Button, Row, CardBody, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
// import Preview from "./snippets/Preview";

const LogPrice = (props) => {
  const token = localStorage.token;
  const item = props.item;
  const [activeTab, setActiveTab] = useState("1");
  const redirectPrefix = `/admin/price/edit/`;
  const [alert, setAlert] = React.useState(null);
  const [hide, setHide] = useState(true);
  const [selectAcquirerId, setSelectedAcquirerId] = useState(0);
  const [selectAcquirerName, setSelectAcquirerName] = useState("");
  const [rowIndex, setRowIndex] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const [allPrice, setAllPrice] = useState([]);

  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [totalItem, setTotalItem] = useState(0);
  const [currentSort, setCurrentSort] = useState("");
  const [preview, setPreview] = useState(false);
  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    // listenEvent();
  }, []);

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
    getLogPrice(page, perPage, sort);
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

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    getLogPrice(page, perPage, currentSort);
  }, [props.item]);

  const getLogPrice = (page, perPage, currentSort) => {
    let filter = {
      page: page,
      per_page: perPage,
      item_id: parseInt(item),
    };
    const data = filter;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios4
      .post(`${process.env.REACT_APP_API_BASE_URL}/log-pd`, data, {
        headers,
      })
      .then((data) => {
        console.log("cek", data);
        setAllPrice(data.data.response);
        setPage(data.data.current_page + 1);
        setPerpage(data.data.per_page);
        setTotalItem(data.data.total_item);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // const listenEvent = () => {
  //   store.subscribe(() => {
  //     const state = store.getState();
  //     if (state.type === "close_modal_preview") {
  //       setPreview(false);
  //     }
  //   });
  // };

  return (
    <div>
      {alert}
      <Row>
        {/* <Preview visible={preview} data={detailData} /> */}
        <div className="col">
          <Card>
            <CardHeader>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>List Log Price</h3>
              </div>
            </CardHeader>
            <CardBody>
              <ToolkitProvider
                rowNumber={rowIndex}
                data={allPrice}
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
                    dataField: "username",
                    text: "Username",
                    sort: true,
                  },
                  {
                    dataField: "person",
                    text: "Person",
                    sort: true,
                  },
                  {
                    dataField: "satuan",
                    text: "Satuan",
                    sort: true,
                  },
                  {
                    dataField: "harga_beli",
                    text: "Harga Beli",
                    sort: true,
                  },
                  {
                    dataField: "harga_beli_total",
                    text: "Total Harga Beli",
                    sort: true,
                  },
                  {
                    dataField: "harga_jual_minimal",
                    text: "Minimal Harga Jual",
                    sort: true,
                  },
                  {
                    dataField: "",
                    text: "",
                    formatter: (cell, row, index) => {
                      return (
                        <>
                          <Button
                            onClick={() => {
                              setDetailData(row);
                              setPreview(true);
                            }}
                            type="button"
                            color="primary"
                            size="sm"
                          >
                            detail
                          </Button>
                          <Button color="warning" size="sm">
                            <Link
                              to={redirectPrefix + row.id}
                              id={"tooltip_" + row.id}
                            >
                              <span style={{ color: "white" }}>edit</span>
                            </Link>
                          </Button>
                        </>
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
};

export default LogPrice;
