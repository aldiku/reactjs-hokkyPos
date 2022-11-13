/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, CardBody, CardHeader, Container, UncontrolledTooltip, ButtonGroup, Collapse, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import SimpleHeader from "components/Headers/SimpleHeader.js";
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import SweetAlert from "react-bootstrap-sweetalert";

const Satuan = () => {
  const token = localStorage.token;
  const warehouse = parseInt(localStorage.warehouse);
  const [isLoading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const redirectPrefix = `/admin/satuan/edit/`;
  const [alert, setAlert] = React.useState(null);
  const [rowIndex, setRowIndex] = useState(0);
  const [allUom, setAllUom] = useState([]);
  const [uomCode, setUomCode] = useState("");
  const [description, setDescription] = useState("");
  const [satuan, setSatuan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [totalItem, setTotalItem] = useState(0);
  const [currentSort, setCurrentSort] = useState("");
  const [selectsatuan,setSelectSatuan] = useState(null);
  const [codeUom , setCodeUom] = useState("");

  let paginationOption = {
    page: page,
    alwaysShowAllBtns: true,
    override: true,
    showTotal: true,
    withFirstAndLast: false,
    sizePerPage: perPage,
    totalSize: totalItem,
    onPageChange: (page) => {
      updateDataTable(page, perPage, currentSort, uomCode, description);
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
              <option value="100000">All</option>
            </select>
          }{" "}
          entries.
        </label>
      </div>
    ),
  }

  const updateDataTable = (page, perPage, sort, uomCode, description) => {
    getSatuan(page, perPage, sort, uomCode, description);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
    setUomCode(uomCode);
    setDescription(description);
  }

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`
      updateDataTable(page, perPage, sort,  uomCode, description)
    }
  }

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  useEffect(() => {
    getSatuan(page, perPage, currentSort, "", "");
  }, []);

  const getSatuan = async (page, perPage, currentSort, uom_code = null, description = null) => {
    let filter = { page: page, per_page: perPage }
    if (uom_code !== null) {
      filter = Object.assign(filter, { uom_code: uom_code })
    }
    if (description !== null) {
        filter = Object.assign(filter, { description: description })
      }
    const data = filter;
    const headers = {
      'Authorization': `Bearer ${token}`,
    };
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/uom`, data, { headers })
      setAllUom(res.data.response);
      setPage(res.data.current_page + 1);
      setPerpage(res.data.per_page);
      setTotalItem(res.data.total_item);
    }

  const delateSatuan = (id) => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/uom/delete/${id}`, null, {

      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(function (response) {
        setSuccessAlert();
        getSatuan();
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const setSuccessAlert = () => {
    setAlert(
      <SweetAlert
        success
        showConfirm
        confirmBtnText="Ok"
        title="Satuan deleted"
        onCancel={hideAlert}
        onConfirm={hideAlert}
      />
    )
  }

  useEffect(() => {
    getSatuanById();
    // updateSatuan();
  }, [selectsatuan]);

  useEffect(() => {
    // getSatuanById();
    updateSatuan();
  }, []);

  const updateSatuan = () => {
    setLoading(true);
    let data = {
      uom_code: satuan,
      description: deskripsi,
      base_uom_flag: 1,
      active_flag: 1,
      primary_flag: 1,
      }
      axios.post(`${process.env.REACT_APP_API_BASE_URL}/uom/update/${selectsatuan}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(function (response) {
          window.location.reload("/admin/satuan");
        //   history.push("/admin/person");
        })
        .then(json => {
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error)
        })
  };
  

  const hideAlert = () => {
    setAlert(null);
  }

  const reset = () => {
    setUomCode("");
    setDescription("");
    updateDataTable(1, perPage, currentSort, "", "");
  }

  const rowEvents = {
    onDoubleClick: (e, row, rowIndex) => {
      setSelectSatuan(row.id);
    },
  };

  const getSatuanById = () => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/uom/${selectsatuan}`, { headers
    })
    .then(data => {
      setSatuan(data.data.response.uom_code);
      setDeskripsi(data.data.response.description);
    })
      .catch(function (error) {
        console.log(error)
      })
  }
  return (
    <div>
      {alert}
      <SimpleHeader name="Satuan" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3>List Satuan</h3>
                  <div style={{ textAlign: "right" }}>
                    <Link className="btn btn-info" to="/admin/satuan/create">
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
                              <Label htmlFor="exampleFormControlSelect3">Kode Uom</Label>
                              <Input
                                type="text"
                                placeholder="Masukan Kode Uom"
                                value={uomCode}
                                onChange={e => updateDataTable(1, perPage, currentSort, e.target.value, description)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="3">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Deskripsi</Label>
                              <Input
                                type="text"
                                placeholder="Masukan Deskripsi"
                                value={description}
                                onChange={e => updateDataTable(1, perPage, currentSort, uomCode, e.target.value)}
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
                <Row md="12">
                  <Col md="7">      
                    <ToolkitProvider
                      rowNumber={rowIndex}
                      data={allUom}
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
                          dataField: "uom_code",
                          text: "Kode Satuan",
                          sort: true,
                        },
                        {
                            dataField: "description",
                            text: "Deskripsi",
                            sort: true,
                          },
                        // {
                        //   dataField: "", text: "", formatter: (cell, row, index) => {
                        //     return (
                        //       <ButtonGroup>
                        //         <Button>
                        //           <Link
                        //             to={redirectPrefix + row.id}
                        //             id={"tooltip_" + row.id}
                        //           >
                        //             <i className="fas fa-user-edit" />
                        //           </Link>
                        //         </Button>
                        //         <UncontrolledTooltip delay={0} target={"tooltip_" + row.id}>
                        //           Edit
                        //         </UncontrolledTooltip>
                        //         <Button
                        //           id="btn-acquirer"
                        //           onClick={() => setQuestionAlert(row.id)}
                        //         >
                        //           <i className="fas fa-trash" />
                        //         </Button>
                        //         <UncontrolledTooltip
                        //           delay={0}
                        //           placement="top"
                        //           target="btn-acquirer"
                        //         >
                        //           Delete Satuan
                        //         </UncontrolledTooltip>
                        //       </ButtonGroup>
                        //     )
                        //   }
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
                  </Col>
                  <Col md="5">
                        <CardHeader className="bg-white border-0">
													<h3>EDIT SATUAN</h3>
												</CardHeader>      
                        <CardBody>
													<FormGroup row>
														<Label for="exampleEmail" sm={4}>
															Kode Satuan
														</Label>
														<Col sm={7}>
															<Input
																className="form-control-alternative"
																type="text"
																name="itemCode"
																placeholder="Masukan Kode Satuan"
																value={satuan}
																onChange={(e) => {
																	setSatuan(e.target.value);
																}}
															/>
														</Col>
													</FormGroup>
                          <FormGroup row>
														<Label for="exampleEmail" sm={4}>
															Deskripsi
														</Label>
														<Col sm={7}>
															<Input
																className="form-control-alternative"
																type="text"
																name="itemCode"
																placeholder="Masukan deskripsi"
																value={deskripsi}
																onChange={(e) => {
																	setDeskripsi(e.target.value);
																}}
															/>
														</Col>
                            
													</FormGroup>
                          <FormGroup row>
														<Label for="exampleEmail" sm={4}>
															
														</Label>
														<Col sm={7}>
                                <Button color="primary" className="mb-3" onClick={() => updateSatuan()}>
                                UPDATE
                                </Button>
                              </Col>
													</FormGroup>
												</CardBody>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Satuan;
