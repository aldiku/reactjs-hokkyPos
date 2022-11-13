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
const debounce = {};

export default function ModalAddMember({ item, selectModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const [input, setInput] = useState(!item.name ? "" : item.name);
  useEffect(() => {
    if (!isOpen) return;
    setListData([]);
  }, [isOpen, setIsOpen]);

  const token = localStorage.token;
  return (
    <div>
      <InputGroup onDoubleClick={() => setIsOpen(true)}>
        <Input
          type="text"
          value={input}
          readOnly
          placeholder="Pilih Member"
        ></Input>
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
          List Customer
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
                setTimeout(() => {
                  axios
                    .post(
                      `${process.env.REACT_APP_API_BASE_URL}/customer`,
                      {
                        page: 1,
                        per_page: 10,
                        name: event.target.value,
                      },
                      { headers: { Authorization: `Bearer ${token}` } }
                    )
                    .then(({ data }) => {
                      setListData(data.response);
                    })
                    .catch((err) => {
                      console.error(err);
                    })
                    .finally(() => setIsLoading(false));
                }, 500);
              }}
            ></Input>
          </InputGroup>
          {isLoading && loadingSpinner()}

          {!isLoading && (
            <ToolkitProvider
              keyField="id"
              data={listData}
              columns={[
                {
                  dataField: "name",
                  text: "Nama Customer",
                  sort: true,
                },
                {
                  dataField: "phone",
                  text: "Nomor HP",
                  sort: true,
                },
                {
                  dataField: "",
                  text: "",
                  classes: "text-center",
                  formatter: (cell, row) => {
                    return (
                      <Button
                        size="sm"
                        onClick={() => {
                          setIsOpen(false);
                          setInput(row.name);
                          selectModal("customer", row.id, row.name);
                        }}
                        color="danger"
                      >
                        Pilih
                      </Button>
                    );
                  },
                },
              ]}
            >
              {(props) => (
                <BootstrapTable
                  condensed
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
