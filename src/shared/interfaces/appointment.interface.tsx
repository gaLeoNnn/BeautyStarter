export interface IAppointment {
  id: number;
  date: string;
  name: string;
  service: string;
  phone: string;
  specialist: string;
  canceled: boolean;
}

export interface IEmployee {
  id: number;
  name: string;
  service: string;
  phone: string;
  fired: boolean;
}

export type AppointmentActive = Omit<IAppointment, "canceled">;
