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
    const [kodeuser, setKodeUser] = useState("");
    const [nama,setNama] = useState("");
    const [alamat, setAlamat] = useState("");
    const [address, setAddress] = useState("");
	const [provinces, setProvinces] = useState([]);
	const [province, setProvince] = useState("");
	const [cities, setCities] = useState([]);
	const [city, setCity] = useState("");
    const [phone, setPhone] = useState([]);
    const [itemId, setItemId] = useState(1);
    const [itemTotal, setItemTotal] = useState(null);
    const [allItem, setAllItem] = useState([]);
    const [query, setQuery] = useState(null);
    const [isSearchShow, setIsSearchShow] = useState(false);
    const headers = { Authorization: `Bearer ${token}` };
	const redirectPrefix = `/admin/customer/edit/`;

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
	        `${process.env.REACT_APP_API_BASE_URL}/customer/get/${itemId}`,
	        { headers }
	      )
	      .then((data) => {
			getProvince(data.data.response.province);
			getCity(data.data.response.city);
            setKodeUser(data.data.response.customer_code);
            setNama(data.data.response.name);
            setAddress(data.data.response.address);
            setPhone(data.data.response.phone);

	      })
	      .catch(function (error) {
	        console.log(error);
	      });
	  };
	
	  const getProvince = (id) => {
		const headers = {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		  }
		axios.get(`${process.env.REACT_APP_API_BASE_URL}/province/list`, { headers
		})
		.then(data => {
			setProvinces(data.data.response_data)
			setProvince(id);
		})
		  .catch(function (error) {
			console.log(error)
		  })
	  }
	
	  const getCity = (id) => {
		const headers = {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		  }
		axios.get(`${process.env.REACT_APP_API_BASE_URL}/city/list`, { headers
		})
		.then(data => {
			setCities(data.data.response_data);
			setCity(id);
		})
		  .catch(function (error) {
			console.log(error)
		  })
	  }

	const handleSubmit = (e) => {
		e.preventDefault();
		{
			// EditPrice();
			// EditData();
		}
	};

    //fungsi untuk cek code 
    // const GetCekCode = async () => {
	// 	let filter = {
    //         kategori_id: parseInt(category),
    //         subkategori_id: parseInt(subCategory) 
	// 	};
	// 	const data = filter;

	// 	const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/items/check-code`, data, { headers });
    //     // console.log(res);
	// 	setCodeCek(res.data.response);
	// };

	const getUser = async () => {
		let filter = {
			page: 1,
			per_page: 10,
			warehouse_id: parseInt(warehouseId),
		};
		const data = filter;

		const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/customer`, data, { headers });
		setItemTotal(res.data.total_item);
	};

	const search = async () => {
		if (Number(query) > 0) {
			const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/customer`, { name: query  }, { headers });
			if (res.data.status !== 404) setAllItem(res.data);
			else {
				const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/customer`, { customer_code: query }, { headers });
				if (res.data.status !== 404) setAllItem(res.data);
				else setAllItem(null);
			}
		} else {
			const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/customer`, { address: query }, { headers });
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
				<SimpleHeader name="Customer" parentName="Master" />
				<Container className="mt--6" fluid>
					<Row>
						<div className="col">
							<Form onSubmit={handleSubmit}>
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
															placeholder="Search Customer"
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
													<Link className="btn btn-danger" to="/admin/customer/create">
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
														<b>Nama :</b> {item.name}
													</div>
													<div>
														<b>Kode Customer:</b> {item.username ? item.customer_code : "(Not available)"}
													</div>
													<hr style={{ margin: "0.75rem -1rem 0 -1rem" }} />
												</CardBody>
											))
										) : (
											<div className="text-center mb-3 text-danger">User "{query}" tidak ada bosku!</div>
										)}
									</Card>
								)}
              <Card className="bg-secondary shadow">
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
                </Card>
							</Form>
						</div>
					</Row>
				</Container>
			</div>
		</>
	);
}
