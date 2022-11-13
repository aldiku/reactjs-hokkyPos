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
import moment from "moment";

export default function EditAsset(props) {
  const token = localStorage.token;
  const warehouse = parseInt(localStorage.warehouse);
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);

  const [codeAsset, setCodeAsset] = useState("");
  const [nameAsset, setNameAsset] = useState("");
  const [nameAssetError, setNameAssetError] = useState(null);
  const [typeAsset, setTypeAsset] = useState("");
  const [typeAssetError, setTypeAssetError] = useState(null);
  const [total, setTotal] = useState("");
  const [note, setNote] = useState("");
  const [valueAsset, setValueAsset] = useState("");
  const [buyingDate, setBuyingDate] = useState("");
  const [types, setTypes] = useState([]);
  const [coa, setCoa] = useState("");
  const [allCoa, setAllCoa] = useState([]);



  const validateForm = () => {
    let error = false;
    if (nameAsset === "") {
      setNameAssetError("invalid");
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
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/asset/${props.match.params.id}`, { headers
    })
    .then(data => {
        setNameAsset(data.data.response.asset_name);
        setCodeAsset(data.data.response.asset_code);
        setTypeAsset(data.data.response.asset_type_id);
        setTotal(data.data.response.entered_qty);
        setValueAsset(data.data.response.nilai_asset);
        setNote(data.data.response.note);
        setCoa(data.data.response.coa_id);
        setBuyingDate(moment(data.data.response.buying_date, "DD/MM/YYYY").format("YYYY-MM-DD"));
        getCoa();
        getType();
    })
      .catch(function (error) {
        console.log(error)
      })
  }
  

  const getType = () => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/asset-type/list`, { headers
    })
    .then(data => {
        setTypes(data.data.response)
    })
      .catch(function (error) {
        console.log(error)
      })
  }

  const getCoa = () => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/coa/list`, { headers
    })
    .then(data => {
        setAllCoa(data.data.response)
    })
      .catch(function (error) {
        console.log(error)
      })
  }

  function EditData() {
    setLoading(true);
    let data = {
      asset_code: codeAsset,
      asset_name: nameAsset,
      entered_qty: parseInt(total),
      asset_type_id: parseInt(typeAsset),
      nilai_asset: parseInt(valueAsset),
      buying_date: moment(buyingDate).format("DD-MM-YYYY"),
      warehouse_id: parseInt(warehouse),
      coa_id: parseInt(coa),
      active_flag: 1,
      note: note
    }
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/asset/update/${props.match.params.id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(function (response) {
        history.push("/admin/asset");
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
      <SimpleHeader name="Edit Asset" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit} >
                  <CardHeader>
                    <h3>Edit Asset</h3>
                  </CardHeader>
                  <CardBody>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Nama Asset
                        <span className="text-danger">*</span>
                                            </Label>
                      <Input
                      autoComplete="off"
                        type="text"
                        name="nama"
                        placeholder="Masukan Nama Asset"
                        value={nameAsset}
                        invalid={nameAssetError === "invalid"}
                        onChange={(e) => {
                          setNameAsset(e.target.value);
                          if (e.target.value !== "") {
                            setNameAssetError("");
                          }
                        }}
                      />
                      <FormFeedback>
                        Nama Asset tidak boleh kosong
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Kode Asset
                        </Label>
                      <Input
                      autoComplete="off"
                        type="text"
                        name="nama"
                        placeholder="Masukan Kode Asset"
                        value={codeAsset}
                        onChange={(e) => {
                          setCodeAsset(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Type Asset
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                      autoComplete="off"
                        name="type"
                        type="select"
                        value={typeAsset}
                        invalid={typeAssetError === "invalid"}
                        onChange={(e) => {
                          setTypeAsset(e.target.value);
                          if (e.target.value !== "") {
                            setTypeAssetError("");
                          }
                        }}
                      >
                        <option value="">Pilih Type Asset</option>
                        {
                          types.map((type, key) => {
                            return <option key={key} value={type.id}>{type.name}</option>
                          })
                        }
                      </Input>
                      <FormFeedback>Type Asset tidak boleh kosong</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Nilai Asset
                                            </Label>
                      <Input
                      autoComplete="off"
                        type="text"
                        name="nilaiAsset"
                        placeholder="Masukan Nilai Asset"
                        value={valueAsset}
                        onChange={(e) => {
                          setValueAsset(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Jumlah
                                            </Label>
                      <Input
                      autoComplete="off"
                        type="text"
                        name="total"
                        placeholder="Masukan Jumlah"
                        value={total}
                        onChange={(e) => {
                          setTotal(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        COA
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                      autoComplete="off"
                        name="coa"
                        type="select"
                        value={coa}
                        onChange={(e) => {
                          setCoa(e.target.value);
                        }}
                      >
                        <option value="">Pilih COA</option>
                        {
                          allCoa.map((coa, key) => {
                            return <option key={key} value={coa.id}>{coa.coa_name}</option>
                          })
                        }
                      </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="exampleFormControlSelect3">Buying Date</Label>
                        <Input
                        autoComplete="off"
                        id="example-date-input"
                        type="date"
                        value={buyingDate}
                        onChange={(e) => {
                            setBuyingDate(e.target.value);
                        }}
                        />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Note
                        </Label>
                      <Input
                      autoComplete="off"
                        type="text"
                        name="note"
                        placeholder="Masukan Note"
                        value={note}
                        onChange={(e) => {
                          setNote(e.target.value);
                        }}
                      />
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
                    <Link className="btn btn-info" to="/admin/asset">
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
