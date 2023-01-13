import React, { useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom"

import { Box, Typography, Stack, Button, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableRow, TableHead } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import * as Componentes from "../../components";

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
}

const columnsFeedback: ColumnFeedback[] = [
  { id: "codigo", label: "Código", minWidth: 5 },
  { id: "descricao", label: "Descrição", minWidth: 5 },
  { id: "status", label: "Status", minWidth: 5 },
  { id: "responsavel", label: "Responsável", minWidth: 5 },
  { id: "acoes", label: "Ações", minWidth: 5 }
];

export const ConfiguracaoPrograma: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    console.log(state)
  }, [])

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "60px", paddingBottom: "50px" }}>
      <Componentes.Titulo texto={`Configurações de ${state.nome}`} />

      <Box component="div" sx={{ width: { xs: "95%", md: "90%" }, display: "flex", alignItems: "end", flexDirection: "column", padding: "20px", background: "#FFF", borderRadius: "10px", boxShadow: "5px 5px 10px var(--azul</Box>-escuro-dbc)" }}>

        <Stack component="div" spacing={3} sx={{ width: "100%", display: "flex", alignItems: { xs: "start", md: "start" } }}>

          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", justifyContent: "space-between", width: "100%", gap: { xs: 3, md: 0 } }}>
            <Box sx={{ width: { xs: "100%", md: "auto" }, textAlign: "center" }}>
              <Typography sx={{ whiteSpace: "wrap", overflow: "hidden", textOverflow: "ellipsis" }}>Programa: <span style={{ fontWeight: 600 }}>{state.nome}</span></Typography>
            </Box>
            <Box sx={{ width: { xs: "100%", md: "auto" }, textAlign: "center" }}>
              <Typography sx={{ whiteSpace: "wrap", overflow: "hidden", textOverflow: "ellipsis" }}>Trilha: <span style={{ fontWeight: 600 }}>{state.trilha.nome}</span></Typography>
            </Box>
            <Box sx={{ width: { xs: "100%", md: "auto" }, textAlign: "center" }}>
              <Typography sx={{ whiteSpace: "wrap", overflow: "hidden", textOverflow: "ellipsis" }}>E-mail: <span style={{ fontWeight: 600 }}>{state.email}</span></Typography>
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
                  <StyledTableRow key={1}>
                    <StyledTableCell sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }} component="td" scope="row">{'id'}</StyledTableCell>

                    <StyledTableCell sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }} component="td" scope="row">{'descricao'}</StyledTableCell>

                    <StyledTableCell id="nome" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }}>{'tipo'}</StyledTableCell>

                    <StyledTableCell id="email" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100px" }}>{'nome'}</StyledTableCell>

                    <StyledTableCell id="cargo" sx={{ textAlign: "center" }}>
                      <Button id="botao-avaliar-acompanhamento" onClick={() => { navigate("/editar-feedback") }} title="Avaliar acompanhamento"><EditIcon />
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {/* Paginação */}
            {/* <TablePagination rowsPerPageOptions={[]} component="div" count={paginacaoFeedback.totalElementos} rowsPerPage={paginacaoFeedback.tamanho} page={paginacaoFeedback.pagina} onPageChange={handleChangePageFeedBack} /> */}
          </Paper>

        </Stack>

        <Button onClick={() => { navigate(-1) }} variant="contained" sx={{ width: "160px", marginTop: "20px", textTransform: "capitalize", fontSize: "1rem" }}>Voltar</Button>

      </Box>
    </Box>
  )
}
