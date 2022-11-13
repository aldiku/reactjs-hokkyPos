import React, { useState } from "react";
import {

  Card,
  CardBody,
  Row,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";

import SimpleHeader from "components/Headers/SimpleHeader.js";
import classnames from 'classnames';
import InvoiceSo from "views/pages/so/InvoiceSo/InvoiceSo/Index.js";
import ValidasiInvoiceSo from "views/pages/so/InvoiceSo/ValidasiInvoiceSo/Index.js"
import ValidasiDirektur from "views/pages/so/InvoiceSo/ValidasiPemimpin/Index.js"
import CetakInvoice from "views/pages/so/InvoiceSo/CetakInvoice/Index.js"

 
export default function So() {
  const [activeTab, setActiveTab] = useState('1');
  const allInfo = JSON.parse(localStorage.allinfo);
  const invoicePO = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Invoice SO").map((p) => p.read_access));
  const validasiAdminFinance = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Validasi Invoice SO Admin").map((p) => p.read_access));
  const validasiDirektur = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Validasi Invoice SO Direktur").map((p) => p.read_access));
  const cetak = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Cetak Invoice SO").map((p) => p.read_access));


  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);

  }

  return (
    <>
      <SimpleHeader name="Invoice So" parentName="SO" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Nav tabs>
                {invoicePO && invoicePO === "YES" && (
                  <NavItem className="pointer">
                    <NavLink
                      className={classnames({ active: activeTab === '1' })}
                      onClick={() => { toggle('1'); }}
                    >
                      Invoice So
                    </NavLink>
                  </NavItem>
                )}
                {validasiAdminFinance && validasiAdminFinance === "YES" && (
                  <NavItem className="pointer">
                    <NavLink
                      className={classnames({ active: activeTab === '2' })}
                      onClick={() => { toggle('2'); }}
                    >
                      Validasi Finance
                    </NavLink>
                  </NavItem>
                )}
                {validasiDirektur && validasiDirektur === "YES" && (
                  <NavItem className="pointer">
                    <NavLink
                      className={classnames({ active: activeTab === '3' })}
                      onClick={() => { toggle('3'); }}
                    >
                      Validasi Direktur
                    </NavLink>
                  </NavItem>
                )}
                {cetak && cetak === "YES" && (
                  <NavItem className="pointer">
                    <NavLink
                      className={classnames({ active: activeTab === '4' })}
                      onClick={() => { toggle('4'); }}
                    >
                      Cetak
                    </NavLink>
                  </NavItem>
                )}
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      <Col md="12">
                        <InvoiceSo />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col md="12">
                        <ValidasiInvoiceSo />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="3">
                    <Row>
                      <Col md="12">
                        <ValidasiDirektur />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="4">
                    <Row>
                      <Col md="12">
                        <CetakInvoice />
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
