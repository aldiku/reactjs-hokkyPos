/*eslint-disable*/
import React, { useState, useEffect } from "react";
import {
  Row,
  TabContent,
  Table,
  CardHeader,
  Col,
  PaginationItem,
  PaginationLink,
  Button,
  Pagination,
  FormGroup,
  Input,
} from "reactstrap";

import { Link, useHistory } from "react-router-dom";
import PreviewImage from "./snippets/PreviewImage";
import Swal from "sweetalert2";

// state management
import store from "./snippets/redux";
import axios from "axios";

const base_url = process.env.REACT_APP_API_BASE_URL;

export default function ListImageItem() {
  const history = useHistory();

  const [amountShown, setAmountShown] = useState(10);
  const [listImage, setListImage] = useState([]);
  const [selectedSrc, setSelectedSrc] = useState("");
  const [tipeMaterial, setTipeMaterial] = useState("1");
  const [kodeItem, setKodeItem] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [detailData, setDetailData] = useState([]);
  const [alias, setAlias] = useState({});
  const [itemName, setItemName] = useState("")

  const [nav, setNav] = useState([1]);
  const [activeNav, setActiveNav] = useState(1);
  const [startNav, setStartNav] = useState(0);
  const [endNav, setEndNav] = useState(3);

  //
  const [selectedKeterangan, setKeterangan] = useState("");

  useEffect(() => {
    listenEvent();
    getListImage();
  }, []);

  function getDetail(id) {
    axios
      .get(`${base_url}/items/${id}`)
      .then((res) => {
        setSelectedSrc(res.data.response.items.image_url);
        setDetailData({
          kode_item: res.data.response.items.item_code,
          nama_item: res.data.response.items.item_name,
        });
        setAlias({
          kode_item: "KODE ITEM",
          nama_item: "NAMA ITEM",
        });
      })
      .catch((err) => {
        console.warn(err);
      });
  }
  /**
   * It takes a parameter of
   * `amount` which is the number of images you want to display, and a list of
   * `images` which is the list of images you want to display
   * @param [amount=10] - The amount of images to be fetched.
   */
  async function getListImage(amount = 10, page = 1, type = 1, kodeItem = "") {
    const payload = {
      page: page,
      per_page: amount,
      warehouse_id: parseInt(localStorage.warehouse),
      type: type,
      item_name: itemName,
      item_code: kodeItem,
    };

    // terpaksa menggunakan fech karena axios tidak mau return data
    const req = await fetch(`${base_url}/items`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const res = await req.json();

    setListImage(res.response);
    // create navigation button based on amount of data
    const navigationList = [];
    for (let i = 0; i < res.total_item / amountShown; i++) {
      navigationList.push(i + 1);
    }
    setNav(navigationList);
  }

  let cancelToken;
  async function getByItemName(itemname = "") {
    try {
      if (typeof cancelToken !== typeof undefined) {
        cancelToken.cancel("membatalkan request sebelumnya");
      }

      cancelToken = axios.CancelToken.source();

      const data = {
        page: parseInt(activeNav),
        per_page: parseInt(amountShown),
        item_name: itemname,
        item_code: "",
        type: parseInt(tipeMaterial),
      };

      const req = await axios.post(
        `${base_url}/items`,
        JSON.stringify(data, true),
        {
          cancelToken: cancelToken.token,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const res = await req.data;
      setListImage(res.response);
    } catch (err) {
      console.warn(err);
    }
  }

  /**
   * It listens to the store's state changes and changes the state of the popup accordingly
   */
  function listenEvent() {
    store.subscribe(() => {
      const state = store.getState();
      switch (state.type) {
        case "close_preview_modal":
          setPopupVisible(false);
          break;
        default:
        //
      }
    });
  }

  /**
   * It shows a warning message, then asks the user to confirm the action. If the user confirms, it sends
   * a POST request to the server to delete the image. If the request is successful, it reloads the page
   * to show the updated list of images
   * @param [id=0] - The id of the image you want to delete.
   */
  function handleDelete(id = 0) {
    Swal.fire({
      icon: "warning",
      title: "Peringatan",
      text: "apakah anda yakin hapus data ini ?",
      showCancelButton: true,
      showConfirmButton: true,
    })
      .then(async (res) => {
        if (res.isConfirmed) {
          const req = await fetch(`${base_url}/image/banner/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.token}`,
            },
            method: "POST",
          });
          const res = await req.json();

          if (req.status === 200) {
            getListImage(amountShown, activeNav);
            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Data berhasil dihapus",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Gagal",
              text: "Silahkan coba beberapa saat lagi",
            });
          }
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Silahkan coba beberapa saat lagi",
        });
      });
  }

  /**
   * This function is used to handle the navigation of the navbar.
   */
  function handleNextNav() {
    const nextStart = startNav + 1;
    const nextend = endNav + 1;
    if (nav.slice(nextStart, nextend).length > 0) {
      setStartNav(nextStart);
      setEndNav(nextend);
    }
  }

  function handlePrev() {
    console.log("work");
    const nextStart = startNav - 1;
    const nextend = endNav - 1;
    if (nav.slice(nextStart, nextend).length > 0) {
      setStartNav(nextStart);
      setEndNav(nextend);
    }
  }

  return (
    <>
      <TabContent activeTab={"1"} className="table-container">
        <CardHeader>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Item Image</h3>
            <div style={{ textAlign: "right" }}></div>
          </div>
        </CardHeader>
        {/* preview */}
        <PreviewImage
          detail={true}
          keterangan={selectedKeterangan}
          page={"image-items"}
          src={selectedSrc}
          isOpen={popupVisible}
          ObjectData={detailData}
          alias={alias}
        />
        {/* filter */}
        <Row>
          <Col md="6">
            <div className="flex-container">
              <FormGroup>
                <br />
                <label htmlFor="tipeitem" className="form-control-label">
                  Tipe Item
                </label>
                <Input
                  type="select"
                  id="tipeitem"
                  onChange={(evt) => {
                    setTipeMaterial(evt.target.value);
                    getListImage(amountShown, activeNav, evt.target.value);
                  }}
                >
                  <option value="1">Item Material</option>
                  <option value="2">Item Production</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <br />
                <label htmlFor="query" className="form-control-label">
                  Nama Item
                </label>
                <Input
                  onChange={(evt) =>{getByItemName(evt.target.value); setItemName(evt.target.value)}}
                  type="text"
                  id="query"
                  placeholder="Masukan nama item"
                />
              </FormGroup>
              <FormGroup>
                <br />
                <label htmlFor="query" className="form-control-label">
                  Kode Item
                </label>
                <Input
                  onChange={(evt) => {
                    setKodeItem(evt.target.value);
                    getListImage(
                      amountShown,
                      activeNav,
                      tipeMaterial,
                      evt.target.value
                    );
                  }}
                  type="text"
                  id="query"
                  placeholder="Masukan kode Item"
                />
              </FormGroup>
            </div>
            <Table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nama Item</th>
                  <th>Kode Item</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {listImage.map((items, i) => (
                  <tr key={i}>
                    <td>{(i + 1) + ((activeNav - 1) * amountShown)}</td>
                    <td>{items.item_name}</td>
                    <td>{items.item_code}</td>
                    <td>
                      <Button
                        onClick={() => {
                          setPopupVisible(true);
                          setSelectedSrc(items.image_url);
                          setKeterangan(items.keterangan);
                          getDetail(items.id);
                        }}
                        color="primary"
                        size="sm"
                        type="button"
                      >
                        Preview
                      </Button>
                      <Button
                        onClick={() =>
                          history.push({
                            pathname: `/admin/image/item/update/${items.id}`,
                          })
                        }
                        color="warning"
                        size="sm"
                        type="button"
                      >
                        <i className="ni ni-image"></i>
                        <span>Masukan Gambar</span>
                      </Button>
                      {/* <Button
                        onClick={() => handleDelete(items.id)}
                        color="danger"
                        size="sm"
                        type="button"
                      >
                        Hapus
                      </Button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        {/* filter */}
        <div className="filter-page">
          <div className="section-1">
            <span>Show</span>
            <select
              className="filter-select"
              onChange={(evt) => {
                setAmountShown(parseInt(evt.target.value));
                getListImage(
                  parseInt(evt.target.value),
                  activeNav,
                  tipeMaterial
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
              entries. Showing rows 1 to {listImage.length} of {amountShown}
            </span>
          </div>
          <div className="section-2">
            <nav aria-label="...">
              <Pagination>
                <PaginationItem className={startNav < 1 ? "disabled" : ""}>
                  <PaginationLink
                    href="#pablo"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePrev();
                    }}
                  >
                    <i className="fa fa-angle-left" />
                    <span className="sr-only">Previous</span>
                  </PaginationLink>
                </PaginationItem>

                {nav.slice(startNav, endNav).map((items, i) => (
                  <PaginationItem
                    className={activeNav === items ? "active" : ""}
                    key={i}
                  >
                    <PaginationLink
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveNav(items);
                        getListImage(amountShown, items, tipeMaterial);
                      }}
                    >
                      {items}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem
                  className={endNav > nav.length ? "disabled" : ""}
                >
                  <PaginationLink
                    href="#pablo"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNextNav();
                    }}
                  >
                    <i className="fa fa-angle-right" />
                    <span className="sr-only">Next</span>
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </nav>
          </div>
        </div>
        {/*  */}
      </TabContent>
    </>
  );
}
