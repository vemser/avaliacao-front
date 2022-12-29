import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useAluno } from "../../context/Comportamental/AlunoContext";

import { Paper, TableContainer, Table, TableRow, TableCell, TableBody, Button, TablePagination, tableCellClasses, Box, Typography, Modal, styled, TableHead } from "@mui/material";
import { Titulo } from "../Titulo/Titulo";


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

export const ListarAlunos: React.FC = () => {
  const navigate = useNavigate();
  const { pegarAluno, alunos, deletarAluno } = useAluno();

  useEffect(() => { pegarAluno() }, [])

  // Funções Modal
  const [idDelete, setIdDelete] = useState<number | undefined>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function formatarTexto(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const handleChangePage = async (event: unknown, newPage: number) => { await pegarAluno(newPage); };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 64px)", paddingTop: "80px", paddingBottom: "50px" }}>
      <Titulo texto="Alunos" />

      <Box sx={{ width: { xs: "95%", md: "80%" }, display: "flex", alignItems: "end", flexDirection: "column", paddingTop: "20px", background: "#FFF", borderRadius: "10px", boxShadow: "5px 5px 10px var(--azul</Box>-escuro-dbc)" }}>

        <Button onClick={() => navigate("/cadastrar-aluno")} variant="contained" sx={{ width: "auto", paddingLeft: "15px", paddingRight: "15px", display: "flex", marginBottom: "10px", marginRight: "14px", textTransform: "capitalize", fontSize: "1rem" }}>Cadastrar Aluno</Button>

        <Paper sx={{ width: "100%", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
          <TableContainer sx={{ maxHeight: 430 }}>
            <Table component="table" stickyHeader aria-label="sticky table">
              <TableHead sx={{ backgroundColor: "#090F27" }}>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: "25%", fontWeight: "700", fontSize: "1rem", textAlign: "center", backgroundColor: "#090F27", color: "white" }}>{column.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {alunos?.elementos.map((aluno: any) => (
                  <StyledTableRow sx={{ ":hover": { opacity: "0.7", cursor: "pointer" } }} key={aluno.idAluno}>
                    <StyledTableCell onClick={() => navigate("/verificar-aluno", { state: aluno })} id="codigo" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }} component="td" scope="row">{aluno.idAluno}</StyledTableCell>
                    <StyledTableCell onClick={() => navigate("/verificar-aluno", { state: aluno })} id="nome" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }}>{aluno.nome}</StyledTableCell>
                    <StyledTableCell onClick={() => navigate("/verificar-aluno", { state: aluno })} id="stack" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", textTransform: "capitalize" }}>{formatarTexto(aluno.stack)}</StyledTableCell>
                    <StyledTableCell id="acoes" sx={{ textAlign: "center" }}>
                      <Button id={`botao-editar-${aluno.idAluno}`} title="Deletar" onClick={() => navigate("/editar-aluno", { state: aluno })}><EditIcon /></Button>
                      <Button id={`botao-deletar-${aluno.idAluno}`} title="Deletar" onClick={() => { handleOpen(); setIdDelete(aluno.idAluno) }}><DeleteForeverIcon /></Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Paginação */}
          <TablePagination rowsPerPageOptions={[]} component="div" count={alunos ? alunos.totalElementos : 0} rowsPerPage={alunos ? alunos.tamanho : 0} page={alunos ? alunos.pagina : 0} onPageChange={handleChangePage} />

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
    </Box>
  )
}