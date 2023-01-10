import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { TableCell, tableCellClasses, TableRow, Box, Paper, TableContainer, Table, Modal, TableBody, Button, TablePagination, styled, TableHead, Typography } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { useCliente } from "../../context/Alocacao/ClienteContext";

import * as Componentes from "../../components";


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
}

const columns: Column[] = [
  { id: "codigo", label: "Código", minWidth: 5 },
  { id: "nome", label: "Nome", minWidth: 5 },
  { id: "email", label: "E-mail", minWidth: 5 },
  { id: "telefone", label: "Telefone", minWidth: 5 },
  { id: "situacao", label: "Situação", minWidth: 5 },
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

export const ListarCliente: React.FC = () => {

  const { pegarCliente, cliente, deletarCliente, pegarClientePorNome, pegarClientePorEmail } = useCliente()
  useEffect(() => {
    pegarCliente();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const navigate = useNavigate();
  const handleChangePage = async (event: unknown, newPage: number) => { await pegarCliente(newPage) };

  // Funções Modal
  const [idDelete, setIdDelete] = useState<number | undefined>(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const buscarPorNomeCliente = async (valor: string) => {
    if (valor.includes("@")) {
      await pegarClientePorEmail(valor)
    } else {
      await pegarClientePorNome(valor);
    }
  }

  const resetBuscaCliente = async () => {
    await pegarCliente();
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "60px", paddingBottom: "50px" }}>
      <Componentes.Titulo texto="Clientes" />

      <Box sx={{ width: { xs: "95%", md: "90%" }, display: "flex", alignItems: "end", flexDirection: "column", paddingTop: "20px", background: "#FFF", borderRadius: "10px", boxShadow: "5px 5px 10px var(--azul</Box>-escuro-dbc)" }}>

        <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "10px", paddingInline: 2 }}>
          <Componentes.CampoBusca label="E-mail ou Nome" buscar={buscarPorNomeCliente} resetar={resetBuscaCliente} />


          <Button onClick={() => navigate("/cadastrar-cliente")} variant="contained" sx={{ width: "auto", paddingLeft: "15px", paddingRight: "15px", display: "flex", textTransform: "capitalize", fontSize: "1rem" }}>Cadastrar Cliente</Button>
        </Box>

        <Paper sx={{ width: "100%", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
          <TableContainer sx={{ maxHeight: 450 }}>
            <Table stickyHeader>

              <TableHead sx={{ backgroundColor: "#090F27" }} >
                <TableRow >
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: "16.6%", fontWeight: "700", fontSize: "1rem", textAlign: "center", backgroundColor: "#090F27", color: "white" }}>{column.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {cliente?.elementos.map((cliente) => (
                  <StyledTableRow key={cliente.idCliente}>

                    <StyledTableCell sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }} component="td" scope="row"> {cliente.idCliente}</StyledTableCell>

                    <StyledTableCell id={`aluno-${cliente.idCliente}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }} >{cliente.nome}</StyledTableCell>

                    <StyledTableCell id={`vaga-${cliente.idCliente}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }}>{cliente.email}</StyledTableCell>

                    <StyledTableCell id={`cliente-${cliente.idCliente}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }} >{cliente.telefone}</StyledTableCell>

                    <StyledTableCell id={`situacao-${cliente.idCliente}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }} >{cliente.ativo === "S" ? "Ativo" : cliente.ativo === "N" ? "Inativo" : ""}</StyledTableCell>

                    <StyledTableCell id={`situacao-${cliente.idCliente}`} sx={{ justifyContent: "center", minWidth: "150px", display: "flex", wrap: "nowrap" }}>
                      <Button id={`botao-cliente-${cliente.idCliente}`} onClick={() => navigate("/editar-cliente", { state: cliente })} title="Editar"><EditIcon /></Button>
                      <Button id={`botao-deletar-${cliente.idCliente}`} onClick={() => { handleOpen(); setIdDelete(cliente.idCliente) }} title="Deletar"><DeleteForeverIcon /></Button></StyledTableCell>

                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Paginação */}
          <TablePagination rowsPerPageOptions={[]} component="div" count={cliente ? cliente.totalElementos : 0} rowsPerPage={cliente ? cliente.tamanho : 0} page={cliente ? cliente.pagina : 0} onPageChange={handleChangePage} />

          {/* Modal Confirmar Delete */}
          <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-titulo" aria-describedby="modal-modal-description" sx={{ backdropFilter: "blur(6px)" }}>
            <Box sx={style}>
              <Typography id="modal-modal-titulo" variant="h6" sx={{ fontWeight: 600, userSelect: "none", marginBottom: "10px", color: "var(--azul-forte-dbc)", fontSize: "1.4rem" }}>Você tem certeza?</Typography>
              <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", bottom: 0, paddingTop: "20px", gap: 2, flexDirection: "column" }}>
                <Button type="button" onClick={() => { deletarCliente(idDelete); handleClose(); }} variant="contained" color="error" sx={{ textTransform: "capitalize", fontSize: "1.05rem", width: "180px" }}>Deletar</Button>
                <Button type="button" onClick={handleClose} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d" }, textTransform: "capitalize", fontSize: "1.05rem", width: "180px" }}>Cancelar</Button>
              </Box>
            </Box>
          </Modal>

        </Paper>
      </Box>
    </Box>
  );
};