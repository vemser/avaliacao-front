import React from "react";

import { ListarAlunos } from "../../components/ListarAlunos/ListarAlunos";

export const DashboardGestor: React.FC = () => {
  // const infosUsuario = JSON.parse(localStorage.getItem("infoUsuario") || "{}");
  
  // if(infosUsuario.cargo !== "Gestor de Pessoas") return <Navigate to="/"/>

  return (
    <>
      <ListarAlunos />
    </>
  );
};
