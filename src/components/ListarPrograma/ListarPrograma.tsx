import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Typography, TableContainer, Table, TableRow, TableCell, TableBody, tableCellClasses, Button, TablePagination, Modal, styled, Tooltip, TableHead, Paper } from '@mui/material';

import * as Componentes from "../../components";

import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

import { usePrograma } from '../../context/Tecnico/ProgramaContext';
import { IProgramas } from '../../utils/programaInterface';
import { formatarTexto } from '../../utils/functions';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: { backgroundColor: theme.palette.common.black, color: theme.palette.common.white },
  [`&.${tableCellClasses.body}`]: { fontSize: 14 },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
  "&:last-child td, &:last-child th": { border: 0 },
}));

interface Column {
  id: "codigo" | "nome" | "descricao" | "situacao" | "dataInicio" | "dataFim" | "acoes";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: Column[] = [
  { id: "codigo", label: "Código", minWidth: 5 },
  { id: "nome", label: "Nome do Programa", minWidth: 5 },
  { id: "descricao", label: "Descrição", minWidth: 5 },
  { id: "situacao", label: "Situação", minWidth: 5 },
  { id: "dataInicio", label: "Data de Início", minWidth: 5 },
  { id: "dataFim", label: "Data de Fim", minWidth: 5 },
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

export const ListarPrograma = () => {
  const navigate = useNavigate();

  const [inputFiltro, setInputFiltro] = useState<string>('');
  const { pegarProgramaPorNome, pegarProgramaFiltroID, pegarPrograma, deletarProgama, programas, mudaDashboard, setMudaDashboard } = usePrograma();

  const trocarTabela = () => !mudaDashboard ? setMudaDashboard(true) : setMudaDashboard(false);

  // Funções Modal
  const [idDelete, setIdDelete] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const mudarPagina = async (event: unknown, newPage: number) => {
    if (inputFiltro) {
      filtrosTrilha(inputFiltro, newPage)
    } else {
      await pegarPrograma(newPage);
    }
  };

  const filtrosTrilha = async (valor: any, pagina: number = 0, tamanho: number = 10) => {
    setInputFiltro(valor);

    if (!isNaN(valor)) {
      await pegarProgramaFiltroID(valor);
    } else {
      await pegarProgramaPorNome(valor, pagina, tamanho);
    }
  }

  const resetBuscaTrilha = async () => {
    await pegarPrograma();
  }

  const deletar = async (id: number) => { await deletarProgama(id) }

  useEffect(() => {
    pegarPrograma()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Box sx={{ width: { xs: "95%", md: "80%" }, display: "flex", alignItems: "end", flexDirection: "column", paddingTop: "20px", background: "#FFF", borderRadius: "10px", boxShadow: "5px 5px 10px var(--azul</Box>-escuro-dbc)" }}>

        <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: "center", width: "100%", paddingBottom: "10px" }}>
          <Button onClick={trocarTabela} id="botao-swap" variant='outlined' sx={{ width: { xs: "260px", md: "auto" }, display: "flex", marginLeft: { xs: "0", md: "14px" }, textTransform: "capitalize", fontSize: "1rem" }}>Trilhas <SwapHorizIcon /></Button>

          <Componentes.CampoBusca label="Código ou Nome" buscar={filtrosTrilha} resetar={resetBuscaTrilha} />

          <Button onClick={() => navigate("/cadastrar-programa")} variant="contained" sx={{ minWidth: { xs: "260px", md: "190px" }, display: "flex", marginRight: { xs: "0", md: "14px" }, textTransform: "capitalize", fontSize: "1rem" }}>Cadastrar Programa</Button>
        </Box>

        <Paper sx={{ width: "100%", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
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
                {programas?.elementos.map((programa: IProgramas) => (
                  <StyledTableRow key={programa.idPrograma}>
                    <StyledTableCell id="id-programa" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }} component="td" scope="row">{programa.idPrograma}</StyledTableCell>

                    <StyledTableCell id="nome-programa" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }} component="td" scope="row">{programa.nome}</StyledTableCell>

                    <Tooltip title={programa.descricao} PopperProps={{ sx: { marginTop: "-25px !important" } }} arrow>
                      <StyledTableCell id="descricao-programa" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }}>{programa.descricao ? programa.descricao : "Sem descrição"}</StyledTableCell>
                    </Tooltip>

                    <StyledTableCell id="situacao-programa" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }}>{formatarTexto(programa.situacao)}</StyledTableCell>

                    <StyledTableCell id="dataInicio-programa" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }}>{programa.dataInicio.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1")}</StyledTableCell>

                    <StyledTableCell id="dataFim-programa" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }}>{programa.dataFim.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1")}</StyledTableCell>

                    <StyledTableCell id="acoes-programa" sx={{ justifyContent: "center", minWidth: "150px", display: "flex", wrap: "nowrap" }}>
                      <Button id={`botao-editar-${programa.idPrograma}`} title="Editar" onClick={() => navigate("/editar-programa", { state: programa })}><EditIcon /></Button>

                      <Button id={`botao-deletar-${programa.idPrograma}`} title="Deletar" onClick={() => { handleOpen(); setIdDelete(programa.idPrograma) }}><DeleteForeverIcon /></Button>
                    </StyledTableCell>

                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination rowsPerPageOptions={[]} component="div" count={programas?.totalElementos ? programas.totalElementos : 0} rowsPerPage={programas?.tamanho ? programas.tamanho : 0} page={programas?.pagina ? programas.pagina : 0} onPageChange={mudarPagina} />

          {/* Modal Confirmar Delete */}
          <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-titulo" aria-describedby="modal-modal-description" sx={{ backdropFilter: "blur(6px)" }}>
            <Box sx={style}>
              <Typography id="modal-modal-titulo" variant="h6" sx={{ fontWeight: 600, userSelect: "none", marginBottom: "10px", color: "var(--azul-forte-dbc)", fontSize: "1.4rem" }}>Você tem certeza?</Typography>
              <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", bottom: 0, paddingTop: "20px", gap: 2, flexDirection: "column" }}>
                <Button type="button" onClick={() => { if (idDelete) deletar(idDelete); handleClose(); }} variant="contained" color="error" sx={{ textTransform: "capitalize", fontSize: "1.05rem", width: "180px" }}>Deletar</Button>
                <Button type="button" onClick={handleClose} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d" }, textTransform: "capitalize", fontSize: "1.05rem", width: "180px" }}>Cancelar</Button>
              </Box>
            </Box>
          </Modal>
        </Paper>
      </Box>
    </>
  )
}
