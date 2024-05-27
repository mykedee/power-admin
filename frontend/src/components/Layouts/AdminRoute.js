import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import AdminSideBar from "../../components/NavBar/AdminSideBar";
import TopCard from "../NavBar/TopCard";
import { toggler } from "../../slices/globalSlice";
import Footer from "../Footer/Footer";

const DashLayout = () => {
  const dispatch = useDispatch();
  const [cardOpen, setCardOpen] = useState(true);
  const { userInfo } = useSelector((state) => state.auth);

  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const toggleMode = () => {
    dispatch(toggler());
  };

  // const handleClick = () => {
  // 	if (!cardOpen) {
  // 		setCardOpen(true);
  // 	} else {
  // 		setCardOpen(false);
  // 	}
  // };

  const handleClick = () => {
    setCardOpen(!cardOpen);
  };

  return userInfo &&
    userInfo.user.role === "admin" &&
    userInfo.user.active === true ? (
    <div className={`${darkMode ? "dark" : "bg-dash-bg"}`}>
      <div className="flex md:overflow-x-hidden overflow-x-auto min-h-[100vh] relative">
        <AdminSideBar
          handleClick={handleClick}
          setCardOpen={setCardOpen}
          cardOpen={cardOpen}
        />

        <TopCard
          handleClick={handleClick}
          setCardOpen={setCardOpen}
          cardOpen={cardOpen}
          darkMode={darkMode}
          toggleMode={toggleMode}
        />

        <Outlet />
      </div>
      <Footer />
    </div>
  ) : userInfo &&
    userInfo.user.role === "admin" &&
    userInfo.user.active === false ? (
    <Navigate to="/verify" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default DashLayout;
