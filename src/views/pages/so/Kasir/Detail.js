/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  
  Card,
  Button,
  Row,
  Col,
  CardBody,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter
  
} from "reactstrap";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function DetailKasirSettlement(props) {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [modal1, setModal1] = useState([]);
  const [pecahanseratus, setPecahanSeratus] = useState([]);
  const [pecahanduaratus, setPecahanDuaRatus] = useState([]);
  const [pecahanlimaratus, setPecahanLimaRatus] = useState([]);
  const [pecahanseribu, setPecahanSeribu] = useState([]);
  const [pecahanduaribu, setPecahanDuaRibu] = useState([]);
  const [pecahanlimaribu, setPecahanLimaRibu] = useState([]);
  const [pecahansepuluhribu, setPecahanSepuluhRibu] = useState([]);
  const [pecahanduapuluhribu, setPecahanDuapuluhRibu] = useState([]);
  const [pecahanlimapuluhribu, setPecahanLimapuluhRibu] = useState([]);
  const [pecahantujuhlimaribu, setPecahanTujuhLimaRibu] = useState([]);
  const [pecahanseratusribu, setPecahanSeratusRibu] = useState([]);

  
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
        `${process.env.REACT_APP_API_BASE_URL}/chasier-settlement/get-by-username/${username}`,
        { headers }
      )
      .then((data) => {
        setModal1(data.data.response.modal);
        setPecahanSeratus(data.data.response.pecahan_seratus);
        setPecahanDuaRatus(data.data.response.pecahan_dua_ratus);
        setPecahanLimaRatus(data.data.response.pecahan_lima_ratus);
        setPecahanSeribu(data.data.response.pecahan_seribu);
        setPecahanDuaRibu(data.data.response.pecahan_dua_ribu);
        setPecahanLimaRibu(data.data.response.pecahan_lima_ribu);
        setPecahanSepuluhRibu(data.data.response.pecahan_sepuluh_ribu);
        setPecahanDuapuluhRibu(data.data.response.pecahan_dua_puluh_ribu);
        setPecahanLimapuluhRibu(data.data.response.pecahan_lima_puluh_ribu);
        setPecahanTujuhLimaRibu(data.data.response.pecahan_tujuh_lima_ribu);
        setPecahanSeratusRibu(data.data.response.pecahan_seratus_ribu);
       
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function CreateData() {
    setLoading(true);
    let data = {
      warehouse_id : parseInt(warehouse),
      username : username,
      modal : parseFloat(modal1),
      pecahan_seratus : parseInt(pecahanseratus),
      pecahan_dua_ratus : parseInt(pecahanduaratus),
      pecahan_lima_ratus : parseInt(pecahanlimaratus),
      pecahan_seribu : parseInt(pecahanseribu),
      pecahan_dua_ribu : parseInt(pecahanduaribu),
      pecahan_lima_ribu : parseInt(pecahanlimaribu),
      pecahan_sepuluh_ribu: parseInt(pecahansepuluhribu),
      pecahan_dua_puluh_ribu: parseInt(pecahanduapuluhribu),
      pecahan_lima_puluh_ribu: parseInt(pecahanlimapuluhribu),
      pecahan_tujuh_lima_ribu: parseInt(pecahantujuhlimaribu),
      pecahan_seratus_ribu: parseInt(pecahanseratusribu),
      active_flag: 5,
    };
    axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/chasier-settlement/update/${username}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          history.push("/admin/kasir-sales-order");
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
    <SimpleHeader name="Closing Cashier" parentName="SO" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
              <Card>
                <Form onSubmit={handleSubmit}>
                <CardBody>
                    <CardHeader>
                      <h3>Closing Cashier</h3>
                    </CardHeader>
                    <CardBody>
                      <Row md="12">
                          <Col md="6">
                                <Input
                                  type="hidden"
                                  name="nomorPart"
                                  placeholder="Masukan modal"
                                  value={modal1}
                                  onChange={(e) => {
                                    setModal1(e.target.value);
                                  }}
                                />
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Pecahan Seratus
                              </Label>
                              <Col sm={7}>
                                <Input
                                  type="text"
                                  name="nomorPart"
                                  placeholder="Masukan Pecahan Seratus"
                                  value={pecahanseratus}
                                  onChange={(e) => {
                                    setPecahanSeratus(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Pecahan Dua Ratus
                              </Label>
                              <Col sm={7}>
                                <Input
                                  type="text"
                                  name="nomorPart"
                                  placeholder="Masukan Pecahan Dua ratus"
                                  value={pecahanduaratus}
                                  onChange={(e) => {
                                    setPecahanDuaRatus(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Pecahan Lima Ratus
                              </Label>
                              <Col sm={7}>
                                <Input
                                  type="text"
                                  name="nomorPart"
                                  placeholder="Masukan Pecahan lima ratus"
                                  value={pecahanlimaratus}
                                  onChange={(e) => {
                                    setPecahanLimaRatus(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Pecahan Seribu
                              </Label>
                              <Col sm={7}>
                                <Input
                                  type="text"
                                  name="nomorPart"
                                  placeholder="Masukan seribu"
                                  value={pecahanseribu}
                                  onChange={(e) => {
                                    setPecahanSeribu(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Pecahan dua ribu
                              </Label>
                              <Col sm={7}>
                                <Input
                                  type="text"
                                  name="nomorPart"
                                  placeholder="Masukan 2 ribu"
                                  value={pecahanduaribu}
                                  onChange={(e) => {
                                    setPecahanDuaRibu(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Pecahan Lima Ribu
                              </Label>
                              <Col sm={7}>
                                <Input
                                  type="text"
                                  name="nomorPart"
                                  placeholder="Masukan Lima Ribu"
                                  value={pecahanlimaribu}
                                  onChange={(e) => {
                                    setPecahanLimaRibu(e.target.value);
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
                               Pecahan Sepuluh Ribu
                              </Label>
                              <Col sm={7}>
                                <Input
                                  type="text"
                                  name="nomorPart"
                                  placeholder="Pecahan Sepuluh Ribu"
                                  value={pecahansepuluhribu}
                                  onChange={(e) => {
                                    setPecahanSepuluhRibu(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Pecahan Dua Puluh Ribu
                              </Label>
                              <Col sm={7}>
                                <Input
                                  type="text"
                                  name="nomorPart"
                                  placeholder="Pecahan Dua Puluh Ribu"
                                  value={pecahanduapuluhribu}
                                  onChange={(e) => {
                                    setPecahanDuapuluhRibu(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Pecahan Lima Puluh Ribu
                              </Label>
                              <Col sm={7}>
                                <Input
                                  type="text"
                                  name="nomorPart"
                                  placeholder="Pecahan Lima Puluh Ribu"
                                  value={pecahanlimapuluhribu}
                                  onChange={(e) => {
                                    setPecahanLimapuluhRibu(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Pecahan Tujuh Puluh Lima Ribu
                              </Label>
                              <Col sm={7}>
                                <Input
                                  type="text"
                                  name="nomorPart"
                                  placeholder="Pecahan Tujuh Puluh Lima Ribu"
                                  value={pecahantujuhlimaribu}
                                  onChange={(e) => {
                                    setPecahanTujuhLimaRibu(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Pecahan Seratus Ribu
                              </Label>
                              <Col sm={7}>
                                <Input
                                  type="text"
                                  name="nomorPart"
                                  placeholder="Pecahan Seratus Ribu"
                                  value={pecahanseratusribu}
                                  onChange={(e) => {
                                    setPecahanSeratusRibu(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                          </Col>
                      </Row>
                    </CardBody>
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
                    <Link className="btn btn-info" to="/admin/kasir-sales-order/so-kasir">
                    Kembali
                    </Link>
                </CardFooter>
                </Form>
              </Card>
          </div>
        </Row>
    </Container>
    </>
  );
}