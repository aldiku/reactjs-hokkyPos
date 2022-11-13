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

export default function CreateItemGrade() {
  const token = localStorage.token;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);

  const [nilai, setNilai] = useState("");
  const [nilaiError, setNilaiError] = useState(null);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(null);

  const validateForm = () => {
    let error = false;
    if (nilai === "") {
      setNilaiError("invalid");
      error = true;
    }
    if (description === "") {
      setDescriptionError("invalid");
      error = true;
    }
    return error;
  };


  function CreateData() {
    setLoading(true);
    let data = {
      nilai: nilai,
      keterangan: description,
      active_flag: 1,
      is_default: 1,
    }
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/item-grade/save`, data, {
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
      <SimpleHeader name="Daftar Item Grade" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit} >
                  <CardHeader>
                    <h3>Daftar Item Grade</h3>
                  </CardHeader>
                  <CardBody>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Nilai
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        name="nilai"
                        placeholder="Masukan Nilai"
                        value={nilai}
                        invalid={nilaiError === "invalid"}
                        onChange={(e) => {
                          setNilai(e.target.value);
                          if (e.target.value !== "") {
                            setNilaiError("");
                          }
                        }}
                      />
                      <FormFeedback>Nilai tidak boleh kosong</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Keterangan
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        name="desc"
                        placeholder="Masukan Keterangan"
                        value={description}
                        invalid={descriptionError === "invalid"}
                        onChange={(e) => {
                          setDescription(e.target.value);
                          if (e.target.value !== "") {
                            setDescriptionError("");
                          }
                        }}
                      />
                      <FormFeedback>Keterangan tidak boleh kosong</FormFeedback>
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
