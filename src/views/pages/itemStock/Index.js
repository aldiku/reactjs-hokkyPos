// import React, { useState } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Container,
  Nav,
  NavItem,
  // NavLink,
  // TabContent,
  TabPane
} from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader.js";
// import classnames from 'classnames';
// import StockSemua from "views/pages/itemStock/StockSemua/Index.js";
import StockPribadi from "views/pages/itemStock/StockPribadi/Index.js";
// import StockRak from "views/pages/itemStock/StockRak/Index.js";

export default function ItemStock() {
  // const [activeTab, setActiveTab] = useState('1');
  const allInfo = JSON.parse(localStorage.allinfo);
  const stok = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Stok Inbound").map((p) => p.read_access));
  // const lokasiItem = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Stok Rak").map((p) => p.read_access));
  // const cabang = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Stok Sistem").map((p) => p.read_access));

  // const toggle = tab => {
  //   if (activeTab !== tab) setActiveTab(tab);
  // }

  return (
    <>
      <SimpleHeader name="Stok Item" parentName="Inventori" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Nav tabs>
                {stok && stok === "YES" && (
                  <NavItem className="pointer">
                    {/* <NavLink
                      className={classnames({ active: activeTab === '3' })}
                      onClick={() => { toggle('3'); }}
                    >
                      Stok
                    </NavLink> */}
                  </NavItem>
                )}
                {/* {lokasiItem && lokasiItem === "YES" && (
                  <NavItem className="pointer">
                    <NavLink
                      className={classnames({ active: activeTab === '2' })}
                      onClick={() => { toggle('2'); }}
                    >
                      Lokasi Item
                    </NavLink>
                  </NavItem>
                )}
                {cabang && cabang === "YES" && (
                  <NavItem className="pointer">
                    <NavLink
                      className={classnames({ active: activeTab === '3' })}
                      onClick={() => { toggle('3'); }}
                    >
                      Cabang
                    </NavLink>
                  </NavItem>
                )} */}
                </Nav>
                  <TabPane tabId="1">
                    <Row>
                      <Col md="12">
                        <StockPribadi />
                      </Col>
                    </Row>
                  </TabPane>
                  {/* <TabPane tabId="2">
                    <Row>
                      <Col md="12">
                        <StockRak />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="3">
                    <Row>
                      <Col md="12">
                        <StockSemua />
                      </Col>
                    </Row>
                  </TabPane> */}
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}