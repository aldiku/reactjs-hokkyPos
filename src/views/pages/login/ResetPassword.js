/*eslint-disable*/
import React, { useEffect, useState } from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Input,
  InputGroupAddon,
  InputGroupText,
  Container,
  Row,
  Col,
  Label, FormFeedback
} from "reactstrap";
import { AvForm, AvGroup } from 'availity-reactstrap-validation';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import SweetAlert from "react-bootstrap-sweetalert";

function ResetPassword(prop) {
  let history = useHistory();
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(null);
  const [reNewPassword, setReNewPassword] = useState("");
  const [reNewPasswordError, setReNewPasswordError] = useState(null);
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const value = prop.location.search;
  const token = value.split("=")[1];
  const [alert, setAlert] = React.useState(null);
  const [expiredEmail, setExpiredEmail] = useState(null);
  const [tokenExpired, setTokenExpired] = useState(null);
  const redirectLogin = `/auth/login`;

  const validateForm = () => {
    let error = false;
    if (newPassword === "") {
      setNewPasswordError("invalid");
      error = true;
    }
    if (newPassword !== reNewPassword) {
      setNewPasswordError("invalid");
      error = true;
    }
    if (reNewPassword === "") {
      setReNewPasswordError("invalid");
      error = true;
    }
    if (reNewPassword !== newPassword) {
      setReNewPasswordError("invalid");
      error = true;
    }
    return error;
  };

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/reset-password?token=${token}`, {
        method: 'GET', // or 'PUT'
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(),
      })
      const data = await response.json();
      if (data.errors) {
        showErrorsToken(data.errors);
        return;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const showErrorsToken = (errors) => {
    setTokenExpired(errors.Token);
  }

  const hideAlert = () => {
    setAlert(null);
  }

  const setSuccessAlert = () => {
    setAlert(
      <SweetAlert
        success
        showConfirm
        confirmBtnText="Ok"
        title="Password berhasil dirubah"
        onCancel={hideAlert}
        onConfirm={hideAlert}
      />
    )
  }

  function ResetPassword() {
    let body = {
      password: newPassword,
      confirmPassword: reNewPassword
    }
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/reset-password?token=${token}`, body)
      .then(function (response) {
        if (response.data.errors) {
          showErrors(response.data.errors);
          return;
        }
        setSuccessAlert();
        history.push("/auth/login");
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const showErrors = (error) => {
    setNewPasswordError("invalid");
    setExpiredEmail(error.token)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      ResetPassword();
    }
  }

  return (
    <>
      {alert}
      {
        tokenExpired === "Tidak Aktif" ?
          <Container className="reset-container">
            <Row md={12}>
              <Card style={{ top: "250px", left: "100px" }}>
                <CardHeader>
                  <img
                    alt="login"
                    style={{ width: "24%", marginBottom: "15px" }}
                    src={require("assets/img/brand/Hokky1.png").default}
                  />
                </CardHeader>
                <CardBody>
                  <h1 className="text-center">Link Expired</h1>
                  <Link className="btn btn-info" to="/auth/login">
                    Kembali
                    </Link>
                </CardBody>
              </Card>
            </Row>
          </Container>
          :
          <Container className="reset-container">
            <Row md={12}>
              <Card style={{ top: "250px", left: "100px" }}>
                <CardHeader>
                  <img
                    alt="login"
                    style={{ width: "24%", marginBottom: "15px" }}
                    src={require("assets/img/brand/Hokky1.png").default}
                  />
                  <h3>Atur Ulang Kata Sandi</h3>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md={12}>
                      <AvForm>
                        <Label>Kata Sandi Baru</Label>
                        <AvGroup className="input-group">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Masukan Password"
                            type={passwordShown ? "text" : "password"}
                            value={newPassword}
                            invalid={newPasswordError === "invalid"}
                            onChange={(e) => {
                              setNewPassword(e.target.value);
                              if (e.target.value !== "") {
                                setNewPasswordError("");
                              }
                            }}
                          />
                          <InputGroupText>
                            {
                              passwordShown !== true ? <i class="fa fa-eye" aria-hidden="true" onClick={togglePasswordVisiblity} /> : <i class="fa fa-eye-slash" aria-hidden="true" onClick={togglePasswordVisiblity} />
                            }
                          </InputGroupText>
                          <FormFeedback>
                            {
                              newPassword === "" ? "Kata sandi baru tidak boleh kosong" : newPassword !== reNewPassword ? "kata sandi baru dan konfirmasi kata sandi baru tidak sesuai" : expiredEmail
                            }
                          </FormFeedback>
                        </AvGroup>
                        <Label>Konfirmasi Kata Sandi Baru</Label>
                        <AvGroup className="input-group">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Masukan Password"
                            type={passwordShown ? "text" : "password"}
                            value={reNewPassword}
                            invalid={reNewPasswordError === "invalid"}
                            onChange={(e) => {
                              setReNewPassword(e.target.value);
                              if (e.target.value !== "") {
                                setReNewPasswordError("");
                              }
                            }}
                          />
                          <InputGroupText>
                            {
                              passwordShown !== true ? <i class="fa fa-eye" aria-hidden="true" onClick={togglePasswordVisiblity} /> : <i class="fa fa-eye-slash" aria-hidden="true" onClick={togglePasswordVisiblity} />
                            }
                          </InputGroupText>
                          <FormFeedback>
                            {
                              reNewPassword === "" ? "Konfirmasi kata sandi baru tidak boleh kosong" : "Konfirmasi kata sandi baru dan kata sandi baru tidak sesuai"
                            }
                          </FormFeedback>
                        </AvGroup>
                        <Button color="primary" type="submit" onClick={handleSubmit}>
                          Kirim
                    </Button>
                        <Link class="btn btn-info" to="">
                          Batalkan
                  </Link>
                      </AvForm>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Row>
          </Container>
      }
    </>
  );
}

export default ResetPassword;
