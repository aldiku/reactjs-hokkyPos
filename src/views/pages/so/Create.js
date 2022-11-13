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

export default function CreateSalesOrder() {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  const role = localStorage.authority;
  const namaDepartment = localStorage.department;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);

  const [usernameSo, setUsernameSo] = useState(username);
  const [usernameKurir, setUsernameKurir] = useState(username);
  const [usernammeGudang, setUsernameGudang] = useState(username);
  const [usernammeGudangError, setUsernameGudangError] = useState(null);
  const [usernameValidator, setUsernameValidator] = useState(username);
  const [usernameValidatorError, setUsernameValidatorError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentMethodError, setPaymentMethodError] = useState(null);
  const [descriptionPayment, setDescriptionPayment] = useState("");
  const [descriptionValidator, setDescriptionValidator] = useState("");
  const [descriptionSo, setDescriptionSo] = useState("");
  const [descriptionGudang, setDescriptionGudang] = useState("");
  const [isCicil, setIsCicil] = useState("");
  const [statusBarang, setStatusBarang] = useState(0);
  const [clear, setClear] = useState(0);
  const [approve, setApprove] = useState(0);
  const [poType, setPoType] = useState("");
  const [customer, setCustomer] = useState("");
  const [allMember, setAllMember] = useState([]);
  const [member, setMember] = useState("");
  const [typeItemId, setTypeItemId] = useState(1);
  const [allJangkaWaktu, setAllJangkaWaktu] = useState([]);
  const [jangkaWaktu, setJangkuWaktu] = useState("");
  const [person, setPerson] = useState("");
  const [usernameAdmin, setUsernameAdmin] = useState(username);
  const [descriptionAdmin, setDescriptionAdmin] = useState("");

  const [items, setItems] = useState([]);
  const [persons, setPersons] = useState([]);
  const [allSatuan, setAllSatuan] = useState([]);

  const [inputList, setInputList] = useState([
    {
      item_id: "",
      qty: "",
      qty_fisik: "",
      keterangan_fisik: "",
    },
  ]);

  const validateForm = () => {
    let error = false;
    if (paymentMethod === "") {
      setPaymentMethodError("invalid");
      error = true;
    }
    return error;
  };

  useEffect(() => {
    getItem();
    getMember();
    getPerson();
    getSatuan();
    getJangkaWaktu();
  }, []);

  useEffect(() => {
    getItem();
  }, [typeItemId, setTypeItemId]);

  const getItem = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/items/type`,
        { params: { warehouse_id: warehouse, type: typeItemId } },
        { headers }
      )
      .then((data) => {
        setItems(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getMember = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/customer/list`, { headers })
      .then((data) => {
        setAllMember(data.data.response);
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

  const getJangkaWaktu = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/jwkredit/list`, { headers })
      .then((data) => {
        setAllJangkaWaktu(data.data.response);
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
        qty_fisik: "",
        keterangan_fisik: "",
      },
    ]);
  };

  function CreateData() {
    setLoading(true);
    if (role === "ROLE_KARYAWAN" && namaDepartment === "Sales") {
      let data = {
        warehouse_id: parseInt(warehouse),
        username_so: usernameSo,
        payment_method: 1,
        jangka_waktu: parseInt(jangkaWaktu),
        keterangan_payment: descriptionPayment,
        is_cicil: parseInt(isCicil),
        approve: parseInt(approve),
        // active_flag: 1,
        so_type: 1,
        keterangan_po: descriptionSo,
        person: parseInt(person),
        items: inputList,
        username_gudang: usernameSo,
        status_barang: parseInt(statusBarang),
        keterangan_gudang: descriptionGudang,
        username_kurir: "",
        username_validator: usernameValidator,
        clear: parseInt(clear),
        keterangan_validator: descriptionValidator,
        username_admin: usernameAdmin,
        keterangan_admin: descriptionAdmin,
        durasi_po: 0,
        admin_approval: 1,
      };
      axios
        .post(`${process.env.REACT_APP_API_BASE_URL}/sales-order/save`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (response) {
          history.push("/admin/sales-order");
        })
        .then((json) => {
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      let data = {
        warehouse_id: parseInt(warehouse),
        username_so: usernameSo,
        payment_method: paymentMethod,
        keterangan_payment: descriptionPayment,
        is_cicil: parseInt(isCicil),
        approve: 1,
        username_gudang: usernammeGudang,
        status_barang: parseInt(statusBarang),
        keterangan_gudang: descriptionGudang,
        username_kurir: usernameKurir,
        member: parseInt(member),
        customer: customer,
        username_validator: usernameValidator,
        clear: parseInt(clear),
        keterangan_validator: descriptionValidator,
        active_flag: 1,
        so_type: 1,
        so_status: 1,
        keterangan_so: descriptionSo,
        items: inputList,
        username_admin: usernameAdmin,
        keterangan_admin: descriptionAdmin,
        durasi_po: 0,
        admin_approval: 1,
      };
      axios
        .post(`${process.env.REACT_APP_API_BASE_URL}/sales-order/save`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
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
    // let data = {
    //   warehouse_id: parseInt(warehouse),
    //   username_so: usernameSo,
    //   payment_method: paymentMethod,
    //   keterangan_payment: descriptionPayment,
    //   is_cicil: parseInt(isCicil),
    //   approve: 1,
    //   username_gudang: usernammeGudang,
    //   status_barang: parseInt(statusBarang),
    //   keterangan_gudang: descriptionGudang,
    //   username_kurir: usernameKurir,
    //   member: parseInt(member),
    //   customer: customer,
    //   username_validator: usernameValidator,
    //   clear: parseInt(clear),
    //   keterangan_validator: descriptionValidator,
    //   active_flag: 1,
    //   so_type: 1,
    //   so_status: 1,
    //   keterangan_so: descriptionSo,
    //   items: inputList,
    // };
    // axios
    //   .post(`${process.env.REACT_APP_API_BASE_URL}/sales-order/save`, data, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then(function (response) {
    //     history.push("/admin/sales-order");
    //   })
    //   .then((json) => {
    //     setLoading(false);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      CreateData();
    }
  };
  return (
    <>
      <SimpleHeader name="Daftar Sales Order" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            {role === "ROLE_KARYAWAN" && namaDepartment === "Sales" ? (
              <Card>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <CardHeader>
                      <h3>Daftar Sales Order</h3>
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
                          disabled
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
                          Username Admin
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          disabled
                          type="text"
                          name="po"
                          placeholder="Masukan Username Admin"
                          value={usernameAdmin}
                          onChange={(e) => {
                            setUsernameAdmin(e.target.value);
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
                          Jangka waktu
                        </Label>
                        <Input
                          name="jangkawWaktu"
                          type="select"
                          value={jangkaWaktu}
                          onChange={(e) => {
                            setJangkuWaktu(e.target.value);
                          }}
                        >
                          <option value="">Pilih Jangka Waktu</option>
                          {allJangkaWaktu.map((waktu, key) => {
                            return (
                              <option key={key} value={waktu.durasi}>
                                {waktu.durasi}
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
                          SO Type
                        </Label>
                        <Input
                          name="paymentMethod"
                          type="select"
                          value={poType}
                          onChange={(e) => {
                            setPoType(e.target.value);
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
                          Person
                        </Label>
                        <Input
                          name="person"
                          type="select"
                          value={person}
                          onChange={(e) => {
                            setPerson(e.target.value);
                          }}
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
                                  onChange={() => setApprove(1)}
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
                                  onChange={() => setApprove(2)}
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
                                  onChange={() => setApprove(3)}
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
                      {inputList.map((x, i) => {
                        return (
                          <div className="box" key={i}>
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlSelect3"
                              >
                                Tipe Item
                              </Label>
                              <Input
                                name="item_id"
                                type="select"
                                onChange={(event) =>
                                  setTypeItemId(event.target.value)
                                }
                              >
                                <option value="1">Barang Mentah</option>
                                <option value="2">Barang Produksi</option>
                              </Input>
                            </FormGroup>
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
                                value={x.item_id}
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
                            {/* <FormGroup>
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
                            </FormGroup> */}
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
            ) : (
              <Card>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <CardHeader>
                      <h3>Daftar Sales Order</h3>
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
                          disabled
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
                        <FormFeedback>
                          Keterangan SO tidak boleh kosong
                        </FormFeedback>
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
                          value={poType}
                          onChange={(e) => {
                            setPoType(e.target.value);
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
                          Person
                        </Label>
                        <Input
                          name="person"
                          type="select"
                          value={person}
                          onChange={(e) => {
                            setPerson(e.target.value);
                          }}
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
                                  onChange={() => setClear(1)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio5"
                                  check
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
                                  onChange={() => setClear(2)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio6"
                                  check
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
                                  onChange={() => setClear(3)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio7"
                                  check
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
                                  onChange={() => setApprove(1)}
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
                                  onChange={() => setApprove(2)}
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
                                  onChange={() => setApprove(3)}
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
                                  onChange={() => setStatusBarang(1)}
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
                                  onChange={() => setStatusBarang(2)}
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
                                  onChange={() => setStatusBarang(3)}
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
                          <div className="box" key={i}>
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlSelect3"
                              >
                                Tipe Item
                              </Label>
                              <Input
                                name="item_id"
                                type="select"
                                onChange={(event) =>
                                  setTypeItemId(event.target.value)
                                }
                              >
                                <option value="1">Barang Mentah</option>
                                <option value="2">Barang Produksi</option>
                              </Input>
                            </FormGroup>
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
                                value={x.item_id}
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
                            {/* <FormGroup>
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
                            </FormGroup> */}
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
