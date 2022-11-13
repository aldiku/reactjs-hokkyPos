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

export default function Edit(props) {
  const token = localStorage.token;
  const warehouse = localStorage.warehouse;
  let soItems;
  let soId;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [datasoRetur, setDatasoRetur] = useState('');
  const [datasoItems, setDatasoItems] = useState('');
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

  useEffect(() => {
    getById();
  }, []);

  // handle input change item
  const onInputChangeItem = (e, index) => {
    const { name, value } = e.target;
    const list = [...dataReturItems];
    list[index][name] = value;
    setDataReturItems(list);
  };

  // handle input change
  const onInputChange = (type, val) => {
    setDatasoRetur((prevState) => ({
      ...prevState,
      [type]: val,
    }));
  };

  const getById = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/retur-so/get/${props.match.params.id}`,
        { headers }
      )
      .then(async (data) => {
        await getSo(data.data.response_data.retur_code);
        await getsoItems(soId);

        const mergeItems = {
          ...data.data.response_data,
          items: soItems,
        };
        setDatasoRetur(mergeItems);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getSo = async (kodeSo) => {
    await axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/sales-order/get?order_code=${kodeSo}`,
        {
          headers,
        }
      )
      .then((data) => {
        soId = data.data.response_data.id;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getsoItems = async (so_id) => {
    await axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/sales-order/so-items`,
        { so_id: so_id },
        {
          headers,
        }
      )
      .then((data) => {
        setDatasoItems(data.data.response_data);
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

  const updateReturSo = async () => {
    setLoading(true);
    const payload = {
      warehouse_id: datasoRetur.warehouse_id,
      username_so: datasoRetur.username_so,
      item_or_money: parseInt(datasoRetur.item_or_money),
      payment_method: datasoRetur.payment_method,
      keterangan_payment: datasoRetur.keterangan_payment,
      is_cicil: datasoRetur.is_cicil,
      username_gudang: datasoRetur.username_gudang,
      status_barang: datasoRetur.status_barang,
      keterangan_gudang: datasoRetur.keterangan_gudang,
      username_kurir: datasoRetur.username_kurir,
      username_validator: datasoRetur.username_validator,
      username_manajer: '',
      manajer_approval: 0,
      keterangan_manajer: '',
      clear: datasoRetur.clear,
      keterangan_validator: datasoRetur.keterangan_validator,
      so_type: datasoRetur.so_type,
      keterangan_so: datasoRetur.keterangan_so,
      items:
        parseInt(datasoRetur.item_or_money) === 2
          ? datasoRetur.items
          : dataReturItems,
      retur_code: datasoRetur.retur_code,
    };
    await axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/retur-so/update/${props.match.params.id}`,
        payload,
        {
          headers,
        }
      )
      .then(function (response) {
        setLoading(false);
        if (response.data.error?.error_code > 200) {
          Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Maaf, Data SO retur gagal di simpan',
          });
        } else {
          history.push('/admin/so-return');
        }
      })
      .then((json) => {
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onAddItem = () => {
    setDataReturItems([...dataReturItems, initialReturItems]);
  };

  const onRemoveItem = (index) => {
    const list = [...dataReturItems];
    list.splice(index, 1);
    setDataReturItems(list);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      updateReturSo();
    }
  };
  return (
    <>
      <SimpleHeader name="Edit Purchase Order" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <CardHeader>
                    <h3>Edit Sales Order Retur</h3>
                  </CardHeader>
                  <CardBody>
                    <FormGroup>
                      <Label className="form-control-label">Username SO</Label>
                      <Input
                        disabled
                        type="text"
                        value={datasoRetur?.username_so}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="form-control-label">
                        Keterangan SO
                      </Label>
                      <Input
                        disabled
                        type="text"
                        value={datasoRetur?.keterangan_so}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="form-control-label">
                        Username Validator
                      </Label>
                      <Input
                        disabled
                        type="text"
                        value={datasoRetur?.username_validator}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="form-control-label">
                        Keterangan Validator
                      </Label>
                      <Input
                        disabled
                        type="text"
                        value={datasoRetur?.keterangan_validator}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="form-control-label">
                        Username Gudang
                      </Label>
                      <Input
                        disabled
                        type="text"
                        value={datasoRetur?.username_gudang}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="form-control-label">
                        Keterangan Payment
                      </Label>
                      <Input
                        disabled
                        type="text"
                        value={datasoRetur?.keterangan_payment}
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
                          datasoRetur?.payment_method === 1
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
                          datasoRetur?.is_cicil === 0
                            ? 'Pilih Cicilan'
                            : datasoRetur?.is_cicil === 1
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
                          datasoRetur?.is_cicil === 1
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
                          datasoRetur?.clear === 1
                            ? 'Disetujui'
                            : datasoRetur?.clear === 2
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
                          datasoRetur?.approve === 1
                            ? 'Disetujui'
                            : datasoRetur?.approve === 2
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
                          datasoRetur?.status_barang === 1
                            ? 'Disetujui'
                            : datasoRetur?.status_barang === 2
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
                        value={datasoRetur?.total_qty}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="form-control-label">Harga</Label>
                      <Input
                        disabled
                        type="text"
                        value={datasoRetur?.total_price}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="form-control-label">
                        Total Qty Fisik
                      </Label>
                      <Input
                        disabled
                        type="text"
                        value={datasoRetur?.total_qty_fisik}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="form-control-label">
                        Total Harga Fisik
                      </Label>
                      <Input
                        disabled
                        type="text"
                        value={datasoRetur?.total_price_fisik}
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
                        value={datasoRetur.item_or_money}
                      >
                        <option value="0">Pilih</option>
                        <option value="1">Item</option>
                        <option value="2">Money</option>
                      </Input>
                    </FormGroup>
                    {parseInt(datasoRetur.item_or_money) === 1 &&
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
                                {datasoItems.map((item, key) => {
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
                    <Link className="btn btn-info" to="/admin/po-return">
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
