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
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  
} from "reactstrap";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function EditBank(props) {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [accountname,setAccountName] = useState("");
  const [accountnumber,setAccountNumber] = useState("");
  const [bankname,setBankName] = useState("");

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
        `${process.env.REACT_APP_API_BASE_URL}/bank/get/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        setAccountName(data.data.response.account_name);
        setAccountNumber(data.data.response.account_number);
        setBankName(data.data.response.bank_name);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function EditData() {
    setLoading(true);
    let data = {
      warehouse_id : parseInt(warehouse),
      username : username,
      account_name: accountname,
      account_number: accountnumber,
      bank_name: bankname,
    };
    axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/bank/update/${props.match.params.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          history.push("/admin/bank");
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
    <SimpleHeader name="Bank" parentName="Master" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
              <Card>
                <Form onSubmit={handleSubmit}>
                <CardBody>
                    <CardHeader>
                      <h3>Bank</h3>
                    </CardHeader>
                    <CardBody>
                      <Row md="12">
                          <Col md="6">
                          <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Nama Akun Bank
                              </Label>
                              <Col sm={7}>
                                <Input
                                autoComplete="off"
                                  type="text"
                                  name="desc"
                                  placeholder="Masukan Nama Akun Bank"
                                  value={accountname}
                                  onChange={(e) => {
                                    setAccountName(e.target.value);
                                  }}
                                />
                               </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Nomer Akun Bank
                              </Label>
                              <Col sm={7}>
                                <Input
                                autoComplete="off"
                                  type="text"
                                  name="desc"
                                  placeholder="Masukan Nomer Akun Bank"
                                  value={accountnumber}
                                  onChange={(e) => {
                                    setAccountNumber(e.target.value);
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
                                Bank 
                              </Label>
                              <Col sm={7}>
                                <Input
                                autoComplete="off"
                                  type="text"
                                  name="desc"
                                  placeholder="Masukan Bank"
                                  value={bankname}
                                  onChange={(e) => {
                                    setBankName(e.target.value);
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
                      <Link className="btn btn-info" to="/admin/bank">
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