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
  CardImg,
  Col,
  Button,
  Container,
  Form,
  CardGroup,
} from "reactstrap";
import { Link , useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function EditItem() {
  const token = localStorage.token;
  const warehouse = localStorage.warehouse;
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
  const [image, setImage] = useState([]);
  const [itemId, setItemId] = useState(1);
  const [itemTotal, setItemTotal] = useState(null);
  const [query, setQuery] = useState(null);
  const [isSearchShow, setIsSearchShow] = useState(false); 
  const headers = { Authorization: `Bearer ${token}` };
  const redirectPrefix = `/admin/person/edit/`;

	useEffect(() => {
		getById();
        getUser();
	}, [itemId]);

	const getById = () => {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        axios
          .get(
            `${process.env.REACT_APP_API_BASE_URL}/person/${itemId}`,
            { headers }
          )
          .then((data) => {
            setName(data.data.response.person_name);
            setCodeName(data.data.response.person_code);
            setAddress(data.data.response.address);
            setLimitHutang(data.data.response.limit_hutang);
            setLimitPiutang(data.data.response.limit_piutang);
            setPhone(data.data.response.phone);
            setNpwp(data.data.response.npwp_no);
            setImage(data.data.response.logo);
            
          })
          .catch(function (error) {
            console.log(error);
          });
      };

  
function EditData() {
    setLoading(true);{
        UpdateSupplier();
    }
  }

  const UpdateSupplier = () => {
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
      axios.post(`${process.env.REACT_APP_API_BASE_URL}/person/update/${itemId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(function (response) {
          window.location.reload("/admin/person");
        //   history.push("/admin/person");
        })
        .then(json => {
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error)
        })
  };

  const getUser = async () => {
    let filter = {
        page: 1,
        per_page: 10,
        warehouse_id: parseInt(warehouse),
    };
    const data = filter;

    const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/person`, data, { headers });
    setItemTotal(res.data.total_item);
};

const search = async () => {
    if (Number(query) > 0) {
        const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/person`, { person_name: query  }, { headers });
        if (res.data.status !== 404) setAllItem(res.data);
        else {
            const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/person`, { person_code: query }, { headers });
            if (res.data.status !== 404) setAllItem(res.data);
            else setAllItem(null);
        }
    } else {
        const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/person`, { npwp_no: query }, { headers });
        if (res.data.status !== 404) setAllItem(res.data);
        else setAllItem(null);
    }
    setIsSearchShow(true);
};

const searchShow = (item) => {
    setItemId(item.id);
    setIsSearchShow(false);
};

    const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

  return (
    <>
      <div>
      <SimpleHeader name="Supplier" parentName="Master" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
                <CardBody>
                    <Card className="position-sticky boxShadow" style={{ top: 0, zIndex: "5" }}>
                                        <CardBody className="ml-3 pb-0">
                                            <Row md="12">
                                                <Col md="5">
                                                    <Button onClick={() => setItemId(4)} color="danger" type="button">
                                                        First
                                                    </Button>
                                                    <Button onClick={() => setItemId((prev) => prev - 1)} disabled={itemId === 1} color="success" type="button">
                                                        <i className="ni ni-bold-left" /> Prev
                                                    </Button>
                                                    <Button onClick={() => setItemId((prev) => prev + 1)} disabled={itemId === itemTotal} color="success" type="button">
                                                        Next <i className="ni ni-bold-right" />
                                                    </Button>
                                                    <Button onClick={() => setItemId(itemTotal)} disabled={itemTotal === null} color="warning" type="button">
                                                        End
                                                    </Button>
                                                </Col>
                                                <Col md="4">
                                                    <FormGroup row>
                                                        <Col sm={7}>
                                                            <Input
                                                                className="form-control-alternative"
                                                                placeholder="Search Supplier"
                                                                type="search"
                                                                onChange={(e) => setQuery(e.target.value)}
                                                                onKeyDown={search}
                                                            />
                                                        </Col>
                                                    </FormGroup>
                                                </Col>
                                                <Col md="3">
                                                    <div style={{ textAlign: "right" }}>
                                                        {/* <Button
														color="info"
														onClick={() => EditData()}
                                                        >
                                                            Edit
                                                        </Button> */}
                                                         <Link className="btn btn-info"
                                                            to={redirectPrefix + itemId}
                                                        >
                                                            <i className="fas fa-user-edit" /> Edit
                                                        </Link>
                                                        <Link className="btn btn-danger" to="/admin/person/create">
                                                            Tambah
                                                        </Link>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                    </Card>
                    {isSearchShow && query && (
									<Card className="boxShadow" style={{ maxHeight: "15.5rem", overflowY: "auto", paddingTop: "1rem", position: "relative" }}>
										<div style={{ position: "absolute", top: "2.5px", right: "1rem", cursor: "pointer", fontSize: "2rem" }}>
											<i className="fas fa-window-close text-danger" onClick={() => setIsSearchShow(false)}></i>
										</div>
										<span className="text-center mb-3">
											<b>Pencarian berdasarkan:</b> {query}
										</span>
										{allItem?.response ? (
											allItem.response.map((item) => (
												<CardBody key={item.id} style={{ minHeight: "6rem", padding: "1rem" }} className="bgSearch" onClick={() => searchShow(item)}>
													<div>
														<b>Nama :</b> {item.person_name}
													</div>
													<div>
														<b>Kode Supplier:</b> {item.person_code ? item.person_code : "(Not available)"}
													</div>
													<hr style={{ margin: "0.75rem -1rem 0 -1rem" }} />
												</CardBody>
											))
										) : (
											<div className="text-center mb-3 text-danger">User "{query}" tidak ada bosku!</div>
										)}
									</Card>
								)}
                </CardBody>
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
                                                disabled
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
                                            disabled
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
                                                disabled
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
                                                disabled
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
                                                disabled
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
                                                disabled
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
                                                disabled
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
                            {/* <Col md="5">
                                <Card className="bg-secondary shadow">
                                    <CardHeader className="bg-white border-0">
                                    <h3 >Gambar</h3>
                                    </CardHeader>
                                    <CardBody>
                                        <FormGroup row>
                                            <CardGroup>
                                                <Row>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <Col md="10">
                                                        <Card>
                                                            <CardImg
                                                            alt="Card image cap"
                                                            src={image}
                                                            top
                                                            width="100%"
                                                            />
                                                        </Card>
                                                    </Col>
                                                </Row>
                                            </CardGroup>
                                        </FormGroup>
                                    </CardBody>
                                </Card>
                            </Col> */}
                        </Row>
                    </Card>
                </CardBody>
          </div>
        </Row>
      </Container>
      </div>
    </>
  );
}