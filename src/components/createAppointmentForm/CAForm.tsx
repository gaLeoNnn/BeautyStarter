import { useState, FormEvent, ChangeEvent, useContext } from "react";
import "./caform.scss";
import { IAppointment } from "../../shared/interfaces/appointment.interface";
import useAppointmentService from "../../services/AppointmentService";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import dayjs from "dayjs";

function CAForm() {
  const { createNewAppointmens } = useAppointmentService();
  const [formData, setFormData] = useState<IAppointment>({
    id: 0,
    date: "",
    name: "",
    service: "",
    phone: "",
    canceled: false,
  });

  const { getActiveAppointments } = useContext(AppointmentContext);

  const handleSubmit = () => {
    // setFormData(prev => {
    //   return { ...prev, date: dayjs(prev.date).format("YYYY-MM-DDTHH:mm") };
    // });

    createNewAppointmens(formData)
      .then(() => {
        setFormData({ id: 0, date: "", name: "", service: "", phone: "", canceled: false });
        getActiveAppointments();
      })
      .catch(e => {
        setFormData(prev => {
          return { ...prev, date: dayjs(prev.date).format("DD/MM/YYYY HH:mm") };
        });
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form className="caform" onSubmit={handleSubmit}>
      <div className="caform__title">Create new appointment</div>
      <label htmlFor="name">
        Name<span>*</span>
      </label>
      <input onChange={handleChange} type="text" name="name" id="name" placeholder="User name" required />

      <label htmlFor="service">
        Service<span>*</span>
      </label>

      <input onChange={handleChange} type="text" name="service" id="service" placeholder="Service name" required />

      <label htmlFor="phone">
        Phone number<span>*</span>
      </label>
      <input
        onChange={handleChange}
        type="tel"
        name="phone"
        id="phone"
        placeholder="+1 890 335 372"
        pattern="^\++[0-9]{1} [0-9]{3} [0-9]{3} [0-9]{3}"
        title="Format should be +1 804 944 567"
        required
      />

      <label htmlFor="date">
        Date<span>*</span>
      </label>
      <input
        onChange={handleChange}
        type="text"
        name="date"
        id="date"
        placeholder="DD/MM/YYYY HH:mm"
        pattern="^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$"
        title="Format should be DD/MM/YYYY HH:mm"
        required
      />
      <button>Create</button>
    </form>
  );
}

export default CAForm;
