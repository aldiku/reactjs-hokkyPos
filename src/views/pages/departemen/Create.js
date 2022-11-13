/*eslint-disable*/
import React, { useState } from "react";
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

export default function CreateDepartmen() {
  const token = localStorage.token;
  const warehouse = parseInt(localStorage.warehouse);
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);

  const [nameDepartment, setNameDepartment] = useState("");
  const [nameDepartmentError, setNameDepartmentError] = useState(null);
  const [codeDepartment, setCodeDepartment] = useState("");
  const [codeDepartmentError, setCodeDepartmentError] = useState(null);

  const validateForm = () => {
    let error = false;
    if (nameDepartment === "") {
      setNameDepartmentError("invalid");
      error = true;
    }
    if (codeDepartment === "") {
        setCodeDepartmentError("invalid");
        error = true;
      }
    return error;
  };

  function CreateData() {
    setLoading(true);
    let data = {
        department_name: nameDepartment,
        department_code: codeDepartment,
        id_warehouse: parseInt(warehouse)
    }
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/department/save`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(function (response) {
        history.push("/admin/departemen");
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
      <SimpleHeader name="Daftar Departemen" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit} >
                  <CardHeader>
                    <h3>Daftar Departemen</h3>
                  </CardHeader>
                  <CardBody>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Nama Departemen
                        <span className="text-danger">*</span>
                                            </Label>
                      <Input
                        type="text"
                        name="nama"
                        placeholder="Masukan Nama Departemen"
                        value={nameDepartment}
                        invalid={nameDepartmentError === "invalid"}
                        onChange={(e) => {
                          setNameDepartment(e.target.value);
                          if (e.target.value !== "") {
                            setNameDepartmentError("");
                          }
                        }}
                      />
                      <FormFeedback>
                        Nama Departemen tidak boleh kosong
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Kode Departemen
                        <span className="text-danger">*</span>
                                            </Label>
                      <Input
                        type="text"
                        name="kode"
                        placeholder="Masukan Kode Departemen"
                        value={codeDepartment}
                        invalid={codeDepartmentError === "invalid"}
                        onChange={(e) => {
                          setCodeDepartment(e.target.value);
                          if (e.target.value !== "") {
                            setCodeDepartmentError("");
                          }
                        }}
                      />
                      <FormFeedback>
                        Kode Departemen tidak boleh kosong
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
                    <Link className="btn btn-info" to="/admin/departemen">
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
