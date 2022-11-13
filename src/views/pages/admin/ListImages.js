/*eslint-disable*/
import React, { useState, useEffect } from "react";
import {
  Row,
  TabContent,
  Table,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Button,
  PaginationItem,
  PaginationLink,
  Pagination,
} from "reactstrap";

import { Link, useHistory } from "react-router-dom";
import PreviewImage from "./snippets/PreviewImage";
import Swal from "sweetalert2";

//
import store from "./snippets/redux";

const base_url = process.env.REACT_APP_API_BASE_URL;

export default function ListImage() {
  const history = useHistory();
  const [amountShown, setAmountShown] = useState(10);
  const [listImage, setListImage] = useState([]);

  //
  const [kategori, setKategori] = useState([]);
  const [listFunction, setFunction] = useState([]);
  const [merek, setListMerek] = useState([]);

  //
  const [kategoriId, setKategoriId] = useState(0);
  const [functionId, setFunctionId] = useState(0);
  const [selectedSrc, setSelectedSrc] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [startNav, setStartNav] = useState(0);
  const [endNav, setEndNav] = useState(3);

  const [nav, setNav] = useState([1]);
  const [activeNav, setActiveNav] = useState(1);

  const [filterCriteria, setFilterCriteria] = useState({
    per_page: amountShown,
    page: 1,
  });

  useEffect(() => {
    listenEvent();
    getListImage();
    getKategori();
  }, []);

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

  async function getListImage(amount = 10, page = 1) {
    try {
      const data = {
        page: page,
        per_page: amount,
      };
      const req = await fetch(`${base_url}/image/items`, {
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
   * It fetches the list of item categories from the server and stores it in the state
   */
  async function getKategori() {
    try {
      const req = await fetch(`${base_url}/item-kategori/list`);
      const res = await req.json();

      if (req.status === 200 && res.response.length > 0) {
        setKategori(res.response);
      }
    } catch (err) {
      //
    }
  }

  /**
   * It takes in a list of subKategoriIds and returns a list of itemFunctions
   * @param subKategoriIds - The subKategoriIds is the id of the subKategori that you want to get the
   * list of functions.
   */
  async function getListFunction(KategoriIds) {
    try {
      const req = await fetch(
        `${base_url}/item-function/ecom?kategori_id=${KategoriIds}`
      );
      const res = await req.json();
      if (req.status === 200 && res.response.length > 0) {
        setFunction(res.response);
      }
    } catch (err) {}
  }

  /**
   * It fetches the list of all the available Merek based on the selected Kategori, Sub Kategori,
   * Function, and Sub Function
   * @param subFunctionIds - The sub function id.
   */
  async function getMerek(FunctionId) {
    try {
      const req = await fetch(
        `${base_url}/merek/ecom?kategori_id=${kategoriId}&function_id=${FunctionId}`
      );
      const res = await req.json();
      if (req.status === 200 && res.response.length > 0) {
        setListMerek(res.response);
      }
    } catch (err) {}
  }

  /**
   * It fetches the list of images from the server, and then sets the list of images to the state
   */
  async function getByFilter() {
    try {
      const criteria = filterCriteria;
      const req = await fetch(`${base_url}/image/items`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
        method: "POST",
        body: JSON.stringify(criteria),
      });

      const res = await req.json();

      if (req.status === 200 && res.response.length > 0) {
        setListImage(res.response);
      }
    } catch (err) {
      //
    }
  }

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
          const req = await fetch(`${base_url}/image/items/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.token}`,
            },
            method: "POST",
          });

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

  return (
    <>
      <TabContent activeTab={"1"} className="table-container">
        <CardHeader>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Image</h3>
            <div style={{ textAlign: "right" }}>
              <Link
                className="btn btn-info"
                to={{ pathname: "/admin/image/upload" }}
              >
                Add
              </Link>
            </div>
          </div>
        </CardHeader>
        {/* preview */}
        <PreviewImage page={"list"} src={selectedSrc} isOpen={popupVisible} />
        {/* filter */}
        <br />
        <Row className="table">
          <Col>
            <FormGroup>
              <label htmlFor="kategori">Kategori</label>
              <Input
                id="kategori"
                type="select"
                onChange={(evt) => {
                  filterCriteria.kategori_id = evt.target.value;
                  setKategoriId(evt.target.value);
                  getListFunction(evt.target.value);
                  getByFilter();
                }}
              >
                <option value="-">-</option>
                {kategori.map((items, i) => (
                  <option value={items.id} key={i}>
                    {items.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <label htmlFor="function">Function</label>
              <Input
                id="function"
                onChange={(evt) => {
                  filterCriteria.function_id = evt.target.value;
                  setFunctionId(evt.target.value);
                  getMerek(evt.target.value);
                  getByFilter();
                }}
                type="select"
              >
                <option value="-">-</option>
                {listFunction.map((items, i) => (
                  <option value={items.id} key={i}>
                    {items.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <label htmlFor="merek">Merek</label>
              <Input
                id="merek"
                type="select"
                onChange={(evt) => {
                  filterCriteria.merek_id = evt.target.value;
                  getByFilter();
                }}
              >
                <option value="-">-</option>
                {merek.map((items, i) => (
                  <option value={items.id} key={i}>
                    {items.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        {/*  */}
        <Table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Merek</th>
              <th>Kategori</th>
              <th>Function Name</th>
              <th>Tampilan</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listImage.map((items, i) => (
              <tr key={i}>
                <td>{(i + 1) + ((activeNav - 1) * amountShown)}</td>
                <td>{items.merek_name}</td>
                <td>{items.kategori_name}</td>
                <td>{items.function_name}</td>
                <td>
                  <Button
                    onClick={() => {
                      setPopupVisible(true);
                      setSelectedSrc(items.image_url);
                    }}
                    color="primary"
                    size="sm"
                    type="button"
                  >
                    Lihat Gambar
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => {
                      history.push({
                        pathname: `/admin/image/update/${items.id}`,
                      });
                    }}
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
