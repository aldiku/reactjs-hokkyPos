/*eslint-disable*/
import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  CardBody,
  CardHeader,
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

const CreateRak = () => {
  const token = localStorage.token;
  const warehouse = localStorage.warehouse;
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [minimumstock, setMinimumStock] = useState([]);
  const [maximumstock, setMaximumStock] = useState([]);
  const [area, setArea] = useState([]);
  const [sisi, setSisi] = useState([]);
  const [display, setDisplay] = useState([]);
  const [tipe, setTipe] = useState("");
  const [tipes, setTipes] = useState([]);
  const [posisi, setPosisi] = useState("");
  const [posisi1, setPosisi1] = useState("");
  const [area1, setArea1] = useState("");
  const [sisi1, setSisi1] = useState("");
  const [display1, setDisplay1] = useState("");

  useEffect(() => {
    getRak();
  }, []);

  const getRak = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/rak-type/list`,
        { headers }
      )
      .then((data) => {
        setTipes(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function CreateData() {
    setLoading(true);{
    CreateRak();
    }
  }

  const CreateRak = () => {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };
    
    const myjson = JSON.stringify ({
        warehouse_id: parseInt(warehouse) ,
        tipe,
        area,
        posisi,
        sisi,
        display,
        minimum_stok: parseInt(minimumstock),
        maximum_stok: parseInt(maximumstock),
        active_flag:1
    });     
    let data = new FormData();
    data.append("body",myjson)
    data.append("area",area1)
    data.append("posisi",posisi1)
    data.append("sisi",sisi1)
    data.append("display",display1)
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/rak/save`, data, { headers })
      .then(function (response) {
        history.push("/admin/rak");
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
      <SimpleHeader name="Tambah Rak" parentName="Master" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
                <Form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader className="bg-white border-0">
                            <h3>Rak</h3>
                        </CardHeader>
                        <CardBody>
                        <Row md="12">
                            <Col md="6">
                                <FormGroup row>
                                    <Label
                                        for="exampleEmail"
                                        sm={4}
                                        >
                                        Tipe Rak
                                    </Label>
                                    <Col sm={7}>
                                        <Input
                                            className="form-control-alternative"
                                            type="select"
                                            value={tipe}
                                            onChange={(e) => setTipe(e.target.value)}
                                        >
                                        <option value="">Pilih Tipe Rak</option>
                                            {tipes.map((Tipe, key) => {
                                                return (
                                                <option key={key} value={Tipe.name}>
                                                    {Tipe.name}
                                                </option>
                                                );
                                            })}
                                    </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                <Label
                                    for="exampleEmail"
                                    sm={4}
                                >
                                    Area
                                </Label>
                                <Col sm={7}>
                                    <Input
                                        className="form-control-alternative"
                                    type="text"
                                    name="Area"
                                    placeholder="Masukan Area"
                                    value={area}
                                    onChange={(e) => {
                                        setArea(e.target.value);
                                    }}
                                    />
                                </Col>
                                </FormGroup>
                                <FormGroup row>
                                <Label
                                    for="exampleEmail"
                                    sm={4}
                                >
                                    Posisi
                                </Label>
                                <Col sm={7}>
                                    <Input
                                        className="form-control-alternative"
                                    type="text"
                                    name="SISI"
                                    placeholder="Masukan Posisi"
                                    value={posisi}
                                    onChange={(e) => {
                                        setPosisi(e.target.value);
                                    }}
                                    />
                                </Col>
                                </FormGroup>
                                <FormGroup row>
                                <Label
                                    for="exampleEmail"
                                    sm={4}
                                >
                                    Sisi
                                </Label>
                                <Col sm={7}>
                                    <Input
                                        className="form-control-alternative"
                                    type="text"
                                    name="SISI"
                                    placeholder="Input Side"
                                    value={sisi}
                                    onChange={(e) => {
                                        setSisi(e.target.value);
                                    }}
                                    />
                                </Col>
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup row>
                                <Label
                                    for="exampleEmail"
                                    sm={4}
                                >
                                    Rak
                                </Label>
                                <Col sm={7}>
                                    <Input
                                        className="form-control-alternative"
                                    type="text"
                                    name="SISI"
                                    placeholder="Masukan Rak"
                                    value={display}
                                    onChange={(e) => {
                                        setDisplay(e.target.value);
                                    }}
                                    />
                                </Col>
                                </FormGroup>
                                <FormGroup row>
                                <Label
                                    for="exampleEmail"
                                    sm={4}
                                >
                                    Stock Minimum 
                                </Label>
                                <Col sm={7}>
                                    <Input
                                        className="form-control-alternative"
                                    type="number"
                                    name="Minimum Stock"
                                    placeholder="Input Stock Minimum"
                                    value={minimumstock}
                                    onChange={(e) => {
                                    setMinimumStock(e.target.value);
                                    }}
                                    />
                                </Col>
                                </FormGroup>
                                <FormGroup row>
                                <Label
                                    for="exampleEmail"
                                    sm={4}
                                >
                                    Stock Maximum
                                </Label>
                                <Col sm={7}>
                                    <Input
                                        className="form-control-alternative"
                                    type="number"
                                    name="Minimum Stock"
                                    placeholder="Input Stock Maximum"
                                    value={maximumstock}
                                    onChange={(e) => {
                                    setMaximumStock(e.target.value);
                                    }}
                                    />
                                </Col>
                                </FormGroup>
                            </Col>
                        </Row>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader className="bg-white border-0">
                            <h3>Gambar Rak</h3>
                        </CardHeader>
                        <CardBody>
                        <Row md="12">
                            <Col md="6">
                                  <FormGroup row>
                                    <Label
                                        for="exampleEmail"
                                        sm={4}
                                    >
                                        Planogram Area
                                    </Label>
                                    <Col sm={7}>
                                    <Input
                                        id="exampleFile"
                                        name="file"
                                        type="file"
                                        onChange={(event) => {
                                            setArea1(event.target.files[0]);
                                        }}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label
                                        for="exampleEmail"
                                        sm={4}
                                    >
                                        Planogram Posisi
                                    </Label>
                                    <Col sm={7}>
                                    <Input
                                        id="exampleFile"
                                        name="file"
                                        type="file"
                                        onChange={(event) => {
                                            setPosisi1(event.target.files[0]);
                                        }}
                                        />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col md="6">
                            <FormGroup row>
                                    <Label
                                        for="exampleEmail"
                                        sm={4}
                                    >
                                        Planogram Sisi
                                    </Label>
                                    <Col sm={7}>
                                    <Input
                                        id="exampleFile"
                                        name="file"
                                        type="file"
                                        onChange={(event) => {
                                            setSisi1(event.target.files[0]);
                                        }}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label
                                        for="exampleEmail"
                                        sm={4}
                                    >
                                    Planogram Rak
                                    </Label>
                                    <Col sm={7}>
                                    <Input
                                        id="exampleFile"
                                        name="file"
                                        type="file"
                                        onChange={(event) => {
                                            setDisplay1(event.target.files[0]);
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
                        <Link className="btn btn-info" to="/admin/rak">
                        Kembali
                        </Link>
                    </CardFooter>
                    </Card>
               </Form>    
            </Card>
          </div>
        </Row>
      </Container>
    </div>
    
  );
};

export default CreateRak;