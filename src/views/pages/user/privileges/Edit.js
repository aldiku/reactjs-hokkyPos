/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  Label,
  FormGroup,
  Row,
  Col,
  Input,
  Container,
  CardHeader,
  CardFooter,
  Button,
  Form,
} from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import SimpleHeader from "components/Headers/SimpleHeader.js";

const Edit = (props) => {
  const token = localStorage.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [payload, setPayload] = useState({});
  const dataInput = [
    { label: "Create", key: "create" },
    { label: "Read", key: "read" },
    { label: "Update", key: "update" },
    { label: "Delete", key: "delete" },
    { label: "Change Password", key: "change_password" },
    { label: "Cetak", key: "cetak" },
  ];
  const validateForm = () => {
    let error = false;
    return error;
  };

  useEffect(() => {
    setPayload(props?.location?.state);
  }, []);

  const onInputChange = (type, val) => {
    setPayload((prevState) => ({
      ...prevState,
      [type]: val,
    }));
  };

  const updatePrivileges = async () => {
    setLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/users/privileges/update/${payload.id}`,
        payload,
        {
          headers,
        }
      )
      .then(function (response) {
        setLoading(false);
        if (response.data.error?.error_code > 200) {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Maaf, Data Privilager gagal di simpan",
          });
        } else {
          history.push("/admin/user");
        }
      })
      .then((json) => {
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      updatePrivileges();
    }
  };

  return (
    <>
      <SimpleHeader name="Edit Privileges" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <CardHeader>
                    <h3>Edit Privileges</h3>
                  </CardHeader>
                  <CardBody>
                    <FormGroup>
                      <Label className="form-control-label">Username</Label>
                      <Input
                        disabled
                        type="text"
                        value={payload?.username || ""}
                      />
                    </FormGroup>
                    {dataInput.map((e) => {
                      return (
                        <FormGroup key={e.key}>
                          <Label
                            className="form-control-label"
                            htmlFor="exampleFormControlSelect3"
                          >
                            {e.label}
                          </Label>
                          <Row>
                            <Col>
                              <div style={{ display: "flex" }}>
                                <div className="custom-control custom-radio mb-3">
                                  <Input
                                    className="custom-control-input"
                                    id={`${e.key}1`}
                                    name={e.key}
                                    type="radio"
                                    value={"YES"}
                                    checked={payload?.[e.key] === "YES"}
                                    onChange={() => {
                                      onInputChange(e.key, "YES");
                                    }}
                                  />
                                  <Label
                                    className="custom-control-label"
                                    htmlFor={`${e.key}1`}
                                  >
                                    Yes
                                  </Label>
                                </div>
                                <div
                                  className="custom-control custom-radio mb-3"
                                  style={{ marginLeft: "20px" }}
                                >
                                  <Input
                                    className="custom-control-input"
                                    id={`${e.key}2`}
                                    name={e.key}
                                    type="radio"
                                    value={"NO"}
                                    checked={payload?.[e.key] === "NO"}
                                    onChange={() => {
                                      onInputChange(e.key, "NO");
                                    }}
                                  />
                                  <Label
                                    className="custom-control-label"
                                    htmlFor={`${e.key}2`}
                                  >
                                    No
                                  </Label>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </FormGroup>
                      );
                    })}
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
                    <Link className="btn btn-info" to="/admin/user">
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
};

export default Edit;
