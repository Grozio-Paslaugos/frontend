/** @format */

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./Components/Header/Header";
import UserProceduresList from "../src/Components/UserProcedureList/UserProceduresList";
import MainLayout from "./Components/MainLayout/MainLayout";
import Home from "./Components/Home/Home";
import LoginModal from "./Components/Modals/LoginModal";
import ProceduresList from "../src/Components/UserProcedureList/UserProceduresList";
import CreateProcedure from "./Components/CreateProcedure/CreateProcedure";
import RegisterModal from "./Components/Modals/RegisterModal";
import Footer from "./Components/Footer/Footer";

function App() {
  const [user, setUser] = useState(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = () => {
    setSelectedCategory();
  };

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
          <Route index element={<Home selectedCategory={selectedCategory} />} />
          <Route path="my-procedures" element={<UserProceduresList />} />
          <Route path="/create-procedure" element={<CreateProcedure />} />
        </Route>
        <Route
          path="/login"
          element={
            <LoginModal
              opened={open}
              onClose={() => setLoginModalOpen(false)}
            />
          }
        />
        <Route
          path="/register"
          element={
            <RegisterModal
              opened={open}
              onClose={() => setRegisterModalOpen(false)}
            />
          }
        />
        <Route
          path="*"
          element={
            <>
              <Header user={user} onCategorySelect={handleCategorySelect} />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
