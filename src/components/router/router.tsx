import SchedulePage from "../../pages/schedule/SchedulePage";
import HistoryPage from "../../pages/history/HistoryPage";
import PageNotFound from "../../pages/404/404";
import { createBrowserRouter } from "react-router-dom";
import { Root } from "../app/App";

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
        path: "/history",
        element: <HistoryPage />,
      },
    ],
  },
]);
