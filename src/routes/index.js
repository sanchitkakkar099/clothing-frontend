import { lazy } from "react";
import LoginComponent from "../components/auth/Login";
import InstallApp from "../components/installApp/InstallApp";
import AppApproval from "../components/appApproval/Approvalreq"
const OrderList = lazy(() => import("../components/order/Orderlist"));
const ApprovalForm = lazy(() => import("../components/appApproval/ApprovalForm"));
export const privateRoutes = [
  { path: "/order-list", Component: OrderList },
  { path: "/install-app", Component: InstallApp },
  {path:"/approval-requests", Component:AppApproval},
  {path:"/appproval-form", Component:ApprovalForm}
];


export const publicRoutes = [
  { path: "/login", Component: LoginComponent },
]
