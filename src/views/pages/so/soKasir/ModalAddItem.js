import { useEffect, useState } from "react";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  InputGroupText,
  InputGroup,
  Spinner,
} from "reactstrap";
import axios from "axios";


export default function ModalAddItem({ item, selectModal }) {
  const warehouse = localStorage.warehouse;
  console.log(warehouse);
  let debounce = {};
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [listData, setListData] = useState([]);
  useEffect(() => {
    if (!isOpen) return;
    setListData([]);
  }, [isOpen, setIsOpen]);

  const token = localStorage.token;
  return (
    <div>
      <InputGroup onDoubleClick={() => setIsOpen(true)}>
        <Input type="text" placeholder="Pilih Item"></Input>
        <InputGroupText disabled style={{ backgroundColor: "#f3f4fa" }}>
          <i className="fas fa-list"></i>
        </InputGroupText>
      </InputGroup>

      <Modal
        toggle={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
        fade={false}
        style={{ minWidth: "50%", top: "-20%" }}
      >
        <ModalHeader toggle={() => setIsOpen(!isOpen)}>
          List Item
        </ModalHeader>
        <ModalBody
          cssModule={{
            alignText: "center",
          }}
        >
          <InputGroup className="mb-3">
            <InputGroupText style={{ backgroundColor: "#f3f4fa" }}>
              <i className="fas fa-search"></i>
            </InputGroupText>
            <Input
              placeholder="Isi Minimal 3 huruf"
              hint="Minimal isi 3 baris"
              onChange={(event) => {
                clearTimeout(debounce);
                if (event.target.value.length < 3) return;
                setIsLoading(true);
                debounce = setTimeout(() => {
                  axios
                    .post(
                      `${process.env.REACT_APP_API_BASE_URL}/items`,
                      {
                        page: 1,
                        per_page: 10,
                        item_name: event.target.value,
                        warehouse_id : parseInt(warehouse),
                      },
                      {
                        headers: { Authorization: `Bearer ${token}` },
                      }
                    )
                    .then(({ data }) => {
                      setListData(data.response);
                      setIsLoading(false);
                    });
                }, 1000);
              }}
            ></Input>
          </InputGroup>
          {isLoading && loadingSpinner()}

          {!isLoading && (
            <ToolkitProvider
              keyField="tes"
              data={listData}
              columns={[
                {
                  dataField: "item_name",
                  text: "Nama Item",
                  sort: true,
                },
                {
                  dataField: "barcode",
                  text: "barcode item",
                  sort: true,
                },
                {
                  dataField: "",
                  text: "",
                  classes: "text-center",
                  formatter: (cell, row, index) => {
                    return (
                      <div>
                        <Button
                          key={index * 1000}
                          size="sm"
                          onClick={() => {
                            setIsOpen(false);
                            selectModal("item", row);
                          }}
                          color="danger"
                        >
                          Pilih
                        </Button>
                      </div>
                    );
                  },
                },
              ]}
            >
              {(props) => (
                <BootstrapTable
                  condensed={true}
                  bordered={false}
                  {...props.baseProps}
                />
              )}
            </ToolkitProvider>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
}

const loadingSpinner = () => {
  return (
    <div className="mb-3 text-center">
      <Spinner color="danger" type="grow">
        Loading...
      </Spinner>
      <Spinner color="success" type="grow">
        Loading...
      </Spinner>
      <Spinner color="primary" type="grow">
        Loading...
      </Spinner>
    </div>
  );
};
