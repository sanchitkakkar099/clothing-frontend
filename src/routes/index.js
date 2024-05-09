import { lazy } from "react";
import LoginComponent from "../components/auth/Login";
import InstallApp from "../components/installApp/InstallApp";

const OrderList = lazy(() => import("../components/order/Orderlist"));
export const privateRoutes = [
  { path: "/order-list", Component: OrderList },
  { path: "/install-app", Component: InstallApp },
];


export const publicRoutes = [
  { path: "/login", Component: LoginComponent },
]
