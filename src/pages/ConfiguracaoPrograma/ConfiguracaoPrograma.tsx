import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"

import { Box, Typography, Stack, Button, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableRow, TableHead, Modal } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import * as Componentes from "../../components";

import { generateRandomId } from "../../utils/functions";
import { usePrograma } from "../../context/Tecnico/ProgramaContext";
import { useModulo } from "../../context/Tecnico/ModuloContext";
import { ITrilhas } from "../../utils/programaInterface";
import { useTrilha } from "../../context/Tecnico/TrilhaContext";

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: { backgroundColor: theme.palette.common.black, color: theme.palette.common.white },
  [`&.${tableCellClasses.body}`]: { fontSize: 14 },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
  "&:last-child td, &:last-child th": { border: 10 },
}));

interface Column {
  id: "nome" | "acoes";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: Column[] = [
  { id: "nome", label: "Módulo", minWidth: 5 },
  { id: "acoes", label: "Ações", minWidth: 5 }
];

export const ConfiguracaoPrograma: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { pegarProgramaCompleto, programaCompleto } = usePrograma();
  const { deletarTrilha } = useTrilha();
  const { deletarModulo } = useModulo();
  const [idTrilhaDelete, setIdTrilhaDelete] = useState<number | undefined>();
  const [idModuloDelete, setIdModuloDelete] = useState<number | undefined>();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    pegarProgramaCompleto(state.idPrograma);
  }, [])

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "60px", paddingBottom: "50px" }}>
      <Componentes.Titulo texto={state.nome} />

      <Box component="div" sx={{ width: { xs: "95%", md: "90%" }, display: "flex", alignItems: "end", flexDirection: "column", padding: "20px", background: "#FFF", borderRadius: "10px", boxShadow: "5px 5px 10px var(--azul</Box>-escuro-dbc)" }}>

        <Stack component="div" spacing={3} sx={{ width: "100%", display: "flex", alignItems: { xs: "start", md: "start" } }}>

          <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "10px" }}>
            <Button onClick={() => { navigate(-1) }} variant="outlined" sx={{ width: { xs: "170px", md: "160px" }, textTransform: "capitalize", fontSize: "1rem" }}>Voltar</Button>

            <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" } }}>
              <Button onClick={() => navigate("/cadastrar-trilha", { state: state.idPrograma })} variant="contained" sx={{ width: "170px", display: "flex", textTransform: "capitalize", fontSize: "1rem" }}>Cadastrar Trilha</Button>

              <Button onClick={() => navigate("/cadastrar-modulo")} variant="contained" sx={{ width: "170px", display: "flex", textTransform: "capitalize", fontSize: "1rem" }}>Cadastrar Módulo</Button>
            </Box>
          </Box>

          {programaCompleto?.trilha && programaCompleto?.trilha.map((trilha: ITrilhas) => {
            return (
              <>
                <Box key={generateRandomId()} sx={{ width: "100%", marginBottom: "-15px !important", display: "flex", gap: "15px", alignItems: "center", justifyContent: {sx: "space-between", sm: "left"} }}>
                  <Typography sx={{ display: "block", fontWeight: 700, color: "var(--azul-claro-dbc)", fontSize: "1.5rem", userSelect: "none" }}>Trilha {trilha.nome}</Typography>

                  <Box id="acoes-trilha" sx={{ display: "flex", gap: "15px", justifyContent: "center", alignItems: "center", flexWrap: "nowrap", color: "#1976d2" }}>
                    <EditIcon onClick={() => { navigate("/editar-modulo") }} sx={{ cursor: "pointer", ":hover": { color: "#1976d2" } }} />
                    <DeleteForeverIcon onClick={() => { handleOpen(); setIdTrilhaDelete(trilha.idTrilha) }} sx={{ cursor: "pointer", ":hover": { color: "#1976d2" } }} />
                  </Box>
                </Box>

                <Paper sx={{ width: "100%", marginBottom: "20px !important" }} key={generateRandomId()}>
                  <TableContainer sx={{ boxShadow: "5px 5px 5px solid light-gray" }}>
                    <Table aria-label="sticky table" sx={{ width: "100%" }}>

                      <TableHead sx={{ backgroundColor: "#090F27", width: "100%" }}>
                        <TableRow sx={{ minWidth: "100%" }}>
                          {columns.map((column) => (
                            <TableCell key={column.id} align={column.align} style={{ width: "50%", fontWeight: "700", fontSize: "1rem", textAlign: "center", userSelect: "none", backgroundColor: "#090F27", color: "white" }}>{column.label}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {trilha.moduloDTOS.length > 0 ? trilha.moduloDTOS.map((data) => (
                          <StyledTableRow key={generateRandomId()}>
                            <StyledTableCell sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", userSelect: "none" }} component="td" scope="row">{data.nome}</StyledTableCell>

                            <StyledTableCell id="acoes" sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "nowrap" }}>
                              <Button id="botao-editar-modulo" onClick={() => { navigate("/editar-modulo") }} title="Editar"><EditIcon /></Button>
                              <Button id="botao-deletar-modulo" title="Deletar" onClick={() => { handleOpen(); setIdModuloDelete(data.idModulo) }}><DeleteForeverIcon /></Button>
                            </StyledTableCell>
                          </StyledTableRow>
                        )) :
                          <StyledTableRow key={generateRandomId()}>
                            <StyledTableCell sx={{ textAlign: "center", fontWeight: "500", fontSize: "1rem", userSelect: "none", color: "gray" }}>
                              Nenhum módulo encontrado.
                            </StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                          </StyledTableRow>
                        }
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </>
            )
          })} {
            programaCompleto?.trilha.length === 0 &&
            <Box key={generateRandomId()} sx={{ width: "100%", display: "flex", justifyContent: "center", paddingTop: "40px", paddingBottom: "50px", fontSize: "1.2rem", fontWeight: 500, userSelect: "none", color: "gray", textAlign: "center" }}>
              <span>Nenhuma trilha encontrada neste programa.</span>
            </Box>
          }
        </Stack>

        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-titulo" aria-describedby="modal-modal-description" sx={{ backdropFilter: "blur(6px)" }}>
          <Box sx={style}>
            <Typography id="modal-modal-titulo" variant="h6" sx={{ fontWeight: 600, userSelect: "none", marginBottom: "10px", color: "var(--azul-forte-dbc)", fontSize: "1.4rem" }}>Você tem certeza?</Typography>
            <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", bottom: 0, paddingTop: "20px", gap: 2, flexDirection: "column" }}>
              <Button type="button" onClick={() => {
                if (idTrilhaDelete) {
                  deletarTrilha(idTrilhaDelete);
                  pegarProgramaCompleto(state.idPrograma);
                  setIdTrilhaDelete(undefined);
                  handleClose();
                } if (idModuloDelete) {
                  deletarModulo(idModuloDelete);
                  pegarProgramaCompleto(state.idPrograma);
                  setIdModuloDelete(undefined);
                  handleClose();
                }
              }} variant="contained" color="error" sx={{ textTransform: "capitalize", fontSize: "1.05rem", width: "180px" }}>Deletar</Button>
              <Button type="button" onClick={handleClose} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d" }, textTransform: "capitalize", fontSize: "1.05rem", width: "180px" }}>Cancelar</Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  )
}
