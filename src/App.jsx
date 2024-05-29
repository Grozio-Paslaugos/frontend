/** @format */

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import RegisterButton from "./Components/Buttons/RegisterButton";
import LoginButton from "./Components/Buttons/LoginButton";

function App() {
  return (
    <>
      {<RegisterButton />}
      {<LoginButton />}
    </>
import Header from "./Components/Header/Header";
import ProceduresList from "../src/Components/UserProcedureList/UserProceduresList";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/myProcedures" element={<ProceduresList />} /> {}
        <Route
          path="*"
          element={
            <>
              <Header user={user} />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
