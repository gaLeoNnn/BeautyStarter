import { router } from "../router/router";
import { RouterProvider, Outlet } from "react-router-dom";
import Header from "../header/Header";
import AppointmentContextProvider from "../../context/appointments/AppointmentsContext";

import "./app.scss";

function App() {
  return <RouterProvider router={router} />;
}

export function Root() {
  return (
    <main className="board">
      <Header />
      <AppointmentContextProvider>
        <Outlet />
      </AppointmentContextProvider>
    </main>
  );
}

export default App;
