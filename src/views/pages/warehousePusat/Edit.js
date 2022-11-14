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
  const [longitude, setLongitude] = useState([]);
  const [latitude, setLatitude] = useState([]);
  const [province, setProvince] = useState([]);
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [warehousepusat, setWarehousePusat] = useState([]);
  const [warehousepusats, setWarehousePusats] = useState([]);
  const [warehousetoko, setWarehouseToko] = useState([]);
  const [warehousetokos, setWarehouseTokos] = useState([]);
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
        getToko(data.data.response.toko_id);
        getProvinsi(data.data.response.province_id);
        getKota(data.data.response.city_id);
        setLongitude(data.data.response.longitude);
        setLatitude(data.data.response.latitude);
        setPhone(data.data.response.phone);
        setStatus(data.data.response.type);
        setImage(data.data.response.logo);
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
  const getToko = (id) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/warehouse/toko/lists`, { headers
    })
    .then(data => {
      setWarehouseTokos(data.data.response);
      setWarehouseToko(id);
    })
      .catch(function (error) {
        console.log(error)
      })
  }
  
  function CreateData() {
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
        pusat_id:parseInt(warehousepusat),
        toko_id:parseInt(warehousetoko),
        address,
        level:3,
        city : parseInt(city),
        longitude,
        latitude,
        type:parseInt(status),
        province:parseInt(province),
        phone,

    });     
    let data = new FormData();
    data.append("body",myjson)
    data.append("logo",image)
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/warehouse/update/${props.match.params.id}`, data, { headers })
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
      CreateData();
    }
  };

  return (
    <div>
      <SimpleHeader name="Edit Cabang" parentName="Master" />
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
                              className="form-control-alternative"
                              type="text"
                              name="Nama"
                              placeholder="Masukan Nama"
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
                            disabled
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
                                disabled
                                    className="form-control-alternative"
                                    type="select"
                                    value={warehousepusat}
                                    onChange={(e) => {
                                    setWarehousePusat(e.target.value);
                                    getToko(e.target.value);
                                    }}
                                >
                                    <option>Pilih Pusat</option>
                                    {
                                    warehousepusats.map((a, key) => {
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
                                Toko
                                
                            </Label>
                            <Col sm={7}>
                                <Input
                                disabled
                                    className="form-control-alternative"
                                    type="select"
                                    value={warehousetoko}
                                    onChange={(e) => {
                                    setWarehouseToko(e.target.value);
                                    
                                    }}
                                >
                                    <option>Pilih Toko</option>
                                    {
                                    warehousetokos.map((a, key) => {
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
                            Phone
                            
                          </Label>
                          <Col sm={7}>
                            <Input
                              className="form-control-alternative"
                              type="text"
                              name="Alamat"
                              placeholder="Masukan Phone"
                              value={phone}
                              onChange={(e) => {
                                setPhone(e.target.value);
                              }}
                            />
                          </Col>
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        {/* <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={4}
                          >
                            Longitude
                            
                          </Label>
                          <Col sm={7}>
                            <Input
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
                              className="form-control-alternative"
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
                              className="form-control-alternative"
                              type="text"
                              name="Phone"
                              placeholder="Masukan Phone"
                              value={phone}
                              onChange={(e) => {
                                setPhone(e.target.value);
                              }}
                            />
                          </Col>
                        </FormGroup> */}
                        <FormGroup row>
                            <Label
                                for="exampleEmail"
                                sm={4}
                            >
                                Provinsi
                                
                            </Label>
                            <Col sm={7}>
                                <Input
                                    className="form-control-alternative"
                                    type="select"
                                    value={province}
                                    onChange={(e) => {
                                    setProvince(e.target.value);
                                    getKota(e.target.value);
                                    }}
                                >
                                    <option>Pilih Provinsi</option>
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
                        <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Status
                                
                              </Label>
                                <Col sm={7}>
                                  <div style={{ display: "flex" }}>
                                    <div className="custom-control custom-control-alternative custom-checkbox mb-3">
                                      <input
                                        className="custom-control-input"
                                        id="customCheck5"
                                        type="checkbox"
                                        value={1}
                                        checked={status === 1}
                                        onChange={() => setStatus(1)}
                                      />
                                      <label 
                                        className="custom-control-label" 
                                        htmlFor="customCheck5">
                                        Stok Gudang
                                      </label>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;
                                    <div className="custom-control custom-control-alternative custom-checkbox mb-3">
                                      <input
                                        className="custom-control-input"
                                        id="customCheck6"
                                        type="checkbox"
                                        value={2}
                                        checked={status === 2}
                                        onChange={() => setStatus(2)}
                                      />
                                      <label 
                                        className="custom-control-label" 
                                        htmlFor="customCheck6">
                                        Stok Inden
                                      </label>
                                    </div>
                                  </div>
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
                                className="form-control-alternative"
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
                    <Link className="btn btn-info" to="/admin/warehouse">
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