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

export default function CreateItemSubCategory() {
  const token = localStorage.token;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);

  const [nameSubCategory, setNameSubCategory] = useState("");
  const [nameSubCategoryError, setNameSubCategoryError] = useState(null);
  const [category, setCategory] = useState("")
  const [categoryError, setCategoryError] = useState(null);
  const [categories, setCategories] = useState([]);

  const validateForm = () => {
    let error = false;
    if (nameSubCategory === "") {
      setNameSubCategoryError("invalid");
      error = true;
    }
    if (category === "") {
      setCategoryError("invalid");
      error = true;
    }
    return error;
  };

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/item-kategori/list`, { headers
    })
    .then(data => {
        setCategories(data.data.response);
    })
      .catch(function (error) {
        console.log(error)
      })
  }

  function CreateData() {
    setLoading(true);
    let data = {
      name: nameSubCategory,
      kategori_id: parseInt(category),
    }
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/sub-kategori/save`, data, {
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
      <SimpleHeader name="Daftar Sub Kategori" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit} >
                  <CardHeader>
                    <h3>Daftar Sub Kategori</h3>
                  </CardHeader>
                  <CardBody>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Nama Sub Kategori
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        name="NamaCoa"
                        placeholder="Masukan Nama Coa"
                        value={nameSubCategory}
                        invalid={nameSubCategoryError === "invalid"}
                        onChange={(e) => {
                          setNameSubCategory(e.target.value);
                          if (e.target.value !== "") {
                            setNameSubCategoryError("");
                          }
                        }}
                      />
                      <FormFeedback>Nama Sub Kategori tidak boleh kosong</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Kategory
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="kategory"
                        type="select"
                        value={category}
                        invalid={categoryError === "invalid"}
                        onChange={(e) => {
                          setCategory(e.target.value);
                          if (e.target.value !== "") {
                            setCategoryError("");
                          }
                        }}
                      >
                        <option value="">Pilih Kategori</option>
                        {
                          categories.map((category, key) => {
                            return <option key={key} value={category.id}>{category.name}</option>
                          })
                        }
                      </Input>
                      <FormFeedback>Kategori tidak boleh kosong</FormFeedback>
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
