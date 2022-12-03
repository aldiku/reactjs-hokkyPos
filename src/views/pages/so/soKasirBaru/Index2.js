/*eslint-disable*/
import React, { useEffect, useState,useRef } from "react";
import { Card, CardBody, Row, Col, Input, Container,CardFooter,InputGroupText,FormGroup, Form, Table, Button,InputGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import { Br, Cut, Line, Printer, Text} from 'react-thermal-printer';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

export default function CreateSalesOrder() {
	const token = localStorage.token;
	const warehouse = localStorage.warehouse;
	const username = localStorage.username;
	const name = localStorage.name;

	let history = useHistory();
	const [isOpen, setIsOpen] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);
	const redirectPrefix1 = `/cetak/invoice-so/cetak/`;
	const [barcode, setBarcode] = useState("");
	const inputBarcode = useRef(null);
	const [pengiriman, setPengiriman] = useState(1);
	const [customers, setCustomers] = useState([]);
	const [customer, setCustomer] = useState("");
	const [payment_method1, setPaymentMethod1] = useState([]);
	const [payment_method2, setPaymentMethod2] = useState([]);
	const [keterangan1, setKeterangan1] = useState("");
	const [keterangan2, setKeterangan2] = useState("");
	const [savedItems, setSavedItems] = useState([]);
	const [isShow, setIsShow] = useState(false);
	const [active, setActive] = useState(0);
	const [filtered, setFiltered] = useState([]);
	const [qty, setQty] = useState(1);
	const [payment_method, setPaymentMethod] = useState('1');
	const [pay1, setPay1] = useState(0);
	const [pay2, setPay2] = useState(0);
	const [change, setChange] = useState(0);
	const [banks, setBanks] = useState([]);
	const [jenisTransaksi, setJenisTransaksi] = useState("");
	const [ppn, setPPN] = useState(0);
	const [ongkir, setOngkir] = useState(0);
	const [ongkir1, setOngkir1] = useState(0);
	const [totaldiskon, setTotalDiskon] = useState(0);
    const [totaldiskon1, setTotalDiskon1] = useState(0);
	const [grandtotal, setGrandTotal] = useState(0);
	const [editingItem, setEditingitem] = useState([]);
	const [alamatcustomer, setAlamatCustomer] = useState("");
	const [alamatlain, setAlamatLain] = useState("");
	const [diskonglobalnominal, setDiskonGlobalNominal] = useState(0);
	const [diskonglobalpersen,setDiskonGlobalPersen] = useState(0);
	const [pajak, setPajak] = useState('2');
	const [allpajak, setAllPajak] = useState([]);
	const [sales, setSales] = useState("");
	const [itemIdd, setItemIdd] = useState("");
	const [allItemm, setAllItemm] = useState([]);
	const [queryy, setQueryy] = useState("");
	const [isSearchShoww, setIsSearchShoww] = useState(false);
	const [ppnnew, setPPNNEW] = useState(0);
	const [diskonglobal, setDiskonGLobal] = useState(0);
    const [totalPrice1, setTotalPrice1] = useState(0);
	const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
    const [diskonglobalnominal1,setDiskonGlobalNominal1] = useState(0)
    const [a, setA] = useState(0);
	const [b, setB] = useState(0);
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState([]);
	const loading = open && options.length === 0;

	useEffect(() => {
		if (!open) {
		  setOptions([]);
		}
	  }, [open]);
	
	useEffect(() => {
		let active = true;

		if (!loading) {
			return undefined;
		}

		(async () => {
			axios
				.get(`${process.env.REACT_APP_API_BASE_URL}/customer/list`, { headers })
				.then((data) => {
					if (active) {
						setOptions(data.data.response);
					}
				})
				.catch(function (error) {
					console.log(error);
				});
		})();

		return () => {
			active = false;
		};
	}, [loading]);

	useEffect(() => {
		const getData = setTimeout(async() => {
			if(queryy != ''){
				setIsSearchShoww(true);
				const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/items`, { item_name: queryy , warehouse_id: parseInt(warehouse),  }, { headers });
				if (res.data.status !== 404) setAllItemm(res.data);
			}
		  }, 500)
	  
		  return () => clearTimeout(getData)
	}, [queryy]);

    useEffect(() => {
		setDiskonGlobalNominal1(diskonglobalnominal);
	}, [diskonglobalnominal]);

    // diskon bayangan
    useEffect(() => {
		setTotalDiskon(diskonglobalnominal1);
	}, [diskonglobalnominal1]);

    //diskon tampil
    useEffect(() => {
		setTotalDiskon1(totaldiskon - a);
	}, [totaldiskon, a]);


	//ongkir tampil
	useEffect(() => {
		setOngkir1(ongkir - b);
	}, [ongkir, b]);


    useEffect(() => {
		setTotalPrice1( totalPrice - ppnnew + totaldiskon1 + ongkir1 );
	}, [totalPrice, ppnnew,totaldiskon1, ongkir1]);


    // diskonglobalnominal dan persen
    useEffect(() => {
		diskonglobalnominal && diskonglobal === "diskonglobalnominal" && setDiskonGlobalPersen((diskonglobalnominal / totalPrice) * 100);
		diskonglobalpersen && diskonglobal === "diskonglobalpersen"  && setDiskonGlobalNominal(totalPrice * (diskonglobalpersen / 100));
	}, [diskonglobalnominal, totalPrice, diskonglobalpersen]);

    // hasil nominal dari PPN
    useEffect(() => {
        setPPNNEW(grandtotal * (ppn / 100));
   }, [grandtotal,ppn]);

    // hasil grandtotal
	useEffect(() => {
		setGrandTotal((totalPrice - totaldiskon1 + ongkir1 - a) );
	}, [totalPrice, totaldiskon1, ongkir1, a]);


	useEffect(() => {
        getById();
	}, [pajak]);

	const getById = () => {
		if(pajak >= 1){
			axios
				.get(
				`${process.env.REACT_APP_API_BASE_URL}/pajak/${pajak}`,
				{ headers }
				)
				.then((data) => {;
				setPPN(data.data.response.persentase);
				})
				.catch(function (error) {
				console.log(error);
				});
		  };
		}

      useEffect(() => {
        getById2();
	}, [customer]);

	const getById2 = () => {
		if(customer != ''){
			axios
			  .get(
				`${process.env.REACT_APP_API_BASE_URL}/customer/get/${customer}`,
				{ headers }
			  )
			  .then((data) => {
				setAlamatCustomer(data.data.response.address)
			  })
			  .catch(function (error) {
				console.log(error);
			  });
		}
	  }

	useEffect(() => {
		getPajak();
	}, []);

	const getPajak = (id) => {
		axios
			.get(`${process.env.REACT_APP_API_BASE_URL}/pajak/list`, { headers })
			.then((data) => {
				setAllPajak(data.data.response);
				// setPajak(id);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	// const getCustomer = () => {
	// 	const headers = {
	// 		"Content-Type": "application/json",
	// 		Authorization: `Bearer ${token}`,
	// 	};
	// 	axios
	// 		.get(`${process.env.REACT_APP_API_BASE_URL}/customer/list`, { headers })
	// 		.then((data) => {
	// 			setCustomers(data.data.response);
	// 		})
	// 		.catch(function (error) {
	// 			console.log(error);
	// 		});
	// };

	// const getBank = () => {
	// 	const headers = {
	// 		"Content-Type": "application/json",
	// 		Authorization: `Bearer ${token}`,
	// 	};
	// 	axios
	// 		.get(`${process.env.REACT_APP_API_BASE_URL}/bank/get-by-wh/${warehouse}`, { headers })
	// 		.then((data) => {
	// 			setBanks(data.data.response);
	// 		})
	// 		.catch(function (error) {
	// 			console.log(error);
	// 		});
	// };

	function numeric(string){
		return new Intl.NumberFormat().format(string.toString().replace(/\D/g,''))+ ',-';
	}
	const saveItem = (barcode) => {
		const diskonnominal = 0 ;
		const diskonpersen = 0 ;
		const qtyy = 1;
		if(barcode != ''){
			axios
				.get(
					`${process.env.REACT_APP_API_BASE_URL}/items-by-barcode?barcode=${barcode}&warehouse_id=${warehouse}&qty=${qtyy}
					`,{headers}
				)
				.then(async (response) => {
					let stateItem = [];
					await Promise.all(
						response.data.response.map(async (data) => {
							const find = savedItems.find((item) => item.item_id === data.id);
							if(find){
								setSavedItems(savedItems => {
									const newState = savedItems.map(obj => {
									  if (obj.item_id === data.id) {
										return {...obj, qty: obj.qty+1};
									  }
									  return obj;
									});
									return newState;
								});
							}else{
								stateItem = [
									{
										item_id: data.id,
										item_name: data.item_name,
										barcode: barcode,
										qty: qtyy,
										diskon_nominal : diskonnominal,
										diskon_persen:  diskonpersen,
										harga: data.harga
									},...savedItems
								];
								let stateEditing = [...editingItem, {
									editing: false
								}];
								setEditingitem(stateEditing);
								setSavedItems(stateItem);
								setBarcode("");
								inputBarcode.current.focus();
							}
						})
						);
					})
					.catch(error => {
						console.log(error);
					});
		}
	  }

	
	const searchh = (obj) => {
		setBarcode(obj.barcode);
		saveItem(obj.barcode);
		setIsSearchShoww(false);
		setQueryy("");
	}

	const searchShoww = (item) => {
		setItemIdd(item.id);
		setIsSearchShoww(false);
	};

	
	const handleSubmit = async (e) => {
		e.preventDefault();
		{
			saveItem(barcode);
			setBarcode("");
		}
	};

	const handleSubmitOngkir = async (e) => {
		e.preventDefault();
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
	
	const changePriceStatus = (index, status) => {
	  setEditingitem([
		  ...editingItem.slice(0, index),
		  Object.assign({}, editingItem[index], { editing: status }),
		  ...editingItem.slice(index + 1)
	  ]);
	}
	
	const changeItemDataTable = async (arg) => {
		setSavedItems([
			...savedItems.slice(0, arg.index),
			Object.assign({}, savedItems[arg.index], {
				data: {
					item_name: arg.itemName,
					qty:savedItems[arg.index].qty,
					harga: arg.harga,
					diskon_nominal: savedItems[arg.index].diskon_nominal,
					diskon_persen: savedItems[arg.index].diskon_persen,
				}
			}),
			...savedItems.slice(arg.index + 1)
		]);
 
		changePriceStatus(arg.index, false);
	}

	const formatRupiah = (money) => {
		return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(money);
	};

	function totalSemua(){
		var tot = 0;
		for (let i = 0; i < savedItems.length; i++) {
			tot += savedItems[i].qty*savedItems[i].harga;
		} 
		return tot;
	}

	function totalDiskon(){
		var tot = 0;
		for (let i = 0; i < savedItems.length; i++) {
			tot += savedItems[i].qty*savedItems[i].harga*savedItems[i].diskon_persen/100;
		} 
		return tot;
	}

	function totalPajak(){
		return totalSemua()*ppn/100;
	}

	function totalGrand(){
		var total = 0;
		total += totalSemua();
		total += totalPajak();
		total += parseInt(ongkir);
		total -= totalDiskon();
		return total;
	}

	return (
		<>
			<SimpleHeader name="Cashier" parentName="SO" />
			<Container className="mt--6" fluid>
				<Row>
					<div className="col">
						<Card className="bg-secondary shadow">
							<CardBody>
								<Row>
									<Col md={8}>
										<div className="row mb-2">
											<div className="col-md-6 d-flex align-items-center">
												<i className="fa fa-barcode mr-2"></i>
												<Box component="form" sx={{'& > :not(style)': { width: '100%' },}} noValidate autoComplete="off" onSubmit={handleSubmit} className="col px-0">
															<TextField id="bybarcode" className="col"
															label="Barcode" variant="outlined" autoFocus size="small" 
															value={barcode}
															ref={inputBarcode}
															onChange={(e) => {
																setBarcode(e.target.value);
															}}/>
												</Box>
											</div>
											<div className="col-md-6 d-flex align-items-center">
													<i className="fa fa-search mr-2"></i>
													
														<TextField id="byname" label="Cari dengan nama" variant="outlined" 
														className="col" size="small" 
														value={queryy}
														onChange={(e) => setQueryy(e.target.value)}/>
														{isSearchShoww && queryy && (
															<Card className="position-absolute boxShadow" style={{ top:"50px",maxHeight: "15.5rem", overflowY: "auto", paddingTop: "1rem", position: "relative" }}>
																<div style={{ position: "absolute", top: "2.5px", right: "1rem", cursor: "pointer", fontSize: "1rem" }}>
																	<i className="fas fa-window-close text-danger" onClick={() => setIsSearchShoww(false)}></i>
																</div>
																{allItemm?.response ? (
																	allItemm.response.map((item) => (
																		<CardBody key={item.id} style={{ minHeight: "5rem", padding: "1rem" }} className="bgSearch" onClick={() => searchShoww(item)}>
																			<div onClick={() => {
																				searchh(item);
																			}}>
																				<b>{item.item_name}</b> - {new Intl.NumberFormat().format(item.price)}
																			</div>
																		</CardBody>
																	))
																) : (
																	<div className="text-center mb-3 text-danger">Item "{queryy}" tidak ada bosku!</div>
																)}
															</Card>
														)}
											</div>
										</div>
										<div className="border border-primary rounded" style={{minHeight: 400, overflowY: 'scroll'}}>
										<Table>
											<thead>
												<tr>
													<th className="px-1">Nama Item</th>
													<th className="px-1">Qty</th>
													<th className="px-1">Diskon %</th>
													<th className="px-1">Diskon (N)</th>
													<th className="px-1">Sub Total</th>
													<th className="px-1">#</th>
												</tr>
											</thead>
												<tbody>
												{
													savedItems.map((savedItem, key) => {
														return (
															<tr key={key}>
																<td>{savedItem.item_name} <br></br>{formatRupiah(savedItem.harga)}</td>
																<td>
																	{editingItem[key].editing ? (
																			<Input
																			className="form-control-alternative"
																				placeholder="qty"
																				type="number"
																				value={savedItems[key].qty}
																				onChange={(e) => {
																					setSavedItems([
																						...savedItems.slice(0, key),
																						Object.assign({}, savedItems[key], { qty: e.target.value, totalPrice: savedItem.harga * e.target.value }),
																						...savedItems.slice(key + 1)
																					]);
																				}}
																			/>
																	) : (
																		<>{savedItem.qty}</>
																	)}
																</td>
																<td>
																	{editingItem[key].editing ? (
																		<Input
																		className="form-control-alternative"
																			placeholder="Diskon Persen"
																			type="number"
																			value={savedItems[key].diskon_persen}
																			onChange={(e) => {
																				setSavedItems([
																					...savedItems.slice(0, key),
																					Object.assign({}, savedItems[key], { diskon_persen: e.target.value, totalPrice: savedItem.harga * savedItem.qty / e.target.value}),
																					...savedItems.slice(key + 1)
																				]);
																			}}
																		/>
																	) : (
																		<>{savedItem.diskon_persen}</>
																	)}
																</td>
																<td>
																	{editingItem[key].editing ? (
																		<Input
																		className="form-control-alternative"
																			placeholder="Diskon nominal"
																			type="number"
																			value={savedItems[key].diskon_nominal}
																			onChange={(e) => {
																				setSavedItems([
																					...savedItems.slice(0, key),
																					Object.assign({}, savedItems[key], { diskon_nominal: e.target.value, totalPrice: savedItem.harga * savedItem.qty - e.target.value }),
																					...savedItems.slice(key + 1)
																				]);
																			}}
																		/>
																	) : (
																		<>{formatRupiah(savedItem.diskon_nominal)}</>
																	)}
																</td>
																<td>
																	{editingItem[key].editing ? (
																		<Input
																		className="form-control-alternative"
																			placeholder="Total"
																			type="number"
																			value={savedItems[key].totalPrice}
																			disabled
																		/>
																	) : (
																		<>{formatRupiah(savedItem.harga * savedItem.qty - savedItem.diskon_nominal)}</>
																	)}
																</td>
																<td>
																	{editingItem[key].editing ? (
																		<>
																			<Button className="btn-xs" color="warning" onClick={() => changeItemDataTable({
																				index: key,
																				itemName: savedItem.item_name,
																				qty: savedItem.qty,
																				harga : savedItem.harga,
																				diskon_nominal: savedItem.diskon_nominal,
																				diskon_persen: savedItem.diskon_persen,
																			})}><i className="fa fa-save"></i></Button>
																			<Button className="btn-xs" color="danger" onClick={() => {
																				setSavedItems([
																					...savedItems.slice(0, key),
																					Object.assign({}, savedItems[key], { 
																						itemName: savedItem.item_name,
																						harga: savedItem.harga,  
																						diskon_nominal: savedItem.diskon_nominal, 
																						diskon_persen: savedItem.diskon_persen,  
																						qty: savedItem.qty,}),
																					...savedItems.slice(key + 1)
																				]);

																				changePriceStatus(key, false);
																			}}><i className="fa fa-times"></i></Button>
																		</>
																	) : (
																		<>
																			<Button className="btn-xs" color="warning" onClick={() => changePriceStatus(key, true)}><i className="fa fa-edit"></i></Button>
																			<Button className="btn-xs" color="danger" onClick={() => deleteItem(savedItem.item_id)}><i className="fa fa-trash"></i></Button>
																		</>
																	)}
																</td>
															</tr>
														)
													})
												}
												</tbody>
										</Table>
										
										</div>
									</Col>
									<Col md={4}>
										<div className="card text-center p-2 mb-2">
											<div className="text-muted fs-10">Customer</div>
											<div className="d-flex">
												<div className="col">
												<Autocomplete
													id="asyc-customer"
													sx={{ width: '100%' }}
													size="small"
													open={open}
													onOpen={() => {
														setOpen(true);
													}}
													onClose={() => {
														setOpen(false);
													}}
													isOptionEqualToValue={(option, value) => option.name === value.id}
													getOptionLabel={(option) => option.name}
													options={options}
													loading={loading}
													onChange={(event, value) => {
														console.log(value);
														setCustomer(value.id);
													}}
													renderInput={(params) => (
														<TextField
														{...params}
														label="Customer"
														InputProps={{
															...params.InputProps,
															endAdornment: (
															<React.Fragment>
																{loading ? <CircularProgress color="inherit" size={20} /> : null}
																{params.InputProps.endAdornment}
															</React.Fragment>
															),
														}}
														/>
													)}
													/>
												</div>
												<Button
													onClick={() =>
														history.push({
															pathname: `/admin/customer/create`,
														})
													}
													className="btn-sm"
													color="info"
													type="button">
													<i className="fa fa-plus" />
												</Button>
											</div>
										</div>
										<hr className="my-3"/>
										<Box className="my-2">
											<FormControl fullWidth size="small">
												<InputLabel id="demo-simple-select-label">Pajak</InputLabel>
												<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												value={pajak}
												label="Pajak"
												onChange={(e) => {
													setPajak(e.target.value);
												}}
												>
													<MenuItem value={2}>NON PPN</MenuItem>
													<MenuItem value={1}>PPN</MenuItem>
												</Select>
											</FormControl>
										</Box>
										<Box className="my-2">
											<FormControl fullWidth size="small">
												<InputLabel id="paymtd">Jenis Transaksi</InputLabel>
												<Select
												labelId="paymtd"
												id="jenistrx"
												value={payment_method}
												onChange={(e) => {
													setPaymentMethod(e.target.value);
												}}
												label="Jenis Transaksi"
												>
													<MenuItem value={1}>Tunai</MenuItem>
													<MenuItem value={3}>Inden DP</MenuItem>
													<MenuItem value={4}>Inden Lunas</MenuItem>
												</Select>
											</FormControl>
										</Box>
										<Box className="my-2">
											<FormControl fullWidth size="small">
												<InputLabel id="pengiriman-sel">Pengiriman</InputLabel>
												<Select
												labelId="pengiriman-sel"
												id="pengiriman"
												value={pengiriman}
												onChange={(e) => {
													setPengiriman(e.target.value);
												}}
												label="Pengiriman"
												>
													<MenuItem value={1} onClick={()=>{setOngkir(0)}}>Ambil Sendiri</MenuItem>
													<MenuItem value={2}>Delivery</MenuItem>
													<MenuItem value={3}>Kurir</MenuItem>
												</Select>
											</FormControl>
										</Box>
										{ (pengiriman >= 2 ) ? 
											(
												<Box component="form" sx={{'& > :not(style)': { width: '100%' },}} noValidate autoComplete="off" onSubmit={handleSubmitOngkir}>
															<TextField id="ongkir" label="Ongkir" variant="outlined" 
															type='number'
															size="small" 
															value={ongkir}
															onChange={(e) => {
																setOngkir(e.target.value);
															}}/>
													</Box>
											) : (<></>)
										}
										<div className="d-flex justify-content-between">
											<div className="fs-12">Sub Total</div>
											<div className="fs-12 fw-bold">Rp. {numeric(totalSemua())}</div>
										</div>
										<div className="d-flex justify-content-between">
											<div className="fs-12">Diskon</div>
											<div className="fs-12 fw-bold">Rp. {numeric(totalDiskon())}</div>
										</div>
										<div className="d-flex justify-content-between">
											<div className="fs-12">Pajak PPN</div>
											<div className="fs-12 fw-bold">Rp. {numeric(totalPajak())}</div>
										</div>
										<div className="d-flex justify-content-between">
											<div className="fs-12">Ongkir</div>
											<div className="fs-12 fw-bold">Rp. {numeric(ongkir)}</div>
										</div>
										<div className="bg-light p-2 rounded">
											<div className="text-center fs-10">Grand Total</div>
											<div className="d-flex justify-content-between">
												<div className="h1">Rp.</div>
												<div className="h1">{numeric(totalGrand())}</div>
											</div>
										</div>
										<div className="d-flex justify-content-between my-1">
											<Link className="btn btn-danger" to="/admin/kasir-sales-order/detail">
												Closing Cashsier
											</Link>
											<Button
												className="col"
												color="primary" 
												onClick={() => setIsOpen(!isOpen)}>
													Bayar
											</Button>
										</div>
										<hr className="my-3"/>
									</Col>
								</Row>
							</CardBody>
						</Card>
					</div>
				</Row>
			</Container>
			{/* modal pembayaran */}
			<Modal toggle={() => setIsOpen(!isOpen)} isOpen={isOpen} fade={false} style={{ minWidth: "70%", top: "-20%" }}>
				<ModalHeader toggle={() => setIsOpen(!isOpen)}>Metode Pembayaran</ModalHeader>
				<ModalBody
					cssModule={{
						alignText: "center",
					}}>
					<div className="container">
						<div className="row align-items-center mb-3">
							<div className="col-3">Nominal Pembayaran 1</div>
							<div className="col-1 text-center">:</div>
							<div className="col-4 text-center">
								<Input className="form-control-alternative"
									type="number"
									value={pay1}
									placeholder="Masukan Nomminal Pembayaran"
									onChange={(event) => {
										console.log(parseInt(change) - parseInt(event.target.value));
										setChange(parseInt(change) - parseInt(event.target.value));
										setPay1(event.target.value);
									}}></Input>
							</div>
							<div className="col-4 text-center">
								<Input className="form-control-alternative"
									name="Tipe Po"
									type="select"
									placeholder="Metode Pembayaran 1"
									value={payment_method1}
									onChange={(e) => {
										setPaymentMethod1(e.target.value);
									}}>
									<option value="">Pilih Metode Pembayaran</option>
									{banks.map((bank, key) => {
										return (
											<option key={key} value={bank.id}>
												{bank.bank_name}
											</option>
										);
									})}
								</Input>
							</div>
						</div>
						<div className="row align-items-center mb-3">
							<div className="col-3">Keterangan 1</div>
							<div className="col-1 text-center">:</div>
							<div className="col-4 text-center">
								<Input className="form-control-alternative"
									name="Tipe Po"
									type="text"
									placeholder="Keterangan 2"
									value={keterangan1}
									onChange={(e) => {
										setKeterangan1(e.target.value);
									}}></Input>
							</div>
						</div>
						<div className="row align-items-center mb-3">
							<div className="col-3">Nominal Pembayaran 2</div>
							<div className="col-1 text-center">:</div>
							<div className="col-4 text-center">
								<Input className="form-control-alternative" type="number" value={pay2} onChange={(event) => setPay2(event.target.value)} placeholder="Masukan Nomminal Pembayaran"></Input>
							</div>
							<div className="col-4 text-center">
								<Input className="form-control-alternative"
									name="Tipe Po"
									type="select"
									placeholder="Metode Pembayaran 2"
									value={payment_method2}
									onChange={(e) => {
										setPaymentMethod2(e.target.value);
									}}>
									<option value="">Pilih Metode Pembayaran</option>
									{banks.map((bank, key) => {
										return (
											<option key={key} value={bank.id}>
												{bank.bank_name}
											</option>
										);
									})}
								</Input>
							</div>
						</div>
						<div className="row align-items-center mb-3">
							<div className="col-3">Keterangan 2</div>
							<div className="col-1 text-center">:</div>
							<div className="col-4 text-center">
								<Input className="form-control-alternative"
									name="Tipe Po"
									type="text"
									placeholder="Keterangan 2"
									value={keterangan2}
									onChange={(e) => {
										setKeterangan2(e.target.value);
									}}></Input>
							</div>
						</div>
						<div className="row align-items-center mb-3">
							<div className="col-3 text-start  display-1">Total</div>
							<div className="col-1 text-center">:</div>
							<div className="col-6 text-center">
								<textarea
									className="form-control"
									disabled
									value={"Rp." + numeric(grandtotal)}
									style={{
										fontSize: 40,
										paddingTop: 20,
										top: "50%",
										height: 95,
                                        fontWeight: 'bold',
										resize: "none",
									}}></textarea>
							</div>
						</div>
						<div className="row align-items-center mb-3">
							<div className="col-3  display-3">Kembali</div>
							<div className="col-1 text-center">:</div>
							<div className="col-6 text-center">
								<textarea
									className="form-control"
									disabled
									value={"Rp." + numeric(-1 * parseInt(grandtotal) + parseInt(pay1) + parseInt(pay2))}
									style={{
										fontSize: 40,
										paddingTop: 20,
                                        fontWeight: 'bold',
										top: "50%",
										height: 95,
										resize: "none",
									}}></textarea>
							</div>
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
					{/* <Button
					color="primary"
					outline
					onClick={() => receipt()}
					>
						Cetak Kasir
					</Button> */}
					<Button
						color="danger"
						outline
						disabled={parseInt(pay1) + parseInt(pay2) < 10}
						onClick={() => {
							if (-1 * parseInt(grandtotal) + parseInt(pay1) + parseInt(pay2) < -100000000) {
								alert("Nominal Belum Mencukupi");
							} else {
								let dataItems = [];
								savedItems.map(
									(dataItem) =>
										(dataItems = [
											...dataItems,
											{
												item_id: dataItem.item_id,
												qty: dataItem.qty,
												harga: dataItem.harga,
												diskon_nominal : dataItem.diskon_nominal,
												diskon_persen : dataItem.diskon_persen
											},
										])
								);
								let data = {
									warehouse_id: parseInt(warehouse),
									username: username,
									code_rfq: "",
									customer_id: parseInt(customer),
									diskon_global_nominal : parseFloat(diskonglobalnominal),
									diskon_global_persen : parseInt(diskonglobalpersen),
									sales : sales,
									ongkir : parseInt(ongkir),
									pajak_id: 1,
									manual_address: alamatlain,
									pengiriman: parseInt(pengiriman),
									payment_method: parseInt(payment_method),
									jangka_waktu: "",
									keterangan: "",
									pay_1: parseInt(pay1),
									payment_method1: parseInt(payment_method1),
									keterangan1: keterangan1,
									pay_2: parseInt(pay2),
									payment_method2: parseInt(payment_method2),
									keterangan2: keterangan2,
									pay_3: 0,
									payment_method3: 1,
									keterangan3: "0",
									pay_4: 0,
									payment_method4: 1,
									keterangan4: "0",
									pay_5: 0,
									payment_method5: 1,
									keterangan5: "0",
									pay_6: 0,
									payment_method6: 1,
									keterangan6: "0",
									items: dataItems,
								};
								axios
									.post(`${process.env.REACT_APP_API_BASE_URL}/sales-order/cashier/save`, data, {
										headers: {
											Authorization: `Bearer ${token}`,
										},
									})
									.then(function (response) {
                                       
										window.location.reload("/admin/kasir-sales-order/so-kasir");
										// window.open('/cetak/kasir-sales-order/cetak', '_blank');
										
                                        // window.open("/cetak/sales-order/cetak");
									})
									.then((json) => {
										setLoading(false);
									})
									.catch(function (error) {
										console.log(error);
									});
							}
						}}>
						Konfirmasi Pembayaran
					</Button>{" "}
					<Button onClick={() => setIsOpen(!isOpen)}>Cancel</Button>
				</ModalFooter>
			</Modal>
		</>
	);
}
