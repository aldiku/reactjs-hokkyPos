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

export default function EditSo(props) {
  const token = localStorage.token;
  const warehouse = localStorage.warehouse;
  const role = localStorage.authority;
  const namaDepartment = localStorage.department;
  const username = localStorage.username;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);

  const [usernameSo, setUsernameSo] = useState("");
  const [usernamePoError, setUsernamePoError] = useState(null);
  const [usernamePurchasing, setUsernamePurchasing] = useState("");
  const [usernamePurchasingError, setUsernamePurchasingError] = useState(null);
  const [usernammeGudang, setUsernameGudang] = useState("");
  const [usernammeGudangError, setUsernameGudangError] = useState(null);
  const [usernameValidator, setUsernameValidator] = useState("");
  const [usernameValidatorError, setUsernameValidatorError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentMethodError, setPaymentMethodError] = useState(null);
  const [descriptionPayment, setDescriptionPayment] = useState("");
  const [descriptionValidator, setDescriptionValidator] = useState("");
  const [descriptionPurchasing, setDescriptionPurchasing] = useState("");
  const [descriptionGudang, setDescriptionGudang] = useState("");
  const [descriptionSo, setDescriptionSo] = useState("");
  const [isCicil, setIsCicil] = useState("");
  const [statusBarang, setStatusBarang] = useState(0);
  const [clear, setClear] = useState(0);
  const [approve, setApprove] = useState(0);
  const [soType, setSoType] = useState("");
  const [poId, setPoId] = useState("");
  const [code, setCode] = useState("");
  const [usernameAdmin, setUsernameAdmin] = useState(username);
  const [descriptionAdmin, setDescriptionAdmin] = useState("");
  const [approvalAdmin, setApprovalAdmin] = useState(0);

  const [items, setItems] = useState([]);
  const [persons, setPersons] = useState([]);
  const [allSatuan, setAllSatuan] = useState([]);

  const [inputList, setInputList] = useState([
    {
      item_id: "",
      qty: "",
      satuan: "",
      person: "",
      harga: "",
      qty_fisik: "",
      keterangan_fisik: "",
    },
  ]);

  const validateForm = () => {
    let error = false;
    // if (province === "") {
    //   setProvinceError("invalid");
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
        `${process.env.REACT_APP_API_BASE_URL}/sales-order/get/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        geSo(data.data.response_data.id);
        setUsernameSo(data.data.response_data.username_so);
        setDescriptionSo(data.data.response_data.keterangan_so);
        setUsernamePurchasing(data.data.response_data.username_purchasing);
        setDescriptionPurchasing(data.data.response_data.keterangan_purchasing);
        setUsernameGudang(data.data.response_data.username_gudang);
        setDescriptionGudang(data.data.response_data.keterangan_gudang);
        setUsernameValidator(data.data.response_data.username_validator);
        setDescriptionValidator(data.data.response_data.keterangan_validator);
        setDescriptionPayment(data.data.response_data.keterangan_payment);
        setPaymentMethod(data.data.response_data.payment_method);
        setIsCicil(data.data.response_data.is_cicil);
        setSoType(data.data.response_data.so_type);
        setClear(data.data.response_data.clear);
        setApprove(data.data.response_data.approve);
        setStatusBarang(data.data.response_data.status_barang);
        setCode(data.data.response_data.order_code);
        setDescriptionAdmin(data.data.response_data.keterangan_admin);
        setApprovalAdmin(data.data.response_data.admin_approval);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const geSo = (poId) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const data = {
      so_id: parseInt(poId),
    };
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/sales-order/so-items`,
        data,
        {
          headers,
        }
      )
      .then((data) => {
        getItem();
        getPerson();
        getSatuan();
        let harga = [];
        let item = [];
        let qty = [];
        let satuan = [];
        let person = [];
        let qty_fisik = [];
        let keterangan_fisik = [];
        data.data.response_data.map((x, i) => {
          harga.push(x.harga);
          item.push(x.item_id);
          qty.push(x.qty);
          satuan.push(x.satuan);
          person.push(x.person);
          qty_fisik.push(x.qty_fisik);
          keterangan_fisik.push(x.keterangan_fisik);
          setInputList([
            {
              // harga: harga,
              // item_id: item,
              // qty: qty,
              // satuan: satuan,
              // person: person,
              // qty_fisik: qty_fisik,
              // keterangan_fisik: keterangan_fisik,
              harga: x.harga,
              item_id: x.item_id,
              qty: x.qty,
              satuan: x.satuan,
              person: x.person,
              qty_fisik: x.qty_fisik,
              keterangan_fisik: x.keterangan_fisik,
            },
          ]);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getItem = () => {
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
        setItems(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getPerson = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/person/list`, { headers })
      .then((data) => {
        setPersons(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getSatuan = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/uom/list`, { headers })
      .then((data) => {
        setAllSatuan(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = name === "keterangan_fisik" ? value : parseInt(value);
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        item_id: "",
        qty: "",
        satuan: "",
        person: "",
        harga: "",
        qty_fisik: "",
        keterangan_fisik: "",
      },
    ]);
  };

  function EditData() {
    setLoading(true);
    let data = {
      warehouse_id: parseInt(warehouse),
      username_so: usernameSo,
      payment_method: paymentMethod,
      keterangan_payment: descriptionPayment,
      is_cicil: parseInt(isCicil),
      username_purchasing: usernamePurchasing,
      approve: parseInt(approve),
      keterangan_purchasing: descriptionPurchasing,
      username_gudang: usernammeGudang,
      status_barang: parseInt(statusBarang),
      keterangan_gudang: descriptionGudang,
      username_kurir: "",
      username_validator: usernameValidator,
      clear: parseInt(clear),
      keterangan_validator: descriptionValidator,
      active_flag: 1,
      so_type: 1,
      keterangan_so: descriptionSo,
      items: inputList,
      username_admin: usernameAdmin,
      admin_approval: parseInt(approvalAdmin),
      keterangan_admin: descriptionAdmin,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/sales-order/update/${props.match.params.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        history.push("/admin/sales-order");
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
      <SimpleHeader name="Edit Sales Order" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            {role === "ROLE_ADMIN" && namaDepartment === "Sales" ? (
              <Card>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <CardHeader>
                      <h3>Edit Sales Order</h3>
                    </CardHeader>
                    <CardBody>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Order Code
                        </Label>
                        <Input
                          disabled
                          type="text"
                          name="po"
                          placeholder="Masukan Kode"
                          value={code}
                          onChange={(e) => {
                            setCode(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Keterangan SO
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          disabled
                          type="text"
                          name="descPo"
                          placeholder="Masukan Keterangan PO"
                          value={descriptionSo}
                          onChange={(e) => {
                            setDescriptionSo(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Keterangan Admin
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          type="text"
                          name="descPo"
                          placeholder="Masukan Keterangan Admin"
                          value={descriptionAdmin}
                          onChange={(e) => {
                            setDescriptionAdmin(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlSelect3"
                        >
                          Approval Admin
                        </Label>
                        <Row>
                          <Col>
                            <div style={{ display: "flex" }}>
                              <div className="custom-control custom-radio mb-3">
                                <Input
                                  className="custom-control-input"
                                  id="customRadio13"
                                  name="custom-radio-2"
                                  type="radio"
                                  value={1}
                                  checked={approvalAdmin === 1}
                                  onClick={() => setApprovalAdmin(1)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio13"
                                >
                                  Disetujui
                                </Label>
                              </div>
                              <div
                                className="custom-control custom-radio mb-3"
                                style={{ marginLeft: "20px" }}
                              >
                                <Input
                                  className="custom-control-input"
                                  id="customRadio14"
                                  name="custom-radio-2"
                                  type="radio"
                                  value={2}
                                  checked={approvalAdmin === 2}
                                  onClick={() => setApprovalAdmin(2)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio14"
                                >
                                  Ditolak
                                </Label>
                              </div>
                              <div
                                className="custom-control custom-radio mb-3"
                                style={{ marginLeft: "20px" }}
                              >
                                <Input
                                  className="custom-control-input"
                                  id="customRadio15"
                                  name="custom-radio-2"
                                  type="radio"
                                  value={3}
                                  checked={approvalAdmin === 3}
                                  onClick={() => setApprovalAdmin(3)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio15"
                                >
                                  Dibatalkan
                                </Label>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlSelect3"
                        >
                          Payment Method
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          disabled
                          name="paymentMethod"
                          type="select"
                          value={paymentMethod}
                          invalid={paymentMethodError === "invalid"}
                          onChange={(e) => {
                            setPaymentMethod(e.target.value);
                            if (e.target.value !== "") {
                              setPaymentMethodError("");
                            }
                          }}
                        >
                          <option value="">Pilih Payment Method</option>
                          <option value={1}>Tunia</option>
                          <option value={2}>Tempo/Termin/Utang</option>
                        </Input>
                        <FormFeedback>
                          Payment Method tidak boleh kosong
                        </FormFeedback>
                      </FormGroup>

                      {inputList.map((x, i) => {
                        return (
                          <div className="box">
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
                                name="item_id"
                                type="select"
                                value={parseInt(x.item_id)}
                                onChange={(e) => handleInputChange(e, i)}
                              >
                                <option value="">Pilih Item</option>
                                {items.map((item, key) => {
                                  return (
                                    <option key={key} value={item.id}>
                                      {item.item_name}
                                    </option>
                                  );
                                })}
                              </Input>
                              <FormFeedback>
                                Item tidak boleh kosong
                              </FormFeedback>
                            </FormGroup>
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1"
                              >
                                Quality
                              </Label>
                              <Input
                                disabled
                                type="text"
                                name="qty"
                                placeholder="Masukan Quality"
                                value={x.qty}
                                onChange={(e) => handleInputChange(e, i)}
                              />
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
                                value={x.satuan}
                                onChange={(e) => handleInputChange(e, i)}
                              >
                                <option value="">Pilih Satuan</option>
                                {allSatuan.map((satuan, key) => {
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
                                htmlFor="exampleFormControlSelect3"
                              >
                                Person
                              </Label>
                              <Input
                                disabled
                                name="person"
                                type="select"
                                value={x.person}
                                onChange={(e) => handleInputChange(e, i)}
                              >
                                <option value="">Pilih Person</option>
                                {persons.map((person, key) => {
                                  return (
                                    <option key={key} value={person.id}>
                                      {person.person_name}
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
                                Harga
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                disabled
                                type="text"
                                name="harga"
                                placeholder="Masukan Harga"
                                value={x.harga}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1"
                              >
                                Quality Fisik
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                disabled
                                type="text"
                                name="qty_fisik"
                                placeholder="Masukan Quality Fidik"
                                value={x.qty_fisik}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1"
                              >
                                Keterangan Fisik
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                disabled
                                type="text"
                                name="keterangan_fisik"
                                placeholder="Masukan Keterangna Fisik"
                                value={x.keterangan_fisik}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                            </FormGroup>
                            <div className="btn-box">
                              {inputList.length !== 1 && (
                                <Button
                                  color="default"
                                  onClick={() => handleRemoveClick(i)}
                                >
                                  Remove
                                </Button>
                              )}
                              {inputList.length - 1 === i && (
                                <Button
                                  color="default"
                                  onClick={handleAddClick}
                                >
                                  Add
                                </Button>
                              )}
                            </div>
                          </div>
                        );
                      })}
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
                      <Link className="btn btn-info" to="/admin/sales-order">
                        Kembali
                      </Link>
                    </CardFooter>
                  </Form>
                </CardBody>
              </Card>
            ) : role === "ROLE_ADMIN" &&
              namaDepartment === "Board Of Director" ? (
              <Card>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <CardHeader>
                      <h3>Edit Sales Order</h3>
                    </CardHeader>
                    <CardBody>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Order Code
                        </Label>
                        <Input
                          disabled
                          type="text"
                          name="po"
                          placeholder="Masukan Kode"
                          value={code}
                          onChange={(e) => {
                            setCode(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Keterangan SO
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          disabled
                          type="text"
                          name="descPo"
                          placeholder="Masukan Keterangan SO"
                          value={descriptionSo}
                          onChange={(e) => {
                            setDescriptionSo(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Keterangan Validator
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          type="text"
                          name="descValidator"
                          placeholder="Masukan Keterangan Validator"
                          value={descriptionValidator}
                          onChange={(e) => {
                            setDescriptionValidator(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlSelect3"
                        >
                          Clear
                        </Label>
                        <Row>
                          <Col>
                            <div style={{ display: "flex" }}>
                              <div className="custom-control custom-radio mb-3">
                                <Input
                                  className="custom-control-input"
                                  id="customRadio5"
                                  name="custom-radio-2"
                                  type="radio"
                                  value={1}
                                  checked={clear === 1}
                                  onClick={() => setClear(1)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio5"
                                >
                                  Disetujui
                                </Label>
                              </div>
                              <div
                                className="custom-control custom-radio mb-3"
                                style={{ marginLeft: "20px" }}
                              >
                                <Input
                                  className="custom-control-input"
                                  id="customRadio6"
                                  name="custom-radio-2"
                                  type="radio"
                                  value={2}
                                  checked={clear === 2}
                                  onClick={() => setClear(2)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio6"
                                >
                                  Ditolak
                                </Label>
                              </div>
                              <div
                                className="custom-control custom-radio mb-3"
                                style={{ marginLeft: "20px" }}
                              >
                                <Input
                                  className="custom-control-input"
                                  id="customRadio7"
                                  name="custom-radio-2"
                                  type="radio"
                                  value={3}
                                  checked={clear === 3}
                                  onClick={() => setClear(3)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio7"
                                >
                                  Dibatalkan
                                </Label>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlSelect3"
                        >
                          Payment Method
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          disabled
                          name="paymentMethod"
                          type="select"
                          value={paymentMethod}
                          invalid={paymentMethodError === "invalid"}
                          onChange={(e) => {
                            setPaymentMethod(e.target.value);
                            if (e.target.value !== "") {
                              setPaymentMethodError("");
                            }
                          }}
                        >
                          <option value="">Pilih Payment Method</option>
                          <option value={1}>Tunia</option>
                          <option value={2}>Tempo/Termin/Utang</option>
                        </Input>
                        <FormFeedback>
                          Payment Method tidak boleh kosong
                        </FormFeedback>
                      </FormGroup>

                      {inputList.map((x, i) => {
                        return (
                          <div className="box">
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
                                name="item_id"
                                type="select"
                                value={parseInt(x.item_id)}
                                onChange={(e) => handleInputChange(e, i)}
                              >
                                <option value="">Pilih Item</option>
                                {items.map((item, key) => {
                                  return (
                                    <option key={key} value={item.id}>
                                      {item.item_name}
                                    </option>
                                  );
                                })}
                              </Input>
                              <FormFeedback>
                                Item tidak boleh kosong
                              </FormFeedback>
                            </FormGroup>
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1"
                              >
                                Quality
                              </Label>
                              <Input
                                disabled
                                type="text"
                                name="qty"
                                placeholder="Masukan Quality"
                                value={x.qty}
                                onChange={(e) => handleInputChange(e, i)}
                              />
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
                                value={x.satuan}
                                onChange={(e) => handleInputChange(e, i)}
                              >
                                <option value="">Pilih Satuan</option>
                                {allSatuan.map((satuan, key) => {
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
                                htmlFor="exampleFormControlSelect3"
                              >
                                Person
                              </Label>
                              <Input
                                disabled
                                name="person"
                                type="select"
                                value={x.person}
                                onChange={(e) => handleInputChange(e, i)}
                              >
                                <option value="">Pilih Person</option>
                                {persons.map((person, key) => {
                                  return (
                                    <option key={key} value={person.id}>
                                      {person.person_name}
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
                                Harga
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                disabled
                                type="text"
                                name="harga"
                                placeholder="Masukan Harga"
                                value={x.harga}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1"
                              >
                                Quality Fisik
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                disabled
                                type="text"
                                name="qty_fisik"
                                placeholder="Masukan Quality Fidik"
                                value={x.qty_fisik}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1"
                              >
                                Keterangan Fisik
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                disabled
                                type="text"
                                name="keterangan_fisik"
                                placeholder="Masukan Keterangna Fisik"
                                value={x.keterangan_fisik}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                            </FormGroup>
                            <div className="btn-box">
                              {inputList.length !== 1 && (
                                <Button
                                  color="default"
                                  onClick={() => handleRemoveClick(i)}
                                >
                                  Remove
                                </Button>
                              )}
                              {inputList.length - 1 === i && (
                                <Button
                                  color="default"
                                  onClick={handleAddClick}
                                >
                                  Add
                                </Button>
                              )}
                            </div>
                          </div>
                        );
                      })}
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
                      <Link className="btn btn-info" to="/admin/sales-order">
                        Kembali
                      </Link>
                    </CardFooter>
                  </Form>
                </CardBody>
              </Card>
            ) : role === "ROLE_ADMIN" && namaDepartment === "Gudang" ? (
              <Card>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <CardHeader>
                      <h3>Edit Sales Order</h3>
                    </CardHeader>
                    <CardBody>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Order Code
                        </Label>
                        <Input
                          disabled
                          type="text"
                          name="po"
                          placeholder="Masukan Kode"
                          value={code}
                          onChange={(e) => {
                            setCode(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Keterangan SO
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          disabled
                          type="text"
                          name="descPo"
                          placeholder="Masukan Keterangan SO"
                          value={descriptionSo}
                          onChange={(e) => {
                            setDescriptionSo(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Keterangan Gudang
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          type="text"
                          name="descGudang"
                          placeholder="Masukan Keterangan Gudang"
                          value={descriptionGudang}
                          onChange={(e) => {
                            setDescriptionGudang(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlSelect3"
                        >
                          Status Barang
                        </Label>
                        <Row>
                          <Col>
                            <div style={{ display: "flex" }}>
                              <div className="custom-control custom-radio mb-3">
                                <Input
                                  className="custom-control-input"
                                  id="customRadio11"
                                  name="custom-radio-4"
                                  type="radio"
                                  value={1}
                                  checked={statusBarang === 1}
                                  onClick={() => setStatusBarang(1)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio11"
                                >
                                  Diterima
                                </Label>
                              </div>
                              <div
                                className="custom-control custom-radio mb-3"
                                style={{ marginLeft: "20px" }}
                              >
                                <Input
                                  className="custom-control-input"
                                  id="customRadio12"
                                  name="custom-radio-4"
                                  type="radio"
                                  value={2}
                                  checked={statusBarang === 2}
                                  onClick={() => setStatusBarang(2)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio12"
                                >
                                  Ditolak
                                </Label>
                              </div>
                              <div
                                className="custom-control custom-radio mb-3"
                                style={{ marginLeft: "20px" }}
                              >
                                <Input
                                  className="custom-control-input"
                                  id="customRadio13"
                                  name="custom-radio-4"
                                  type="radio"
                                  value={3}
                                  checked={statusBarang === 3}
                                  onClick={() => setStatusBarang(3)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio13"
                                >
                                  Dibatalkan
                                </Label>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlSelect3"
                        >
                          Payment Method
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          disabled
                          name="paymentMethod"
                          type="select"
                          value={paymentMethod}
                          invalid={paymentMethodError === "invalid"}
                          onChange={(e) => {
                            setPaymentMethod(e.target.value);
                            if (e.target.value !== "") {
                              setPaymentMethodError("");
                            }
                          }}
                        >
                          <option value="">Pilih Payment Method</option>
                          <option value={1}>Tunia</option>
                          <option value={2}>Tempo/Termin/Utang</option>
                        </Input>
                        <FormFeedback>
                          Payment Method tidak boleh kosong
                        </FormFeedback>
                      </FormGroup>

                      {inputList.map((x, i) => {
                        return (
                          <div className="box">
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
                                name="item_id"
                                type="select"
                                value={parseInt(x.item_id)}
                                onChange={(e) => handleInputChange(e, i)}
                              >
                                <option value="">Pilih Item</option>
                                {items.map((item, key) => {
                                  return (
                                    <option key={key} value={item.id}>
                                      {item.item_name}
                                    </option>
                                  );
                                })}
                              </Input>
                              <FormFeedback>
                                Item tidak boleh kosong
                              </FormFeedback>
                            </FormGroup>
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1"
                              >
                                Quality
                              </Label>
                              <Input
                                disabled
                                type="text"
                                name="qty"
                                placeholder="Masukan Quality"
                                value={x.qty}
                                onChange={(e) => handleInputChange(e, i)}
                              />
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
                                value={x.satuan}
                                onChange={(e) => handleInputChange(e, i)}
                              >
                                <option value="">Pilih Satuan</option>
                                {allSatuan.map((satuan, key) => {
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
                                htmlFor="exampleFormControlSelect3"
                              >
                                Person
                              </Label>
                              <Input
                                disabled
                                name="person"
                                type="select"
                                value={x.person}
                                onChange={(e) => handleInputChange(e, i)}
                              >
                                <option value="">Pilih Person</option>
                                {persons.map((person, key) => {
                                  return (
                                    <option key={key} value={person.id}>
                                      {person.person_name}
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
                                Harga
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                disabled
                                type="text"
                                name="harga"
                                placeholder="Masukan Harga"
                                value={x.harga}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1"
                              >
                                Quality Fisik
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                type="text"
                                name="qty_fisik"
                                placeholder="Masukan Quality Fidik"
                                value={x.qty_fisik}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1"
                              >
                                Keterangan Fisik
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                type="text"
                                name="keterangan_fisik"
                                placeholder="Masukan Keterangna Fisik"
                                value={x.keterangan_fisik}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                            </FormGroup>
                            <div className="btn-box">
                              {inputList.length !== 1 && (
                                <Button
                                  color="default"
                                  onClick={() => handleRemoveClick(i)}
                                >
                                  Remove
                                </Button>
                              )}
                              {inputList.length - 1 === i && (
                                <Button
                                  color="default"
                                  onClick={handleAddClick}
                                >
                                  Add
                                </Button>
                              )}
                            </div>
                          </div>
                        );
                      })}
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
                      <Link className="btn btn-info" to="/admin/sales-order">
                        Kembali
                      </Link>
                    </CardFooter>
                  </Form>
                </CardBody>
              </Card>
            ) : (
              <Card>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <CardHeader>
                      <h3>Edit Sales Order</h3>
                    </CardHeader>
                    <CardBody>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Username SO
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          type="text"
                          name="SO"
                          placeholder="Masukan Username SO"
                          value={usernameSo}
                          onChange={(e) => {
                            setUsernameSo(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Keterangan SO
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          type="text"
                          name="descPo"
                          placeholder="Masukan Keterangan SO"
                          value={descriptionSo}
                          onChange={(e) => {
                            setDescriptionSo(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Username Purchasing
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          type="text"
                          name="purchasing"
                          placeholder="Masukan Username Purchasing"
                          value={usernamePurchasing}
                          invalid={usernamePurchasingError === "invalid"}
                          onChange={(e) => {
                            setUsernamePurchasing(e.target.value);
                            if (e.target.value !== "") {
                              setUsernamePurchasingError("");
                            }
                          }}
                        />
                        <FormFeedback>
                          Username Purchasing tidak boleh kosong
                        </FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Keterangan Purchasing
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          type="text"
                          name="descPurchasing"
                          placeholder="Masukan Keterangan Purchasing"
                          value={descriptionPurchasing}
                          onChange={(e) => {
                            setDescriptionPurchasing(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Username Gudang
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          type="text"
                          name="usernameGudang"
                          placeholder="Masukan Username Gudang"
                          value={usernammeGudang}
                          invalid={usernammeGudangError === "invalid"}
                          onChange={(e) => {
                            setUsernameGudang(e.target.value);
                            if (e.target.value !== "") {
                              setUsernameGudangError("");
                            }
                          }}
                        />
                        <FormFeedback>
                          Username Gudang tidak boleh kosong
                        </FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Keterangan Gudang
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          type="text"
                          name="descGudang"
                          placeholder="Masukan Keterangan Gudang"
                          value={descriptionGudang}
                          onChange={(e) => {
                            setDescriptionGudang(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Username Validator
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          type="text"
                          name="usernameValidation"
                          placeholder="Masukan Username Validator"
                          value={usernameValidator}
                          invalid={usernameValidatorError === "invalid"}
                          onChange={(e) => {
                            setUsernameValidator(e.target.value);
                            if (e.target.value !== "") {
                              setUsernameValidatorError("");
                            }
                          }}
                        />
                        <FormFeedback>
                          Username Validator tidak boleh kosong
                        </FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Keterangan Validator
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          type="text"
                          name="descValidator"
                          placeholder="Masukan Keterangan Validator"
                          value={descriptionValidator}
                          onChange={(e) => {
                            setDescriptionValidator(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Keterangan Payment
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          type="text"
                          name="descPayment"
                          placeholder="Masukan Keterangan Payment"
                          value={descriptionPayment}
                          onChange={(e) => {
                            setDescriptionPayment(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlSelect3"
                        >
                          Payment Method
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          name="paymentMethod"
                          type="select"
                          value={paymentMethod}
                          invalid={paymentMethodError === "invalid"}
                          onChange={(e) => {
                            setPaymentMethod(e.target.value);
                            if (e.target.value !== "") {
                              setPaymentMethodError("");
                            }
                          }}
                        >
                          <option value="">Pilih Payment Method</option>
                          <option value={1}>Tunia</option>
                          <option value={2}>Tempo/Termin/Utang</option>
                        </Input>
                        <FormFeedback>
                          Payment Method tidak boleh kosong
                        </FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlSelect3"
                        >
                          Is Cicil
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          name="isCicil"
                          type="select"
                          value={isCicil}
                          onChange={(e) => {
                            setIsCicil(e.target.value);
                          }}
                        >
                          <option value={0}>Pilih Cicilan</option>
                          <option value={1}>Cicilan (Lunas)</option>
                          <option value={2}>Cicilan (Belum Lunas)</option>
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlSelect3"
                        >
                          SO Type
                        </Label>
                        <Input
                          name="paymentMethod"
                          type="select"
                          value={soType}
                          onChange={(e) => {
                            setSoType(e.target.value);
                          }}
                        >
                          <option value="">Pilih Payment Method</option>
                          <option value={1}>Konvensional</option>
                          <option value={2}>Indent</option>
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlSelect3"
                        >
                          Clear
                        </Label>
                        <Row>
                          <Col>
                            <div style={{ display: "flex" }}>
                              <div className="custom-control custom-radio mb-3">
                                <Input
                                  className="custom-control-input"
                                  id="customRadio5"
                                  name="custom-radio-2"
                                  type="radio"
                                  value={1}
                                  checked={clear === 1}
                                  onClick={() => setClear(1)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio5"
                                >
                                  Disetujui
                                </Label>
                              </div>
                              <div
                                className="custom-control custom-radio mb-3"
                                style={{ marginLeft: "20px" }}
                              >
                                <Input
                                  className="custom-control-input"
                                  id="customRadio6"
                                  name="custom-radio-2"
                                  type="radio"
                                  value={2}
                                  checked={clear === 2}
                                  onClick={() => setClear(2)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio6"
                                >
                                  Ditolak
                                </Label>
                              </div>
                              <div
                                className="custom-control custom-radio mb-3"
                                style={{ marginLeft: "20px" }}
                              >
                                <Input
                                  className="custom-control-input"
                                  id="customRadio7"
                                  name="custom-radio-2"
                                  type="radio"
                                  value={3}
                                  checked={clear === 3}
                                  onClick={() => setClear(3)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio7"
                                >
                                  Dibatalkan
                                </Label>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlSelect3"
                        >
                          Approve
                        </Label>
                        <Row>
                          <Col>
                            <div style={{ display: "flex" }}>
                              <div className="custom-control custom-radio mb-3">
                                <Input
                                  className="custom-control-input"
                                  id="customRadio8"
                                  name="custom-radio-3"
                                  type="radio"
                                  value={1}
                                  checked={approve === 1}
                                  onClick={() => setApprove(1)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio8"
                                >
                                  Disetujui
                                </Label>
                              </div>
                              <div
                                className="custom-control custom-radio mb-3"
                                style={{ marginLeft: "20px" }}
                              >
                                <Input
                                  className="custom-control-input"
                                  id="customRadio9"
                                  name="custom-radio-3"
                                  type="radio"
                                  value={2}
                                  checked={approve === 2}
                                  onClick={() => setApprove(2)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio9"
                                >
                                  Ditolak
                                </Label>
                              </div>
                              <div
                                className="custom-control custom-radio mb-3"
                                style={{ marginLeft: "20px" }}
                              >
                                <Input
                                  className="custom-control-input"
                                  id="customRadio10"
                                  name="custom-radio-3"
                                  type="radio"
                                  value={3}
                                  checked={approve === 3}
                                  onClick={() => setApprove(3)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio10"
                                >
                                  Dibatalkan
                                </Label>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlSelect3"
                        >
                          Status Barang
                        </Label>
                        <Row>
                          <Col>
                            <div style={{ display: "flex" }}>
                              <div className="custom-control custom-radio mb-3">
                                <Input
                                  className="custom-control-input"
                                  id="customRadio11"
                                  name="custom-radio-4"
                                  type="radio"
                                  value={1}
                                  checked={statusBarang === 1}
                                  onClick={() => setStatusBarang(1)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio11"
                                >
                                  Diterima
                                </Label>
                              </div>
                              <div
                                className="custom-control custom-radio mb-3"
                                style={{ marginLeft: "20px" }}
                              >
                                <Input
                                  className="custom-control-input"
                                  id="customRadio12"
                                  name="custom-radio-4"
                                  type="radio"
                                  value={2}
                                  checked={statusBarang === 2}
                                  onClick={() => setStatusBarang(2)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio12"
                                >
                                  Ditolak
                                </Label>
                              </div>
                              <div
                                className="custom-control custom-radio mb-3"
                                style={{ marginLeft: "20px" }}
                              >
                                <Input
                                  className="custom-control-input"
                                  id="customRadio13"
                                  name="custom-radio-4"
                                  type="radio"
                                  value={3}
                                  checked={statusBarang === 3}
                                  onClick={() => setStatusBarang(3)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio13"
                                >
                                  Dibatalkan
                                </Label>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                      {inputList.map((x, i) => {
                        return (
                          <div className="box">
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlSelect3"
                              >
                                Item
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                name="item_id"
                                type="select"
                                value={parseInt(x.item_id)}
                                onChange={(e) => handleInputChange(e, i)}
                              >
                                <option value="">Pilih Item</option>
                                {items.map((item, key) => {
                                  return (
                                    <option key={key} value={item.id}>
                                      {item.item_name}
                                    </option>
                                  );
                                })}
                              </Input>
                              <FormFeedback>
                                Item tidak boleh kosong
                              </FormFeedback>
                            </FormGroup>
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1"
                              >
                                Quality
                              </Label>
                              <Input
                                type="text"
                                name="qty"
                                placeholder="Masukan Quality"
                                value={x.qty}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlSelect3"
                              >
                                Satuan
                              </Label>
                              <Input
                                name="satuan"
                                type="select"
                                value={x.satuan}
                                onChange={(e) => handleInputChange(e, i)}
                              >
                                <option value="">Pilih Satuan</option>
                                {allSatuan.map((satuan, key) => {
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
                                htmlFor="exampleFormControlSelect3"
                              >
                                Person
                              </Label>
                              <Input
                                name="person"
                                type="select"
                                value={x.person}
                                onChange={(e) => handleInputChange(e, i)}
                              >
                                <option value="">Pilih Person</option>
                                {persons.map((person, key) => {
                                  return (
                                    <option key={key} value={person.id}>
                                      {person.person_name}
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
                                Harga
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                type="text"
                                name="harga"
                                placeholder="Masukan Harga"
                                value={x.harga}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1"
                              >
                                Quality Fisik
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                type="text"
                                name="qty_fisik"
                                placeholder="Masukan Quality Fidik"
                                value={x.qty_fisik}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1"
                              >
                                Keterangan Fisik
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                type="text"
                                name="keterangan_fisik"
                                placeholder="Masukan Keterangna Fisik"
                                value={x.keterangan_fisik}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                            </FormGroup>
                            <div className="btn-box">
                              {inputList.length !== 1 && (
                                <Button
                                  color="default"
                                  onClick={() => handleRemoveClick(i)}
                                >
                                  Remove
                                </Button>
                              )}
                              {inputList.length - 1 === i && (
                                <Button
                                  color="default"
                                  onClick={handleAddClick}
                                >
                                  Add
                                </Button>
                              )}
                            </div>
                          </div>
                        );
                      })}
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
                      <Link className="btn btn-info" to="/admin/sales-order">
                        Kembali
                      </Link>
                    </CardFooter>
                  </Form>
                </CardBody>
              </Card>
            )}
          </div>
        </Row>
      </Container>
    </>
  );
}
