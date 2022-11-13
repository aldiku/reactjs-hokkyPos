/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    Label,
    FormGroup,
    Row,
    Input,
    CardHeader,
    CardFooter,
    Col,
    Button,
    Container,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function EditSupplier(props) {
  const token = localStorage.token;
  const warehouse = parseInt(localStorage.warehouse);
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [codename, setCodeName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [npwp, setNpwp] = useState("");
  const [limithutang,setLimitHutang] = useState(0);
  const [limitpiutang, setLimitPiutang] = useState(0);
  const [balance, setBalance] = useState("");

  
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
        setName(data.data.response.person_name);
        setCodeName(data.data.response.person_code);
        setAddress(data.data.response.address);
        setLimitHutang(data.data.response.limit_hutang);
        setLimitPiutang(data.data.response.limit_piutang);
        setPhone(data.data.response.phone);
        setNpwp(data.data.response.npwp_no);
    })
      .catch(function (error) {
        console.log(error)
      })
  }


  function EditData() {
    setLoading(true);
    let data = {
        person_name: name,
        person_code: codename,
        phone: phone,
        address : address,
        balance: parseInt(balance),
        limit_piutang: parseInt(limitpiutang),
        limit_hutang: parseInt(limithutang),
        npwp_no: npwp,
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

  return (
    <>
      <SimpleHeader name="Edit Supplier" parentName="Master" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
                <CardBody>
                    <CardHeader className="bg-white border-0">
                        <h3>Supplier</h3>
                    </CardHeader>
                    <Card className="bg-secondary shadow">
                        <Row md="12">
                            <Col md="6">
                                    <CardBody>
                                    <FormGroup row>
                                        <Label
                                            for="exampleEmail"
                                            sm={4}
                                        >
                                            Kode  
                                        </Label>
                                        <Col sm={7}>
                                            <Input
                                            disabled
                                                className="form-control-alternative"
                                                type="text"
                                                name="itemCode"
                                                placeholder="Masukan Kode Supplier"
                                                value={codename}
                                                onChange={(e) => {
                                                setCodeName(e.target.value);
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label
                                            for="exampleEmail"
                                            sm={4}
                                        >
                                            Nama 
                                        </Label>
                                        <Col sm={7}>
                                            <Input
                                                className="form-control-alternative"
                                                type="text"
                                                name="itemCode"
                                                placeholder="Masukan Nama"
                                                value={name}
                                                onChange={(e) => {
                                                setName(e.target.value);
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label
                                            for="exampleEmail"
                                            sm={4}
                                            >
                                            Alamat
                                        </Label>
                                        <Col sm={7}>
                                        <Input
                                            className="form-control-alternative"
                                            type="textarea"
                                            name="barcode"
                                            rows="4"
                                            placeholder="Masukan Alamat"
                                            value={address}
                                            onChange={(e) => {
                                            setAddress(e.target.value);
                                            }}
                                        />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label
                                            for="exampleEmail"
                                            sm={4}
                                        >
                                            Phone
                                        </Label>
                                        <Col sm={7}>
                                            <Input
                                                className="form-control-alternative"
                                                type="text"
                                                name="itemCode"
                                                placeholder="Masukan Kode Item"
                                                value={phone}
                                                onChange={(e) => {
                                                setPhone(e.target.value);
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>
                                    </CardBody>
                            </Col>
                            <Col md="6">
                                    <CardBody>
                                    <FormGroup row>
                                        <Label
                                            for="exampleEmail"
                                            sm={4}
                                        >
                                            Npwp
                                        </Label>
                                        <Col sm={7}>
                                            <Input
                                                className="form-control-alternative"
                                                type="text"
                                                name="nomorPart"
                                                placeholder="Masukan Npwp"
                                                value={npwp}
                                                onChange={(e) => {
                                                setNpwp(e.target.value);
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label
                                            for="exampleEmail"
                                            sm={4}
                                        >
                                            Limit Hutang
                                        </Label>
                                        <Col sm={7}>
                                            <Input
                                                className="form-control-alternative"
                                                type="text"
                                                name="Berat"
                                                placeholder="Masukan Limit Hutang   "
                                                value={limithutang}
                                                onChange={(e) => {
                                                setLimitHutang(e.target.value);
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                    <Label
                                        for="exampleEmail"
                                        sm={4}
                                    >
                                        Limit Piutang
                                    </Label>
                                        <Col sm={7}>
                                            <Input
                                                className="form-control-alternative"
                                                type="text"
                                                name="Berat"
                                                placeholder="Masukan Limit Piutang"
                                                value={limitpiutang}
                                                onChange={(e) => {
                                                setLimitPiutang(e.target.value);
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                    <Label
                                        for="exampleEmail"
                                        sm={4}
                                    >
                                        Balance
                                    </Label>
                                        <Col sm={7}>
                                            <Input
                                                className="form-control-alternative"
                                                type="text"
                                                name="Berat"
                                                placeholder="Masukan Balance"
                                                value={balance}
                                                onChange={(e) => {
                                                setBalance(e.target.value);
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>
                                    </CardBody>
                            </Col>
                        </Row>
                    </Card>
                </CardBody>
                <CardFooter>
                    {!isLoading && (<Button color="primary" onClick={() => EditData()}>
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
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}
