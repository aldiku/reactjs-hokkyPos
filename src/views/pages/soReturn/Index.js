/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import {
  Card,
  Button,
  Row,
  CardBody,
  CardHeader,
  Container,
  UncontrolledTooltip,
  ButtonGroup,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SimpleHeader from 'components/Headers/SimpleHeader.js';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import DetailData from './DetailData';

const SalesOrderReturn = (props) => {
  const token = localStorage.token;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const redirectPrefix = `/admin/so-return/edit/`;
  const [rowIndex, setRowIndex] = useState(0);
  const [allSoReturn, setAllSoReturn] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [totalItem, setTotalItem] = useState(0);
  const [currentSort, setCurrentSort] = useState('');
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});

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
          Show{' '}
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
          }{' '}
          entries.
        </label>
      </div>
    ),
  };

  const updateDataTable = (page, perPage, sort) => {
    getSoReturn(page, perPage, sort);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
  };

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === 'sort') {
      let sort = `${sortField} ${sortOrder}`;
      updateDataTable(page, perPage, sort);
    }
  };

  useEffect(async () => {
    await getSoReturn(page, perPage, currentSort);
  }, []);

  const getSoReturn = async (page, perPage, currentSort) => {
    let filter = { page: page, per_page: perPage };
    const data = filter;
    await axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/retur-so/page`, data, {
        headers,
      })
      .then((data) => {
        setAllSoReturn(data.data.response_data);
        setPage(data.data.current_page + 1);
        setPerpage(data.data.per_page);
        setTotalItem(data.data.total_item);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const rowEvents = {
    onDoubleClick: (e, row, rowIndex) => {
      setHide(false);
      setSelectedAcquirerId(row.acquirer_id);
      setSelectAcquirerName(row.acquirer_name);
    },
  };

  return (
    <div>
      {alert}
      <SimpleHeader name="Sales Order Return" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <h3>List Sales Order Return</h3>
                  <div style={{ textAlign: 'right' }}>
                    <Link className="btn btn-info" to="/admin/so-return/create">
                      Add
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <ToolkitProvider
                  rowNumber={rowIndex}
                  data={allSoReturn}
                  keyField="id"
                  columns={[
                    {
                      dataField: 'no',
                      text: '#',
                      sort: true,
                      page: 1,
                      formatter: (cell, row, index) => {
                        let currentRow = ++index;
                        return currentRow + rowIndex;
                      },
                    },
                    {
                      dataField: 'username_so',
                      text: 'Username Sales Order',
                      sort: true,
                    },
                    {
                      dataField: 'retur_code',
                      text: 'Kode Retur',
                      sort: true,
                    },
                    {
                      dataField: 'customer',
                      text: 'Customer',
                      sort: true,
                    },
                    {
                      dataField: 'item_or_money',
                      text: 'Item atau Uang',
                      sort: true,
                      formatter: (cell, row) => {
                        return row.item_or_money === 1 ? 'Item' : 'Money';
                      },
                    },
                    {
                      dataField: 'total_qty',
                      text: 'Quality',
                      sort: true,
                    },
                    {
                      dataField: 'total_price',
                      text: 'Total Harga',
                      sort: true,
                    },
                    {
                      dataField: 'status_barang',
                      text: 'Status',
                      sort: true,
                      formatter: (cell, row) => {
                        return row.status_barang === 0
                          ? 'Belum diproses'
                          : row.status_barang === 1
                          ? 'Diterima'
                          : 'Belum diterima';
                      },
                    },
                    {
                      dataField: '',
                      text: '',
                      formatter: (cell, row, index) => {
                        return (
                          <>
                            <ButtonGroup>
                              <Button>
                                <Link
                                  to={redirectPrefix + row.id}
                                  id={'tooltip_' + row.id}
                                >
                                  <i className="fas fa-user-edit" />
                                </Link>
                              </Button>
                              <UncontrolledTooltip
                                delay={0}
                                target={'tooltip_' + row.id}
                              >
                                Edit
                              </UncontrolledTooltip>
                            </ButtonGroup>
                            <Button
                              onClick={() => {
                                setOpenDetail(true);
                                setSelectedRowData(row);
                              }}
                              size="sm"
                              color="primary"
                              type="button"
                            >
                              Detail
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
                        rowEvents={rowEvents}
                        pagination={paginationFactory({ ...paginationOption })}
                        onTableChange={handleTableChange}
                      />
                    </div>
                  )}
                </ToolkitProvider>
                <DetailData
                  isOpen={openDetail}
                  onCloseDetail={() => setOpenDetail(false)}
                  dataSoRetur={selectedRowData}
                />
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default SalesOrderReturn;
