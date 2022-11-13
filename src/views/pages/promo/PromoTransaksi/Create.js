/*eslint-disable*/
import React, { useState } from "react";
import {
  Card,
	CardBody,
	Label,
	FormGroup,
	Row,
	Input,
	CardHeader,
  Table,
  CardFooter,
  Form,
  Button,
	Col,
	Container,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function CreatePromo() {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouseId = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [warehouse,setWarehouse] = useState("");
  const [warehouses,setWarehouses] = useState([]);
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
  const [savedItems1, setSavedItems1] = useState([]);
  const [active, setActive] = useState(0);
  const [input1, setInput1] = useState("");
  const [active1, setActive1] = useState(0);
  const [filtered1, setFiltered1] = useState([]);
  const [isShow1, setIsShow1] = useState(false);
  const [budget, setBudget] = useState(0);

  function CreateData() {
    setLoading(true);
    let dataCabangs = [];
        savedItems1.map((dataCabang) => dataCabangs = [...dataCabangs, 
            { 
                warehouse_id: dataCabang.id
            }]);
    let data = {
        username: username,
        budget: parseFloat(budget),
        promo_name: namapromo,
        minimal_pembelian: parseFloat(minimalbeli),
        maksimal_potongan: parseFloat(maksimalpotongan),
        promo_persen: parseInt(promopersen),
        promo_nominal: parseInt(promonominal),
        keterangan: keterangan,
        type: parseInt(type),
        global_type: parseInt(globaltype),
        union_type: parseInt(uniontype),
        senin: parseInt(senin),
        selasa:parseInt(selasa),
        rabu:parseInt(rabu),
        kamis:parseInt(kamis),
        jumat:parseInt(jumat),
        sabtu:parseInt(sabtu),
        minggu:parseInt(minggu),
        bulan:parseInt(bulan),
        tahun:parseInt(tahun),
        start_date:parseInt(start),
        end_date:parseInt(end),
        active_flag:parseInt(status),
        items : dataItems,
        cabang : dataCabangs,
    };
    axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/promo/single-promo-per-transaction/save`,
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


const getWarehouse = () => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/warehouse/all`, {
      page: 1,
      per_page: 1,
      warehouse_name: input1,
    }).then(async response => {
        const length = response.data.response.length;
        if (length === 0)
            return;

        const cabangItem = response.data.response[0].id;
        console.log(cabangItem);
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/warehouse/get/${cabangItem}`)
            
            .then(async response => {
                return {
                    item: response.data.response
                };

            }).then((data) => {

                let stateItem = [...savedItems1, {
                    id: cabangItem,
                    warehouse_name: data.warehouse_name,
                    data: data.item,
                }];

                setSavedItems1(stateItem);
                
            });
    });
}

const saveItem1 = () => {
    getWarehouse();
}

const onChange1 = (e) => {
    const input1 = e.currentTarget.value;

    axios.post(`${process.env.REACT_APP_API_BASE_URL}/warehouse/all`, {
      page: 1,
      per_page: 10,
      warehouse_name: input1
  }).then(async response => {
      let suggests = [];

      await Promise.all(response.data.response.map((data) =>
          suggests = [...suggests,data.warehouse_name]
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
    setInput1(e.currentTarget.innerText)
};
const onKeyDown1 = e => {
    if (e.keyCode === 13) { // enter key
        setActive1(0);
        setIsShow1(false);
        setInput1(filtered1[active1])
    }
    else if (e.keyCode === 38) { // up arrow
        return (active === 0) ? null : setActive(active - 1);
    }
    else if (e.keyCode === 40) { // down arrow
        return (active - 1 === filtered1.length) ? null : setActive1(active + 1);
    }
};

const AutoCompleTes1 = () => {
    if (isShow1 && input1) {
        if (filtered1.length) {
            return (
                <ul className="autocomplete">
                    {filtered1.map((suggestion1, index) => {
                        let className;
                        if (index === active) {
                            className = "active";
                        }
                        return (
                            <li key={index} className={className} onClick={onClick1}>
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

const handleSubmit1 = (e) => {
    e.preventDefault();
    {
      saveItem1();
      setInput1([]);
    }
  };


    const deleteItem = (id) => {
        let array = [...savedItems1];

        let Index1 = array.findIndex(object => {
            return object.id === id;
        });

        if (Index1 !== -1) {
            array.splice(Index1, 1);
            setSavedItems1(array);
        }
    }

  return (
    <>
      <SimpleHeader name="Daftar Promo Transaksi" parentName="Master" />
      <Container className="mt--6" fluid>
        <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
                <h3>Promo</h3>
            </CardHeader>
            <Row md="12">
                <Col md="6">
                    <CardBody>
                        <FormGroup row>
                            <Label for="exampleEmail" sm={4}>
                                Budget
                            </Label>
                            <Col sm={7}>
                                <Input
                                    autoComplete="off"
                                    className="form-control-alternative"
                                    type="text"
                                    
                                    placeholder="Masukan Budget"
                                    value={budget}
                                    onChange={(e) => {
                                        setBudget(e.target.value);
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
                                    autoComplete="off"
                                    className="form-control-alternative"
                                    type="text"
                                    name="barcode"
                                    placeholder="Masukan Nama Promo"
                                    value={namapromo}
                                    onChange={(e) => {
                                        setNamaPromo(e.target.value);
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
                                    autoComplete="off"
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
                                    autoComplete="off"
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
                                    autoComplete="off"
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
                                    autoComplete="off"
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
                                    autoComplete="off"
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
                                    autoComplete="off"
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
                                    autoComplete="off"
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
                                    autoComplete="off"
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
                <h3>Durasi Promo</h3>
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
                            autoComplete="off"
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
                            autoComplete="off"
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
                            autoComplete="off"
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
                            autoComplete="off"
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
                            autoComplete="off"
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
                            autoComplete="off"
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
                            autoComplete="off"
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
                                autoComplete="off"
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
                                autoComplete="off"
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
                                autoComplete="off"
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
                                autoComplete="off"
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
                    <FormGroup row>
                        <Label for="exampleEmail" sm={4}>
                        Status Promo
                        </Label>
                        <Col sm={7}>
                            <Input
                                autoComplete="off"
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
                {/* Cabang */}
        <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
                <h3>Cabang</h3>
            </CardHeader>
            <Form onSubmit={handleSubmit1}>
                <Row md="12">
                    <Col md="6">
                        <CardBody>
                            <FormGroup row>
                                <Label
                                    for="exampleEmail"
                                    sm={4}
                                >
                                    Cabang
                                </Label>
                                <Col sm={7}>
                                <Input
                                    autoComplete="off"
                                    placeholder="Cabang"
                                    type="text"
                                    onChange={onChange1}
                                    onKeyDown={onKeyDown1}
                                    value={input1}
                                />
                                </Col>
                                <AutoCompleTes1 />
                            </FormGroup>
                        </CardBody>
                    </Col>
                    <Col md="6">
                        <CardBody>
                            <FormGroup row>
                            <Label
                            sm={4}
                            >
                            </Label>
                            <Col sm={7}>
                                <Button color="primary" className="mb-3" type="submit">
                                Tambah
                                </Button>
                            </Col>
                            </FormGroup>
                        </CardBody>
                    </Col>
                </Row>
            </Form>
            <CardBody>
                <Table>
                    <tr>
                        <th>
                        Nama Cabang
                        </th>
                        <th>
                        
                        </th>
                    </tr>
                    <tbody>
                    {
                        savedItems1.map((savedItem1, key) => {
                            return (
                                <tr key={key}>
                                    <td>{savedItem1.data.warehouse_name}</td>
                                    <td> <Button color="danger" onClick={() => deleteItem(savedItem1.id)}>Delete</Button></td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
            </CardBody>
            <CardFooter>
                {!isLoading && (
                    <Button color="primary" onClick={() => CreateData()}> Simpan </Button>
                )}
                {isLoading && (
                    <Button color="primary" disabled><i className="fas fa-spinner fa-spin"></i>{""} loading... </Button>
                )}
                <Link className="btn btn-info" to="/admin/promo"> Kembali </Link>
            </CardFooter>
        </Card>
      </Container>
    </>
  );
}
