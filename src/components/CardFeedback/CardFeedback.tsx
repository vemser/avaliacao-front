import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Divider, IconButton, Modal, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { IFeedbackElementos } from '../../utils/FeedbackInterface/Feedback';
import { formatarTexto } from '../../utils/functions';

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

export const CardFeedback: React.FC<IFeedbackElementos> = (props) => {
    const navigate = useNavigate();

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
                backgroundColor: "#f5f5f5",
                width: "280px",
                padding: "15px 20px",
                gap: "0.75rem",
                boxShadow: shadow, borderRadius: "10px"
            }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ fontSize: 15 }}>
                        Código: {props.idFeedBack}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <IconButton onClick={() => navigate("/editar-feedback", { state: props })} >
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => { handleOpen(); setIdDelete(props.idFeedBack) }}>
                            <DeleteForeverIcon />
                        </IconButton>
                    </Box>
                </Box>

                <Typography sx={{ textAlign: "center", fontSize: "18px" }}>
                     <span style={{ fontWeight: "bold", color: `${props.situacao === "POSITIVO" ? "#2e7d32" : "#c62828"} ` }}>Feedback {formatarTexto(props.situacao)}</span>
                </Typography>

                <Divider />

                <Box sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", margin: "auto", gap: "1rem" }}>
                    <Typography fontSize={15}>
                        Aluno: <span style={{ fontWeight: 600 }}>{props.alunoDTO.nome}</span>
                    </Typography>
                    <Typography fontSize={15}>
                        Descrição: <span style={{ fontWeight: 600 }}>{props.descricao}</span>
                    </Typography>
                
                <Divider />

                <Typography sx={{ textAlign: "center", fontSize: "13px" }}>
                    Data do feedback: <b>{props.data.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1")}</b>
                    </Typography>
                </Box>
            </Box>

            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-titulo" aria-describedby="modal-modal-description" sx={{ backdropFilter: "blur(10px)" }}>
                <Box sx={style}>
                    <Typography id="modal-modal-titulo" variant="h6" component="h2" color="error">Você realmente deseja excluir?</Typography>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center", justifyContent: "center" }}>
                        {/* <Button id="botao-confirmar-modal" onClick={() => { if (idDelete) deletarAtividade(idDelete); handleClose(); }} size="medium" color="success" type="submit" sx={{ mt: 2 }} variant="contained">Confirmar</Button> */}
                        <Button id="botao-fechar-modal" onClick={handleClose} size="medium" type="submit" sx={{ mt: 2 }} variant="contained">Fechar</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}