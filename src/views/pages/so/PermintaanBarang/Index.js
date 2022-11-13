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

import PermintaanBarang from "./PermintaanBarang/Index.js";
import ValidasiPermintaanBarang from "./ValidasiPermintaanBarang/Index.js";
import CetakPenawawaran from "./CetakPenawaranBarang/Index.js";


export default function Item() {
  const [activeTab, setActiveTab] = useState('1');
  const allInfo = JSON.parse(localStorage.allinfo);
  const permintaanBarang = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Penawaran SO").map((p) => p.read_access));
	const validasiPermintaanBarang = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Validasi SO Kepala Sales").map((p) => p.read_access));
	const cetak = String(allInfo.privileges.filter((i) => i.privilege_name === "Tab Cetak Penawaran SO").map((p) => p.read_access));

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  return (
    <>
      <SimpleHeader name="Penawaran Barang" parentName="SO" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Nav tabs>
                {permintaanBarang && permintaanBarang === "YES" && (
                  <NavItem className="pointer">
                    <NavLink
                      className={classnames({ active: activeTab === '1' })}
                      onClick={() => { toggle('1'); }}
                    >
                      Penawaran Barang
                    </NavLink>
                  </NavItem>
                )}
                {validasiPermintaanBarang && validasiPermintaanBarang === "YES" && (
                  <NavItem className="pointer">
                    <NavLink
                      className={classnames({ active: activeTab === '2' })}
                      onClick={() => { toggle('2'); }}
                    >
                      Validasi Penawaran Barang
                    </NavLink>
                  </NavItem>
                )}
                {cetak && cetak === "YES" && (
                  <NavItem className="pointer">
                    <NavLink
                      className={classnames({ active: activeTab === '3' })}
                      onClick={() => { toggle('3'); }}
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
                        <PermintaanBarang />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col md="12">
                        <ValidasiPermintaanBarang />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="3">
                    <Row>
                      <Col md="12">
                        <CetakPenawawaran />
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
