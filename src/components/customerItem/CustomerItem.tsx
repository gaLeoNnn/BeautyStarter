import "./customerItem.scss";
import { AppointmentProps } from "../appointmentItem.tsx/AppointmentItem";
import dayjs from "dayjs";

const CustomerItem = (props: AppointmentProps) => {
  const formattedDate = dayjs(props.date).format("DD/MM/YYYY HH:mm");

  return (
    <div
      onClick={() => {
        if (props.handleOpenModal) {
          props.handleOpenModal(props.id);
        }
      }}
      className="customer"
    >
      <div>
        <span>{props.name} </span>
        <span>{props.phone}</span>
      </div>
      <div>
        <span>date of visit </span>
        {formattedDate}
      </div>
    </div>
  );
};

export default CustomerItem;
