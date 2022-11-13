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
    Container,
    Form, 
    FormGroup, 
    Label, 
    Input 
} from 'reactstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import SimpleHeader from "components/Headers/SimpleHeader.js";
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const PelunasanKasir = () => {
  const token = localStorage.token;
  const warehouse = parseInt(localStorage.warehouse);
  const redirectPrefix = `/admin/pelunasan/edit/`;
//   const redirectPrefix1 = `/admin/sales-order/so-penawaran/detail/`;
  const [rowIndex, setRowIndex] = useState(0);
  const [allPenawaranSo, setAllPenawaranSo] = useState([]);
  const [status, setStatus] = useState(0);
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
      updateDataTable(page, perPage, currentSort, status, description);
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

  const updateDataTable = (page, perPage, sort, status, description) => {
    getPenawaranSo(page, perPage, sort, status, description);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
    setStatus(status);
    setDescription(description);
  }

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`
      updateDataTable(page, perPage, sort,  status, description)
    }
  }

  
  useEffect(() => {
    getPenawaranSo(page, perPage, currentSort);
  }, []);

  // fungsi dari ambil data
  const getPenawaranSo = async (page, perPage, currentSort, status = null, keterangan = null) => {
    
    let filter = {
      page: page, 
      per_page: perPage,
      status:1,
      warehouse_id : parseInt(warehouse)
    };
    if (status !== null) {
      filter = Object.assign(filter, { status: status })
    }
    if (keterangan !== null) {
        filter = Object.assign(filter, { keterangan: keterangan })
    }
    const data = filter;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/sales-order/page`, data, {
        headers,
      })
      .then((data) => {
        setAllPenawaranSo(data.data.response);
        setPage(data.data.current_page + 1);
        setPerpage(data.data.per_page);
        setTotalItem(data.data.total_item);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // const reset = () => {
  //   setStatus("");
  //   setDescription("");
  //   updateDataTable(1, perPage, currentSort, "", "");
  // }

  return (
    <div>
        <SimpleHeader name="Pelunasan" parentName="SO" />
      <Container className="mt--6" fluid>
      <Row>
          <div className="col">
          <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3>Pelunasan</h3>
                </div>
              </CardHeader>
              <CardBody>
                      {/* <Form>
                        <Row md="12">
                          <Col md="3">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Status</Label>
                              <Input
                                className="form-control-alternative"
                                name="Tipe So"
                                type="select"
                                value={status}
                                onChange={e => updateDataTable(1, perPage, currentSort, e.target.value, description)}
                              >
                                <option value="">Pilih Sales Order</option>
                                <option value="1">Cahsier</option>
                                <option value="2">Project</option>
                                <option value="3">E-commerce</option>
                                <option value="4">Canvaser</option>
                              </Input>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Form> */}
                    <ToolkitProvider
                            rowNumber={rowIndex}
                            data={allPenawaranSo}
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
                              dataField: "created_at",
                              text: "Tanggal Buat",
                              sort: true,
                            },
                            {
                                dataField: "so_code",
                                text: "Kode SO",
                                sort: true,
                            },
                            {
                                dataField: "customer_name",
                                text: "Customer",
                                sort: true,
                            },
                            {
                                dataField: "qty_total",
                                text: "Jumlah Total",
                                sort: true,
                            },
                            {
                                dataField: "status_ph",
                                text: "Status",
                                sort: true,
                                formatter: (cell, row) => {
                                  return row.status_ph === 3
                                    ? 'proses'
                                    : row.status_ph === 4
                                    ? 'Tidak Setuju'
                                    : 'Setuju';
                                },
                            },
                            {
                                dataField: "", text: "", formatter: (cell, row, index) => {
                                return (
                                    <ButtonGroup>
                                        <Button>
                                            <Link
                                            to={redirectPrefix + row.id}
                                            id={"tooltip_" + row.id}
                                            >
                                            <i className="fas fa-book" /> PELUNASAN
                                            </Link>
                                        </Button>
                                    </ButtonGroup>
                                  )
                                }
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
      </Container>
    </div>
  );
}

export default PelunasanKasir;