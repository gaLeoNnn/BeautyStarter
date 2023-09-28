import "./customerCard.scss";
import avatar from "../../assets/avatar.png";
import { useContext, useEffect, useState } from "react";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import { AppointmentActive, IAppointment } from "../../shared/interfaces/appointment.interface";
import Records from "../records/Records";

interface ICard {
  handleClose: (value: boolean) => void;
  selectedId: number;
}

const CustomerCard = ({ selectedId, handleClose }: ICard) => {
  const [customer, setCustomer] = useState<AppointmentActive>();
  const [favSpecialist, setFavSpecialist] = useState<string>();

  const { getAppointments, allAppointments, getAllEmployees, allEmployees } = useContext(AppointmentContext);

  useEffect(() => {
    getAppointments();
    getAllEmployees();
    const selectedCustomer = allAppointments.find(data => data.id === selectedId);
    setCustomer(selectedCustomer);

    if (selectedCustomer) {
      const customerRecords = allAppointments.filter(item => item.phone === selectedCustomer.phone);
      interface ISpecialist {
        [specialistName: string]: number;
      }
      const specialistCounts: ISpecialist = {};

      customerRecords.forEach(record => {
        if (specialistCounts[record.specialist]) {
          specialistCounts[record.specialist]++;
        } else {
          specialistCounts[record.specialist] = 1;
        }
      });

      let maxCount = 0;
      let mostFrequentSpecialist: any = null;

      for (const specialist in specialistCounts) {
        if (specialistCounts[specialist] > maxCount) {
          maxCount = specialistCounts[specialist];
          mostFrequentSpecialist = specialist;
        }
      }

      setFavSpecialist(mostFrequentSpecialist);
    }
  }, []);

  const records = allAppointments.filter(item => {
    if (customer?.phone === item.phone) {
      return true;
    }
  });

  const elem = records.map(item => {
    return <Records key={item.id} service={item.service} specialist={item.specialist} date={item.date} />;
  });

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
            <li className="card__list">Fav specialist: {favSpecialist}</li>
          </ul>
        </div>
        <div className="card__item">
          <h5>Records</h5>
          {elem}
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
