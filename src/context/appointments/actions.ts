import { IAppointment, AppointmentActive } from "../../shared/interfaces/appointment.interface";

export enum ActionsTypes {
  SET_ACTIVE_APPOINTMENTS = "SET_ACTIVE_APPOINTMENTS",
  SET_ALL_APPOINTMENTS = "SET_ALL_APPOINTMENTS",
  SET_FETCHING_LOADING = "SET_FETCHING_LOADING",
}

export type IAppointmentAction =
  | { type: ActionsTypes.SET_ACTIVE_APPOINTMENTS; payload: AppointmentActive[] }
  | { type: ActionsTypes.SET_ALL_APPOINTMENTS; payload: IAppointment[] }
  | { type: ActionsTypes.SET_FETCHING_LOADING };
