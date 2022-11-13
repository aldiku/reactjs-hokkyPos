/*eslint-disable*/
import React, { useEffect, useRef, useState } from "react";
import {
  TabContent,
  FormGroup,
  Form,
  Input,
  Button,
  CardHeader,
  Container,
  Row,
  Card,
  CardBody,
} from "reactstrap";
import FailedAlert from "./snippets/FailedAlert";
import PreviewImage from "./snippets/PreviewImage";
import SimpleHeader from "components/Headers/SimpleHeader.js";

// state management
import store from "./snippets/redux";
import { useHistory } from "react-router";

//
const base_url = process.env.REACT_APP_API_BASE_URL;

export default function UploadImage() {
  const fileRef = useRef(null);
  const [fileError, setFileError] = useState(false);
  const [preview, setPreview] = useState(false);
  const [previewValue, setPreviewValue] = useState("");

  // data needs
  const [kategori, setKategori] = useState([]);
  const [listFunction, setFunction] = useState([]);
  const [merek, setListMerek] = useState([]);

  const [kategoriId, setKategoriId] = useState(0);
  const [subKategoriId, setSubKategoriID] = useState(0);
  const [functionId, setFunctionId] = useState(0);
  const [merekId, setMerekId] = useState(0);
  const [selectedImage, setSelectedImage] = useState([]);
  const [imageName, setImageName] = useState("");
  const [loading, setLoading] = useState(false);

  // error
  const [errKategori, setErrKategori] = useState(false);
  const [errFunction, setErrFunction] = useState(false);
  const [errMerek, setErrMerek] = useState(false);
  const [errFile, setErrFile] = useState(false);
  //

  let history = useHistory();

  useEffect(() => {
    /**
     * It listens to the store's state and changes the state of the component accordingly
     */
    function listenEvent() {
      store.subscribe(() => {
        const state = store.getState();
        switch (state.type) {
          case "close_error_modal":
            setFileError(false);
            break;
          case "close_preview_modal":
            setPreview(false);
            setLoading(false);
            setImageName(state.selected_image.name);
            break;
          case "send_image":
            handleSend();
            break;
          default:
        }
      });
    }
    listenEvent();
    getKategori();
  }, []);

  /**
   * It fetches the list of item categories from the server and stores it in the state
   */
  async function getKategori() {
    try {
      const req = await fetch(`${base_url}/item-kategori/list`);
      const res = await req.json();

      if (req.status === 200 && res.response.length > 0) {
        setKategori(res.response);
      }
    } catch (err) {
      //
    }
  }

  /**
   * It takes in a list of subKategoriIds and returns a list of itemFunctions
   * @param subKategoriIds - The subKategoriIds is the id of the subKategori that you want to get the
   * list of functions.
   */
  async function getListFunction(KategoriIds) {
    try {
      const req = await fetch(
        `${base_url}/item-function/ecom?kategori_id=${KategoriIds}`
      );
      const res = await req.json();
      if (req.status === 200 && res.response.length > 0) {
        setFunction(res.response);
      }
    } catch (err) {}
  }

  /**
   * It fetches the list of all the available Merek based on the selected Kategori, Sub Kategori,
   * Function, and Sub Function
   * @param subFunctionIds - The sub function id.
   */
  async function getMerek(functionIds) {
    try {
      const req = await fetch(
        `${base_url}/merek/ecom?kategori_id=${kategoriId}&function_id=${functionIds}`
      );
      const res = await req.json();
      if (req.status === 200 && res.response.length > 0) {
        setListMerek(res.response);
      }
    } catch (err) {}
  }

  /**
   * When the user clicks the file input, the file input will be clicked
   */
  function handleFileWithClick() {
    setFileError(false);
    fileRef.current.click();
  }

  /**
   * Given a image types, return true if the image type is valid
   * @param types - The file types that are allowed.
   * @returns A boolean value.
   */
  function isImageValid(types) {
    switch (types) {
      case "image/png":
        return true;
      case "image/jpg":
        return true;
      case "image/jpeg":
        return true;
      default:
        return false;
    }
  }

  function validateInput() {
    const data = [
      {
        value: kategoriId,
        name: "kategori",
      },
      {
        value: functionId,
        name: "function",
      },
      {
        value: merekId,
        name: "merek",
      },
      {
        value: selectedImage.length,
        name: "file",
      },
    ];

    const valid = [];

    data.forEach((items) => {
      if (items.value === 0 || items.value === "0") {
        switch (items.name) {
          case "kategori":
            setErrKategori(true);
            break;
          case "function":
            setErrFunction(true);
            break;
          case "merek":
            setErrMerek(true);
            break;
          case "file":
            setErrFile(true);
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
   * It takes the form data,
   * converts it to a JSON string, and then sends it to the server
   */
  function handleSend(evt) {
    evt.preventDefault();
    const data = {
      merek_id: merekId,
      kategori_id: kategoriId,
      function_id: functionId,
    };
    if (validateInput()) {
      setLoading(true);
      const payload = new FormData();
      payload.append("body", JSON.stringify(data));
      payload.append("file", selectedImage[0]);

      fetch(`${base_url}/image/items/save`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
        method: "POST",
        body: payload,
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setPreview(false);
          setLoading(false);
          console.log(res);
          history.push("/admin/image/list");
          // window.location.href = `/image/items/${statePayload.kategori_id}/${statePayload.subkategori_id}/${statePayload.merek_id}`;
        })
        .catch((err) => {
          setLoading(false);
          console.warn(err);
        });
    }
  }

  /**
   * It takes a file object as an argument, and then calls a function that sets the preview value to the
   * result of reading the file as a data URL
   * @param src - The image file that you want to upload.
   */
  function readImage(src) {
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewValue(reader.result);
    };
    reader.readAsDataURL(src);
  }

  /**
   * Reads the image file and sets the preview to true
   * @param evt - The event object that contains the file.
   */
  function processImage(evt) {
    const files = evt.target.files;
    if (files.length > 0) {
      const fileSize = Math.round(files[0].size / 1024);
      const selectedFile = files;
      // validation image
      if (isImageValid(files[0].type) && fileSize < 5000) {
        readImage(selectedFile[0]);
        setPreview(true);
        setSelectedImage(selectedFile);
        setErrFile(false);
      } else {
        setFileError(true);
      }
    }
  }

  return (
    <>
      <SimpleHeader name="Upload" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <TabContent activeTab={"1"}>
                  {/* alert */}
                  <FailedAlert
                    isOpen={fileError}
                    title="Gaga"
                    message={
                      "Pastikan file yang anda upload dalam bentuk png, jpg atau jpeg, serta pastikan ukurannya kurang dari 5 MB"
                    }
                  />
                  <PreviewImage
                    loading={loading}
                    isOpen={preview}
                    src={previewValue}
                    merekId={merekId}
                    kategoriId={kategoriId}
                    subkategoriID={subKategoriId}
                    selectedImage={selectedImage}
                  />
                  <CardHeader>
                    <h3>Upload Image</h3>
                  </CardHeader>
                  {/*  */}
                  <br />
                  <Form
                    noValidate={true}
                    action=""
                    onSubmit={(evt) => handleSend(evt)}
                    method="POST"
                  >
                    <FormGroup>
                      <label htmlFor="kategori">Kategori*</label>
                      <Input
                        id="kategori"
                        type="select"
                        name="kategori"
                        onChange={(evt) => {
                          setKategoriId(evt.target.value);
                          getListFunction(evt.target.value);
                          setErrKategori(false);
                        }}
                        required
                      >
                        <option value="0">-</option>
                        {kategori.map((items, i) => (
                          <option key={i} value={items.id}>
                            {items.name}
                          </option>
                        ))}
                      </Input>
                      <small className="err-text">
                        {errKategori ? "Kategori wajib diisi" : ""}
                      </small>
                    </FormGroup>
                    <FormGroup>
                      <label className="test" htmlFor="function">
                        Function*
                      </label>
                      <Input
                        id="function"
                        type="select"
                        required
                        name="function"
                        onChange={(evt) => {
                          setFunctionId(evt.target.value);
                          getMerek(evt.target.value);
                          setErrFunction(false);
                        }}
                      >
                        <option value="0">-</option>
                        {listFunction.map((items, i) => (
                          <option value={items.id} key={i}>
                            {items.name}
                          </option>
                        ))}
                      </Input>
                      <small className="err-text">
                        {errFunction ? "Function wajib diisi" : ""}
                      </small>
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="merek">Merek*</label>
                      <Input
                        id="merek"
                        type="select"
                        onChange={(evt) => {
                          setMerekId(evt.target.value);
                          setErrMerek(false);
                        }}
                        name="merek"
                        required={true}
                      >
                        <option value="0">-</option>
                        {merek.map((items, i) => (
                          <option value={items.id} key={i}>
                            {items.name}
                          </option>
                        ))}
                      </Input>
                      <small className="err-text">
                        {errMerek ? "Merek wajib diisi" : ""}
                      </small>
                    </FormGroup>
                    {/* upload image */}
                    <div className="upload-image-container">
                      <div className="upload-image-canvas">
                        <h4>Upload Gambar</h4>
                        <br />
                        <input
                          type="file"
                          accept="image/png, image/jpg, image/jpeg"
                          className="hide-input"
                          ref={fileRef}
                          required
                          onChange={(evt) => processImage(evt)}
                        />
                        <Button
                          color="default"
                          type="button"
                          onClick={() => handleFileWithClick()}
                        >
                          <i className="ni ni-image"></i>
                          <span className="btn-inner--text">
                            {imageName.length > 0
                              ? imageName.slice(0, 20)
                              : "Klik Disini"}
                          </span>
                        </Button>
                      </div>
                    </div>
                    <small className="err-text">
                      {errFile ? "file wajib diupload" : ""}
                    </small>

                    <br />
                    <Button color="info" size="lg" type="submit">
                      {loading ? "Loading..." : "Simpan"}
                    </Button>
                    <Button
                      color="secondary"
                      size="lg"
                      type="submit"
                      onClick={() => history.goBack()}
                    >
                      Kembali
                    </Button>
                  </Form>

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
