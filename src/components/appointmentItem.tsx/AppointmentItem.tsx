import { IAppointment } from "../../shared/interfaces/appointment.interface";
import { useEffect, useState } from "react";
import "./appointmentItem.scss";
import dayjs from "dayjs";
import { Optional } from "utility-types";

export type AppointmentProps = Optional<IAppointment, "canceled" | "date" | "specialist"> & {
  handleOpenModal?: (state: number) => void;
  showText?: boolean;
};

function AppointmentItem({
  id,
  name,
  date,
  phone,
  service,
  canceled,
  specialist,
  handleOpenModal,
  showText,
}: AppointmentProps) {
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
        {showText ? null : <span className="appointment__date">Date: {formattedDate}</span>}
        <span className="appointment__name">Name: {name}</span>
        <span className="appointment__service">Service: {service}</span>
        {showText ? null : <span className="appointment__specialist">Specialist: {specialist}</span>}
        <span className="appointment__phone">Phone:{phone}</span>
      </div>
      {canceled === undefined ? (
        <>
          {date !== undefined ? (
            <div className="appointment__time">
              <span>Time left:</span>
              <span className="appointment__timer">{timeLeft}</span>
            </div>
          ) : null}
          <button
            onClick={() => {
              if (handleOpenModal) {
                handleOpenModal(id);
              }
            }}
            className="appointment__cancel"
          >
            {date ? "Cancel" : "Delete"}
          </button>
        </>
      ) : null}

      {canceled ? <div className="appointment__canceled">Canceled</div> : null}
    </div>
  );
}

export default AppointmentItem;
