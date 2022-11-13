import {
  TabContent,
  CardHeader,
  Row,
  Card,
  CardBody,
  Container,
  Form,
  FormGroup,
  Input,
  Col,
  Button,
} from "reactstrap";

import SimpleHeader from "components/Headers/SimpleHeader.js";
import { useState } from "react";
import { useHistory } from "react-router";

const base_url = process.env.REACT_APP_API_BASE_URL;

export default function Create() {
  const history = useHistory();
  const [nama, setName] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [hari, setHari] = useState("0");
  const [durasi, setDurasi] = useState("0");

  // error
  const [errNama, setErrNama] = useState(false);
  const [errKet, setErrKeterangan] = useState(false);
  const [errHari, setErrHari] = useState(false);
  const [errDurasi, setErrDurasi] = useState(false);

  //
  const [loading, setLoading] = useState(false);

  /**
   * -   If the length of the input is 0, then the input is invalid.
   * -   If the length of the input is not 0, then the input is valid
   * @returns The value of the return is the value of the function.
   */
  function isValid() {
    const data = [
      {
        value: nama.length,
        name: "nama",
      },
      {
        value: keterangan.length,
        name: "keterangan",
      },
      {
        value: hari.length,
        name: "hari",
      },
      {
        value: durasi.length,
        name: "durasi",
      },
    ];

    const valid = [];

    data.forEach((items) => {
      if (items.value === 0 || items.value === "0") {
        switch (items.name) {
          case "nama":
            setErrNama(true);
            break;
          case "keterangan":
            setErrKeterangan(true);
            break;
          case "hari":
            setErrHari(true);
            break;
          case "durasi":
            setErrDurasi(true);
            break;
          default:
          //
        }
        valid.push(false);
      } else {
        valid.push(true);
      }
    });

    return valid.includes(false) ? false : true;
  }

  /**
   * It takes the form data, checks if it's valid, and if it is, it sends a POST request to the server
   * with the form data
   * @param evt - The event object that was triggered.
   */
  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid()) {
      setLoading(true);
      const payload = {
        name: nama,
        keterangan: keterangan,
        hari: hari,
        durasi: durasi,
      };

      fetch(`${base_url}/jwkredit/save`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setLoading(false);
          if (res.status === 200) {
            history.push({ pathname: "/admin/jangka-waktu/list" });
          }
        })
        .catch((err) => {
          console.warn(err);
          setLoading(false);
        });
    }
  }

  return (
    <>
      <SimpleHeader name="Jangka Waktu" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <TabContent activeTab={"1"}>
                  {/* header */}
                  <CardHeader>
                    <h3>Buat Jangka Waktu</h3>
                  </CardHeader>

                  {/* body */}
                  <br />
                  <Row>
                    <Col>
                      <Form
                        action=""
                        method="POST"
                        onSubmit={(evt) => handleSubmit(evt)}
                      >
                        <FormGroup>
                          <label className="form-control-label" htmlFor="nama">
                            Nama*
                          </label>
                          <Input
                            type="text"
                            placeholder="Masukan nama"
                            id="nama"
                            onChange={(evt) => {
                              setErrNama(false);
                              setName(evt.target.value);
                            }}
                          />
                          <small className="err-text">
                            {errNama ? "Nama wajib diisi" : ""}
                          </small>
                        </FormGroup>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="keterangan"
                          >
                            Keterangan*
                          </label>
                          <Input
                            type="textarea"
                            placeholder="Keterangan"
                            id="keterangan"
                            onChange={(evt) => {
                              setErrKeterangan(false);
                              setKeterangan(evt.target.value);
                            }}
                          />
                          <small className="err-text">
                            {errKet ? "Keterangan wajib diisi" : ""}
                          </small>
                        </FormGroup>
                        <FormGroup>
                          <label className="form-control-label" htmlFor="hari">
                            Hari*
                          </label>
                          <Input
                            type="number"
                            placeholder="Contoh : 10,20,30"
                            id="hari"
                            onChange={(evt) => {
                              setErrHari(false);
                              setHari(evt.target.value);
                            }}
                          />
                          <small className="err-text">
                            {errHari ? "Hari wajib diisi" : ""}
                          </small>
                        </FormGroup>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="durasi"
                          >
                            Durasi*
                          </label>
                          <Input
                            type="number"
                            placeholder="contoh : 10"
                            id="durasi"
                            onChange={(evt) => {
                              setErrDurasi(false);
                              setDurasi(evt.target.value);
                            }}
                          />
                          <small className="err-text">
                            {errDurasi ? "Durasi wajib diisi" : ""}
                          </small>
                        </FormGroup>
                        <Button color="info" type="submit">
                          {loading ? "Loading..." : "Simpan"}
                        </Button>
                        <Button
                          color="secondary"
                          type="button"
                          onClick={() => {
                            history.goBack();
                          }}
                        >
                          Kembali
                        </Button>
                      </Form>
                    </Col>
                  </Row>
                  {/*  */}
                </TabContent>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}
