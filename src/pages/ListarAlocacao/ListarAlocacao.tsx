import React from "react";

import { useNavigate } from "react-router-dom";

import * as Components from "../../components"

import { TableCell, tableCellClasses, TableRow, Box, Paper, TableContainer, Table, TableBody, Button, TablePagination, styled } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: { backgroundColor: theme.palette.common.black, color: theme.palette.common.white },
  [`&.${tableCellClasses.body}`]: { fontSize: 14 },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
  "&:last-child td, &:last-child th": { border: 0 },
}));


interface Column {
  id: "codigo" | "aluno" | "vaga" | "cliente" | "situacao" | "acoes";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "codigo", label: "Codigo", minWidth: 5 },
  { id: "aluno", label: "Aluno", minWidth: 5 },
  { id: "vaga", label: "Vaga", minWidth: 5 },
  { id: "cliente", label: "Cliente", minWidth: 5 },
  { id: "situacao", label: "Situação", minWidth: 5 },
  { id: "acoes", label: "Ações", minWidth: 5, align: "right", format: (value: number) => value.toLocaleString("en-US") }
];

// dados 
const dados = [
  {idAlocacao: 10000, aluno:"nomeX", vaga: "vagaY", cliente: "clienteZ", situacao: "ALOCADO"},
  {idAlocacao: 1000, aluno:"nomeX", vaga: "vagaY", cliente: "clienteZ", situacao: "DISPONIVEL"},
  {idAlocacao: 100, aluno:"nomeX", vaga: "vagaY", cliente: "clienteZ", situacao: "INATIVO"},
  {idAlocacao: 10, aluno:"nomeX", vaga: "vagaY", cliente: "clienteZ", situacao: "FINALIZADO"},
  {idAlocacao: 1, aluno:"nomeX", vaga: "vagaY", cliente: "clienteZ", situacao: "RESERVADO"}
]

export const ListarAlocacao: React.FC = () => {

  const navigate = useNavigate()

 const handleChangePage = () => console.log("Fazer paginação");
  
  return (
    <>
      <Box sx={{ minHeight: "calc(100vh - 64px)", paddingTop: "50px", paddingBottom: "50px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 5 }}>
        <Components.Titulo texto="Reserva e Alocação"/>

        <Box sx={{ width: "60%", display: "flex", alignItems: "end", flexDirection: "column", padding: "20px", background: "#f8f8fff8", borderRadius: "10px", boxShadow: "10px 10px 10px var(--azul</Box>-escuro-dbc)" }}>

        <Button onClick={() => navigate("/cadastrar-alocacao")} variant="contained" sx={{ width: "200px", whiteSpace: "nowrap", display: "flex", marginBottom: "10px" }}>Cadastrar Módulo</Button>

        <Paper sx={{ width: { xs: "100%", md: "100%" }, borderRadius: "10px" }}>
          <TableContainer sx={{ maxHeight: 430 }}>
            <Table stickyHeader aria-label="sticky table">
              <thead>
                <TableRow sx={{ backgroundColor: "#090F27", color: "white" }}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ top: 57, minWidth: column.minWidth, fontWeight: "700", fontSize: "1rem", textAlign: "center" }}>{column.label}</TableCell>
                  ))}
                </TableRow>
              </thead>
              <TableBody>
                {dados.map((alocacao) => (
                  <StyledTableRow key={alocacao.idAlocacao}>
                    <StyledTableCell sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }} component="td" scope="row"> {alocacao.idAlocacao}</StyledTableCell>
                    <StyledTableCell id={`aluno-${alocacao.idAlocacao}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }} >{alocacao.aluno}</StyledTableCell>
                    <StyledTableCell id={`vaga-${alocacao.idAlocacao}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }}>{alocacao.vaga}</StyledTableCell>
                    <StyledTableCell id={`cliente-${alocacao.idAlocacao}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem"}} >{alocacao.cliente}</StyledTableCell>
                    <StyledTableCell id={`situacao-${alocacao.idAlocacao}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem"}} >{alocacao.situacao}</StyledTableCell>
                    <StyledTableCell id={`situacao-${alocacao.idAlocacao}`} sx={{ textAlign: "center" }}>
                      <Button id={`botao-avaliar-acompanhamento-${alocacao.idAlocacao}`}onClick={() => navigate("/editar-alocacao", { state: alocacao })} title="Editar Alocacao"><EditIcon /></Button>
                      <Button id={`botao-deletar-${alocacao.idAlocacao}`} title="Deletar"><DeleteForeverIcon /></Button></StyledTableCell>
                  </StyledTableRow> 
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Paginação */}
          <TablePagination rowsPerPageOptions={[]} component="div" count={0} rowsPerPage={0} page={0} onPageChange={handleChangePage} />
        </Paper>

        </Box>
      </Box>
    </>
  );
};