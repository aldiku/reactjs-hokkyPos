/*eslint-disable*/
import React, { useState, useEffect } from "react";
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
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function EditPasswordOperasional(props) {
  const token = localStorage.token;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [passwordso,setPasswordSo] = useState([]);
  const [passwordpo,setPasswordPo] = useState([]);
  const [passwordtw,setPasswordTw] = useState([]);

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
        `${process.env.REACT_APP_API_BASE_URL}/password-operasional/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        setPasswordPo(data.data.response.password_po);
        setPasswordSo(data.data.response.password_so);
        setPasswordTw(data.data.response.password_tw);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function EditData() {
    setLoading(true);
    let data = {
        
      warehouse_id: parseInt(warehouse),
      password_po: parseInt(passwordpo),
      password_so: parseInt(passwordso),
      password_tw: parseInt(passwordtw),
    };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/password-operasional/update/${props.match.params.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        history.push("/admin/password-operasional");
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
    {
      EditData();
    }
  };
  return (
    <>
      <SimpleHeader name="Edit Validasi Password" parentName="Master" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <CardHeader>
                    <h3>Edit Validasi Password</h3>
                  </CardHeader>
                  <CardBody>
                    <Row md="12">
                          <Col md="6">
                          <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Password PO
                              </Label>
                              <Col sm={7}>
                                <Input
                                autoComplete="off"
                                  type="number"
                                  name="desc"
                                  placeholder="Masukan Password PO"
                                  value={passwordpo}
                                  onChange={(e) => {
                                    setPasswordPo(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Password SO
                              </Label>
                              <Col sm={7}>
                                <Input
                                autoComplete="off"
                                  type="text"
                                  name="desc"
                                  placeholder="Masukan Password SO"
                                  value={passwordso}
                                  onChange={(e) => {
                                    setPasswordSo(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                               Password Transfer Stok
                              </Label>
                              <Col sm={7}>
                                <Input
                                autoComplete="off"
                                  type="text"
                                  name="desc"
                                  placeholder="Masukan Password Transfer Stok"
                                  value={passwordtw}
                                  onChange={(e) => {
                                    setPasswordTw(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup>
                          </Col>
                    </Row>
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
                    <Link className="btn btn-info" to="/admin/password-operasional">
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
