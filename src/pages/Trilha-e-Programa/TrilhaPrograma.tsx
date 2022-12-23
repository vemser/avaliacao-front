import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Paper, Typography } from "@mui/material"
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

import { Header } from "../../components/Header/Header"
import { ListarTrilha } from "../../components/ListarTrilha/ListarTrilha"
import { ListarPrograma } from "../../components/ListarPrograma/ListarPrograma";

export const TrilhaPrograma = () => {
  const navigate = useNavigate()
  const [mudaDashboard, setMudaDashboard] = useState(false)
  
  const trocarTabela = () => !mudaDashboard ? setMudaDashboard(true) : setMudaDashboard(false)

  return (
    <>
      <Box sx={{ height: "calc(100vh - 64px)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 5 }}>
        {!mudaDashboard && 
          <>
            <Typography sx={{ textAlign: "center", fontWeight: "700", fontSize: { xs: 30, md: 44 }, color: "white" }} variant="h3">Dashboard Trilhas</Typography>
            <Paper sx={{ width: { xs: "95%", md: "60%" }, borderRadius: "10px", boxShadow: "10px 10px 10px var(--azul-escuro-dbc)", backgroundColor: "#f8f8fff8", display: "flex", flexDirection: "column", padding: "10px 15px 10px 15px" }}>

              <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", paddingRight: "10px" }}>
                <Button size="medium" variant='outlined' id="botao-swap" title="Trocar tabela" onClick={trocarTabela}>Programas <SwapHorizIcon /> </Button>
                <Button size="medium" variant='contained' id="cadastrar-trilha" onClick={() => navigate("/cadastrar-trilha")}>Cadastrar Trilha</Button>
              </Box>

              <ListarTrilha />
            </Paper>
          </>
        }
        {mudaDashboard && 
          <>
            <Typography sx={{ textAlign: "center", fontWeight: "700", fontSize: { xs: 30, md: 44 }, color: "white" }} variant="h3">Dashboard Programas</Typography>
            <Paper sx={{ width: { xs: "95%", md: "60%" }, borderRadius: "10px", boxShadow: "10px 10px 10px var(--azul-escuro-dbc)", backgroundColor: "#f8f8fff8", display: "flex", flexDirection: "column", padding: "10px 15px 10px 15px" }}>

              <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", paddingRight: "10px" }}>
                <Button size="medium" variant='outlined' id="botao-swap" title="Trocar tabela" onClick={trocarTabela}>Trilhas <SwapHorizIcon /></Button>
                <Button size="medium" variant='contained' id="cadastrar-programa" onClick={() => navigate("/cadastrar-programa")}>Cadastrar Programa</Button>
              </Box>

              <ListarPrograma />
            </Paper>
          </>
        }
      </Box>
    </>
  )
}
