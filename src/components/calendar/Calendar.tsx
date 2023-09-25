import { Calendar as LibCalendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useContext } from "react";
import "./calendar.scss";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

function Calendar() {
  const { calendarDate, setDateAndFilter } = useContext(AppointmentContext);

  const handleReset = () => {
    setDateAndFilter([null, null]);
  };

  return (
    <div className="calendar">
      <LibCalendar
        value={calendarDate}
        onChange={e => {
          setDateAndFilter(e);
        }}
        selectRange
      />
      <button onClick={handleReset} className="calendar__reset">
        Reset
      </button>
    </div>
  );
}

export default Calendar;
