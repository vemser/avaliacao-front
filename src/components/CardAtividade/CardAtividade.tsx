import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import { Box, Button, Divider, IconButton, Modal, Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

import { IAtividadeApi } from '../../utils/AtividadeInterface/AtividadeInterface';
import { useAtividade } from '../../context/Tecnico/AtividadeContext';
import { formatarNomeCompleto } from '../../utils/functions';

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 320,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "5px",
  textAlign: "center",
  boxShadow: 20,
  p: 4,
};

export const CardAtividade: React.FC<IAtividadeApi> = (props) => {
  const { deletarAtividade } = useAtividade();
  const navigate = useNavigate();

  const shadow = "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"

  // Funções Modal
  const [idDelete, setIdDelete] = useState<number | undefined>(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dataFormatada = () => {
    let data: string = props.dataEntrega.split("T")[0].replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1");
    let hora: string | string[] = props.dataEntrega.split("T")[1].split(":");
    hora = `${hora[0]}:${hora[1]}`;
    return `${data} - ${hora}`;
  }

  return (
    <>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
        width: "280px",
        padding: "15px 20px",
        gap: "0.75rem",
        boxShadow: shadow, borderRadius: "10px"
      }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography sx={{ fontSize: 15 }}>
            Código: {props.idAtividade}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton title="Editar" onClick={() => navigate("/editar-atividade", { state: props })} >
              <EditIcon />
            </IconButton>
            <IconButton title="Deletar" onClick={() => { handleOpen(); setIdDelete(props.idAtividade) }}>
              <DeleteForeverIcon />
            </IconButton>
          </Box>
        </Box>
        <Typography sx={{ textAlign: "center", fontWeight: "bold", fontSize: "18px" }}>
          {props.titulo}
        </Typography>

        <Divider />

        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", margin: "auto", gap: "1rem" }}>
          <Typography fontSize={15}>
            Criada por: <span style={{ fontWeight: 600 }}>{formatarNomeCompleto(props.nomeInstrutor)}</span>
          </Typography>
          <Typography fontSize={15}>
            Peso: <span style={{ fontWeight: 600 }}>{props.pesoAtividade}</span>
          </Typography>
          <Typography fontSize={15}>
            Módulo: <span style={{ fontWeight: 600 }}>{props.modulos.map((modulo) => modulo.nome).join(", ")}</span>
          </Typography>
          <Typography fontSize={15}>
            Situação: <span style={{ color: `${props.ativo === "S" ? "#2e7d32" : "#c62828"} `, fontWeight: "bold" }}>{props.ativo === "S" ? "Ativa" : "Inativa"}</span>
          </Typography>
          <Typography fontSize={15}>
            Descrição: <span style={{ fontWeight: 600 }}>{props.descricao}</span>
          </Typography>
          <Divider />
          <Typography sx={{ textAlign: "center", fontSize: "13px" }}>
            Prazo de entrega: <b>{dataFormatada()}</b>
          </Typography>
        </Box>
      </Box>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-titulo" aria-describedby="modal-modal-description" sx={{ backdropFilter: "blur(6px)" }}>
        <Box sx={style}>
          <Typography id="modal-modal-titulo" variant="h6" sx={{ fontWeight: 600, userSelect: "none", marginBottom: "10px", color: "var(--azul-forte-dbc)", fontSize: "1.4rem" }}>Você tem certeza?</Typography>          
          <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", bottom: 0, paddingTop: "20px", gap: 2, flexDirection: "column" }}>
            <Button type="button" onClick={() => { if (idDelete) deletarAtividade(idDelete); handleClose(); }} variant="contained" color="error" sx={{ textTransform: "capitalize", fontSize: "1.05rem", width: "180px" }}>Deletar</Button>
            <Button type="button" onClick={handleClose} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d" }, textTransform: "capitalize", fontSize: "1.05rem", width: "180px" }}>Cancelar</Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}