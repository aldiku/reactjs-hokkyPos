/*!

=========================================================
* Argon Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";
// react library for routing
import { useLocation, NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library that concatenates classes
import classnames from "classnames";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
// react library that creates nice scrollbar on windows devices
import PerfectScrollbar from "react-perfect-scrollbar";
// reactstrap components
import { Collapse, NavbarBrand, Navbar, NavItem, NavLink, Nav, Input } from "reactstrap";
import axios from "axios";

function Sidebar({ toggleSidenav, sidenavOpen, routes, logo, rtlActive }) {
	const [state, setState] = React.useState({});
	const [warehouseList, setWarehouseList] = useState();
	const [warehouseName, setWarehouseName] = useState();
	const location = useLocation();
	const code = localStorage.codewarehouse
	const allInfo = JSON.parse(localStorage.allinfo);
	// Menu Master
	const menuMaster = String(allInfo.privileges.filter((i) => i.privilege_name === "Menu Master").map((p) => p.read_access));
	const cabang = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Cabang").map((p) => p.read_access));
	const lokasiBarang = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Lokasi Barang").map((p) => p.read_access));
	const batasWaktu = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Durasi Operasional").map((p) => p.read_access));
	const validasiPassword = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Otoritas").map((p) => p.read_access));
	const users = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Users").map((p) => p.read_access));
	const supplier = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Supplier").map((p) => p.read_access));
	const satuan = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Satuan").map((p) => p.read_access));
	const item = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Item").map((p) => p.read_access));
	const promoToko = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Promo Toko").map((p) => p.read_access));
	const customer = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Customer").map((p) => p.read_access));
	const ppn = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Ppn").map((p) => p.read_access));
	const jatuhTempo = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Durasi Tempo").map((p) => p.read_access));
	const asset = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Asset").map((p) => p.read_access));
	const bank = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Bank").map((p) => p.read_access));
	const account = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Account").map((p) => p.read_access));
	const coa = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Coa").map((p) => p.read_access));
	// Menu Inventory
	const menuInventory = String(allInfo.privileges.filter((i) => i.privilege_name === "Menu Inventory").map((p) => p.read_access));
  	const stok = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Stok").map((p) => p.read_access));
	const adjustment = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Adjustment").map((p) => p.read_access));
	const transferStok = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Transfer Eksternal").map((p) => p.read_access));
	const receivingTransferStok = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Receiving TE").map((p) => p.read_access));
	const suratJalanTransferStok = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Surat Jalan TE").map((p) => p.read_access));
	const rakTransferStok = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Transfer Internal").map((p) => p.read_access));
	// Menu Pembelian
	const menuPembelian = String(allInfo.privileges.filter((i) => i.privilege_name === "Menu Purchase Order").map((p) => p.read_access));
	const rfq = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Rfq PO").map((p) => p.read_access));
	const order = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub PO").map((p) => p.read_access));
	const memoKurir = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Memo PO").map((p) => p.read_access));
	const receiving = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Receiving PO").map((p) => p.read_access));
	const invoice = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Invoice PO").map((p) => p.read_access));
	const buktiKasKeluar = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Bukti Kas Keluar").map((p) => p.read_access));
	const poRetur = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Retur PO").map((p) => p.read_access));
	// Menu Penjualan
	const menuPenjualan = String(allInfo.privileges.filter((i) => i.privilege_name === "Menu Sales Order").map((p) => p.read_access));
	const posKasir = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Pos Cashier").map((p) => p.read_access));
	const penawaran = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Penawaran SO").map((p) => p.read_access));
	const salesOrder = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub SO").map((p) => p.read_access));
	const suratjalanSo = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Surat Jalan SO").map((p) => p.read_access));
	const invoiceSo = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Invoice SO").map((p) => p.read_access));
	const buktiKasMasuk = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Bukti Kas Masuk").map((p) => p.read_access));
	const ReturSO = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Retur SO").map((p) => p.read_access));
	//Menu Tracking 
	const menuTracking = String(allInfo.privileges.filter((i) => i.privilege_name === "Menu Tracking").map((p) => p.read_access));
	const kunjunganSales = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Kunjungan Sales").map((p) => p.read_access));
	const lacakDriver = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Lacak Driver").map((p) => p.read_access));
	const lacakSales = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Lacak Sales").map((p) => p.read_access));
	// Menu HRD
	const menuHrd = String(allInfo.privileges.filter((i) => i.privilege_name === "Menu HRD").map((p) => p.read_access));
	const karyawan = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Karyawan").map((p) => p.read_access));
	const absensi = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Absensi").map((p) => p.read_access));
	// Menu Finance
	const menuFinance = String(allInfo.privileges.filter((i) => i.privilege_name === "Menu Finance").map((p) => p.read_access));
	const komisi = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Komisi").map((p) => p.read_access));
	const stokOpname = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Stok Opname").map((p) => p.read_access));
	const jurnal = String(allInfo.privileges.filter((i) => i.privilege_name === "Sub Jurnal").map((p) => p.read_access));
	// Menu Ecommerce
	const menuEcommerce = String(allInfo.privileges.filter((i) => i.privilege_name === "Menu Ecommerce").map((p) => p.read_access));
	const menuLaporan = String(allInfo.privileges.filter((i) => i.privilege_name === "Menu Laporan").map((p) => p.read_access));
  
	React.useEffect(() => {
		setState(getCollapseStates(routes));
		getWarehouseList();
		// eslint-disable-next-line
	}, []);
	//getting warehouse data
	const getWarehouseList = () => {
		axios
			.get(`${process.env.REACT_APP_API_BASE_URL}/warehouse/list/all`)
			.then(({ data }) => {
				setWarehouseList(data.response);
				if (data.response.length === 0) {
					const initalData = data.response[0];
					setWarehouseName(initalData.name);
					localStorage.setItem("warehouse", initalData.id);
				}
			})
			.catch((err) => console.log(err));
	};
	//add warehouse into the list
	const addWarehouseList = () => {
		if (!warehouseList) return <option> warehouse not found </option>;
		return warehouseList.map((item) => (
			<option key={item.id} data-id={item.id}>
				{item.name}
			</option>
		));
	};
	//selected change warehouse
	const onWarehouseChange = (event) => {
		const selectedWarehouse = event.target.options.selectedIndex;
		const name = event.target.value;
		setWarehouseName(name);
		const warehouseId = event.target.options[selectedWarehouse].getAttribute("data-id");
		localStorage.setItem("warehouse", warehouseId);
	};

	// verifies if routeName is the one active (in browser input)
	const activeRoute = (routeName) => {
		return location.pathname.indexOf(routeName) > -1 ? "active" : "";
	};
	// makes the sidenav normal on hover (actually when mouse enters on it)
	const onMouseEnterSidenav = () => {
		if (!document.body.classList.contains("g-sidenav-pinned")) {
			document.body.classList.add("g-sidenav-show");
		}
	};
	// makes the sidenav mini on hover (actually when mouse leaves from it)
	const onMouseLeaveSidenav = () => {
		if (!document.body.classList.contains("g-sidenav-pinned")) {
			document.body.classList.remove("g-sidenav-show");
		}
	};
	// this creates the intial state of this component based on the collapse routes
	// that it gets through routes
	const getCollapseStates = (routes) => {
		let initialState = {};
		routes.map((prop, key) => {
			if (prop.collapse) {
				initialState = {
					[prop.state]: getCollapseInitialState(prop.views),
					...getCollapseStates(prop.views),
					...initialState,
				};
			}
			return null;
		});
		return initialState;
	};
	// this verifies if any of the collapses should be default opened on a rerender of this component
	// for example, on the refresh of the page,
	// while on the src/views/forms/RegularForms.js - route /admin/regular-forms
	const getCollapseInitialState = (routes) => {
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
				return true;
			} else if (location.pathname.indexOf(routes[i].path) !== -1) {
				return true;
			}
		}
		return false;
	};
	// this is used on mobile devices, when a user navigates
	// the sidebar will autoclose
	const closeSidenav = () => {
		if (window.innerWidth < 1200) {
			toggleSidenav();
		}
	};
	// this function creates the links and collapses that appear in the sidebar (left menu)
	const createLinks = (routes) => {
		return (
			routes
				// function to filter access rights
				// Menu Master
				.filter((i) => (menuMaster !== "YES" ? i.name !== "Master" : i))
				.filter((i) => (cabang !== "YES" ? i.name !== "Cabang" : i))
				.filter((i) => (lokasiBarang !== "YES" ? i.name !== "Lokasi Barang" : i))
				.filter((i) => (batasWaktu !== "YES" ? i.name !== "Batas Waktu" : i))
				.filter((i) => (validasiPassword !== "YES" ? i.name !== "Validasi Password" : i))
				.filter((i) => (users !== "YES" ? i.name !== "Users" : i))
				.filter((i) => (supplier !== "YES" ? i.name !== "Supplier" : i))
				.filter((i) => (satuan !== "YES" ? i.name !== "Satuan" : i))
				.filter((i) => (item !== "YES" ? i.name !== "Item" : i))
				.filter((i) => (promoToko !== "YES" ? i.name !== "Promo Toko" : i))
				.filter((i) => (customer !== "YES" ? i.name !== "Customer" : i))
				.filter((i) => (ppn !== "YES" ? i.name !== "PPN" : i))
				.filter((i) => (jatuhTempo !== "YES" ? i.name !== "Jatuh Tempo" : i))
				.filter((i) => (asset !== "YES" ? i.name !== "Asset" : i))
				.filter((i) => (bank !== "YES" ? i.name !== "Bank" : i))
				.filter((i) => (account !== "YES" ? i.name !== "Account" : i))
				.filter((i) => (coa !== "YES" ? i.name !== "Coa" : i))
				// Menu Inventory
				.filter((i) => (menuInventory !== "YES" ? i.name !== "Inventory" : i))
        		.filter((i) => (stok !== "YES" ? i.name !== "Stock" : i))
				.filter((i) => (adjustment !== "YES" ? i.name !== "Adjustment" : i))
				.filter((i) => (transferStok !== "YES" ? i.name !== "Transfer Stok" : i))
				.filter((i) => (receivingTransferStok !== "YES" ? i.name !== "Receiving Transfer Stok" : i))
				.filter((i) => (suratJalanTransferStok !== "YES" ? i.name !== "Surat Jalan Transfer Stok" : i))
				.filter((i) => (rakTransferStok !== "YES" ? i.name !== "Rak Transfer Stok" : i))
				// Menu Pembelian
				.filter((i) => (menuPembelian !== "YES" ? i.name !== "Pembelian" : i))
				.filter((i) => (rfq !== "YES" ? i.name !== "RFQ" : i))
				.filter((i) => (order !== "YES" ? i.name !== "Order" : i))
				.filter((i) => (memoKurir !== "YES" ? i.name !== "Memo Kurir" : i))
				.filter((i) => (receiving !== "YES" ? i.name !== "Receiving" : i))
				.filter((i) => (invoice !== "YES" ? i.name !== "Invoice" : i))
				.filter((i) => (buktiKasKeluar !== "YES" ? i.name !== "Bukti Kas Keluar" : i))
				.filter((i) => (poRetur !== "YES" ? i.name !== "PO Retur" : i))
				// Menu Penjualan
				.filter((i) => (menuPenjualan !== "YES" ? i.name !== "Penjualan" : i))
				.filter((i) => (posKasir !== "YES" ? i.name !== "POS Kasir" : i))
				.filter((i) => (penawaran !== "YES" ? i.name !== "Penawaran" : i))
				.filter((i) => (salesOrder !== "YES" ? i.name !== "Sales Order" : i))
				.filter((i) => (suratjalanSo !== "YES" ? i.name !== "Surat Jalan" : i))
				.filter((i) => (invoiceSo !== "YES" ? i.name !== "Invoice" : i))
				.filter((i) => (buktiKasMasuk !== "YES" ? i.name !== "Bukti Kas Masuk" : i))
				.filter((i) => (ReturSO !== "YES" ? i.name !== "SO Retur" : i))
				// Menu Tracking
				.filter((i) => (menuTracking !== "YES" ? i.name !== "Tracking" : i))
				.filter((i) => (kunjunganSales !== "YES" ? i.name !== "Histori Canvasing" : i))
				.filter((i) => (lacakSales !== "YES" ? i.name !== "Canvaser" : i))
				.filter((i) => (lacakDriver !== "YES" ? i.name !== "Kurir" : i))
				// Menu HRD
				.filter((i) => (menuHrd !== "YES" ? i.name !== "HRD" : i))
				.filter((i) => (karyawan !== "YES" ? i.name !== "Karyawan" : i))
				.filter((i) => (absensi !== "YES" ? i.name !== "Absen" : i))
				// Menu Finance
				.filter((i) => (menuFinance !== "YES" ? i.name !== "Finance" : i))
				// .filter((i) => (absensi !== "YES" ? i.name !== "Gaji" : i))
				.filter((i) => (komisi !== "YES" ? i.name !== "Komisi" : i))
				.filter((i) => (stokOpname !== "YES" ? i.name !== "Stok Opname" : i))
				.filter((i) => (jurnal !== "YES" ? i.name !== "Jurnal" : i))
				// Menu Ecommerce
				.filter((i) => (menuEcommerce !== "YES" ? i.name !== "E-Commerce" : i))
				// .filter((i) => (jurnal !== "YES" ? i.name !== "Jurnal" : i))
				// .filter((i) => (jurnal !== "YES" ? i.name !== "Jurnal" : i))
				// .filter((i) => (jurnal !== "YES" ? i.name !== "Jurnal" : i))
				// .filter((i) => (jurnal !== "YES" ? i.name !== "Jurnal" : i))
				// .filter((i) => (jurnal !== "YES" ? i.name !== "Jurnal" : i))
				// Menu Report
				.filter((i) => (menuLaporan !== "YES" ? i.name !== "Report" : i))
				.map((prop, key) => {
					if (prop.redirect) {
						return null;
					}
					if (prop.hidden) {
						return null;
					}
					if (prop.collapse) {
						var st = {};
						st[prop["state"]] = !state[prop.state];
						return (
							<NavItem key={key}>
								<NavLink
									href="#pablo"
									data-toggle="collapse"
									aria-expanded={state[prop.state]}
									className={classnames({
										active: getCollapseInitialState(prop.views),
									})}
									onClick={(e) => {
										e.preventDefault();
										setState(st);
									}}>
									{prop.icon ? (
										<>
											<i className={prop.icon} />
											<span className="nav-link-text">{prop.name}</span>
										</>
									) : prop.miniName ? (
										<>
											<span className="sidenav-mini-icon"> {prop.miniName} </span>
											<span className="sidenav-normal"> {prop.name} </span>
										</>
									) : null}
								</NavLink>
								<Collapse isOpen={state[prop.state]}>
									<Nav className="nav-sm flex-column">{createLinks(prop.views)}</Nav>
								</Collapse>
							</NavItem>
						);
					}
					return (
						<NavItem className={activeRoute(prop.layout + prop.path)} key={key}>
							<NavLink to={prop.layout + prop.path} activeClassName="" onClick={closeSidenav} tag={NavLinkRRD}>
								{prop.icon !== undefined ? (
									<>
										<i className={prop.icon} />
										<span className="nav-link-text">{prop.name}</span>
									</>
								) : prop.miniName !== undefined ? (
									<>
										<span className="sidenav-mini-icon"> {prop.miniName} </span>
										<span className="sidenav-normal"> {prop.name} </span>
									</>
								) : (
									prop.name
								)}
							</NavLink>
						</NavItem>
					);
				})
		);
	};

	let navbarBrandProps;
	if (logo && logo.innerLink) {
		navbarBrandProps = {
			to: logo.innerLink,
			tag: Link,
		};
	} else if (logo && logo.outterLink) {
		navbarBrandProps = {
			href: logo.outterLink,
			target: "_blank",
		};
	}
	const scrollBarInner = (
		<div className="scrollbar-inner">
			<div className="sidenav-header d-flex align-items-center">
				{logo ? (
					<NavbarBrand {...navbarBrandProps}>
						<img alt={logo.imgAlt} className="navbar-brand-img" src={logo.imgSrc}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font size="3" align="center"><b>{code}</b></font>
					</NavbarBrand>	
				) : null}
				<div className="ml-auto">
					
				</div>
			</div>

			<div className="navbar-inner">
				{localStorage.getItem("authority") === "[ROLE_SUPERADMIN]" && (
					<Input value={warehouseName} type="select" bsSize="sm" onChange={onWarehouseChange}>
						{addWarehouseList()}
					</Input>
				)}
				
				<Collapse navbar isOpen={true}>
					<Nav navbar>{createLinks(routes)}</Nav>
					{/* <hr className="my-3" /> */}
					{/* <h6 className="navbar-heading p-0 text-muted">
            <span className="docs-normal">Documentation</span>
            <span className="docs-mini">D</span>
          </h6> */}
					{/* <Nav className="mb-md-3" navbar>
            <NavItem>
              <NavLink
                href="https://demos.creative-tim.com/argon-dashboard-pro-react/#/documentation/overview?ref=adpr-sidebar"
                target="_blank"
              >
                <i className="ni ni-spaceship" />
                <span className="nav-link-text">Getting started</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="https://demos.creative-tim.com/argon-dashboard-pro-react/#/documentation/colors?ref=adpr-sidebar"
                target="_blank"
              >
                <i className="ni ni-palette" />
                <span className="nav-link-text">Foundation</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="https://demos.creative-tim.com/argon-dashboard-pro-react/#/documentation/alert?ref=adpr-sidebar"
                target="_blank"
              >
                <i className="ni ni-ui-04" />
                <span className="nav-link-text">Components</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="https://demos.creative-tim.com/argon-dashboard-pro-react/#/documentation/charts?ref=adpr-sidebar"
                target="_blank"
              >
                <i className="ni ni-chart-pie-35" />
                <span className="nav-link-text">Plugins</span>
              </NavLink>
            </NavItem>
          </Nav> */}
				</Collapse>
			</div>
		</div>
	);
	return (
		<Navbar
			className={"sidenav navbar-vertical navbar-expand-xs navbar-light bg-white " + (rtlActive ? "" : "fixed-left")}
			onMouseEnter={onMouseEnterSidenav}
			onMouseLeave={onMouseLeaveSidenav}>
			{navigator.platform.indexOf("Win") > -1 ? <PerfectScrollbar>{scrollBarInner}</PerfectScrollbar> : scrollBarInner}
		</Navbar>
	);
}

Sidebar.defaultProps = {
	routes: [{}],
	toggleSidenav: () => {},
	sidenavOpen: false,
	rtlActive: false,
};

Sidebar.propTypes = {
	// function used to make sidenav mini or normal
	toggleSidenav: PropTypes.func,
	// prop to know if the sidenav is mini or normal
	sidenavOpen: PropTypes.bool,
	// links that will be displayed inside the component
	routes: PropTypes.arrayOf(PropTypes.object),
	// logo
	logo: PropTypes.shape({
		// innerLink is for links that will direct the user within the app
		// it will be rendered as <Link to="...">...</Link> tag
		innerLink: PropTypes.string,
		// outterLink is for links that will direct the user outside the app
		// it will be rendered as simple <a href="...">...</a> tag
		outterLink: PropTypes.string,
		// the image src of the logo
		imgSrc: PropTypes.string.isRequired,
		// the alt for the img
		imgAlt: PropTypes.string.isRequired,
	}),
	// rtl active, this will make the sidebar to stay on the right side
	rtlActive: PropTypes.bool,
};

export default Sidebar;
