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
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media
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
    const [address, setAddress] = useState("");
    const [city, setCity] = useState([]);
    const [longitude, setLongitude] = useState([]);
    const [latitude, setLatitude] = useState([]);
    const [province, setProvince] = useState([]);
    const [phone, setPhone] = useState("");
    const [fax, setFax] = useState("");
    const [npwp, setNpwp] = useState("");
    const [image, setImage] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [citys, setCitys] = useState([]);
    const [itemId, setItemId] = useState(1);
    const [itemTotal, setItemTotal] = useState(null);
    const [allItem, setAllItem] = useState([]);
    const [query, setQuery] = useState(null);
	const [isSearchShow, setIsSearchShow] = useState(false);
	const headers = {Authorization: `Bearer ${token}`};
    const [code, setCode] = useState("");
    const redirectPrefix = `/admin/warehouse/edit/`;

	useEffect(() => {
		getById();
        getItems();
	}, [itemId]);

	const getById = () => {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        axios
          .get(
            `${process.env.REACT_APP_API_BASE_URL}/warehouse/get/${itemId}`,
            { headers }
          )
          .then((data) => {
            setName(data.data.response.warehouse_name);
            setAddress(data.data.response.address);
            getProvinsi(data.data.response.province_id);
            setCode(data.data.response.code);
            getKota(data.data.response.city_id);
            setLongitude(data.data.response.longitude);
            setLatitude(data.data.response.latitude);
            setPhone(data.data.response.phone);
            setImage(data.data.response.logo);
          })
          .catch(function (error) {
            console.log(error);
          });
      };

    const getProvinsi = (id) => {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/province/list`, { headers
        })
        .then(data => {
            setProvinces(data.data.response_data);
            setProvince(id);
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    const getKota = (id) => {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/city/list`, { headers
        })
        .then(data => {
            setCitys(data.data.response_data);
            setCity(id);
        })
        .catch(function (error) {
            console.log(error)
        })
    }
    
    function EditData() {
        setLoading(true);{
            UpdateWarehouseToko();
        }
    }

    const UpdateWarehouseToko = () => {
        const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
        };
        
        const myjson = JSON.stringify ({
            name,
            active_flag:1,
            address,
            level:1,
            city : parseInt(city),
            longitude,
            latitude,
            province:parseInt(province),
            phone,
            fax,
            npwp
        });     
        let data = new FormData();
        data.append("body",myjson)
        data.append("logo",image)
        axios
        .post(`${process.env.REACT_APP_API_BASE_URL}/warehouse/pusat/update/${idItem}`, data, { headers })
        .then(function (response) {
            history.push("/admin/warehouse-pusat");
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    const getItems = async () => {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        let filter = {
            page: 1,
            per_page: 10,
            warehouse_id: parseInt(warehouse),
        };
        const data = filter;

        const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/warehouse/all`, data, { headers });
        setItemTotal(res.data.total_item);
    };


	const search = async () => {
		if (Number(query) > 0) {
			const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/warehouse/all`, { warehouse_name: query  }, { headers });
			if (res.data.status !== 404) setAllItem(res.data);
			else {
				const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/warehouse/all`, { province: query }, { headers });
				if (res.data.status !== 404) setAllItem(res.data);
				else setAllItem(null);
			}
		} else {
			const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/warehouse/all`, { city: query }, { headers });
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
      <SimpleHeader name="Cabang" parentName="Master" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
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
                                            placeholder="Search Cabang"
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
                                    disabled
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
                                    <UncontrolledDropdown nav>
                                        <DropdownToggle className="nav-link pr-0" color="" tag="a">
                                            <Link className="btn btn-danger" to="#">
                                                Tambah 
                                            </Link>
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <Link to="/admin/warehouse/pusat/create">
                                            <DropdownItem>
                                                <span>Pusat</span>
                                            </DropdownItem>
                                            </Link>
                                            <Link to="/admin/warehouse/toko/create">
                                            <DropdownItem>
                                                <span>Toko</span>
                                            </DropdownItem>
                                            </Link>
                                            <Link to="/admin/warehouse/gudang/create">
                                            <DropdownItem>
                                                <span>Gudang</span>
                                            </DropdownItem>
                                            </Link>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
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
                                        <b>username:</b> {item.username ? item.username : "(Not available)"}
                                    </div>
                                    <div>
                                        <b>Kode User:</b> {item.user_code ? item.user_code : "(Not available)"}
                                    </div>
                                    <hr style={{ margin: "0.75rem -1rem 0 -1rem" }} />
                                </CardBody>
                            ))
                        ) : (
                            <div className="text-center mb-3 text-danger">User "{query}" tidak ada bosku!</div>
                        )}
                    </Card>
                )}
                <CardBody>
                        <Row md="12">
                            <Col md="7">
                                <Card className="bg-secondary shadow">
                                    <CardHeader className="bg-white border-0">
                                    <h3>Cabang</h3>
                                    </CardHeader>
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
                                                placeholder="Masukan Kode Item"
                                                value={code}
                                                onChange={(e) => {
                                                setCode(e.target.value);
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
                                                placeholder="Masukan Kode Item"
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
                                            placeholder="Masukan Barcode"
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
                                            Provinsi
                                        </Label>
                                        <Col sm={7}>
                                            <Input
                                            disabled
                                            className="form-control-alternative"
                                            name="Supplier"
                                            type="select"
                                            value={province}
                                            onChange={(e) => {
                                                setProvince(e.target.value);
                                            }}
                                            >
                                            <option value="">Pilih Provinsi</option>
                                            {provinces.map((suppliers, key) => {
                                                return (
                                                <option key={key} value={suppliers.id}>
                                                    {suppliers.name}
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
                                        Kota
                                        </Label>
                                        <Col sm={7}>
                                            <Input
                                            disabled
                                            className="form-control-alternative"
                                            name="Supplier"
                                            type="select"
                                            value={city}
                                            onChange={(e) => {
                                                setCity(e.target.value);
                                            }}
                                            >
                                            <option value="">Pilih Kota</option>
                                            {citys.map((suppliers, key) => {
                                                return (
                                                <option key={key} value={suppliers.id}>
                                                    {suppliers.name}
                                                </option>
                                                );
                                            })}
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    {/* <FormGroup row>
                                        <Label
                                            for="exampleEmail"
                                            sm={4}
                                        >
                                            Longitude
                                        </Label>
                                        <Col sm={7}>
                                            <Input
                                                className="form-control-alternative"
                                                type="text"
                                                name="nomorPart"
                                                placeholder="Masukan Longitude"
                                                value={longitude}
                                                onChange={(e) => {
                                                setLongitude(e.target.value);
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                    <Label
                                        for="exampleEmail"
                                        sm={4}
                                    >
                                        Latitude
                                    </Label>
                                    <Col sm={7}>
                                        <Input
                                            className="form-control-alternative"
                                            type="text"
                                            name="Berat"
                                            placeholder="Masukan Latitude"
                                            value={latitude}
                                            onChange={(e) => {
                                            setLatitude(e.target.value);
                                            }}
                                        />
                                    </Col>
                                    </FormGroup> */}
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
                                            name="Berat"
                                            placeholder="Masukan phone"
                                            value={phone}
                                            onChange={(e) => {
                                            setPhone(e.target.value);
                                            }}
                                        />
                                    </Col>
                                    </FormGroup>
                                    </CardBody>
                              </Card>
                            </Col>
                            <Col md="5">
                                <Card className="bg-secondary shadow">
                                    <CardHeader className="bg-white border-0">
                                    <h3 >Gambar</h3>
                                    </CardHeader>
                                    <CardBody>
                                        <FormGroup row>
                                            <CardGroup>
                                                &nbsp;
                                                &nbsp;
                                                &nbsp;
                                                <Row>
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
                            </Col>
                        </Row>
                </CardBody>
                {/* <CardBody>
                    <Card>
                        <CardBody>
                            <Row md="12">
                                <Col md="3"></Col>
                                <Col md="8">
                                    <Link className="btn btn-danger" to="/admin/warehouse/pusat">
                                            Cabang Pusat
                                    </Link>
                                    <Link className="btn btn-danger" to="/admin/warehouse/toko">
                                            Cabang Toko
                                    </Link>
                                    <Link className="btn btn-danger" to="/admin/warehouse/gudang">
                                            Cabang Gudang
                                    </Link>
                                    <Button
                                       onClick={() => setItemId(2000)}
                                        color="warning"
                                        type="button"
                                    >
                                        Gudang Pusat
                                    </Button>
                                </Col>
                                <Col md="2"></Col>
                            </Row>
                        </CardBody>
                    </Card>
                </CardBody> */}
          </div>
        </Row>
      </Container>
      </div>
    </>
  );
}