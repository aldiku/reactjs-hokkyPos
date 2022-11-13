/*eslint-disable*/
import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import {
  TabContent,
  Form,
  Button,
  CardHeader,
  Card,
  CardBody,
  Row,
  Container,
} from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import FailedAlert from "./snippets/FailedAlert";
import PreviewImage from "./snippets/PreviewImage";

// state management
import store from "./snippets/redux";

//
const base_url = process.env.REACT_APP_API_BASE_URL;

export default function UpdateImage() {
  const fileRef = useRef(null);
  const [fileError, setFileError] = useState(false);
  const [preview, setPreview] = useState(false);
  const [previewValue, setPreviewValue] = useState("");

  // data needs

  const [selectedImage, setSelectedImage] = useState([]);
  const [imageName, setImageName] = useState("");
  const [loading, setLoading] = useState(false);

  // error
  const [errFile, setErrFile] = useState(false);
  //

  const history = useHistory();
  const param = useParams();

  useEffect(() => {
    listenEvent();
  }, []);

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

  /**
   * When the user clicks the file input, the file input will be clicked
   */
  function handleFileWithClick() {
    setFileError(false);
    fileRef.current.click();
  }

  /**
   * Given a list of image types, return true if the image type is valid
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
        value: selectedImage.length,
        name: "file",
      },
    ];

    const valid = [];

    data.forEach((items) => {
      if (items.value === 0 || items.value === "0") {
        switch (items.name) {
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
    if (validateInput()) {
      setLoading(true);
      const payload = new FormData();
      payload.append("file", selectedImage[0]);

      fetch(`${base_url}/image/items/update/${param.id}`, {
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
          history.push({ pathname: "/admin/image/list" });
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
      <SimpleHeader name="Update" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <TabContent activeTab={"1"}>
                  {/* alert */}
                  <FailedAlert
                    isOpen={fileError}
                    title="Gagal"
                    message={
                      "Pastikan file yang anda upload dalam bentuk png, jpg atau jpeg, serta pastikan ukurannya kurang dari 5 MB"
                    }
                  />
                  <PreviewImage
                    loading={loading}
                    isOpen={preview}
                    src={previewValue}
                    merekId={""}
                    kategoriId={""}
                    subkategoriID={""}
                    selectedImage={selectedImage}
                  />
                  <CardHeader>
                    <h3>Update Image</h3>
                  </CardHeader>
                  {/*  */}
                  <br />
                  <Form
                    noValidate={true}
                    action=""
                    onSubmit={(evt) => handleSend(evt)}
                    method="POST"
                  >
                    {/* upload image */}
                    <div className="upload-image-container">
                      <div className="upload-image-canvas">
                        <h4>Update Gambar</h4>
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
                      onClick={() => {
                        history.goBack();
                      }}
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
