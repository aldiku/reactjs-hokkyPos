import store from "../redux";

// component
import { Modal, Button } from "reactstrap";

export default function FailedAlert({ isOpen, title, message }) {
  function closeModal() {
    store.dispatch({
      type: "close_error_modal",
    });
  }

  return (
    <Modal
      className="modal-dialog-centered modal-danger"
      contentClassName="bg-gradient-danger"
      isOpen={isOpen}
      toggle={() => closeModal()}
    >
      <div className="modal-header">
        <h6 className="modal-title" id="modal-title-notification">
          {title}
        </h6>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={() => closeModal()}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body">
        <div className="py-3 text-center">
          <i className="ni ni-bell-55 ni-3x" />
          <h4 className="heading mt-4">Peringatan!</h4>
          <p>{message}</p>
        </div>
      </div>
      <div className="modal-footer">
        <Button
          onClick={() => closeModal()}
          className="btn-white"
          color="default"
          type="button"
        >
          Ok
        </Button>
        <Button
          className="text-white ml-auto"
          color="link"
          data-dismiss="modal"
          type="button"
          onClick={() => closeModal()}
        >
          Tutup
        </Button>
      </div>
    </Modal>
  );
}
