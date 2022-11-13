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

export default function CreateUser() {
  const token = localStorage.token;
  const warehouse = localStorage.warehouse;
  const roleId = localStorage.authority;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [gender, setGender] = useState(1);
  const [isKaryawan, setIsKaryawan] = useState(1);
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState("");
  const [roleError, setRoleError] = useState(null);
  const [jabatan, setJabatan] = useState("");
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState(null);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState("");
  const [provinceError, setProvinceError] = useState(null);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState(null);
  const [awal, setAwal] = useState("");


  const validateForm = () => {
    let error = false;
    if (username === "") {
      setUsernameError("invalid");
      error = true;
    }
    if (name === "") {
      setNameError("invalid");
      error = true;
    }
    if (email === "") {
      setEmailError("invalid");
      error = true;
    }
    if (password === "") {
      setPasswordError("invalid");
      error = true;
    }
    if (role === "") {
      setRoleError("invalid");
      error = true;
    }
    if (address === "") {
      setAddressError("invalid");
      error = true;
    }
    if (phone === "") {
      setPhoneError("invalid");
      error = true;
    }
    if (province === "") {
      setProvinceError("invalid");
      error = true;
    }
    if (city === "") {
      setCityError("invalid");
      error = true;
    }
    return error;
  };

  useEffect(() => {
    getRole();
    getProvince();
  }, []);

  const getRole = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/roles/list?role=${roleId}`, {
        headers,
      })
      .then((data) => {
        setRoles(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getProvince = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/province/list`, { headers })
      .then((data) => {
        setProvinces(data.data.response_data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getCity = (provinceId) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/city?province_id=${provinceId}`,
        { headers }
      )
      .then((data) => {
        setCities(data.data.response_data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function CreateData() {
    setLoading(true);
    let data = {
      warehouse_id: parseInt(warehouse),
      username: username,
      name: name,
      email: email,
      password: password,
      gender: parseInt(gender),
      is_karyawan: roleId === "ROLE_SUPERADMIN" ? parseInt(isKaryawan) : 1,
      role: [role],
      description: jabatan,
      address: address,
      phone: phone,
      province: parseInt(province),
      city: parseInt(city),
    };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/users/register`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        history.push("/admin/user");
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
      CreateData();
    }
  };
  return (
    <>
      <SimpleHeader name="Buat User" parentName="Master" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <CardHeader>
                    <h3>Buat User</h3>
                  </CardHeader>
                  <Row md="12">
										<Col md="6">
                      <CardBody>
                          <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                  Username
                              </Label>
                              <Col sm={7}>
                                  <Input
                                      className="form-control-alternative"
                                      type="text"
                                      name="itemCode"
                                      placeholder="Masukan Username"
                                      value={username}
                                      onChange={(e) => {
                                          setUsername(e.target.value);
                                      }}
                                  />
                              </Col>
                          </FormGroup>
                          <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                  Nama
                              </Label>
                              <Col sm={7}>
                                  <Input
                                      className="form-control-alternative"
                                      type="text"
                                      name="barcode"
                                      placeholder="Masukan Nama"
                                      value={name}
                                      onChange={(e) => {
                                          setName(e.target.value);
                                      }}
                                  />
                              </Col>
                          </FormGroup>
                          <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                  Posisi
                              </Label>
                              <Col sm={7}>
                                  <Input
                                      className="form-control-alternative"
                                      name="Supplier"
                                      type="text"
                                      placeholder="Masukan Posisi"
                                      value={""}
                                      onChange={(e) => {
                                          // setPosisi(e.target.value);
                                      }}
                                  />
                              </Col>
                          </FormGroup>
                          <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                  Departement
                              </Label>
                              <Col sm={7}>
                                  <Input
                                      className="form-control-alternative"
                                      type="text"
                                      
                                      placeholder="Masukan Departement"
                                      value={""}
                                      onChange={(e) => {
                                          // setDepartement(e.target.value);
                                      }}
                                  />
                              </Col>
                          </FormGroup>
                      </CardBody>
										</Col>
										<Col md="6">
                      <CardBody>
                        <FormGroup row>
                                <Label
                                for="exampleEmail"
                                sm={4}
                                >
                                Jenis Kelamin
                                </Label>
                                <Col sm={7}>
                                    <div style={{ display: "flex" }}>
                                        <div className="custom-control custom-radio mb-4">
                                            <Input
                                            className="custom-control-input"
                                            id="customRadio10"
                                            name="custom-radio-4"
                                            type="radio"
                                            value={1}
                                            checked={gender === 1}
                                            onChange={() => setGender(1)}
                                            />
                                            <Label
                                            className="custom-control-label"
                                            htmlFor="customRadio10"
                                            >
                                            Laki-Laki
                                            </Label>
                                        </div>
                                        <div
                                            className="custom-control custom-radio mb-4"
                                            style={{ marginLeft: "20px" }}
                                        >
                                            <Input
                                            className="custom-control-input"
                                            id="customRadio11"
                                            name="custom-radio-4"
                                            type="radio"
                                            value={2}
                                            checked={gender === 2}
                                            onChange={() => setGender(2)}
                                            />
                                            <Label
                                            className="custom-control-label"
                                            htmlFor="customRadio11"
                                            >
                                            Perempuan
                                            </Label>
                                        </div>
                                    </div>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="exampleEmail" sm={4}>
                                    Tanggal Pembuatan
                                </Label>
                                <Col sm={7}>
                                    <Input
                                        className="form-control-alternative"
                                        type="date"
                                        name="itemCode"
                                        placeholder="Tanggal Pembuatan"
                                        value={awal}
                                        onChange={(e) => {
                                            setAwal(e.target.value);
                                        }}
                                    />
                                </Col>
                            </FormGroup>
                        </CardBody>
										</Col>
									</Row>
                  {/* <CardBody>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Username
                      </Label>
                      <Input
                        type="text"
                        name="username"
                        placeholder="Input Username"
                        value={username}
                        invalid={usernameError === "invalid"}
                        onChange={(e) => {
                          setUsername(e.target.value);
                          if (e.target.value !== "") {
                            setUsernameError("");
                          }
                        }}
                      />
                      <FormFeedback>Username tidak boleh kosong</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Name
                      </Label>
                      <Input
                        type="text"
                        name="nama"
                        placeholder="Input Nama"
                        value={name}
                        invalid={nameError === "invalid"}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (e.target.value !== "") {
                            setNameError("");
                          }
                        }}
                      />
                      <FormFeedback>Nama tidak boleh kosong</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Email
                      </Label>
                      <Input
                        type="text"
                        name="email"
                        placeholder="Input Email"
                        value={email}
                        invalid={emailError === "invalid"}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (e.target.value !== "") {
                            setEmailError("");
                          }
                        }}
                      />
                      <FormFeedback>Email tidak boleh kosong</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Password
                      </Label>
                      <Input
                        type="password"
                        name="password"
                        placeholder="Input Password"
                        value={password}
                        invalid={passwordError === "invalid"}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (e.target.value !== "") {
                            setPasswordError("");
                          }
                        }}
                      />
                      <FormFeedback>Password tidak boleh kosong</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        gender
                      </Label>
                      <Row>
                        <Col>
                          <div style={{ display: "flex" }}>
                            <div className="custom-control custom-radio mb-3">
                              <Input
                                className="custom-control-input"
                                id="customRadio3"
                                name="custom-radio-1"
                                type="radio"
                                value={1}
                                checked={gender === 1}
                                onClick={() => setGender(1)}
                              />
                              <Label
                                className="custom-control-label"
                                htmlFor="customRadio3"
                              >
                                Male
                              </Label>
                            </div>
                            <div
                              className="custom-control custom-radio mb-3"
                              style={{ marginLeft: "20px" }}
                            >
                              <Input
                                className="custom-control-input"
                                id="customRadio4"
                                name="custom-radio-1"
                                type="radio"
                                value={2}
                                checked={gender === 2}
                                onClick={() => setGender(2)}
                              />
                              <Label
                                className="custom-control-label"
                                htmlFor="customRadio4"
                              >
                                Woman
                              </Label>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                    {roleId === "[ROLE_SUPERADMIN" ? (
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlSelect3"
                        >
                          Is Karyawan
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
                                  checked={isKaryawan === 1}
                                  onClick={() => setIsKaryawan(1)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio5"
                                >
                                  Karyawan
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
                                  checked={isKaryawan === 2}
                                  onClick={() => setIsKaryawan(2)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio6"
                                >
                                  Bukan Karyawan
                                </Label>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                    ) : (
                      <div></div>
                    )}
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Role
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="role"
                        type="select"
                        value={role}
                        invalid={roleError === "invalid"}
                        onChange={(e) => {
                          setRole(e.target.value);
                          if (e.target.value !== "") {
                            setRoleError("");
                          }
                        }}
                      >
                        <option value="">Choose Role</option>
                        {roles.map((role, key) => {
                          return (
                            <option key={key} value={role.roleId}>
                              {role.name}
                            </option>
                          );
                        })}
                      </Input>
                      <FormFeedback>Role tidak boleh kosong</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Position
                      </Label>
                      <Input
                        type="text"
                        name="Position"
                        placeholder="Input Position"
                        value={jabatan}
                        onChange={(e) => {
                          setJabatan(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Province
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="Province"
                        type="select"
                        value={province}
                        invalid={provinceError === "invalid"}
                        onChange={(e) => {
                          setProvince(e.target.value);
                          if (e.target.value !== "") {
                            setProvinceError("");
                          }
                          getCity(e.target.value);
                        }}
                      >
                        <option value="">Choose Province</option>
                        {provinces.map((prov, key) => {
                          return (
                            <option key={key} value={prov.id}>
                              {prov.name}
                            </option>
                          );
                        })}
                      </Input>
                      <FormFeedback>Province tidak boleh kosong</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        City
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="Kota"
                        type="select"
                        value={city}
                        invalid={cityError === "invalid"}
                        onChange={(e) => {
                          setCity(e.target.value);
                          if (e.target.value !== "") {
                            setCityError("");
                          }
                        }}
                      >
                        <option value="">Choose Kota</option>
                        {cities.map((city, key) => {
                          return (
                            <option key={key} value={city.id}>
                              {city.name}
                            </option>
                          );
                        })}
                      </Input>
                      <FormFeedback>Kota tidak boleh kosong</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Address
                      </Label>
                      <Input
                        type="text"
                        name="alamat"
                        placeholder="Input Address"
                        value={address}
                        invalid={addressError === "invalid"}
                        onChange={(e) => {
                          setAddress(e.target.value);
                          if (e.target.value !== "") {
                            setAddressError("");
                          }
                        }}
                      />
                      <FormFeedback>Alamat tidak boleh kosong</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Phone
                      </Label>
                      <Input
                        type="text"
                        name="nomorTelpon"
                        placeholder="Input Phone"
                        value={phone}
                        invalid={phoneError === "invalid"}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (e.target.value !== "") {
                            setPhoneError("");
                          }
                        }}
                      />
                      <FormFeedback>
                        Nomor Telpon tidak boleh kosong
                      </FormFeedback>
                    </FormGroup>
                  </CardBody> */}
                  <CardFooter>
                    {!isLoading && (
                      <Button color="primary" type="submit">
                        Save
                      </Button>
                    )}
                    {isLoading && (
                      <Button color="primary" disabled>
                        <i className="fas fa-spinner fa-spin"></i>
                        {""}
                        loading...
                      </Button>
                    )}
                    <Link className="btn btn-info" to="/admin/user">
                      Back
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
