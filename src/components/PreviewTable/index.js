/*eslint-disable*/
import { Modal, Button } from "reactstrap";
import store from "./redux";

export default function PreviewTable({ visible, data }) {
  function closePreview() {
    store.dispatch({
      type: "close_modal_preview",
    });
  }

  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={visible}
      toggle={() => closePreview()}
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
          onClick={() => closePreview()}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body">
        <div className="table-container">
          <table className="table">
            <tbody>
              {(Object.keys(data) || []).map((items, i) => (
                <tr key={i}>
                  <td className="table-key">{items}</td>
                  <td className="table-value">{data[items]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="modal-footer">
        <Button
          color="info"
          data-dismiss="modal"
          type="button"
          block
          onClick={() => closePreview()}
        >
          Tutup
        </Button>
      </div>
    </Modal>
  );
}
