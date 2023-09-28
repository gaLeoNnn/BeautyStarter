import { useContext, useEffect, useState } from "react";
import CancelModal from "../modal/CancelModal";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";

const EmployeeList = () => {
  const { getActiveEmployees, activeEmployees } = useContext(AppointmentContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const showText: boolean = true;
  const isEmployee: boolean = true;

  const handleOpenModal = (id: number) => {
    setIsOpen(true);
    setSelectedId(id);
  };

  useEffect(() => {
    getActiveEmployees();
  }, []);

  const elem = activeEmployees.map(item => {
    return <AppointmentItem key={item.id} showText={showText} {...item} handleOpenModal={handleOpenModal} />;
  });
  return (
    <>
      {elem}
      {isOpen ? <CancelModal isEmployee={isEmployee} handleClose={setIsOpen} selectedId={selectedId} /> : null}
    </>
  );
};

export default EmployeeList;
