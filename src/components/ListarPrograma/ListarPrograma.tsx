import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Typography,  TableContainer, Table, TableRow, TableCell, TableBody, tableCellClasses, Button, TablePagination, Modal, styled } from '@mui/material';

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import TableHead from '@mui/material/TableHead';
import { usePrograma } from '../../context/Tecnico/ProgramaContext';

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
  { id: "nome", label: "Nome do Programa", minWidth: 5 },
  { id: "descricao", label: "Descrição do Programa", minWidth: 5 },
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

export const ListarPrograma = () => {
  const navigate = useNavigate();
  const { pegarPrograma, deletarProgama, programas } = usePrograma()

  useEffect(() => {
    pegarPrograma()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Funções Modal
  const [idDelete, setIdDelete] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const mudarPagina = async (event: unknown, newPage: number) => { await pegarPrograma(newPage); };

  const deletar = async (id: number ) => { await deletarProgama(id) }

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
            {programas?.elementos.map((programa: any) => (
              <StyledTableRow key={programa.idPrograma}>
                <StyledTableCell id="nome-programa" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }} component="td" scope="row">{programa.nome}</StyledTableCell>

                <StyledTableCell id="descricao-programa" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }}>{programa.descricao ? programa.descricao : "Sem descrição"}</StyledTableCell>

                <StyledTableCell id="acoes-programa" sx={{ textAlign: "center" }}>
                  <Button id={`botao-editar-${programa.idPrograma}`} title="Editar" onClick={() => navigate("/editar-programa", { state: programa })}><EditIcon /></Button>
                  <Button id={`botao-deletar-${programa.idPrograma}`} title="Deletar" onClick={() => { handleOpen(); setIdDelete(programa.idPrograma) }}><DeleteForeverIcon /></Button>
                </StyledTableCell>

              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination rowsPerPageOptions={[]} component="div" count={programas?.totalElementos ? programas.totalElementos : 0} rowsPerPage={programas?.tamanho ? programas.tamanho : 0} page={programas?.pagina ? programas.pagina : 0} onPageChange={mudarPagina}/>

      {/* Modal Confirmar Delete */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-titulo" aria-describedby="modal-modal-description" sx={{ backdropFilter: "blur(10px)" }}>
        <Box sx={style}>
          <Typography id="modal-modal-titulo" variant="h6" component="h2" color="error">Você realmente deseja excluir?</Typography>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", justifyContent: "center" }}>
            <Button id="botao-confirmar-modal" onClick={() => { if(idDelete) deletar(idDelete); handleClose(); }} size="medium" color="success" type="submit" sx={{ mt: 2 }} variant="contained">Confirmar</Button>
            <Button id="botao-fechar-modal" onClick={handleClose} size="medium" type="submit" sx={{ mt: 2 }} variant="contained">Fechar</Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
