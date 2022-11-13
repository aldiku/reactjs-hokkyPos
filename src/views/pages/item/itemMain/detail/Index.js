/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { 
  Card,
  CardImg, 
  Row, 
  CardBody, 
  Col,
  Label,
  CardHeader, 
  FormGroup,
  Input,
  Container,
  CardFooter,
  Table,
} from "reactstrap";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const DetailItems = (props) => {
  const token = localStorage.token;
  const [rowIndex, setRowIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [totalItem, setTotalItem] = useState(0);
  const [currentSort, setCurrentSort] = useState("");
  const [itemCode,setItemCode] = useState("")
  const [nameItem, setNameItem] = useState("");
  const [description, setDescription] = useState("");
  const [numberPart, setNumberPart] = useState("");
  const [allSatuan, setAllSatuan] = useState([]);
  const [satuan, setSatuan] = useState("");
  const [allGrade, setAllGrade] = useState([]);
  const [grade, setGrade] = useState([]);
  const [allAccount, setAllAccount] = useState([]);
  const [account, setAccount] = useState([]);
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [nameFunction, setNameFunction] = useState([]);
  const [nameFunctions, setNameFunctions] = useState([]);
  const [nameSubFunction, setNameSubFunction] = useState([]);
  const [nameSubFunctions, setNameSubFunctions] = useState([]);
  const [allMerek, setAllMerek] = useState([]);
  const [merek, setMerek] = useState([]);
  const [submerek,setSubMerek] = useState([]);
  const [panjang, setPanjang] = useState("");
  const [allSubMerek,setAllSubMerek] = useState([]);
  const [lebar, setLebar] = useState("");
  const [tinggi, setTinggi] = useState("");
  const [stock, setStock] = useState("");
  const [nameType, setNameType] = useState(1);
  const [hargaBeli, setHargaBeli] = useState([]);
  const [pajakBeli, setPajakBeli] = useState([]);
  const [pajakjuals, setPajakJual] = useState([]);
  const [diskonsuplierpersen, setDiskonSuplierPersen] = useState([]);
  const [diskonnominal, setDiskonNominal] = useState([]);
  const [barcode, setBarcode] = useState([]);
  const [diskonpersen, setDiskonPersen] = useState([]);
  const [diskonsupliernominal, setDiskonSuplierNominal] = useState([]);
  const [status,setStatus] = useState([]);
  const [hargajualminimal, setHargaJualMinimal] = useState([]);
  const [minimumstock, setMinimumStock] = useState([]);
  const [hargabelitotal,setHargaBeliTotal] = useState([]);
  const [allpajakbeli,setAllPajakBeli] = useState([]);
  const [allpajakJual,setAllPajakJual] = useState([]);
  const [level1,setLevel1] = useState([]);
  const [level2,setLevel2] = useState([]);
  const [level3,setLevel3] = useState([]);
  const [level4,setLevel4] = useState([]);
  const [level5,setLevel5] = useState([]);
  const [level6,setLevel6] = useState([]);
  const [margin1,setMargin1] = useState([]);
  const [margin2,setMargin2] = useState([]);
  const [margin3,setMargin3] = useState([]);
  const [margin4,setMargin4] = useState([]);
  const [margin5,setMargin5] = useState([]);
  const [margin6,setMargin6] = useState([]);
  const [persentase1,setPersentase1] = useState([]);
  const [persentase2,setPersentase2] = useState([]);
  const [persentase3,setPersentase3] = useState([]);
  const [persentase4,setPersentase4] = useState([]);
  const [persentase5,setPersentase5] = useState([]);
  const [persentase6,setPersentase6] = useState([]);
  const [qty1,setQty1] = useState([]);
  const [qty2,setQty2] = useState([]);
  const [qty3,setQty3] = useState([]);
  const [qty4,setQty4] = useState([]);
  const [qty5,setQty5] = useState([]);
  const [qty6,setQty6] = useState([]);
  const [price1,setPrice1] = useState([]);
  const [price2,setPrice2] = useState([]);
  const [price3,setPrice3] = useState([]);
  const [price4,setPrice4] = useState([]); 
  const [price5,setPrice5] = useState([]);
  const [price6,setPrice6] = useState([]);
  const [itemgrup, setItemGrup] = useState("");
  const [itemgrups, setItemGrups] = useState([]);
  const [berat, setBerat] = useState([]);
  const [image1, setImage1] = useState("")
  const [image2, setImage2] = useState("")
  const [image3, setImage3] = useState("")
  const [logPrice, setLogPrice] = useState([]);

  let paginationOption = {
    page: page,
    alwaysShowAllBtns: true,
    override: true,
    showTotal: true,
    withFirstAndLast: false,
    sizePerPage: perPage,
    totalSize: totalItem,
    onPageChange: (page) => {
      updateDataTable(page, perPage, currentSort);
    },
    sizePerPageRenderer: () => (
      <div className="dataTables_length" id="datatable-basic_length">
        <label>
          Show{" "}
          {
            <select
              name="datatable-basic_length"
              aria-controls="datatable-basic"
              className="form-control form-control-sm"
              onChange={(e) => {
                updateDataTable(page, e.target.value, currentSort);
              }}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          }{" "}
          entries.
        </label>
      </div>
    ),
  };

  const updateDataTable = (page, perPage, sort) => {
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
  };

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`;
      updateDataTable(page, perPage, sort);
    }
  };

  useEffect(() => {
    getById();
  }, []);

  const getById = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/items/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        setLogPrice(data.data.response.log_price);
        setItemParts(data.data.response.items_part);
        getSatuan(data.data.response.items.uom_id);
        getGrade(data.data.response.items.grade_id);
        getPajakBeli(data.data.response.items.pajak_beli);
        getPajakJual(data.data.response.items.pajak_jual);
        getAccount(data.data.response.items.account_id);
        getCategory(data.data.response.items.kategori_id);
        getSubCategory(data.data.response.items.subkategori_id);
        getFunction( data.data.response.items.function_id);
        getSubFunction(data.data.response.items.subfunction_id);
        getMerek(data.data.response.items.merek_id);
        getSubMerek(data.data.response.items.submerek_id);
        getItemGrup(data.data.response.items.ig_id);
        setBerat(data.data.response.items.berat);
        setStatus(data.data.response.items.active_flag);
        setSatuan(data.data.response.items.uom_code);
        setMerek(data.data.response.items.merek_name);
        setNameItem(data.data.response.items.item_name);
        setDescription(data.data.response.items.item_description);
        setNumberPart(data.data.response.items.part_number);
        setPanjang(data.data.response.items.panjang);
        setLebar(data.data.response.items.lebar);
        setImage1(data.data.response.items.image_1);
        setImage2(data.data.response.items.image_2);
        setImage3(data.data.response.items.image_3);
        setTinggi(data.data.response.items.tinggi);
        setStock(data.data.response.items.stock);
        setMinimumStock(data.data.response.items.minimum_stok);
        setItemCode(data.data.response.items.item_code);
        setHargaBeli(data.data.response.items.harga_beli);
        setHargaBeliTotal(data.data.response.items.harga_beli_total);
        setHargaJualMinimal(data.data.response.items.harga_jual_minimal);
        setDiskonNominal(data.data.response.items.diskon_nominal);
        setDiskonPersen(data.data.response.items.diskon_persen);
        setDiskonSuplierNominal(data.data.response.items.diskon_nominal_suplier);
        setDiskonSuplierPersen(data.data.response.items.diskon_persen_suplier);
        setLevel1(data.data.response.items.Level_1);
        setLevel2(data.data.response.items.Level_2);
        setLevel3(data.data.response.items.Level_3);
        setLevel4(data.data.response.items.Level_4);
        setLevel5(data.data.response.items.Level_5);
        setLevel6(data.data.response.items.Level_6);
        setPersentase1(data.data.response.items.persentase_1);
        setPersentase2(data.data.response.items.persentase_2);
        setPersentase3(data.data.response.items.persentase_3);
        setPersentase4(data.data.response.items.persentase_4);
        setPersentase5(data.data.response.items.persentase_5);
        setPersentase6(data.data.response.items.persentase_6);
        setMargin1(data.data.response.items.nominal_1);
        setMargin2(data.data.response.items.nominal_2);
        setMargin3(data.data.response.items.nominal_3);
        setMargin4(data.data.response.items.nominal_4);
        setMargin5(data.data.response.items.nominal_5);
        setMargin6(data.data.response.items.nominal_6);
        setQty1(data.data.response.items.min_qty_1);
        setQty2(data.data.response.items.min_qty_2);
        setQty3(data.data.response.items.min_qty_3);
        setQty4(data.data.response.items.min_qty_4);
        setQty5(data.data.response.items.min_qty_5);
        setPrice1(data.data.response.items.price_1);
        setPrice2(data.data.response.items.price_2);
        setPrice3(data.data.response.items.price_3);
        setPrice4(data.data.response.items.price_4);
        setPrice5(data.data.response.items.price_5);
        setPrice6(data.data.response.items.price_6);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const formatRupiah = (money) => {
    return new Intl.NumberFormat('id-ID',
      { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
    ).format(money);
  }

  const getItemGrup = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/item-group/list`,
        { headers }
      )
      .then((data) => {
        setItemGrups(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getPajakJual =(id) =>{
    const headers = {
      "Content-Type" : "application/json",
      Authorization: `bearer ${token}`,
    }
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/pajak/list`, {headers})
      .then((data)=>{
        setAllPajakJual(data.data.response);
        setPajakJual(id);
      })
      .catch(function(error){
        console.log(error);
      })
  };
  const getPajakBeli =(id) =>{
    const headers = {
      "Content-Type" : "application/json",
      Authorization: `bearer ${token}`,
    }
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/pajak/list`, {headers})
      .then((data)=>{
        setAllPajakBeli(data.data.response);
        setPajakBeli(id);
      })
      .catch(function(error){
        console.log(error);
      })
  };

  const getAccount = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/account/list`, { headers })
      .then((data) => {
        setAllAccount(data.data.response);
        setAccount(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getGrade = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/item-grade/list`, { headers })
      .then((data) => {
        setAllGrade(data.data.response);
        setGrade(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getSatuan = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/uom/list`, { headers })
      .then((data) => {
        setAllSatuan(data.data.response);
        setSatuan(id);
      })  
      .catch(function (error) {
        console.log(error);
      });
  };

  const getCategory = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/item-kategori/list`, {
        headers,
      })
      .then((data) => {
        setCategories(data.data.response);
        setCategory(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getSubCategory = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/sub-kategori/list`,
        { headers }
      )
      .then((data) => {
        setSubCategories(data.data.response);
        setSubCategory(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getFunction = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/item-function/list`,
        { headers }
      )
      .then((data) => {
        setNameFunctions(data.data.response);
        setNameFunction(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getSubFunction = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/sub-function/list`,
        { headers }
      )
      .then((data) => {
        setNameSubFunctions(data.data.response);
        setNameSubFunction(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getMerek = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/merek/list`,
        { headers }
      )
      .then((data) => {
        setAllMerek(data.data.response);
        setMerek(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getSubMerek = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/sub-merek/list`,
        { headers }
      )
      .then((data) => {
        setAllSubMerek(data.data.response);
        setSubMerek(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  return (
    <div>
      <SimpleHeader name="Detail Item " parentName="Master" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>Detail Item </h3>
                </div>
              </CardHeader>
              <CardBody>
                    <Row md="12">
                        <Col md="6">
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Kode Item
                            </Label>
                            <Col sm={7}>
                              <Input 
                              disabled
                                type="text"
                                name="itemCode"
                                placeholder="Masukan Kode Item"
                                value={itemCode}
                                onChange={(e) => {
                                  setItemCode(e.target.value);
                                }}
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Barcode
                            </Label>
                            <Col sm={7}>
                              <Input 
                              disabled
                                type="text"
                                name="barcode"
                                placeholder="Masukan Barcode"
                                value={barcode}
                                onChange={(e) => {
                                  setBarcode(e.target.value);
                                }}
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Nama Item
                            </Label>
                            <Col sm={7}>
                              <Input disabled
                                type="text"
                                
                                placeholder="Masukan Nama Item"
                                value={nameItem}
                                onChange={(e) => {
                                  setNameItem(e.target.value);
                                }}
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Nomor Part
                            </Label>
                            <Col sm={7}>
                              <Input disabled
                                type="text"
                                name="nomorPart"
                                placeholder="Masukan Nomor Part"
                                value={numberPart}
                                onChange={(e) => {
                                  setNumberPart(e.target.value);
                                }}
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Item Grup
                            </Label>
                            <Col sm={7}>
                              <Input disabled
                                name="kategory"
                                type="select"
                                value={itemgrup}
                                onChange={(e) => {
                                  setItemGrup(e.target.value);
                                }}
                              >
                                <option value="">Pilih Item Group</option>
                                {itemgrups.map((categorysss, key) => {
                                  return (
                                    <option key={key} value={categorysss.id}>
                                      {categorysss.name}
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
                              Satuan
                            </Label>
                            <Col sm={7}>
                              <Input disabled
                            name="satuan"
                            type="select"
                            value={satuan}
                            onChange={(e) => {
                              setSatuan(e.target.value);
                            }}
                          >
                            {allSatuan.map((satuan, key) => {
                              return (
                                <option key={key} value={satuan.id}>
                                  {satuan.description}
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
                              Dimensi
                            </Label>
                            <Col sm={2}>
                              <Input disabled
                                type="text"
                                name="panjang"
                                placeholder="Panjang"
                                value={panjang}
                                onChange={(e) => {
                                  setPanjang(e.target.value);
                                }}
                              />
                            </Col>
                            <Col sm={3}>
                              <Input disabled
                                type="text"
                                name="lebar"
                                placeholder="Lebar"
                                value={lebar}
                                onChange={(e) => {
                                  setLebar(e.target.value);
                                }}
                              />
                            </Col>
                            <Col sm={2}>
                              <Input disabled
                                type="text"
                                name="tinggi"
                                placeholder="Tinggi"
                                value={tinggi}
                                onChange={(e) => {
                                  setTinggi(e.target.value);
                                }}
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={4}
                          >
                            Berat
                          </Label>
                          <Col sm={4}>
                            <Input disabled
                            type="text"
                            name="Berat"
                            placeholder="Masukan Berat"
                            value={berat}
                            onChange={(e) => {
                              setBerat(e.target.value);
                              }}
                            />
                          </Col>
                          <Label
                          for="exampleEmail"
                          sm={4}
                          >
                            <b>Gram</b>
                          </Label>
                        </FormGroup>
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Stock
                            </Label>
                            <Col sm={7}>
                              <Input disabled
                                type="number"
                                name="stock"
                                placeholder="Masukan Stock"
                                value={stock}
                                onChange={(e) => {
                                  setStock(e.target.value);
                                }}
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Minimum Stock
                            </Label>
                            <Col sm={7}>
                              <Input disabled
                              type="number"
                              name="stock"
                              placeholder="Masukan Stock"
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
                                  Status
                                </Label>
                                  <Col sm={7}>
                                    <div style={{ display: "flex" }}>
                                      <div className="custom-control custom-radio mb-3">
                                        <Input disabled
                                          className="custom-control-input"
                                          id="customRadio11"
                                          name="custom-radio-4"
                                          type="checkbox"
                                          value={1}
                                          checked={status === 1}
                                          onChange={() => setStatus(1)}
                                        />
                                        <Label
                                          className="custom-control-label"
                                          htmlFor="customRadio11"
                                        >
                                          Aktif
                                        </Label>
                                      </div>
                                      <div
                                        className="custom-control custom-radio mb-3"
                                        style={{ marginLeft: "20px" }}
                                      >
                                        <Input disabled
                                          className="custom-control-input"
                                          id="customRadio12"
                                          name="custom-radio-4"
                                          type="radio"
                                          value={2}
                                          checked={status === 2}
                                          onChange={() => setStatus(2)}
                                        />
                                        <Label
                                          className="custom-control-label"
                                          htmlFor="customRadio12"
                                        >
                                          Tidak Aktif
                                        </Label>
                                      </div>
                                    </div>
                                  </Col>
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Tipe Item
                            </Label>
                            <Col sm={7}>
                              <Input disabled
                                type="select"
                                
                                placeholder="Masukan Tipe Item"
                                value={nameType}
                                onChange={(e) => {
                                  setNameType(e.target.value);
                                }}
                              >
                                <option value={1}>Material</option>
                                <option value={2}>Rakitan</option>
                              </Input>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Kategori
                            </Label>
                            <Col sm={7}>
                              <Input disabled
                                name="kategory"
                                type="select"
                                value={category}
                                onChange={(e) => {
                                  setCategory(e.target.value);
                                }}
                              >
                                {categories.map((category, key) => {
                                  return (
                                    <option key={key} value={category.id}>
                                      {category.name}
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
                              Sub Kategori
                            </Label>
                            <Col sm={7}>
                              <Input disabled
                                    name="subKategory"
                                    type="select"
                                    value={subCategory}
                                    onChange={(e) => {
                                      setSubCategory(e.target.value);
                                    }}
                                  >
                                    {subCategories.map((category, key) => {
                                      return (
                                        <option key={key} value={category.id}>
                                          {category.name}
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
                              Function
                            </Label>
                            <Col sm={7}>
                              <Input disabled
                                name="function"
                                type="select"
                                value={nameFunction}
                                onChange={(e) => {
                                  setNameFunction(e.target.value);
                                }}
                              >
                                {nameFunctions.map((nameFunction, key) => {
                                  return (
                                    <option key={key} value={nameFunction.id}>
                                      {nameFunction.name}
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
                              Sub Function
                            </Label>
                            <Col sm={7}>
                              <Input disabled
                                name="subFunction"
                                type="select"
                                value={nameSubFunction}
                                onChange={(e) => {
                                  setNameSubFunction(e.target.value);
                                }}
                              >
                                {nameSubFunctions.map((nameFunction, key) => {
                                  return (
                                    <option key={key} value={nameFunction.id}>
                                      {nameFunction.name}
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
                              Merek
                            </Label>
                            <Col sm={7}>
                              <Input disabled
                                name="merek"
                                type="select"
                                value={merek}
                                onChange={(e) => {
                                  setMerek(e.target.value);
                                }}
                              >
                                {allMerek.map((m, key) => {
                                  return (
                                    <option key={key} value={m.id}>
                                      {m.name}
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
                              Sub Merk
                            </Label>
                            <Col sm={7}>
                              <Input disabled
                                name="merek"
                                type="select"
                                value={submerek}
                                onChange={(e) => {
                                  setSubMerek(e.target.value);
                                }}
                              >
                                {allSubMerek.map((submerek, key) => {
                                  return (
                                    <option key={key} value={submerek.id}>
                                      {submerek.name}
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
                              Grade
                            </Label>
                            <Col sm={7}>
                            <Input disabled
                            name="grade"
                            type="select"
                            value={grade}
                            onChange={(e) => {
                              setGrade(e.target.value);
                              }}
                          >
                            {allGrade.map((a, key) => {
                              return (
                                <option key={key} value={a.id}>
                                  {a.nilai}
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
                              Account
                            </Label>
                            <Col sm={7}>
                              <Input disabled
                                name="account"
                                type="select"
                                value={account}
                                onChange={(e) => {
                                  setAccount(e.target.value);
                                  }}
                              >
                                {allAccount.map((a, key) => {
                                  return (
                                    <option key={key} value={a.id}>
                                      {a.account_name}
                                    </option>
                                  );
                                })}
                                </Input>
                            </Col>
                          </FormGroup>
                        </Col>
                    </Row>
                    <Row md="12">
                          <Col md="12">
                          <FormGroup row>
                          <Label
                              for="exampleEmail"
                              sm={3}
                            >
                              Gambar Item
                            </Label>
                                <Row>
                                  <Col md="10">
                                    <Card>
                                      <CardImg
                                        alt="Card image cap"
                                        src={image1}
                                        top
                                        width="100%"
                                      />
                                    </Card>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col md="10">
                                    <Card>
                                      <CardImg
                                        alt="Card image cap"
                                        src={image2}
                                        top
                                        width="100%"
                                      />
                                    </Card>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col md="10">
                                    <Card>
                                      <CardImg
                                        alt="Card image cap"
                                        src={image3}
                                        top
                                        width="100%"
                                      />
                                    </Card>
                                  </Col>
                                </Row>
                            </FormGroup>
                          </Col>
                    </Row>
                    <Row md="12">
                      <Col md="12">
                        <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={2}
                          >
                            Deskripsi Item
                          </Label>
                          <Col sm={9}>
                            <Input disabled
                              type="textarea"
                              name="deskripsi Item"
                              placeholder="Masukan Kode Item"
                              value={description}
                              onChange={(e) => {
                                setDescription(e.target.value);
                              }}
                            />
                          </Col>
                        </FormGroup>
                      </Col>
                    </Row>
                    <CardHeader></CardHeader>
                    <h3 >PRICE</h3>
                    <CardFooter></CardFooter>
                    <Row md="12">
                        <Col md="6">
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Pajak Beli
                            </Label>
                            <Col sm={7}>
                              <Input
                              disabled
                            name="satuan"
                            type="select"
                            value={pajakBeli}
                            onChange={(e) => {
                              setPajakBeli(e.target.value);
                            }}
                          >
                            <option>Pilih Pajak Beli</option>
                            {allpajakbeli.map((pb, key) => {
                              return (
                                <option key={key} value={pb.id}>
                                  {pb.keterangan} : {pb.persentase}%
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
                              Harga Beli
                            </Label>
                            <Col sm={7}>
                              <Input
                              disabled
                                type="text"
                                name="hargabeli"
                                placeholder="Harga Beli"
                                value={hargaBeli}
                                onChange={(e) => {
                                  setHargaBeli(e.target.value);
                                }}
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Diskon Suplier (Nominal)
                            </Label>
                            <Col sm={7}>
                              <Input
                              disabled
                                type="text"
                                name="diskonsupliernominal"
                                placeholder="Diskon Suplier Nominal"
                                value={diskonsupliernominal}
                                onChange={(e) => {
                                  setDiskonSuplierNominal(e.target.value);
                                }}
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Diskon Suplier (Persen)
                            </Label>
                            <Col sm={7}>
                            <Input
                            disabled
                                type="text"
                                name="diskonsuplierpersen"
                                placeholder="Diskon Suplier Persen"
                                value={diskonsuplierpersen}
                                onChange={(e) => {
                                  setDiskonSuplierPersen(e.target.value);
                                }}
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Harga Beli Total
                            </Label>
                            <Col sm={7}>
                              <Input
                              disabled
                                type="text"
                                name="harggabelitotal"
                                placeholder="Harga Beli Total"
                                value={hargabelitotal}
                                onChange={(e) => {
                                  setHargaBeliTotal(e.target.value);
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
                              Pajak Jual
                            </Label>
                            <Col sm={7}>
                              <Input
                              disabled
                            name="satuan"
                            type="select"
                            value={pajakjuals}
                            onChange={(e) => {
                              setPajakJual(e.target.value);
                            }}
                          >
                            <option>Pilih Pajak Jual</option>
                            {allpajakJual.map((pb, key) => {
                              return (
                                <option key={key} value={pb.id}>
                                  {pb.keterangan} : {pb.persentase}%
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
                              Harga Jual Minimal
                            </Label>
                            <Col sm={7}>
                              <Input
                              disabled
                                type="text"
                                name="hargajualminimal"
                                placeholder="Harga Jual Minimal"
                                value={hargajualminimal}
                                onChange={(e) => {
                                  setHargaJualMinimal(e.target.value);
                                }}
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Diskon Nominal
                            </Label>
                            <Col sm={7}>
                              <Input
                              disabled
                                type="text"
                                name="diskonnominal"
                                placeholder="Diskon Nominal"
                                value={diskonnominal}
                                onChange={(e) => {
                                  setDiskonNominal;(e.target.value);
                                }}
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Diskon Persen
                            </Label>
                            <Col sm={7}>
                            <Input
                            disabled
                                type="text"
                                name="diskonpersen"
                                placeholder="Diskon Persen"
                                value={diskonpersen}
                                onChange={(e) => {
                                  setDiskonPersen(e.target.value);
                                }}
                              />
                            </Col>
                          </FormGroup>
                        </Col>
                    </Row>
                    <Table>
                        <tbody>
                          <tr>
                          <td>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Level
                            </Label>
                            </td>
                            <td>
                              <Input disabled
                                type="text"
                                name="Level1"
                                placeholder="Level 1"
                                value={level1}
                                onChange={(e) => {
                                  setLevel1(e.target.value);
                                }}
                                />
                            </td>
                            <td>
                              <Input disabled
                                type="text"
                                name="Level2"
                                placeholder="Level 2"
                                value={level2}
                                onChange={(e) => {
                                  setLevel2(e.target.value);
                                }}
                                />
                            </td>
                            <td>
                              <Input disabled
                                type="text"
                                name="Level3"
                                placeholder="Level 3"
                                value={level3}
                                onChange={(e) => {
                                  setLevel3(e.target.value);
                                }}
                                />
                            </td>
                            <td>
                              <Input disabled
                                type="text"
                                name="Level4"
                                placeholder="Level 4"
                                value={level4}
                                onChange={(e) => {
                                  setLevel4(e.target.value);
                                }}
                                />
                            </td>
                            <td>
                              <Input disabled
                                type="text"
                                name="Level5"
                                placeholder="Level 5"
                                value={level5}
                                onChange={(e) => {
                                  setLevel5(e.target.value);
                                }}
                                />
                            </td>
                            <td>
                              <Input disabled
                                type="text"
                                name="Level5"
                                placeholder="Level 6"
                                value={level6}
                                onChange={(e) => {
                                  setLevel6(e.target.value);
                                }}
                                />
                            </td>
                          </tr>
                          <tr>
                          <td>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Min Qty
                            </Label>
                            </td>
                            <td>
                            <Input disabled
                              name="qty1"
                              placeholder="Qty 1"
                              value={qty1}
                              onChange={(e) => {
                                setQty1(e.target.value);
                              }}
                              />
                            </td>
                            <td>
                            <Input disabled
                              name="qty2"
                              placeholder="Qty 2"
                              value={qty2}
                              onChange={(e) => {
                                setQty2(e.target.value);
                              }}
                              />
                            </td>
                            <td>
                            <Input disabled
                              name="qty3"
                              placeholder="Qty 3"
                              value={qty3}
                              onChange={(e) => {
                                setQty3(e.target.value);
                              }}
                              />
                            </td>
                            <td>
                            <Input disabled
                              name="qty4"
                              placeholder="Qty 4"
                              value={qty4}
                              onChange={(e) => {
                                setQty4(e.target.value);
                              }}
                              />
                            </td>
                            <td>
                            <Input disabled
                              name="qty5"
                              placeholder="Qty 5"
                              value={qty5}
                              onChange={(e) => {
                                setQty5(e.target.value);
                              }}
                              />
                            </td>
                            <td>
                            <Input disabled
                              name="qty5"
                              placeholder="Qty 6"
                              value={qty6}
                              onChange={(e) => {
                                setQty6(e.target.value);
                              }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                               Price
                              </Label>
                            </td>
                            <td>
                            <Input disabled
                              type="text"
                              name="price1"
                              placeholder="Price 1"
                              value={price1}
                              onChange={(e) => {
                                setPrice1(e.target.value);
                              }}
                              />
                            </td>
                            <td>
                            <Input disabled
                              type="text"
                              name="price2"
                              placeholder="Price 2"
                              value={price2}
                              onChange={(e) => {
                                setPrice2(e.target.value);
                              }}
                              />
                            </td>
                            <td>
                            <Input disabled
                              type="text"
                              name="price3"
                              placeholder="Price 3"
                              value={price3}
                              onChange={(e) => {
                                setPrice3(e.target.value);
                              }}
                              />
                            </td>
                            <td>
                            <Input disabled
                              type="text"
                              name="price4"
                              placeholder="Price 4"
                              value={price4}
                              onChange={(e) => {
                                setPrice4(e.target.value);
                              }}
                              />
                            </td>
                            <td>
                            <Input disabled
                              type="text"
                              name="price5"
                              placeholder="Price 5"
                              value={price5}
                              onChange={(e) => {
                                setPrice5(e.target.value);
                              }}
                              />
                            </td>
                            <td>
                            <Input disabled
                              type="text"
                              name="price5"
                              placeholder="Price 6"
                              value={price6}
                              onChange={(e) => {
                                setPrice6(e.target.value);
                              }}
                            />
                            </td>
                          </tr>
                          <tr>
                          <td>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Margin (N)
                            </Label>
                            </td>
                            <td>
                              <Input disabled
                                name="margin1"
                                placeholder="Margin 1"
                                value={margin1}
                                onChange={(e) => {
                                  setMargin1(e.target.value);
                                }}
                              />
                            </td>
                            <td>
                              <Input disabled
                                name="margin2"
                                placeholder="Margin 2"
                                value={margin2}
                                onChange={(e) => {
                                  setMargin2(e.target.value);
                                }}
                              />
                            </td>
                            <td>
                              <Input disabled
                                name="margin3"
                                placeholder="Margin 3"
                                value={margin3}
                                onChange={(e) => {
                                  setMargin3(e.target.value);
                                }}
                              />
                            </td>
                            <td>
                              <Input disabled
                                name="margin4"
                                placeholder="Margin 4"
                                value={margin4}
                                onChange={(e) => {
                                  setMargin4(e.target.value);
                                }}
                              />
                            </td>
                            <td>
                              <Input disabled
                                name="margin5"
                                placeholder="Margin 5"
                                value={margin5}
                                onChange={(e) => {
                                  setMargin5(e.target.value);
                                }}
                              />
                            </td>
                            <td>
                              <Input disabled
                                name="margin5"
                                placeholder="Margin 6"
                                value={margin6}
                                onChange={(e) => {
                                  setMargin6(e.target.value);
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                          <td>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Margin %
                            </Label>
                            </td>
                            <td>
                              <Input disabled
                                  name="Persentase1"
                                  placeholder="Persentase 1"
                                  value={persentase1}
                                  onChange={(e) => {
                                    setPersentase1(e.target.value);
                                  }}
                                />
                            </td>
                            <td>
                              <Input disabled
                                  name="persentase2"
                                  placeholder="Persentase 2"
                                  value={persentase2}
                                  onChange={(e) => {
                                    setPersentase2(e.target.value);
                                  }}
                                />
                            </td>
                            <td>
                              <Input disabled
                                  name="Persentase3"
                                  placeholder="Persentase 3"
                                  value={persentase3}
                                  onChange={(e) => {
                                    setPersentase3(e.target.value);
                                  }}
                                />
                            </td>
                            <td>
                              <Input disabled
                                  name="Persentase4"
                                  placeholder="Persentase 4"
                                  value={persentase4}
                                  onChange={(e) => {
                                    setPersentase4(e.target.value);
                                  }}
                                />
                            </td>
                            <td>
                              <Input disabled
                                  name="Persentase5"
                                  placeholder="Persentase 5"
                                  value={persentase5}
                                  onChange={(e) => {
                                    setPersentase5(e.target.value);
                                  }}
                                />
                            </td>
                            <td>
                              <Input disabled
                                  name="Persentase5"
                                  placeholder="Persentase 6"
                                  value={persentase6}
                                  onChange={(e) => {
                                    setPersentase6(e.target.value);
                                  }}
                                />
                            </td>
                          </tr>
                        </tbody>
                    </Table>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>Log Harga</h3>
                </div>
              </CardHeader>
              <CardBody>
                <ToolkitProvider
                  rowNumber={rowIndex}
                  data={logPrice}
                  keyField="id"
                  columns={[
                    {
                      dataField: "no",
                      text: "#",
                      sort: true,
                      page: 1,
                      formatter: (cell, row, index) => {
                        let currentRow = ++index;
                        return currentRow + rowIndex;
                      },
                    },
                    {
                      dataField: "username",
                      text: "Username",
                      sort: true,
                    },
                    {
                      dataField: "nominal_1",
                      text: "Nominal 1",
                      sort: true,
                      formatter: (cell, row) => {
                        return formatRupiah(row.nominal_1)
                      }
                    },
                    {
                      dataField: "nominal_2",
                      text: "Nominal 2",
                      sort: true,
                      formatter: (cell, row) => {
                        return formatRupiah(row.nominal_2)
                      }
                    },
                    {
                      dataField: "min_qty_1",
                      text: "Minimal Qty 1",
                      sort: true,
                    },
                    {
                      dataField: "min_qty_2",
                      text: "Minimal Qty 2",
                      sort: true,
                    },
                    {
                      dataField: "harga_beli",
                      text: "Harga Beli",
                      sort: true,
                      formatter: (cell, row) => {
                        return formatRupiah(row.harga_beli)
                      }
                    },
                  ]}
                >
                  {(props) => (
                    <div className="py-4 table-responsive">
                      <BootstrapTable
                        remote
                        {...props.baseProps}
                        bootstrap4={true}
                        bordered={false}
                        hover={true}
                        pagination={paginationFactory({ ...paginationOption })}
                        onTableChange={handleTableChange}
                      />
                    </div>
                  )}
                </ToolkitProvider>
              </CardBody>
            </Card> 
          </div>
        </Row>
      </Container>
    </div>
  );  
};

export default DetailItems;
