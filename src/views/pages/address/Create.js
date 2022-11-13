/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Label,
  FormGroup,
  Row,
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

export default function CreateAddress() {
  const token = localStorage.token;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);

  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState("");
  const [provinceError, setProvinceError] = useState(null);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState(null);
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState(null);
  const [fax, setFax] = useState("");
  const [faxError, setFaxError] = useState(null);
  const [npwp, setNpwp] = useState("");
  const [npwpError, setNpwpError] = useState(null);

  const validateForm = () => {
    let error = false;
    if (province === "") {
      setProvinceError("invalid");
      error = true;
    }
    if (city === "") {
      setCityError("invalid");
      error = true;
    }
    if (address === "") {
      setAddressError("invalid");
      error = true;
    }
    if (phoneNumber === "") {
      setPhoneNumberError("invalid");
      error = true;
    }
    if (fax === "") {
      setFaxError("invalid");
      error = true;
    }
    if (npwp === "") {
      setNpwpError("invalid");
      error = true;
    }
    return error;
  };

  useEffect(() => {
    getProvince();
  }, []);

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
      active_flag: 1,
      province: province,
      city: city,
      address: address,
      phone: phoneNumber,
      fax: fax,
      npwp: npwp,
    };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/address/save`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        history.push("/admin/alamat");
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
      <SimpleHeader name="Daftar Alamat" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <CardHeader>
                    <h3>Daftar Alamat</h3>
                  </CardHeader>
                  <CardBody>
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
                        <span className="text-danger">*</span>
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
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        name="phoneNumber"
                        placeholder="Masukan Nomor Telpon"
                        value={phoneNumber}
                        invalid={phoneNumberError === "invalid"}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                          if (e.target.value !== "") {
                            setPhoneNumberError("");
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
                        FAX
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        name="fax"
                        placeholder="Masukan Fax"
                        value={fax}
                        invalid={faxError === "invalid"}
                        onChange={(e) => {
                          setFax(e.target.value);
                          if (e.target.value !== "") {
                            setFaxError("");
                          }
                        }}
                      />
                      <FormFeedback>Fax tidak boleh kosong</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        NPWP
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        name="npwp"
                        placeholder="Masukan Npwp"
                        value={npwp}
                        invalid={npwpError === "invalid"}
                        onChange={(e) => {
                          setNpwp(e.target.value);
                          if (e.target.value !== "") {
                            setNpwpError("");
                          }
                        }}
                      />
                      <FormFeedback>NPWP tidak boleh kosong</FormFeedback>
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
                    <Link className="btn btn-info" to="/admin/alamat">
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
