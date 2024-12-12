import { lazy } from "react";
import LoginComponent from "../components/auth/Login";
import InstallApp from "../components/installApp/InstallApp";
import AppApproval from "../components/appApproval/Approvalreq";
const OrderList = lazy(() => import("../components/order/Orderlist"));
const ApprovalForm = lazy(() => import("../components/appApproval/ApprovalForm"));
const Signup = lazy(() => import("../components/auth/SignUp"));
const StoreInfo = lazy(() => import("../components/storeInfo/StoreInfo"));
const ProductList = lazy(() => import("../components/vendorProducts/ProductList"));
const Dashboard = lazy(() => import("../components/dashboard/Dashboard"));
export const AdminRoutes = [
  { path: "/order-list", Component: OrderList },
  { path: "/install-app", Component: InstallApp },
  {path:"/approval-requests", Component:AppApproval},
  {path:"/appproval-form", Component:ApprovalForm},
  {path:"/appproval-form", Component:ApprovalForm},
];

export const VendorRoutes = [
  {path:"/dashboard",Component:Dashboard},
  {path: "/product-list",Component:ProductList},
]


export const publicRoutes = [
  { path: "/login", Component: LoginComponent },
  { path:"/sign-up",Component:Signup },
  {path: "/store-info",Component:StoreInfo}
]
