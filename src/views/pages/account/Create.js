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
  Form, FormFeedback
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function CreateAccount() {
  const token = localStorage.token;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);

  const [nameAccount1, setNameAccount1] = useState("");
  const [nameAccount1Error, setNameAccount1Error] = useState(null);
  const [nameAccount2, setNameAccount2] = useState("");
  const [nameAccount2Error, setNameAccount2Error] = useState(null);

  const validateForm = () => {
    let error = false;
    if (nameAccount1 === "") {
      setNameAccount1Error("invalid");
      error = true;
    }
    if (nameAccount2 === "") {
      setNameAccount2Error("invalid");
      error = true;
    }
    return error;
  };

  function CreateData() {
    setLoading(true);
    let data = {
      // account_name: nameAccount1,
      // account_name2: nameAccount2,
      // parent_flag: null,
      // parent_id: null,
      // active_flag: 1,
      // neraca_flag: 1,
      // status_flag: 1,
      // primary_flag: 1,
      // account_type_id: 0,
      // account_code: ""
      account_code:"",
      parent_flag:0,
      parent_id:0,
      account_name:nameAccount1,
      active_flag:1,
      neraca_flag:1,
      status_flag:1,
      account_type_id:0,
      primary_flag:1,
      account_name2:nameAccount2
    }
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/account/save`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(function (response) {
        history.push("/admin/account");
      })
      .then(json => {
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      CreateData();
    }
  }
  return (
    <>
      <SimpleHeader name="Daftar Account" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit} >
                  <CardHeader>
                    <h3>Daftar Account</h3>
                  </CardHeader>
                  <CardBody>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Nama Account 1
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                      autoComplete="off"
                        type="text"
                        name="alamat"
                        placeholder="Masukan Alamat"
                        value={nameAccount1}
                        invalid={nameAccount1Error === "invalid"}
                        onChange={(e) => {
                          setNameAccount1(e.target.value);
                          if (e.target.value !== "") {
                            setNameAccount1Error("");
                          }
                        }}
                      />
                      <FormFeedback>
                        Nama Account 1 tidak boleh kosong
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Nama Account 2
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                      autoComplete="off"
                        type="text"
                        name="phoneNumber"
                        placeholder="Masukan Nomor Telpon"
                        value={nameAccount2}
                        invalid={nameAccount2Error === "invalid"}
                        onChange={(e) => {
                          setNameAccount2(e.target.value);
                          if (e.target.value !== "") {
                            setNameAccount2Error("");
                          }
                        }}
                      />
                      <FormFeedback>
                        Nama Account 2 tidak boleh kosong
                      </FormFeedback>
                    </FormGroup>
                  </CardBody>
                  <CardFooter>
                    {!isLoading && (<Button color="primary" type="submit">
                      Simpan
                    </Button>)}
                    {isLoading && (<Button color="primary" disabled>
                      <i className="fas fa-spinner fa-spin"></i>{""}
                      loading...
                    </Button>)}
                    <Link className="btn btn-info" to="/admin/account">
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
