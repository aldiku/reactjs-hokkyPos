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
    Collapse, 
    Form, 
    FormGroup, 
    Label, 
    Input 
} from 'reactstrap';

import { Link } from "react-router-dom";
import axios from 'axios';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const AdminApprove = () => {
  const token = localStorage.token;
   const redirectPrefix = `/admin/sales-order/validasi-admin-so/edit/`;
  const [rowIndex, setRowIndex] = useState(0);
  const [allSo, setAllSo] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const [ordercode, setOrderCode] = useState("");
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
      updateDataTable(page, perPage, currentSort, ordercode, description);
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

  const updateDataTable = (page, perPage, sort, ordercode, description) => {
    getSo(page, perPage, sort, ordercode, description);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
    setOrderCode(ordercode);
    setDescription(description);
  }

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`
      updateDataTable(page, perPage, sort,  ordercode, description)
    }
  }

  
  useEffect(() => {
    getSo(page, perPage, currentSort);
  }, []);

  // fungsi dari ambil data
  const getSo = (page, perPage, currentSort) => {
    
    let filter = { 
      page: page, 
      per_page: perPage, 
      approve : 1, 
      admin_approval: 0,
    
    };
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
        setAllSo(data.data.response_data);
        setPage(data.data.current_page + 1);
        setPerpage(data.data.per_page);
        setTotalItem(data.data.total_item);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const reset = () => {
    setOrderCode("");
    setDescription("");
    updateDataTable(1, perPage, currentSort, "", "");
  }

  return (
    <div>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3>Validasi Admin SO</h3>
                </div>
              </CardHeader>
              <CardBody>
              <h3 onClick={toggleOpen} >Search &nbsp;
                  {
                    isOpen === true ? <i className="fa fa-angle-down" aria-hidden="true"></i> : <i className="fa fa-angle-right" aria-hidden="true"></i>
                  }
                </h3>
                <Collapse isOpen={isOpen}>
                  <Form>
                        <Row md="12">
                          <Col md="3">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Kode SO</Label>
                              <Input
                                type="text"
                                placeholder="Masukan Kode SO"
                                value={ordercode}
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
                                onChange={e => updateDataTable(1, perPage, currentSort, ordercode, e.target.value)}
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
                    </Collapse>
                    <ToolkitProvider
                            rowNumber={rowIndex}
                            data={allSo}
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
                                dataField: "order_code",
                                text: "Kode SO",
                                sort: true,
                            },
                            
                            {
                                dataField: "keterangan_payment",
                                text: "keterangan Pembayaran",
                                sort: true,
                            },
                            {
                                dataField: "is_cicil",
                                text: "Termin",
                                sort: true,
                            },
                            {
                                dataField: "keterangan_po",
                                text: "Keterangan Po",
                                sort: true,
                            },
                            {
                                dataField: "so_type",
                                text: "Tipe SO",
                                sort: true,
                                formatter: (cell, row) => {
                                    return row.approve === 0 ? "Ready" : "Indent"  ;
                                    },
                            },
                            {
                                dataField: "admin_approval",
                                text: "Status",
                                sort: true,
                                formatter: (cell, row) => {
                                    return row.status_barang === 0
                                      ? 'proses'
                                      : row.status_barang === 1
                                      ? 'Setuju'
                                      : 'Tidak Setuju';
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
                                            <i className="fas fa-user-edit" />
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
      
    </div>
  );
}

export default AdminApprove;
