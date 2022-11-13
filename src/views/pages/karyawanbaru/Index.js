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
    CardImg,
    CardGroup,
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
    const [posisi, setPosisi] = useState("");
    const [departement, setDepartement] = useState("");
    const [awal, setAwal] = useState("");
    const [resign, setResign] = useState("");
    const [gender, setGender] = useState([]);
    const [itemId, setItemId] = useState(1);
	const [itemTotal, setItemTotal] = useState(null);
	const [allItem, setAllItem] = useState([]);
    const [status, setStatus] = useState("");
    const [warehouse, setWarehouse] = useState("");
    const [warehouses, setWarehouses] = useState([]);
	const [query, setQuery] = useState(null);
	const [isSearchShow, setIsSearchShow] = useState(false);
	const headers = { Authorization: `Bearer ${token}` };
    const [nik,setNik] = useState("");
    const [ktp,setKtp] = useState("");
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
    const [statusKasir, setStatusKasir] = useState(true)
    const redirectPrefix = `/admin/karyawan/edit/`;
     

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
	        `${process.env.REACT_APP_API_BASE_URL}/karyawan/get/${itemId}`,
	        { headers }
	      )
	      .then((data) => {
            getWarehouse(data.data.response.warehouse_id)
            setPosisi(data.data.response.description);
            setAwal(data.data.response.recruit);
            setResign(data.data.response.resign);
            setStatus(data.data.response.active_flag);
            setNik(data.data.response.nik)
            setKtp(data.data.response.ktp)
            setImage(data.data.response.karyawan_image)
            setName(data.data.response.name)
            setDepartement(data.data.response. department)
            setDivisi(data.data.response.divisi)
            setJabatan(data.data.response.jabatan)
            setGender(data.data.response.gender)
            setKelahiran(data.data.response.kelahiran)
            setSim(data.data.response.sim)
            setNoSim(data.data.response.nomor_sim)
            setMasaSim(data.data.response.masa_sim)
            setStatusKK(data.data.response.status_kk)
            setNamaKK(data.data.response.nama_kk)
            setGenderKK(data.data.response.gender_kk)
            setAlamatKK(data.data.response.alamat_kk)
            setTeleponKK(data.data.response.telepon_kk)
            setHubunganKK(data.data.response.hubungan_kk)
            setResign(data.data.response.resign)
          
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

		const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/karyawan/page`, data, { headers });
		setItemTotal(res.data.total_item);
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

      const cekKasir = async () => {
		const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/karyawan/create-access/`, { karyawan_id: itemId  }, { headers });
		if (res.data.status === 200) {
            setStatusKasir("status sukses");
            window.location.reload("/karyawan");
        } 			
		else {
            setStatusKasir("status Gagal");
            window.location.reload("/karyawan");
        }
	};

      function UpdateKaryawan() {
        // setLoading(true);
        const headers = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };
        const myjson = JSON.stringify({
          warehouse_id: parseInt(warehouse),
          nik: nik,
          ktp: ktp,
          name:name,
          department:departement,
          divisi: divisi,
          jabatan: jabatan,
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
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/karyawan/update/${itemId}`, data, {
          headers
        })
          .then(function (response) {
            // history.push("/admin/karyawan");
            window.location.reload("/admin/karyawan");
          })
          .then(json => {
            setLoading(false);
          })
          .catch(function (error) {
            console.log(error)
          })
      }


	const search = async () => {
		if (Number(query) > 0) {
			const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/karyawan/page`, { name: query  }, { headers });
			if (res.data.status !== 404) setAllItem(res.data);
			else {
				const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/karyawan/page`, { ktp: query }, { headers });
				if (res.data.status !== 404) setAllItem(res.data);
				else setAllItem(null);
			}
		} else {
			const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/karyawan/page`, { username: query }, { headers });
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
				<SimpleHeader name="Karyawan" parentName="Master" />
				<Container className="mt--6" fluid>
					<Row>
						<div className="col">
							{/* <Form onSubmit={handleSubmit}> */}
								{/* <CardBody> */}
								{/* Button card */}
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
											<Col md="3">
												<FormGroup row>
													<Col sm={10}>
														<Input 
															className="form-control-alternative"
															placeholder="Search Karyawan"
															type="search"
															onChange={(e) => setQuery(e.target.value)}
															onKeyDown={search}
														/>
													</Col>
													<Col sm={2}>
													</Col>
												</FormGroup>
											</Col>
											<Col md="4">
												<div style={{ textAlign: "right" }}>
                                                    <Button
                                                        color="info"
                                                        onClick={() => cekKasir()}
                                                    >
                                                        Buat User
                                                    </Button>
                                                    {/* <Link className="btn btn-warning" 
                                                        to={statusKasir}>
                                                        Buat User
                                                    </Link> */}
                                                    <Link className="btn btn-info"
														to={redirectPrefix + itemId}
													>
														<i className="fas fa-user-edit" /> Edit
													</Link>
													<Link className="btn btn-danger" to="/admin/karyawan/create">
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
														<b>NIK:</b> {item.ktp ? item.ktp : "(Not available)"}
													</div>
													<div>
														<b>Username:</b> {item.username ? item.username : "(Not available)"}
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
                                        <h3>Karyawan</h3>
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
                                                        disabled
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
                                                        disabled
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
                                                        disabled
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
                                                        disabled
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
                                                    Jenis Kelamin
                                                    </Label>
                                                    <Col sm={7}>
                                                        <div style={{ display: "flex" }}>
                                                            <div className="custom-control custom-radio mb-4">
                                                                <Input 
                                                                disabled
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
                                                                disabled
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
                                                <FormGroup row>
                                                    <Label for="exampleEmail" sm={4}>
                                                        Divisi
                                                    </Label>
                                                    <Col sm={7}>
                                                        <Input 
                                                        disabled
                                                            className="form-control-alternative"
                                                            type="text"
                                                            
                                                            placeholder="Masukan Divisi"
                                                            value={divisi}
                                                            onChange={(e) => {
                                                                setDivisi(e.target.value);
                                                            }}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label for="exampleEmail" sm={4}>
                                                        Jabatan
                                                    </Label>
                                                    <Col sm={7}>
                                                        <Input 
                                                        disabled
                                                            className="form-control-alternative"
                                                            type="text"
                                                            
                                                            placeholder="Masukan Jabatan"
                                                            value={jabatan}
                                                            onChange={(e) => {
                                                                setJabatan(e.target.value);
                                                            }}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label for="exampleEmail" sm={4}>
                                                        Posisi
                                                    </Label>
                                                    <Col sm={7}>
                                                        <Input 
                                                        disabled
                                                            className="form-control-alternative"
                                                            name="Supplier"
                                                            type="text"
                                                            placeholder="Masukan Posisi"
                                                            value={posisi}
                                                            onChange={(e) => {
                                                                setPosisi(e.target.value);
                                                            }}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label for="exampleEmail" sm={4}>
                                                        Departement
                                                    </Label>
                                                    <Col sm={7}>
                                                        <Input 
                                                        disabled
                                                            className="form-control-alternative"
                                                            type="text"
                                                            
                                                            placeholder="Masukan Departement"
                                                            value={departement}
                                                            onChange={(e) => {
                                                                setDepartement(e.target.value);
                                                            }}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                            </CardBody>
										</Col>
										<Col md="6">
                                            <CardBody>
                                            <FormGroup row>
                                                    <Label for="exampleEmail" sm={4}>
                                                    </Label>
														<CardGroup>
															<Row>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																<Col md="10" align="center">
																	<Card>
																		<CardImg className="photo" alt="Card image cap" src={image} />
																	</Card>
																</Col>
															</Row>
														</CardGroup>
													</FormGroup>
                                                    <FormGroup row>
                                                        <Label for="exampleEmail" sm={4}>
                                                            SIM
                                                        </Label>
                                                        <Col sm={7}>
                                                            <Input 
                                                            disabled
                                                                className="form-control-alternative"
                                                                type="text"
                                                                
                                                                placeholder="Masukan SIM"
                                                                value={sim}
                                                                onChange={(e) => {
                                                                    setSim(e.target.value);
                                                                }}
                                                            />
                                                        </Col>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <Label for="exampleEmail" sm={4}>
                                                            No SIM
                                                        </Label>
                                                        <Col sm={7}>
                                                            <Input 
                                                            disabled
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
                                                            disabled
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
                                                            Tanggal Rekrut
                                                        </Label>
                                                        <Col sm={7}>
                                                            <Input 
                                                            disabled
                                                                className="form-control-alternative"
                                                                type="date"
                                                                name="itemCode"
                                                                placeholder="Tanggal Rekrut"
                                                                value={awal}
                                                                onChange={(e) => {
                                                                    setAwal(e.target.value);
                                                                }}
                                                            />
                                                        </Col>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <Label for="exampleEmail" sm={4}>
                                                            Resign
                                                        </Label>
                                                        <Col sm={7}>
                                                            <Input 
                                                            disabled
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
                                                    Status Karyawan
                                                    </Label>
                                                    <Col sm={7}>
                                                        <div style={{ display: "flex" }}>
                                                            <div className="custom-control custom-radio mb-4">
                                                                <Input 
                                                                disabled
                                                                className="custom-control-input"
                                                                id="customRadio13"
                                                                name="custom-radio-5"
                                                                type="radio"
                                                                value={1}
                                                                checked={status === 1}
                                                                onChange={() => setStatus(1)}
                                                                />
                                                                <Label
                                                                className="custom-control-label"
                                                                htmlFor="customRadio13"
                                                                >
                                                                Aktif
                                                                </Label>
                                                            </div>
                                                            <div
                                                                className="custom-control custom-radio mb-4"
                                                                style={{ marginLeft: "20px" }}
                                                            >
                                                                <Input 
                                                                disabled
                                                                className="custom-control-input"
                                                                id="customRadio14"
                                                                name="custom-radio-5"
                                                                type="radio"
                                                                value={2}
                                                                checked={status === 2}
                                                                onChange={() => setStatus(2)}
                                                                />
                                                                <Label
                                                                className="custom-control-label"
                                                                htmlFor="customRadio14"
                                                                >
                                                                Non Aktif
                                                                </Label>
                                                            </div>
                                                        </div>
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
                                                        disabled
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
                                                        disabled
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
                                                                disabled
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
                                                                disabled
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
                                                        disabled
                                                            className="form-control-alternative"
                                                            type="text"
                                                            
                                                            placeholder="Masukan Status"
                                                            value={statuskk}
                                                            onChange={(e) => {
                                                                setStatusKK(e.target.value);
                                                            }}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                
                                                <FormGroup row>
                                                    <Label for="exampleEmail" sm={4}>
                                                        Telephone
                                                    </Label>
                                                    <Col sm={7}>
                                                        <Input 
                                                        disabled
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
                                                        disabled
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
                                </Card>
							{/* </Form> */}
						</div>
					</Row>
				</Container>
			</div>
		</>
	);
}
