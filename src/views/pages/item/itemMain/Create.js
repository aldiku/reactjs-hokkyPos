/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  CardBody,
  Form,
  CardFooter,
  FormGroup,
  Label,
  Input,
  Container,
  CardHeader,
  FormFeedback
} from "reactstrap";

import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

const Create = () => {
  const token = localStorage.token;
  const warehouseId = localStorage.warehouse;
  const username = localStorage.username;
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [nameItem, setNameItem] = useState("");
  const [description, setDescription] = useState("");
  const [numberPart, setNumberPart] = useState("");
  const [allSatuan, setAllSatuan] = useState([]);
  const [minimumstock, setMinimumStock] = useState("");
  const [satuan, setSatuan] = useState("");
  const [allGrade, setAllGrade] = useState([]);
  const [grade, setGrade] = useState("");
  const [allAccount, setAllAccount] = useState([]);
  const [account, setAccount] = useState("");
  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [subCategoryError, setSubCategoryError] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [nameFunction, setNameFunction] = useState("");
  const [nameFunctions, setNameFunctions] = useState([]);
  const [nameSubFunction, setNameSubFunction] = useState("");
  const [nameSubFunctions, setNameSubFunctions] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [merek, setMerek] = useState("");
  const [allMerek, setAllMerek] = useState([]);
  const [submerek, setSubMerek] = useState("");
  const [allSubMerek, setAllSubMerek] = useState([]);
  const [panjang, setPanjang] = useState("");
  const [lebar, setLebar] = useState("");
  const [tinggi, setTinggi] = useState("");
  const [nameType, setNameType] = useState(1);
  const [status, setStatus] = useState([]);
  const [itemgrup, setItemGrup] = useState("");
  const [itemgrups, setItemGrups] = useState([]);
  const [berat, setBerat] = useState("");
  const [image1,setImage1] = useState("");
  const [image2,setImage2] = useState("");
  const [image3,setImage3] = useState("");
  const [codecek, setCodeCek] = useState("");
  // const [codecekError, setCodeCekError] = useState(null);
  const headers = { Authorization: `Bearer ${token}` };

  const validateForm = () => {
    let error = false;
    if (category === "") {
      setCategoryError("invalid");
      error = true;
    }
    if (subCategory === "") {
      setSubCategoryError("invalid");
      error = true;
    }
    return error;
  };

  useEffect(() => {
    getPerson();
    getSatuan();
    getCategory();
    getSubCategory();
    getFunction();
    getSubFunction();
    getMerek();
    getSubMerek();
    getGrade();
    getAccount();
    getItemGrup();
    GetCekCode();
  }, []);

  const getItemGrup = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/item-group/list`,
        { headers }
      )
      .then((data) => {
        setItemGrups(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  
const getAccount = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/account/list`, { headers })
      .then((data) => {
        setAllAccount(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getGrade = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/item-grade/list`, { headers })
      .then((data) => {
        setAllGrade(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getSatuan = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/uom/list`, { headers })
      .then((data) => {
        setAllSatuan(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getCategory = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/item-kategori/list`, {
        headers,
      })
      .then((data) => {
        setCategories(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getSubCategory = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/sub-kategori/list`,
        { headers }
      )
      .then((data) => {
        setSubCategories(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getFunction = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/item-function/list`,
        { headers }
      )
      .then((data) => {
        setNameFunctions(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getSubFunction = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/sub-function/list`,
        { headers }
      )
      .then((data) => {
        setNameSubFunctions(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getMerek = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/merek/list`,
        { headers }
      )
      .then((data) => {
        setAllMerek(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getSubMerek = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/sub-merek/list`,
        { headers }
      )
      .then((data) => {
        setAllSubMerek(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getPerson = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/person/list`,
        { headers }
      )
      .then((data) => {
        setSuppliers(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const GetCekCode = async () => {
		let filter = {
            kategori_id: parseInt(category),
            subkategori_id: parseInt(subCategory) 
		};
		const data = filter;

		const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/items/check-code`, data, { headers });
		setCodeCek(res.data.response);
	};
  

  function CreateData() {
    setLoading(true);
    CreateItem()
  }

  const CreateItem = () => {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };
    const myjson = JSON.stringify ({
      warehouse_id: parseInt(warehouseId),
      person_id: parseInt(supplier),
      username: username,
      item_description: description,
      part_number: numberPart,
      uom_id: parseInt(satuan),
      kategori_id: parseInt(category),
      subkategori_id: parseInt(subCategory),
      grade_id: parseInt(grade),
      account_id: parseInt(account),
      function_id: parseInt(nameFunction),
      subfunction_id: parseInt(nameSubFunction),
      merek_id: parseInt(merek),
      submerek_id : parseInt(submerek),
      active_flag: parseInt(status),
      ig_id: parseInt(itemgrup),
      berat : parseInt(berat),
      item_name: nameItem,
      minimum_stok : minimumstock,
      panjang,
      lebar,
      tinggi,
      stock: 0,
      type: nameType,
  });  

  let data = new FormData();
    data.append("body",myjson)
    data.append("image1",image1)
    data.append("image2",image2)
    data.append("image3",image3)
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/items/save`, data, {headers})
      .then(function (response) 
      {
        history.push("/admin/item");
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
    if (!validateForm()) {
      GetCekCode();
    }
  }

  return (
    <div>
      <SimpleHeader name="Tambah Item" parentName="Master" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
                <Card>
                <CardHeader>
                  <h3>Tambah Item</h3>
                </CardHeader>
                <CardBody>
                  <Row md="12">
                      <Col md="6">
                        <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={4}
                          >
                            Nama Item
                          </Label>
                          <Col sm={7}>
                            <Input
                            autoComplete="off"
                              className="form-control-alternative"
                              type="text"
                             
                              placeholder="Masukan Nama Item"
                              value={nameItem}
                              onChange={(e) => {
                                setNameItem(e.target.value);
                              }}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={4}
                          >
                            Supplier
                          </Label>
                          <Col sm={7}>
                            <Input
                            autoComplete="off"
                              className="form-control-alternative"
                              name="Supplier"
                              type="select"
                              value={supplier}
                              onChange={(e) => {
                                setSupplier(e.target.value);
                              }}
                            >
                              <option value="">Pilih Supplier</option>
                              {suppliers.map((suppliers, key) => {
                                return (
                                  <option key={key} value={suppliers.id}>
                                    {suppliers.person_name}
                                  </option>
                                );
                              })}
                              </Input>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={4}
                          >
                            Nomor Part
                          </Label>
                          <Col sm={7}>
                            <Input
                            autoComplete="off"
                              className="form-control-alternative"
                              type="text"
                              name="nomorPart"
                              placeholder="Masukan Nomor Part"
                              value={numberPart}
                              onChange={(e) => {
                                setNumberPart(e.target.value);
                              }}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={4}
                          >
                            Item Grup
                          </Label>
                          <Col sm={7}>
                            <Input
                            autoComplete="off"
                              className="form-control-alternative"
                              name="kategory"
                              type="select"
                              value={itemgrup}
                              onChange={(e) => {
                                setItemGrup(e.target.value);
                              }}
                            >
                              <option value="">Pilih Item Group</option>
                              {itemgrups.map((categorysss, key) => {
                                return (
                                  <option key={key} value={categorysss.id}>
                                    {categorysss.name}
                                  </option>
                                );
                              })}
                              </Input>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={4}
                          >
                            Satuan
                          </Label>
                          <Col sm={7}>
                            <Input
                            autoComplete="off"
                          className="form-control-alternative"
                          name="satuan"
                          type="select"
                          value={satuan}
                          onChange={(e) => {
                            setSatuan(e.target.value);
                          }}
                        >
                          <option value="">pilih Satuan</option>
                          {allSatuan.map((satuan, key) => {
                            return (
                              <option key={key} value={satuan.id}>
                                {satuan.description}
                              </option>
                            );
                          })}
                        </Input>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={4}
                          >
                            Dimensi
                          </Label>
                          <Col sm={2}>
                            <Input
                            autoComplete="off"
                            className="form-control-alternative"
                            type="text"
                            name="panjang"
                            placeholder="Panjang"
                            value={panjang}
                           onChange={(e) => {
                              setPanjang(e.target.value);
                            }}
                            />
                          </Col>
                          <Col sm={3}>
                            <Input
                            autoComplete="off"
                            className="form-control-alternative"
                            type="text"
                            name="lebar"
                            placeholder="Lebar"
                            value={lebar}
                            onChange={(e) => {
                              setLebar(e.target.value);
                             
                            }}
                            />
                          </Col>
                          <Col sm={2}>
                            <Input
                            autoComplete="off"
                            className="form-control-alternative"
                            type="text"
                            name="tinggi"
                            placeholder="Tinggi"
                            value={tinggi}
                            onChange={(e) => {
                              setTinggi(e.target.value);
                             
                            }}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={4}
                          >
                            Berat
                          </Label>
                          <Col sm={4}>
                            <Input
                            autoComplete="off"
                            className="form-control-alternative"
                            type="text"
                            name="Berat"
                            placeholder="Masukan Berat"
                            value={berat}
                            onChange={(e) => {
                              setBerat(e.target.value);
                              }}
                            />
                          </Col>
                          <Label
                          for="exampleEmail"
                          sm={4}
                          >
                            <b>Gram</b>
                          </Label>
                        </FormGroup>
                        <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={4}
                          >
                            Minimum Stock
                          </Label>
                          <Col sm={7}>
                            <Input
                            autoComplete="off"
                            className="form-control-alternative"
                            type="number"
                            name="Minimum Stock"
                            placeholder="Masukan Stock"
                            value={minimumstock}
                            onChange={(e) => {
                              setMinimumStock(e.target.value);
                              }}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Deskripsi Item
                              </Label>
                              <Col sm={7}>
                                <Input
                                autoComplete="off"
                                  className="form-control-alternative"
                                  type="textarea"
                                  name="descripsi"
                                  rows="8"
                                  placeholder="Masukan Deskripsi"
                                  value={description}
                                  onChange={(e) => {
                                    setDescription(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                      </Col>
                      <Col md="6">
                      <Form onSubmit={handleSubmit}>
                          <FormGroup row>
														<Label for="exampleEmail" sm={3}>
															Generate Kode Item
														</Label>
														<Col sm={6}>
                              <Input
                              autoComplete="off" 
                                  disabled
                                  className="form-control-alternative"
                                  placeholder="Generate Urutan Kode Item"
                                  name="kategory"
                                  type="text"
                                  value={codecek}
                                  onChange={(e) => {
                                    setCodeCek(e.target.value);
                                  }}
                              />
														</Col>
                            <Col sm={3}>
                              <Button color="primary" className="mb-3" type="submit"><i className="fa fa-search"></i></Button> 
														</Col> 
													</FormGroup>
                      </Form>
                        <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={3}
                          >
                            Tipe Item
                          </Label>
                          <Col sm={7}>
                            <Input
                            autoComplete="off"
                            className="form-control-alternative"
                              type="select"
                             
                              placeholder="Masukan Tipe Item"
                              value={nameType}
                              onChange={(e) => {
                                setNameType(e.target.value);
                              
                              }}
                            >
                              <option value={1}>Material</option>
                              <option value={2}>Rakitan</option>
                            </Input>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={3}
                          >
                            Kategori
                          </Label>
                          <Col sm={7}>
                            <Input
                            autoComplete="off"
                            className="form-control-alternative"
                              name="kategory"
                              type="select"
                              value={category}
                              invalid={categoryError === "invalid"}
                              onChange={(e) => {
                                setCategory(e.target.value);
                                if (e.target.value !== "") {
                                    setCategoryError("");
                                }
															}}>
                              <option value="">Pilih Kategori</option>
                                {categories.map((category, key) => {
                                  return (
                                    <option key={key} value={category.id}>
                                      {category.name}
                                    </option>
                                  );
                                })}
                              </Input>
                              <FormFeedback>
                                Kategori Tidak Boleh Kosong
                              </FormFeedback>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={3}
                          >
                            Sub Kategori
                          </Label>
                          <Col sm={7}>
                            <Input
                            autoComplete="off"
                                  className="form-control-alternative"
                                  name="subKategory"
                                  type="select"
                                  value={subCategory}
                                  invalid={subCategoryError === "invalid"}
                                  onChange={(e) => {
                                  setSubCategory(e.target.value);
                                  if (e.target.value !== "") {
                                      setSubCategoryError("");
                                  }
															  }}>
                                  <option value="">Pilih Sub Kategori</option>
                              {subCategories.map((category, key) => {
                                return (
                                  <option key={key} value={category.id}>
                                    {category.name}
                                  </option>
                                );
                              })}
                            </Input>
                            <FormFeedback>
                              Sub Kategori tidak boleh kosong
                            </FormFeedback>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={3}
                          >
                            Function
                          </Label>
                          <Col sm={7}>
                            <Input
                            autoComplete="off"
                            className="form-control-alternative"
                              name="function"
                              type="select"
                              value={nameFunction}
                              onChange={(e) => {
                                setNameFunction(e.target.value);
                              }}
                            >
                              <option value="">Pilih Function</option>
                              {nameFunctions.map((nameFunction, key) => {
                                return (
                                  <option key={key} value={nameFunction.id}>
                                    {nameFunction.name}
                                  </option>
                                );
                              })}
                            </Input>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={3}
                          >
                            Sub Function
                          </Label>
                          <Col sm={7}>
                            <Input
                            autoComplete="off"
                            className="form-control-alternative"
                              name="subFunction"
                              type="select"
                              value={nameSubFunction}
                              onChange={(e) => {
                                setNameSubFunction(e.target.value);
                              }}
                            >
                              <option value="">Pilih Sub Function</option>
                              {nameSubFunctions.map((nameFunction, key) => {
                                return (
                                  <option key={key} value={nameFunction.id}>
                                    {nameFunction.name}
                                  </option>
                                );
                              })}
                            </Input>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={3}
                          >
                            Merek
                          </Label>
                          <Col sm={7}>
                            <Input
                            autoComplete="off"
                            className="form-control-alternative"
                              name="merek"
                              type="select"
                              value={merek}
                              onChange={(e) => {
                                setMerek(e.target.value);
                              }}
                            >
                              <option value="">Pilih Merek</option>
                              {allMerek.map((m, key) => {
                                return (
                                  <option key={key} value={m.id}>
                                    {m.name}
                                  </option>
                                );
                              })}
                            </Input>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={3}
                          >
                            Sub Merk
                          </Label>
                          <Col sm={7}>
                            <Input
                            autoComplete="off"
                            className="form-control-alternative"
                              name="merek"
                              type="select"
                              value={submerek}
                              onChange={(e) => {
                                setSubMerek(e.target.value);
                              }}
                            >
                              <option value="">Pilih Merek</option>
                              {allSubMerek.map((m, key) => {
                                return (
                                  <option key={key} value={m.id}>
                                    {m.name}
                                  </option>
                                );
                              })}
                            </Input>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={3}
                          >
                            Grade
                          </Label>
                          <Col sm={7}>
                          <Input
                          className="form-control-alternative"
                          name="grade"
                          type="select"
                          value={grade}
                          onChange={(e) => {
                            setGrade(e.target.value);
                            }}
                        >
                          <option value="">Pilih Grade</option>
                          {allGrade.map((a, key) => {
                            return (
                              <option key={key} value={a.id}>
                                {a.nilai}
                              </option>
                            );
                          })}
                        </Input>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={3}
                          >
                            Account
                          </Label>
                          <Col sm={7}>
                            <Input
                            autoComplete="off"
                            className="form-control-alternative"
                              name="account"
                              type="select"
                              value={account}
                              onChange={(e) => {
                                setAccount(e.target.value);
                                }}
                            >
                              <option value="">Pilih Account</option>
                              {allAccount.map((a, key) => {
                                return (
                                  <option key={key} value={a.id}>
                                    {a.account_name}
                                  </option>
                                );
                              })}
                              </Input>
                          </Col>
                        </FormGroup>
                      </Col>
                  </Row>
                </CardBody>
                </Card>
                <Card>
                <CardHeader>
                  <h3>Upload Gambar</h3>
                </CardHeader>
                <CardBody>
                  <Row md="12">
                      <Col md="6">
                        <FormGroup row>
                            <Label
                                for="exampleEmail"
                                sm={4}
                            >
                                Gambar 1
                            </Label>
                            <Col sm={7}>
                            <Input
                            autoComplete="off"
                                className="form-control-alternative"
                                id="exampleFile"
                                name="file"
                                type="file"
                                onChange={(event) => {
                                    setImage1(event.target.files[0]);
                                }}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label
                                for="exampleEmail"
                                sm={4}
                            >
                                Gambar 2
                            </Label>
                            <Col sm={7}>
                            <Input
                            autoComplete="off"
                            className="form-control-alternative"
                                id="exampleFile"
                                name="file"
                                type="file"
                                onChange={(event) => {
                                  setImage2(event.target.files[0]);
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
                                Gambar 3
                            </Label>
                            <Col sm={7}>
                            <Input
                            autoComplete="off"
                            className="form-control-alternative"
                                id="exampleFile"
                                name="file"
                                type="file"
                                onChange={(event) => {
                                  setImage3(event.target.files[0]);
                                }}
                                />
                            </Col>
                        </FormGroup>
                      </Col>
                  </Row>
                </CardBody>            
                </Card>
                <CardFooter>
                    {!isLoading && (
                      <Button color="primary" onClick={() => CreateData()}>
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
                    <Link className="btn btn-info" to="/admin/item">
                      Kembali
                    </Link>
                </CardFooter>
          </div>
        </Row>
      </Container>
    </div>
    
  );
};

export default Create;