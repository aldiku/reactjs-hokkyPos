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
import UploadImage from "./UploadImage";
import UploadBanner from "./UploadBanner";

export default function MainUpload() {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const tabName = ["Upload Image", "Upload Banner"];
  const contentPage = [<UploadImage />, <UploadBanner />];
  return (
    <>
      <SimpleHeader name="Upload Image" parentName="Admin" />
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
