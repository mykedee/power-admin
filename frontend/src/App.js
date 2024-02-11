import React from "react";
import { Outlet } from "react-router-dom";

// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import Global from "./components/Layouts/Global";

// // import BlogScreen from "./screens/Blog/BlogScreen";
// // import BlogDetailsScreen from "./screens/Blog/BlogDetailsScreen";

// // import HomeScreen from "./screens/HomeScreen/HomeScreen";
// // import Login from "./screens/Login";
// // import Register from "./screens/Register";
// // import Dashboard from "./screens/AdminScreen/Dashboard";
// // import BlogEdit from "./components/BlogSection/BlogEdit";
// import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer";
// // import BlogList from "./screens/AdminScreen/BlogList";
// // import Profile from "./screens/AdminScreen/Profile";
// // import Users from "./screens/AdminScreen/Users";
// // // import AdminScreen from "./screens/AdminScreen/AdminScreen";
// // import Careers from "./screens/Careers";
// // import Contact from "./screens/Contact";
// // import About from "./screens/About";
// // import VerifyEmail from "./screens/VerifyEmail";
// // import ResetPassword from "./screens/ForgotPassword";
// // import ForgotPassword from "./screens/ForgotPassword";
// // import DashLayout from "./components/Layouts/DashLayout";

import "./App.css";

function App() {
	return (
		<>
			{/* <Header /> */}
			{/* <Route element={<Global />}> */}
			<main>
				<Outlet />
			</main>
			{/* <Footer /> */}
		</>
	);
}

export default App;
