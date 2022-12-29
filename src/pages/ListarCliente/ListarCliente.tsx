import React from "react";

import { useNavigate } from "react-router-dom";

import { TableCell, tableCellClasses, TableRow, Box, Paper, TableContainer, Table, TableBody, Button, TablePagination, styled, TableHead } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Titulo } from "../../components";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: { backgroundColor: theme.palette.common.black, color: theme.palette.common.white },
  [`&.${tableCellClasses.body}`]: { fontSize: 14 },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
  "&:last-child td, &:last-child th": { border: 0 },
}));

interface Column {
  id: "codigo" | "nome" | "email" | "telefone" | "situacao" | "acoes";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "codigo", label: "Código", minWidth: 5 },
  { id: "nome", label: "Nome", minWidth: 5 },
  { id: "email", label: "Email", minWidth: 5 },
  { id: "telefone", label: "Telefone", minWidth: 5 },
  { id: "situacao", label: "Situação", minWidth: 5 },
  { id: "acoes", label: "Ações", minWidth: 5, align: "right", format: (value: number) => value.toLocaleString("en-US") }
];

// dados 
const dados = [
  { idCliente: 10000, nome: "nomeX", email: "emailY@gmail.com.br", telefone: "telefoneZ", situacao: "INATIVO" },
  { idCliente: 1000, nome: "nomeX", email: "emailY@gmail.com.br", telefone: "telefoneZ", situacao: "ATIVO" },
  { idCliente: 100, nome: "nomeX", email: "emailY@gmail.com.br", telefone: "telefoneZ", situacao: "INATIVO" },
  { idCliente: 10, nome: "nomeX", email: "emailY@gmail.com.br", telefone: "telefoneZ", situacao: "ATIVO" },
  { idCliente: 1, nome: "nomeX", email: "emailY@gmail.com.br", telefone: "telefoneZ", situacao: "ATIVO" }
]
export const ListarCliente: React.FC = () => {
  const navigate = useNavigate();
  const handleChangePage = () => console.log("Fazer paginação");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 64px)", paddingTop: "80px", paddingBottom: "50px" }}>
      <Titulo texto="Clientes" />

      <Box sx={{ width: { xs: "95%", md: "80%" }, display: "flex", alignItems: "end", flexDirection: "column", paddingTop: "20px", background: "#FFF", borderRadius: "10px", boxShadow: "5px 5px 10px var(--azul</Box>-escuro-dbc)" }}>

        <Button onClick={() => navigate("/cadastrar-cliente")} variant="contained" sx={{ width: "auto", paddingLeft: "15px", paddingRight: "15px", display: "flex", marginBottom: "10px", marginRight: "14px", textTransform: "capitalize", fontSize: "1rem" }}>Cadastrar Cliente</Button>

        <Paper sx={{ width: "100%", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
          <TableContainer sx={{ maxHeight: 430 }}>
            <Table stickyHeader>

              <TableHead sx={{ backgroundColor: "#090F27" }} >
                <TableRow >
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: "16.6%", fontWeight: "700", fontSize: "1rem", textAlign: "center", backgroundColor: "#090F27", color: "white" }}>{column.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {dados.map((cliente) => (
                  <StyledTableRow key={cliente.idCliente}>
                    <StyledTableCell sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }} component="td" scope="row"> {cliente.idCliente}</StyledTableCell>
                    <StyledTableCell id={`aluno-${cliente.idCliente}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }} >{cliente.nome}</StyledTableCell>
                    <StyledTableCell id={`vaga-${cliente.idCliente}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }}>{cliente.email}</StyledTableCell>
                    <StyledTableCell id={`cliente-${cliente.idCliente}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }} >{cliente.telefone}</StyledTableCell>
                    <StyledTableCell id={`situacao-${cliente.idCliente}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }} >{cliente.situacao}</StyledTableCell>
                    <StyledTableCell id={`situacao-${cliente.idCliente}`} sx={{ textAlign: "center" }}>
                      <Button id={`botao-cliente-${cliente.idCliente}`} onClick={() => navigate("/editar-cliente", { state: cliente })} title="Editar cliente"><EditIcon /></Button>
                      <Button id={`botao-deletar-${cliente.idCliente}`} title="Deletar"><DeleteForeverIcon /></Button></StyledTableCell>
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
  );
};