import React, { createContext, useReducer } from "react";
import reducer, { IInitialState } from "./reducer";
import { ActionsTypes } from "./actions";
import useAppointmentService from "../../services/AppointmentService";
import { Value } from "react-calendar/dist/cjs/shared/types";

const initialState: IInitialState = {
  allAppointments: [],
  activeAppointments: [],
  appointmentLoadingStatus: "idle",
  calendarDate: [null, null],
  allEmployees: [],
};

interface ProviderProps {
  children: React.ReactNode;
}

interface AppointmentContextValue extends IInitialState {
  getAppointments: () => void;
  getActiveAppointments: () => void;
  setDateAndFilter: (newDate: Value) => void;
  getAllEmployees: () => void;
}

export const AppointmentContext = createContext<AppointmentContextValue>({
  allAppointments: [],
  allEmployees: [],
  activeAppointments: initialState.activeAppointments,
  appointmentLoadingStatus: initialState.appointmentLoadingStatus,
  calendarDate: initialState.calendarDate,
  getAppointments: () => {},
  getActiveAppointments: () => {},
  setDateAndFilter: (newDate: Value) => {},
  getAllEmployees: () => {},
});

const AppointmentContextProvider = ({ children }: ProviderProps) => {
  const [state, dispath] = useReducer(reducer, initialState);

  const { loadingStatus, getAllAppointments, getActiveAppointments, getAllEmployees } = useAppointmentService();

  const value: AppointmentContextValue = {
    allAppointments: state.allAppointments,
    allEmployees: state.allEmployees,
    activeAppointments: state.activeAppointments,
    appointmentLoadingStatus: loadingStatus,
    calendarDate: state.calendarDate,
    getAppointments: () => {
      getAllAppointments().then(data => {
        const filteredData = data.filter(item => {
          if (Array.isArray(state.calendarDate) && state.calendarDate[0] && state.calendarDate[1]) {
            if (
              new Date(item.date).getTime() >= new Date(state.calendarDate[0]).getTime() &&
              new Date(item.date).getTime() <= new Date(state.calendarDate[1]).getTime()
            ) {
              return item;
            }
          } else {
            return item;
          }
        });
        dispath({ type: ActionsTypes.SET_ALL_APPOINTMENTS, payload: filteredData });
      });
    },
    getActiveAppointments: () => {
      getActiveAppointments().then(data => {
        const filteredData = data.filter(item => {
          if (Array.isArray(state.calendarDate) && state.calendarDate[0] && state.calendarDate[1]) {
            if (
              new Date(item.date).getTime() >= new Date(state.calendarDate[0]).getTime() &&
              new Date(item.date).getTime() <= new Date(state.calendarDate[1]).getTime()
            ) {
              return item;
            }
          } else {
            return item;
          }
        });

        dispath({ type: ActionsTypes.SET_ACTIVE_APPOINTMENTS, payload: filteredData });
      });
    },

    setDateAndFilter: (newDate: Value) => {
      dispath({ type: ActionsTypes.SET_CALENDAR_DATE, payload: newDate });
    },
    getAllEmployees: () => {
      getAllEmployees().then(data => {
        dispath({ type: ActionsTypes.SET_ALL_EMPLOYEES, payload: data });
      });
    },
  };

  return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>;
};

export default AppointmentContextProvider;
