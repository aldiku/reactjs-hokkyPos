/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  Label,
  FormGroup,
  Row,
  Col,
  Input,
  Container,
  CardHeader,
  CardFooter,
  Button,
  Form,
  FormFeedback,
} from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import SimpleHeader from 'components/Headers/SimpleHeader.js';
import Swal from 'sweetalert2';

export default function Create() {
  const token = localStorage.token;
  const warehouse = localStorage.warehouse;
  let soItems;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [kodeSo, setKodeSo] = useState('');
  const [dataSo, setDataSo] = useState('');
  const [dataSoItems, setDataSoItems] = useState('');
  const initialReturItems = {
    item_id: '',
    qty: '',
    keterangan: '',
  };
  const [dataReturItems, setDataReturItems] = useState([initialReturItems]);

  const validateForm = () => {
    let error = false;
    return error;
  };

  useEffect(() => {}, []);

  // handle input change item
  const onInputChangeItem = (e, index) => {
    const { name, value } = e.target;
    const list = [...dataReturItems];
    list[index][name] = value;
    setDataReturItems(list);
  };

  // handle input change
  const onInputChange = (type, val) => {
    setDataSo((prevState) => ({
      ...prevState,
      [type]: val,
    }));
  };

  const postReturSo = async () => {
    setLoading(true);
    const payload = {
      warehouse_id: dataSo.warehouse_id,
      username_so: dataSo.username_so,
      item_or_money: parseInt(dataSo.item_or_money),
      payment_method: dataSo.payment_method,
      keterangan_payment: dataSo.keterangan_payment,
      is_cicil: dataSo.is_cicil,
      username_gudang: dataSo.username_gudang,
      status_barang: dataSo.status_barang,
      keterangan_gudang: dataSo.keterangan_gudang,
      username_kurir: dataSo.username_kurir,
      username_validator: dataSo.username_validator,
      username_manajer: '',
      manajer_approval: 0,
      keterangan_manajer: '',
      clear: dataSo.clear,
      keterangan_validator: dataSo.keterangan_validator,
      so_type: dataSo.so_type,
      keterangan_so: dataSo.keterangan_so,
      items:
        parseInt(dataSo.item_or_money) === 2 ? dataSo.items : dataReturItems,
      retur_code: dataSo.order_code,
    };

    await axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/retur-so/save`, payload, {
        headers,
      })
      .then(function (response) {
        history.push('/admin/so-return');
      })
      .then((json) => {
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSearchSO = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/sales-order/get?order_code=${kodeSo}`,
        {
          headers,
        }
      )
      .then(async (data) => {
        await getSoItems(data.data.response_data.id);
        const mergeItems = {
          ...data.data.response_data,
          items: soItems,
        };
        setDataSo(mergeItems);
        if (data.data.status === 'false') {
          Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Maaf, Data SO tidak ditemukan',
          });
        }
      })
      .catch(function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Maaf, Data SO tidak ditemukan',
        });
      });
  };

  const getSoItems = async (so_id) => {
    await axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/sales-order/so-items`,
        { so_id: so_id },
        {
          headers,
        }
      )
      .then((data) => {
        setDataSoItems(data.data.response_data);
        const constructItems = [];
        data.data.response_data.map((key) => {
          constructItems.push({
            item_id: key.item_id,
            qty: key.qty,
            keterangan: '',
          });
        });
        soItems = constructItems;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      postReturSo();
    }
  };

  const onAddItem = () => {
    setDataReturItems([...dataReturItems, initialReturItems]);
  };

  const onRemoveItem = (index) => {
    const list = [...dataReturItems];
    list.splice(index, 1);
    setDataReturItems(list);
  };

  return (
    <>
      <SimpleHeader name="Daftar Sales Order Return" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <CardHeader>
                    <h3>Daftar Sales Order Return</h3>
                  </CardHeader>
                  <CardBody>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Kode Sales Order
                      </Label>
                      <Input
                        type="text"
                        name="codeSo"
                        placeholder="Masukan Kode Sales Order"
                        value={kodeSo}
                        onChange={(e) => {
                          setKodeSo(e.target.value);
                        }}
                      />
                      <FormFeedback>
                        Kode Sales Order tidak boleh kosong
                      </FormFeedback>
                    </FormGroup>
                    <Button
                      color="primary"
                      style={{ marginBottom: 12 }}
                      onClick={handleSearchSO}
                    >
                      Cari
                    </Button>
                    {dataSo && (
                      <div>
                        <FormGroup>
                          <Label className="form-control-label">
                            Username SO
                          </Label>
                          <Input
                            disabled
                            type="text"
                            value={dataSo?.username_so}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-control-label">
                            Keterangan SO
                          </Label>
                          <Input
                            disabled
                            type="text"
                            value={dataSo?.keterangan_so}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-control-label">
                            Username Validator
                          </Label>
                          <Input
                            disabled
                            type="text"
                            value={dataSo?.username_validator}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-control-label">
                            Keterangan Validator
                          </Label>
                          <Input
                            disabled
                            type="text"
                            value={dataSo?.keterangan_validator}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-control-label">
                            Username Gudang
                          </Label>
                          <Input
                            disabled
                            type="text"
                            value={dataSo?.username_gudang}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-control-label">
                            Keterangan Payment
                          </Label>
                          <Input
                            disabled
                            type="text"
                            value={dataSo?.keterangan_payment}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-control-label">
                            Payment Method
                          </Label>
                          <Input
                            disabled
                            type="text"
                            value={
                              dataSo?.payment_method === 1
                                ? 'Tunai'
                                : 'Tempo / Termin / Utang'
                            }
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-control-label">Is Cicil</Label>
                          <Input
                            disabled
                            type="text"
                            value={
                              dataSo?.is_cicil === 0
                                ? 'Pilih Cicilan'
                                : dataSo?.is_cicil === 1
                                ? 'Cicilan (Lunas)'
                                : 'Cicilan (Belum Lunas)'
                            }
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-control-label"> SO Type</Label>
                          <Input
                            disabled
                            type="text"
                            value={
                              dataSo?.is_cicil === 1
                                ? 'Konvensional'
                                : 'Cicilan (Belum Lunas)'
                            }
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-control-label">Clear</Label>
                          <Input
                            disabled
                            type="text"
                            value={
                              dataSo?.clear === 1
                                ? 'Disetujui'
                                : dataSo?.clear === 2
                                ? 'Ditolak'
                                : 'Dibatalkan'
                            }
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-control-label">Approve</Label>
                          <Input
                            disabled
                            type="text"
                            value={
                              dataSo?.approve === 1
                                ? 'Disetujui'
                                : dataSo?.approve === 2
                                ? 'Ditolak'
                                : 'Dibatalkan'
                            }
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-control-label">
                            Status Barang
                          </Label>
                          <Input
                            disabled
                            type="text"
                            value={
                              dataSo?.status_barang === 1
                                ? 'Disetujui'
                                : dataSo?.status_barang === 2
                                ? 'Ditolak'
                                : 'Dibatalkan'
                            }
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-control-label">Qty</Label>
                          <Input
                            disabled
                            type="text"
                            value={dataSo?.total_qty}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-control-label">Harga</Label>
                          <Input
                            disabled
                            type="text"
                            value={dataSo?.total_price}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-control-label">
                            Total Qty Fisik
                          </Label>
                          <Input
                            disabled
                            type="text"
                            value={dataSo?.total_qty_fisik}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-control-label">
                            Total Harga Fisik
                          </Label>
                          <Input
                            disabled
                            type="text"
                            value={dataSo?.total_price_fisik}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label
                            className="form-control-label"
                            htmlFor="exampleFormControlSelect3"
                          >
                            Item or Money
                          </Label>
                          <Input
                            name="item_or_money"
                            type="select"
                            onChange={(e) =>
                              onInputChange('item_or_money', e.target.value)
                            }
                          >
                            <option value="0">Pilih</option>
                            <option value={1}>Item</option>
                            <option value={2}>Money</option>
                          </Input>
                        </FormGroup>
                        {parseInt(dataSo.item_or_money) === 1 &&
                          dataReturItems.map((x, i) => {
                            return (
                              <div key={i}>
                                <FormGroup>
                                  <Label
                                    className="form-control-label"
                                    htmlFor="exampleFormControlSelect3"
                                  >
                                    Item
                                  </Label>
                                  <Input
                                    name="item_id"
                                    type="select"
                                    onChange={(e) => {
                                      onInputChangeItem(e, i);
                                    }}
                                  >
                                    <option value="0">Pilih Item</option>
                                    {dataSoItems.map((item, key) => {
                                      return (
                                        <option key={key} value={item.item_id}>
                                          {item.item_name}
                                        </option>
                                      );
                                    })}
                                  </Input>
                                </FormGroup>
                                <FormGroup>
                                  <Label className="form-control-label">
                                    Quantity
                                  </Label>
                                  <Input
                                    type="text"
                                    name="qty"
                                    placeholder="Masukan Quantity yang Akan di Retur"
                                    value={dataReturItems.qty}
                                    onChange={(e) => onInputChangeItem(e, i)}
                                  />
                                </FormGroup>
                                <div className="btn-box">
                                  {dataReturItems.length !== 1 && (
                                    <Button
                                      color="default"
                                      onClick={() => onRemoveItem(i)}
                                    >
                                      Remove
                                    </Button>
                                  )}
                                  {dataReturItems.length - 1 === i && (
                                    <Button color="default" onClick={onAddItem}>
                                      Add
                                    </Button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </CardBody>
                  <CardFooter>
                    {!isLoading && (
                      <Button color="primary" type="submit">
                        Simpan
                      </Button>
                    )}
                    {isLoading && (
                      <Button color="primary" disabled>
                        <i className="fas fa-spinner fa-spin"></i>
                        {''}
                        loading...
                      </Button>
                    )}
                    <Link className="btn btn-info" to="/admin/so-return">
                      Kembali
                    </Link>
                  </CardFooter>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}
