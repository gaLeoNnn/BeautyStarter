import { useContext, useEffect, useState } from "react";
import CancelModal from "../modal/CancelModal";
import "./employeeList.scss";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";

const EmployeeList = () => {
  const { getAllEmployees, allEmployees } = useContext(AppointmentContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const handleOpenModal = (id: number) => {
    setIsOpen(true);
    setSelectedId(id);
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  const elem = allEmployees.map(item => {
    return <AppointmentItem key={item.id} {...item} handleOpenModal={handleOpenModal} />;
  });
  return (
    <>
      {elem}
      {isOpen ? <CancelModal handleClose={setIsOpen} selectedId={selectedId} /> : null}
    </>
  );
};

export default EmployeeList;
