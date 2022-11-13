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

const DetaiClosingKasir = (props) => {
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
  const [listkasir, setListKasir] = useState([]);

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
    // getByIdSo();
  }, []);

  const getById = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/chasier-settlement/get/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        console.log(data);
        setLogPrice(data.data.response[0].closing);
        setListKasir(data.data.response[0].list);
        
        
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
  

  return (
    <div>
      <SimpleHeader name="Detail Closing Kasir " parentName="Penjualan" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>Detail Closing Kasir</h3>
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
                      text: "username",
                      sort: true,
                    },
                      {
                        dataField: "modal",
                        text: "Modal",
                        sort: true,
                        formatter: (value) => formatRupiah(value)
                    },
                    {
                        dataField: "pecahan_seratus",
                        text: "100",
                        sort: true,
                    },
                    {
                        dataField: "pecahan_dua_ratus",
                        text: "200",
                        sort: true,
                    },
                    {
                        dataField: "pecahan_lima_ratus",
                        text: "500",
                        sort: true,
                    },
                    {
                        dataField: "pecahan_seribu",
                        text: "1.000",
                        sort: true,
                    },
                    {
                        dataField: "pecahan_dua_ribu",
                        text: "2.000",
                        sort: true,
                    },
                    {
                        dataField: "pecahan_lima_ribu",
                        text: "5.000",
                        sort: true,
                    },
                    {
                        dataField: "pecahan_sepuluh_ribu",
                        text: "10.000",
                        sort: true,
                    },
                    {
                        dataField: "pecahan_dua_puluh_ribu",
                        text: "20.000",
                        sort: true,
                    },
                    {
                        dataField: "pecahan_lima_puluh_ribu",
                        text: "50.000",
                        sort: true,
                    },
                    {
                        dataField: "pecahan_tujuh_lima_ribu",
                        text: "75.000",
                        sort: true,
                    },
                    {
                        dataField: "pecahan_seratus_ribu",
                        text: "100.000",
                        sort: true,
                    },
                    {
                        dataField: "omzet",
                        text: "Omset",
                        sort: true,
                        formatter: (value) => formatRupiah(value)
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
              <CardBody>
                <ToolkitProvider
                  rowNumber={rowIndex}
                  data={listkasir}
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
                      text: "username",
                      sort: true,
                    },
                    {
                      dataField: "so_code",
                      text: "No Transaksi",
                      sort: true,
                    },
                    {
                      dataField: "price_total",
                      text: "Harga Total",
                      sort: true,
                      formatter: (value) => formatRupiah(value)
                    },
                    {
                      dataField: "payment_total",
                      text: "Pembayaran Total",
                      sort: true,
                      formatter: (value) => formatRupiah(value)
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

export default DetaiClosingKasir;
