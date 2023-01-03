import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button } from '@mui/material';

import * as Components from "../../components";

export const ListarAtividade: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 64px)", paddingTop: "80px", paddingBottom: "50px" }}>
      <Components.Titulo texto="Atividades"/>

      <Box sx={{ width: { xs: "95%", md: "80%" }, backgroundColor: "var(--branco)", borderRadius: "10px", boxShadow: "10px 10px 10px var(--azul</Box>-escuro-dbc)", padding: "20px" }}>
        
        <Box sx={{display: "flex",  width: "100%", alignItems: "center", justifyContent: "space-between", gap: 2, flexDirection: { xs: "column", sm: "row" }}}>
          {/* <Components.CampoBusca label='Nome' buscar={buscarPorNomeVaga} resetar={resetBuscaVaga}/> */}
          <Button variant="contained" onClick={() => navigate("/cadastrar-atividade")} sx={{ width: "auto", paddingLeft: "15px", paddingRight: "15px", display: "flex", marginBottom: "10px", textTransform: "capitalize", fontSize: "1rem" }}>Cadastrar Atividade</Button>
        </Box>

        <Box sx={{display: "flex", flexWrap: "wrap", width: "100%", justifyContent: "center", gap: "2rem", mt: 5}}>
        <Components.CardAtividade />
        <Components.CardAtividade />
        <Components.CardAtividade />
        <Components.CardAtividade />

        </Box>
      </Box>
    </Box>
  )
}