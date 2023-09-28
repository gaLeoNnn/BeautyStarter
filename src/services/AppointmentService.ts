import { useHttp } from "../hooks/http.hook";
import { IAppointment, AppointmentActive, IEmployee } from "../shared/interfaces/appointment.interface";
import { hasRequiredFields } from "../utility/hasRequiredFields";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const requerdField = ["id", "date", "name", "service", "phone", "canceled"];

const useAppointmentService = () => {
  const { loadingStatus, request } = useHttp();

  const _apiKey: string = "http://localhost:3001/appointments";
  const _apiEmployee: string = "http://localhost:3001/employees";

  const getAllAppointments = async (): Promise<IAppointment[]> => {
    const res = await request({ url: _apiKey });

    if (
      res.every((item: IAppointment) => {
        return hasRequiredFields(item, requerdField);
      })
    ) {
      return res.sort(function (a: IAppointment, b: IAppointment) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    } else {
      throw new Error();
    }
  };

  const getActiveAppointments = async (): Promise<AppointmentActive[]> => {
    const res = await getAllAppointments();
    const transformed: AppointmentActive[] = res
      .filter(item => {
        return !item.canceled && dayjs(item.date).diff(undefined, "m") > 0;
      })
      .map(item => {
        return {
          id: item.id,
          date: item.date,
          name: item.name,
          specialist: item.specialist,
          phone: item.phone,
          service: item.service,
        };
      });
    return transformed;
  };

  const cancelOneAppointment = async (id: number) => {
    return await request({ url: `${_apiKey}/${id}`, method: "PATCH", body: JSON.stringify({ canceled: true }) });
  };

  const createNewAppointmens = async (body: IAppointment) => {
    const id = new Date().getTime();
    body["id"] = id;
    body["date"] = dayjs(body.date, "DD/MM/YYYY HH:mm").format("YYYY-MM-DDTHH:mm");
    console.log(body["date"]);
    return await request({ url: _apiKey, method: "POST", body: JSON.stringify(body) });
  };

  const getAllEmployees = async (): Promise<IEmployee[]> => {
    const result = await request({ url: _apiEmployee });
    return result;
  };

  const getActiveEmployees = async () => {
    const result = await getAllEmployees();
    const transformed: IEmployee[] = result.filter(item => !item.fired);
    return transformed;
  };

  const createNewEmployye = async (body: IEmployee) => {
    const id = new Date().getTime();
    body["id"] = id;
    return await request({ url: _apiEmployee, method: "POST", body: JSON.stringify(body) });
  };

  const cancelOneEmployee = async (id: number) => {
    return await request({ url: `${_apiEmployee}/${id}`, method: "PATCH", body: JSON.stringify({ fired: true }) });
  };

  return {
    loadingStatus,
    getAllAppointments,
    getActiveAppointments,
    cancelOneAppointment,
    createNewAppointmens,
    createNewEmployye,
    getAllEmployees,
    getActiveEmployees,
    cancelOneEmployee,
  };
};
export default useAppointmentService;
