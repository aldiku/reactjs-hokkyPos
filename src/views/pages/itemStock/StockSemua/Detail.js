/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  CardBody,
  CardHeader,
  CardGroup,
  CardImg,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import axios from "axios";

const DetailItemStok = (props) => {
  const token = localStorage.token;
  const [activeTab, setActiveTab] = useState("1");
  const [alert, setAlert] = React.useState(null);
  const [hide, setHide] = useState(true);
  const [rowIndex, setRowIndex] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const [namaproyek,setNamaProyek] = useState("");
  const [alamatproyek,setAlamatProyek] = useState("");
  const [codecanvasing,setCodeCanvasing] = useState("");
  const [codetracking,setCodeTracking] = useState("");
  const [phone,setPhone] = useState("");
  const [image1,setImage1] = useState("");
  // const [,] = useState();
  // const [,] = useState();
  // const [,] = useState();

  const [allSelesTrackingDetail, setAllSelesTrackingDetail] = useState([]);

  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [totalItem, setTotalItem] = useState(0);
  const [currentSort, setCurrentSort] = useState("");

  useEffect(() => {
    getSalesTrackingDetail(page, perPage, currentSort);
  }, [props.code]);

  const getSalesTrackingDetail = (page, perPage, currentSort) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const data = { page: page, per_page: perPage };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/item-stock/get/${props.code}`,
        {
          headers,
        }
      )
      .then((data) => {
        setPage(data.data.current_page + 1);
        setPerpage(data.data.per_page);
        setTotalItem(data.data.total_item);
        setNamaProyek(data.data.response.nama_proyek);
        setAlamatProyek(data.data.response.alamat_proyek);
        setCodeCanvasing(data.data.response.canvasing_code);
        setCodeTracking(data.data.response.tracking_code);
        setPhone(data.data.response.pic_phone);
        setImage1(data.data.response.foto1);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  

  return (
    <div>
      {alert}
      <Card>
        <CardHeader>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Dokument Canvaser</h3>
          </div>
        </CardHeader>
        <CardBody>
          <Row md="12">
              <Col md="7">
                  <Card className="bg-secondary shadow">
                      <CardHeader className="bg-white border-0">
                      <h3>Detail Canvasing</h3>
                      </CardHeader>
                      <CardBody>
                      <FormGroup row>
                          <Label
                              for="exampleEmail"
                              sm={4}
                          >
                              Nama Proyek
                          </Label>
                          <Col sm={7}>
                              <Input
                                  disabled
                                  className="form-control-alternative"
                                  type="text"
                                  name="itemCode"
                                  placeholder="Masukan Kode Item"
                                  value={namaproyek}
                                  onChange={(e) => {
                                  setNamaProyek(e.target.value);
                                  }}
                              />
                          </Col>
                      </FormGroup>
                      <FormGroup row>
                          <Label
                              for="exampleEmail"
                              sm={4}
                          >
                          Alamat Proyek
                          </Label>
                          <Col sm={7}>
                              <Input
                                  disabled
                                  className="form-control-alternative"
                                  type="number"
                                  name="stock"
                                  placeholder="Masukan Stock"
                                  value={alamatproyek}
                                  onChange={(e) => {
                                  setAlamatProyek(e.target.value);
                                  }}
                              />
                          </Col>
                      </FormGroup>
                      <FormGroup row>
                          <Label
                          for="exampleEmail"
                          sm={4}
                          >
                          Kode Canvasing
                          </Label>
                          <Col sm={7}>
                          <Input
                              className="form-control-alternative"
                              type="text"
                              name="barcode"
                              placeholder="Masukan Barcode"
                              value={codecanvasing}
                              onChange={(e) => {
                              setCodeCanvasing(e.target.value);
                              }}
                          />
                          </Col>
                      </FormGroup>
                      <FormGroup row>
                          <Label
                          for="exampleEmail"
                          sm={4}
                          >
                          Kode Tracking
                          </Label>
                          <Col sm={7}>
                          <Input
                            className="form-control-alternative"
                              type="text"
                              
                              placeholder="Masukan Nama Item"
                              value={codetracking}
                              onChange={(e) => {
                              setCodeTracking(e.target.value);
                              }}
                          />
                          </Col>
                      </FormGroup>
                      <FormGroup row>
                          <Label
                              for="exampleEmail"
                              sm={4}
                          >
                              Phone
                          </Label>
                          <Col sm={7}>
                              <Input
                                  className="form-control-alternative"
                                  type="text"
                                  name="nomorPart"
                                  placeholder="Masukan Nomor Part"
                                  value={phone}
                                  onChange={(e) => {
                                  setPhone(e.target.value);
                                  }}
                              />
                          </Col>
                      </FormGroup>
                      </CardBody>
                </Card>
              </Col>
              <Col md="5">
                  <Card className="bg-secondary shadow">
                      <CardHeader className="bg-white border-0">
                      <h3 >Gambar</h3>
                      </CardHeader>
                      <CardBody>
                          <FormGroup row>
                              <CardGroup>
                                  &nbsp;
                                  &nbsp;
                                  &nbsp;
                                  <Row>
                                      <Col md="10">
                                          <Card>
                                              <CardImg
                                              alt="Card image cap"
                                              src={image1}
                                              top
                                              width="100%"
                                              />
                                          </Card>
                                      </Col>
                                  </Row>
                                  {/* <Row>
                                      <Col md="10">
                                      <Card>
                                          <CardImg
                                          alt="Card image cap"
                                          src={image2}
                                          top
                                          width="100%"
                                          />
                                      </Card>
                                      </Col>
                                  </Row>
                                  <Row>
                                      <Col md="10">
                                      <Card>
                                          <CardImg
                                          alt="Card image cap"
                                          src={image3}
                                          top
                                          width="100%"
                                          />
                                      </Card>
                                      </Col>
                                  </Row> */}
                              </CardGroup>
                          </FormGroup>
                      </CardBody>
                  </Card>
              </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default DetailItemStok;
