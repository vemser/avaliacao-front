import { Box, Stack, FormControl, TextField, Typography, Avatar, Button } from '@mui/material';
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { BotaoVerde } from '../../components/BotaoVerde/BotaoVerde';
import { Header } from '../../components/Header/Header';
import { Titulo } from '../../components/Titulo/Titulo';

export const DetalhesColaborador = () => {
  const { state } = useLocation()

  const infosUsuario = JSON.parse(localStorage.getItem("infoUsuario") || "{}");
  if(infosUsuario.cargo !== "Admin") return <Navigate to="/"/>

  return (
    <>
      <Header />
      <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center",justifyContent: "center", height:"calc(100vh - 64px)" }}>
        <Titulo texto="Detalhes colaborador" />

        <Box sx={{ display: { xs:"block", md:"flex" }, justifyContent: "space-between", backgroundColor: "#fff", width: { xs:"90%", md:"50%" }, borderRadius: "10px", padding: { xs: 2, md: 5 }, boxShadow: "10px 10px 10px #2f407ccf" }}>

          <Stack component="div" spacing={2} sx={{ width:{ xs:"100%", md:"80%" }, display: "flex", alignItems:{ xs:"start", md:"start" }, flexWrap: { xs: "wrap", md: "nowrap" } }}>

            <Box>
              <Typography sx={{ fontSize: { xs: "20px", md: "22px"} }} id="id-colaborador">ID do Colaborador: <span style={{ fontWeight: "700" }}>{state.idUsuario}</span></Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: { xs: "20px", md: "22px"} }} id="nome-colaborador">Nome do Colaborador: <span style={{ fontWeight: "700" }}>{state.nome}</span></Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: { xs: "20px", md: "22px"} }} id="email-colaborador">Email do Colaborador: <span style={{ fontWeight: "700" }}>{state.email}</span></Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: { xs: "20px", md: "22px"} }} id="cargo-colaborador">Cargo do Colaborador: <span style={{ fontWeight: "700" }}>{state.cargo}</span></Typography>
            </Box>
          </Stack>

          <Stack component="div" spacing={2} sx={{ width: { xs:"100%", md:"20%" }, display: "flex", alignItems: "center", justifyContent: "center" ,marginTop:{ xs:2, md:0 }}}>
            <Avatar alt="Foto Enviada" id="foto-enviada" src={`data:image/jpeg;base64,${state.foto}`} sx={{ width: 100, height: 100 }} />
          </Stack>
        </Box>
      </Box>
    </>
  )
}
