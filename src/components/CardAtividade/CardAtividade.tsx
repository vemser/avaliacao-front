import React, { useState } from 'react';
import {Box,  Button,  Divider,  IconButton, Modal, Typography} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from 'react-router-dom';


const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "5px",
  textAlign: "center",
  boxShadow: 24,
  p: 4,
};

export const CardAtividade: React.FC= () => {
  const navigate = useNavigate()

  const shadow = "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"

  // Funções Modal
  const [idDelete, setIdDelete] = useState<number | undefined>(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
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
            {/* Código: {props.idAtividade} */}
            Código: 10
          </Typography>
          <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
            <IconButton onClick={() => navigate("/editar-atividade")} >
              <EditIcon/>
            </IconButton>
            <IconButton onClick={() => { handleOpen();}}>
              <DeleteForeverIcon />
            </IconButton>
          </Box>
        </Box>
        <Typography sx={{textAlign: "center", fontWeight: "bold", fontSize: "18px"}}>
          {/* {props.titulo} */}
          Atividade de react
        </Typography>

        <Divider />

        <Box sx={{width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", margin: "auto", gap: "1rem"}}>
        <Typography fontSize={15}>
          {/* Peso: {props.pesoAtividade} */}
          Peso: 10
        </Typography>
        <Typography fontSize={15}>
          {/* Modulo: {props.modulos.map((modulo) => modulo.nome)} */}
          Modulo: Opp
        </Typography>
        <Typography fontSize={15}>
          {/* Situação: <span style={{color: `${props.situacao === "FECHADO" ? "#c62828": "#2e7d32"}`, fontWeight: "bold"}}>{props.situacao}</span> */}
          Situação: <span >Aberto</span>
        </Typography>
        <Typography fontSize={15}>
          {/* Data de entrega: {props.dataEntrega} */}
          Data de entrega: 10/01/2023

        </Typography>

        <Divider />

        {/* <Typography sx={{textAlign: "center", fontSize: "13px"}}>
        <b>{props.dataAbertura}</b> aberto até <b>{props.dataFechamento}</b>
        </Typography> */}
        
        {/* <Button variant="outlined" sx={{fontSize: "14px"}} disabled={props.situacao === "FECHADO" && true}>Reservar aluno para vaga</Button> */}
        </Box>
      </Box>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-titulo" aria-describedby="modal-modal-description" sx={{ backdropFilter: "blur(10px)" }}>
      <Box sx={style}>
        <Typography id="modal-modal-titulo" variant="h6" component="h2" color="error">Você realmente deseja excluir?</Typography>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", justifyContent: "center" }}>
          <Button id="botao-confirmar-modal" size="medium" color="success" type="submit" sx={{ mt: 2 }} variant="contained">Confirmar</Button>
          <Button id="botao-fechar-modal" onClick={handleClose} size="medium" type="submit" sx={{ mt: 2 }} variant="contained">Fechar</Button>
        </Box>
      </Box>
    </Modal>
   </>
  )
}