import { Box } from "@mui/material"
import { useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import logo from "../../assets/logo-branco.webp";

export const Intermediaria = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const tokenRecuperarSenha = search.split("=")[1];

  useEffect(() => {
    if(tokenRecuperarSenha){
      localStorage.setItem("recuperarSenha", tokenRecuperarSenha)
      navigate("/redefinir-senha")
    }
  }, [tokenRecuperarSenha])

  return (
    <>
      <Box component="main" sx={{ height:"100vh",width:"100vw",display:"flex",alignItems:"center",justifyContent:"center" }}>
        <img src={logo} width={300} alt="Logo DBC Branco" />
      </Box>
    </>
  )
}
