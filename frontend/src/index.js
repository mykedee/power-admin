import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "../src/App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import store from "./store";
import "../src/index.css";
import Dashboard from "./screens/AdminScreen/Dashboard";
import ClientDashboard from "./screens/ClientScreen/ClientDashboard";
import Users from "./screens/AdminScreen/UserList";
import BlogList from "./screens/AdminScreen/BlogList";
import ErrorPage from "./components/ErrorPage";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import ForgotPassword from "./screens/ForgotPassword";
import AccountSetting from "./screens/AccountSetting";
import ResetPassword from "./screens/ResetPassword";
import Register from "./screens/Register";
import AdminRoute from "./components/Layouts/AdminRoute";
import VerifyEmail from "./screens/VerifyEmail";
import ClientDashLayout from "./components/Layouts/ClientDashLayout";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route exact path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify" element={<VerifyEmail />} />
      <Route path="/reset-password/:resettoken" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route element={<AdminRoute />} errorElement={<ErrorPage />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/bloglist" element={<BlogList />} />
        <Route path="/dashboard/users" element={<Users />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/dashboard/edit-account" element={<AccountSetting />} />
      </Route>

      <Route element={<ClientDashLayout />} errorElement={<ErrorPage />}>
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/client/profile" element={<Profile />} />
        <Route path="/client/edit-account" element={<AccountSetting />} />
      </Route>
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer autoClose={4000} />
  </Provider>
);
