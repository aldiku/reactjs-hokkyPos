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

export default function CreateItemSubFunction() {
  const token = localStorage.token;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [category, setCategory] = useState("")
  const [categoryError, setCategoryError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [subCategoryError, setSubCategoryError] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [nameFunction, setNameFunction] = useState("")
  const [nameFunctionError, setNameFunctionError ] = useState(null);
  const [nameFunctions, setNameFunctions] = useState([]);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(null);

  const validateForm = () => {
    let error = false;
    if (name === "") {
      setNameError("invalid");
      error = true;
    }
    if (category === "") {
      setCategoryError("invalid");
      error = true;
    }
    if (subCategory === "") {
      setSubCategoryError("invalid");
      error = true;
    }
    if (nameFunction === "") {
      setNameFunctionError("invalid");
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

  const getSubCategory = (id) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/sub-kategori/list?kategori_id=${id}`, { headers
    })
    .then(data => {
      setSubCategories(data.data.response);
    })
      .catch(function (error) {
        console.log(error)
      })
  }

  const getFunction = (id) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/item-function/list?kategori_id=${categoryId}&sub_kategori_id=${id}`, { headers
    })
    .then(data => {
      setNameFunctions(data.data.response);
    })
      .catch(function (error) {
        console.log(error)
      })
  }


  function CreateData() {
    setLoading(true);
    let data = {
      name: name,
      kategori_id: parseInt(category),
      sub_kategori_id: parseInt(subCategory),
      function_id: parseInt(nameFunction)
    }
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/sub-function/save`, data, {
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
      <SimpleHeader name="Daftar Item Sub Function" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit} >
                  <CardHeader>
                    <h3>Daftar Item Sub Function</h3>
                  </CardHeader>
                  <CardBody>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Nama Sub Function
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        name="nameFunction"
                        placeholder="Masukan Nama Sub Function"
                        value={name}
                        invalid={nameError === "invalid"}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (e.target.value !== "") {
                            setNameError("");
                          }
                        }}
                      />
                      <FormFeedback>Nama Function tidak boleh kosong</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Kategori
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="kategory"
                        type="select"
                        value={category}
                        invalid={categoryError === "invalid"}
                        onChange={(e) => {
                          setCategory(e.target.value);
                          setCategoryId(e.target.value);
                          if (e.target.value !== "") {
                            setCategoryError("");
                          }
                          getSubCategory(e.target.value);
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
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Sub Kategori
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="subKategory"
                        type="select"
                        value={subCategory}
                        invalid={subCategoryError === "invalid"}
                        onChange={(e) => {
                          setSubCategory(e.target.value);
                          if (e.target.value !== "") {
                            setSubCategoryError("");
                          }
                          getFunction(e.target.value);
                        }}
                      >
                        <option value="">Pilih Sub Kategori</option>
                        {
                          subCategories.map((category, key) => {
                            return <option key={key} value={category.id}>{category.name}</option>
                          })
                        }
                      </Input>
                      <FormFeedback>Sub Kategori tidak boleh kosong</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Function
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="function"
                        type="select"
                        value={nameFunction}
                        invalid={nameFunctionError === "invalid"}
                        onChange={(e) => {
                          setNameFunction(e.target.value);
                          if (e.target.value !== "") {
                            setNameFunctionError("");
                          }
                        }}
                      >
                        <option value="">Pilih Function</option>
                        {
                          nameFunctions.map((nameFunction, key) => {
                            return <option key={key} value={nameFunction.id}>{nameFunction.name}</option>
                          })
                        }
                      </Input>
                      <FormFeedback>Function tidak boleh kosong</FormFeedback>
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
