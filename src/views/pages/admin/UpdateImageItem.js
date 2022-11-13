/*eslint-disable*/
import React, { useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import {
  TabContent,
  Form,
  Button,
  CardHeader,
  Card,
  Label,
  Col,
  Input,
  FormGroup,
  CardBody,
  Row,
  Container,
} from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader.js";

import axios from "axios";

export default function UpdateImageItem() {
  const token = localStorage.token;
  const [loading, setLoading] = useState(false);
  // image
  const [image1, setImage1] = useState("")

  const history = useHistory();
  const param = useParams();


  const uploadImage = (name,value) => {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };
    let data = new FormData();
    data.append(name,value)
     
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/items/update-foto/${param.id}`, data, { headers })
      .then((data) => {
        if(data.message === 'success'){
          return true
        } else {
          return false
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  const btnUpload = async () => {
    await uploadImage('foto_1', image1)
    
    history.goBack()
  }

  return (
    <>
      <SimpleHeader name="Update" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form>
                  <TabContent activeTab={"1"}>
                        <CardHeader>
                          <h3>Update Item Image</h3>
                        </CardHeader>
                          <CardBody>
                            <Row md="18">
                              <Col md="6">
                                <FormGroup row>
                                    <Label
                                      for="exampleEmail"
                                      sm={3}
                                    >
                                      FOTO  1
                                    </Label>
                                    <Col sm={7}>
                                    <Input
                                        id="exampleFile"
                                        name="file"
                                        type="file"
                                        onChange={(event) => {
                                          setImage1(event.target.files[0]);
                                        }}
                                      />
                                    </Col>
                                  </FormGroup>
                                </Col>
                            </Row>
                              <Button color="info" size="lg" type="button" onClick={() => btnUpload()}>
                            {loading ? "Loading..." : "Simpan"}
                          </Button>
                          <Button
                            color="secondary"
                            size="lg"
                            type="submit"
                            onClick={() => {
                              history.push({ pathname: "/admin/image/list" });
                            }}
                          >
                            Kembali
                      </Button>
                    </CardBody>
                  </TabContent>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}
