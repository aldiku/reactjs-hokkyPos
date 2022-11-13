import React, { useState } from "react";
import { Card, CardBody, Row, Col, Container, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import classnames from "classnames";

import Pusat from "views/pages/warehouse/WarehousePusat/Index.js";
import Toko from "views/pages/warehouse/WarehouseToko/Index.js";
import Gudang from "views/pages/warehouse/WarehouseGudang/Index.js";

export default function Warehouse() {
	const [activeTab, setActiveTab] = useState("1");
	const allInfo = JSON.parse(localStorage.allinfo);
	const pusat = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Pusat").map((p) => p.read_access));
	const toko = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Toko").map((p) => p.read_access));
	const gudang = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Gudang").map((p) => p.read_access));

	const toggle = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	return (
		<>
			<SimpleHeader name="Cabang" parentName="Master" />
			<Container className="mt--6" fluid>
				<Row>
					<div className="col">
						<Card>
							<CardBody>
								<Nav tabs>
									{pusat && pusat === "YES" && (
										<NavItem>
											<NavLink
												className={classnames({ active: activeTab === "1" })}
												onClick={() => {
													toggle("1");
												}}>
												PUSAT
											</NavLink>
										</NavItem>
									)}
									{toko && toko === "YES" && (
										<NavItem>
											<NavLink
												className={classnames({ active: activeTab === "2" })}
												onClick={() => {
													toggle("2");
												}}>
												TOKO
											</NavLink>
										</NavItem>
									)}
									{gudang && gudang === "YES" && (
										<NavItem>
											<NavLink
												className={classnames({ active: activeTab === "3" })}
												onClick={() => {
													toggle("3");
												}}>
												GUDANG
											</NavLink>
										</NavItem>
									)}
								</Nav>
								<TabContent activeTab={activeTab}>
									<TabPane tabId="1">
										<Row>
											<Col md="12">
												<Pusat />
											</Col>
										</Row>
									</TabPane>
									<TabPane tabId="2">
										<Row>
											<Col md="12">
												<Toko />
											</Col>
										</Row>
									</TabPane>
									<TabPane tabId="3">
										<Row>
											<Col md="12">
												<Gudang />
											</Col>
										</Row>
									</TabPane>
								</TabContent>
							</CardBody>
						</Card>
					</div>
				</Row>
			</Container>
		</>
	);
}
