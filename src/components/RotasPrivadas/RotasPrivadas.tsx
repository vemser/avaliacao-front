import { Outlet, Navigate } from "react-router-dom";

import * as Components from "../index";

export const RotaPrivada = () => {
  const token = localStorage.getItem('token');
  return token ? (<Components.MenuLateral><Outlet /></Components.MenuLateral>) : <Navigate to="/"/>;
}

export const ComportamentalRotas = () => {
  const cargo = JSON.parse(localStorage.getItem("cargo") || "{}");

  return cargo.some( (cargo: string) => cargo === "Administrador" || cargo === "Coordenador" || cargo === "Gestão de pessoas" || cargo === "Instrutor" ) ? (<Outlet />) : <Navigate to="/home"/> 
}

export const TecnicoRotas = () => {
  const cargo = JSON.parse(localStorage.getItem("cargo") || "{}");

  return cargo.some( (cargo: string) => cargo === "Administrador" || cargo === "Coordenador" || cargo === "Gestão de pessoas" || cargo === "Instrutor" ) ? (<Outlet />) : <Navigate to="/home"/> 
}

export const AlocacaoRotas = () => {
  const cargo = JSON.parse(localStorage.getItem("cargo") || "{}");

  return cargo.some( (cargo: string) => cargo === "Administrador" || cargo === "Coordenador" || cargo === "Gestão de pessoas" ) ? (<Outlet />) : <Navigate to="/home"/> 
}

