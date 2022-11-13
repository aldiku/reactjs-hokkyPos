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

export default function EditTypeAsset(props) {
  const token = localStorage.token;
  const warehouse = parseInt(localStorage.warehouse);
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

  useEffect(() => {
    getAssetById();
  }, []);

  const getAssetById = () => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/asset-type/${props.match.params.id}`, { headers
    })
    .then(data => {
        setName(data.data.response.name);
    })
      .catch(function (error) {
        console.log(error)
      })
  }

  function EditData() {
    setLoading(true);
    let data = {
      name: name,
    }
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/asset-type/update/${props.match.params.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(function (response) {
        history.push("/admin/type-asset");
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
      <SimpleHeader name="Edit Type Asset" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit} >
                  <CardHeader>
                    <h3>Edit Type Asset</h3>
                  </CardHeader>
                  <CardBody>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Nama
                        <span className="text-danger">*</span>
                                            </Label>
                      <Input
                        type="text"
                        name="nama"
                        placeholder="Masukan Nama Asset"
                        value={name}
                        invalid={nameError === "invalid"}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (e.target.value !== "") {
                            setNameError("");
                          }
                        }}
                      />
                      <FormFeedback>
                        Nama tidak boleh kosong
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
                    <Link className="btn btn-info" to="/admin/type-asset">
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
