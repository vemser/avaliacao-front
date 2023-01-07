import React, { useState } from 'react';
import { Box, Button, Divider, IconButton, Modal, Typography } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from 'react-router-dom';
import { useAtividade } from '../../context/Tecnico/AtividadeContext';
import { Opacity } from '@mui/icons-material';


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

export const CardAtividadeAluno: React.FC = () => {
  const navigate = useNavigate();

  const shadow = "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"

  // // Funções Modal
  // const [idDelete, setIdDelete] = useState<number | undefined>(0);
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // const dataFormatada = () => {
  //   let data: string = props.dataEntrega.split("T")[0].replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1");
  //   let hora: string | string[] = props.dataEntrega.split("T")[1].split(":");
  //   hora = `${hora[0]}:${hora[1]}`;
  //   return `${data} - ${hora}`;
  // }

  return (
    <>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
        width: "280px",
        padding: "15px 20px",
        gap: "0.75rem",
        boxShadow: shadow,
        borderRadius: "10px",
        '&:hover': {
          opacity: [0.6],
          cursor: "pointer",
        },
      }}
        onClick={() => { navigate("/entregar-atividade") }}>
        <Typography sx={{ textAlign: "center", fontWeight: "bold", fontSize: "18px" }}>
          Titulo
        </Typography>

        <Divider />

        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", margin: "auto", gap: "1rem" }}>
          <Typography fontSize={15}>
            Nota: 0/10
          </Typography>
          <Typography fontSize={15}>
            Modulo: React, Mui
          </Typography>
          <Typography fontSize={15}>
            Situação: <span style={{ color: "#c62828", fontWeight: "bold" }}>Pendente</span>
          </Typography>
          <Typography fontSize={15}>
            Prazo de entrega: <b>20/10/2023 - 17:30</b>
          </Typography>
        </Box>
        <Divider />
      </Box>

      {/* <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-titulo" aria-describedby="modal-modal-description" sx={{ backdropFilter: "blur(10px)" }}>
        <Box sx={style}>
          <Typography id="modal-modal-titulo" variant="h6" component="h2" color="error">Você realmente deseja excluir?</Typography>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", justifyContent: "center" }}>
            <Button id="botao-confirmar-modal" onClick={() => { if (idDelete) deletarAtividade(idDelete); handleClose(); }} size="medium" color="success" type="submit" sx={{ mt: 2 }} variant="contained">Confirmar</Button>
            <Button id="botao-fechar-modal" onClick={handleClose} size="medium" type="submit" sx={{ mt: 2 }} variant="contained">Fechar</Button>
          </Box>
        </Box>
      </Modal> */}
    </>
  )
}