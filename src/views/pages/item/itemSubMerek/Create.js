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
  const [merek, setMerek] = useState("")
  const [merekError, setMerekError ] = useState(null);
  const [mereks, setMereks] = useState([]);
  const [submerek, setSubMerek] = useState("")
  const [submerekError, setSubMerekError ] = useState(null);

  const validateForm = () => {
    let error = false;
    if (merek === "") {
      setMerekError("invalid");
      error = true;
    }
    return error;
  };

  useEffect(() => {
    getMerek();
  }, []);

  const getMerek = () => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/merek/list`, { headers
    })
    .then(data => {
      setMereks(data.data.response);
    })
      .catch(function (error) {
        console.log(error)
      })
  }


  function CreateData() {
    setLoading(true);
    let data = {
      merek_id:  parseInt(merek),
      name : submerek
    }
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/sub-merek/save`, data, {
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
      <SimpleHeader name="Daftar Sub Merek" parentName="Master" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit} >
                  <CardHeader>
                    <h3>Daftar Sub Merek</h3>
                  </CardHeader>
                  <CardBody>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Sub Merek
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        name="nameMerek"
                        placeholder="Masukan Nama Merek"
                        value={submerek}
                        invalid={submerekError === "invalid"}
                        onChange={(e) => {
                          setSubMerek(e.target.value);
                          if (e.target.value !== "") {
                            setSubMerekError("");
                          }
                        }}
                      />
                      <FormFeedback>Nama Merek tidak boleh kosong</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Merek
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="kategory"
                        type="select"
                        value={merek}
                        invalid={merekError === "invalid"}
                        onChange={(e) => {
                          setMerek(e.target.value);
                          if (e.target.value !== "") {
                            setMerekError("");
                          }
                        }}
                      >
                        <option value="">Pilih Merek</option>
                        {
                          mereks.map((category, key) => {
                            return <option key={key} value={category.id}>{category.name}</option>
                          })
                        }
                      </Input>
                      <FormFeedback>Merek tidak boleh kosong</FormFeedback>
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
