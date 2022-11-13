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

const JangkaWaktu = () => {
  const token = localStorage.token;
  const warehouse = localStorage.warehouse;
  const username = localStorage.username;
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [name,setName] = useState("");
  const [durasi,setDurasi] = useState([]);
  const [keterangan,setKeterangan] = useState("");

  const CreateData = () => {
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    
    let data = {
        warehouse_id : parseInt(warehouse),
        username : username,
        name: name,
        durasi: parseInt(durasi), 
        keterangan: keterangan ,
      };
      axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/jwkredit/save`, data, { headers })
      .then(function (response) {
        history.push("/admin/jangka-waktu");
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
      <SimpleHeader name="Tambah Jatuh Tempo" parentName="Master" />
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
                            Kode
                            {/* <span className="text-danger">*</span> */}
                          </Label>
                          <Col sm={7}>
                            <Input
                            autoComplete="off"
                              type="text"
                              name="Nama"
                              placeholder="Masukan Kode"
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
                            Durasi
                            {/* <span className="text-danger">*</span> */}
                          </Label>
                          <Col sm={7}>
                            <Input
                            autoComplete="off"
                              type="text"
                              name="Alamat"
                              placeholder="Masukan Durasi"
                              value={durasi}
                              onChange={(e) => {
                                setDurasi(e.target.value);
                              }}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={4}
                          >
                            Deskripsi
                            {/* <span className="text-danger">*</span> */}
                          </Label>
                          <Col sm={7}>
                            <Input
                            autoComplete="off"
                              type="text"
                              name="Longitude"
                              placeholder="Masukan Deskripsi"
                              value={keterangan}
                              onChange={(e) => {
                                setKeterangan(e.target.value);
                              }}
                            />
                          </Col>
                        </FormGroup>
                      </Col>
                      <Col md="6">
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
                    <Link className="btn btn-info" to="/admin/jangka-waktu">
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

export default JangkaWaktu;