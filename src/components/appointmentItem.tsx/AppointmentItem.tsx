import { IAppointment } from "../../shared/interfaces/appointment.interface";
import { useEffect, useState } from "react";
import "./appointmentItem.scss";
import dayjs from "dayjs";
import { Optional } from "utility-types";

type AppointmentProps = Optional<IAppointment, "canceled"> & {
  openModal: (state: boolean) => void;
  selectedId: () => void;
};

function AppointmentItem({ name, date, phone, service, canceled, openModal, selectedId }: AppointmentProps) {
  const formattedDate = dayjs(date).format("DD/MM/YYYY HH:mm");
  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  useEffect(() => {
    setTimeLeft(`${dayjs(date).diff(undefined, "h")}: ${dayjs(date).diff(undefined, "m") % 60}`);

    const intervalId = setInterval(() => {
      setTimeLeft(`${dayjs(date).diff(undefined, "h")}: ${dayjs(date).diff(undefined, "m") % 60}`);
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [date]);

  return (
    <div className="appointment">
      <div className="appointment__info">
        <span className="appointment__date">Date: {formattedDate}</span>
        <span className="appointment__name">Name: {name}</span>
        <span className="appointment__service">Service: {service}</span>
        <span className="appointment__phone">Phone:{phone}</span>
      </div>
      {!canceled ? (
        <div className="appointment__time">
          <span>Time left:</span>
          <span className="appointment__timer">{timeLeft}</span>
        </div>
      ) : null}
      {!canceled ? (
        <button
          onClick={() => {
            openModal(true);
            selectedId();
          }}
          className="appointment__cancel"
        >
          Cancel
        </button>
      ) : null}
      {canceled ? <div className="appointment__canceled">Canceled</div> : null}
    </div>
  );
}

export default AppointmentItem;
