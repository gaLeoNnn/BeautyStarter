import SchedulePage from "../../pages/schedule/SchedulePage";
import HistoryPage from "../../pages/history/HistoryPage";
import PageNotFound from "../../pages/404/404";
import { createBrowserRouter } from "react-router-dom";
import { Root } from "../app/App";
import EmployeesPage from "../../pages/employees/EmployeesPage";
import CustomerPage from "../../pages/customer/CustomerPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        element: <SchedulePage />,
      },
      {
        path: "/schedule",
        element: <SchedulePage />,
      },
      {
        path: "/employees",
        element: <EmployeesPage height="115px" />,
      },
      {
        path: "/history",
        element: <HistoryPage />,
      },
      {
        path: "/customer",
        element: <CustomerPage />,
      },
    ],
  },
]);
