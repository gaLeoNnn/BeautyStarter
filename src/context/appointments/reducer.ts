import { IAppointmentAction } from "./actions";
import { IAppointment, AppointmentActive } from "../../shared/interfaces/appointment.interface";
import { ActionsTypes } from "./actions";
import { LooseValue } from "react-calendar/dist/cjs/shared/types";
export interface IInitialState {
  allAppointments: IAppointment[] | [];
  activeAppointments: AppointmentActive[] | [];
  appointmentLoadingStatus: string;
  calendarDate: LooseValue;
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
    default:
      return state;
  }
}
