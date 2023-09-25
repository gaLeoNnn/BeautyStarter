import CAForm from "../../components/createAppointmentForm/CAForm";
import EmployeeList from "../../components/employeeList/EmployeeList";
import "./employeesPage.scss";

function EmployeesPage() {
  const showInput: boolean = true;

  return (
    <section className="employee">
      <div className="employee__controls">
        <CAForm showInput={showInput} />
      </div>
      <div className="employee__list">
        <EmployeeList />
      </div>
    </section>
  );
}

export default EmployeesPage;
