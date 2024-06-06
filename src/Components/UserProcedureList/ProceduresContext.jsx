/** @format */

import React, { createContext, useContext, useState } from "react";

const ProceduresContext = createContext();

export const ProceduresProvider = ({ children }) => {
  const [registeredProcedures, setRegisteredProcedures] = useState([]);

  const addProcedure = (procedure) => {
    // Ensure each procedure has a unique id
    procedure.id = Date.now(); // You can use a more robust method for generating unique IDs
    setRegisteredProcedures((prev) => [...prev, procedure]);
  };

  const cancelProcedure = (procedureId) => {
    setRegisteredProcedures((prev) => prev.filter((p) => p.id !== procedureId));
  };

  return (
    <ProceduresContext.Provider
      value={{ registeredProcedures, addProcedure, cancelProcedure }}
    >
      {children}
    </ProceduresContext.Provider>
  );
};

export const useProcedures = () => {
  return useContext(ProceduresContext);
};
