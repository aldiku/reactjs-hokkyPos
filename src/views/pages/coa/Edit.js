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

export default function EditCoa(props) {
  const token = localStorage.token;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);

  const [codeCoa, setCodeCoa] = useState("");
  const [nameCoa, setNameCoa] = useState("");
  const [nameCoaError, setNameCoaError] = useState(null);
  const [account, setAccount] = useState("");
  const [accountError, setAccountError] = useState(null);
  const [allAccount, setAllAccount] = useState([]);

  const validateForm = () => {
    let error = false;
    if (nameCoa === "") {
      setNameCoaError("invalid");
      error = true;
    }
    if (account === "") {
      setAccountError("invalid");
      error = true;
    }
    return error;
  };

  useEffect(() => {
    getCoaById();
  }, []);

  const getCoaById = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/coa/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        getAccount(data.data.response.account_id);
        setCodeCoa(data.data.response.coa_code);
        setNameCoa(data.data.response.coa_name);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getAccount = (accoutnId) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/account/list`, { headers })
      .then((data) => {
        setAllAccount(data.data.response);
        setAccount(accoutnId);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function EditData() {
    setLoading(true);
    let data = {
      coa_code: codeCoa,
      coa_name: nameCoa,
      account_id: parseInt(account),
      cc_id: 0,
      active_flag: 1,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/coa/update/${props.match.params.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        history.push("/admin/coa");
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
      EditData();
    }
  };
  return (
    <>
      <SimpleHeader name="Edit Coa" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <CardHeader>
                    <h3>Edit COA</h3>
                  </CardHeader>
                  <CardBody>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Kode Coa
                      </Label>
                      <Input
                      autoComplete="off"
                        disabled
                        type="text"
                        name="kodeCoa"
                        placeholder="Masukan Kode Coa"
                        value={codeCoa}
                        onChange={(e) => {
                          setCodeCoa(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Nama Coa
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                      autoComplete="off"
                        type="text"
                        name="NamaCoa"
                        placeholder="Masukan Nama Coa"
                        value={nameCoa}
                        invalid={nameCoaError === "invalid"}
                        onChange={(e) => {
                          setNameCoa(e.target.value);
                          if (e.target.value !== "") {
                            setNameCoaError("");
                          }
                        }}
                      />
                      <FormFeedback>Nama Coa tidak boleh kosong</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Account
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                      autoComplete="off"
                        name="Account"
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
                        {allAccount.map((account, key) => {
                          return (
                            <option key={key} value={account.id}>
                              {account.account_name}
                            </option>
                          );
                        })}
                      </Input>
                      <FormFeedback>Account tidak boleh kosong</FormFeedback>
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
                    <Link className="btn btn-info" to="/admin/coa">
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
