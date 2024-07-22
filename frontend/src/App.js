import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
	return (
    <main className={`${darkMode ? "dark" : "bg-dash-bg"}`}>
      <Outlet />
    </main>
  );
}

export default App;
