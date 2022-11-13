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
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function CreateJurnal(props) {
  const token = localStorage.token;
  const warehouse = parseInt(localStorage.warehouse);
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);

  const [allCoa, setAllCoa] = useState([]);
  const [coa, setCoa] = useState("");
  const [allAccount, setAllAccount] = useState([]);
  const [account, setAccount] = useState("");
  const [pic, setPic] = useState("");
  const [description, setDescription] = useState("");
  const [saldo, setSaldo] = useState("");
  const [type, setType] = useState("");
  const [dateTransaction, setDateTransaction] = useState("");

  const validateForm = () => {
    let error = false;
    // if (name === "") {
    //   setNameError("invalid");
    //   error = true;
    // }
    // if (username === "") {
    //   setUsernameError("invalid");
    //   error = true;
    // }
    // if (description === "") {
    //   setDescriptionError("invalid");
    //   error = true;
    // }
    // if (department === "") {
    //   setDepartmentError("invalid");
    //   error = true;
    // }
    return error;
  };

  useEffect(() => {
    getAccount();
    getCoa();
  }, []);

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

  const getCoa = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/coa/list`, { headers })
      .then((data) => {
        setAllCoa(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function CreateData() {
    setLoading(true);
    let data = {
      warehouse_id: parseInt(warehouse),
      coa_id: parseInt(coa),
      account_id: parseInt(account),
      deskripsi: description,
      pic: pic,
      tanggal_transaksi: dateTransaction,
      saldo: parseFloat(saldo),
      type: parseInt(type),
    };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/jurnal/save`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        history.push("/admin/jurnal");
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
      CreateData();
    }
  };
  return (
    <>
      <SimpleHeader name="Daftar Jurnal" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <CardHeader>
                    <h3>Daftar Jurnal</h3>
                  </CardHeader>
                  <CardBody>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        PIC
                      </Label>
                      <Input
                        type="text"
                        name="nama"
                        placeholder="Masukan PIC"
                        value={pic}
                        onChange={(e) => {
                          setPic(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Saldo
                      </Label>
                      <Input
                        type="text"
                        name="saldo"
                        placeholder="Masukan Saldo"
                        value={saldo}
                        onChange={(e) => {
                          setSaldo(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Type
                      </Label>
                      <Input
                        name="type"
                        type="select"
                        value={type}
                        onChange={(e) => {
                          setType(e.target.value);
                        }}
                      >
                        <option value="">Pilih Type</option>
                        <option value={1}>Debit</option>
                        <option value={2}>Credit</option>
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
                        name="account"
                        type="select"
                        value={account}
                        onChange={(e) => {
                          setAccount(e.target.value);
                        }}
                      >
                        <option value="">Pilih Account</option>
                        {allAccount.map((dep, key) => {
                          return (
                            <option key={key} value={dep.id}>
                              {dep.account_name}
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
                        COA
                      </Label>
                      <Input
                        name="coa"
                        type="select"
                        value={coa}
                        onChange={(e) => {
                          setCoa(e.target.value);
                        }}
                      >
                        <option value="">Pilih COA</option>
                        {allCoa.map((dep, key) => {
                          return (
                            <option key={key} value={dep.id}>
                              {dep.coa_name}
                            </option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="exampleFormControlSelect3">
                        Tanggal Transaksi
                      </Label>
                      <Input
                        id="example-date-input"
                        type="date"
                        value={dateTransaction}
                        onChange={(e) => {
                          setDateTransaction(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Deskripsi
                      </Label>
                      <Input
                        type="text"
                        name="description"
                        placeholder="Masukan Deskripsi"
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </CardBody>
                  <CardFooter>
                    {!isLoading && (
                      <Button color="primary" type="submit">
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
                    <Link className="btn btn-info" to="/admin/jurnal">
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
