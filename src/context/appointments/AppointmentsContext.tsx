import React, { createContext, useReducer } from "react";
import reducer, { IInitialState } from "./reducer";
import { ActionsTypes } from "./actions";
import useAppointmentService from "../../services/AppointmentService";

const initialState: IInitialState = {
  allAppointments: [],
  activeAppointments: [],
  appointmentLoadingStatus: "idle",
};

interface ProviderProps {
  children: React.ReactNode;
}

interface AppointmentContextValue extends IInitialState {
  getAppointments: () => void;
  getActiveAppointments: () => void;
}

export const AppointmentContext = createContext<AppointmentContextValue>({
  allAppointments: [],
  activeAppointments: initialState.activeAppointments,
  appointmentLoadingStatus: initialState.appointmentLoadingStatus,
  getAppointments: () => {},
  getActiveAppointments: () => {},
});

const AppointmentContextProvider = ({ children }: ProviderProps) => {
  const [state, dispath] = useReducer(reducer, initialState);

  const { loadingStatus, getAllAppointments, getActiveAppointments } = useAppointmentService();

  const value: AppointmentContextValue = {
    allAppointments: state.allAppointments,
    activeAppointments: state.activeAppointments,
    appointmentLoadingStatus: loadingStatus,

    getAppointments: () => {
      getAllAppointments().then(data => dispath({ type: ActionsTypes.SET_ALL_APPOINTMENTS, payload: data }));
    },

    getActiveAppointments: () => {
      getActiveAppointments().then(data => dispath({ type: ActionsTypes.SET_ACTIVE_APPOINTMENTS, payload: data }));
    },
  };

  return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>;
};

export default AppointmentContextProvider;
