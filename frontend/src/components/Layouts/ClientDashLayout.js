import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import ClientSideBar from "../../components/NavBar/ClientSideBar";
import TopCard from "../NavBar/TopCard";
import { toggler } from "../../slices/globalSlice";

const ClientDashLayout = () => {
  const dispatch = useDispatch();
  const [cardOpen, setCardOpen] = useState(true);
  const { userInfo } = useSelector((state) => state.auth);

  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const toggleMode = () => {
    dispatch(toggler());
  };
  const handleClick = () => {
    setCardOpen(!cardOpen);
  };

  return userInfo &&
    userInfo.user.role === "user" &&
    userInfo.user.active === true ? (
    <div className={`${darkMode ? "dark" : "bg-dash-bg"}`}>
      <div className="flex md:overflow-x-hidden overflow-x-auto min-h-[100vh] relative">
        <ClientSideBar
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
    </div>
  ) : userInfo &&
    userInfo.user.role === "user" &&
    userInfo.user.active === false ? (
    <Navigate to="/verify" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ClientDashLayout;
