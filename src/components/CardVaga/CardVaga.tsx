import React from 'react';
import {Box,  Button,  Divider,  IconButton, Typography} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface IProps {
  situacao: string;
}
export const CardVaga: React.FC<IProps> = ({ situacao }) => {

  const shadow = "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#f5f5f5" ,
      width: "280px",
      padding: "15px 20px",
      gap: "0.75rem",
      boxShadow: shadow, borderRadius: "10px"
    }}>
      <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <Typography>
          Código: 222
        </Typography>
        <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
          <IconButton>
            <EditIcon/>
          </IconButton>
          <IconButton>
            <DeleteForeverIcon />
          </IconButton>
        </Box>
      </Box>
      <Typography sx={{textAlign: "center", fontWeight: "bold", fontSize: "18px"}}>
        Desenvolvedor full-stack
      </Typography>

      <Divider />

      <Box sx={{width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", margin: "auto", gap: "1rem"}}>
      <Typography fontSize={15}>
        Total de vagas: 10
      </Typography>
      <Typography fontSize={15}>
        Vagas disponíveis: 10
      </Typography>
      <Typography fontSize={15}>
        Situação: <span style={{color: `${situacao === "FECHADO" ? "#c62828": "#2e7d32"}`, fontWeight: "bold"}}>{situacao}</span>
      </Typography>
      <Typography fontSize={15}>
        Cliente: Sicred
      </Typography>

      <Divider />

      <Typography sx={{textAlign: "center", fontSize: "13px"}}>
       <b>20/12/2022</b> aberto até <b>22/12/2022</b>
      </Typography>
      
      <Button variant="outlined" sx={{fontSize: "14px"}} disabled={situacao === "FECHADO" && true}>Reservar aluno para vaga</Button>
      </Box>
    </Box>
  )
}
