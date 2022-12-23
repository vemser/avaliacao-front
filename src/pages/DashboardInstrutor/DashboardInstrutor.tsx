import React from "react";

// import { Navigate } from "react-router-dom";

import { Header } from "../../components/Header/Header";
import { ListarAlunos } from "../../components/ListarAlunos/ListarAlunos";

export const DashboardInstrutor: React.FC = () => {
  // const infosUsuario = JSON.parse(localStorage.getItem("infoUsuario") || "{}");

  // if(infosUsuario.cargo !== "Instrutor") return <Navigate to="/"/>

  return (
    <>
      <ListarAlunos  />
    </>
  );
};
