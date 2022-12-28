import React, { useContext, useEffect } from "react";

import { Navigate, useLocation, useNavigate } from "react-router-dom"

import { TablePagination, Box, Typography, Stack, Button, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableRow, Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { GestorContext } from "../../context/GestorContext";
import { InstrutorContext } from "../../context/InstrutorContext";
import { Titulo } from "../../components/Titulo/Titulo";
import TableHead from "@mui/material/TableHead";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: { backgroundColor: theme.palette.common.black, color: theme.palette.common.white },
  [`&.${tableCellClasses.body}`]: { fontSize: 14 },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
  "&:last-child td, &:last-child th": { border: 10 },
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
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 64px)", paddingTop: "80px", paddingBottom: "50px" }}>
      <Titulo texto="Verificar Aluno" />

    <Box component="div" sx={{ width: { xs: "95%", md: "80%" }, display: "flex", alignItems: "end", flexDirection: "column", padding: "20px", background: "#FFF", borderRadius: "10px", boxShadow: "5px 5px 10px var(--azul</Box>-escuro-dbc)" }}>

        <Stack component="div" spacing={3} sx={{ width: "100%", display: "flex", alignItems: { xs: "start", md: "start" } }}>

          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", justifyContent: "space-between", width: "100%", gap: { xs: 3, md: 0 } }}>
            <Box sx={{ width: { xs: "100%", md: "auto" }, textAlign: "center" }}>
              <Typography sx={{ whiteSpace: "wrap", overflow: "hidden", textOverflow: "ellipsis" }}>Nome: <span style={{ fontWeight: 600 }}>{state.nome}</span></Typography>
            </Box>
            <Box sx={{ width: { xs: "100%", md: "auto" }, textAlign: "center" }}>
              <Typography sx={{ whiteSpace: "wrap", overflow: "hidden", textOverflow: "ellipsis" }}>Turma: <span style={{ fontWeight: 600 }}>{state.stack}</span></Typography>
            </Box>
            <Box sx={{ width: { xs: "100%", md: "auto" }, textAlign: "center" }}>
              <Typography sx={{ whiteSpace: "wrap", overflow: "hidden", textOverflow: "ellipsis" }}>Email: <span style={{ fontWeight: 600 }}>{state.email}</span></Typography>
            </Box>
          </Box>

          <Typography sx={{ fontWeight: 700, color: "var(--azul-claro-dbc)", fontSize: "22px", marginBottom: "-15px !important", userSelect: "none" }}>Feedbacks:</Typography>
          
          <Paper sx={{ width: "100%" }}>
            <TableContainer sx={{ maxHeight: { xs: 600, md: 200 }, boxShadow: "5px 5px 5px solid light-gray" }}>
              <Table stickyHeader aria-label="sticky table">

              <TableHead sx={{ backgroundColor: "#090F27" }}>
                  <TableRow>
                    {columnsFeedback.map((column) => (
                      <TableCell key={column.id} align={column.align} style={{ minWidth: "20%", fontWeight: "700", fontSize: "1rem", textAlign: "center", backgroundColor: "#090F27", color: "white" }}>{column.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>

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
            <TablePagination rowsPerPageOptions={[]} component="div" count={paginacaoFeedback.totalElementos} rowsPerPage={paginacaoFeedback.tamanho} page={paginacaoFeedback.pagina} onPageChange={handleChangePageFeedBack} />
          </Paper>

          {/* Tabela Avaliações */}

          <Typography sx={{ fontWeight: 700, color: "var(--azul-claro-dbc)", fontSize: "22px", marginBottom: "-15px !important", userSelect: "none" }}>Avaliações:</Typography>
          
          <Paper sx={{ width: "100%", marginBottom: "15px" }}>
            <TableContainer sx={{ maxHeight: { xs: 600, md: 200 }, boxShadow: "5px 5px 5px solid light-gray" }}>
              <Table stickyHeader aria-label="sticky table">

                <TableHead sx={{ backgroundColor: "#090F27" }}>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align} style={{ minWidth: "20%", fontWeight: "700", fontSize: "1rem", textAlign: "center", backgroundColor: "#090F27", color: "white" }}>{column.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>

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
            <TablePagination rowsPerPageOptions={[]} component="div" count={paginacaoAvaliacao.totalElementos} rowsPerPage={paginacaoAvaliacao.tamanho} page={paginacaoAvaliacao.pagina} onPageChange={handleChangePageAvaliacao} />
          </Paper>
        </Stack>

        <Button onClick={() => { navigate(-1) }} variant="contained" sx={{ width: "160px", marginTop: "20px", textTransform: "capitalize", fontSize: "1rem" }}>Voltar</Button>

      </Box>
    </Box>
  )
}
