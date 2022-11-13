/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  CardBody,
  CardHeader,
  Container,
  UncontrolledTooltip,
  ButtonGroup,
  Collapse,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import SweetAlert from "react-bootstrap-sweetalert";

const Coa = () => {
  const token = localStorage.token;
  const [activeTab, setActiveTab] = useState("1");
  const redirectPrefix = `/admin/coa/edit/`;
  const [alert, setAlert] = React.useState(null);
  const [rowIndex, setRowIndex] = useState(0);
  const [allCoa, setAllCoa] = useState([]);
  const [codeCoa, setCodeCoa] = useState("");
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
      updateDataTable(page, perPage, currentSort, codeCoa);
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

  const updateDataTable = (page, perPage, sort, codeCoa) => {
    getCoa(page, perPage, sort, codeCoa);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
    setCodeCoa(codeCoa);
  };

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`;
      updateDataTable(page, perPage, sort, codeCoa);
    }
  };

  useEffect(() => {
    getCoa(page, perPage, currentSort, "");
  }, []);

  const getCoa = async (page, perPage, currentSort, coa_code = null) => {
    let filter = { page: page, per_page: perPage };
    if (coa_code !== null) {
      filter = Object.assign(filter, { coa_code: coa_code });
    }
    const data = filter;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/coa`,
      data,
      { headers }
    );
    setAllCoa(res.data.response);
    setPage(res.data.current_page + 1);
    setPerpage(res.data.per_page);
    setTotalItem(res.data.total_item);
  };

  const delateCoa = (id) => {
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/coa/delete/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setSuccessAlert();
        getCoa();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const setSuccessAlert = () => {
    setAlert(
      <SweetAlert
        success
        showConfirm
        confirmBtnText="Ok"
        title="Coa deleted"
        onCancel={hideAlert}
        onConfirm={hideAlert}
      />
    );
  };

  const setQuestionAlert = (id) => {
    setAlert(
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={() => delateCoa(id)}
        onCancel={hideAlert}
        focusCancelBtn
      />
    );
  };

  const hideAlert = () => {
    setAlert(null);
  };

  const rowEvents = {
    onDoubleClick: (e, row, rowIndex) => {
      setHide(false);
      setSelectedAcquirerId(row.acquirer_id);
      setSelectAcquirerName(row.acquirer_name);
    },
  };

  const reset = () => {
    setCodeCoa("");
    updateDataTable(1, perPage, currentSort, "");
  };

  return (
    <div>
      {alert}
      <SimpleHeader name="Coa" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>List Coa</h3>
                  <div style={{ textAlign: "right" }}>
                    <Link className="btn btn-info" to="/admin/coa/create">
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
                          <Label htmlFor="exampleFormControlSelect3">
                            Kode Coa
                          </Label>
                          <Input
                            type="text"
                            placeholder="Masukan Kode Coa"
                            value={codeCoa}
                            onChange={(e) =>
                              updateDataTable(
                                1,
                                perPage,
                                currentSort,
                                e.target.value
                              )
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button type="button" onClick={reset} color="secondary">
                          Reset
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                <ToolkitProvider
                  rowNumber={rowIndex}
                  data={allCoa}
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
                      dataField: "coa_code",
                      text: "Kode Coa",
                      sort: true,
                    },
                    {
                      dataField: "coa_name",
                      text: "Nama Coa",
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
                                to={redirectPrefix + row.id}
                                id={"tooltip_" + row.id}
                              >
                                <i className="fas fa-user-edit" />
                              </Link>
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target={"tooltip_" + row.id}
                            >
                              Edit
                            </UncontrolledTooltip>
                            <Button
                              id="btn-acquirer"
                              onClick={() => setQuestionAlert(row.id)}
                            >
                              <i className="fas fa-trash" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              placement="top"
                              target="btn-acquirer"
                            >
                              Delete Departemen
                            </UncontrolledTooltip>
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
      </Container>
    </div>
  );
};

export default Coa;
