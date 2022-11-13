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

export default function EditKaryawan(props) {
  const token = localStorage.token;
  const warehouse = parseInt(localStorage.warehouse);
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(null);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(null);
  const [allDepartment, setAllDepartment] = useState([]);
  const [department, setDepartment] = useState("");
  const [departmentError, setDepartmentError] = useState(null);

  const validateForm = () => {
    let error = false;
    if (name === "") {
      setNameError("invalid");
      error = true;
    }
    if (username === "") {
      setUsernameError("invalid");
      error = true;
    }
    if (description === "") {
      setDescriptionError("invalid");
      error = true;
    }
    if (department === "") {
      setDepartmentError("invalid");
      error = true;
    }
    return error;
  };

  useEffect(() => {
    getKaryawan();
  }, []);

  const getKaryawan = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/karyawan/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        getDepartment(data.data.response.dept_id);
        setName(data.data.response.name);
        setUsername(data.data.response.username);
        setDescription(data.data.response.description);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getDepartment = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/department/list?warehouse_id=${warehouse}`,
        { headers }
      )
      .then((data) => {
        setAllDepartment(data.data.response);
        setDepartment(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function EditData() {
    setLoading(true);
    let data = {
      username: username,
      name: name,
      description: description,
      dept_id: parseInt(department),
    };
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/karyawan/update/${props.match.params.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        history.push("/admin/karyawan");
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
      <SimpleHeader name="Edit Departemen" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <CardHeader>
                    <h3>Edit Departemen</h3>
                  </CardHeader>
                  <CardBody>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Nama
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        name="nama"
                        placeholder="Masukan Nama"
                        value={name}
                        invalid={nameError === "invalid"}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (e.target.value !== "") {
                            setNameError("");
                          }
                        }}
                      />
                      <FormFeedback>Nama tidak boleh kosong</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Username
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        disabled
                        name="username"
                        placeholder="Masukan Username"
                        value={username}
                        invalid={usernameError === "invalid"}
                        onChange={(e) => {
                          setUsername(e.target.value);
                          if (e.target.value !== "") {
                            setUsernameError("");
                          }
                        }}
                      />
                      <FormFeedback>Username tidak boleh kosong</FormFeedback>
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
                      <FormFeedback>Keterangan tidak boleh kosong</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Departemen
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="department"
                        type="select"
                        value={department}
                        invalid={departmentError === "invalid"}
                        onChange={(e) => {
                          setDepartment(e.target.value);
                          if (e.target.value !== "") {
                            setDepartmentError("");
                          }
                        }}
                      >
                        <option value="">Pilih Departemen</option>
                        {allDepartment.map((dep, key) => {
                          return (
                            <option key={key} value={dep.id}>
                              {dep.department_name}
                            </option>
                          );
                        })}
                      </Input>
                      <FormFeedback>Departemen tidak boleh kosong</FormFeedback>
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
                    <Link className="btn btn-info" to="/admin/karyawan">
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
