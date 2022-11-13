/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { 
  Card, 
  Button, 
  Row, 
  Col, 
  CardBody, 
  CardHeader,
  Container,
  Form, 
  FormGroup, 
  ButtonGroup,
  Label, 
  Input 
} from 'reactstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from "react-bootstrap-table-next";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import paginationFactory from "react-bootstrap-table2-paginator";

const ClosingKasir = () => {
  const token = localStorage.token;
  const warehouse = parseInt(localStorage.warehouse);
  const [rowIndex, setRowIndex] = useState(0);
  const [allRak, setAllRak] = useState([]);
  const [rakCode, setRakCode] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [totalItem, setTotalItem] = useState(0);
  const [currentSort, setCurrentSort] = useState("");
  const allInfo = JSON.parse(localStorage.allinfo);
  const redirectPrefix = `/admin/closing-kasir/detail/`;
	const createButton = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Rak").map((p) => p.create_access));

  
  let paginationOption = {
    page: page,
    alwaysShowAllBtns: true,
    override: true,
    showTotal: true,
    withFirstAndLast: false,
    sizePerPage: perPage,
    totalSize: totalItem,
    onPageChange: (page) => {
      updateDataTable(page, perPage, currentSort, rakCode, keterangan);
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

  const updateDataTable = (page, perPage, sort, rakCode, keterangan) => {
    getRak(page, perPage, sort, rakCode, keterangan);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
    setRakCode(rakCode);
    setKeterangan(keterangan);
    
  }

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`
      updateDataTable(page, perPage, sort, rakCode, keterangan)
    }
  }

  useEffect(() => {
    getRak(page, perPage, currentSort, "", "");
  }, []);

  const getRak = async (page, perPage, currentSort, username = null, batch_number = null) => {
    let filter = {
       page: page, 
       per_page: perPage,
       id_warehouse: parseInt(warehouse) 
      }
      if (username !== null) {
        filter = Object.assign(filter, { username: username })
      }
      if (batch_number !== null) {
        filter = Object.assign(filter, { batch_number: batch_number })
      }
    const data = filter;
    const headers = {
      'Authorization': `Bearer ${token}`,
    };
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/chasier-settlement/page`, data, { headers })
    console.log(res);
      setAllRak(res.data.response);
      setPage(res.data.current_page + 1);
      setPerpage(res.data.per_page);
      setTotalItem(res.data.total_item);
    }

  const reset = () => {
    setKeterangan("");
    setRakCode("");
    updateDataTable(1, perPage, currentSort, "", "");
  }

  const formatRupiah = (money) => {
    return new Intl.NumberFormat('id-ID',
        { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
    ).format(money);
  }

  return (
    <div>
     <SimpleHeader name="Closing Kasir" parentName="Master" />
      <Container className="mt--6" fluid>
       <Row>
          <div className="col">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3>Closing Kasir</h3>
                  {/* {createButton && createButton === "YES" && (
                  <div style={{ textAlign: "right" }}>
                    <Link className="btn btn-info" to="/admin/rak/create">
                      Tambah
                    </Link>
                  </div>
                  )} */}
                </div>
              </CardHeader>
              
                <CardBody>
                      <Form>
                        <Row md="12">
                          <Col md="3">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Kode Closing</Label>
                              <Input
                              className="form-control-alternative"
                                type="text"
                                placeholder="Masukan Kode Closing"
                                value={rakCode}
                                onChange={e => updateDataTable(1, perPage, currentSort, e.target.value, rakCode)}
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
                  data={allRak}
                  keyField="id"
                  search={ {
                    defaultSearch: 'search something here'
                  } }
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
                        dataField: "modal",
                        text: "Modal",
                        sort: true,
                        formatter: (value) => formatRupiah(value)
                    },
                    // {
                    //     dataField: "pecahan_seratus",
                    //     text: "100",
                    //     sort: true,
                    // },
                    // {
                    //     dataField: "pecahan_dua_ratus",
                    //     text: "200",
                    //     sort: true,
                    // },
                    // {
                    //     dataField: "pecahan_lima_ratus",
                    //     text: "500",
                    //     sort: true,
                    // },
                    // {
                    //     dataField: "pecahan_seribu",
                    //     text: "1.000",
                    //     sort: true,
                    // },
                    // {
                    //     dataField: "pecahan_dua_ribu",
                    //     text: "2.000",
                    //     sort: true,
                    // },
                    // {
                    //     dataField: "pecahan_lima_ribu",
                    //     text: "5.000",
                    //     sort: true,
                    // },
                    // {
                    //     dataField: "pecahan_sepuluh_ribu",
                    //     text: "10.000",
                    //     sort: true,
                    // },
                    // {
                    //     dataField: "pecahan_dua_puluh_ribu",
                    //     text: "20.000",
                    //     sort: true,
                    // },
                    // {
                    //     dataField: "pecahan_lima_puluh_ribu",
                    //     text: "50.000",
                    //     sort: true,
                    // },
                    // {
                    //     dataField: "pecahan_tujuh_lima_ribu",
                    //     text: "75.000",
                    //     sort: true,
                    // },
                    // {
                    //     dataField: "pecahan_seratus_ribu",
                    //     text: "100.000",
                    //     sort: true,
                    // },
                    {
                        dataField: "omzet",
                        text: "Omset",
                        sort: true,
                        formatter: (value) => formatRupiah(value)
                    },
                    {
                      dataField: "", text: "", formatter: (cell, row, index) => {
                      return (
                        
                          <ButtonGroup>
                            {createButton && createButton === "YES" && (
                              <Button>
                                  <Link
                                  to={redirectPrefix + row.id}
                                  id={"tooltip_" + row.id}
                                  >
                                  <i className="fas fa-user-edit" /> Detail
                                  </Link>
                              </Button>
                            )}
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

export default ClosingKasir;