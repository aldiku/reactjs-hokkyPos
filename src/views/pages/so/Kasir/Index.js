/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { 
    Card, 
    Row, 
    Col, 
    CardBody,
    Container, 
} from 'reactstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import SimpleHeader from "components/Headers/SimpleHeader.js";

const SettlementChasier = () => {
  const username = localStorage.username;
	const [statusKasir, setStatusKasir] = useState(false);

	useEffect(() => {
		cekKasir();
	}, []);

	const cekKasir = async () => {
		const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/chasier-settlement/check-by-username/${username}`);
		if (res.data.status === 200) 
				  setStatusKasir(true);
		else 	setStatusKasir(false);
	};

  return (
    <div>
    <SimpleHeader name="Opening Cashsier " parentName="SO" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <center>
                <Col xs={6}>
                      <Link style={{
                        fontSize: 50,
                        paddingTop: 20,
                        top: "50%",
                        height: 117,
                        resize: "none",
                      }}  
                      className="btn btn-info" 
                      to={statusKasir ? "/admin/kasir-sales-order/modal" : "/admin/kasir-sales-order/so-kasir"}>
                    Open Cashsier
                    </Link>
                  </Col>
                 </center>
                 <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
              </CardBody>
            </Card>
          </div>
        </Row>
        </Container>
    </div>
  );
}

export default SettlementChasier;