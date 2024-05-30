import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import UserProceduresList from "../UserProcedureList/UserProceduresList";

export default function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
