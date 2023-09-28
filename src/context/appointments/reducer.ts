import { IAppointmentAction } from "./actions";
import { IAppointment, AppointmentActive, IEmployee } from "../../shared/interfaces/appointment.interface";
import { ActionsTypes } from "./actions";
import { LooseValue } from "react-calendar/dist/cjs/shared/types";
export interface IInitialState {
  allAppointments: IAppointment[] | [];
  activeAppointments: AppointmentActive[] | [];
  appointmentLoadingStatus: string;
  calendarDate: LooseValue;
  allEmployees: IEmployee[];
  activeEmployees: IEmployee[];
}

export default function reducer(state: IInitialState, action: IAppointmentAction) {
  switch (action.type) {
    case ActionsTypes.SET_ALL_APPOINTMENTS:
      return { ...state, allAppointments: action.payload, appointmentLoadingStatus: "ldle" };
    case ActionsTypes.SET_ACTIVE_APPOINTMENTS:
      return { ...state, activeAppointments: action.payload, appointmentLoadingStatus: "idle" };
    case ActionsTypes.SET_FETCHING_LOADING:
      return { ...state, appointmentLoadingStatus: "loading" };
    case ActionsTypes.SET_CALENDAR_DATE:
      return { ...state, calendarDate: action.payload };
    case ActionsTypes.SET_ALL_EMPLOYEES:
      return { ...state, allEmployees: action.payload };
    case ActionsTypes.SET_ACTIVE_EMPLOYEES:
      return { ...state, activeEmployees: action.payload };
    default:
      return state;
  }
}
