import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import * as Components from "../index";

export const RotaPrivada = () => {
  const token = localStorage.getItem('token');
  return token ? (<Components.MenuLateral><Outlet /></Components.MenuLateral>) : <Navigate to="/" />;
}

export const ComportamentalRotas = () => {
  const { cargos, decodificarJWT } = useAuth();

  useEffect(() => {
    decodificarJWT();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return cargos.some((cargo: string) => cargo === "ROLE_ADMIN" || cargo === "ROLE_GESTOR" || cargo === "ROLE_GESTAO_DE_PESSOAS" || cargo === "ROLE_INSTRUTOR") ? (<Outlet />) : <Navigate to="/home" />
}

export const TecnicoRotas = () => {
  const { cargos, decodificarJWT } = useAuth();

  useEffect(() => {
    decodificarJWT();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return cargos.some((cargo: string) => cargo === "ROLE_ADMIN" || cargo === "ROLE_GESTOR" || cargo === "ROLE_GESTAO_DE_PESSOAS" || cargo === "ROLE_INSTRUTOR") ? (<Outlet />) : <Navigate to="/home" />
}

export const AlocacaoRotas = () => {
  const { cargos, decodificarJWT } = useAuth();

  useEffect(() => {
    decodificarJWT();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return cargos.some((cargo: string) => cargo === "ROLE_ADMIN" || cargo === "ROLE_GESTOR" || cargo === "ROLE_GESTAO_DE_PESSOAS") ? (<Outlet />) : <Navigate to="/home" />
}

