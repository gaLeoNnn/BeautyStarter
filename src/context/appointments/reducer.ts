import { IAppointmentAction } from "./actions";
import { IAppointment, AppointmentActive } from "../../shared/interfaces/appointment.interface";
import { ActionsTypes } from "./actions";

export interface IInitialState {
  allAppointments: IAppointment[] | [];
  activeAppointments: AppointmentActive[] | [];
  appointmentLoadingStatus: string;
}

export default function reducer(state: IInitialState, action: IAppointmentAction) {
  switch (action.type) {
    case ActionsTypes.SET_ALL_APPOINTMENTS:
      return { ...state, allAppointments: action.payload, appointmentLoadingStatus: "ldle" };
    case ActionsTypes.SET_ACTIVE_APPOINTMENTS:
      return { ...state, activeAppointments: action.payload, appointmentLoadingStatus: "idle" };
    case ActionsTypes.SET_FETCHING_LOADING:
      return { ...state, appointmentLoadingStatus: "loading" };
    default:
      return state;
  }
}
