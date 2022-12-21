import { useContext, useEffect } from "react";

import { Navigate } from "react-router-dom";

import { Header } from "../../components/Header/Header";
import { ListarAlunos } from "../../components/ListarAlunos/ListarAlunos";

import { AlunoContext } from "../../context/AlunoContext";

export const DashboardInstrutor = () => {
  const { getAlunos, alunos, deletarAluno } = useContext(AlunoContext);
  const infosUsuario = JSON.parse(localStorage.getItem("infoUsuario") || "{}");

  useEffect(() => { getAlunos(); }, [])
  
  if(infosUsuario.cargo !== "Instrutor") return <Navigate to="/"/>

  return (
    <>
      <Header />
      <ListarAlunos alunos={alunos} deletarAluno={deletarAluno} />
    </>
  );
};
