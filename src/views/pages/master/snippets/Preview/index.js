import { Modal, Button } from "reactstrap";
import store from "../redux";

export default function Preview({ nama, hari, durasi, keterangan, visible }) {
  /**
   * It closes the detail modal
   */
  function closeDetail() {
    store.dispatch({
      type: "close_preview_modal",
    });
  }

  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={visible}
        // toggle={() => this.toggleModal("exampleModal")}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Detail
          </h5>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => closeDetail()}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <label className="form-control-label" htmlFor="nama">
            Nama
          </label>
          <span style={{ display: "block" }}>{nama}</span>
          <br />
          <label className="form-control-label" htmlFor="nama">
            Hari
          </label>
          <span style={{ display: "block" }}>{hari}</span>
          <br />
          <label className="form-control-label" htmlFor="nama">
            Durasi
          </label>
          <span style={{ display: "block" }}>{durasi}</span>
          <br />
          <label className="form-control-label" htmlFor="nama">
            Keterangan
          </label>
          <p style={{ display: "block" }}>{keterangan}</p>
        </div>
        <div className="modal-footer">
          <Button
            color="info"
            block
            type="button"
            onClick={() => closeDetail()}
          >
            Tutup
          </Button>
        </div>
      </Modal>
    </>
  );
}
