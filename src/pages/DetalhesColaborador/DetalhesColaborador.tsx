import { useLocation } from 'react-router-dom';

import { Titulo } from '../../components/Titulo/Titulo';

import { Box, Stack, Typography, Avatar } from '@mui/material';

export const DetalhesColaborador = () => {
  const { state } = useLocation()

  // const infosUsuario = JSON.parse(localStorage.getItem("infoUsuario") || "{}");
  // if (infosUsuario.cargo !== "Admin") return <Navigate to="/" />

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 64px)", paddingTop: "80px", paddingBottom: "50px" }}>
      <Titulo texto={`Detalhes de ${state.nome}`} />

      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: "var(--branco)", width: { xs: "95%", md: "70%", lg: "60%", xl: "50%" }, borderRadius: "10px", padding: { xs: 3, md: 5 }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: 3, flexWrap: "wrap" }}>

        <Stack component="div" sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Avatar alt="Foto Enviada" id="foto-enviada" src={`data:image/jpeg;base64,${state.foto}`} sx={{ width: 150, height: 150 }} />
        </Stack>

        <Stack component="div" spacing={3} sx={{ width: "100%", display: "flex", alignItems: { xs: "start", md: "start" }, flexWrap: "wrap" }}>
          <Box sx={{ width: "100%" }}>
            <Typography sx={{ fontSize: { xs: "18px", sm: "20px" }, whiteSpace: "wrap", overflow: "hidden", textOverflow: "ellipsis" }} id="id-colaborador">ID: <span style={{ fontWeight: "600" }}>{state.idUsuario}</span></Typography>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography sx={{ fontSize: { xs: "18px", sm: "20px" }, whiteSpace: "wrap", overflow: "hidden", textOverflow: "ellipsis" }} id="nome-colaborador">Nome: <span style={{ fontWeight: "600" }}>{state.nome}</span></Typography>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography sx={{ fontSize: { xs: "18px", sm: "20px" }, whiteSpace: "wrap", overflow: "hidden", textOverflow: "ellipsis" }} id="email-colaborador">E-mail: <span style={{ fontWeight: "600" }}>{state.email}</span></Typography>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography sx={{ fontSize: { xs: "18px", sm: "20px" }, whiteSpace: "wrap", overflow: "hidden", textOverflow: "ellipsis" }} id="cargo-colaborador">Cargo: <span style={{ fontWeight: "600" }}>{state.cargo}</span></Typography>
          </Box>
        </Stack>

      </Box>
    </Box>
  )
}
