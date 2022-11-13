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
  
} from "reactstrap";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

const CreateSettlementKasir = () => {
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
    };
    axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/chasier-settlement/save`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          history.push("/admin/kasir-sales-order/so-kasir");
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

  const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

  return (
    <>
    <SimpleHeader name="Isikan Modal" parentName="SO" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
              <Card>
                <Form onSubmit={handleSubmit}>
                <CardBody>
                    <CardHeader>
                      <h3>Isikan Modal</h3>
                    </CardHeader>
                    <CardBody>
                      <Row md="12">
                          <Col md="6">
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Nominal Modal
                              </Label>
                              <Col sm={7}>
                                <Input
                                className="form-control-alternative"
                                  autoComplete="off"
                                  type="text"
                                  name="nomorPart"
                                  placeholder="Isikan Modal"
                                  value={modal1}
                                  onChange={(e) => {
                                    setModal1(e.target.value);
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
                      <Link className="btn btn-info" to="/admin/kasir-sales-order">
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

export default CreateSettlementKasir;