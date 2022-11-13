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
} from "reactstrap";

import { Link, useHistory } from "react-router-dom";
import PreviewImage from "./snippets/PreviewImage";
import Swal from "sweetalert2";

// state management
import store from "./snippets/redux";

const base_url = process.env.REACT_APP_API_BASE_URL;

export default function ListBanner() {
  const history = useHistory();

  const [amountShown, setAmountShown] = useState(10);
  const [listImage, setListImage] = useState([]);
  const [selectedSrc, setSelectedSrc] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);

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
  /**
   * It takes a parameter of
   * `amount` which is the number of images you want to display, and a list of
   * `images` which is the list of images you want to display
   * @param [amount=10] - The amount of images to be fetched.
   */
  async function getListImage(amount = 10, page = 1) {
    try {
      const data = {
        page: page,
        per_page: amount,
      };
      const req = await fetch(`${base_url}/image/banner`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });
      const res = await req.json();
      if (req.status === 200 && res.response.length > 0) {
        setListImage(res.response);

        // create navigation button based on amount of data
        const navigationList = [];
        for (let i = 0; i < res.total_item / amountShown; i++) {
          navigationList.push(i + 1);
        }
        setNav(navigationList);
      } else {
        setListImage([]);
      }
    } catch (err) {
      setListImage([]);
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
        console.warn(err);
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
            <h3>Banner</h3>
            <div style={{ textAlign: "right" }}>
              <Link
                className="btn btn-info"
                to={{ pathname: "/admin/banner/upload" }}
              >
                Add
              </Link>
            </div>
          </div>
        </CardHeader>
        {/* preview */}
        <PreviewImage
          detail={true}
          keterangan={selectedKeterangan}
          page={"list"}
          src={selectedSrc}
          isOpen={popupVisible}
        />
        {/* filter */}
        <Row>
          <Col md="6">
            <Table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Keterangan</th>
                  <th>Tampilan</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {listImage.map((items, i) => (
                  <tr key={i}>
                    <td>{(i + 1) + ((activeNav - 1) * amountShown)}</td>
                    <td>{items.keterangan.slice(0, 50)}</td>
                    <td>
                      <Button
                        onClick={() => {
                          setPopupVisible(true);
                          setSelectedSrc(items.image_url);
                          setKeterangan(items.keterangan);
                        }}
                        color="primary"
                        size="sm"
                        type="button"
                      >
                        Lihat Detail
                      </Button>
                    </td>
                    <td>
                      <Button
                        onClick={() =>
                          history.push({
                            pathname: `/admin/image/banner/update/${items.id}`,
                          })
                        }
                        color="warning"
                        size="sm"
                        type="button"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(items.id)}
                        color="danger"
                        size="sm"
                        type="button"
                      >
                        Hapus
                      </Button>
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
                getListImage(parseInt(evt.target.value), activeNav);
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
                        getListImage(amountShown, items);
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
