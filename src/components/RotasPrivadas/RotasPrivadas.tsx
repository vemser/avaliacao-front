import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const RotaPrivada = () => {
  const { tokenAuth } = useContext(AuthContext);

  return tokenAuth ? <Outlet /> : <Navigate to="/"/>;
}