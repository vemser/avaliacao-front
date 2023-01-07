import React, { useState } from 'react';
import {Box,  Button,  Divider,  IconButton, Modal, Typography} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from 'react-router-dom';
import { IVagaApi } from '../../utils/VagaInterface/vaga';
import { useVaga } from '../../context/Alocacao/VagaContext';

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

export const CardVaga: React.FC<IVagaApi> = (props) => {
  const { deletarVaga } = useVaga()
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
          <Typography sx={{ fontSize: 15 }}>
            Código: {props.idVaga}
          </Typography>
          <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
            <IconButton onClick={() => navigate("/editar-vaga", {state: props})} >
              <EditIcon/>
            </IconButton>
            <IconButton onClick={() => { handleOpen(); setIdDelete(props.idVaga) }}>
              <DeleteForeverIcon />
            </IconButton>
          </Box>
        </Box>
        <Typography sx={{textAlign: "center", fontWeight: "bold", fontSize: "18px", color: "var(--azul-forte-dbc)"}}>
          {props.nome}
        </Typography>

        <Divider />

        <Box sx={{width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", margin: "auto", gap: "1rem"}}>
        <Typography fontSize={15}>
          Total de vagas: <span style={{ fontWeight: 600 }}>{props.quantidade}</span>
        </Typography>
        <Typography fontSize={15}>
          Vagas disponíveis: <span style={{ fontWeight: 600 }}>{props.quantidadeAlocados}</span>
        </Typography>
        <Typography fontSize={15}>
          Situação: <span style={{color: `${props.situacao === "FECHADO" ? "#c62828": "#2e7d32"}`, fontWeight: "bold"}}>{props.situacao}</span>
        </Typography>
        <Typography fontSize={15}>
          Cliente: <span style={{ fontWeight: 600 }}>{props.cliente.nome}</span>
        </Typography>

        <Divider />

        <Typography sx={{textAlign: "center", fontSize: "13px"}}>
        <b>{props.dataAbertura.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1")}</b> aberto até <b>{props.dataFechamento.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1")}</b>
        </Typography>
        
        <Button variant="outlined" sx={{fontSize: "14px"}} disabled={props.situacao === "FECHADO" && true}>Reservar aluno para vaga</Button>
        </Box>
      </Box>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-titulo" aria-describedby="modal-modal-description" sx={{ backdropFilter: "blur(10px)" }}>
      <Box sx={style}>
        <Typography id="modal-modal-titulo" variant="h6" component="h2" color="error">Você realmente deseja excluir?</Typography>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", justifyContent: "center" }}>
          <Button id="botao-confirmar-modal" onClick={() => { if(idDelete) deletarVaga(idDelete); handleClose(); }} size="medium" color="success" type="submit" sx={{ mt: 2 }} variant="contained">Confirmar</Button>
          <Button id="botao-fechar-modal" onClick={handleClose} size="medium" type="submit" sx={{ mt: 2 }} variant="contained">Fechar</Button>
        </Box>
      </Box>
    </Modal>
   </>
  )
}
