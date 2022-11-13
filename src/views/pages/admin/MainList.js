/*eslint-disable*/
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
  TabPane,
} from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import classnames from "classnames";

//
// import ListBanner from "./ListBanner";
// import ListImage from "./ListImages";
import ListImageItem from "./ListImageItem";

export default function MainList() {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  // const tabName = ["Item", "Kategori", "Banner"];
  const tabName = ["Item"];
  // const contentPage = [<ListImageItem />, <ListImage />, <ListBanner />];
  const contentPage = [<ListImageItem />];
  return (
    <>
      <SimpleHeader name="Image" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Nav tabs>
                  {tabName.map((name, index) => {
                    return (
                      <NavItem key={index}>
                        <NavLink
                          className={classnames({
                            active: activeTab === `${index + 1}`,
                          })}
                          onClick={() => {
                            toggle(`${index + 1}`);
                          }}
                        >
                          {name}
                        </NavLink>
                      </NavItem>
                    );
                  })}
                </Nav>
                <TabContent activeTab={activeTab}>
                  {contentPage.map((content, index) => {
                    const tabIndex = (index + 1).toString();
                    return (
                      <TabPane tabId={tabIndex} key={index}>
                        <Row>
                          <Col md="12">{content}</Col>
                        </Row>
                      </TabPane>
                    );
                  })}
                </TabContent>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}
