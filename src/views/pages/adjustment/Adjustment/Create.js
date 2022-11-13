/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  CardBody,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Form,
  FormGroup,
  Label,
  Input, 
} from "reactstrap";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

const CreateAdjustment = () => {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [qty,setQty] = useState([]);
  const [keterangan,setketerangan] = useState("");
  const [reason, setReason] = useState([]);
  const [reasons, setReasons] = useState([]);
  const [ket, setket] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [active, setActive] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    getReason();
  }, []);

  const getReason = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/reason/list/`,
        { headers }
      )
      .then((data) => {
        setReasons(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  function CreateData() {
    setLoading(true);
    let dataItems = [];
        savedItems.map((dataItem) => dataItems = [...dataItems, 
            { 
                item_id: dataItem.item_id, 
                qty: dataItem.qty, 
                reason:dataItem.reason,
                ket:dataItem.ket,
            }]);
    let data = {
      warehouse_id : parseInt(warehouse),
      username : username,
      keterangan: keterangan ,
      items : dataItems
    };
    axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/adjustment/save`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          history.push("/admin/stock-adjustment");
        })
        .then((json) => {
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  const saveItem = () => {
    if (qty === '' || qty <= -1000)
        return;

        axios.post(`${process.env.REACT_APP_API_BASE_URL}/items`, {
            page: 1,
            per_page: 1,
            item_name: input
        }).then(async response => {
            const length = response.data.response.length;
            if (length === 0)
                return;

            const idItem = response.data.response[0].id;

            axios.get(`${process.env.REACT_APP_API_BASE_URL}/items/${idItem}`)
                .then(async response => {
                    return {
                        item: response.data.response.items,
                    };
                }).then((data) => {
                    let stateItem = [...savedItems, {
                        item_id: idItem,
                        qty: parseInt(qty),
                        reason:reason,
                        ket:ket,
                        data: data.item,
                    }];
                    setSavedItems(stateItem);
                });
        });
}

const onChange = (e) => {
    const input = e.currentTarget.value;

    axios.post(`${process.env.REACT_APP_API_BASE_URL}/items`, {
        page: 1,
        per_page: 10,
        item_name: input,
        warehouse_id: parseInt(warehouse)
    }).then(async response => {
        let suggests = [];

        await Promise.all(response.data.response.map((data) =>
            suggests = [...suggests, data.item_name]
        ));

        setActive(0);
        setFiltered(suggests);
        setIsShow(true);
    });

    setInput(e.currentTarget.value);
};
const onClick = e => {
    setActive(0);
    setFiltered([]);
    setIsShow(false);
    setInput(e.currentTarget.innerText)
};
const onKeyDown = e => {
    if (e.keyCode === 13) { // enter key
        setActive(0);
        setIsShow(false);
        setInput(filtered[active])
    }
    else if (e.keyCode === 38) { // up arrow
        return (active === 0) ? null : setActive(active - 1);
    }
    else if (e.keyCode === 40) { // down arrow
        return (active - 1 === filtered.length) ? null : setActive(active + 1);
    }
};

const AutoCompleTes = () => {
    if (isShow && input) {
        if (filtered.length) {
            return (
                <ul className="autocomplete">
                    {filtered.map((suggestion, index) => {
                        let className;
                        if (index === active) {
                            className = "active";
                        }
                        return (
                            <li key={index} className={className} onClick={onClick}>
                                {suggestion}
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
 
  const handleSubmit = (e) => {
    e.preventDefault();
    {
      saveItem();
      setInput("");
      setQty([]);
      setReason("")
      setket([]);
    }
  };

  const deleteItem = (id) => {
    let array = [...savedItems];

    let index = array.findIndex(object => {
        return object.item_id === id;
    });

    if (index !== -1) {
        array.splice(index, 1);
        setSavedItems(array);
    }
}

  return (
    <>
    <SimpleHeader name="Adjustment" parentName="Inventori" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
              <Card>
                <CardBody>
                    <CardHeader>
                      <h3>Adjustment</h3>
                    </CardHeader>
                    <CardBody>
                      <Row md="12">
                          <Col md="9">
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={2}
                              >
                                Keterangan
                              </Label>
                              <Col sm={10}>
                                <Input
                                autoComplete="off"
                                  type="textarea"
                                  name="keterangan"
                                  placeholder="Masukan Keterangan"
                                  style={{
                                    fontSize: 14,
                                    paddingTop: 20,
                                    top: "50%",
                                    height: 117,
                                    resize: "none",
                                  }}
                                  value={keterangan}
                                  onChange={(e) => {
                                    setketerangan(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                          </Col>
                      </Row>
                    </CardBody>
                    <br></br>
                    <br></br>
                    <br></br>
                    <CardHeader>
                      <h3>Item Adjustment</h3>
                    </CardHeader>
                    <CardBody>
                      <Form onSubmit={handleSubmit}>
                        <Row md="12">
                            <Col md="6">
                              <FormGroup row>
                                <Label
                                    for="exampleEmail"
                                    sm={3}
                                  >
                                    Item
                                  </Label>
                                <Col sm={6}>
                                <Input
                                autoComplete="off"
                                    placeholder="Item"
                                    type="search"
                                    onChange={onChange}
                                    onKeyDown={onKeyDown}
                                    value={input}
                                />
                                </Col>
                                <AutoCompleTes />
                              </FormGroup>
                              <FormGroup row>
                              <Label
                                  for="exampleEmail"
                                  sm={3}
                                >
                                  Alasan
                              </Label>
                              <Col sm={6}>
                                <Input
                                autoComplete="off"
                                    type="select"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                >
                                 <option value="">Pilih Alasan</option>
                                    {reasons.map((reason, key) => {
                                        return (
                                        <option key={key} value={reason.description}>
                                            {reason.description}
                                        </option>
                                        );
                                    })}
                              </Input>
                              </Col>
                            </FormGroup>
                            </Col>
                            <Col md="6">
                            <FormGroup row>
                              <Label
                                  for="exampleEmail"
                                  sm={3}
                                >
                                  Quantity
                              </Label>
                              <Col sm={6}>
                                <Input
                                autoComplete="off"
                                    placeholder="Qty"
                                    type="text"
                                    value={qty}
                                    onChange={(e) => setQty(e.target.value)}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                  for="exampleEmail"
                                  sm={3}
                                >
                                  Keterangan
                              </Label>
                              <Col sm={6}>
                                <Input
                                autoComplete="off"
                                    placeholder="Masukan Keterangan"
                                    type="textarea"
                                    style={{
                                        fontSize: 14,
                                        paddingTop: 20,
                                        top: "50%",
                                        height: 117,
                                        resize: "none",
                                    }}
                                    value={ket}
                                    onChange={(e) => setket(e.target.value)}
                                />
                              </Col>
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row md="12">
                            <Col md="6">
                            </Col>
                            <Col md="6">
                            <FormGroup row>
                              <Label
                                    for="exampleEmail"
                                    sm={3}
                                  >
                                </Label>
                              <Col sm={6}>
                              <Button color="primary" type="submit">Tambah</Button>
                              </Col>
                            </FormGroup>
                            </Col>
                        </Row>
                      </Form>
                      <Table>
                              <thead>
                                <tr>
                                  <th>
                                    Nama Item
                                  </th>
                                  <th>
                                    Qty
                                  </th>
                                  <th>
                                    Alasan
                                  </th>
                                  <th>
                                    Keterangan
                                  </th>
                                  <th>
                                    
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                    savedItems.map((savedItem, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{savedItem.data.item_name}</td>
                                                <td>{savedItem.qty}</td>
                                                <td>{savedItem.reason}</td>
                                                <td>{savedItem.ket}</td>
                                                <td>
                                                    <Button color="danger" onClick={() => deleteItem(savedItem.item_id)}>Hapus</Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                              </tbody>
                      </Table>
                    </CardBody>
                </CardBody>
                <CardFooter>
                      {!isLoading && (
                        <Button color="primary" onClick={() => CreateData()}>save</Button>
                      )}
                      {isLoading && (
                        <Button color="primary" disabled>
                          <i className="fas fa-spinner fa-spin"></i>
                          {""}
                          loading...
                        </Button>
                      )}
                      <Link className="btn btn-info" to="/admin/stock-adjustment">
                        back
                      </Link>
                </CardFooter>
              </Card>
          </div>
        </Row>
    </Container>  
    </>
  );
}

export default CreateAdjustment;