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

export default function EditPromo(props) {
  const token = localStorage.token;
  const warehouse = parseInt(localStorage.warehouse);
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);

  const [codePromo, setCodePromo] = useState("");
  const [namePromo, setNamePromo] = useState("");
  const [nominalPromo, setNominalPromo] = useState("");
  const [durationPromo, setDurationPromo] = useState("");
  const [persentasePromo, setPersentasePromo] = useState("");

  const validateForm = () => {
    let error = false;
    // if (nameDepartment === "") {
    //   setNameDepartmentError("invalid");
    //   error = true;
    // }
    // if (codeDepartment === "") {
    //   setCodeDepartmentError("invalid");
    //   error = true;
    // }
    return error;
  };

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
        `${process.env.REACT_APP_API_BASE_URL}/promo/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        setCodePromo(data.data.response.kode_promo);
        setNamePromo(data.data.response.nama_promo);
        setPersentasePromo(data.data.response.persentase_promo);
        setNominalPromo(data.data.response.nominal_promo);
        setDurationPromo(data.data.response.durasi_promo);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function EditData() {
    setLoading(true);
    let data = {
      warehouse_id: warehouse,
      kode_Promo: codePromo,
      nama_promo: namePromo,
      persentase_promo: parseFloat(persentasePromo),
      nominal_promo: parseFloat(nominalPromo),
      durasi_promo: durationPromo,
      active_flag: 1,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/promo/update/${props.match.params.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        history.push("/admin/promo");
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
      <SimpleHeader name="Edit Promo" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <CardHeader>
                    <h3>Edit Promo</h3>
                  </CardHeader>
                  <CardBody>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Kode Promo
                      </Label>
                      <Input
                        type="text"
                        name="nama"
                        placeholder="Masukan Kode Promo"
                        value={codePromo}
                        onChange={(e) => {
                          setCodePromo(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Nama Promo
                      </Label>
                      <Input
                        type="text"
                        name="kode"
                        placeholder="Masukan Nama Promo"
                        value={namePromo}
                        onChange={(e) => {
                          setNamePromo(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Persentase Promo
                      </Label>
                      <Input
                        type="text"
                        name="persentase"
                        placeholder="Masukan Persentase Promo"
                        value={persentasePromo}
                        onChange={(e) => {
                          setPersentasePromo(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Nominal Promo
                      </Label>
                      <Input
                        type="text"
                        name="nominal"
                        placeholder="Masukan Nominal Promo"
                        value={nominalPromo}
                        onChange={(e) => {
                          setNominalPromo(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Durasi Promo
                      </Label>
                      <Input
                        type="number"
                        name="durasi"
                        placeholder="Masukan Durasi Promo"
                        value={durationPromo}
                        onChange={(e) => {
                          setDurationPromo(e.target.value);
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
                    <Link className="btn btn-info" to="/admin/promo">
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
