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

export default function CreateUser(props) {
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
  const [gender, setGender] = useState(1);
  const [isKaryawan, setIsKaryawan] = useState(1);
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState("");
  const [roleError, setRoleError] = useState(null);
  const [userImage, setUserImage] = useState("");
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
  const [fax, setFax] = useState("");
  const [npwp, setNpwp] = useState("");
  const [addressId, setAddressId] = useState("");

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
    getUserById();
  }, []);

  const getUserById = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/users/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        getAddressById(data.data.response.address_id);
        getRole(data.data.response.roles[0].roleId);
        setUsername(data.data.response.username);
        setName(data.data.response.name);
        setEmail(data.data.response.email);
        setGender(data.data.response.gender);
        setIsKaryawan(data.data.response.is_karyawan);
        setAddressId(data.data.response.address_id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getAddressById = (addressId) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/address/${addressId}`, {
        headers,
      })
      .then((data) => {
        getProvince();
        getCity(data.data.response.province, data.data.response.city);
        setProvince(data.data.response.province);
        setCity(data.data.response.city);
        setAddress(data.data.response.address);
        setPhone(data.data.response.phone);
        setFax(data.data.response.fax);
        setNpwp(data.data.response.npwp);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getRole = (id) => {
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
        setRole(id);
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

  function EditUser() {
    setLoading(true);
    let data = {
      username: username,
      name: name,
      email: email,
      gender: parseInt(gender),
      is_karyawan: roleId === "ROLE_SUPERADMIN" ? parseInt(isKaryawan) : 1,
      role: [role],
      address: address,
      phone: phone,
      province: parseInt(province),
      city: parseInt(city),
      fax: fax,
      npwp: npwp,
      address_id: parseInt(addressId),
    };
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/users/update/${props.match.params.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
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
      EditUser();
    }
  };
  return (
    <>
      <SimpleHeader name="Edit User" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <CardHeader>
                    <h3>Edit User</h3>
                  </CardHeader>
                  <CardBody>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Username
                      </Label>
                      <Input
                        disabled
                        type="text"
                        name="username"
                        placeholder="Masukan Username"
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
                        Nama
                      </Label>
                      <Input
                        type="text"
                        name="nama"
                        placeholder="Masukan Nama"
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
                        placeholder="Masukan Email"
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
                        htmlFor="exampleFormControlSelect3"
                      >
                        Jenis Kelamin
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
                                Pria
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
                                Wanita
                              </Label>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                    {roleId === "ROLE_SUPERADMIN" ? (
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
                        disabled
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
                        <option value="">Pilih Role</option>
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
                        <option value="">Pilih Province</option>
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
                        Kota
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
                        <option value="">Pilih Kota</option>
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
                        Alamat
                      </Label>
                      <Input
                        type="text"
                        name="alamat"
                        placeholder="Masukan Alamat"
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
                        Nomor Telpon
                      </Label>
                      <Input
                        type="text"
                        name="nomorTelpon"
                        placeholder="Masukan Nomor Telpon"
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
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Fax
                      </Label>
                      <Input
                        type="text"
                        name="fax"
                        placeholder="Masukan Fax"
                        value={fax}
                        onChange={(e) => {
                          setFax(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Npwp
                      </Label>
                      <Input
                        type="text"
                        name="npwp"
                        placeholder="Masukan Npwp"
                        value={npwp}
                        onChange={(e) => {
                          setNpwp(e.target.value);
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
                    <Link className="btn btn-info" to="/admin/user">
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
