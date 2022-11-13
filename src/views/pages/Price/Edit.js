/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Label,
  FormGroup,
  Row,
  Col,
  Input,
  Container,
  CardHeader,
  CardFooter,
  Button,
  Form,
  FormFeedback,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function EditPrice(props) {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);

  const [allItem, setAllItem] = useState([]);
  const [item, setItem] = useState("");
  const [allUom, setAllUom] = useState([]);
  const [uom, setUom] = useState("");
  const [diskonSuplier, setDiskonSuplier] = useState("");
  const [hargaBeli, setHargaBeli] = useState("");
  const [allPajak, setAllPajak] = useState([]);
  const [pajak, setPajak] = useState("");
  const [hargaJual, setHargaJual] = useState("");
  const [diskonJual, setDiskonJual] = useState("");
  const [nominal1, setNominal1] = useState("");
  const [nominal2, setNominal2] = useState("");
  const [nominal3, setNominal3] = useState("");
  const [nominal4, setNominal4] = useState("");
  const [nominal5, setNominal5] = useState("");
  const [persentase1, setPerentase1] = useState("");
  const [persentase2, setPerentase2] = useState("");
  const [persentase3, setPerentase3] = useState("");
  const [persentase4, setPerentase4] = useState("");
  const [persentase5, setPerentase5] = useState("");
  const [minQuantity1, setMinQuantity1] = useState("");
  const [minQuantity2, setMinQuantity2] = useState("");
  const [minQuantity3, setMinQuantity3] = useState("");
  const [minQuantity4, setMinQuantity4] = useState("");
  const [minQuantity5, setMinQuantity5] = useState("");
  const [price1, setPrice1] = useState("");
  const [price2, setPrice2] = useState("");
  const [price3, setPrice3] = useState("");
  const [price4, setPrice4] = useState("");
  const [price5, setPrice5] = useState("");

  const validateForm = () => {
    let error = false;
    // if (province === "") {
    //   setProvinceError("invalid");
    //   error = true;
    // }
    // if (city === "") {
    //   setCityError("invalid");
    //   error = true;
    // }
    // if (address === "") {
    //   setAddressError("invalid");
    //   error = true;
    // }
    // if (phoneNumber === "") {
    //   setPhoneNumberError("invalid");
    //   error = true;
    // }
    // if (fax === "") {
    //   setFaxError("invalid");
    //   error = true;
    // }
    // if (npwp === "") {
    //   setNpwpError("invalid");
    //   error = true;
    // }
    return error;
  };

  useEffect(() => {
    getById();
  }, []);

  const getById = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/price-detail/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        getItem(data.data.response_data.item_id);
        getSatuan(data.data.response_data.uom_id);
        getPajak(data.data.response_data.pajak_id);
        setDiskonSuplier(data.data.response_data.diskon_suplier);
        setHargaBeli(data.data.response_data.harga_beli);
        setHargaJual(data.data.response_data.harga_jual);
        setDiskonJual(data.data.response_data.diskon_jual);
        setNominal1(data.data.response_data.nominal_1);
        setNominal2(data.data.response_data.nominal_2);
        setNominal3(data.data.response_data.nominal_3);
        setNominal4(data.data.response_data.nominal_4);
        setNominal5(data.data.response_data.nominal_5);
        setPerentase1(data.data.response_data.persentase_1);
        setPerentase2(data.data.response_data.persentase_2);
        setPerentase3(data.data.response_data.persentase_3);
        setPerentase4(data.data.response_data.persentase_4);
        setPerentase5(data.data.response_data.persentase_5);
        setMinQuantity1(data.data.response_data.min_qty_1);
        setMinQuantity2(data.data.response_data.min_qty_2);
        setMinQuantity3(data.data.response_data.min_qty_3);
        setMinQuantity4(data.data.response_data.min_qty_4);
        setMinQuantity5(data.data.response_data.min_qty_5);
        setPrice1(data.data.response_data.price_1);
        setPrice2(data.data.response_data.price_2);
        setPrice3(data.data.response_data.price_3);
        setPrice4(data.data.response_data.price_4);
        setPrice5(data.data.response_data.price_5);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getItem = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/items/list?warehouse_id=${warehouse}`,
        { headers }
      )
      .then((data) => {
        setAllItem(data.data.response);
        setItem(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getPajak = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/pajak/list`, { headers })
      .then((data) => {
        setAllPajak(data.data.response);
        setPajak(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getSatuan = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/uom/list`, { headers })
      .then((data) => {
        setAllUom(data.data.response);
        setUom(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function EditData() {
    setLoading(true);
    let data = {
      id: parseInt(props.match.params.id),
      username: username,
      item_id: parseInt(item),
      uom_id: parseInt(uom),
      diskon_suplier: parseInt(diskonSuplier),
      harga_beli: parseInt(hargaBeli),
      pajak_id: parseInt(pajak),
      harga_jual: parseInt(hargaJual),
      diskon_jual: parseInt(diskonJual),
      nominal_1: parseInt(nominal1),
      persentase_1: parseInt(persentase1),
      min_qty_1: parseInt(minQuantity1),
      price_1: parseInt(price1),
      nominal_2: parseInt(nominal2),
      persentase_2: parseInt(persentase2),
      min_qty_2: parseInt(minQuantity2),
      price_2: parseInt(price2),
      nominal_3: parseInt(nominal3),
      persentase_3: parseInt(persentase3),
      min_qty_3: parseInt(minQuantity3),
      price_3: parseInt(price3),
      nominal_4: parseInt(nominal4),
      persentase_4: parseInt(persentase4),
      min_qty_4: parseInt(minQuantity4),
      price_4: parseInt(price4),
      nominal_5: parseInt(nominal5),
      persentase_5: parseInt(persentase5),
      min_qty_5: parseInt(minQuantity5),
      price_5: parseInt(price5),
      active_flag: 1,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/price-detail/update/${props.match.params.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        history.push("/admin/price");
      })
      .then((json) => {
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      EditData();
    }
  };
  return (
    <>
      <SimpleHeader name="Edit Price" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <CardHeader>
                    <h3>Edit Price</h3>
                  </CardHeader>
                  <CardBody>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Item
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        disabled
                        name="item"
                        type="select"
                        value={item}
                        onChange={(e) => {
                          setItem(e.target.value);
                        }}
                      >
                        <option value="">Pilih Item</option>
                        {allItem.map((item, key) => {
                          return (
                            <option key={key} value={item.id}>
                              {item.item_name}
                            </option>
                          );
                        })}
                      </Input>
                      <FormFeedback>Item tidak boleh kosong</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Satuan
                      </Label>
                      <Input
                        disabled
                        name="satuan"
                        type="select"
                        value={uom}
                        onChange={(e) => {
                          setUom(e.target.value);
                        }}
                      >
                        <option value="">Pilih Satuan</option>
                        {allUom.map((satuan, key) => {
                          return (
                            <option key={key} value={satuan.id}>
                              {satuan.uom_code}
                            </option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Diskon Suplier
                      </Label>
                      <Input
                        type="text"
                        name="po"
                        placeholder="Masukan Diskon Suplier"
                        value={diskonSuplier}
                        onChange={(e) => {
                          setDiskonSuplier(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Harga Beli
                      </Label>
                      <Input
                        type="text"
                        name="descPo"
                        placeholder="Masukan Harga Beli"
                        value={hargaBeli}
                        onChange={(e) => {
                          setHargaBeli(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Pajak
                      </Label>
                      <Input
                        disabled
                        name="pajak"
                        type="select"
                        value={pajak}
                        onChange={(e) => {
                          setPajak(e.target.value);
                        }}
                      >
                        <option value="">Pilih Pajak</option>
                        {allPajak.map((pajak, key) => {
                          return (
                            <option key={key} value={pajak.id}>
                              {pajak.persentase}
                            </option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Harga Jual
                      </Label>
                      <Input
                        type="text"
                        name="purchasing"
                        placeholder="Masukan Harga Jual"
                        value={hargaJual}
                        onChange={(e) => {
                          setHargaJual(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Diskon Jual
                      </Label>
                      <Input
                        type="text"
                        name="diskonJual"
                        placeholder="Masukan Diskon Jual"
                        value={diskonJual}
                        onChange={(e) => {
                          setDiskonJual(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Nominal 1
                      </Label>
                      <Input
                        type="text"
                        name="nominal"
                        placeholder="Masukan Nominal 1"
                        value={nominal1}
                        onChange={(e) => {
                          setNominal1(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Persentase 1
                      </Label>
                      <Input
                        type="text"
                        name="persentase"
                        placeholder="Masukan Persentase 1"
                        value={persentase1}
                        onChange={(e) => {
                          setPerentase1(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Min Quantitas 1
                      </Label>
                      <Input
                        type="text"
                        name="quantitas"
                        placeholder="Masukan Min Quantitas 1"
                        value={minQuantity1}
                        onChange={(e) => {
                          setMinQuantity1(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Price 1
                      </Label>
                      <Input
                        type="text"
                        name="price"
                        placeholder="Masukan Price 1"
                        value={price1}
                        onChange={(e) => {
                          setPrice1(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Nominal 2
                      </Label>
                      <Input
                        type="text"
                        name="nominal"
                        placeholder="Masukan Nominal 2"
                        value={nominal2}
                        onChange={(e) => {
                          setNominal2(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Persentase 2
                      </Label>
                      <Input
                        type="text"
                        name="persentase"
                        placeholder="Masukan Persentase 2"
                        value={persentase2}
                        onChange={(e) => {
                          setPerentase2(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Min Quantitas 2
                      </Label>
                      <Input
                        type="text"
                        name="quantitas"
                        placeholder="Masukan Min Quantitas 2"
                        value={minQuantity2}
                        onChange={(e) => {
                          setMinQuantity2(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Price 2
                      </Label>
                      <Input
                        type="text"
                        name="price"
                        placeholder="Masukan Price 2"
                        value={price2}
                        onChange={(e) => {
                          setPrice2(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Nominal 3
                      </Label>
                      <Input
                        type="text"
                        name="nominal"
                        placeholder="Masukan Nominal 3"
                        value={nominal3}
                        onChange={(e) => {
                          setNominal3(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Persentase 3
                      </Label>
                      <Input
                        type="text"
                        name="persentase"
                        placeholder="Masukan Persentase 3"
                        value={persentase3}
                        onChange={(e) => {
                          setPerentase3(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Min Quantitas 3
                      </Label>
                      <Input
                        type="text"
                        name="quantitas"
                        placeholder="Masukan Min Quantitas 3"
                        value={minQuantity3}
                        onChange={(e) => {
                          setMinQuantity3(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Price 3
                      </Label>
                      <Input
                        type="text"
                        name="price"
                        placeholder="Masukan Price 3"
                        value={price3}
                        onChange={(e) => {
                          setPrice3(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Nominal 4
                      </Label>
                      <Input
                        type="text"
                        name="nominal"
                        placeholder="Masukan Nominal 4"
                        value={nominal4}
                        onChange={(e) => {
                          setNominal4(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Persentase 4
                      </Label>
                      <Input
                        type="text"
                        name="persentase"
                        placeholder="Masukan Persentase 4"
                        value={persentase4}
                        onChange={(e) => {
                          setPerentase4(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Min Quantitas 4
                      </Label>
                      <Input
                        type="text"
                        name="quantitas"
                        placeholder="Masukan Min Quantitas 4"
                        value={minQuantity4}
                        onChange={(e) => {
                          setMinQuantity4(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Price 4
                      </Label>
                      <Input
                        type="text"
                        name="price"
                        placeholder="Masukan Price 4"
                        value={price4}
                        onChange={(e) => {
                          setPrice4(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Nominal 5
                      </Label>
                      <Input
                        type="text"
                        name="nominal"
                        placeholder="Masukan Nominal 5"
                        value={nominal5}
                        onChange={(e) => {
                          setNominal5(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Persentase 5
                      </Label>
                      <Input
                        type="text"
                        name="persentase"
                        placeholder="Masukan Persentase 5"
                        value={persentase5}
                        onChange={(e) => {
                          setPerentase5(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Min Quantitas 5
                      </Label>
                      <Input
                        type="text"
                        name="quantitas"
                        placeholder="Masukan Min Quantitas 5"
                        value={minQuantity5}
                        onChange={(e) => {
                          setMinQuantity5(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Price 5
                      </Label>
                      <Input
                        type="text"
                        name="price"
                        placeholder="Masukan Price 5"
                        value={price5}
                        onChange={(e) => {
                          setPrice5(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </CardBody>
                  <CardFooter>
                    {!isLoading && (
                      <Button color="primary" type="submit">
                        Simpan
                      </Button>
                    )}
                    {isLoading && (
                      <Button color="primary" disabled>
                        <i className="fas fa-spinner fa-spin"></i>
                        {""}
                        loading...
                      </Button>
                    )}
                    <Link className="btn btn-info" to="/admin/price">
                      Kembali
                    </Link>
                  </CardFooter>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}
