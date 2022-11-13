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

export default function CreateItemMerek() {
  const token = localStorage.token;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(null);

  const validateForm = () => {
    let error = false;
    if (name === "") {
      setNameError("invalid");
      error = true;
    }
    return error;
  };

  function CreateData() {
    setLoading(true);
    let data = {
      name: name,
    }
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/merek/save`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(function (response) {
        history.push("/admin/item");
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
      <SimpleHeader name="Daftar Item Merek" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit} >
                  <CardHeader>
                    <h3>Daftar Item Merek</h3>
                  </CardHeader>
                  <CardBody>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Nama Merek
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        autoComplete="off"
                        type="text"
                        name="nameMerek"
                        placeholder="Masukan Nama Merek"
                        value={name}
                        invalid={nameError === "invalid"}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (e.target.value !== "") {
                            setNameError("");
                          }
                        }}
                      />
                      <FormFeedback>Nama Merek tidak boleh kosong</FormFeedback>
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
                    <Link className="btn btn-info" to="/admin/item">
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
