import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Paper } from "@mui/material";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

import { ListarTrilha } from "../../components/ListarTrilha/ListarTrilha";
import { ListarPrograma } from "../../components/ListarPrograma/ListarPrograma";
import * as Componentes from "../../components";
import { usePrograma } from "../../context/Tecnico/ProgramaContext";

export const TrilhaPrograma = () => {
  const navigate = useNavigate()
  const [mudaDashboard, setMudaDashboard] = useState(false)
  const { pegarProgramaPorNome, pegarPrograma } = usePrograma()

  const trocarTabela = () => !mudaDashboard ? setMudaDashboard(true) : setMudaDashboard(false)

  const buscarPorNomePrograma = async (valor: string) => {
    await pegarProgramaPorNome(valor);
  }

  const resetBuscaPrograma = async () => {
    await pegarPrograma();
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 64px)", paddingTop: "80px", paddingBottom: "50px" }}>
      {!mudaDashboard &&
        <>
          <Componentes.Titulo texto="Trilhas" />

          <Box sx={{ width: { xs: "95%", md: "80%" }, display: "flex", alignItems: "end", flexDirection: "column", paddingTop: "20px", background: "#FFF", borderRadius: "10px", boxShadow: "5px 5px 10px var(--azul</Box>-escuro-dbc)" }}>

            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: "center", width: "100%" }}>
              <Button onClick={trocarTabela} id="botao-swap" variant='outlined' sx={{ width: { xs: "260px", md: "auto" }, paddingLeft: "15px", paddingRight: "15px", display: "flex", marginBottom: "10px", marginLeft: { xs: "0", md: "14px" }, textTransform: "capitalize", fontSize: "1rem" }}>Programas <SwapHorizIcon /></Button>
              <Button onClick={() => navigate("/cadastrar-trilha")} variant="contained" sx={{ width: { xs: "260px", md: "auto" }, paddingLeft: "15px", paddingRight: "15px", display: "flex", marginBottom: "10px", marginRight: { xs: "0", md: "14px" }, textTransform: "capitalize", fontSize: "1rem" }}>Cadastrar Trilha</Button>
            </Box>

            <Paper sx={{ width: "100%", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
              <ListarTrilha />
            </Paper>
          </Box>
        </>
      }
      {mudaDashboard &&
        <>
          <Componentes.Titulo texto="Programas" />

          <Box sx={{ width: { xs: "95%", md: "80%" }, display: "flex", alignItems: "end", flexDirection: "column", paddingTop: "20px", background: "#FFF", borderRadius: "10px", boxShadow: "5px 5px 10px var(--azul</Box>-escuro-dbc)" }}>

            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: "center", width: "100%" }}>
              <Button onClick={trocarTabela} id="botao-swap" variant='outlined' sx={{ width: { xs: "260px", md: "auto" }, paddingLeft: "15px", paddingRight: "15px", display: "flex", marginBottom: "10px", marginLeft: { xs: "0", md: "14px" }, textTransform: "capitalize", fontSize: "1rem" }}>Trilhas <SwapHorizIcon /></Button>
              <Componentes.CampoBusca label="Buscar por nome" buscar={buscarPorNomePrograma}/>
              <Button onClick={() => navigate("/cadastrar-programa")} variant="contained" sx={{ width: { xs: "260px", md: "auto" }, paddingLeft: "15px", paddingRight: "15px", display: "flex", marginBottom: "10px", marginRight: { xs: "0", md: "14px" }, textTransform: "capitalize", fontSize: "1rem" }}>Cadastrar Programa</Button>
            </Box>

            <Paper sx={{ width: "100%", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
              <ListarPrograma />
            </Paper>
          </Box>
        </>
      }
    </Box>
  )
}
