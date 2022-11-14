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
    Form, 
    FormGroup, 
    Label, 
    Input, 
    ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const PenawaranSo = () => {
  const token = localStorage.token;
  const warehouse = parseInt(localStorage.warehouse);
  const redirectPrefix = `/admin/sales-order/so-penawaran/edit/`;
  const redirectPrefix1 = `/admin/sales-order/so-penawaran/detail/`;
  const [rowIndex, setRowIndex] = useState(0);
  const [allPenawaranSo, setAllPenawaranSo] = useState([]);
  const [status, setStatus] = useState(0);
  const [description, setDescription] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [totalItem, setTotalItem] = useState(0);
  const [currentSort, setCurrentSort] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [statusph, setStatusph] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
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

  const updateDataTable = (page, perPage, sort, status, description,start,end,statusph) => {
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
    setStatus(status);
    setDescription(description);
    setStart(start);
    setEnd(end);
    setStatusph(statusph);
    getPenawaranSo(page, perPage, sort, status, description,start,end,statusph);
  }

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`
      updateDataTable(page, perPage, sort,  status, description,start,end,statusph)
    }
  }

  
  useEffect(() => {
    getPenawaranSo(page, perPage, currentSort);
  }, []);

  // fungsi dari ambil data
  const getPenawaranSo = async (page, perPage, currentSort, status = null, keterangan = null,start,end,statusph) => {
    
    let filter = { 
      
      page: page, 
      per_page: perPage,
      warehouse_id : parseInt(warehouse)
    };
    if (status !== null) {
      filter = Object.assign(filter, { status: status })
    }
    if (keterangan !== null) {
        filter = Object.assign(filter, { keterangan: keterangan })
    }
    if (start !== '') {
      filter = Object.assign(filter, { start_date: start })
    }
    if (end !== '') {
      filter = Object.assign(filter, { end_date: end })
    }
    if (statusph !== '') {
      filter = Object.assign(filter, { statusph: statusph })
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
  const downloadExcel = async ()=> {
    var fileName = 'Data-order'
    // get data all
    var filter = { 
      page: page, 
      per_page: 1000,
      warehouse_id : parseInt(warehouse)
    };
    if (status !== null) {
      filter = Object.assign(filter, { status: status })
    }
    if (description !== null) {
        filter = Object.assign(filter, { keterangan: description })
    }
    if (start !== '') {
      filter = Object.assign(filter, { start_date: start })
    }
    if (end !== '') {
      filter = Object.assign(filter, { end_date: end })
    }
    if (statusph !== '') {
      filter = Object.assign(filter, { statusph: statusph })
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/sales-order/page`, filter, {
        headers,
      })
      .then((res) => {
        var apiData = res.data.response.map((i)=>{
          return {
            'So Code' : i.so_code,
            'Address' : i.manual_address,
            'Total Barang' : i.qty_total,
            'Harga Total' : i.price_total,
            'Diskon Total' : i.diskon_total,
            'Harga ongkir' : i.ongkir,
            'Harga Payment' : i.payment_total,
            'Keterangan' : i.keterangan,
          }
        });
        const ws = XLSX.utils.json_to_sheet(apiData);
        const fileType ="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
        <Row>
          <div className="col">
          <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3>Sales Order</h3>
                  <div style={{ textAlign: 'right' }}>
                    <Link className="btn btn-info" to="/admin/sales-order/so-penawaran/create">
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
                              <Label>Start</Label>
                              <Input
                                className="form-control-alternative"
                                name="start"
                                type="date"
                                value={start}
                                onChange={e => updateDataTable(1, perPage, currentSort, status, description,e.target.value,end,statusph)}
                              >
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col md="3">
                            <FormGroup>
                              <Label>End</Label>
                              <Input
                                className="form-control-alternative"
                                name="end"
                                type="date"
                                value={end}
                                onChange={e => updateDataTable(1, perPage, currentSort, status, description,start,e.target.value,statusph)}
                              >
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col md="3">
                            <FormGroup>
                              <Label>Status PH</Label>
                              <Input
                                className="form-control-alternative"
                                name="statusph"
                                type="select"
                                value={statusph}
                                onChange={e => updateDataTable(1, perPage, currentSort, status, description,start,end,e.target.value)}
                              >
                                  <option value="">--all--</option>
                                  <option value="3">Proses</option>
                                  <option value="4">Ditolak</option>
                                  <option value="5">Disetujui</option>
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col md="3">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Status</Label>
                              <Input
                                className="form-control-alternative"
                                name="Tipe So"
                                type="select"
                                value={status}
                                onChange={e => updateDataTable(1, perPage, currentSort, e.target.value, description,start,end,statusph)}
                              >
                                <option value="">Pilih Sales Order</option>
                                <option value="1">Cahsier</option>
                                <option value="2">Project</option>
                                <option value="3">E-commerce</option>
                                <option value="4">Canvaser</option>
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col>
                            <Button type='button' onClick={e => updateDataTable(1, perPage, currentSort,status, description,start,end,statusph)} className="btn btn-info">Filter</Button>
                            <ButtonDropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(true)}>
                              <DropdownToggle caret color="primary">
                                Download
                              </DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem onClick={()=> {downloadExcel(allPenawaranSo)}}>Excel</DropdownItem>
                                <DropdownItem>PDF</DropdownItem>
                              </DropdownMenu>
                            </ButtonDropdown>
                          </Col>
                        </Row>
                      </Form>
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
                                        <i className="fas fa-user-edit" /> Edit
                                        </Link>
                                    </Button>
                                    &nbsp;
                                    <Button>
                                        <Link
                                        to={redirectPrefix1 + row.id}
                                        id={"tooltip1_" + row.id}
                                        >
                                        <i className="fas fa-user-edit" /> Detail
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

export default PenawaranSo;