import React, { useContext, useEffect, useState } from "react";

import { Paper, TableContainer, Table, TableBody, TablePagination, Button, styled, Typography, Box, TableCell, tableCellClasses, TableRow, Modal } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useNavigate } from "react-router-dom";

import { AdminContext } from "../../context/AdminContext";
import { Titulo } from "../../components/Titulo/Titulo";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: { backgroundColor: theme.palette.common.black, color: theme.palette.common.white },
  [`&.${tableCellClasses.body}`]: { fontSize: 14 },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
  "&:last-child td, &:last-child th": { border: 0 },
}));

interface Column {
  id: "nome" | "email" | "cargo" | "acoes";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "nome", label: "Colaborador(a)", minWidth: 5 },
  { id: "email", label: "E-mail", minWidth: 5 },
  { id: "cargo", label: "Cargo", minWidth: 5, align: "right", format: (value: number) => value.toLocaleString("en-US") },
  { id: "acoes", label: "Ações", minWidth: 5, align: "right", format: (value: number) => value.toLocaleString("en-US") }
];

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

export const DashboardAdmin: React.FC = () => {
  const navigate = useNavigate();

  const { colaborador, pegarColaborador, deletarColaborador, paginacaoColaborador } = useContext(AdminContext);

  const handleChangePage = async (event: unknown, newPage: number) => await pegarColaborador(newPage)

  // Funções Modal
  const [idDelete, setIdDelete] = useState<number | undefined>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => { pegarColaborador() }, []);

  // const infosUsuario = JSON.parse(localStorage.getItem("infoUsuario") || "{}");
  // if (infosUsuario.cargo !== "Admin") return <Navigate to="/" />

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 64px)", paddingTop: "80px", paddingBottom: "50px" }}>

      <Titulo texto="Colaboradores" />

      <Box sx={{ width: { xs: "95%", md: "80%" }, display: "flex", alignItems: "end", flexDirection: "column", padding: "20px", background: "#f8f8fff8", borderRadius: "10px", boxShadow: "5px 5px 10px var(--azul</Box>-escuro-dbc)" }}>

        <Paper sx={{ width: "100%", borderRadius: "10px" }}>

          <TableContainer id="tabela-admin" sx={{ maxHeight: "30vw", borderRadius: "10px" }}>
            <Table stickyHeader aria-label="sticky table">
              <thead>
                <TableRow sx={{ backgroundColor: "#090F27", color: "white" }}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ top: 57, minWidth: column.minWidth, fontWeight: "700", fontSize: "1rem", textAlign: "center" }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </thead>
              <TableBody>
                {colaborador.map((data) => (
                  <StyledTableRow sx={{ ":hover": { opacity: "0.7", cursor: "pointer" } }} key={data.idUsuario}>
                    <StyledTableCell onClick={() => navigate("/detalhes-colaborador", { state: data })} id="nome" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", width: { md: "340px" } }} scope="row">{data.nome}</StyledTableCell>
                    <StyledTableCell onClick={() => navigate("/detalhes-colaborador", { state: data })} id="email" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100px" }}>{data.email}</StyledTableCell>
                    <StyledTableCell onClick={() => navigate("/detalhes-colaborador", { state: data })} id="cargo" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }}>{data.cargo}</StyledTableCell>
                    <StyledTableCell id="acoes" sx={{ textAlign: "center" }}>
                      <Button id={`botao-deletar-admin-${data.idUsuario}`} onClick={() => { handleOpen(); setIdDelete(data.idUsuario) }} title="Deletar"><DeleteForeverIcon /></Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Paginação */}
          <TablePagination rowsPerPageOptions={[]} component="div" count={paginacaoColaborador.totalElementos} rowsPerPage={paginacaoColaborador.tamanho} page={paginacaoColaborador.pagina} onPageChange={handleChangePage} />

          {/* Modal Confirmar Delete */}
          <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-titulo" aria-describedby="modal-modal-description" sx={{ backdropFilter: "blur(10px)" }}>
            <Box sx={style}>
              <Typography id="modal-modal-titulo" variant="h6" component="h2" color="error">Você realmente deseja excluir?</Typography>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center", justifyContent: "center" }}>
                <Button id="botao-confirmar-modal" onClick={() => { deletarColaborador(idDelete); handleClose(); }} size="medium" color="success" type="submit" sx={{ mt: 2 }} variant="contained">Confirmar</Button>
                <Button id="botao-fechar-modal" onClick={handleClose} size="medium" type="submit" sx={{ mt: 2 }} variant="contained">Fechar</Button>
              </Box>
            </Box>
          </Modal>
        </Paper>
      </Box>
    </Box>
  );
};
