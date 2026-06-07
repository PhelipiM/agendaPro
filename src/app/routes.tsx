import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ClientDashboard } from "./pages/ClientDashboard";
import { NewAppointment } from "./pages/NewAppointment";
import { AdminDashboard } from "./pages/AdminDashboard";
import { ServiceManagement } from "./pages/ServiceManagement";
import { History } from "./pages/History";
import { Profile } from "./pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/dashboard",
    Component: ClientDashboard,
  },
  {
    path: "/appointment/new",
    Component: NewAppointment,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
  {
    path: "/admin/services",
    Component: ServiceManagement,
  },
  {
    path: "/history",
    Component: History,
  },
  {
    path: "/profile",
    Component: Profile,
  },
]);
