import { useHttp } from "../hooks/http.hook";
import { IAppointment, AppointmentActive } from "../shared/interfaces/appointment.interface";
import { hasRequiredFields } from "../utility/hasRequiredFields";

const requerdField = ["id", "date", "name", "service", "phone", "canceled"];

const useAppointmentService = () => {
  const { loadingStatus, request } = useHttp();

  const _apiKey: string = "https://localhost:3001/appointment";

  const getAllAppointments = async (): Promise<IAppointment[]> => {
    const res = await request({ url: _apiKey });

    if (
      res.every((item: IAppointment) => {
        return hasRequiredFields(item, requerdField);
      })
    ) {
      return res;
    } else {
      throw new Error();
    }
  };

  const getAllActiveAppointments = async () => {
    const res = await getAllAppointments();

    const transformed: AppointmentActive[] = res.map(item => {
      return {
        id: item.id,
        date: item.date,
        name: item.name,
        phone: item.phone,
        service: item.service,
      };
    });
    return transformed;
  };

  return { loadingStatus, getAllAppointments, getAllActiveAppointments };
};
