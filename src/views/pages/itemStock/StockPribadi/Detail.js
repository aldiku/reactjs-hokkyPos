/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  CardBody,
  CardHeader,
  CardGroup,
  CardImg,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import axios from "axios";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const DetailItemStok = (props) => {
  const token = localStorage.token;
  const [activeTab, setActiveTab] = useState("1");
  const [alert, setAlert] = React.useState(null);
  const [rowIndex, setRowIndex] = useState(0);
  const [namaproyek,setNamaProyek] = useState("");
  const [image1,setImage1] = useState("");
  const [image2,setImage2] = useState("");
  const [image3,setImage3] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [currentSort, setCurrentSort] = useState("");

  let paginationOption = {
    page: page,
    alwaysShowAllBtns: true,
    override: true,
    showTotal: true,
    withFirstAndLast: false,
    sizePerPage: perPage,
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

  const updateDataTable = (page, perPage, currentSort) => {
    getSalesTrackingDetail(page, perPage, currentSort);
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
    getSalesTrackingDetail(page, perPage, currentSort);
  }, [props.code]);

  const getSalesTrackingDetail = (page, perPage, currentSort) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const data = { page: page, per_page: perPage };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/item-stock/get/${props.code}`,
        {
          headers,
        }
      )
      .then((data) => {
        setNamaProyek(data.data.response.location);
        setImage1(data.data.response.image_1);
        setImage2(data.data.response.image_2);
        setImage2(data.data.response.image_3);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  return (
    <div>
      {alert}
        <CardBody>
        <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
                <h3>Gambar Item</h3>
            </CardHeader>
          <Row md="12">
              <Col md="4">
                      <CardBody>
                        <FormGroup row>
                              <CardGroup>
                                  <Row>
                                      <Col md="10">
                                            <CardImg
                                                alt="Gambar Belum Di Upload"
                                                src={image1}
                                                top
                                                width="100%"
                                            />
                                      </Col>
                                  </Row>
                              </CardGroup>
                        </FormGroup>
                      </CardBody>
              </Col>
              <Col md="4">
                      {/* <CardBody>
                          <FormGroup row>
                              <CardGroup>
                                  <Row>
                                      <Col md="10">
                                          <Card>
                                              <CardImg
                                                className="photo"
                                                alt="Gambar Belum Di Upload"
                                                src={image2}
                                                top
                                                width="100%"
                                              />
                                          </Card>
                                      </Col>
                                  </Row>
                              </CardGroup>
                          </FormGroup>
                      </CardBody> */}
              </Col>
              <Col md="4">
                      {/* <CardBody>
                          <FormGroup row>
                              <CardGroup>
                                  <Row>
                                      <Col md="10">
                                          <Card>
                                              <CardImg
                                                className="photo"
                                                alt="Gambar Belum Di Upload"
                                                src={image3}
                                                top
                                                width="100%"
                                              />
                                          </Card>
                                      </Col>
                                  </Row>
                              </CardGroup>
                          </FormGroup>
                      </CardBody> */}
                </Col>
          </Row>
        </Card>
        <Card>
              <CardHeader>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>Lokasi</h3>
                </div>
              </CardHeader>
              <CardBody>
                <ToolkitProvider
                  rowNumber={rowIndex}
                  data={namaproyek}
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
                      dataField: "cabang",
                      text: "Cabang",
                      sort: true,
                    },
                    {
                      dataField: "alamat",
                      text: "Alamat",
                      sort: true,
                    },
                    {
                      dataField: "total_stok",
                      text: "Total Stok",
                      sort: true,
                    },
                    {
                      dataField: "inbound_stok",
                      text: "Stok Inbound",
                      sort: true,
                    },
                    {
                      dataField: "rak_stok",
                      text: "Stok Rak",
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
        
        </CardBody>
    </div>
  );
};

export default DetailItemStok;

