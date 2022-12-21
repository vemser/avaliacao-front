import { useContext, useEffect } from "react";

import { Navigate } from "react-router-dom";

import { Header } from "../../components/Header/Header";
import { ListarAlunos } from "../../components/ListarAlunos/ListarAlunos";

import { AlunoContext } from "../../context/AlunoContext";

export const DashboardGestor = () => {
  const infosUsuario = JSON.parse(localStorage.getItem("infoUsuario") || "{}");
  const { getAlunos, alunos, deletarAluno } = useContext(AlunoContext);

  useEffect(() => { getAlunos(); }, [])

  if(infosUsuario.cargo !== "Gestor de Pessoas") return <Navigate to="/"/>

  return (
    <>
      <Header />
      <ListarAlunos alunos={alunos} deletarAluno={deletarAluno} />
    </>
  );
};
