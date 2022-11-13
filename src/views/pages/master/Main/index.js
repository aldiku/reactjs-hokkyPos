/*eslint-disable*/
import {
  Container,
  Row,
  Card,
  CardBody,
  TabContent,
  CardHeader,
  Table,
  Button,
  Pagination,
  PaginationLink,
  PaginationItem,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import Preview from "../snippets/Preview";

// state management
import { useEffect, useState } from "react";
import store from "../snippets/redux";

const base_url = process.env.REACT_APP_API_BASE_URL;
export default function MainJangka() {
  const history = useHistory();
  const [listData, setListData] = useState([]);

  // navigation
  const [amountShown, setAmountShown] = useState(10);
  const [nav, setNav] = useState([1]);
  const [activeNav, setActiveNav] = useState(1);
  const [detailVisible, setDetailVisible] = useState(false);

  // detail data
  const [detailData, setDetailData] = useState({
    id: 0,
    name: "",
    keterangan: "",
    hari: "",
    durasi: "",
    active_flag: 1,
  });

  useEffect(() => {
    getData();
    listenEvent();
  }, []);
  /**
   * It fetches the data from the API and then sets the listData to the response
   * @param [amount=10] - the number of items to be displayed on the page
   * @param [page=1] - The page number of the data you want to fetch.
   */
  async function getData(amount = 10, page = 1) {
    try {
      const body = {
        per_page: amount,
        page: page,
      };

      const req = await fetch(`${base_url}/jwkredit`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      const res = await req.json();

      if (res.status === 200 && res.response.length > 0) {
        setListData(res.response);
        const navigationList = [];
        for (let i = 0; i < res.total_item / amountShown; i++) {
          navigationList.push(i + 1);
        }
        setNav(navigationList);
      } else {
        setListData([]);
      }
    } catch (err) {
      setListData([]);
    }
  }

  async function showDetail(id) {
    try {
      setDetailVisible(true);
      const req = await fetch(`${base_url}/jwkredit/${id}`);
      const res = await req.json();

      if (res.status === 200) {
        setDetailData(res.response);
      }
    } catch (err) {}
  }

  /**
   * It listens to the store's state change and if the state is "close_modal_preview", it will set the
   * detailVisible to false
   */
  function listenEvent() {
    store.subscribe(() => {
      const state = store.getState();
      if (state.type === "close_preview_modal") {
        setDetailVisible(false);
      }
    });
  }

  return (
    <>
      <Preview
        nama={detailData.name}
        hari={detailData.hari}
        durasi={detailData.durasi}
        keterangan={detailData.keterangan}
        visible={detailVisible}
      />
      <SimpleHeader name="Jangka Waktu" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row className="table">
          <div className="col">
            <Card>
              <CardBody>
                <TabContent activeTab={"1"}>
                  {/* header */}
                  <CardHeader>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h3>Jangka Waktu</h3>
                      <div style={{ textAlign: "right" }}>
                        <Link
                          className="btn btn-info"
                          to={{ pathname: "/admin/jangka-waktu/create" }}
                        >
                          Add
                        </Link>
                      </div>
                    </div>
                  </CardHeader>
                  {/* body */}
                  <div className="table-container">
                    <Table className="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Nama</th>
                          <th>Hari</th>
                          <th>Durasi</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {listData.map((items, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{items.name}</td>
                            <td>{items.hari}</td>
                            <td>{items.durasi}</td>
                            <td>
                              <Button
                                onClick={() => showDetail(items.id)}
                                type="button"
                                color="primary"
                                size="sm"
                              >
                                Detail
                              </Button>
                              <Button
                                onClick={() => {
                                  history.push({
                                    pathname: `/admin/jangka-waktu/update/${items.id}`,
                                  });
                                }}
                                type="button"
                                color="warning"
                                size="sm"
                              >
                                Edit
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    {/* filter */}
                    <div className="filter-page">
                      <div className="section-1">
                        <span>Show</span>
                        <select
                          className="filter-select"
                          onChange={(evt) => {
                            setAmountShown(parseInt(evt.target.value));
                            getData(parseInt(evt.target.value), activeNav);
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
                                    getData(amountShown, items);
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
                  {/*  */}
                </TabContent>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}
