import "./modal.scss";
import Portal from "../portal/Portal";
import { useEffect, useContext, useState } from "react";

import useAppointmentService from "../../services/AppointmentService";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

interface IModalProps {
  handleClose: (state: boolean) => void;
  selectedId: number;
  isEmployee?: boolean;
}

function CancelModal({ handleClose, selectedId, isEmployee }: IModalProps) {
  const [isDisable, setDisable] = useState<boolean>(false);
  const [cancelStatus, setCancelStatus] = useState<boolean | null>(null);
  const { getActiveAppointments, getActiveEmployees } = useContext(AppointmentContext);
  const { cancelOneAppointment, cancelOneEmployee } = useAppointmentService();

  const closeOnEscapeKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClose(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", closeOnEscapeKey);
    return () => window.removeEventListener("keydown", closeOnEscapeKey);
  }, []);

  const handleCancelAppointment = (id: number) => {
    if (isEmployee) {
      cancelOneEmployee(id);
    } else {
      setDisable(true);
      cancelOneAppointment(id)
        .then(() => {
          setCancelStatus(true);
        })
        .catch(e => {
          console.log(e);
          setCancelStatus(false);
          setDisable(false);
        });
    }
  };
  const closeModal = () => {
    handleClose(false);
    getActiveEmployees();
    if (cancelStatus) {
      getActiveAppointments();
    }
  };

  return (
    <Portal>
      <div className="modal">
        <div className="modal__body">
          <span className="modal__title">Are you sure you want to delete the appointment? {selectedId}</span>
          <div className="modal__btns">
            <button disabled={isDisable} onClick={() => handleCancelAppointment(selectedId)} className="modal__ok">
              Ok
            </button>
            <button
              onClick={() => {
                handleClose(false);
                closeModal();
              }}
              className="modal__close"
            >
              Close
            </button>
          </div>
          <div className="modal__status">{cancelStatus === null ? "" : cancelStatus ? "Succses" : "Error"}</div>
        </div>
      </div>
    </Portal>
  );
}

export default CancelModal;
