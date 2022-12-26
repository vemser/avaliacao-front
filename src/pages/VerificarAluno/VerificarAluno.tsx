import React, { useContext, useEffect } from "react";

import { Navigate, useLocation, useNavigate } from "react-router-dom"

import { TablePagination, Box, Typography, Stack, Button, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableRow, Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { GestorContext } from "../../context/GestorContext";
import { InstrutorContext } from "../../context/InstrutorContext";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: { backgroundColor: theme.palette.common.black, color: theme.palette.common.white },
  [`&.${tableCellClasses.body}`]: { fontSize: 14 },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
  "&:last-child td, &:last-child th": { border: 0 },
}));

interface ColumnFeedback {
  id: "codigo" | "descricao" | "status" | "responsavel" | "acoes";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columnsFeedback: ColumnFeedback[] = [
  { id: "codigo", label: "Código", minWidth: 5 },
  { id: "descricao", label: "Descrição", minWidth: 5 },
  { id: "status", label: "Status", minWidth: 5 },
  { id: "responsavel", label: "Responsável", minWidth: 5, align: "right", format: (value: number) => value.toLocaleString("en-US") },
  { id: "acoes", label: "Ações", minWidth: 5, align: "right", format: (value: number) => value.toLocaleString("en-US") }
];

interface Column {
  id: "codigo" | "dataCriacao" | "descricao" | "responsavel" | "acoes";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "codigo", label: "Código", minWidth: 5 },
  { id: "dataCriacao", label: "Data Criação", minWidth: 5 },
  { id: "descricao", label: "Descrição", minWidth: 5 },
  { id: "responsavel", label: "Responsável", minWidth: 5, align: "right", format: (value: number) => value.toLocaleString("en-US") },
  { id: "acoes", label: "Ações", minWidth: 5, align: "right", format: (value: number) => value.toLocaleString("en-US") }
];

