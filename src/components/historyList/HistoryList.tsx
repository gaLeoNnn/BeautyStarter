import { useContext, useEffect, useState } from "react";
import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import { IAppointment } from "../../shared/interfaces/appointment.interface";

function HistoryList() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number>(0);

  const { allAppointments, getAppointments, calendarDate } = useContext(AppointmentContext);

  useEffect(() => {
    getAppointments();
  }, [calendarDate]);

  const elem = allAppointments.map(item => {
    return <AppointmentItem {...item} key={item.id} openModal={setIsOpen} selectedId={() => setSelectedId(item.id)} />;
  });

  return <>{elem}</>;
}

export default HistoryList;
