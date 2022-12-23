import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Typography, Paper, TableContainer, Table, TableRow, TableCell, TableBody, tableCellClasses, Button, TablePagination, Modal, styled } from '@mui/material';

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: { backgroundColor: theme.palette.common.black, color: theme.palette.common.white },
  [`&.${tableCellClasses.body}`]: { fontSize: 14 },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
  "&:last-child td, &:last-child th": { border: 0 },
}));

interface Column {
  id: "nome" | "descricao" | "acoes";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "nome", label: "Nome da Trilha", minWidth: 5 },
  { id: "descricao", label: "Descrição da Trilha", minWidth: 5 },
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

export const ListarTrilha = () => {
  const navigate = useNavigate();

  const trilhas = [
    {idTrilha: 1, nome: "FrontEnd", descricao: "sfjkksknfknfsknsknfdkssfjkksknfknfsknsknfdkssfjkksknfknfsknsknfdks"},
    {idTrilha: 2, nome: "BackEnd", descricao: "sfjkksknfknfsknsknfdks"},
    {idTrilha: 3, nome: "Quality Assurance", descricao: "sfjkksknfknfsknsknfdks"}
  ];
  const deletarTrilha = (id: number | undefined) => console.log(id);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Funções Modal
  const [idDelete, setIdDelete] = useState<number | undefined>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const handleChangePage = (event: unknown, newPage: number) => { setPage(newPage); };

  // const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  return (
    <>


      <TableContainer sx={{ maxHeight: 430, paddingTop: "10px", borderBottom: "1px solid #000", borderRadius: "5px" }}>
        <Table component="table" stickyHeader aria-label="sticky table">
          <thead>
            <TableRow sx={{ backgroundColor: "#090F27", color: "white" }}>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ top: 57, minWidth: column.minWidth, fontWeight: "700", fontSize: "1rem", textAlign: "center" }}>{column.label}</TableCell>
              ))}
            </TableRow>
          </thead>

          <TableBody>
            {trilhas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((trilha: any) => (
              <StyledTableRow key={trilha.idTrilha}>
                <StyledTableCell onClick={() => navigate("/verificar-aluno", { state: trilha })} id="nome-trilha" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }} component="td" scope="row">{trilha.nome}</StyledTableCell>

                <StyledTableCell onClick={() => navigate("/verificar-aluno", { state: trilha })} id="descricao-trilha" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }}>{trilha.descricao}</StyledTableCell>

                <StyledTableCell id="acoes-trilha" sx={{ textAlign: "center" }}>
                  <Button id={`botao-editar-${trilha.idTrilha}`} title="Editar" onClick={() => navigate("/editar-trilha", { state: trilha })}><EditIcon /></Button>
                  <Button id={`botao-deletar-${trilha.idTrilha}`} title="Deletar" onClick={() => { handleOpen(); setIdDelete(trilha.idTrilha) }}><DeleteForeverIcon /></Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginação
      <TablePagination rowsPerPageOptions={[10, 20, 30]} component="div" count={alunos.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} labelRowsPerPage="Linhas por página:" /> */}

      {/* Modal Confirmar Delete */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-titulo" aria-describedby="modal-modal-description" sx={{ backdropFilter: "blur(10px)" }}>
        <Box sx={style}>
          <Typography id="modal-modal-titulo" variant="h6" component="h2" color="error">Você realmente deseja excluir?</Typography>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", justifyContent: "center" }}>
            <Button id="botao-confirmar-modal" onClick={() => { deletarTrilha(idDelete); handleClose(); }} size="medium" color="success" type="submit" sx={{ mt: 2 }} variant="contained">Confirmar</Button>
            <Button id="botao-fechar-modal" onClick={handleClose} size="medium" type="submit" sx={{ mt: 2 }} variant="contained">Fechar</Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}