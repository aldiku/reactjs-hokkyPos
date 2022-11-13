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

export default function EditDurasiOperasional(props) {
  const token = localStorage.token;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [durasipo,setDurasiPo] = useState([]);
  const [pengirimanpo,setPengirimanPo] = useState([]);
  const [durasiso,setDurasiSo] = useState([]);
  const [pengirimanso,setPengirimanSo] = useState([]);
  const [durasitw,setDurasiTw] = useState([]);
  const [pengirimantw,setPengirimanTw] = useState([]);

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
        `${process.env.REACT_APP_API_BASE_URL}/durasi-operasional/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        setDurasiPo(data.data.response.durasi_po);
        setPengirimanPo(data.data.response.pengiriman_po);
        setDurasiSo(data.data.response.durasi_so);
        setPengirimanSo(data.data.response.pengiriman_so);
        setDurasiTw(data.data.response.durasi_tw);
        setPengirimanTw(data.data.response.pengiriman_tw);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function CreateData() {
    setLoading(true);
    let data = {
        
      warehouse_id: parseInt(warehouse),
      durasi_po: parseInt(durasipo),
      pengiriman_po: parseInt(pengirimanpo),
      durasi_so: parseInt(durasiso),
      pengiriman_so: parseInt(pengirimanso),
      durasi_tw: parseInt(durasitw),
      pengiriman_tw: parseInt(pengirimantw),
    };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/durasi-operasional/update/${props.match.params.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        history.push("/admin/durasi-operasional");
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
      CreateData();
    }
  };
  return (
    <>
      <SimpleHeader name="Edit Batas Waktu" parentName="Master" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <CardHeader>
                    <h3>Edit Batas Waktu</h3>
                  </CardHeader>
                  <CardBody>
                    <Row md="12">
                          <Col md="6">
                          <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Durasi PO
                              </Label>
                              <Col sm={7}>
                                <Input
                                autoComplete="off"
                                  type="number"
                                  name="desc"
                                  placeholder="Masukan Durasi PO"
                                  value={durasipo}
                                  onChange={(e) => {
                                    setDurasiPo(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Durasi SO
                              </Label>
                              <Col sm={7}>
                                <Input
                                autoComplete="off"
                                  type="number"
                                  name="desc"
                                  placeholder="Masukan Durasi SO"
                                  value={durasiso}
                                  onChange={(e) => {
                                    setDurasiSo(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Durasi Transfer Stok
                              </Label>
                              <Col sm={7}>
                                <Input
                                autoComplete="off"
                                  type="number"
                                  name="desc"
                                  placeholder="Masukan Durasi TW"
                                  value={durasitw}
                                  onChange={(e) => {
                                    setDurasiTw(e.target.value);
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
                    <Link className="btn btn-info" to="/admin/durasi-operasional">
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
