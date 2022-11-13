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

import BuktiKasMasuk from "views/pages/so/BuktiKasMasuk/BuktiKasMasuk/Index.js";
import ValidasiAdminFinanceBkm from "views/pages/so/BuktiKasMasuk/ValidasiAdminFinance/Index.js";
import ValidasiDirekturBkm from "views/pages/so/BuktiKasMasuk/ValidasiDirekturBKM/Index.js";
import CetakBuktiKasMasuk from "./CetakBuktiKasMasuk/Index";

export default function BKM() {
  const [activeTab, setActiveTab] = useState('1');
  const allInfo = JSON.parse(localStorage.allinfo);
	const buktiKasKeluar = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab BKM").map((p) => p.read_access));
	const validasiKepalaFinance = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Validasi BKM Admin").map((p) => p.read_access));
	const validasiDirektur = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Validasi BKM Direktur").map((p) => p.read_access));
	const cetak = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Cetak BKM").map((p) => p.read_access));

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  return (
    <>
      <SimpleHeader name="Bukti Kas Masuk" parentName="SO" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Nav tabs>
                {buktiKasKeluar && buktiKasKeluar === "YES" && (
                  <NavItem className="pointer">
                    <NavLink
                      className={classnames({ active: activeTab === '1' })}
                      onClick={() => { toggle('1'); }}
                    >
                      Bukti Kas Masuk
                    </NavLink>
                  </NavItem>
                )}
                {validasiKepalaFinance && validasiKepalaFinance === "YES" && (
                  <NavItem className="pointer">
                    <NavLink
                      className={classnames({ active: activeTab === '2' })}
                      onClick={() => { toggle('2'); }}
                    >
                      Validasi Kepala Finance
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
                        <BuktiKasMasuk />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col md="12">
                        <ValidasiAdminFinanceBkm />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="3">
                    <Row>
                      <Col md="12">
                        <ValidasiDirekturBkm />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="4">
                    <Row>
                      <Col md="12">
                        <CetakBuktiKasMasuk />
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
