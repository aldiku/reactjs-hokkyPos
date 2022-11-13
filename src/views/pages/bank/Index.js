/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { 
    Card, 
    Button, 
    Row, 
    CardBody, 
    CardHeader,
    ButtonGroup,
    Container,
} from 'reactstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from "react-bootstrap-table-next";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import paginationFactory from "react-bootstrap-table2-paginator";

const Bank = () => {
  const token = localStorage.token;
  const warehouse = parseInt(localStorage.warehouse);
  const [rowIndex, setRowIndex] = useState(0);
  const [allBank, setAllBank] = useState([]);
  const redirectPrefix = `/admin/bank/edit/`;
  const [rakCode, setRakCode] = useState("");
  const [keterangan, setKeterangan] = useState("");
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
    getBank(page, perPage, sort, rakCode, keterangan);
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
    getBank(page, perPage, currentSort, "", "");
  }, []);

  const getBank = async (page, perPage, currentSort, bank_name = null, keterangan = null) => {
    let filter = {
       page: page, 
       per_page: perPage,
       warehouse_id: parseInt(warehouse) 
      }
      if (bank_name  !== null) {
        filter = Object.assign(filter, { bank_name : bank_name })
      }
      if (keterangan !== null) {
        filter = Object.assign(filter, { keterangan: keterangan })
      }
    const data = filter;
    const headers = {
      'Authorization': `Bearer ${token}`,
    };
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/bank `, data, { headers })
    console.log(res);
      setAllBank(res.data.response);
      setPage(res.data.current_page + 1);
      setPerpage(res.data.per_page);
      setTotalItem(res.data.total_item);
    }

  return (
    <div>
     <SimpleHeader name="Bank" parentName="Master" />
      <Container className="mt--6" fluid>
       <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3>List Bank</h3>
                  <div style={{ textAlign: "right" }}>
                    <Link className="btn btn-info" to="/admin/bank/create">
                      Tambah
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <ToolkitProvider
                  rowNumber={rowIndex}
                  data={allBank}
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
                      dataField: "account_name",
                      text: "Akun",
                      sort: true,
                    },
                    {
                      dataField: "account_number",
                      text: "Nomer Akun",
                      sort: true,
                    },
                    {
                        dataField: "bank_name",
                        text: "Bank",
                        sort: true,
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

export default Bank;