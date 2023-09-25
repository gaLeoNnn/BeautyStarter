import "./customerCard.scss";
import avatar from "../../assets/avatar.png";
import { useContext, useEffect, useState } from "react";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import { AppointmentActive } from "../../shared/interfaces/appointment.interface";
import Records from "../records/Records";
import CustomerItem from "../customerItem/CustomerItem";

interface ICard {
  handleClose: (value: boolean) => void;
  selectedId: number;
}

const CustomerCard = ({ selectedId, handleClose }: ICard) => {
  const [customer, setCustomer] = useState<AppointmentActive>();

  const { getAppointments, allAppointments } = useContext(AppointmentContext);

  useEffect(() => {
    getAppointments();
    const selectedCustomer = allAppointments.find(data => data.id === selectedId);
    setCustomer(selectedCustomer);
  }, []);

  return (
    <div className="card">
      <h2 className="name">Customers personal page</h2>
      <div className="card__wrapper">
        <div className="card__item">
          <img src={avatar} alt="photo" />
          <ul>
            <li className="card__list">Name:{customer?.name}</li>
            <li className="card__list">Phone: {customer?.phone}</li>
            <li className="card__list">Email: example@gmail.com</li>
            <li className="card__list">Services: {customer?.service}</li>
            <li className="card__list">Fav specialist: Olga</li>
          </ul>
        </div>
        <div className="card__item">
          <h5>Records</h5>
          <Records />
        </div>
      </div>
      <button
        onClick={() => {
          handleClose(false);
        }}
        className="card__close"
      >
        Close
      </button>
    </div>
  );
};
export default CustomerCard;
