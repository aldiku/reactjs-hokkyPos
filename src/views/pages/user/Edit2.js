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
	Container,
	Form,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function Userss(props) {
	const token = localStorage.token;
	const warehouseId = localStorage.warehouse;
	const username = localStorage.username;
	let history = useHistory();

    const [usernameusers, setUsernameUsers] = useState("");
    const [nama,setNama] = useState("");
    const [awal, setAwal] = useState("");
    const [resign, setResign] = useState("");
    const [itemId, setItemId] = useState(4);
    const [warehouse,setWarehouse] = useState("");
    const [warehouses,setWarehouses] = useState([]);
    const [editingItem, setEditingitem] = useState([]);
    const [savedItems, setSavedItems] = useState([]);
	const headers = {Authorization: `Bearer ${token}`};
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [status, setStatus] = useState("");


	useEffect(() => {
        getById();
        getWarehouse();
	}, [itemId]);

	  const getById = () => {
	    const headers = {
	      "Content-Type": "application/json",
	      Authorization: `Bearer ${token}`,
	    };
	    axios
	      .get(
	        `${process.env.REACT_APP_API_BASE_URL}/users/get/${props.match.params.id}`,
	        { headers }
	      )
	      .then((data) => {
            setUsernameUsers(data.data.response.username)
            setNama(data.data.response.name)
            setEmail(data.data.response.email)
            setPassword(data.data.response.password)
            setAddress(data.data.response.address)
            setStatus(data.data.response.status_akun)
            getWarehouse(data.data.response.office)
            setAwal(data.data.response.recruit)
            setResign(data.data.response.resign)
            getItemDataSaved();
	      })
	      .catch(function (error) {
	        console.log(error);
	      });
	  };

      const getItemDataSaved = () => {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };

        axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/list-privileges`, {
    
            user_id: props.match.params.id
    
        }, { headers }).then(async response => {
            let stateItem = [];
            let stateEditing = [];
    
            await Promise.all(response.data.response.map(async (data) => {
                stateItem = [...stateItem, {
                    id: data.id,
                    user_id: data.user_id,
                    privilege_id: data.privilege_id,
                    privilege_name: data.privilege_name,
                    create_access: data.create_access,
                    read_access: data.read_access,
                    update_access: data.update_access,
                    delete_access: data.delete_access,
                    data: {
                        user_id: data.user_id,
                        privilege_id: data.privilege_id,
                        privilege_name: data.privilege_name,
                        create_access: data.create_access,
                        read_access: data.read_access,
                        update_access: data.update_access,
                        delete_access: data.delete_access
                    },
                }];
    
                stateEditing = [...stateEditing, {
                    editing: false
                }];
            }));
            setEditingitem(stateEditing);
            setSavedItems(stateItem);
        })
    }

    const getWarehouse = () => {
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
        })
        .catch(function (error) {
        console.log(error);
        });
    };


    const changeItemDataTable = async (arg) => {
        setSavedItems([
            ...savedItems.slice(0, arg.index),
            Object.assign({}, savedItems[arg.index], {
                data: {
                    privilege_name: arg.privilegename,
                    create_access: savedItems[arg.index].create_access,
                    read_access: savedItems[arg.index].read_access,
                    update_access: savedItems[arg.index].update_access,
                    delete_access: savedItems[arg.index].delete_access,
                }
            }),
            ...savedItems.slice(arg.index + 1)
        ]);
    
        changePriceStatus(arg.index, false);
    }
    
    const changePriceStatus = (index, status) => {
      setEditingitem([
          ...editingItem.slice(0, index),
          Object.assign({}, editingItem[index], { editing: status }),
          ...editingItem.slice(index + 1)
      ]);
    }

	return (
		<>
			<div>
				<SimpleHeader name="Edit User" parentName="Master" />
				<Container className="mt--6" fluid>
					<Row>
						<div className="col">
                                <Card className="position-sticky boxShadow" style={{ top: 0, zIndex: "5" }}>
									<CardBody>
										<Row md="12">
											<Col md="5">
											</Col>
											<Col md="4">
												<FormGroup row>
													<Col sm={7}>
														{/* <Input
															className="form-control-alternative"
															placeholder="Search Users"
															type="search"
															onChange={(e) => setQuery(e.target.value)}
															onKeyDown={search}
														/> */}
													</Col>
												</FormGroup>
											</Col>
											<Col md="3">
												<div style={{ textAlign: "right" }}>
                                                    {/* <Link className="btn btn-info" disabled>
														<i className="fas fa-book" /> Update
													</Link> */}
                                                    <Button
                                                        color="info"
                                                        onClick={() => cekKasir()}
                                                        disabled
                                                    >
                                                        <i className="fas fa-book" /> Update
                                                    </Button>
												</div>
											</Col>
										</Row>
									</CardBody>
								</Card>
                                <Card className="bg-secondary shadow">
                                    <CardHeader className="bg-white border-0">
                                        <h3>Edit User</h3>
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
                                                            className="form-control-alternative"
                                                            type="text"
                                                            name="itemCode"
                                                            placeholder="Masukan Username"
                                                            value={usernameusers}
                                                            onChange={(e) => {
                                                                setUsernameUsers(e.target.value);
                                                            }}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label for="exampleEmail" sm={4}>
                                                        Cabang
                                                    </Label>
                                                    <Col sm={7}>
                                                        <Input
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
                                                        Nama
                                                    </Label>
                                                    <Col sm={7}>
                                                        <Input
                                                            className="form-control-alternative"
                                                            type="text"
                                                            name="barcode"
                                                            placeholder="Masukan Nama"
                                                            value={nama}
                                                            onChange={(e) => {
                                                                setNama(e.target.value);
                                                            }}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label for="exampleEmail" sm={4}>
                                                        Email
                                                    </Label>
                                                    <Col sm={7}>
                                                        <Input
                                                            className="form-control-alternative"
                                                            type="text"
                                                            name="email"
                                                            placeholder="Masukan Email"
                                                            value={email}
                                                            onChange={(e) => {
                                                                setEmail(e.target.value);
                                                            }}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label for="exampleEmail" sm={4}>
                                                        Password
                                                    </Label>
                                                    <Col sm={7}>
                                                        <Input
                                                            className="form-control-alternative"
                                                            name="Supplier"
                                                            type="text"
                                                            placeholder="Masukan Password"
                                                            value={password}
                                                            onChange={(e) => {
                                                                setPassword(e.target.value);
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
                                                        Alamat
                                                    </Label>
                                                    <Col sm={7}>
                                                        <Input
                                                            className="form-control-alternative"
                                                            type="textarea"
                                                            
                                                            rows="5"
                                                            placeholder="Masukan Alamat"
                                                            value={address}
                                                            onChange={(e) => {
                                                                setAddress(e.target.value);
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
                                                            className="form-control-alternative"
                                                            type="date"
                                                            name="itemCode"
                                                            placeholder="Tanggal Pembuatan"
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
                                                    Status Akun
                                                    </Label>
                                                    <Col sm={7}>
                                                        <div style={{ display: "flex" }}>
                                                            <div className="custom-control custom-radio mb-4">
                                                                <Input
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
                                                </FormGroup>
                                            </CardBody>
										</Col>
									</Row>
                                </Card>
                                <Card className="bg-secondary shadow">
                                    <CardHeader className="bg-white border-0">
                                        <h3>PRIVILEGE</h3>
                                    </CardHeader>
                                    <CardBody>
                                        <Table>
                                            <thead>
                                            <tr>
                                                <th>
                                                    Menu
                                                </th>
                                                <th>
                                                    Create
                                                </th>
                                                <th>
                                                    Read
                                                </th>
                                                <th>
                                                    Update
                                                </th>
                                                <th>
                                                    Delete
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
                                                            <td>{savedItem.data.privilege_name}</td>
                                                            <td>
                                                                {editingItem[key].editing ? (
                                                                    <Input
                                                                        placeholder="Harga Per Item"
                                                                        type="text"
                                                                        row="3"
                                                                        value={savedItems[key].create_access}
                                                                        onChange={(e) => {
                                                                            setSavedItems([
                                                                                ...savedItems.slice(0, key),
                                                                                Object.assign({}, savedItems[key], { create_access: e.target.value}),
                                                                                ...savedItems.slice(key + 1)
                                                                            ]);
                                                                        }}
                                                                    />
                                                                ) : (
                                                                        <>{savedItem.create_access}</>
                                                                    )}
                                                            </td>
                                                            <td>
                                                                {editingItem[key].editing ? (
                                                                        <Input
                                                                            placeholder="qty"
                                                                            type="text"
                                                                            value={savedItems[key].read_access}
                                                                            onChange={(e) => {
                                                                                setSavedItems([
                                                                                    ...savedItems.slice(0, key),
                                                                                    Object.assign({}, savedItems[key], { read_access: e.target.value}),
                                                                                    ...savedItems.slice(key + 1)
                                                                                ]);
                                                                            }}
                                                                        />
                                                                ) : (
                                                                            <>{savedItem.read_access}</>
                                                                        )}
                                                            </td>
                                                            <td>
                                                                {editingItem[key].editing ? (
                                                                    <Input
                                                                        placeholder="Diskon Persen"
                                                                        type="text"
                                                                        value={savedItems[key].update_access}
                                                                        onChange={(e) => {
                                                                            setSavedItems([
                                                                                ...savedItems.slice(0, key),
                                                                                Object.assign({}, savedItems[key], { update_access: e.target.value}),
                                                                                ...savedItems.slice(key + 1)
                                                                            ]);
                                                                        }}
                                                                    />
                                                                ) : (
                                                                        <>{savedItem.update_access}</>
                                                                    )}
                                                            </td>
                                                            <td>
                                                                {editingItem[key].editing ? (
                                                                    <Input
                                                                        placeholder="Diskon nominal"
                                                                        type="text"
                                                                        value={savedItems[key].delete_access}
                                                                        onChange={(e) => {
                                                                            setSavedItems([
                                                                                ...savedItems.slice(0, key),
                                                                                Object.assign({}, savedItems[key], { delete_access: e.target.value}),
                                                                                ...savedItems.slice(key + 1)
                                                                            ]);
                                                                        }}
                                                                    />
                                                                ) : (
                                                                        <>{savedItem.delete_access}</>
                                                                    )}
                                                            </td>
                                                            <td>
                                                                {editingItem[key].editing ? (
                                                                    <>
                                                                        <Button color="warning" onClick={() => changeItemDataTable({
                                                                            index: key,
                                                                            privilegename: savedItem.data.privilege_name,
                                                                            create_access: savedItem.data.create_access,
                                                                            read_access: savedItem.data.read_access,
                                                                            update_access: savedItem.data.update_access,
                                                                            delete_access: savedItem.data.delete_access,
                                                                        })}>Update</Button>
                                                                        <Button color="danger" onClick={() => {
                                                                            setSavedItems([
                                                                                ...savedItems.slice(0, key),
                                                                                Object.assign({}, savedItems[key], 
                                                                                    {   privilegename: savedItem.data.privilege_name,
                                                                                        create_access: savedItem.data.create_access,
                                                                                        read_access: savedItem.data.read_access,
                                                                                        update_access: savedItem.data.update_access,
                                                                                        delete_access: savedItem.data.delete_access,
                                                                                    }),
                                                                                ...savedItems.slice(key + 1)
                                                                            ]);

                                                                            changePriceStatus(key, false);
                                                                        }}>Cancel</Button>
                                                                    </>
                                                                ) : (
                                                                        <>
                                                                            <Button color="warning" onClick={() => changePriceStatus(key, true)}>Edit</Button>
                                                                        </>
                                                                    )}
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            </tbody>
                                        </Table>
                                    </CardBody>
                                </Card>
							{/* </Form> */}
						</div>
					</Row>
				</Container>
			</div>
		</>
	);
}
