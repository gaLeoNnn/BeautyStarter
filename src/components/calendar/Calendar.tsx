import { Calendar as LibCalendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useContext } from "react";
import "./calendar.scss";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

function Calendar() {
  const { calendarDate, setDateAndFilter } = useContext(AppointmentContext);

  return (
    <div className="calendar">
      <LibCalendar
        value={calendarDate}
        onChange={e => {
          setDateAndFilter(e);
        }}
        selectRange
      />
    </div>
  );
}

export default Calendar;
