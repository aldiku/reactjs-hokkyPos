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

export default function CreateSupplier(props) {
  const token = localStorage.token;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [namePerson, setNamePerson] = useState("");
  const [namePersonError, setNamePersonError] = useState(null);
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

  // useEffect(() => {
  //   getMatauang();
  // }, []);

  // const getMatauang = () => {
  //   const headers = {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`
  //     }
  //   axios.get(`${process.env.REACT_APP_API_BASE_URL}/mata-uang/list`, { headers
  //   })
  //   .then(data => {
  //     setAllMataUang(data.data.response);
  //   })
  //     .catch(function (error) {
  //       console.log(error)
  //     })
  // }

  function CreateData() {
    setLoading(true);
    let data = {
      person_name: namePerson,
      description: description,
      mata_uang_id: parseInt(mataUang),
      coa_hut_id: 1,
      coa_piut_id: 1,
      tunai_flag: 1,
      note: "",
      limit_piutang: parseInt(limitPiutang),
      limit_hutang: parseInt(limitHutang),
      active_flag: 1,
      npwp_no: npwp,
      tipe_harga_jual: null,
      tipe: "",
      flag_supp: null,
    }
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/person/save`, data, {
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
        CreateData();
    }
  }
  return (
    <>
      <SimpleHeader name="Daftar Supplier" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit} >
                  <CardHeader>
                    <h3>Daftar Supplier</h3>
                  </CardHeader>
                  <CardBody>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Nama Supplier
                        {/* <span className="text-danger">*</span> */}
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
                        Limit Hutang
                        {/* <span className="text-danger">*</span> */}
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
                        {/* <span className="text-danger">*</span> */}
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
                        {/* <span className="text-danger">*</span> */}
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
                        {/* <span className="text-danger">*</span> */}
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
