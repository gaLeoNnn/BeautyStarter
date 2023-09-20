import { LooseValue } from "react-calendar/dist/cjs/shared/types";
import { IAppointment, AppointmentActive } from "../../shared/interfaces/appointment.interface";

export enum ActionsTypes {
  SET_ACTIVE_APPOINTMENTS = "SET_ACTIVE_APPOINTMENTS",
  SET_ALL_APPOINTMENTS = "SET_ALL_APPOINTMENTS",
  SET_FETCHING_LOADING = "SET_FETCHING_LOADING",
  SET_CALENDAR_DATE = "SET_CALENDAR_DATE",
}

export type IAppointmentAction =
  | { type: ActionsTypes.SET_ACTIVE_APPOINTMENTS; payload: AppointmentActive[] }
  | { type: ActionsTypes.SET_ALL_APPOINTMENTS; payload: IAppointment[] }
  | { type: ActionsTypes.SET_FETCHING_LOADING }
  | { type: ActionsTypes.SET_CALENDAR_DATE; payload: LooseValue };
