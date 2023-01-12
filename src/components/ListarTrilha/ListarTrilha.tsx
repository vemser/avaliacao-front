import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Typography, TableContainer, Table, TableRow, TableCell, TableBody, tableCellClasses, Button, TablePagination, Modal, styled, Tooltip, Paper, TableHead } from '@mui/material';

import * as Componentes from "../../components";

import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

import { useTrilha } from '../../context/Tecnico/TrilhaContext';
import { usePrograma } from '../../context/Tecnico/ProgramaContext';
import { ITrilhasElementos } from '../../utils/TrilhaInterface/trilha';

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
}

const columns: Column[] = [
  { id: "codigo", label: "Código", minWidth: 5 },
  { id: "nome", label: "Nome da Trilha", minWidth: 5 },
  { id: "descricao", label: "Descrição", minWidth: 5 },
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

export const ListarTrilha = () => {
  const navigate = useNavigate();
  const { trilhas, pegarTrilha, deletarTrilha, pegarTrilhaFiltroID, pegarTrilhaFiltroNome } = useTrilha();
  const [inputFiltro, setInputFiltro] = useState<string>('');

  const handleChangePage = async (event: unknown, newPage: number) => {
    if (inputFiltro) {
      filtrosTrilha(inputFiltro, newPage)
    } else {
      await pegarTrilha(newPage);
    }
  };

  const filtrosTrilha = async (valor: any, pagina: number = 0, tamanho: number = 10) => {
    setInputFiltro(valor);

    if (!isNaN(valor)) {
      await pegarTrilhaFiltroID(valor);
    } else {
      await pegarTrilhaFiltroNome(valor, pagina, tamanho);
    }
  }

  const resetBuscaTrilha = async () => {
    await pegarTrilha();
  }

  // Funções Modal
  const [idDelete, setIdDelete] = useState<number | undefined>(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    pegarTrilha();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box sx={{ width: { xs: "95%", md: "90%" }, display: "flex", alignItems: "end", flexDirection: "column", paddingTop: "20px", background: "#FFF", borderRadius: "10px", boxShadow: "5px 5px 10px var(--azul</Box>-escuro-dbc)" }}>

        <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "10px" }}>
          <Componentes.CampoBusca label="Código ou Nome" buscar={filtrosTrilha} resetar={resetBuscaTrilha} />

          <Button onClick={() => navigate("/cadastrar-trilha")} variant="contained" sx={{ minWidth: { xs: "260px", md: "160px" }, display: "flex", marginRight: { xs: "0", md: "14px" }, textTransform: "capitalize", fontSize: "1rem" }}>Cadastrar Trilha</Button>
        </Box>

        <Paper sx={{ width: "100%", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
          <TableContainer sx={{ maxHeight: 450 }}>
            <Table component="table" stickyHeader aria-label="sticky table">

              <TableHead sx={{ backgroundColor: "#090F27" }}>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: "33.3%", fontWeight: "700", fontSize: "1rem", textAlign: "center", backgroundColor: "#090F27", color: "white" }}>{column.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {trilhas?.elementos.map((trilha: ITrilhasElementos) => (
                  <StyledTableRow key={trilha.idTrilha}>

                    <StyledTableCell id="id-trilha" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }} component="td" scope="row">{trilha.idTrilha}</StyledTableCell>

                    <Tooltip title={trilha.nome} PopperProps={{ sx: { marginTop: "-25px !important" } }} arrow>
                      <StyledTableCell id="nome-trilha" sx={{
                        textAlign: "center", fontWeight
                          : "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px"
                      }} component="td" scope="row">{trilha.nome}</StyledTableCell>
                    </Tooltip>

                    <Tooltip title={trilha.descricao} PopperProps={{ sx: { marginTop: "-25px !important" } }} arrow>
                      <StyledTableCell id="descricao-trilha" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }}>{trilha.descricao ? trilha.descricao : "Sem descrição"}</StyledTableCell>
                    </Tooltip>

                    <StyledTableCell id="acoes-trilha" sx={{ justifyContent: "center", minWidth: "150px", display: "flex", wrap: "nowrap" }}>
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
          <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-titulo" aria-describedby="modal-modal-description" sx={{ backdropFilter: "blur(6px)" }}>
            <Box sx={style}>
              <Typography id="modal-modal-titulo" variant="h6" sx={{ fontWeight: 600, userSelect: "none", marginBottom: "10px", color: "var(--azul-forte-dbc)", fontSize: "1.4rem" }}>Você tem certeza?</Typography>
              <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", bottom: 0, paddingTop: "20px", gap: 2, flexDirection: "column" }}>
                <Button type="button" onClick={() => { deletarTrilha(idDelete); handleClose(); }} variant="contained" color="error" sx={{ textTransform: "capitalize", fontSize: "1.05rem", width: "180px" }}>Deletar</Button>
                <Button type="button" onClick={handleClose} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d" }, textTransform: "capitalize", fontSize: "1.05rem", width: "180px" }}>Cancelar</Button>
              </Box>
            </Box>
          </Modal>

        </Paper>
      </Box>
    </>
  )
}
