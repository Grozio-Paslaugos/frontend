/** @format */

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./Components/Header/Header";
import UserProceduresList from "../src/Components/UserProcedureList/UserProceduresList";
import MainLayout from "./Components/MainLayout/MainLayout";
import Home from "./Components/Home/Home";

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
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="my-procedures" element={<UserProceduresList />} />
        </Route>
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
