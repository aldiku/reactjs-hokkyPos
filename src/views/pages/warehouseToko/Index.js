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
  const [active1, setActive1] = useState(0);
  const [filtered1, setFiltered1] = useState([]);
  const [isShow1, setIsShow1] = useState(false);
  const [itemId, setItemId] = useState(1);
  const [input1, setInput1] = useState(""); 

	useEffect(() => {
		getById();
	}, [itemId]);

	const getById = () => {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        axios
          .get(
            `${process.env.REACT_APP_API_BASE_URL}/warehouse/get/toko/${itemId}`,
            { headers }
          )
          .then((data) => {
            setName(data.data.response.warehouse_name);
            setAddress(data.data.response.address);
            getProvinsi(data.data.response.province_id);
            getKota(data.data.response.city_id);
            setLongitude(data.data.response.longitude);
            setLatitude(data.data.response.latitude);
            setPhone(data.data.response.warehouse_phone);
            setFax(data.data.response.warehouse_fax);
            setNpwp(data.data.response.warehouse_npwp);
            setImage(data.data.response.image);
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


   const onChange1 = (e) => {
    const input1 = e.currentTarget.value;
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/warehouse/toko`, {

        page: 1,
        per_page: 10,
        warehouse_name: input1,
    }).then(async response => {
        let suggests = [];

        await Promise.all(response.data.response.map((data) =>
            suggests = [...suggests, data.warehouse_name]
        ));

        setActive1(0);
        setFiltered1(suggests);
        setIsShow1(true);

    });

    setInput1(e.currentTarget.value);
};

const onClick1 = e => {
    setActive1(0);
    setFiltered1([]);
    setIsShow1(false);
    setInput1(e.currentTarget.innerText);
};

const onKeyDown1 = e => {
    if (e.keyCode === 13) { // enter key
        setActive1(0);
        setIsShow1(false);
        setInput1(filtered1[active1])
    }
    else if (e.keyCode === 38) { // up arrow
        return (active1 === 0) ? null : setActive1(active1 - 1);
    }
    else if (e.keyCode === 40) { // down arrow
        return (active1 - 1 === filtered1.length) ? null : setActive1(active1 + 1);
    }
};

const AutoCompleTes1 = () => {
    if (isShow1 && input1) {
        if (filtered1.length) {
            return (
                <ul className="autocomplete">
                    {filtered1.map((suggestion1, index1) => {
                        let className;
                        if (index1 === active1) {
                            className = "active";
                        }
                        return (
                            <li key={index1} className={className} onClick={onClick1}>
                                {suggestion1}
                            </li>
                        );
                    })}
                </ul>
            );
        } else {
            return (
                <div className="no-autocomplete">
                    <em>Not found</em>
                </div>
            );
        }
    }
    return <></>;
}

//menampilkan search getbyid
const saveItem1 = () => {

    axios.post(`${process.env.REACT_APP_API_BASE_URL}/warehouse/toko`, {
        page: 1,
        per_page: 1,
        warehouse_name: input1,
    }).then(res => {
        const length = res.data.response.length;
        if (length === 0)
            return;
            const idItem = res.data.response[0].id;
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/warehouse/get/toko/${idItem}`)
            .then(async response => {
                return {
                    items: response.data.response,
                };
              }).then((data) => {
               
                setPrice6(data.items.price_6);
                setName(data.items.warehouse_name);
                setAddress(data.items.address);
                getProvinsi(data.items.province_id);
                getKota(data.items.city_id);
                setLongitude(data.items.longitude);
                setLatitude(data.items.latitude);
                setPhone(data.items.warehouse_phone);
                setFax(data.items.warehouse_fax);
                setNpwp(data.items.warehouse_npwp);
                setImage(data.items.image);
              })
              .catch(function (error) {
                console.log(error);
              });
    });
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
      .post(`${process.env.REACT_APP_API_BASE_URL}/warehouse/toko/update/${idItem}`, data, { headers })
      .then(function (response) {
        history.push("/admin/warehouse-toko");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

 

  const handleSubmit = (e) => {
    e.preventDefault();
    {
    EditData();

    }
  };

  return (
    <>
      <div>
      <SimpleHeader name="Toko" parentName="Master" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
              <Form onSubmit={handleSubmit}>
                <CardBody>
                    <Card>
                        <CardBody>
                            <Row md="12">
                                <Col md="5">
                                    <Button
                                        onClick={() => setItemId(1)}
                                        color="secondary"
                                        type="button"
                                    >
                                        First
                                    </Button>
                                    <Button
                                        onClick={() => setItemId((prev) => prev - 1)}
                                        color="success"
                                        type="button"
                                        
                                    >
                                        <i className="ni ni-bold-left" /> Prev
                                    </Button>
                                    <Button
                                        onClick={() => setItemId((prev) => prev + 1)}
                                        color="success"
                                        type="button"
                                    >
                                        Next  <i className="ni ni-bold-right" /> 
                                    </Button>
                                    <Button
                                       onClick={() => setItemId(2000)}
                                        color="warning"
                                        type="button"
                                    >
                                        End
                                    </Button>
                                </Col>
                                <Col md="4">
                                    <FormGroup row>
                                        <Col sm={7}>
                                            <Input
                                                className="form-control-alternative"
                                                placeholder="Search Toko"
                                                type="search"
                                                onChange={onChange1}
                                                onKeyDown={onKeyDown1}
                                                value={input1}
                                            />
                                            <AutoCompleTes1 />
                                        </Col>
                                        <Col sm={2}>    
                                        <Button color="primary" className="mb-3" onClick={() => saveItem1()}><i className="fa fa-search"></i></Button>                       
                                        </Col> 
                                    </FormGroup>
                                </Col>
                                <Col md="3">
                                    <div style={{ textAlign: "right" }}>
                                    <Button
                                        color="info"
                                        type="submit"
                                    >
                                        Simpan
                                    </Button>
                                        <Link className="btn btn-danger" to="/admin/warehouse-pusat/create">
                                            Tambah
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </CardBody>
                <CardBody>
                        <Row md="12">
                            <Col md="7">
                                <Card className="bg-secondary shadow">
                                    <CardHeader className="bg-white border-0">
                                    <h3>Toko</h3>
                                    </CardHeader>
                                    <CardBody>
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
                                            className="form-control-alternative"
                                            type="text"
                                            name="barcode"
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
                                    <FormGroup row>
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
                                            name="Berat"
                                            placeholder="Masukan Berat"
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
              </Form>
          </div>
        </Row>
      </Container>
      </div>
    </>
  );
}