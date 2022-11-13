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

import ItemCategory from "views/pages/item/itemCategory/Index.js";
import ItemSubCategory from "views/pages/item/itemSubCategory/Index.js";
import ItemFunction from "views/pages/item/itemFunction/Index.js";
import ItemSubFunction from "views/pages/item/itemSubFunction/Index.js";
import ItemMerek from "views/pages/item/itemMerek/Index.js";
import ItemSubMerek from "views/pages/item/itemSubMerek/Index.js";
import ItemGrade from "views/pages/item/itemGrade/Index.js";
import ItemMain from "views/pages/item/itemMain/Index2.js";

export default function Item() {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }
  return (
    <>
      <SimpleHeader name="Item" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '1' })}
                      onClick={() => { toggle('1'); }}
                    >
                      Item
                  </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '2' })}
                      onClick={() => { toggle('2'); }}
                    >
                       Kategori
                  </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '3' })}
                      onClick={() => { toggle('3'); }}
                    >
                      Sub Kategori
                  </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '4' })}
                      onClick={() => { toggle('4'); }}
                    >
                       Function
                  </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '5' })}
                      onClick={() => { toggle('5'); }}
                    >
                      Sub Function
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '6' })}
                      onClick={() => { toggle('6'); }}
                    >
                       Merek
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '7' })}
                      onClick={() => { toggle('7'); }}
                    >
                       Sub Merek
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '8' })}
                      onClick={() => { toggle('8'); }}
                    >
                      Grade
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      <Col md="12">
                        <ItemMain />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col md="12">
                        <ItemCategory />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="3">
                    <Row>
                      <Col md="12">
                        <ItemSubCategory />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="4">
                    <Row>
                      <Col md="12">
                        <ItemFunction />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="5">
                    <Row>
                      <Col md="12">
                        <ItemSubFunction />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="6">
                    <Row>
                      <Col md="12">
                        <ItemMerek />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="7">
                    <Row>
                      <Col md="12">
                        <ItemSubMerek />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="8">
                    <Row>
                      <Col md="12">
                        <ItemGrade />
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
