import "./modal.scss";
import Portal from "../portal/Portal";
import { useEffect } from "react";

interface IModalProps {
  handleClose: (state: boolean) => void;
  selectedId: number;
}

function CancelModal({ handleClose, selectedId }: IModalProps) {
  const closeOnEscapeKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClose(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", closeOnEscapeKey);
    return () => window.removeEventListener("keydown", closeOnEscapeKey);
  }, []);

  return (
    <Portal>
      {" "}
      <div className="modal">
        <div className="modal__body">
          <span className="modal__title">Are you sure you want to delete the appointment? {selectedId}</span>
          <div className="modal__btns">
            <button className="modal__ok">Ok</button>
            <button onClick={() => handleClose(false)} className="modal__close">
              Close
            </button>
          </div>
          <div className="modal__status">Success</div>
        </div>
      </div>
    </Portal>
  );
}

export default CancelModal;
