import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

import { Paper, TableContainer, Table, TableRow, TableCell, TableBody, Button, TablePagination, tableCellClasses, Box, Typography, Modal, styled } from "@mui/material";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: { backgroundColor: theme.palette.common.black, color: theme.palette.common.white },
  [`&.${tableCellClasses.body}`]: { fontSize: 14 },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
  "&:last-child td, &:last-child th": { border: 0 },
}));

interface Column {
  id: "codigo" | "nome" | "stack" | "acoes";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "codigo", label: "Código", minWidth: 5 },
  { id: "nome", label: "Nome", minWidth: 5 },
  { id: "stack", label: "Stack", minWidth: 5, align: "right", format: (value: number) => value.toLocaleString("en-US") },
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

export const ListarAlunos = ({ alunos, deletarAluno }: any) => {
  const navigate = useNavigate();
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Funções Modal
  const [idDelete, setIdDelete] = useState<number | undefined>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleChangePage = (event: unknown, newPage: number) => { setPage(newPage); };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  return (
    <>
      <Box sx={{height:"calc(100vh - 64px)",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:5}}>
        <Typography sx={{textAlign: "center",fontWeight:"700",fontSize: { xs:30, md: 44 }, color:"white"}} variant="h3">Dashboard Alunos</Typography>

        <Paper sx={{ width: { xs:"95%", md:"60%" }, borderRadius: "10px", boxShadow: "10px 10px 10px #2f407ccf" }}>
          <TableContainer sx={{ maxHeight:430 }}>
            <Table component="table" stickyHeader aria-label="sticky table">
              <thead>
                <TableRow sx={{ backgroundColor: "#090F27", color: "white" }}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ top: 57, minWidth: column.minWidth, fontWeight: "700", fontSize: "1rem", textAlign: "center" }}>{column.label}</TableCell>
                  ))}
                </TableRow>
              </thead>

              <TableBody>
                {alunos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data: any) => (
                  <StyledTableRow sx={{ ":hover": { opacity: "0.7", cursor: "pointer" } }} key={data.idAluno}>
                    <StyledTableCell onClick={() => navigate("/verificar-aluno", { state: data })} id="codigo" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }} component="td" scope="row">{data.idAluno}</StyledTableCell>
                    <StyledTableCell onClick={() => navigate("/verificar-aluno", { state: data })} id="nome" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }}>{data.nome}</StyledTableCell>
                    <StyledTableCell onClick={() => navigate("/verificar-aluno", { state: data })} id="stack" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }}>{data.stack}</StyledTableCell>
                    <StyledTableCell id="acoes" sx={{textAlign:"center"}}>
                      <Button id={`botao-editar-${data.idAluno}`} title="Deletar" onClick={() => navigate("/editar-aluno",{state: data})}><EditIcon /></Button>
                      <Button id={`botao-deletar-${data.idAluno}`} title="Deletar" onClick={() => { handleOpen(); setIdDelete(data.idAluno) }}><DeleteForeverIcon /></Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Paginação */}
          <TablePagination rowsPerPageOptions={[10, 20, 30]} component="div" count={alunos.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} labelRowsPerPage="Linhas por página:" />

          {/* Modal Confirmar Delete */}
          <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-titulo" aria-describedby="modal-modal-description" sx={{ backdropFilter: "blur(10px)" }}>
            <Box sx={style}> 
              <Typography id="modal-modal-titulo" variant="h6" component="h2" color="error">Você realmente deseja excluir?</Typography>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center", justifyContent: "center" }}>
                <Button id="botao-confirmar-modal" onClick={() => { deletarAluno(idDelete); handleClose(); }} size="medium" color="success" type="submit" sx={{ mt: 2 }} variant="contained">Confirmar</Button>
                <Button id="botao-fechar-modal" onClick={handleClose} size="medium" type="submit" sx={{ mt: 2 }} variant="contained">Fechar</Button>
              </Box>
            </Box>
          </Modal>
        </Paper>
      </Box>
    </>
  )
}