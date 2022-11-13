/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  CardBody,
  Form,
  CardFooter,
  FormGroup,
  Label,
  Input,
  Container,
} from "reactstrap";

import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function EditWarehouseToko(props) {
  const token = localStorage.token;
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState([]);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [province, setProvince] = useState([]);
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [warehousepusat, setWarehousePusat] = useState([]);
  const [warehousepusats, setWarehousePusats] = useState([]);
  const [citys, setCitys] = useState([]);

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
        `${process.env.REACT_APP_API_BASE_URL}/warehouse/get/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        setName(data.data.response.warehouse_name);
        setAddress(data.data.response.address);
        getPusat(data.data.response.pusat_id);
        getProvinsi(data.data.response.province_id);
        getKota(data.data.response.city_id);
        setLongitude(data.data.response.longitude);
        setLatitude(data.data.response.latitude);
        setPhone(data.data.response.warehouse_phone);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getProvinsi = (id) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/province/list`, { headers
    })
    .then(data => {
      setProvinces(data.data.response_data);
      setProvince(id);
    })
      .catch(function (error) {
        console.log(error)
      })
  }

  const getKota = (id) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/city/list`, { headers
    })
    .then(data => {
      setCitys(data.data.response_data);
      setCity(id);
    })
      .catch(function (error) {
        console.log(error)
      })
  }

  const getPusat = (id) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/warehouse/pusat/list`, { headers
    })
    .then(data => {
      setWarehousePusats(data.data.response);
      setWarehousePusat(id);
    })
      .catch(function (error) {
        console.log(error)
      })
  }
  
  function EditData() {
    setLoading(true);{
        UpdateWarehouseToko();
    }
  }

  const UpdateWarehouseToko = () => {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };
    
    const myjson = JSON.stringify ({
        
        name,
        active_flag:1,
        pusat_id:parseInt(warehousepusat),
        address,
        level:2,
        city : parseInt(city),
        longitude,
        latitude,
        province:parseInt(province),
        phone,

    });     
    let data = new FormData();
    data.append("body",myjson)
    data.append("logo",image)
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/warehouse/toko/update/${props.match.params.id}`, data, { headers })
      .then(function (response) {
        history.push("/admin/warehouse");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    {
      EditData();
    }
  };

  return (
    <div>
      <SimpleHeader name="Edit Toko" parentName="Master" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <Form onSubmit={handleSubmit}>
                <CardBody>
                  <Row md="12">
                      <Col md="6">
                        <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={4}
                          >
                            Nama
                            
                          </Label>
                          <Col sm={7}>
                            <Input
                              autoComplete="off"
                              className="form-control-alternative"
                              type="text"
                              name="Nama"
                              placeholder="Nama Toko"
                              value={name}
                              onChange={(e) => {
                                setName(e.target.value);
                              }}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={4}
                          >
                            Alamat
                            
                          </Label>
                          <Col sm={7}>
                            <Input
                              autoComplete="off"
                              className="form-control-alternative"
                              type="text"
                              name="Alamat"
                              placeholder="Masukan Alamat"
                              value={address}
                              onChange={(e) => {
                                setAddress(e.target.value);
                              }}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label
                                for="exampleEmail"
                                sm={4}
                            >
                                Pusat
                                
                            </Label>
                            <Col sm={7}>
                                <Input
                                    autoComplete="off"
                                    className="form-control-alternative"
                                    type="select"
                                    value={warehousepusat}
                                    onChange={(e) => {
                                    setWarehousePusat(e.target.value);
                                    
                                    }}
                                >
                                    <option>Pilih Pusat</option>
                                    {
                                    warehousepusats.map((categorysss, key) => {
                                        return (
                                          <option key={key} value={categorysss.id}>
                                            {categorysss.name}
                                          </option>
                                        );
                                    })
                                    }
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label
                                for="exampleEmail"
                                sm={4}
                            >
                                Provinsi
                                
                            </Label>
                            <Col sm={7}>
                                <Input
                                    autoComplete="off"
                                    className="form-control-alternative"
                                    type="select"
                                    value={province}
                                    onChange={(e) => {
                                    setProvince(e.target.value);
                                    getKota(e.target.value);
                                    }}
                                >
                                    <option> Pilih Provinsi </option>
                                    {
                                    provinces.map((a, key) => {
                                        return <option key={key} value={a.id}>{a.name}</option>
                                    })
                                    }
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label
                                for="exampleEmail"
                                sm={4}
                            >
                                Kota
                                
                            </Label>
                            <Col sm={7}>
                                <Input
                                    autoComplete="off"
                                    className="form-control-alternative"
                                    name="function"
                                    type="select"
                                    value={city}
                                    onChange={(e) => {
                                    setCity(e.target.value);
                                    }}
                                >
                                    <option>Pilih Kota</option>
                                    {
                                    citys.map((b, key) => {
                                        return <option key={key} value={b.id}>{b.name}</option>
                                    })
                                    }
                                </Input>
                            </Col>
                        </FormGroup>
                      </Col>
                      <Col md="6">
                      <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={4}
                          >
                            Longitude
                            
                          </Label>
                          <Col sm={7}>
                            <Input
                              autoComplete="off"
                              className="form-control-alternative"
                              type="text"
                              name="Longitude"
                              placeholder="Masukan Longitude"
                              value={longitude}
                              onChange={(e) => {
                                setLongitude(e.target.value);
                              }}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={4}
                          >
                            Latitude
                          </Label>
                          <Col sm={7}>
                            <Input
                              autoComplete="off"
                              type="text"
                              name="Latitude"
                              placeholder="Masukan Latitude"
                              value={latitude}
                              onChange={(e) => {
                                setLatitude(e.target.value);
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
                              autoComplete="off"
                              type="text"
                              name="Phone"
                              placeholder="Masukan Phone"
                              value={phone}
                              onChange={(e) => {
                                setPhone(e.target.value);
                              }}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label
                                for="exampleEmail"
                                sm={4}
                            >
                                Gambar
                                
                            </Label>
                            <Col sm={7}>
                            <Input
                                autoComplete="off"
                                id="exampleFile"
                                name="file"
                                type="file"
                                onChange={(event) => {
                                    setImage(event.target.files[0]);
                                }}
                                />
                            </Col>
                        </FormGroup>
                      </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                    {!isLoading && (<Button color="primary" type="submit">
                      Simpan
                    </Button>)}
                    {isLoading && (
                      <Button color="primary" disabled>
                        <i className="fas fa-spinner fa-spin"></i>
                        {""}
                        loading...
                      </Button>
                    )}
                    <Link className="btn btn-info" to="/admin/warehouse/toko">
                      Kembali
                    </Link>
                </CardFooter>
               </Form>      
            </Card>
          </div>
        </Row>
      </Container>
    </div>
    
  );
};