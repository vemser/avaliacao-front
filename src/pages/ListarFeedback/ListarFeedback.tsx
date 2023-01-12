import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

import { FeedbackContext } from "../../context/Comportamental/FeedbackContext";
import { IFeedbackElementos } from "../../utils/FeedbackInterface/Feedback";

import * as Componentes from "../../components";

import { Box, TablePagination, Button, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, tableCellClasses, Modal, styled, Tooltip, Typography } from "@mui/material";
import { Edit, DeleteForever, ExpandMore, ExpandLess } from "@mui/icons-material";
import { formatarTexto } from "../../utils/functions";

export const ListarFeedback: React.FC = () => {
  const navigate = useNavigate();
  const { pegarFeedback, feedback } = useContext(FeedbackContext);
  const { deletarFeedback } = useContext(FeedbackContext);
  const [inputFiltro, setInputFiltro] = useState<string>('');
  const [estadoFiltro, setEstadoFiltro] = useState<boolean>(false);

  const handleChangePage = async (event: unknown, newPage: number) => {
    if (inputFiltro) {
      filtrarFeedback(inputFiltro, newPage)
    } else {
      await pegarFeedback(newPage)
    }
  }

  const filtrarFeedback = async (valor: any, pagina: number = 0, tamanho: number = 10) => {
    setInputFiltro(valor);

    if (!isNaN(valor)) {
      await pegarFeedback(pagina, tamanho, `&idFeedback=${valor}`)
    } else {
      await pegarFeedback(pagina, tamanho, `&nome=${valor}`)
    }
  }


  useEffect(() => {
    pegarFeedback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Funções Modal
  const [idDelete, setIdDelete] = useState<number | undefined>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: { backgroundColor: theme.palette.common.black, color: theme.palette.common.white },
    [`&.${tableCellClasses.body}`]: { fontSize: 14 },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
    "&:last-child td, &:last-child th": { border: 0 },
  }));

  interface Column {
    id: "codigo" | "aluno" | "trilha" | "modulo" | "situacao" | "dataDeCriacao" | "acoes";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
  }

  const columns: Column[] = [
    { id: "codigo", label: "Código", minWidth: 5 },
    { id: "aluno", label: "Aluno", minWidth: 5 },
    { id: "trilha", label: "Trilha", minWidth: 5 },
    { id: "modulo", label: "Módulo", minWidth: 5 },
    { id: "situacao", label: "Situação", minWidth: 5 },
    { id: "dataDeCriacao", label: "Data de Criação", minWidth: 5 },
    { id: "acoes", label: "Ações", minWidth: 5 }
  ];

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

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "60px", paddingBottom: "50px" }}>
      <Componentes.Titulo texto="Feedbacks" />

      <Box sx={{ width: { xs: "95%", md: "90%" }, display: "flex", alignItems: "end", flexDirection: "column", paddingTop: "20px", background: "#FFF", borderRadius: "10px", boxShadow: "5px 5px 10px var(--azul</Box>-escuro-dbc)" }}>

        <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "10px", paddingInline: 2 }}>
          <Button onClick={() => { setEstadoFiltro(!estadoFiltro) }} id="botao-swap" variant='outlined' sx={{ width: "120px", display: "flex", textTransform: "capitalize", justifyContent: "space-between", fontSize: "1rem" }}>Filtros{estadoFiltro ? <ExpandLess /> : <ExpandMore />}</Button>

          <Button onClick={() => navigate("/cadastrar-feedback")} variant="contained" sx={{ width: "auto", display: "flex", textTransform: "capitalize", fontSize: "1rem" }}>Cadastrar Feedback</Button>
        </Box>

        {estadoFiltro &&
          <Box sx={{ display: "flex", gap: 3, flexDirection: "row", alignItems: "center", width: "100%", marginBottom: "10px", paddingInline: 2, marginTop: "10px", flexWrap: "wrap" }}>

            <Componentes.FiltroFeedback />

            {/* <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={top100Films}
              sx={{ minWidth: 200, display: "flex" }}
              renderInput={(params) => <TextField {...params} label="Movie" />}
            />

            <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={top100Films}
              sx={{ minWidth: 200, display: "flex" }}
              renderInput={(params) => <TextField {...params} label="Movie" />}
            />

            <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={top100Films}
              sx={{ minWidth: 200, display: "flex" }}
              renderInput={(params) => <TextField {...params} label="Movie" />}
            />

            <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={top100Films}
              sx={{ minWidth: 200, display: "flex" }}
              renderInput={(params) => <TextField {...params} label="Movie" />}
            />

            <Button variant="outlined" sx={{ width: "auto", display: "flex", textTransform: "capitalize", fontSize: "1rem" }}>Resetar Filtro</Button>

            <Button variant="contained" sx={{ width: "auto", display: "flex", textTransform: "capitalize", fontSize: "1rem" }}>Pesquisar</Button> */}
          </Box>}

        <Paper sx={{ width: "100%", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
          <TableContainer sx={{ maxHeight: 450 }}>
            <Table component="table" stickyHeader aria-label="sticky table">
              <TableHead sx={{ backgroundColor: "#090F27" }}>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: "16.6%", fontWeight: "700", fontSize: "1rem", textAlign: "center", backgroundColor: "#090F27", color: "white" }}>{column.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {feedback?.elementos.map((feedback: IFeedbackElementos) => (
                  <StyledTableRow key={feedback.idFeedBack}>

                    <StyledTableCell id="modulo" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }}>{feedback.idFeedBack}</StyledTableCell>

                    <Tooltip title={feedback.alunoDTO.nome} PopperProps={{ sx: { marginTop: "-25px !important" } }} arrow>
                      <StyledTableCell id="aluno" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }} component="td" scope="row">{feedback.alunoDTO.nome}</StyledTableCell>
                    </Tooltip>

                    <Tooltip title={feedback.alunoDTO.trilha.nome} PopperProps={{ sx: { marginTop: "-25px !important" } }} arrow>
                      <StyledTableCell id="trilha" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }}>{feedback.alunoDTO.trilha.nome}</StyledTableCell>
                    </Tooltip>

                    <Tooltip title={feedback.moduloDTO.map((modulo) => modulo.nome).join(", ")} PopperProps={{ sx: { marginTop: "-25px !important" } }} arrow>
                      <StyledTableCell id="modulo" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }}>{feedback.moduloDTO.map((modulo) => modulo.nome).join(", ")}</StyledTableCell>
                    </Tooltip>

                    <StyledTableCell id="stack" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", textTransform: "capitalize", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }}>{formatarTexto(feedback.situacao)}</StyledTableCell>

                    <StyledTableCell id="situacao" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", textTransform: "capitalize", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }}>{feedback.data.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1")}</StyledTableCell>

                    <StyledTableCell id="acoes" sx={{ justifyContent: "center", minWidth: "150px", display: "flex", wrap: "nowrap" }}>
                      <Button id={`botao-editar-${feedback.idFeedBack}`} title="Editar" onClick={() => navigate("/editar-feedback", { state: feedback })}><Edit /></Button>
                      <Button id={`botao-deletar-${feedback.idFeedBack}`} title="Deletar" onClick={() => { handleOpen(); setIdDelete(feedback.idFeedBack) }}><DeleteForever /></Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Paginação */}
          <TablePagination rowsPerPageOptions={[]} component="div" count={feedback ? feedback.totalElementos : 0} rowsPerPage={feedback ? feedback.tamanho : 0} page={feedback ? feedback.pagina : 0} onPageChange={handleChangePage} />

          {/* Modal Confirmar Delete */}
          <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-titulo" aria-describedby="modal-modal-description" sx={{ backdropFilter: "blur(6px)" }}>
            <Box sx={style}>
              <Typography id="modal-modal-titulo" variant="h6" sx={{ fontWeight: 600, userSelect: "none", marginBottom: "10px", color: "var(--azul-forte-dbc)", fontSize: "1.4rem" }}>Você tem certeza?</Typography>
              <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", bottom: 0, paddingTop: "20px", gap: 2, flexDirection: "column" }}>
                <Button type="button" onClick={() => { deletarFeedback(idDelete); handleClose(); }} variant="contained" color="error" sx={{ textTransform: "capitalize", fontSize: "1.05rem", width: "180px" }}>Deletar</Button>
                <Button type="button" onClick={handleClose} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d" }, textTransform: "capitalize", fontSize: "1.05rem", width: "180px" }}>Cancelar</Button>
              </Box>
            </Box>
          </Modal>

        </Paper>
      </Box>
    </Box>
  )
}