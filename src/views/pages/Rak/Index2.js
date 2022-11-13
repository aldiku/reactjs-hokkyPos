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
	Col,
	Button,
    CardGroup,
    CardImg,
    CardTitle,
    CardSubtitle,
    CardText ,
	Table,
	Container,
	Form,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function Userss() {
	const token = localStorage.token;
	const warehouseId = localStorage.warehouse;
	const username = localStorage.username;
	let history = useHistory();

    // const [usernameusers, setUsernameUsers] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [minimumstock, setMinimumStock] = useState([]);
    const [maximumstock, setMaximumStock] = useState([]);
    const [area, setArea] = useState([]);
    const [sisi, setSisi] = useState([]);
    const [display, setDisplay] = useState([]);
    const [tipe, setTipe] = useState("");
    const [tipes, setTipes] = useState([]);
    const [posisi, setPosisi] = useState("");
    const [posisi1, setPosisi1] = useState("");
    const [area1, setArea1] = useState("");
    const [sisi1, setSisi1] = useState("");
    const [display1, setDisplay1] = useState("");
    const [itemId, setItemId] = useState(1);
    const [itemTotal, setItemTotal] = useState(null);
    const [allItem, setAllItem] = useState([]);
    const [query, setQuery] = useState(null);
    const [isSearchShow, setIsSearchShow] = useState(false);
    const headers = { Authorization: `Bearer ${token}` };
	const redirectPrefix = `/admin/rak/edit/`;

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
	        `${process.env.REACT_APP_API_BASE_URL}/rak/get/${itemId}`,
	        { headers }
	      )
	      .then((data) => {
            console.log(data);
            setMinimumStock(data.data.response.minimum_stok)
            setMaximumStock(data.data.response.maximum_stok)
            setArea(data.data.response.area)
            setSisi(data.data.response.sisi)
            setDisplay(data.data.response.display)
            getRak(data.data.response.tipe)
            setPosisi(data.data.response.posisi)
            setPosisi1(data.data.response.img_posisi)
            setArea1(data.data.response.img_area)
            setSisi1(data.data.response.img_sisi)
            setDisplay1(data.data.response.img_display)

	      })
	      .catch(function (error) {
	        console.log(error);
	      });
	  };

      const getRak = (id) => {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        axios
          .get(
            `${process.env.REACT_APP_API_BASE_URL}/rak-type/list`,
            { headers }
          )
          .then((data) => {
            setTipes(data.data.response);
            setTipe(id);
          })
          .catch(function (error) {
            console.log(error);
          });
      };

	const getUser = async () => {
		let filter = {
			page: 1,
			per_page: 10,
			warehouse_id: parseInt(warehouseId),
		};
		const data = filter;

		const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/rak`, data, { headers });
		setItemTotal(res.data.total_item);
	};

	const search = async () => {
		if (Number(query) > 0) {
			const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/rak`, { rak_code: query  }, { headers });
			if (res.data.status !== 404) setAllItem(res.data);
			else {
				const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/rak`, { area: query }, { headers });
				if (res.data.status !== 404) setAllItem(res.data);
				else setAllItem(null);
			}
		} else {
			const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/rak`, { display: query }, { headers });
			if (res.data.status !== 404) setAllItem(res.data);
			else setAllItem(null);
		}
		setIsSearchShow(true);
	};

	const searchShow = (item) => {
		setItemId(item.id);
		setIsSearchShow(false);
	};

	return (
		<>
			<div>
				<SimpleHeader name="Lokasi Barang" parentName="Master" />
				<Container className="mt--6" fluid>
					<Row>
						<div className="col">
								{/* <CardBody> */}
								{/* Button card */}
								<Card className="position-sticky boxShadow" style={{ top: 0, zIndex: "5" }}>
									<CardBody className="ml-3 pb-0">
										<Row md="12">
											<Col md="5">
												<Button onClick={() => setItemId(1)} color="danger" type="button">
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
															placeholder="Search Rak"
															type="search"
															onChange={(e) => setQuery(e.target.value)}
															onKeyDown={search}
														/>
													</Col>
													<Col sm={2}>
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
													<Link className="btn btn-danger" to="/admin/rak/create">
														Tambah
													</Link>
												</div>
											</Col>
										</Row>
									</CardBody>
								</Card>

								{/* Search card */}
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
														<b>Kode Rak:</b> {item.rak_code}
													</div>
													<hr style={{ margin: "0.75rem -1rem 0 -1rem" }} />
												</CardBody>
											))
										) : (
											<div className="text-center mb-3 text-danger">User "{query}" tidak ada bosku!</div>
										)}
									</Card>
								)}
                                {/* <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                    <h3>Customer</h3>
                                </CardHeader>
                                <Row md="12">
                                                        <Col md="6">
                                    <CardBody>
                                        <FormGroup row>
                                            <Label for="exampleEmail" sm={4}>
                                                Kode Customer
                                            </Label>
                                            <Col sm={7}>
                                                <Input
                                                disabled
                                                    className="form-control-alternative"
                                                    type="text"
                                                    name="itemCode"
                                                    placeholder="Masukan Username"
                                                    value={kodeuser}
                                                    onChange={(e) => {
                                                        setKodeUser(e.target.value);
                                                    }}
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="exampleEmail" sm={4}>
                                                Nama
                                            </Label>
                                            <Col sm={7}>
                                                <Input
                                                disabled
                                                    className="form-control-alternative"
                                                    type="text"
                                                    name="barcode"
                                                    placeholder="Masukan Nama"
                                                    value={nama}
                                                    onChange={(e) => {
                                                        setNama(e.target.value);
                                                    }}
                                                />
                                            </Col>
                                        </FormGroup>
                                            <FormGroup row>
                                                <Label
                                                for="exampleEmail" sm={4}
                                            >
                                                Provinsi
                                                </Label>
                                                <Col sm={7}>
                                                <Input
                                                disabled
                                                autoComplete="off"
                                                    name="Province"
                                                    type="select"
                                                    value={province}
                                                    onChange={(e) => {
                                                    setProvince(e.target.value);
                                                    getCity(e.target.value);
                                                    }}
                                                >
                                                    <option value="">Pilih Province</option>
                                                    {
                                                    provinces.map((prov, key) => {
                                                        return <option key={key} value={prov.id}>{prov.name}</option>
                                                    })
                                                    }
                                                </Input>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                            <Label
                                                for="exampleEmail" sm={4}
                                            >
                                                Kota
                                            </Label>
                                            <Col sm={7}>
                                            <Input
                                            disabled
                                            autoComplete="off"
                                                name="Kota"
                                                type="select"
                                                value={city}
                                                onChange={(e) => {
                                                setCity(e.target.value);
                                                }}
                                            >
                                                <option value="">Pilih Kota</option>
                                                {
                                                cities.map((city, key) => {
                                                    return <option key={key} value={city.id}>{city.name}</option>
                                                })
                                                }
                                            </Input>
                                            </Col>
                                            </FormGroup>
                                    </CardBody>
                                    </Col>
                                    <Col md="6">
                                    <CardBody>
                                            <FormGroup row>
                                            <Label for="exampleEmail" sm={4}>
                                                Alamat
                                            </Label>
                                            <Col sm={7}>
                                                <Input
                                                disabled
                                                    className="form-control-alternative"
                                                    name="Supplier"
                                                    type="textarea"
                                                    rows = "5"
                                                    placeholder="Masukan alamat"
                                                    value={address}
                                                    onChange={(e) => {
                                                        setAddress(e.target.value);
                                                    }}
                                                />
                                            </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                            <Label for="exampleEmail" sm={4}>
                                                Phone
                                            </Label>
                                            <Col sm={7}>
                                                <Input
                                                disabled
                                                    className="form-control-alternative"
                                                    type="text"
                                                    placeholder="Masukan Telphone"
                                                    value={phone}
                                                    onChange={(e) => {
                                                        setPhone(e.target.value);
                                                    }}
                                                />
                                            </Col>
                                            </FormGroup>        
                                    </CardBody>
                                    </Col>
                                </Row>
                                </Card> */}
                                <Card className="bg-secondary shadow">
                                    <CardHeader className="bg-white border-0">
                                        <h3>Rak</h3>
                                    </CardHeader>
                                    <CardBody>
                                    <Row md="12">
                                        <Col md="6">
                                            <FormGroup row>
                                                <Label
                                                    for="exampleEmail"
                                                    sm={4}
                                                    >
                                                    Tipe Rak
                                                </Label>
                                                <Col sm={7}>
                                                    <Input
                                                        disabled
                                                        className="form-control-alternative"
                                                        type="select"
                                                        value={tipe}
                                                        onChange={(e) => setTipe(e.target.value)}
                                                    >
                                                    <option value="">Pilih Tipe Rak</option>
                                                        {tipes.map((Tipe, key) => {
                                                            return (
                                                            <option key={key} value={Tipe.name}>
                                                                {Tipe.name}
                                                            </option>
                                                            );
                                                        })}
                                                </Input>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                            <Label
                                                for="exampleEmail"
                                                sm={4}
                                            >
                                                Area
                                            </Label>
                                            <Col sm={7}>
                                                <Input
                                                disabled
                                                    className="form-control-alternative"
                                                type="text"
                                                name="Area"
                                                placeholder="Masukan Area"
                                                value={area}
                                                onChange={(e) => {
                                                    setArea(e.target.value);
                                                }}
                                                />
                                            </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                            <Label
                                                for="exampleEmail"
                                                sm={4}
                                            >
                                                Posisi
                                            </Label>
                                            <Col sm={7}>
                                                <Input
                                                disabled
                                                    className="form-control-alternative"
                                                type="text"
                                                name="SISI"
                                                placeholder="Masukan Posisi"
                                                value={posisi}
                                                onChange={(e) => {
                                                    setPosisi(e.target.value);
                                                }}
                                                />
                                            </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                            <Label
                                                for="exampleEmail"
                                                sm={4}
                                            >
                                                Sisi
                                            </Label>
                                            <Col sm={7}>
                                                <Input
                                                disabled
                                                    className="form-control-alternative"
                                                type="text"
                                                name="SISI"
                                                placeholder="Input Side"
                                                value={sisi}
                                                onChange={(e) => {
                                                    setSisi(e.target.value);
                                                }}
                                                />
                                            </Col>
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup row>
                                            <Label
                                                for="exampleEmail"
                                                sm={4}
                                            >
                                                Rak
                                            </Label>
                                            <Col sm={7}>
                                                <Input
                                                disabled
                                                    className="form-control-alternative"
                                                type="text"
                                                name="SISI"
                                                placeholder="Masukan Rak"
                                                value={display}
                                                onChange={(e) => {
                                                    setDisplay(e.target.value);
                                                }}
                                                />
                                            </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                            <Label
                                                for="exampleEmail"
                                                sm={4}
                                            >
                                                Stock Minimum 
                                            </Label>
                                            <Col sm={7}>
                                                <Input
                                                disabled
                                                    className="form-control-alternative"
                                                type="number"
                                                name="Minimum Stock"
                                                placeholder="Input Stock Minimum"
                                                value={minimumstock}
                                                onChange={(e) => {
                                                setMinimumStock(e.target.value);
                                                }}
                                                />
                                            </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                            <Label
                                                for="exampleEmail"
                                                sm={4}
                                            >
                                                Stock Maximum
                                            </Label>
                                            <Col sm={7}>
                                                <Input
                                                disabled
                                                    className="form-control-alternative"
                                                type="number"
                                                name="Minimum Stock"
                                                placeholder="Input Stock Maximum"
                                                value={maximumstock}
                                                onChange={(e) => {
                                                setMaximumStock(e.target.value);
                                                }}
                                                />
                                            </Col>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    </CardBody>
                                </Card>
                                <Card className="bg-secondary shadow">
                                    <CardHeader className="bg-white border-0">
                                        <h3>Planogram</h3>
                                    </CardHeader>
                                    <CardBody>
                                    <Row md="12">
                                        <Col md="12">
                                        <CardGroup>
                                            <Card>
                                                <CardImg
                                                alt="Card image cap"
                                                src={area1}
                                                top
                                                width="100%"
                                                />
                                                <CardBody>
                                                <CardTitle tag="h3" align="center">
                                                    Area
                                                </CardTitle>
                                                </CardBody>
                                            </Card>
                                           
                                            <Card>
                                                <CardImg
                                                alt="Card image cap"
                                                src={posisi1}
                                                top
                                                width="100%"
                                                />
                                                <CardBody>
                                                <CardTitle tag="h3" align="center">
                                                    Posisi
                                                </CardTitle>
                                                </CardBody>
                                            </Card>
                                            <Card>
                                                <CardImg
                                                alt="Card image cap"
                                                src={sisi1}
                                                top
                                                width="100%"
                                                />
                                                <CardBody>
                                                <CardTitle tag="h3" align="center">
                                                    Sisi
                                                </CardTitle>
                                                </CardBody>
                                            </Card>
                                            <Card>
                                                <CardImg
                                                alt="Card image cap"
                                                src={display1}
                                                top
                                                width="100%"
                                                />
                                                <CardBody>
                                                <CardTitle tag="h3" align="center">
                                                    Display
                                                </CardTitle>
                                                </CardBody>
                                            </Card>
                                            </CardGroup>
                                        </Col>
                                        {/* <Col md="6">
                                        <FormGroup row>
                                                <Label
                                                    for="exampleEmail"
                                                    sm={4}
                                                >
                                                    Planogram Sisi
                                                </Label>
                                                <Col sm={7}>
                                                <Input
                                                disabled
                                                    id="exampleFile"
                                                    name="file"
                                                    type="file"
                                                    onChange={(event) => {
                                                        setSisi1(event.target.files[0]);
                                                    }}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label
                                                    for="exampleEmail"
                                                    sm={4}
                                                >
                                                Planogram Rak
                                                </Label>
                                                <Col sm={7}>
                                                <Input
                                                disabled
                                                    id="exampleFile"
                                                    name="file"
                                                    type="file"
                                                    onChange={(event) => {
                                                        setDisplay1(event.target.files[0]);
                                                    }}
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </Col> */}
                                    </Row>
                                    </CardBody>
                                </Card>
						</div>
					</Row>
				</Container>
			</div>
		</>
	);
}
