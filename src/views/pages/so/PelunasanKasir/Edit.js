/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { Card, CardBody, Row, Col, Input, Container,Collapse,CardFooter,InputGroupText,FormGroup, Form, Table, Button,InputGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function EditPelunasan(props) {
	const token = localStorage.token;
	const warehouse = localStorage.warehouse;
	const username = localStorage.username;
	const name = localStorage.name;

	let history = useHistory();
	const [isOpen, setIsOpen] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);
	const redirectPrefix1 = `/cetak/invoice-so/cetak/`;
	const [barcode, setBarcode] = useState("");
	const [pengiriman, setPengiriman] = useState([]);
	const [customers, setCustomers] = useState([]);
	const [customer, setCustomer] = useState("");
	const [savedItems, setSavedItems] = useState([]);
	const [isShow, setIsShow] = useState(false);
	const [active, setActive] = useState(0);
	const [filtered, setFiltered] = useState([]);
	const [qty, setQty] = useState(1);
	const [payment_method, setPaymentMethod] = useState([]);
	const [change, setChange] = useState(0);
	const [banks, setBanks] = useState([]);
    const [banks1, setBanks1] = useState([]);
    const [banks2, setBanks2] = useState([]);
    const [banks3, setBanks3] = useState([]);
    const [banks4, setBanks4] = useState([]);
    const [banks5, setBanks5] = useState([]);
    const [banks6, setBanks6] = useState([]);
	const [jenisTransaksi, setJenisTransaksi] = useState("");
	// const [allpajak, setAllPajak] = useState([]);
	// const [allpajak1, setAllPajak1] = useState([]);
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
	const [allpajak, setAllPajak] = useState([]);
	const [pajak, setPajak] = useState("");
	const [sales, setSales] = useState("");
	const [itemId, setItemId] = useState("");
	const [allItem, setAllItem] = useState([]);
	const [query, setQuery] = useState("");
	const [isSearchShow, setIsSearchShow] = useState(false);
	const [itemIdd, setItemIdd] = useState("");
	const [allItemm, setAllItemm] = useState([]);
	const [queryy, setQueryy] = useState("");
	const [isSearchShoww, setIsSearchShoww] = useState(false);
	const [ppnnew, setPPNNEW] = useState(0);
	const [diskonglobal, setDiskonGLobal] = useState(0);
    const [totalPrice1, setTotalPrice1] = useState(0);
	const headers = { Authorization: `Bearer ${token}` };
    const [diskonglobalnominal1,setDiskonGlobalNominal1] = useState(0)
    const [a, setA] = useState(0);
    const [pay1, setPay1] = useState(0)
    const [pay2, setPay2] = useState(0)
    const [pay3, setPay3] = useState(0)
    const [pay4, setPay4] = useState(0)
    const [pay5, setPay5] = useState(0)
    const [pay6, setPay6] = useState(0)
    const [payment_method1, setPaymentMethod1] = useState("");
    const [payment_method2, setPaymentMethod2] = useState("");
    const [payment_method3, setPaymentMethod3] = useState("");
    const [payment_method4, setPaymentMethod4] = useState("");
    const [payment_method5, setPaymentMethod5] = useState("");
    const [payment_method6, setPaymentMethod6] = useState("");
    const [keterangan1, setKeterangan1] = useState("");
    const [keterangan2, setKeterangan2] = useState("");
    const [keterangan3, setKeterangan3] = useState("");
    const [keterangan4, setKeterangan4] = useState("");
    const [keterangan5, setKeterangan5] = useState("");
    const [keterangan6, setKeterangan6] = useState("");

   
    const [isOpen1, setIsOpen1] = useState(false);
    const toggleOpen1 = () => setIsOpen1(!isOpen1);
    const [isOpen2, setIsOpen2] = useState(false);
    const toggleOpen2 = () => setIsOpen2(!isOpen2);
    const [isOpen3, setIsOpen3] = useState(false);
    const toggleOpen3 = () => setIsOpen3(!isOpen3);
    const [isOpen4, setIsOpen4] = useState(false);
    const toggleOpen4 = () => setIsOpen4(!isOpen4);
    const [isOpen5, setIsOpen5] = useState(false);
    const toggleOpen5 = () => setIsOpen5(!isOpen5);
    const [isOpen6, setIsOpen6] = useState(false);
    const toggleOpen6 = () => setIsOpen6(!isOpen6);

    function EditData() {
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
                pajak_id: parseInt(pajak),
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
                pay_3: parseInt(pay3),
                payment_method3: parseInt(payment_method3),
                keterangan3: keterangan3,
                pay_4: parseInt(pay4),
                payment_method4: parseInt(payment_method4),
                keterangan4: keterangan4,
                pay_5: parseInt(pay5),
                payment_method5: parseInt(payment_method5),
                keterangan5: keterangan5,
                pay_6: parseInt(pay6),
                payment_method6: parseInt(payment_method6),
                keterangan6: keterangan6,
                items: dataItems,
            };
            axios
                .post(`${process.env.REACT_APP_API_BASE_URL}/cicilan/cashier/update/${props.match.params.id}`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(function (response) {
                    history.push("/admin/pelunasan");
                })
                .then((json) => {
                    setLoading(false);
                })
                .catch(function (error) {
                    console.log(error);
                });
      }


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
		setOngkir1(ongkir - a);
	}, [ongkir, a]);


    useEffect(() => {
		setTotalPrice1( totalPrice - ppnnew + totaldiskon1 );
	}, [totalPrice, ppnnew]);


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
		setGrandTotal((totalPrice - totaldiskon1 + ongkir1 -a) );
	}, [totalPrice, totaldiskon1, ongkir1]);


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
            `${process.env.REACT_APP_API_BASE_URL}/sales-order/get-cashier/${props.match.params.id}`,
            { headers }
          )
          .then((data) => {
            console.log(data);
            getCustomer(data.data.response.customer_id);
            getPajak(data.data.response.pajak_id);
            setPaymentMethod(data.data.response.payment_method);
            setTotalPrice(data.data.response.price_total);
            setAlamatLain(data.data.response.manual_address);
            setOngkir(data.data.response.ongkir);
            setSales(data.data.response.sales);
            setTotalPrice(data.data.response.price_total);
            setPengiriman(data.data.response.pengiriman);
            setDiskonGlobalNominal(data.data.response.diskon_global_nominal);
            setDiskonGlobalPersen(data.data.response.diskon_global_persen);
            setPay1(data.data.response.pay_1);
            setPay2(data.data.response.pay_2);
            setPay3(data.data.response.pay_3);
            setPay4(data.data.response.pay_4);
            setPay5(data.data.response.pay_5);
            setPay6(data.data.response.pay_6);
            getBank(data.data.response.payment_method1);
            getBank1(data.data.response.payment_method2);
            getBank2(data.data.response.payment_method3);
            getBank3(data.data.response.payment_method4);
            getBank4(data.data.response.payment_method5);
            getBank5(data.data.response.payment_method6);
            setKeterangan1(data.data.response.keterangan1);
            setKeterangan2(data.data.response.keterangan2);
            setKeterangan3(data.data.response.keterangan3);
            setKeterangan4(data.data.response.keterangan4);
            setKeterangan5(data.data.response.keterangan5);
            setKeterangan6(data.data.response.keterangan6);
            getItemDataSaved();
           
          })
          .catch(function (error) {
            console.log(error);
          });
      };

      const getPajak = (id) => {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `bearer ${token}`,
		};
		axios
			.get(`${process.env.REACT_APP_API_BASE_URL}/pajak/list`, { headers })
			.then((data) => {
				setAllPajak(data.data.response);
				setPajak(id);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const getCustomer = (id) => {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		};
		axios
			.get(`${process.env.REACT_APP_API_BASE_URL}/customer/list`, { headers })
			.then((data) => {
				setCustomers(data.data.response);
                setCustomer(id);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

    const getItemDataSaved = () => {
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/sales-order/item`, {
    
            so_id: props.match.params.id
    
        }).then(async response => {
            let stateItem = [];
            let stateEditing=[];
            await Promise.all(response.data.response.map(async (data) => {
                stateItem = [...stateItem, {
                    item_id: data.item_id,
                    item_name:data.item_name,
                    qty: data.qty,
                    harga: data.harga,
                    diskon_persen: data.diskon_persen,
                    diskon_nominal: data.diskon_nominal,
                    data: {
                        item_name: data.item_name,
                        harga: data.harga,
                        diskon_persen: data.diskon_persen,
                      diskon_nominal: data.diskon_nominal,
                      qty: data.qty,
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


      useEffect(() => {
        getById2();
	}, [customer]);

	const getById2 = () => {
	    const headers = {
	      "Content-Type": "application/json",
	      Authorization: `Bearer ${token}`,
	    };
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
	  };
	
	const getBank = (id) => {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		};
		axios
			.get(`${process.env.REACT_APP_API_BASE_URL}/bank/get-by-wh/${warehouse}`, { headers })
			.then((data) => {
				setBanks(data.data.response);
                setPaymentMethod1(id);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

    const getBank1 = (id) => {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		};
		axios
			.get(`${process.env.REACT_APP_API_BASE_URL}/bank/get-by-wh/${warehouse}`, { headers })
			.then((data) => {
				setBanks1(data.data.response);
                setPaymentMethod2(id);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

    const getBank2 = (id) => {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		};
		axios
			.get(`${process.env.REACT_APP_API_BASE_URL}/bank/get-by-wh/${warehouse}`, { headers })
			.then((data) => {
				setBanks2(data.data.response);
                setPaymentMethod3(id);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

    const getBank3 = (id) => {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		};
		axios
			.get(`${process.env.REACT_APP_API_BASE_URL}/bank/get-by-wh/${warehouse}`, { headers })
			.then((data) => {
				setBanks3(data.data.response);
                setPaymentMethod4(id);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

    const getBank4 = (id) => {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		};
		axios
			.get(`${process.env.REACT_APP_API_BASE_URL}/bank/get-by-wh/${warehouse}`, { headers })
			.then((data) => {
				setBanks4(data.data.response);
                setPaymentMethod5(id);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

    const getBank5 = (id) => {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		};
		axios
			.get(`${process.env.REACT_APP_API_BASE_URL}/bank/get-by-wh/${warehouse}`, { headers })
			.then((data) => {
				setBanks5(data.data.response);
                setPaymentMethod6(id);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

    useEffect(() => {
        getById3();
	}, [pajak]);

	const getById3 = () => {
	    const headers = {
	      "Content-Type": "application/json",
	      Authorization: `Bearer ${token}`,
	    };
	    axios
	      .get(
	        `${process.env.REACT_APP_API_BASE_URL}/pajak/${pajak}`,
	        { headers }
	      )
	      .then((data) => {
	        // setQuery(data.data.response.keterangan);
	        setPPN(data.data.response.persentase);
	      })
	      .catch(function (error) {
	        console.log(error);
	      });
	  };

	  useEffect(() => {
        saveItem1();
	}, [itemIdd]);
	
	const saveItem1 = () => {
			const diskonnominal = 0 ;
			const diskonpersen = 0 ;
			const qtyy = 1;
			const headers = {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			};
			axios
				.get(
					`${process.env.REACT_APP_API_BASE_URL}/items-by-price?item_id=${itemIdd}&qty=${qtyy}
	                `,
					{ headers }
				)
				.then(async (response) => {
					let stateItem = [];
					await Promise.all(
						response.data.response.map(async (data) => {
							stateItem = [
								...savedItems,
								{
									item_id: itemIdd,
									item_name: data.item_name,
									barcode: data.barcode,
									qty: qtyy,
									diskon_nominal : diskonnominal,
									diskon_persen:  diskonpersen,
									harga: data.harga,
									data: {
										item_name: data.item_name,
										harga: data.harga,
                                        barcode: data.barcode,
										diskon_nominal : diskonnominal,
										diskon_persen: diskonpersen,
										qty: qtyy,
									},
								},
							];
							let stateEditing = [...editingItem, {
								editing: false
							}];
							setEditingitem(stateEditing);
							setTotalPrice(totalPrice + data.harga * qty - data.diskon_nominal);
							setSavedItems(stateItem);
						})
					);
				});
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		{
			saveItem();
			setBarcode("");
			saveItem1();
			setQueryy("");
			setIsSearchShoww("");
		}
	};

	const deleteItem = (id) => {
		let array = [...savedItems];
	
		let index = array.findIndex(object => {
			return object.item_id === id;
		});
	
		if (index !== -1) {
			setTotalPrice(totalPrice - array[index].harga * array[index].qty - array[index].diskon_nominal);
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
		setTotalPrice(totalPrice + arg.harga * savedItems[arg.index].qty - savedItems[arg.index].diskon_nominal);
	
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

	return (
		<>
			<SimpleHeader name="Pelunasan" parentName="SO" />
			<Container className="mt--6" fluid>
				<Row>
					<div className="col">
						<Card className="bg-secondary shadow">
							<CardBody>
								<Row>
									<Col xs={6} className="mb-3">
										<textarea
											className="form-control"
											disabled
											style={{
												fontWeight: 'bold',
												fontSize: 50,
												paddingTop: 20,
												top: "50%",
												height: 117,
												resize: "none",
											}}
											value={"Rp." + grandtotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + ",-"}></textarea>
									</Col>
									<Col xs={3}>
										<Label>
											{/* <b>SHIFT : "{name}"</b> */}
										</Label>
									</Col>
									<Col xs={3} className="mb-3">
										<Button
											style={{
												fontSize: 40,
												paddingTop: 10,
												height: 80,
												resize: "none",
												}}  
											block 
											color="primary" 
											onClick={() => setIsOpen(!isOpen)}>
												PELUNASAN
										</Button>
									</Col>
								</Row>
									<Row className="mb-3">
										<Col xs={3}>
											<Input
                                            disabled
                                                
                                                autoComplete="off"
												name="customer"
												placeholder="Masukan Nama Sales"
												type="text"
												value={sales}
												onChange={(e) => {
													setSales(e.target.value);
												}} 
											/>
										</Col>
                                        <Col xs={3}>
                                            <Input
                                            disabled 
                                            autoComplete="off" 
                                                name="customer"
                                                type="select"
                                                value={customer}
                                                onChange={(e) => {
                                                    setCustomer(e.target.value);
                                                }}>
                                                <option value="" disabled selected hidden>Pilih Customer</option>
                                                {customers.map((customer, key) => {
                                                    return (
                                                        <option key={key} value={customer.id}>
                                                            {customer.name}
                                                        </option>
                                                    );
                                                })}
                                            </Input>
                                        </Col>
                                        <Col xs={3}>
                                            <Input
                                            disabled 
                                                autoComplete="off"
                                                placeholder="Masukan Alamat Customer"
                                                name="Tipe Request"
                                                type="text"
                                                value={alamatcustomer}
                                                onChange={(e) => {
                                                    setAlamatCustomer(e.target.value);
                                                }}
                                                />
                                        </Col>
                                        <Col xs={3}>
                                            <Input
                                            disabled
                                                autoComplete="off"
                                                name="customer"
                                                placeholder="Masukan Alamat Kirim "
                                                type="text"
                                                value={alamatlain}
                                                onChange={(e) => {
                                                    setAlamatLain(e.target.value);
                                                }}
                                            />
                                        </Col>
									</Row>
								<Row className="mb-3">
									
									
								</Row>
								<Row className="mb-3">
									<Col xs={1}>
									<InputGroup>
											<InputGroupText>
											 %
											</InputGroupText>
										<Input
                                        disabled
                                        	autoComplete="off" 
											name="customer"
											placeholder="Masukan Diskon (%)"
											type="text"
											value={diskonglobalpersen}
											onChange={(e) => {
												setDiskonGlobalPersen(e.target.value);
											}} 
											onClick={() => setDiskonGLobal("diskonglobalpersen")} 
										/>
										</InputGroup>
									</Col>
									<Col xs={2}>
										<InputGroup>
											<InputGroupText>
											Rp
											</InputGroupText>
											<Input
                                            disabled 
												autoComplete="off" 
												name="customer"
												placeholder="Masukan Diskon (N)"
												type="text"
												value={diskonglobalnominal}
												onChange={(e) => {
													setDiskonGlobalNominal(e.target.value);
												}}
												onClick={() => setDiskonGLobal("diskonglobalnominal")} 
											/>
										</InputGroup>
									</Col>
									<Col xs={3}>
                                    <Input
                                    disabled 
                                    autoComplete="off" 
											// className="form-control-alternative"
											name="customer"
											type="select"
											value={pajak}
											onChange={(e) => {
												setPajak(e.target.value);
											}}>
											<option value="" disabled selected hidden>Pilih PPN</option>
											{allpajak.map((customer, key) => {
												return (
													<option key={key} value={customer.id}>
														{customer.keterangan}
													</option>
												);
											})}
										</Input>
									</Col>
								</Row>
								<Row className="mb-3">
										<Col xs={3}>
											<Input
                                            disabled 
                                            autoComplete="off" 
												// className="form-control-alternative"
												name="Tipe Po"
												type="select"
												value={payment_method}
												onChange={(e) => {
													setPaymentMethod(e.target.value);
												}}>
												<option value="" selected disabled hidden>Jenis Transaksi</option>
												<option value={1} >
													Tunai
												</option>
												<option value={3} >
													Inden DP
												</option>
												<option value={4} >
													Inden Lunas
												</option>
											</Input>
										</Col>
										<Col xs={3}>
											<Input
                                            disabled 
                                                autoComplete="off" 
												// className="form-control-alternative"
												name="Tipe Request"
												type="select"
												value={pengiriman}
												onChange={(e) => {
													setPengiriman(e.target.value);
												}}>
												<option value="" selected disabled hidden>Pilih Pengiriman</option>
												<option value={1}>Ambil Sendiri</option>
												<option value={2} onClick={() => setJenisTransaksi(2)}>
													Delivery
												</option>
												<option value={3}>Kurir</option>
											</Input>
										</Col>
										<Col xs={3}>
										<InputGroup>
											<InputGroupText >
											 Ongkir
											</InputGroupText>
											<Input
                                                disabled 
												autoComplete="off" 
												name="Tipe Request"
												type="number"
												value={ongkir}
												onChange={(e) => {
													setOngkir(e.target.value);
												}} />
											</InputGroup>
										</Col>
								</Row>
								<br></br>
								<br></br>
								<br></br>
								<Table>
									<thead>
										<tr>
											<th>Nama Item</th>
											<th>Harga</th>
											<th>Qty</th>
											<th>Diskon %</th>
											<th>Diskon (N)</th>
											<th>Sub Total</th>
											{/* <th></th> */}
										</tr>
									</thead>
										<tbody>
										{
											savedItems.map((savedItem, key) => {
												return (
													<tr key={key}>
														<td>{savedItem.data.item_name}</td>
														<td>{formatRupiah(savedItem.data.harga)}</td>
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
																				Object.assign({}, savedItems[key], { qty: e.target.value, totalPrice: savedItem.data.harga * e.target.value }),
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
																			Object.assign({}, savedItems[key], { diskon_persen: e.target.value, totalPrice: savedItem.data.harga * savedItem.qty / e.target.value}),
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
																			Object.assign({}, savedItems[key], { diskon_nominal: e.target.value, totalPrice: savedItem.data.harga * savedItem.qty - e.target.value }),
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
																<>{formatRupiah(savedItem.data.harga * savedItem.qty - savedItem.diskon_nominal)}</>
                                                            )}
														</td>
														<td>
															{editingItem[key].editing ? (
																<>
																	<Button color="warning" onClick={() => changeItemDataTable({
																		index: key,
																		itemName: savedItem.data.item_name,
																		qty: savedItem.data.qty,
																		harga : savedItem.data.harga,
																		diskon_nominal: savedItem.data.diskon_nominal,
																		diskon_persen: savedItem.data.diskon_persen,
																	})}>Update</Button>
																	<Button color="danger" onClick={() => {
																		setSavedItems([
																			...savedItems.slice(0, key),
																			Object.assign({}, savedItems[key], { 
																				itemName: savedItem.data.item_name,
																				harga: savedItem.data.harga,  
																				diskon_nominal: savedItem.data.diskon_nominal, 
																				diskon_persen: savedItem.data.diskon_persen,  
																				qty: savedItem.data.qty,}),
																			...savedItems.slice(key + 1)
																		]);

																		changePriceStatus(key, false);
																	}}>Cancel</Button>
																</>
															) : (
                                                                <>
                                                                    {/* <Button color="warning" onClick={() => changePriceStatus(key, true)}>Edit</Button> */}
                                                                    {/* <Button color="danger" onClick={() => deleteItem(savedItem.item_id)}>Delete</Button> */}
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
							<CardFooter >
								<Row md="12">
									<Col md="4">
									</Col>
									<Col md="4">
										<FormGroup row>
										<Label
											for="exampleEmail"
											sm={4}
											size="small"
										>
											<b>Total</b>
										</Label>
										<Col sm={6}>
										<Input
										className="form-control-alternative"
											disabled
											style={{fontWeight: 'bold'}}
											type="text"
											name="barcode"
											placeholder="Harga Total"
											// value={totalPrice1}
											value={"Rp." + totalPrice1.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + ",-"}
											/>
										</Col>
										</FormGroup>
										<FormGroup row>
										<Label
											for="exampleEmail"
											sm={4}
										>
											<b>Total Diskon</b>
										</Label>
										<Col sm={6}>
										<Input
											className="form-control-alternative"
											style={{fontWeight: 'bold'}}
											disabled
											type="text"
											name="barcode"
											placeholder="Total Diskon"
											value={"Rp." + totaldiskon1.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + ",-"}
											/>
										</Col>
										</FormGroup>
										<FormGroup row>
										<Label
											for="exampleEmail"
											sm={4}
										>
											<b>PPN</b>
										</Label>
										<Col sm={6}>
										<Input
											className="form-control-alternative"
											disabled
											style={{fontWeight: 'bold'}}
											type="text"
											name="barcode"
											placeholder="PPN"
											value={"Rp." + ppnnew.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + ",-"}
											/>
										</Col>
										</FormGroup>
										<FormGroup row>
										<Label
											for="exampleEmail"
											sm={4}
										>
											<b>Grand Total</b>
										</Label>
										<Col sm={6}>
										<Input
										className="form-control-alternative"
											disabled
											type="text"
											name="barcode"
											style={{fontWeight: 'bold'}}
											placeholder="Grand Total"
											value={"Rp." + grandtotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + ",-"}
											/>
										</Col>
										</FormGroup>
									</Col>
									<Col md="4">
									</Col>
								</Row>
								</CardFooter>
						</Card>
					</div>
				</Row>
			</Container>
			{/* modal pembayaran */}
			<Modal toggle={() => setIsOpen(!isOpen)} isOpen={isOpen} fade={false} style={{ minWidth: "70%", top: "-20%" }}>
				<ModalHeader toggle={() => setIsOpen(!isOpen)}>Pecah Bayar</ModalHeader>
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
							<div className="col-3">
                                <h3 onClick={toggleOpen1}>
                                    {isOpen1 === true ? (
                                    // <Button color="primary" ><i className="fa fa-minus danger " aria-hidden="true"></i></Button>
                                    <Button color="primary" ><i className="fa fa-minus danger " aria-hidden="true"></i></Button>
                                    ) : (
                                    <Button color="primary" ><i className="fa fa-plus danger " aria-hidden="true"></i></Button>
                                    )}
                                </h3>
                            </div>
						</div>
                        <Collapse isOpen={isOpen1}>
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
									{banks1.map((bank, key) => {
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
							<div className="col-3">
                                <h3 onClick={toggleOpen2}>
                                    {isOpen2 === true ? (
                                    <Button color="primary" ><i className="fa fa-minus danger " aria-hidden="true"></i></Button>
                                    ) : (
                                    <Button color="primary" ><i className="fa fa-plus danger " aria-hidden="true"></i></Button>
                                    )}
                                </h3>
                            </div>
						</div>
                        </Collapse>
                        <Collapse isOpen={isOpen2}>
                        <div className="row align-items-center mb-3">
							<div className="col-3">Nominal Pembayaran 3</div>
							<div className="col-1 text-center">:</div>
							<div className="col-4 text-center">
								<Input className="form-control-alternative" type="number" value={pay3} onChange={(event) => setPay3(event.target.value)} placeholder="Masukan Nomminal Pembayaran"></Input>
							</div>
							<div className="col-4 text-center">
								<Input className="form-control-alternative"
									name="Tipe Po"
									type="select"
									placeholder="Metode Pembayaran 3"
									value={payment_method3}
									onChange={(e) => {
										setPaymentMethod3(e.target.value);
									}}>
									<option value="">Pilih Metode Pembayaran</option>
									{banks2.map((bank, key) => {
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
							<div className="col-3">Keterangan 3</div>
							<div className="col-1 text-center">:</div>
							<div className="col-4 text-center">
								<Input className="form-control-alternative"
									name="Tipe Po"
									type="text"
									placeholder="Keterangan 3"
									value={keterangan3}
									onChange={(e) => {
										setKeterangan3(e.target.value);
									}}></Input>
							</div>
						</div>
                        <div className="row align-items-center mb-3">
							<div className="col-3">
                                <h3 onClick={toggleOpen3}>
                                    {isOpen3 === true ? (
                                    <Button color="primary" ><i className="fa fa-minus danger " aria-hidden="true"></i></Button>
                                    ) : (
                                    <Button color="primary" ><i className="fa fa-plus danger " aria-hidden="true"></i></Button>
                                    )}
                                </h3>
                            </div>
						</div>
                        </Collapse>
                        <Collapse isOpen={isOpen3}>
                        <div className="row align-items-center mb-3">
							<div className="col-3">Nominal Pembayaran 4</div>
							<div className="col-1 text-center">:</div>
							<div className="col-4 text-center">
								<Input className="form-control-alternative" type="number" value={pay4} onChange={(event) => setPay4(event.target.value)} placeholder="Masukan Nomminal Pembayaran"></Input>
							</div>
							<div className="col-4 text-center">
								<Input className="form-control-alternative"
									name="Tipe Po"
									type="select"
									placeholder="Metode Pembayaran 4"
									value={payment_method4}
									onChange={(e) => {
										setPaymentMethod4(e.target.value);
									}}>
									<option value="">Pilih Metode Pembayaran</option>
									{banks3.map((bank, key) => {
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
							<div className="col-3">Keterangan 4</div>
							<div className="col-1 text-center">:</div>
							<div className="col-4 text-center">
								<Input className="form-control-alternative"
									name="Tipe Po"
									type="text"
									placeholder="Keterangan 4"
									value={keterangan4}
									onChange={(e) => {
										setKeterangan4(e.target.value);
									}}></Input>
							</div>
						</div>
                        <div className="row align-items-center mb-3">
							<div className="col-3">
                                <h3 onClick={toggleOpen4}>
                                    {isOpen4 === true ? (
                                    <Button color="primary" ><i className="fa fa-minus danger " aria-hidden="true"></i></Button>
                                    ) : (
                                    <Button color="primary" ><i className="fa fa-plus danger " aria-hidden="true"></i></Button>
                                    )}
                                </h3>
                            </div>
						</div>
                        </Collapse>
                        <Collapse isOpen={isOpen4}>
                        <div className="row align-items-center mb-3">
							<div className="col-3">Nominal Pembayaran 5</div>
							<div className="col-1 text-center">:</div>
							<div className="col-4 text-center">
								<Input className="form-control-alternative" type="number" value={pay5} onChange={(event) => setPay5(event.target.value)} placeholder="Masukan Nomminal Pembayaran"></Input>
							</div>
							<div className="col-4 text-center">
								<Input className="form-control-alternative"
									name="Tipe Po"
									type="select"
									placeholder="Metode Pembayaran 5"
									value={payment_method5}
									onChange={(e) => {
										setPaymentMethod5(e.target.value);
									}}>
									<option value="">Pilih Metode Pembayaran</option>
									{banks4.map((bank, key) => {
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
							<div className="col-3">Keterangan 5</div>
							<div className="col-1 text-center">:</div>
							<div className="col-4 text-center">
								<Input className="form-control-alternative"
									name="Tipe Po"
									type="text"
									placeholder="Keterangan 5"
									value={keterangan5}
									onChange={(e) => {
										setKeterangan5(e.target.value);
									}}></Input>
							</div>
						</div>
                        <div className="row align-items-center mb-3">
							<div className="col-3">
                                <h3 onClick={toggleOpen5}>
                                    {isOpen5 === true ? (
                                    <Button color="primary" ><i className="fa fa-minus danger " aria-hidden="true"></i></Button>
                                    ) : (
                                    <Button color="primary" ><i className="fa fa-plus danger " aria-hidden="true"></i></Button>
                                    )}
                                </h3>
                            </div>
						</div>
                        </Collapse>
                        <Collapse isOpen={isOpen5}>
                        <div className="row align-items-center mb-3">
							<div className="col-3">Nominal Pembayaran 6</div>
							<div className="col-1 text-center">:</div>
							<div className="col-4 text-center">
								<Input className="form-control-alternative" type="number" value={pay6} onChange={(event) => setPay6(event.target.value)} placeholder="Masukan Nomminal Pembayaran"></Input>
							</div>
							<div className="col-4 text-center">
								<Input className="form-control-alternative"
									name="Tipe Po"
									type="select"
									placeholder="Metode Pembayaran 6"
									value={payment_method6}
									onChange={(e) => {
										setPaymentMethod6(e.target.value);
									}}>
									<option value="">Pilih Metode Pembayaran</option>
									{banks5.map((bank, key) => {
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
							<div className="col-3">Keterangan 6</div>
							<div className="col-1 text-center">:</div>
							<div className="col-4 text-center">
								<Input className="form-control-alternative"
									name="Tipe Po"
									type="text"
									placeholder="Keterangan 6"
									value={keterangan6}
									onChange={(e) => {
										setKeterangan6(e.target.value);
									}}></Input>
							</div>
						</div>
                        </Collapse>
						<div className="row align-items-center mb-3">
							<div className="col-3 text-start  display-1">DP</div>
							<div className="col-1 text-center">:</div>
							<div className="col-6 text-center">
								<textarea
									className="form-control"
									disabled
									value={"Rp." + pay1.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + ",-"}
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
							<div className="col-3  display-3">SISA </div>
							<div className="col-1 text-center">:</div>
							<div className="col-6 text-center">
								<textarea
									className="form-control"
									disabled
									value={"Rp." + ( parseInt(grandtotal) - (parseInt(pay1) + parseInt(pay2)  + parseInt(pay3) + parseInt(pay4) + parseInt(pay5) + parseInt(pay6))).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + ",-"}
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
					<Button
						color="danger"
						outline
						onClick={() => EditData()}>
						Konfirmasi Pembayaran
					</Button>{" "}
					<Button onClick={() => setIsOpen(!isOpen)}>Cancel</Button>
				</ModalFooter>
			</Modal>
		</>
	);
}
