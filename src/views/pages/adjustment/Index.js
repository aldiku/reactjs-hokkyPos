import React, { useState } from "react";
import { Card, CardBody, Row, Container, Nav, NavItem, NavLink, TabContent, TabPane, Col } from "reactstrap";

import SimpleHeader from "components/Headers/SimpleHeader.js";
import classnames from "classnames";

import AdjustmentPage from "./Adjustment/Index";
import ValidasiAdjustment from "./ValidasiDirekturAdj/Index";
import CetakAdjustment from "./CetakAdjustment/Index";

export default function So() {
	const [activeTab, setActiveTab] = useState("1");
	const allInfo = JSON.parse(localStorage.allinfo);
	const adjustment = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Adjustment").map((p) => p.read_access));

	const toggle = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	return (
		<>
			<SimpleHeader name="Adjustment" parentName="Inventori" />
			<Container className="mt--6" fluid>
				<Row>
					<div className="col">
						<Card>
							<CardBody>
								<Nav tabs>
									{adjustment && adjustment === "YES" && (
										<NavItem className="pointer">
											<NavLink
												className={classnames({ active: activeTab === "1" })}
												onClick={() => {
													toggle("1");
												}}>
												Adjustment
											</NavLink>
										</NavItem>
									)}
									<NavItem className="pointer">
										<NavLink
											className={classnames({ active: activeTab === "2" })}
											onClick={() => {
												toggle("2");
											}}>
											Validasi Direktur
										</NavLink>
									</NavItem>
									{/* <NavItem className="pointer">
										<NavLink
											className={classnames({ active: activeTab === "3" })}
											onClick={() => {
												toggle("3");
											}}>
											History Adjustment
										</NavLink>
									</NavItem> */}
								</Nav>
								<TabContent activeTab={activeTab}>
									<TabPane tabId="1">
										<Row>
											<Col md="12">
												<AdjustmentPage />
											</Col>
										</Row>
									</TabPane>
									<TabPane tabId="2">
										<Row>
											<Col md="12">
												<ValidasiAdjustment />
											</Col>
										</Row>
									</TabPane>
									<TabPane tabId="3">
										<Row>
											<Col md="12">
												<CetakAdjustment />
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
