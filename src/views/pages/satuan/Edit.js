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

export default function EditSatuan(props) {
  const token = localStorage.token;
  const warehouse = parseInt(localStorage.warehouse);
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);

  const [codeUom, setCodeUom] = useState("");
  const [codeUomError, setCodeUomError] = useState(null);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(null);

  const validateForm = () => {
    let error = false;
    if (codeUom === "") {
      setCodeUomError("invalid");
      error = true;
    }
    if (description === "") {
        setDescriptionError("invalid");
        error = true;
      }
    return error;
  };

  useEffect(() => {
    getSatuanById();
  }, []);

  const getSatuanById = () => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/uom/${props.match.params.id}`, { headers
    })
    .then(data => {
        setCodeUom(data.data.response.uom_code);
        setDescription(data.data.response.description);
    })
      .catch(function (error) {
        console.log(error)
      })
  }

  function EditData() {
    setLoading(true);
    let data = {
      id: parseInt(props.match.params.id),
      uom_code: codeUom,
      description: description,
      base_uom_flag: 1,
      active_flag: 1,
      primary_flag: 1,
    }
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/uom/update/${props.match.params.id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(function (response) {
        history.push("/admin/satuan");
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
      EditData();
    }
  }
  return (
    <>
      <SimpleHeader name="Edit Satuan" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit} >
                  <CardHeader>
                    <h3>Edit Satuan</h3>
                  </CardHeader>
                  <CardBody>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Kode Satuan
                        <span className="text-danger">*</span>
                                            </Label>
                      <Input
                        type="text"
                        name="satuan"
                        placeholder="Masukan Kode Satuan"
                        value={codeUom}
                        invalid={codeUomError === "invalid"}
                        onChange={(e) => {
                          setCodeUom(e.target.value);
                          if (e.target.value !== "") {
                            setCodeUomError("");
                          }
                        }}
                      />
                      <FormFeedback>
                        Kode Satuan tidak boleh kosong
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Deskripsi
                        <span className="text-danger">*</span>
                                            </Label>
                      <Input
                        type="text"
                        name="deskripsi"
                        placeholder="Masukan Deskripsi"
                        value={description}
                        invalid={descriptionError === "invalid"}
                        onChange={(e) => {
                          setDescription(e.target.value);
                          if (e.target.value !== "") {
                            setDescriptionError("");
                          }
                        }}
                      />
                      <FormFeedback>
                        Deskripsi tidak boleh kosong
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
                    <Link className="btn btn-info" to="/admin/satuan">
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
