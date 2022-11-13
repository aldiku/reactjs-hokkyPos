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
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function Userss(props) {
	const token = localStorage.token;
    const [isLoading,setLoading] = useState(false);
	const warehouseId = localStorage.warehouse;
	const username = localStorage.username;
	let history = useHistory();
    const [posisi, setPosisi] = useState("");
    const [departement, setDepartement] = useState("");
    const [awal, setAwal] = useState("");
    const [resign, setResign] = useState("");
    const [gender, setGender] = useState([]);
    const [unit, setUnit] = useState("");
    const [itemId, setItemId] = useState(1);
    const [status, setStatus] = useState("");
    const [warehouse, setWarehouse] = useState("");
    const [warehouses, setWarehouses] = useState([]);
    const [nik,setNik] = useState("");
    const [ktp,setKtp] = useState("");
    const [alamat, setAlamat] = useState("");
    const [image,setImage] = useState("");
    const [name,setName] = useState("");
    const [divisi,setDivisi] = useState("");
    const [jabatan,setJabatan] = useState("");
    const [kelahiran,setKelahiran] = useState("");
    const [sim,setSim] = useState("");
    const [nosim,setNoSim] = useState("");
    const [statuskk,setStatusKK] = useState("");
    const [namakk,setNamaKK] = useState("");
    const [genderkk,setGenderKK] = useState("");
    const [alamatkk,setAlamatKK] = useState("");
    const [teleponkk,setTeleponKK] = useState("");
    const [hubungankk,setHubunganKK] = useState("");
    const [masasim,setMasaSim] = useState("");
    const [provinces, setProvinces] = useState([]);
    const [province, setProvince] = useState([]);
    const [citys, setCitys] = useState([]);
    const [city,setCity] = useState([]);
     
	useEffect(() => {
        getById();
        getProvinsi();
        getKota();
	}, [itemId]);

	  const getById = () => {
	    const headers = {
	      "Content-Type": "application/json",
	      Authorization: `Bearer ${token}`,
	    };
	    axios
	      .get(
	        `${process.env.REACT_APP_API_BASE_URL}/karyawan/get/${props.match.params.id}`,
	        { headers }
	      )
	      .then((data) => {
            getWarehouse(data.data.response.warehouse_id);
            getProvinsi(data.data.response.province_id);
            getKota(data.data.response.city_id);
            setPosisi(data.data.response.description);
            setAwal(data.data.response.recruit);
            setResign(data.data.response.resign);
            setStatus(data.data.response.active_flag);
            setNik(data.data.response.nik);
            setKtp(data.data.response.ktp);
            setImage(data.data.response.karyawan_image);
            setName(data.data.response.name);
            setDepartement(data.data.response. department);
            setDivisi(data.data.response.divisi);
            setJabatan(data.data.response.jabatan);
            setGender(data.data.response.gender);
            setKelahiran(data.data.response.kelahiran);
            setSim(data.data.response.sim);
            setNoSim(data.data.response.nomor_sim);
            setMasaSim(data.data.response.masa_sim);
            setStatusKK(data.data.response.status_kk);
            setNamaKK(data.data.response.nama_kk);
            setGenderKK(data.data.response.gender_kk);
            setAlamatKK(data.data.response.alamat_kk);
            setTeleponKK(data.data.response.telepon_kk);
            setHubunganKK(data.data.response.hubungan_kk);
            setResign(data.data.response.resign);
          
	      })
	      .catch(function (error) {
	        console.log(error);
	      });
	  };

    const getWarehouse = (id) => {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        axios
          .get(
            `${process.env.REACT_APP_API_BASE_URL}/warehouse/list/all`,
            { headers }
          )
          .then((data) => {
            setWarehouses(data.data.response);
            setWarehouse(id)
          })
          .catch(function (error) {
            console.log(error);
          });
      };

      const getProvinsi = () => {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/province/list`, { headers
        })
        .then(data => {
          setProvinces(data.data.response_data);
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
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/city?province_id=${id}`, { headers
        })
        .then(data => {
          setCitys(data.data.response_data);
        })
          .catch(function (error) {
            console.log(error)
          })
      }

      function UpdateKaryawan() {
        setLoading(true);
        const headers = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };
        const myjson = JSON.stringify({
          warehouse_id: parseInt(warehouse),
          nik: nik,
          ktp: ktp,
          name:name,
          address: alamat,
          department: parseInt(departement),
          divisi: parseInt(divisi),
          jabatan: parseInt(jabatan),
          province: parseInt(province),
          city: parseInt(city),
          gender: parseInt(gender),
          kelahiran: kelahiran,
          sim: sim,
          nomor_sim:parseInt(nosim),
          masa_sim: masasim,
          status_kk:statuskk,
          nama_kk:namakk,
          gender_kk:parseInt(genderkk),
          alamat_kk:alamatkk,
          telepon_kk:teleponkk,
          hubungan_kk:hubungankk,
          recruit:awal,
          posisi: posisi,
          active_flag: parseInt(status),
        });
        let data = new FormData();
        data.append("body",myjson)
        data.append("profile",image)
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/karyawan/update/${props.match.params.id}`, data, {
          headers
        })
          .then(function (response) {
            history.push("/admin/karyawan");
            // window.location.reload("/admin/karyawan");
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
			<div>
				<SimpleHeader name="Edit Karyawan" parentName="Master" />
				<Container className="mt--6" fluid>
					<Row>
						<div className="col">
                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                    <h3>Edit Karyawan</h3>
                                </CardHeader>
                                <Row md="12">
                                    <Col md="6">
                                        <CardBody>
                                            <FormGroup row>
                                            <Label for="exampleEmail" sm={4}>
                                                Cabang
                                            </Label>
                                            <Col sm={7}>
                                                <Input
                                                autoComplete="off"
                                                disabled
                                                className="form-control-alternative"
                                                name="person"
                                                type="select"
                                                value={warehouse}
                                                onChange={(e) => {
                                                    setWarehouse(e.target.value);
                                                }}
                                                >
                                                <option value=''>Pilih Cabang</option>
                                                {warehouses.map((warehouse2, key) => {
                                                    return (
                                                        <option key={key} value={warehouse2.id}>
                                                        {warehouse2.name}
                                                        </option>
                                                    );
                                                    })}
                                                </Input>
                                            </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="exampleEmail" sm={4}>
                                                    NIP
                                                </Label>
                                                <Col sm={7}>
                                                    <Input
                                                    autoComplete="off"
                                                        className="form-control-alternative"
                                                        type="text"
                                                        
                                                        placeholder="Masukan Nomor Induk Pegawai"
                                                        value={nik}
                                                        onChange={(e) => {
                                                            setNik(e.target.value);
                                                        }}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="exampleEmail" sm={4}>
                                                    KTP
                                                </Label>
                                                <Col sm={7}>
                                                    <Input
                                                    autoComplete="off"
                                                        className="form-control-alternative"
                                                        type="text"
                                                        
                                                        placeholder="Masukan KTP"
                                                        value={ktp}
                                                        onChange={(e) => {
                                                            setKtp(e.target.value);
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
                                                    autoComplete="off"
                                                        className="form-control-alternative"
                                                        type="text"
                                                        name="barcode"
                                                        placeholder="Masukan Nama"
                                                        value={name}
                                                        onChange={(e) => {
                                                            setName(e.target.value);
                                                        }}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="exampleEmail" sm={4}>
                                                    Kelahiran
                                                </Label>
                                                <Col sm={7}>
                                                    <Input
                                                    autoComplete="off"
                                                        className="form-control-alternative"
                                                        type="date"
                                                        
                                                        placeholder="Masukan Kelahiran"
                                                        value={kelahiran}
                                                        onChange={(e) => {
                                                            setKelahiran(e.target.value);
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
                                                    autoComplete="off"
                                                        className="form-control-alternative"
                                                        type="select"
                                                        value={province}
                                                        onChange={(e) => {
                                                        setProvince(e.target.value);
                                                        getKota(e.target.value);
                                                        }}
                                                    >
                                                        <option>Pilih Provinsi</option>
                                                        {
                                                        provinces.map((a, key) => {
                                                            return <option key={key} value={a.id}>{a.name}</option>
                                                        })
                                                        }
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
                                                    autoComplete="off"
                                                        className="form-control-alternative"
                                                        name="function"
                                                        type="select"
                                                        value={city}
                                                        onChange={(e) => {
                                                        setCity(e.target.value);
                                                        }}
                                                    >
                                                        <option>Pilih Kota</option>
                                                        {
                                                        citys.map((b, key) => {
                                                            return <option key={key} value={b.id}>{b.name}</option>
                                                        })
                                                        }
                                                    </Input>
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
                                                    autoComplete="off"
                                                        className="form-control-alternative"
                                                        placeholder="Masukan Alamat"
                                                        Rows="5"
                                                        type="textarea"
                                                        value={alamat}
                                                        onChange={(e) => {
                                                        setAlamat(e.target.value);
                                                        }}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label
                                                for="exampleEmail"
                                                sm={4}
                                                >
                                                Jenis Kelamin
                                                </Label>
                                                <Col sm={7}>
                                                    <div style={{ display: "flex" }}>
                                                        <div className="custom-control custom-radio mb-4">
                                                            <Input
                                                            autoComplete="off"
                                                            className="custom-control-input"
                                                            id="customRadio10"
                                                            name="custom-radio-4"
                                                            type="radio"
                                                            value={1}
                                                            checked={gender === 1}
                                                            onChange={() => setGender(1)}
                                                            />
                                                            <Label
                                                            className="custom-control-label"
                                                            htmlFor="customRadio10"
                                                            >
                                                            Laki-Laki
                                                            </Label>
                                                        </div>
                                                        <div
                                                            className="custom-control custom-radio mb-4"
                                                            style={{ marginLeft: "20px" }}
                                                        >
                                                            <Input
                                                            autoComplete="off"
                                                            className="custom-control-input"
                                                            id="customRadio11"
                                                            name="custom-radio-4"
                                                            type="radio"
                                                            value={2}
                                                            checked={gender === 2}
                                                            onChange={() => setGender(2)}
                                                            />
                                                            <Label
                                                            className="custom-control-label"
                                                            htmlFor="customRadio11"
                                                            >
                                                            Perempuan
                                                            </Label>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </FormGroup>
                                        </CardBody>
                                    </Col>
                                    <Col md="6">
                                        <CardBody>
                                            <FormGroup row>
                                                <Label for="exampleEmail" sm={4}>
                                                    Jabatan
                                                </Label>
                                                <Col sm={7}>
                                                    <Input
                                                    autoComplete="off"
                                                        className="form-control-alternative"
                                                        type="select"
                                                        
                                                        placeholder="Masukan Jabatan"
                                                        value={jabatan}
                                                        onChange={(e) => {
                                                            setJabatan(e.target.value);
                                                        }}>
                                                        <option value="" disabled selected hidden>Pilih Jabatan</option>
                                                        <option value="1">Manajer</option>
                                                        <option value="2">Supervisor</option>
                                                        <option value="3">Staff</option>
                                                    </Input>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="exampleEmail" sm={4}>
                                                    Divisi
                                                </Label>
                                                <Col sm={7}>
                                                    <Input
                                                    autoComplete="off"
                                                        className="form-control-alternative"
                                                        type="select"
                                                        
                                                        placeholder="Masukan Divisi"
                                                        value={divisi}
                                                        onChange={(e) => {
                                                            setDivisi(e.target.value);
                                                        }} >
                                                        <option value="" disabled selected hidden>Pilih Divisi</option>
                                                        <option value="1">Corporate</option>
                                                        <option value="2">Operation</option>
                                                        <option value="3">Office</option>
                                                        </Input>
                                                </Col>
                                            </FormGroup>  
                                            <FormGroup row>
                                                <Label for="exampleEmail" sm={4}>
                                                    Departement
                                                </Label>
                                                <Col sm={7}>
                                                    <Input
                                                    autoComplete="off"
                                                        className="form-control-alternative"
                                                        type="select"
                                                        
                                                        placeholder="Masukan Departement"
                                                        value={departement}
                                                        onChange={(e) => {
                                                            setDepartement(e.target.value);
                                                        }} >
                                                        <option value="" disabled selected hidden>Pilih Departement</option>
                                                        <option value="1">Corporate</option>
                                                        <option value="2">Audit</option>
                                                        <option value="3">Kasir</option>
                                                        <option value="4">Sales Consultant</option>
                                                        <option value="5">Logistic</option>
                                                        <option value="6">Delivery</option>
                                                        <option value="7">Finance</option>
                                                        <option value="8">Purchasing</option>
                                                        <option value="9">MIS</option>
                                                        <option value="10">Design & visual merchandising</option>
                                                        <option value="11">HRD</option>
                                                        <option value="12">Housekeeping</option>
                                                        </Input>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="exampleEmail" sm={4}>
                                                    Unit
                                                </Label>
                                                <Col sm={7}>
                                                    <Input
                                                    autoComplete="off"
                                                        className="form-control-alternative"
                                                        name="Supplier"
                                                        type="select"
                                                        placeholder="Masukan Unit"
                                                        value={unit}
                                                        onChange={(e) => {
                                                            setUnit(e.target.value);
                                                        }}
                                                        >
                                                        <option value="" disabled selected hidden>Pilih Unit</option>
                                                        <option value="1">-</option>
                                                        <option value="2">Kasir</option>
                                                        <option value="3">Sales Consultant</option>
                                                        <option value="4">Logistic</option>
                                                        <option value="5">Helper</option>
                                                        <option value="6">Driver</option>
                                                        <option value="7">Kernet</option>
                                                        <option value="8">Finance</option>
                                                        <option value="9">Accounting</option>
                                                        <option value="10">A/R</option>
                                                        <option value="11">A/P</option>
                                                        <option value="12">Purchasing</option>
                                                        <option value="13">Admin Proyek</option>
                                                        <option value="14">Logistik Proyek</option>
                                                        <option value="15">IT</option>
                                                        <option value="16">Support</option>
                                                        <option value="17">Desain</option>
                                                    </Input>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="exampleEmail" sm={4}>
                                                    Posisi
                                                </Label>
                                                <Col sm={7}>
                                                    <Input
                                                    autoComplete="off"
                                                        className="form-control-alternative"
                                                        name="Supplier"
                                                        type="select"
                                                        placeholder="Masukan Posisi"
                                                        value={posisi}
                                                        onChange={(e) => {
                                                            setPosisi(e.target.value);
                                                        }}
                                                        >
                                                        <option value="" disabled selected hidden>Pilih Posisi</option>
                                                        <option value="1">Toko</option>
                                                        <option value="2">Office</option>
                                                    </Input>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="exampleEmail" sm={4}>
                                                    SIM
                                                </Label>
                                                <Col sm={7}>
                                                    <Input
                                                    autoComplete="off"
                                                        className="form-control-alternative"
                                                        type="select"
                                                        
                                                        placeholder="Masukan SIM"
                                                        value={sim}
                                                        onChange={(e) => {
                                                            setSim(e.target.value);
                                                        }} >
                                                        <option value="" disabled selected hidden>Pilih SIM</option>
                                                        <option value="A">A</option>
                                                        <option value="BUmum">B Umum</option>
                                                        <option value="B1">B1</option>
                                                        <option value="B2">B2</option>
                                                        <option value="C">C</option>
                                                        <option value="D">D</option>
                                                    </Input>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="exampleEmail" sm={4}>
                                                    No SIM
                                                </Label>
                                                <Col sm={7}>
                                                    <Input
                                                    autoComplete="off"
                                                        className="form-control-alternative"
                                                        type="text"
                                                        
                                                        placeholder="Masukan No SIM"
                                                        value={nosim}
                                                        onChange={(e) => {
                                                            setNoSim(e.target.value);
                                                        }}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="exampleEmail" sm={4}>
                                                    Masa Berlaku SIM
                                                </Label>
                                                <Col sm={7}>
                                                    <Input
                                                    autoComplete="off"
                                                        className="form-control-alternative"
                                                        type="date"
                                                        
                                                        placeholder="Masukan Masa Berlaku SIM"
                                                        value={masasim}
                                                        onChange={(e) => {
                                                            setMasaSim(e.target.value);
                                                        }}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="exampleEmail" sm={4}>
                                                    Tanggal Bekerja
                                                </Label>
                                                <Col sm={7}>
                                                    <Input
                                                    autoComplete="off"
                                                        className="form-control-alternative"
                                                        type="date"
                                                        name="itemCode"
                                                        placeholder="Tanggal Bekerja"
                                                        value={awal}
                                                        onChange={(e) => {
                                                            setAwal(e.target.value);
                                                        }}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="exampleEmail" sm={4}>
                                                    Tanggal Resign
                                                </Label>
                                                <Col sm={7}>
                                                    <Input
                                                    autoComplete="off" 
                                                        className="form-control-alternative"
                                                        type="date"
                                                        name="barcode"
                                                        placeholder="Tanggal Resign"
                                                        value={resign}
                                                        onChange={(e) => {
                                                            setResign(e.target.value);
                                                        }}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label
                                                    for="exampleEmail"
                                                    sm={4}
                                                >
                                                    Profile
                                                </Label>
                                                <Col sm={7}>
                                                <Input
                                                autoComplete="off"
                                                    className="form-control-alternative"
                                                    id="exampleFile"
                                                    name="file"
                                                    type="file"
                                                    onChange={(event) => {
                                                        setImage(event.target.files[0]);
                                                    }}
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </CardBody>
                                    </Col>
                                </Row>
                            </Card>
                                <Card className="bg-secondary shadow">
                                    <CardHeader className="bg-white border-0">
                                        <h3>DATA SAUDARA</h3>
                                    </CardHeader>
                                    <Row md="12">
                                        <Col md="6">
                                            <CardBody>
                                                <FormGroup row>
                                                    <Label for="exampleEmail" sm={4}>
                                                        Nama 
                                                    </Label>
                                                    <Col sm={7}>
                                                        <Input
                                                        autoComplete="off"
                                                            className="form-control-alternative"
                                                            type="text"
                                                            
                                                            placeholder="Masukan Nama Lengkap"
                                                            value={namakk}
                                                            onChange={(e) => {
                                                                setNamaKK(e.target.value);
                                                            }}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label for="exampleEmail" sm={4}>
                                                        Alamat
                                                    </Label>
                                                    <Col sm={7}>
                                                        <Input
                                                        autoComplete="off"
                                                            className="form-control-alternative"
                                                            type="text"
                                                            
                                                            placeholder="Masukan Alamat"
                                                            value={alamatkk}
                                                            onChange={(e) => {
                                                                setAlamatKK(e.target.value);
                                                            }}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label
                                                    for="exampleEmail"
                                                    sm={4}
                                                    >
                                                    Jenis Kelamin
                                                    </Label>
                                                    <Col sm={7}>
                                                        <div style={{ display: "flex" }}>
                                                            <div className="custom-control custom-radio mb-3">
                                                                <Input
                                                                autoComplete="off"
                                                                className="custom-control-input"
                                                                id="customRadio13"
                                                                name="custom-radio-5"
                                                                type="radio"
                                                                value={1}
                                                                checked={genderkk === 1}
                                                                onChange={() => setGenderKK(1)}
                                                                />
                                                                <Label
                                                                className="custom-control-label"
                                                                htmlFor="customRadio13"
                                                                >
                                                                Laki-Laki
                                                                </Label>
                                                            </div>
                                                            <div
                                                                className="custom-control custom-radio mb-3"
                                                                style={{ marginLeft: "20px" }}
                                                            >
                                                                <Input
                                                                autoComplete="off"
                                                                className="custom-control-input"
                                                                id="customRadio14"
                                                                name="custom-radio-5"
                                                                type="radio"
                                                                value={2}
                                                                checked={genderkk === 2}
                                                                onChange={() => setGenderKK(2)}
                                                                />
                                                                <Label
                                                                className="custom-control-label"
                                                                htmlFor="customRadio14"
                                                                >
                                                                Perempuan
                                                                </Label>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </FormGroup>
                                            </CardBody>
                                        </Col>
                                        <Col md="6">
                                            <CardBody>
                                                <FormGroup row>
                                                    <Label for="exampleEmail" sm={4}>
                                                        Status Perkawinan
                                                    </Label>
                                                    <Col sm={7}>
                                                        <Input
                                                        autoComplete="off"
                                                            className="form-control-alternative"
                                                            type="select"
                                                            
                                                            placeholder="Masukan Status"
                                                            value={statuskk}
                                                            onChange={(e) => {
                                                                setStatusKK(e.target.value);
                                                            }}>
                                                            <option value="" selected hidden disabled >Pilih Status Perkawinan</option>
                                                            <option value="1">Belum Nikah</option>
                                                            <option value="2">Sudah Nikah</option>
                                                        </Input>
                                                    </Col>
                                                </FormGroup>
                                                
                                                <FormGroup row>
                                                    <Label for="exampleEmail" sm={4}>
                                                        Telephone
                                                    </Label>
                                                    <Col sm={7}>
                                                        <Input
                                                        autoComplete="off"
                                                            className="form-control-alternative"
                                                            type="text"
                                                            
                                                            placeholder="Masukan Telepone"
                                                            value={teleponkk}
                                                            onChange={(e) => {
                                                                setTeleponKK(e.target.value);
                                                            }}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label for="exampleEmail" sm={4}>
                                                        Hubungan
                                                    </Label>
                                                    <Col sm={7}>
                                                        <Input
                                                        autoComplete="off"
                                                            className="form-control-alternative"
                                                            type="text"
                                                            
                                                            placeholder="Masukan Hubungan"
                                                            value={hubungankk}
                                                            onChange={(e) => {
                                                                setHubunganKK(e.target.value);
                                                            }}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                            </CardBody>
                                        </Col>
                                    </Row>
                                    <CardFooter>
                                        {!isLoading && (<Button color="primary"  onClick={() => UpdateKaryawan()}>
                                            Simpan
                                        </Button>)}
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
                                </Card>
							{/* </Form> */}
						</div>
					</Row>
				</Container>
			</div>
		</>
	);
}
