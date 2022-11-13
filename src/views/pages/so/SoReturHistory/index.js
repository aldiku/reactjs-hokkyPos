/*eslint-disable*/
import {
  Container,
  Row,
  Card,
  CardHeader,
  CardBody,
  Table,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  Input,
  FormGroup,
} from "reactstrap";
import DetailData from "../snippets/DetailData";
import SimpleHeader from "components/Headers/SimpleHeader.js";

// state management
import store from "../snippets/redux";
import { useEffect, useState } from "react";
import axios from "axios";

const base_url = process.env.REACT_APP_API_BASE_URL;

export default function SoReturHistory() {
  const [listData, setListData] = useState([]);
  const [amountShown, setAmountShown] = useState(10);
  const [returCode, setReturCode] = useState("");
  const usernameSo = localStorage.username;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [preview, setPreview] = useState(false);
  const [detailData, setDetailData] = useState({});
  const [orderCode, setOrderCode] = useState([]);

  const [nav, setNav] = useState([1]);
  const [activeNav, setActiveNav] = useState(1);

  useEffect(() => {
    listenEvent();
    getData(activeNav, amountShown, returCode, usernameSo, startDate, endDate);
    getOrderCode();
  }, []);

  function getOrderCode() {
    axios
      .get(`${base_url}/sales-order/list`)
      .then((res) => {
        setOrderCode(res.data.response_data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  /**
   * It gets the data from the server and then set the data to the state
   * @param [page=1] - The page number of the data that you want to retrieve.
   * @param [per_page=10] - The number of items per page.
   * @param [retur_code] - The code of the return.
   * @param [username_so] - The username of the sales order
   * @param [start_date] - The start date of the date range.
   * @param [end_date] - The end date of the date range.
   */
  function getData(
    page = 1,
    per_page = 10,
    retur_code = "",
    username_so = "",
    start_date = "",
    end_date = ""
  ) {
    const payload = {
      page: page,
      per_page: per_page,
      retur_code: retur_code,
      username_so: username_so,
      start_date: start_date,
      end_date: end_date,
      werehouse_id: parseInt(localStorage.warehouse),
    };

    axios
      .post(`${base_url}/retur-so/history`, {
        body: JSON.stringify(payload),
      })
      .then((res) => {
        setListData(res.data.response_data);

        // membuat list tombol navigasi ie.1,2,3,4 etc
        const navigationList = [];
        for (let i = 0; i < res.data.total_item / amountShown; i++) {
          navigationList.push(i + 1);
        }
        setNav(navigationList);
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  /**
   * Listen to the store and when the store emits a change, run the function
   */
  function listenEvent() {
    store.subscribe(() => {
      const state = store.getState();
      if (state.type === "close_modal_preview") {
        setPreview(false);
      }
    });
  }

  function searchDataByFilter() {
    getData(activeNav, amountShown, returCode, usernameSo, startDate, endDate);
  }

  return (
    <>
      <SimpleHeader name="Sales Order" parentName="Admin" />
      <Container className="mt--6" fluid>
        {/* preview */}
        <DetailData visible={preview} data={detailData} />
        {/*  */}
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>Riwayat Retur Sales Order</h3>
                </div>
              </CardHeader>
              <CardBody>
                {/* filter */}
                <div className="flex-container">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="koderetur">
                      Kode Retur
                    </label>
                    <Input
                      type="select"
                      id="koderetur"
                      onChange={(evt) => setReturCode(evt.target.value)}
                    >
                      <option value="">-</option>
                      {orderCode.map((items, i) => (
                        <option value={items.order_code} key={i}>
                          {items.order_code}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="tanggalmulai"
                    >
                      Tanggal Mulai
                    </label>
                    <Input type="date" id="tanggalmulai" />
                  </FormGroup>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="tanggalselesai"
                    >
                      Tanggal Selesai
                    </label>
                    <Input
                      type="date"
                      id="tanggalselesai"
                      onChange={(evt) => console.log(evt.target.value)}
                    />
                  </FormGroup>
                  <Button
                    onClick={() => searchDataByFilter()}
                    type="button"
                    color="primary"
                  >
                    Telusuri
                  </Button>
                </div>
                {/*  */}
                <div className="table-container">
                  <Table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Username SO</th>
                        <th>Retur Code</th>
                        <th>Item or Money</th>
                        <th>Total QTY</th>
                        <th>Total Price</th>
                        <th>Status Barang</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {listData.map((items, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{items.username_so}</td>
                          <td>{items.retur_code}</td>
                          <td>{items.item_or_money}</td>
                          <td>{items.total_qty}</td>
                          <td>{items.total_price}</td>
                          <td>{items.status_barang}</td>
                          <td>
                            <Button
                              onClick={() => {
                                setPreview(true);
                                setDetailData(items);
                              }}
                              size="sm"
                              color="primary"
                              type="button"
                            >
                              Detail
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  <div className="filter-page">
                    <div className="section-1">
                      <span>Show</span>
                      <select
                        className="filter-select"
                        onChange={(evt) => {
                          setAmountShown(parseInt(evt.target.value));
                          getData(
                            activeNav,
                            parseInt(evt.target.value),
                            returCode,
                            usernameSo,
                            startDate,
                            endDate
                          );
                        }}
                      >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                      </select>
                      <span>
                        {" "}
                        entries. Showing rows 1 to {listData.length} of{" "}
                        {amountShown}
                      </span>
                    </div>
                    <div className="section-2">
                      <nav aria-label="...">
                        <Pagination>
                          <PaginationItem className="disabled">
                            <PaginationLink
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                              tabIndex="-1"
                            >
                              <i className="fa fa-angle-left" />
                              <span className="sr-only">Previous</span>
                            </PaginationLink>
                          </PaginationItem>

                          {nav.map((items, i) => (
                            <PaginationItem
                              className={activeNav === items ? "active" : ""}
                              key={i}
                            >
                              <PaginationLink
                                href="#pablo"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setActiveNav(items);
                                  getData(
                                    items,
                                    amountShown,
                                    returCode,
                                    usernameSo,
                                    startDate,
                                    endDate
                                  );
                                }}
                              >
                                {items}
                              </PaginationLink>
                            </PaginationItem>
                          ))}
                          <PaginationItem>
                            <PaginationLink
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fa fa-angle-right" />
                              <span className="sr-only">Next</span>
                            </PaginationLink>
                          </PaginationItem>
                        </Pagination>
                      </nav>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}