export const VerificarAluno: React.FC = () => {
  const navigate = useNavigate()
  const { state } = useLocation();

  const { pegarAvaliacaoPorID, avaliacoesPorID, paginacaoAvaliacao } = useContext(GestorContext);
  const { pegarFeedbackPorID, feedbackPorID,  paginacaoFeedback } = useContext(InstrutorContext)

   // Paginação Avaliacao
  const handleChangePageAvaliacao = async (event: unknown, newPage: number) => { await pegarAvaliacaoPorID(state.idAluno, newPage); }

  // Paginação Feedback
  const handleChangePageFeedBack = async (event: unknown, newPage: number) => { await pegarFeedbackPorID(state.idAluno, newPage); }

  useEffect(() => { pegarAvaliacaoPorID(state.idAluno, 0); pegarFeedbackPorID(state.idAluno, 0); }, [])

  const infosUsuario = JSON.parse(localStorage.getItem("infoUsuario") || "{}");
  if (infosUsuario.cargo !== "Instrutor" && infosUsuario.cargo !== "Gestor de Pessoas") return <Navigate to="/" />

  return (
    <>
      <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "calc(100vh - 64px)" }}>
        <Typography id="titulo-body" sx={{
          textAlign: "center", marginBottom: "20px", fontSize: {
            xs: "35px", md: "40px"
          }, fontWeight: "700", color: "white"
        }} variant="h3">Verificar aluno</Typography>

        <Box component="div" sx={{
          display: {
            xs: "flex", md: "flex"
          }, flexDirection: "column", alignItems: "end", backgroundColor: "var(--branco)", width: { xs: "90%", md: "50%" }, borderRadius: "10px", padding: { xs: 2, md: 3 }, boxShadow: "10px 10px 10px var(--azul-escuro-dbc)", gap: 2
        }}>

          <Stack component="div" spacing={2} sx={{ width: { xs: "100%", md: "100%" }, display: "flex", alignItems: { xs: "start", md: "start" } }}>

            <Box sx={{ display: { xs: "flex", md: "flex" }, flexDirection: { xs: "column", md: "row" }, alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "-10px" }}>
              <Box sx={{ display: "flex", flexWrap: "wrap", width: { xs: "100%", md: "80%" }, justifyContent: "space-between", gap: 2, marginBottom: "20px" }}>
                <Typography sx={{ whiteSpace: "nowrap" }}>Nome: <span style={{ fontWeight: 700 }}>{state.nome}</span></Typography>
                <Typography sx={{ whiteSpace: "nowrap" }}>Turma: <span style={{ fontWeight: 700 }}>{state.stack}</span></Typography>
                <Typography sx={{ whiteSpace: "nowrap" }}>Email: <span style={{ fontWeight: 700 }}>{state.email}</span></Typography>
              </Box>
              <Avatar alt="Foto API" src={`data:image/jpeg;base64,${state.foto}`} sx={{ width: 50, height: 50 }} />
            </Box>

            <Paper sx={{ width: { xs: "95%", md: "100%" }, borderRadius: "10px", boxShadow: "10px 10px 10px #a6b0d4cf" }}>
              <Typography sx={{ fontWeight: 700, color: "#1565C0", fontSize: "22px" }}>Feedbacks:</Typography>
              <TableContainer sx={{ maxHeight: { xs: 150, md: 200 } }}>
                <Table stickyHeader aria-label="sticky table">
                  <thead>
                    <TableRow sx={{ backgroundColor: "#090F27", color: "white" }}>
                      {columnsFeedback.map((column) => (
                        <TableCell key={column.id} align={column.align} style={{ top: 57, minWidth: column.minWidth, fontWeight: "700", fontSize: "1rem", textAlign: "center" }}>{column.label}</TableCell>
                      ))}
                    </TableRow>
                  </thead>
                  <TableBody>
                    {feedbackPorID.map((feedback) => (
                      <StyledTableRow key={feedback.idFeedBack}>
                        <StyledTableCell sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }} component="td" scope="row">{feedback.idFeedBack}</StyledTableCell>
                        <StyledTableCell sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }} component="td" scope="row">{feedback.descricao}</StyledTableCell>
                        <StyledTableCell id="nome" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }}>{feedback.tipo}</StyledTableCell>
                        <StyledTableCell id="email" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100px" }}>{feedback.usuarioDTO.nome}</StyledTableCell>
                        <StyledTableCell id="cargo" sx={{ textAlign: "center" }}>
                          <Button id="botao-avaliar-acompanhamento" onClick={() => { navigate("/editar-feedback", { state: feedback }) }} title="Avaliar acompanhamento"><EditIcon />
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Paginação */}
              <TablePagination rowsPerPageOptions={[]} component="div" count={paginacaoFeedback.totalElementos} rowsPerPage={paginacaoFeedback.tamanho} page={paginacaoFeedback.pagina} onPageChange={handleChangePageFeedBack}  />
            </Paper>

            {/* Tabela Avaliações */}
            <Paper sx={{ width: { xs: "95%", md: "100%" }, borderRadius: "10px", boxShadow: "10px 10px 10px #a6b0d4cf" }}>
              <Typography sx={{ fontWeight: 700, color: "#1565C0", fontSize: "22px" }}>Avaliações:</Typography>
              <TableContainer sx={{ maxHeight: { xs: 150, md: 200 } }}>
                <Table stickyHeader aria-label="sticky table">
                  <thead>
                    <TableRow sx={{ backgroundColor: "#090F27", color: "white" }}>
                      {columns.map((column) => (
                        <TableCell key={column.id} align={column.align} style={{ top: 57, minWidth: column.minWidth, fontWeight: "700", fontSize: "1rem", textAlign: "center" }}>{column.label}</TableCell>
                      ))}
                    </TableRow>
                  </thead>
                  <TableBody>
                    {avaliacoesPorID.map((avaliacao) => (
                      <StyledTableRow key={avaliacao.idAvaliacao}>
                        <StyledTableCell id={`idAvaliacao-${avaliacao.idAvaliacao}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }} component="td" scope="row">{avaliacao.idAvaliacao}</StyledTableCell>
                        <StyledTableCell id={`dataInicio-${avaliacao.idAvaliacao}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100px" }}>{avaliacao.dataCriacao.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1")}</StyledTableCell>
                        <StyledTableCell id={`descricao-${avaliacao.idAvaliacao}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }}>{avaliacao.descricao}</StyledTableCell>
                        <StyledTableCell id={`responsavel-${avaliacao.idAvaliacao}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100px" }}>{avaliacao.responsavel.nome}</StyledTableCell>
                        <StyledTableCell id={`acoes-${avaliacao.idAvaliacao}`} sx={{ textAlign: "center" }}><Button id={`botao-avaliar-acompanhamento-${avaliacao.idAvaliacao}`}
                          onClick={() => { navigate("/editar-avaliacao", { state: avaliacao }) }}
                          title="Editar Avaliação"><EditIcon /></Button></StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Paginação */}
              <TablePagination rowsPerPageOptions={[]} component="div" count={paginacaoAvaliacao.totalElementos} rowsPerPage={paginacaoAvaliacao.tamanho} page={paginacaoAvaliacao.pagina} onPageChange={handleChangePageAvaliacao}  />
            </Paper>
          </Stack>

          <Button id="botao-voltar" sx={{ textTransform: "capitalize", width: { xs: "20%", md: "150px" }, display: "flex" }} onClick={() => { navigate("/") }} variant="contained">Voltar</Button>
        </Box>
      </Box>
    </>
  )
}
