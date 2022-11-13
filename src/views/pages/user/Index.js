/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
	TabContent,
	TabPane,
	Nav,
	NavItem,
	NavLink,
	Card,
	Button,
	Row,
	Col,
	CardBody,
	CardHeader,
	Container,
	UncontrolledTooltip,
	ButtonGroup,
	Collapse,
	Form,
	FormGroup,
	Label,
	Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import classnames from "classnames";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import SweetAlert from "react-bootstrap-sweetalert";
import Privilages from "./privileges/Index";

const Users = (props) => {
	const token = localStorage.token;
	const [activeTab, setActiveTab] = useState("1");
	const [allUser, setAllUser] = useState([]);
	const redirectPrefix = `/admin/user/edit/`;
	const [alert, setAlert] = React.useState(null);
	const [hide, setHide] = useState(true);
	const [selectAcquirerId, setSelectedAcquirerId] = useState(0);
	const [selectAcquirerName, setSelectAcquirerName] = useState("");
	const [rowIndex, setRowIndex] = useState(0);

	const [isOpen, setIsOpen] = useState(false);
	const toggleOpen = () => setIsOpen(!isOpen);

	const [name, setName] = useState("");
	const [username, setUsername] = useState("");

	const [page, setPage] = useState(1);
	const [perPage, setPerpage] = useState(10);
	const [totalItem, setTotalItem] = useState(0);
	const [currentSort, setCurrentSort] = useState("");

	const allInfo = JSON.parse(localStorage.allinfo);
	const privileges = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Previleges").map((p) => p.read_access));

	let paginationOption = {
		page: page,
		alwaysShowAllBtns: true,
		override: true,
		showTotal: true,
		withFirstAndLast: false,
		sizePerPage: perPage,
		totalSize: totalItem,
		onPageChange: (page) => {
			updateDataTable(page, perPage, currentSort, name, username);
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
							}}>
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

	const updateDataTable = (page, perPage, sort, name, username) => {
		getUsers(page, perPage, sort, name, username);
		setPage(page);
		setPerpage(perPage);
		setRowIndex((page - 1) * perPage);
		setCurrentSort(sort);
		setName(name);
		setUsername(username);
	};

	const handleTableChange = (type, { sortField, sortOrder }) => {
		if (type === "sort") {
			let sort = `${sortField} ${sortOrder}`;
			updateDataTable(page, perPage, sort, name, username);
		}
	};

	const toggle = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	useEffect(() => {
		getUsers(page, perPage, currentSort, "", "");
	}, []);

	const getUsers = (page, perPage, currentSort, name = null, username = null) => {
		let filter = { page: page, per_page: perPage };
		if (name !== null) {
			filter = Object.assign(filter, { name: name });
		}
		if (username !== null) {
			filter = Object.assign(filter, { username: username });
		}
		const data = filter;
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		};
		axios
			.post(`${process.env.REACT_APP_API_BASE_URL}/users`, data, { headers })
			.then((data) => {
				setAllUser(data.data.response);
				setPage(data.data.current_page + 1);
				setPerpage(data.data.per_page);
				setTotalItem(data.data.total_item);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const delateAcquirer = (id) => {
		axios
			.post(`${process.env.REACT_APP_API_BASE_URL}/user/delete/${id}`, null, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(function (response) {
				setSuccessAlert();
				getAllAquirer();
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const setSuccessAlert = () => {
		setAlert(<SweetAlert success showConfirm confirmBtnText="Ok" title="Acquirer deleted" onCancel={hideAlert} onConfirm={hideAlert} />);
	};

	const setQuestionAlert = (id) => {
		setAlert(
			<SweetAlert
				warning
				showCancel
				confirmBtnText="Yes"
				confirmBtnBsStyle="danger"
				title="Are you sure?"
				onConfirm={() => delateAcquirer(id)}
				onCancel={hideAlert}
				focusCancelBtn
			/>
		);
	};

	const hideAlert = () => {
		setAlert(null);
	};

	const rowEvents = {
		onDoubleClick: (e, row, rowIndex) => {
			setHide(false);
			setSelectedAcquirerId(row.id);
			setSelectAcquirerName(row.acquirer_name);
		},
	};

	const reset = () => {
		setUsername("");
		setName("");
		updateDataTable(1, perPage, currentSort, "", "");
	};

	return (
		<div>
			{alert}
			<SimpleHeader name="User" parentName="Admin" />
			<Container className="mt--6" fluid>
				<Row>
					<div className="col">
						<Card>
							<CardBody>
								<Nav tabs>
									<NavItem>
										<NavLink
											className={classnames({ active: activeTab === "1" })}
											onClick={() => {
												toggle("1");
											}}>
											Users
										</NavLink>
									</NavItem>
									{privileges && privileges === "YES" && (
										<NavItem>
											<NavLink
												
												className={classnames({ active: activeTab === "2" })}
												onClick={() => {
													toggle("2");
												}}>
													<Link>
													<font color="black">Privileges</font>
													</Link>
											</NavLink>
										</NavItem>
									)}
								</Nav>
								<TabContent activeTab={activeTab}>
									<TabPane tabId="1">
										<Row>
											<Col md="12">
												<Card>
													<CardHeader>
														<div
															style={{
																display: "flex",
																justifyContent: "space-between",
															}}>
															<h3>List User</h3>
															<div style={{ textAlign: "right" }}>
																<Link className="btn btn-info" to="/admin/user/create">
																	Tambah
																</Link>
															</div>
														</div>
													</CardHeader>
													<CardBody>
														<h3 onClick={toggleOpen}>
															Filter &nbsp;
															{isOpen === true ? <i className="fa fa-angle-down" aria-hidden="true"></i> : <i className="fa fa-angle-right" aria-hidden="true"></i>}
														</h3>
														<Collapse isOpen={isOpen}>
															<Form>
																<Row md="12">
																	<Col md="3">
																		<FormGroup>
																			<Label htmlFor="exampleFormControlSelect3">Nama</Label>
																			<Input
																				type="text"
																				placeholder="Masukan Nama"
																				value={name}
																				onChange={(e) => updateDataTable(1, perPage, currentSort, e.target.value, username)}
																			/>
																		</FormGroup>
																	</Col>
																	<Col md="3">
																		<FormGroup>
																			<Label htmlFor="exampleFormControlSelect3">Username</Label>
																			<Input
																				type="text"
																				placeholder="Masukan Username"
																				value={username}
																				onChange={(e) => updateDataTable(1, perPage, currentSort, name, e.target.value)}
																			/>
																		</FormGroup>
																	</Col>
																</Row>
																<Row>
																	<Col>
																		<Button type="button" onClick={reset} color="secondary">
																			Reset
																		</Button>
																	</Col>
																</Row>
															</Form>
														</Collapse>
														<ToolkitProvider
															rowNumber={rowIndex}
															data={allUser}
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
																	text: "User Name",
																	sort: true,
																},
																{
																	dataField: "name",
																	text: "Name",
																	sort: true,
																},
																{
																	dataField: "email",
																	text: "Email",
																	sort: true,
																},
																{
																	dataField: "",
																	text: "",
																	formatter: (cell, row, index) => {
																		return (
																			<ButtonGroup>
																				<Button>
																					<Link to={redirectPrefix + row.id} id={"tooltip_" + row.id}>
																						<i className="fas fa-user-edit" />
																					</Link>
																				</Button>
																				<UncontrolledTooltip delay={0} target={"tooltip_" + row.id}>
																					Edit
																				</UncontrolledTooltip>
																				<Button id="btn-acquirer" onClick={() => setQuestionAlert(row.id)}>
																					<i className="fas fa-trash" />
																				</Button>
																				<UncontrolledTooltip delay={0} placement="top" target="btn-acquirer">
																					Delete Acquirer
																				</UncontrolledTooltip>
																			</ButtonGroup>
																		);
																	},
																},
															]}>
															{(props) => (
																<div className="py-4 table-responsive">
																	<BootstrapTable
																		remote
																		{...props.baseProps}
																		bootstrap4={true}
																		bordered={false}
																		hover={true}
																		rowEvents={rowEvents}
																		pagination={paginationFactory({
																			...paginationOption,
																		})}
																		onTableChange={handleTableChange}
																	/>
																</div>
															)}
														</ToolkitProvider>
													</CardBody>
												</Card>
											</Col>
										</Row>
									</TabPane>
									<TabPane tabId="2">
										<Row>
											<Col md="12">
												<Privilages />
											</Col>
										</Row>
									</TabPane>
								</TabContent>
							</CardBody>
						</Card>
					</div>
				</Row>
			</Container>
		</div>
	);
};

export default Users;
