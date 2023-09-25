import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import { useContext, useEffect, useState } from "react";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import CancelModal from "../modal/CancelModal";
import Spinner from "../spinner/Spinner";

function AppointmentList() {
  const { activeAppointments, getActiveAppointments, appointmentLoadingStatus, calendarDate } =
    useContext(AppointmentContext);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const handleOpenModal = (id: number) => {
    setIsOpen(true);
    setSelectedId(id);
  };

  useEffect(() => {
    getActiveAppointments();
  }, [calendarDate]);

  if (appointmentLoadingStatus === "loading") {
    return <Spinner />;
  }
  const elem = activeAppointments.map(item => {
    return <AppointmentItem {...item} key={item.id} handleOpenModal={handleOpenModal} />;
  });

  return (
    <>
      {elem}
      {isOpen ? <CancelModal handleClose={setIsOpen} selectedId={selectedId} /> : null}
    </>
  );
}

export default AppointmentList;
