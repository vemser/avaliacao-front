import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Typography, TableContainer, Table, TableRow, TableCell, TableBody, tableCellClasses, Button, TablePagination, Modal, styled, Tooltip } from '@mui/material';

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import TableHead from '@mui/material/TableHead';
import { useTrilha } from '../../context/Tecnico/TrilhaContext';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: { backgroundColor: theme.palette.common.black, color: theme.palette.common.white },
  [`&.${tableCellClasses.body}`]: { fontSize: 14 },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
  "&:last-child td, &:last-child th": { border: 0 },
}));

interface Column {
  id: "codigo" | "nome" | "descricao" | "acoes";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "codigo", label: "Código", minWidth: 5 },
  { id: "nome", label: "Nome da Trilha", minWidth: 5 },
  { id: "descricao", label: "Descrição", minWidth: 5 },
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

  const { trilhas, pegarTrilha, deletarTrilha } = useTrilha();

  const handleChangePage = (event: unknown, newPage: number) => { pegarTrilha(newPage); };

  useEffect(() => {
    pegarTrilha();
  }, []);

  // Funções Modal
  const [idDelete, setIdDelete] = useState<number | undefined>(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <TableContainer sx={{ maxHeight: 430 }}>
        <Table component="table" stickyHeader aria-label="sticky table">

          <TableHead sx={{ backgroundColor: "#090F27" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: "33.33%", fontWeight: "700", fontSize: "1rem", textAlign: "center", backgroundColor: "#090F27", color: "white" }}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {trilhas?.elementos.map((trilha: any) => (
              <StyledTableRow key={trilha.idTrilha}>
                <StyledTableCell id="id-trilha" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }} component="td" scope="row">{trilha.idTrilha}</StyledTableCell>
                <StyledTableCell id="nome-trilha" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }} component="td" scope="row">{trilha.nome}</StyledTableCell>
                <Tooltip title={trilha.descricao} PopperProps={{sx: {marginTop: "-35px !important"}}} arrow>
                  <StyledTableCell id="descricao-trilha" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }}>{trilha.descricao ? trilha.descricao : "Sem descrição"}</StyledTableCell>
                </Tooltip>
                  <StyledTableCell id="acoes-trilha" sx={{ textAlign: "center" }}>
                  <Button id={`botao-editar-${trilha.idTrilha}`} title="Editar" onClick={() => navigate("/editar-trilha", { state: trilha })}><EditIcon /></Button>
                  <Button id={`botao-deletar-${trilha.idTrilha}`} title="Deletar" onClick={() => { handleOpen(); setIdDelete(trilha.idTrilha) }}><DeleteForeverIcon /></Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginação */}
      <TablePagination rowsPerPageOptions={[]} component="div" count={trilhas ? trilhas.totalElementos : 0} rowsPerPage={trilhas ? trilhas.tamanho : 0} page={trilhas ? trilhas.pagina : 0} onPageChange={handleChangePage} />

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
