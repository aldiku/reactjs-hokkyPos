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
    Nav,
	Container,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function Promo() {
	const token = localStorage.token;
	const warehouseId = localStorage.warehouse;
	const username = localStorage.username;
  const redirectPrefix = `/admin/promo/edit/`;
	let history = useHistory();

    const [itemId, setItemId] = useState(1);
    const [itemTotal, setItemTotal] = useState(null);
    const [allItem, setAllItem] = useState([]);
    const [warehouse, setWarehouse] = useState("");
    const [warehouses, setWarehouses] = useState([]);
    const [query, setQuery] = useState(null);
    const [isSearchShow, setIsSearchShow] = useState(false);
    const headers = { Authorization: `Bearer ${token}` };
    const [usernameuserss, setUsernameUserss] = useState("");
    const [codepromo, setCodePromo] = useState("");
    const [namapromo, setNamaPromo] = useState("");
    const [minimalbeli, setMinimalBeli] = useState("");
    const [maksimalpotongan, setMaksimalPotongan] = useState("");
    const [promopersen, setPromoPersen] = useState("");
    const [promonominal, setPromoNominal] = useState("");
    const [keterangan, setKeterangan] = useState("");
    const [type, setType] = useState("");
    const [globaltype, setGlobalType] = useState("");
    const [uniontype, setUnionType] = useState("");
    const [senin, setSenin] = useState("");
    const [selasa, setSelasa] = useState("");
    const [rabu, setRabu] = useState("");
    const [kamis, setKamis] = useState("");
    const [jumat, setJumat] = useState("");
    const [sabtu, setSabtu] = useState("");
    const [minggu, setMinggu] = useState("");
    const [bulan, setBulan] = useState("");
    const [tahun, setTahun] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [status, setStatus] = useState("");
     
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
	        `${process.env.REACT_APP_API_BASE_URL}/promo/get/${itemId}`,
	        { headers }
	      )
	      .then((data) => {
            getWarehouse(data.data.response.promo.warehouse_id)
            setUsernameUserss(data.data.response.promo.username);
            setCodePromo(data.data.response.promo.promo_code);
            setNamaPromo(data.data.response.promo.promo_name);
            setMinimalBeli(data.data.response.promo.minimal_pembelian);
            setMaksimalPotongan(data.data.response.promo.maksimal_potongan)
            setPromoPersen(data.data.response.promo.promo_persen)
            setPromoNominal(data.data.response.promo.promo_nominal)
            setKeterangan(data.data.response.promo.keterangan)
            setType(data.data.response.promo.type)
            setGlobalType(data.data.response.promo.global_type)
            setUnionType(data.data.response.promo.union_type)
            setSenin(data.data.response.promo.senin)
            setSelasa(data.data.response.promo.selasa)
            setRabu(data.data.response.promo.rabu)
            setKamis(data.data.response.promo.kamis)
            setJumat(data.data.response.promo.jumat)
            setSabtu(data.data.response.promo.sabtu)
            setMinggu(data.data.response.promo.minggu)
            setBulan(data.data.response.promo.bulan)
            setTahun(data.data.response.promo.tahun)
            setStart(data.data.response.promo.start_date)
            setEnd(data.data.response.promo.end_date)
            setStatus(data.data.response.promo.active_flag)
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

		const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/promo/page`, data, { headers });
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

      function UpdatePromo() {
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
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/promo/update/${itemId}`, data, {
          headers
        })
          .then(function (response) {
            window.location.reload("/admin/promo");
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
			const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/promo/page`, { name: query  }, { headers });
			if (res.data.status !== 404) setAllItem(res.data);
			else {
				const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/promo/page`, { ktp: query }, { headers });
				if (res.data.status !== 404) setAllItem(res.data);
				else setAllItem(null);
			}
		} else {
			const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/promo/page`, { username: query }, { headers });
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
				<SimpleHeader name="Promo" parentName="Master" />
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
															placeholder="Search Promo"
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
                                                    {/* <Button
                                                        color="info"
                                                        onClick={() => UpdatePromo()}
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
                                                            <Link to="/admin/promo/create">
                                                            <DropdownItem>
                                                                {/* <i className="ni ni-discount" /> */}
                                                                <span>Promo Per Item</span>
                                                            </DropdownItem>
                                                            </Link>
                                                            <Link to="/admin/promo/create-transaksi">
                                                            <DropdownItem>
                                                                {/* <i className="ni ni-lock-circle-open" /> */}
                                                                <span>Promo Transaksi</span>
                                                            </DropdownItem>
                                                            </Link>
                                                            <Link to="/admin/promo/create-kategori">
                                                            <DropdownItem>
                                                                {/* <i className="ni ni-lock-circle-open" /> */}
                                                                <span>Promo Kategori</span>
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
											allItem.response.promo.map((item) => (
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
                      <h3>Promo</h3>
                  </CardHeader>
                  <Row md="12">
					<Col md="6">
                      <CardBody>
                          <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                  Username
                              </Label>
                              <Col sm={7}>
                                  <Input
                                  disabled
                                      className="form-control-alternative"
                                      type="text"
                                      
                                      placeholder="Masukan Nomor Induk Pegawai"
                                      value={usernameuserss}
                                      onChange={(e) => {
                                          setUsernameUserss(e.target.value);
                                      }}
                                  />
                              </Col>
                          </FormGroup>
                          <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                  Kode Promo
                              </Label>
                              <Col sm={7}>
                                  <Input
                                  disabled
                                      className="form-control-alternative"
                                      type="text"
                                      
                                      placeholder="Masukan Kode Promo"
                                      value={codepromo}
                                      onChange={(e) => {
                                          setCodePromo(e.target.value);
                                      }}
                                  />
                              </Col>
                          </FormGroup>
                          <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                  Nama Promo
                              </Label>
                              <Col sm={7}>
                                  <Input
                                  disabled
                                      className="form-control-alternative"
                                      type="text"
                                      name="barcode"
                                      placeholder="Masukan Nama Promo"
                                      value={namapromo}
                                      onChange={(e) => {
                                          setPromo(e.target.value);
                                      }}
                                  />
                              </Col>
                          </FormGroup>
                          <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                  Keterangan
                              </Label>
                              <Col sm={7}>
                                  <Input
                                  disabled
                                      className="form-control-alternative"
                                      type="textarea"
                                      
                                      rows ="14"
                                      placeholder="Masukan Keterangan"
                                      value={keterangan}
                                      onChange={(e) => {
                                          setKeterangan(e.target.value);
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
                                  Minimal Pembelian
                              </Label>
                              <Col sm={7}>
                                  <Input
                                  disabled
                                      className="form-control-alternative"
                                      type="text"
                                      
                                      placeholder="Masukan Minimal Pembelian"
                                      value={minimalbeli}
                                      onChange={(e) => {
                                          setMinimalBeli(e.target.value);
                                      }}
                                  />
                              </Col>
                          </FormGroup>
                          <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                  Maksimal Potongan
                              </Label>
                              <Col sm={7}>
                                  <Input
                                  disabled
                                      className="form-control-alternative"
                                      type="text"
                                      
                                      placeholder="Masukan Maksimal Potongan"
                                      value={maksimalpotongan}
                                      onChange={(e) => {
                                          setMaksimalPotongan(e.target.value);
                                      }}
                                  />
                              </Col>
                          </FormGroup>
                          <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                  Maksimal Potongan
                              </Label>
                              <Col sm={7}>
                                  <Input
                                  disabled
                                      className="form-control-alternative"
                                      type="text"
                                      
                                      placeholder="Masukan Maksimal Potongan"
                                      value={maksimalpotongan}
                                      onChange={(e) => {
                                          setMaksimalPotongan(e.target.value);
                                      }}
                                  />
                              </Col>
                          </FormGroup>
                          <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                  Promo Persen
                              </Label>
                              <Col sm={7}>
                                  <Input
                                  disabled
                                      className="form-control-alternative"
                                      type="text"
                                      
                                      placeholder="Masukan Promo Persen"
                                      value={promopersen}
                                      onChange={(e) => {
                                          setPromoPersen(e.target.value);
                                      }}
                                  />
                              </Col>
                          </FormGroup>
                          <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                  Promo Nominal
                              </Label>
                              <Col sm={7}>
                                  <Input
                                  disabled
                                      className="form-control-alternative"
                                      type="text"
                                      
                                      placeholder="Masukan Promo Nominal"
                                      value={promonominal}
                                      onChange={(e) => {
                                          setPromoNominal(e.target.value);
                                      }}
                                  />
                              </Col>
                          </FormGroup>
                          <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                  Tipe Promo
                              </Label>
                              <Col sm={7}>
                                  <Input
                                  disabled
                                      className="form-control-alternative"
                                      name="Supplier"
                                      type="select"
                                      placeholder="Masukan Type"
                                      value={type}
                                      onChange={(e) => {
                                          setType(e.target.value);
                                      }} >
                                    <option value="" disabled selected hidden> Tipe Promo</option>
                                    <option value="1">Promo Transaksi</option>
                                    <option value="2">Promo Per Item</option>
                                    <option value="3">Promo Kategori</option>
                                  </Input>
                              </Col>
                          </FormGroup>
                          <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                  Global Promo
                              </Label>
                              <Col sm={7}>
                                  <Input
                                  disabled
                                      className="form-control-alternative"
                                      name="Supplier"
                                      type="select"
                                      placeholder="Masukan Global Type"
                                      value={globaltype}
                                      onChange={(e) => {
                                          setGlobalType(e.target.value);
                                      }}>
                                        <option value="" disabled selected hidden> Tipe Global Promo</option>
                                        <option value="1">Semua Cabang</option>
                                        <option value="2">Cabang Tertenu</option>
                                  </Input>
                              </Col>
                          </FormGroup>
                          <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                  Gabungan Promo
                              </Label>
                              <Col sm={7}>
                                  <Input
                                  disabled
                                      className="form-control-alternative"
                                      name="Supplier"
                                      type="select"
                                      placeholder="Masukan Union Type"
                                      value={uniontype}
                                      onChange={(e) => {
                                          setUnionType(e.target.value);
                                      }}>
                                        <option value="" disabled selected hidden> Tipe Gabungan Promo</option>
                                        <option value="1">Terpisah</option>
                                        <option value="2">Tergabung</option>
                                  </Input>
                              </Col>
                          </FormGroup>
                      </CardBody>
										</Col>
									</Row>
                </Card>
                {/* Hari */}
                <Card className="bg-secondary shadow">
                  <CardHeader className="bg-white border-0">
                      <h3>Masa Aktif Promo</h3>
                  </CardHeader>
                  <Row md="12">
										<Col md="6">
                      <CardBody>
                      <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                Senin
                              </Label>
                              <Col sm={7}>
                                  <Input
                                  disabled
                                      className="form-control-alternative"
                                      type="select"
                                      
                                      placeholder="Masukan Senin"
                                      value={senin}
                                      onChange={(e) => {
                                          setSenin(e.target.value);
                                      }}>
                                        <option value="" disabled selected hidden> Pilih Status</option>
                                        <option value="1">Aktif</option>
                                        <option value="2">Tidak Aktif</option>
                                      </Input>
                              </Col>
                          </FormGroup>
                          <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                Selasa
                              </Label>
                              <Col sm={7}>
                                  <Input
                                  disabled
                                      className="form-control-alternative"
                                      type="select"
                                      
                                      placeholder="Masukan Selasa"
                                      value={selasa}
                                      onChange={(e) => {
                                          setSelasa(e.target.value);
                                      }}>
                                        <option value="" disabled selected hidden> Pilih Status </option>
                                        <option value="1">Aktif</option>
                                        <option value="2">Tidak Aktif</option>
                                      </Input>
                              </Col>
                          </FormGroup>
                          <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                Rabu
                              </Label>
                              <Col sm={7}>
                                  <Input
                                  disabled
                                      className="form-control-alternative"
                                      type="select"
                                      
                                      placeholder="Masukan Rabu"
                                      value={rabu}
                                      onChange={(e) => {
                                          setRabu(e.target.value);
                                      }}>
                                        <option value="" disabled selected hidden> Pilih Status </option>
                                        <option value="1">Aktif</option>
                                        <option value="2">Tidak Aktif</option>
                                      </Input>
                              </Col>
                          </FormGroup>
                          <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                Kamis
                              </Label>
                              <Col sm={7}>
                                  <Input
                                  disabled
                                      className="form-control-alternative"
                                      type="select"
                                      
                                      placeholder="Masukan Kamis"
                                      value={kamis}
                                      onChange={(e) => {
                                          setKamis(e.target.value);
                                      }}>
                                        <option value="" disabled selected hidden> Pilih Status </option>
                                        <option value="1">Aktif</option>
                                        <option value="2">Tidak Aktif</option>
                                      </Input>
                              </Col>
                          </FormGroup>
                          <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                Jumat
                              </Label>
                              <Col sm={7}>
                                  <Input
                                  disabled
                                      className="form-control-alternative"
                                      type="select"
                                      
                                      placeholder="Masukan Jumat"
                                      value={jumat}
                                      onChange={(e) => {
                                          setJumat(e.target.value);
                                      }}>
                                        <option value="" disabled selected hidden> Pilih Status </option>
                                        <option value="1">Aktif</option>
                                        <option value="2">Tidak Aktif</option>
                                      </Input>
                              </Col>
                          </FormGroup>
                          <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                Sabtu
                              </Label>
                              <Col sm={7}>
                                  <Input
                                  disabled
                                      className="form-control-alternative"
                                      type="select"
                                      
                                      placeholder="Masukan Sabtu"
                                      value={sabtu}
                                      onChange={(e) => {
                                          setSabtu(e.target.value);
                                      }}>
                                         <option value="" disabled selected hidden> Pilih Status </option>
                                        <option value="1">Aktif</option>
                                        <option value="2">Tidak Aktif</option>
                                      </Input>
                              </Col>
                          </FormGroup>
                          <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                Minggu
                              </Label>
                              <Col sm={7}>
                                  <Input
                                  disabled
                                      className="form-control-alternative"
                                      type="select"
                                      
                                      placeholder="Masukan Minggu"
                                      value={minggu}
                                      onChange={(e) => {
                                          setMinggu(e.target.value);
                                      }}>
                                        <option value="" disabled selected hidden> Pilih Status </option>
                                        <option value="1">Aktif</option>
                                        <option value="2">Tidak Aktif</option>
                                      </Input>
                              </Col>
                          </FormGroup>
                      </CardBody>
										</Col>
										<Col md="6">
                      <CardBody>
                          <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                Bulan
                              </Label>
                              <Col sm={7}>
                                  <Input
                                  disabled
                                      className="form-control-alternative"
                                      type="select"
                                      
                                      placeholder="Masukan Bulan"
                                      value={bulan}
                                      onChange={(e) => {
                                          setBulan(e.target.value);
                                      }} >
                                  <option value="" disabled selected hidden> Pilih Bulan</option>
                                  <option value="1">Januari</option>
                                  <option value="2">Februari</option>
                                  <option value="3">Maret</option>
                                  <option value="4">April</option>
                                  <option value="5">Mei</option>
                                  <option value="6">Juni</option>
                                  <option value="7">Juli</option>
                                  <option value="8">Agustus</option>
                                  <option value="9">September</option>
                                  <option value="10">Oktober</option>
                                  <option value="11">November</option>
                                  <option value="12">Desember</option>
                                  </Input>
                              </Col>
                          </FormGroup>
                          <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                Tahun
                              </Label>
                              <Col sm={7}>
                                  <Input
                                  disabled
                                      className="form-control-alternative"
                                      type="select"
                                      
                                      placeholder="Masukan Tahun"
                                      value={tahun}
                                      onChange={(e) => {
                                          setTahun(e.target.value);
                                      }}>
                                        <option value="" disabled selected hidden> Pilih Tahun</option>
                                      <option value="2022">2022</option>
                                      <option value="2023">2023</option>
                                      <option value="2024">2024</option>
                                      <option value="2025">2025</option>
                                      <option value="2026">2026</option>
                                      <option value="2027">2027</option>
                                      <option value="2028">2028</option>
                                      <option value="2029">2029</option>
                                      <option value="2030">2030</option>
                                      <option value="2031">2031</option>
                                      <option value="2032">2032</option>
                                    </Input>
                              </Col>
                          </FormGroup>
                          <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                Pembuatan
                              </Label>
                              <Col sm={7}>
                                  <Input
                                  disabled
                                      className="form-control-alternative"
                                      type="date"
                                      
                                      placeholder="Masukan Pembuatan"
                                      value={start}
                                      onChange={(e) => {
                                          setStart(e.target.value);
                                      }}
                                  />
                              </Col>
                          </FormGroup>
                          <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                Selesai
                              </Label>
                              <Col sm={7}>
                                  <Input
                                  disabled
                                      className="form-control-alternative"
                                      type="date"
                                      
                                      placeholder="Masukan Selesai"
                                      value={end}
                                      onChange={(e) => {
                                          setEnd(e.target.value);
                                      }}
                                  />
                              </Col>
                          </FormGroup>
                          {/* <FormGroup row>
                              <Label
                              for="exampleEmail"
                              sm={4}
                              >
                              Status
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
                                          checked={status === 1}
                                          onChange={() => setStatus(1)}
                                          />
                                          <Label
                                          className="custom-control-label"
                                          htmlFor="customRadio10"
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
                                          id="customRadio11"
                                          name="custom-radio-4"
                                          type="radio"
                                          value={2}
                                          checked={status === 2}
                                          onChange={() => setStatus(2)}
                                          />
                                          <Label
                                          className="custom-control-label"
                                          htmlFor="customRadio11"
                                          >
                                            Tidak Aktif
                                          </Label>
                                      </div>
                                  </div>
                              </Col>
                          </FormGroup> */}
                           <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                Status Promo
                              </Label>
                              <Col sm={7}>
                                  <Input
                                  disabled
                                      className="form-control-alternative"
                                      type="select"
                                      
                                      placeholder="Masukan Status"
                                      value={status}
                                      onChange={(e) => {
                                          setStatus(e.target.value);
                                      }}>
                                        <option value="" disabled selected hidden> Pilih Status Promo </option>
                                        <option value="1">Aktif</option>
                                        <option value="2">Tidak Aktif</option>
                                      </Input>
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
