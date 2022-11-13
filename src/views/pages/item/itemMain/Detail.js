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
  Form,
  FormFeedback,
  Col,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function EditItem(props) {
  const token = localStorage.token;
  const warehouseId = localStorage.warehouse;
  const username = localStorage.username;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);

  const [allWarehouse, setAllWarehouse] = useState([]);
  const [warehouse, setWaresouse] = useState("");
  const [warehouseError, setWaresouseError] = useState(null);
  const [nameItem, setNameItem] = useState("");
  const [nameItemError, setNameItemError] = useState(null);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(null);
  const [barcode, setBarcode] = useState("");
  const [barcodeError, setBarcodeError] = useState(null);
  const [numberPart, setNumberPart] = useState("");
  const [allSatuan, setAllSatuan] = useState([]);
  const [satuan, setSatuan] = useState("");
  const [satuanError, setSatuanError] = useState(null);
  const [uom, setUom] = useState("");
  const [uomError, setUomError] = useState(null);
  const [allGrade, setAllGrade] = useState([]);
  const [grade, setGrade] = useState("");
  const [gradeError, setGradeError] = useState(null);
  const [allAccount, setAllAccount] = useState([]);
  const [account, setAccount] = useState("");
  const [accountError, setAccountError] = useState(null);

  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [subCategoryError, setSubCategoryError] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [nameFunction, setNameFunction] = useState("");
  const [nameFunctionError, setNameFunctionError] = useState(null);
  const [nameFunctions, setNameFunctions] = useState([]);
  const [nameSubFunction, setNameSubFunction] = useState("");
  const [nameSubFunctionError, setNameSubFunctionError] = useState(null);
  const [nameSubFunctions, setNameSubFunctions] = useState([]);
  const [functionId, setFunctionId] = useState("");
  const [allMerek, setAllMerek] = useState([]);
  const [merek, setMerek] = useState("");
  const [merekError, setMerekError] = useState(null);

  const [panjang, setPanajang] = useState("");
  const [panjangError, setPanajangError] = useState(null);
  const [lebar, setLebar] = useState("");
  const [lebarError, setLabarError] = useState(null);
  const [tinggi, setTinggi] = useState("");
  const [tinggiError, setTinggiError] = useState(null);
  const [stock, setStock] = useState("");
  const [stockError, setStockError] = useState(null);

  const [itemCode, setItemCode] = useState("");

  useEffect(() => {
    getById();
  }, []);

  const getById = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/items/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        getWarehouse(data.data.response.items.warehouse_id);
        getSatuan(data.data.response.items.uom_id);
        getGrade(data.data.response.items.grade_id);
        getAccount(data.data.response.items.account_id);
        getCategory(data.data.response.items.kategori_id);
        getSubCategory(
          data.data.response.items.kategori_id,
          data.data.response.items.subkategori_id
        );
        getFunction(
          data.data.response.items.kategori_id,
          data.data.response.items.subkategori_id,
          data.data.response.items.function_id
        );
        getSubFunction(
          data.data.response.items.kategori_id,
          data.data.response.items.subkategori_id,
          data.data.response.items.function_id,
          data.data.response.items.subfunction_id
        );
        getMerek(
          data.data.response.items.kategori_id,
          data.data.response.items.subkategori_id,
          data.data.response.items.function_id,
          data.data.response.items.subfunction_id,
          data.data.response.items.merek_id
        );
        setNameItem(data.data.response.items.item_name);
        setDescription(data.data.response.items.item_description);
        setBarcode(data.data.response.items.barcode);
        setNumberPart(data.data.response.items.part_number);
        setPanajang(data.data.response.items.panjang);
        setLebar(data.data.response.items.lebar);
        setTinggi(data.data.response.items.tinggi);
        setStock(data.data.response.items.stock);
        setItemCode(data.data.response.items.item_code);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getWarehouse = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/warehouse/list/all`, {
        headers,
      })
      .then((data) => {
        setAllWarehouse(data.data.response);
        setWaresouse(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getAccount = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/account/list`, { headers })
      .then((data) => {
        setAllAccount(data.data.response);
        setAccount(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getGrade = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/item-grade/list`, { headers })
      .then((data) => {
        setAllGrade(data.data.response);
        setGrade(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getSatuan = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/uom/list`, { headers })
      .then((data) => {
        setAllSatuan(data.data.response);
        setSatuan(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getCategory = (id) => {
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
        setCategory(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getSubCategory = (kategoriId, id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/sub-kategori/list?kategori_id=${kategoriId}`,
        { headers }
      )
      .then((data) => {
        setSubCategories(data.data.response);
        setSubCategory(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getFunction = (kategoriId, subKategoriId, id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/item-function/list?kategori_id=${kategoriId}&sub_kategori_id=${subKategoriId}`,
        { headers }
      )
      .then((data) => {
        setNameFunctions(data.data.response);
        setNameFunction(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getSubFunction = (kategoriId, subKategoriId, functionId, id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/sub-function/list?kategori_id=${kategoriId}&sub_kategori_id=${subKategoriId}&function_id=${functionId}`,
        { headers }
      )
      .then((data) => {
        setNameSubFunctions(data.data.response);
        setNameSubFunction(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getMerek = (
    kategoriId,
    subKategoriId,
    functionId,
    subFunctionId,
    id
  ) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/merek/list?kategori_id=${kategoriId}&sub_kategori_id=${subKategoriId}&function_id=${functionId}&sub_function_id=${subFunctionId}`,
        { headers }
      )
      .then((data) => {
        setAllMerek(data.data.response);
        setMerek(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <SimpleHeader name="Detail Item" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form>
                  <CardHeader>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h3>Detail Item</h3>
                      <Link
                        className="btn btn-info text-right"
                        to="/admin/item"
                      >
                        Kembali
                      </Link>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Warehouse
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        disabled
                        name="warehouse"
                        type="select"
                        value={warehouse}
                        invalid={warehouseError === "invalid"}
                        onChange={(e) => {
                          setWaresouse(e.target.value);
                          if (e.target.value !== "") {
                            setWaresouseError("");
                          }
                        }}
                      >
                        <option value="">Pilih Warehouse</option>
                        {allWarehouse.map((wh, key) => {
                          return (
                            <option key={key} value={wh.id}>
                              {wh.name}
                            </option>
                          );
                        })}
                      </Input>
                      <FormFeedback>Warehouse tidak boleh kosong</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Kode Item
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        disabled
                        type="text"
                        name="itemCode"
                        placeholder="Masukan Kode Item"
                        value={itemCode}
                        onChange={(e) => {
                          setItemCode(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Nama Item
                      </Label>
                      <Input
                        disabled
                        type="text"
                        placeholder="Masukan Nama Item"
                        value={nameItem}
                        invalid={nameItemError === "invalid"}
                        onChange={(e) => {
                          setNameItem(e.target.value);
                          if (e.target.value !== "") {
                            setNameItemError("");
                          }
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Deskripsi Item
                      </Label>
                      <Input
                        disabled
                        type="text"
                        name="desc"
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
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Barcode
                      </Label>
                      <Input
                        disabled
                        type="text"
                        name="barcode"
                        placeholder="Masukan Barcode"
                        value={barcode}
                        invalid={barcodeError === "invalid"}
                        onChange={(e) => {
                          setBarcode(e.target.value);
                          if (e.target.value !== "") {
                            setBarcodeError("");
                          }
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Nomor Part
                      </Label>
                      <Input
                        disabled
                        type="text"
                        name="nomorPart"
                        placeholder="Masukan Nomor Part"
                        value={numberPart}
                        onChange={(e) => {
                          setNumberPart(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Satuan
                      </Label>
                      <Input
                        disabled
                        name="satuan"
                        type="select"
                        value={satuan}
                        invalid={satuanError === "invalid"}
                        onChange={(e) => {
                          setSatuan(e.target.value);
                          if (e.target.value !== "") {
                            setSatuanError("");
                          }
                        }}
                      >
                        <option value="">Pilih Satuan</option>
                        {allSatuan.map((s, key) => {
                          return (
                            <option key={key} value={s.id}>
                              {s.description}
                            </option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Grade
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        disabled
                        name="grade"
                        type="select"
                        value={grade}
                        invalid={gradeError === "invalid"}
                        onChange={(e) => {
                          setGrade(e.target.value);
                          if (e.target.value !== "") {
                            setGradeError("");
                          }
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
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Account
                      </Label>
                      <Input
                        disabled
                        name="account"
                        type="select"
                        value={account}
                        invalid={accountError === "invalid"}
                        onChange={(e) => {
                          setAccount(e.target.value);
                          if (e.target.value !== "") {
                            setAccountError("");
                          }
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
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Kategori
                      </Label>
                      <Input
                        disabled
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
                        {categories.map((category, key) => {
                          return (
                            <option key={key} value={category.id}>
                              {category.name}
                            </option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Sub Kategori
                      </Label>
                      <Input
                        disabled
                        name="subKategory"
                        type="select"
                        value={subCategory}
                        invalid={subCategoryError === "invalid"}
                        onChange={(e) => {
                          setSubCategory(e.target.value);
                          setSubCategoryId(e.target.value);
                          if (e.target.value !== "") {
                            setSubCategoryError("");
                          }
                          getFunction(e.target.value);
                        }}
                      >
                        <option value="">Pilih Sub Kategori</option>
                        {subCategories.map((category, key) => {
                          return (
                            <option key={key} value={category.id}>
                              {category.name}
                            </option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Function
                      </Label>
                      <Input
                        disabled
                        name="function"
                        type="select"
                        value={nameFunction}
                        invalid={nameFunctionError === "invalid"}
                        onChange={(e) => {
                          setNameFunction(e.target.value);
                          setFunctionId(e.target.value);
                          if (e.target.value !== "") {
                            setNameFunctionError("");
                          }
                          getSubFunction(e.target.value);
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
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Sub Function
                      </Label>
                      <Input
                        disabled
                        name="subFunction"
                        type="select"
                        value={nameSubFunction}
                        invalid={nameSubFunctionError === "invalid"}
                        onChange={(e) => {
                          setNameSubFunction(e.target.value);
                          if (e.target.value !== "") {
                            setNameSubFunctionError("");
                          }
                          getMerek(e.target.value);
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
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Merek
                      </Label>
                      <Input
                        disabled
                        name="merek"
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
                        {allMerek.map((m, key) => {
                          return (
                            <option key={key} value={m.id}>
                              {m.name}
                            </option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Panjang
                      </Label>
                      <Input
                        disabled
                        type="text"
                        name="panjang"
                        placeholder="Masukan Panjang"
                        value={panjang}
                        invalid={panjangError === "invalid"}
                        onChange={(e) => {
                          setPanajang(e.target.value);
                          if (e.target.value !== "") {
                            setPanajangError("");
                          }
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Lebar
                      </Label>
                      <Input
                        disabled
                        type="text"
                        name="lebar"
                        placeholder="Masukan Lebar"
                        value={lebar}
                        invalid={lebarError === "invalid"}
                        onChange={(e) => {
                          setLebar(e.target.value);
                          if (e.target.value !== "") {
                            setLabarError("");
                          }
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Tinggi
                      </Label>
                      <Input
                        disabled
                        type="text"
                        name="tinggi"
                        placeholder="Masukan Tinggi"
                        value={tinggi}
                        invalid={tinggiError === "invalid"}
                        onChange={(e) => {
                          setTinggi(e.target.value);
                          if (e.target.value !== "") {
                            setTinggiError("");
                          }
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Stock
                      </Label>
                      <Input
                        disabled
                        type="number"
                        name="stock"
                        placeholder="Masukan Stock"
                        value={stock}
                        invalid={stockError === "invalid"}
                        onChange={(e) => {
                          setStock(e.target.value);
                          if (e.target.value !== "") {
                            setStockError("");
                          }
                        }}
                      />
                    </FormGroup>
                  </CardBody>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}
