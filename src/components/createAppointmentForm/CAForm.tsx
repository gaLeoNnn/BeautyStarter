import { useState, FormEvent, ChangeEvent, useContext } from "react";
import "./caform.scss";
import { IAppointment, IEmployee } from "../../shared/interfaces/appointment.interface";
import useAppointmentService from "../../services/AppointmentService";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import dayjs from "dayjs";

type employeeForm = {
  showInput?: boolean | undefined;
};

function CAForm({ showInput }: employeeForm) {
  const { createNewAppointmens, createNewEmployye } = useAppointmentService();
  const [formData, setFormData] = useState<IAppointment>({
    id: 0,
    date: "",
    name: "",
    service: "",
    phone: "",
    specialist: "",
    canceled: false,
  });

  const [formEmployee, setFormEmployee] = useState<IEmployee>({
    id: 0,
    phone: "",
    name: "",
    service: "",
    fired: false,
  });

  const { getActiveAppointments, getAllEmployees } = useContext(AppointmentContext);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setFormData(prev => {
    //   return { ...prev, date: dayjs(prev.date).format("YYYY-MM-DDTHH:mm") };
    // });

    createNewAppointmens(formData)
      .then(() => {
        setFormData({ id: 0, date: "", name: "", service: "", phone: "", specialist: "", canceled: false });
        getActiveAppointments();
      })
      .catch(e => {
        setFormData(prev => {
          return { ...prev, date: dayjs(prev.date).format("DD/MM/YYYY HH:mm") };
        });
      });
  };

  const handleSubmitEmployees = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNewEmployye(formEmployee)
      .then(() => {
        setFormEmployee({ id: 0, name: "", service: "", phone: "", fired: false });
        getAllEmployees();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (showInput) {
      setFormEmployee(prev => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <form className="caform" onSubmit={showInput ? handleSubmitEmployees : handleSubmit}>
      <div className="caform__title">{showInput ? "Create new specialist" : "Create new appointment"}</div>
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
      {showInput ? null : (
        <>
          <label htmlFor="service">
            Specialist<span>*</span>
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="specialist"
            id="specialist"
            placeholder="Specialist name"
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
        </>
      )}
      <button>Create</button>
    </form>
  );
}

export default CAForm;
