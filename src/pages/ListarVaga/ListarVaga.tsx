import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import * as Components from "../../components";

export const ListarVaga: React.FC = () => {
  return (
    <Box sx={{ minHeight: "calc(100vh - 64px)", paddingTop: "50px", paddingBottom: "50px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 5 }}>
      <Components.Titulo texto="Vagas"/>

    <Box sx={{width: "80%", backgroundColor: "var(--branco)",borderRadius: "10px", boxShadow: "10px 10px 10px var(--azul</Box>-escuro-dbc)", padding: "20px"}}>
        <Box sx={{display: "flex",  width: "100%", alignItems: "center", justifyContent: "space-between"}}>
          <TextField label="Pesquisar" placeholder="Digite o código da vaga"/>
          <Button variant="contained" sx={{ width: "200px", whiteSpace: "nowrap", display: "flex" }}>Cadastrar Vaga</Button>
        </Box>
        <Box sx={{display: "flex", flexWrap: "wrap", width: "100%", justifyContent: "center", gap: "2rem", mt: 5}}>
          <Components.CardVaga situacao="FECHADO"/>
          <Components.CardVaga situacao="ABERTO"/>
          <Components.CardVaga situacao="FECHADO"/>
          <Components.CardVaga situacao="ABERTO"/>
        </Box>
      </Box>
    </Box>
    
  )
}
