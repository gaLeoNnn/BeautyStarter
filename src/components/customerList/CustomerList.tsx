import { useContext, useEffect, useState } from "react";
import CustomerItem from "../customerItem/CustomerItem";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import CustomerCard from "../customerCard/CustomerCard";

const CustomerList = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(0);

  const { getAppointments, allAppointments } = useContext(AppointmentContext);

  const handleOpenModal = (id: number) => {
    setIsOpen(true);
    setSelectedId(id);
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const uniqueAppointments = allAppointments.filter((appointment, index, appointmentsArray) => {
    return appointmentsArray.findIndex(item => item.phone === appointment.phone) === index;
  });

  return (
    <>
      {uniqueAppointments.map(item => {
        return <CustomerItem key={item.id} {...item} handleOpenModal={handleOpenModal} />;
      })}
      {isOpen ? <CustomerCard handleClose={setIsOpen} selectedId={selectedId} /> : null}
    </>
  );
};

export default CustomerList;
