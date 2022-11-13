/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, CardBody, CardHeader, UncontrolledTooltip, ButtonGroup, Form, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const Item = () => {
	const token = localStorage.token;
	const warehouse = parseInt(localStorage.warehouse);
	const redirectPrefix = `/admin/item/edit/`;
	const redirectDetail = `/admin/item/details/`;
	const [rowIndex, setRowIndex] = useState(0);
	const [allItem, setAllItem] = useState([]);
	const [nameItem, setNameItem] = useState("");
	const [codeItem, setCodeItem] = useState("");
	const [page, setPage] = useState(1);
	const [perPage, setPerpage] = useState(10);
	const [totalItem, setTotalItem] = useState(0);
	const [currentSort, setCurrentSort] = useState("");

	let paginationOption = {
		page: page,
		alwaysShowAllBtns: true,
		override: true,
		showTotal: true,
		withFirstAndLast: false,
		sizePerPage: perPage,
		totalSize: totalItem,
		onPageChange: (page) => {
			updateDataTable(page, perPage, currentSort, nameItem, codeItem);
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

	const updateDataTable = (page, perPage, sort, nameItem, codeItem) => {
		getItems(page, perPage, sort, nameItem, codeItem);
		setPage(page);
		setPerpage(perPage);
		setRowIndex((page - 1) * perPage);
		setCurrentSort(sort);
		setNameItem(nameItem);
		setCodeItem(codeItem);
	};

	const handleTableChange = (type, { sortField, sortOrder }) => {
		if (type === "sort") {
			let sort = `${sortField} ${sortOrder}`;
			updateDataTable(page, perPage, sort, nameItem, codeItem);
		}
	};

	useEffect(() => {
		getItems(page, perPage, currentSort, "", "");
	}, []);

	const getItems = async (page, perPage, currentSort, item_name = null, item_code = null) => {
		let filter = {
			page: page,
			per_page: perPage,
			id_warehouse: parseInt(warehouse),
		};
		if (item_name !== null) {
			filter = Object.assign(filter, { item_name: item_name });
		}
		if (item_code !== null) {
			filter = Object.assign(filter, { item_code: item_code });
		}
		const data = filter;
		const headers = {
			Authorization: `Bearer ${token}`,
		};
		const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/items `, data, { headers });
		setAllItem(res.data.response);
		setPage(res.data.current_page + 1);
		setPerpage(res.data.per_page);
		setTotalItem(res.data.total_item);
	};

	const reset = () => {
		setNameItem("");
		setCodeItem("");
		updateDataTable(1, perPage, currentSort, "", "");
	};

	const [itemId, setItemId] = useState(1);
	const [itemData, setItemData] = useState([]);

	useEffect(() => {
		getItemData();
	}, [itemId]);

	const getItemData = async () => {
		const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/items/${itemId}`);
		setItemData(res.data.response);
	};

	return (
		<div>
			<Row>
				<div className="col">
					<Card>
						<CardHeader>
							<div style={{ display: "flex", justifyContent: "space-between" }}>
								<h3>List Item</h3>
								<div style={{ textAlign: "right" }}>
									<Link className="btn btn-info" to="/admin/item/create">
										Tambah
									</Link>
								</div>
							</div>
						</CardHeader>
						<CardBody>
							<div>id item: {itemId}</div>
							<div>nama item: {itemData?.items?.item_name}</div>
							<ButtonGroup className="mb-5">
								<button className="btn btn-danger" onClick={() => setItemId(1)}>
									First
								</button>
								<button className="btn btn-success" style={{ borderRight: "2px solid gray" }} onClick={() => setItemId((prev) => prev - 1)}>
									<i className="fas fa-caret-left"></i> Prev
								</button>
								<button className="btn btn-success" style={{ borderLeft: "2px solid gray" }} onClick={() => setItemId((prev) => prev + 1)}>
									Next <i className="fas fa-caret-right"></i>
								</button>
								<button className="btn btn-danger" onClick={() => setItemId(999)}>
									End
								</button>
							</ButtonGroup>

							<Form>
								<Row md="12">
									<Col md="3">
										<FormGroup>
											<Label htmlFor="exampleFormControlSelect3">Nama Item</Label>
											<Input
												type="text"
												placeholder="Masukan Nama Item"
												value={nameItem}
												onChange={(e) => updateDataTable(1, perPage, currentSort, e.target.value, codeItem)}
											/>
										</FormGroup>
									</Col>
									<Col md="3">
										<FormGroup>
											<Label htmlFor="exampleFormControlSelect3">Kode Item</Label>
											<Input
												type="text"
												placeholder="Masukan Kode Item"
												value={codeItem}
												onChange={(e) => updateDataTable(1, perPage, currentSort, nameItem, e.target.value)}
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
							<ToolkitProvider
								rowNumber={rowIndex}
								data={allItem}
								keyField="id"
								search={{
									defaultSearch: "search something here",
								}}
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
										dataField: "item_code",
										text: "Kode Item",
										sort: true,
									},
									{
										dataField: "barcode",
										text: "Barcode",
										sort: true,
									},
									{
										dataField: "item_name",
										text: "Nama Item",
										sort: true,
									},
									{
										dataField: "kategori_name",
										text: "Kategori",
										sort: true,
									},
									{
										dataField: "function_name",
										text: "Fungsi",
										sort: true,
									},
									{
										dataField: "merek_name",
										text: "Merek",
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
													<Button>
														<Link to={redirectDetail + row.id} id={"tooltip1_" + row.id}>
															<i className="fas fa-eye" />
														</Link>
													</Button>
													<UncontrolledTooltip delay={0} target={"tooltip1_" + row.id}>
														Detail
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
		</div>
	);
};

export default Item;
