/*eslint-disable*/
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  Row,
  Col,
  Container,
  CardTitle,
} from "reactstrap";

import SimpleHeader from "components/Headers/SimpleHeader.js";


export default function dashboard() {
  const warehouse = localStorage.warehouse
  const token = localStorage.token
  const [itemTotal, setItemTotal] = useState(0);
  const [item, setItem] = useState(0);
  const [cabang, setCabang] = useState(0);
  const headers = { Authorization: `Bearer ${token}` };
  
  useEffect(() => {
    getUser();
    getCabang();
    getItem();
    }, []);

  const getUser = async () => {
		let filter = {
			page: 1,
			per_page: 10,
			warehouse_id: parseInt(warehouse),
		};
		const data = filter;

		const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users`, data, { headers });
		setItemTotal(res.data.total_item);
	};

  const getItem = async () => {
		let filter = {
			page: 1,
			per_page: 10,
			warehouse_id: parseInt(warehouse),
		};
		const data = filter;

		const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/items`, data, { headers });
		setItem(res.data.total_item);
	};

  const getCabang = async () => {
		let filter = {
			page: 1,
			per_page: 10,
			warehouse_id: parseInt(warehouse),
		};
		const data = filter;

		const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/warehouse/all`, data, { headers });
		setCabang(res.data.total_item);
	};
  
  return (
    <div> 
      <SimpleHeader name="Dashboard" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                  <Row className="mb-4">
                    <Col lg="4">
                      <Card className="bg-gradient-red">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle className="text-uppercase text-muted mb-0 text-white">
                                <b>Total Karyawan</b>
                              </CardTitle>
                              <span className="h2 font-weight-bold mb-0 text-white">
                                {itemTotal} Karyawan
                              </span>
                            </div>
                            <Col className="col-auto">
                              <div className="icon icon-shape bg-white text-dark rounded-circle shadow">
                                <i className="ni ni-money-coins" />
                              </div>
                            </Col>
                          </Row>
                          <p className="mt-3 mb-0 text-sm">
                            <span className="text-white mr-2">
                              <i className="fa fa-arrow-up" />
                            </span>
                            <span className="text-nowrap text-light">
                            </span>
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="4">
                      <Card className="bg-gradient-primary">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle className="text-uppercase text-muted mb-0 text-white">
                                Total Item
                              </CardTitle>
                              <span className="h2 font-weight-bold mb-0 text-white">
                                {item} Item
                              </span>
                            </div>
                            <Col className="col-auto">
                              <div className="icon icon-shape bg-white text-dark rounded-circle shadow">
                                <i className="ni ni-book-bookmark" />
                              </div>
                            </Col>
                          </Row>
                          <p className="mt-3 mb-0 text-sm">
                            <span className="text-white mr-2">
                              <i className="fa fa-arrow-up" />
                            </span>
                            <span className="text-nowrap text-light">
                            </span>
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="4">
                      <Card className="bg-gradient-info">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle className="text-uppercase text-muted mb-0 text-white">
                                Total Cabang
                              </CardTitle>
                              <span className="h2 font-weight-bold mb-0 text-white">
                                {cabang}
                              </span>
                            </div>
                            <Col className="col-auto">
                              <div className="icon icon-shape bg-white text-dark rounded-circle shadow">
                                <i className="ni ni-shop" />
                              </div>
                            </Col>
                          </Row>
                          <p className="mt-3 mb-0 text-sm">
                            <span className="text-white mr-2">
                              <i className="fa fa-arrow-up" />
                            </span>
                            <span className="text-nowrap text-light">
                            </span>
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
        </Container>
    </div>
  );
}
