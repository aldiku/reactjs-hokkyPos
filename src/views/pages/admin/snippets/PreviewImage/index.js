import { Modal, Button } from "reactstrap";
import store from "../redux";

export default function PreviewImage({
  isOpen,
  src,
  merekId,
  kategoriId,
  subkategoriID,
  selectedImage,
  page,
  keterangan,
  detail,
  ObjectData,
  alias,
}) {
  /**
   * This function is called when the user clicks the "Cancel" button in the preview modal
   */
  function cancelUpload() {
    store.dispatch({
      type: "close_preview_modal",
      selected_image: selectedImage !== undefined ? selectedImage[0] : "",
    });
  }

  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={isOpen}
      toggle={() => cancelUpload()}
    >
      <div className="modal-header">
        <h6 className="modal-title" id="modal-title-default">
          Preview
        </h6>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={() => cancelUpload()}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body">
        {src !== "null" ? (
          <img src={src} alt="preview img" className="upload-image-preview" />
        ) : (
          <div style={{ textAlign: "center", width: "100%" }}>
            <small style={{ fontWeight: 700 }}>Gambar Belum Tersedia</small>
          </div>
        )}
        <br />
        {detail ? <div className="detail-popup">{keterangan}</div> : ""}
      </div>

      {page === "image-items" && ObjectData !== undefined ? (
        <div className="table-container">
          <table className="table">
            <tbody>
              {(Object.keys(ObjectData) || []).map((items, i) =>
                items !== "image_url" ? (
                  <tr key={i}>
                    <td className="table-key">{alias[items]}</td>
                    <td className="table-value">{ObjectData[items]}</td>
                  </tr>
                ) : (
                  <tr key={i}>
                    <td></td>
                    <td></td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
      <div className="modal-footer">
        <Button
          size="lg"
          block
          onClick={() => cancelUpload()}
          color={page === "list" ? "info" : "primary"}
          type="button"
        >
          {page === "list" ? "Tutup" : "Lanjutkan"}
        </Button>
      </div>
    </Modal>
  );
}
