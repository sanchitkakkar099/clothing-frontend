import { lazy } from "react";
import LoginComponent from "../components/auth/Login";

const OrderList = lazy(() => import("../components/order/Orderlist"));
export const privateRoutes = [
  { path: "/order-list", Component: OrderList },
];


export const publicRoutes = [
  { path: "/login", Component: LoginComponent },
]
