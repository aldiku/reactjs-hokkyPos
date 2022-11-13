import axios from "axios";
import { AppContext } from "libs/context";
import { useContext, useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";

export default function ModalPembayaran({ total }) {
  const [isOpen, setIsOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [input1, setInput1] = useState(0);
  const [input2, setInput2] = useState(0);
  const [change, setChange] = useState(0);
  const token = localStorage.token;
  const warehouse = localStorage.getItem("warehouse");
  const username =  localStorage.username;
  const { cartKasir, dispatch } = useContext(AppContext);

  useEffect(() => {
    let total = 0;
    cartKasir.item.forEach((item, index) => {
      total = parseInt(total) + parseInt(item.price) * parseInt(item.qty);
    });
    setTotalPrice(total);
  }, [cartKasir, dispatch]);

  return (
    <div>
      <Button block color="danger" onClick={() => setIsOpen(!isOpen)}>
        Pilih Jenis Pembayaran
      </Button>
      <Modal
        toggle={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
        fade={false}
        style={{ minWidth: "70%", top: "-20%" }}
      >
        <ModalHeader toggle={() => setIsOpen(!isOpen)}>
          Metode Pembayaran
        </ModalHeader>
        <ModalBody
          cssModule={{
            alignText: "center",
          }}
        >
          <div className="container">
            <div className="row align-items-center mb-3">
              <div className="col-3">Nominal Pembayaran 1</div>
              <div className="col-1 text-center">:</div>
              <div className="col-4 text-center">
                <Input
                  type="number"
                  value={input1}
                  placeholder="Masukan Nomminal Pembayaran"
                  onChange={(event) => {
                    console.log(
                      parseInt(change) - parseInt(event.target.value)
                    );
                    setChange(parseInt(change) - parseInt(event.target.value));
                    setInput1(event.target.value);
                  }}
                ></Input>
              </div>
              <div className="col-4 text-center">
                <Input
                  type="select"
                  onChange={(e) => {}}
                  className="text-center"
                >
                  <option value="">-- Pilih Jenis Pembayaran --</option>
                  <option value={1}>Kartu Debit ATM</option>
                  <option value={2}>Tunai</option>
                  <option value={2}>Dompet digital</option>
                </Input>
              </div>
            </div>
            <div className="row align-items-center mb-3">
              <div className="col-3">Nomor Kartu 1</div>
              <div className="col-1 text-center">:</div>
              <div className="col-4 text-center">
                <Input type="text" placeholder="Masukan Nomor Kartu"></Input>
              </div>
            </div>

            <div className="row align-items-center mb-3">
              <div className="col-3">Nominal Pembayaran 2</div>
              <div className="col-1 text-center">:</div>
              <div className="col-4 text-center">
                <Input
                  type="number"
                  value={input2}
                  onChange={(event) => setInput2(event.target.value)}
                  placeholder="Masukan Nomminal Pembayaran"
                ></Input>
              </div>
              <div className="col-4 text-center">
                <Input type="select" className="text-center">
                  <option value="">-- Pilih Jenis Pembayaran --</option>
                  <option value={1}>Kartu Debit ATM</option>
                  <option value={2}>Tunai</option>
                  <option value={2}>Dompet digital</option>
                </Input>
              </div>
            </div>
            <div className="row align-items-center mb-3">
              <div className="col-3">Nomor Kartu 2</div>
              <div className="col-1 text-center">:</div>
              <div className="col-4 text-center">
                <Input type="text" placeholder="Masukan Nomor Kartu"></Input>
              </div>
            </div>
            <div className="row align-items-center mb-3">
              <div className="col-3  ">Jenis Transaksi</div>
              <div className="col-1 text-center ">:</div>
              <div className="col-4 text-center">
                <Input
                  onChange={(e) => {
                    dispatch({
                      type: "setPaymentMethod",
                      data_id: e.target.value,
                    });
                  }}
                  type="select"
                  defaultValue={1}
                >
                  <option value={1}>Tunai</option>
                  <option value={2}>Tempo</option>
                  <option value={3}>Cicil</option>
                </Input>
              </div>
            </div>

            <div className="row align-items-center mb-3">
              <div className="col-3 text-start  display-1">Total</div>
              <div className="col-1 text-center">:</div>
              <div className="col-6 text-center">
                <textarea
                  className="form-control"
                  disabled
                  value={
                    "Rp." +
                    totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") +
                    ",-"
                  }
                  style={{
                    fontSize: 40,
                    paddingTop: 20,
                    top: "50%",
                    height: 95,
                    resize: "none",
                  }}
                ></textarea>
              </div>
            </div>
            <div className="row align-items-center mb-3">
              <div className="col-3  display-3">Kembali</div>
              <div className="col-1 text-center">:</div>
              <div className="col-6 text-center">
                <textarea
                  className="form-control"
                  disabled
                  value={
                    "Rp." +
                    (
                      -1 * parseInt(totalPrice) +
                      parseInt(input1) +
                      parseInt(input2)
                    )
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,") +
                    ",-"
                  }
                  style={{
                    fontSize: 40,
                    paddingTop: 20,
                    top: "50%",
                    height: 95,
                    resize: "none",
                  }}
                ></textarea>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            outline
            onClick={() => {
              if (
                -1 * parseInt(totalPrice) +
                  parseInt(input1) +
                  parseInt(input2) <
                0
              ) {
                alert("Nominal Belum Mencukupi");
              } else {
                axios
                  .post(
                    `${process.env.REACT_APP_API_BASE_URL}/sales-order/cashier/save`,
                    {

                      warehouse_id: parseInt(warehouse),
                      username : username,
                      code_rfq:"",
                      sales:"",
                      customer_id:1,
                      pengiriman:1,
                      payment_method:1,
                      jangka_waktu: "",
                      keterangan:"",
                      pay_1: 0,
                      payment_method1:1,
                      keterangan1: "",
                      pay_2:0,
                      payment_method2:1,
                      keterangan2:"",
                      pay_3:0,
                      payment_method3:1,
                      keterangan3:"0",
                      pay_4:0,
                      payment_method4:1,
                      keterangan4:"0",
                      pay_5:0,
                      payment_method5:1,
                      keterangan5:"0",
                      pay_6:0,
                      payment_method6:1,
                      keterangan6:"0",
                      items: cartKasir.item,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  )
                  .then((res) => {
                    if (res.status !== 200) return;
                    window.location.reload();
                    setIsOpen(!isOpen);
                  })
                  .catch((err) => {
                    alert("order gagal");
                  });
                //
              }
            }}
          >
            Konfirmasi Pembayaran
          </Button>{" "}
          <Button onClick={() => setIsOpen(!isOpen)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
