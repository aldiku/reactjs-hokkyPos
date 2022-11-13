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

export default function EditSupplier(props) {
  const token = localStorage.token;
  const warehouse = parseInt(localStorage.warehouse);
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);

  const [namePerson, setNamePerson] = useState("");
  const [namePersonError, setNamePersonError] = useState(null);
  const [codePerson, setCodePerson] = useState("");
  const [codePersonError, setCodePersonError] = useState(null);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(null);
  const [limitPiutang, setLimitPiutang] = useState("");
  const [limitPiutangError, setLimitPiutangError] = useState(null);
  const [limitHutang, setLimitHutang] = useState("");
  const [limitHutangError, setLimitHutangError] = useState(null);
  const [allMataUang, setAllMataUang] = useState([]);
  const [mataUang, setMataUang] = useState("");
  const [mataUangError, setMataUangError] = useState(null);
  const [npwp, setNpwp] = useState("");
  const [npwpError, setNpwpError] = useState(null);

  const validateForm = () => {
    let error = false;
    if (namePerson === "") {
      setNamePersonError("invalid");
      error = true;
    }
    if (codePerson === "") {
      setCodePersonError("invalid");
      error = true;
    }
    if (description === "") {
      setDescriptionError("invalid");
      error = true;
    }
    if (limitHutang === "") {
      setLimitHutangError("invalid");
      error = true;
    }
    if (limitPiutang === "") {
      setLimitPiutangError("invalid");
      error = true;
    }
    if (mataUang === "") {
      setMataUangError("invalid");
      error = true;
    }
    if (npwp === "") {
      setNpwpError("invalid");
      error = true;
    }
    return error;
  };

  useEffect(() => {
    getById();
  }, []);

  const getById = () => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/person/${props.match.params.id}`, { headers
    })
    .then(data => {
        getMatauang(data.data.response.mata_uang_id);
        setNamePerson(data.data.response.person_name);
        setCodePerson(data.data.response.person_code);
        setDescription(data.data.response.description);
        setLimitHutang(data.data.response.limit_hutang);
        setLimitPiutang(data.data.response.limit_piutang);
        setNpwp(data.data.response.npwp_no);
    })
      .catch(function (error) {
        console.log(error)
      })
  }

  const getMatauang = (id) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/mata-uang/list`, { headers
    })
    .then(data => {
      setAllMataUang(data.data.response);
      setMataUang(id);
    })
      .catch(function (error) {
        console.log(error)
      })
  }

  function EditData() {
    setLoading(true);
    let data = {
      person_name: namePerson,
      person_code: codePerson,
      description: description,
      mata_uang_id: parseInt(mataUang),
      coa_hut_id: 39,
      coa_piut_id: 5,
      tunai_flag: 2,
      note: null,
      limit_piutang: parseInt(limitPiutang),
      limit_hutang: parseInt(limitHutang),
      active_flag: 1,
      npwp_no: npwp,
      tipe_harga_jual: null,
      tipe: "",
      flag_supp: null,
    }
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/person/update/${props.match.params.id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(function (response) {
        history.push("/admin/person");
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
      <SimpleHeader name="Edit Supplier" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit} >
                  <CardHeader>
                    <h3>Edit Supplier</h3>
                  </CardHeader>
                  <CardBody>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Nama Supplier
                        <span className="text-danger">*</span>
                                            </Label>
                      <Input
                        type="text"
                        name="nama"
                        placeholder="Masukan Nama Supplier"
                        value={namePerson}
                        invalid={namePersonError === "invalid"}
                        onChange={(e) => {
                          setNamePerson(e.target.value);
                          if (e.target.value !== "") {
                            setNamePersonError("");
                          }
                        }}
                      />
                      <FormFeedback>
                        Nama Supplier tidak boleh kosong
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Kode Supplier
                        <span className="text-danger">*</span>
                                            </Label>
                      <Input
                        type="text"
                        name="code"
                        placeholder="Masukan Kode Supplier"
                        value={codePerson}
                        invalid={codePersonError === "invalid"}
                        onChange={(e) => {
                          setCodePerson(e.target.value);
                          if (e.target.value !== "") {
                            setCodePersonError("");
                          }
                        }}
                      />
                      <FormFeedback>
                        Kode Supplier tidak boleh kosong
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Limit Hutang
                        <span className="text-danger">*</span>
                                            </Label>
                      <Input
                        type="text"
                        name="limitHutang"
                        placeholder="Masukan Limit Hutang"
                        value={limitHutang}
                        invalid={limitHutangError === "invalid"}
                        onChange={(e) => {
                          setLimitHutang(e.target.value);
                          if (e.target.value !== "") {
                            setLimitHutangError("");
                          }
                        }}
                      />
                      <FormFeedback>
                        Limit Hutang tidak boleh kosong
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Limit Piutang
                        <span className="text-danger">*</span>
                                            </Label>
                      <Input
                        type="text"
                        name="limitPiutang"
                        placeholder="Masukan Limit Piutang"
                        value={limitPiutang}
                        invalid={limitPiutangError === "invalid"}
                        onChange={(e) => {
                          setLimitPiutang(e.target.value);
                          if (e.target.value !== "") {
                            setLimitPiutangError("");
                          }
                        }}
                      />
                      <FormFeedback>
                        Limit Piutang tidak boleh kosong
                      </FormFeedback>
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
                        name="keterangan"
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
                      <FormFeedback>
                        Keterangan tidak boleh kosong
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        NPWP
                        <span className="text-danger">*</span>
                                            </Label>
                      <Input
                        type="text"
                        name="npwp"
                        placeholder="Masukan NPWP"
                        value={npwp}
                        invalid={npwpError === "invalid"}
                        onChange={(e) => {
                          setNpwp(e.target.value);
                          if (e.target.value !== "") {
                            setNpwpError("");
                          }
                        }}
                      />
                      <FormFeedback>
                        NPWP tidak boleh kosong
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Mata Uang
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="mataUang"
                        type="select"
                        value={mataUang}
                        invalid={mataUangError === "invalid"}
                        onChange={(e) => {
                          setMataUang(e.target.value);
                          if (e.target.value !== "") {
                            setMataUangError("");
                          }
                        }}
                      >
                        <option value="">Pilih Mata Uang</option>
                        {
                          allMataUang.map((dep, key) => {
                            return <option key={key} value={dep.id}>{dep.mata_uang_name}</option>
                          })
                        }
                      </Input>
                      <FormFeedback>Mata Uang tidak boleh kosong</FormFeedback>
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
                    <Link className="btn btn-info" to="/admin/person">
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
