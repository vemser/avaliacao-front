import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Paper, TableContainer, TablePagination, Table, TableRow, TableCell, TableBody, Button, Modal, styled, tableCellClasses, TableHead } from "@mui/material";

import { Edit, DeleteForever, ExpandLess, ExpandMore } from "@mui/icons-material";

import * as Componentes from "../../components";

import Tooltip from "@mui/material/Tooltip";

import { useAvaliacao } from "../../context/Comportamental/AvaliacaoContext";
import Typography from "@mui/material/Typography";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: { backgroundColor: theme.palette.common.black, color: theme.palette.common.white },
  [`&.${tableCellClasses.body}`]: { fontSize: 14 },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
  "&:last-child td, &:last-child th": { border: 0 },
}));

interface Column {
  id: "idAvalicao" | "acompanhamento" | "aluno" | "situacao" | "acoes";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: Column[] = [
  { id: "idAvalicao", label: "Código", minWidth: 5 },
  { id: "acompanhamento", label: "Acompanhamento", minWidth: 5 },
  { id: "aluno", label: "Aluno", minWidth: 5 },
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

export const ListarAvaliacao = () => {
  const [estadoFiltro, setEstadoFiltro] = useState<boolean>(false);

  const { pegarAvaliacao, deletarAvaliacao, avaliacoes } = useAvaliacao();

  const navigate = useNavigate();

  const handleChangePage = async (event: unknown, newPage: number) => { await pegarAvaliacao(newPage); };

  // const filtrarAcompanhamento = async (valor: any, pagina: number = 0, tamanho: number = 10) => {
  //   console.log(valor);
  // }

  // const resetFiltroAcompanhamento = async () => {
  //   console.log("resetar");
  // }

  useEffect(() => {
    pegarAvaliacao();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Funções Modal
  const deletar = async (id: number) => { await deletarAvaliacao(id) }

  const [idDelete, setIdDelete] = useState<number | undefined>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "60px", paddingBottom: "50px" }}>
      <Componentes.Titulo texto="Avaliações" />

      <Box sx={{ width: { xs: "95%", md: "90%" }, display: "flex", alignItems: "end", flexDirection: "column", paddingTop: "20px", background: "#FFF", borderRadius: "10px", boxShadow: "5px 5px 10px var(--azul</Box>-escuro-dbc)" }}>

        <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "10px", paddingInline: 2 }}>
          <Button onClick={() => { setEstadoFiltro(!estadoFiltro) }} id="botao-swap" variant='outlined' sx={{ width: "120px", display: "flex", textTransform: "capitalize", justifyContent: "space-between", fontSize: "1rem" }}>Filtros{estadoFiltro ? <ExpandLess /> : <ExpandMore />}</Button>

          <Button onClick={() => navigate("/cadastrar-avaliacao")} variant="contained" sx={{ width: "auto", paddingLeft: "15px", paddingRight: "15px", display: "flex", textTransform: "capitalize", fontSize: "1rem" }}>Cadastrar avaliação</Button>
        </Box>

        {estadoFiltro &&
          <Box sx={{ display: "flex", gap: 3, flexDirection: "row", alignItems: "center", width: "100%", marginBottom: "10px", paddingInline: 2, marginTop: "10px", flexWrap: "wrap" }}>

            <Componentes.FiltroAvaliacao />

          </Box>}

        <Paper sx={{ width: "100%", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
          <TableContainer id="tabela-admin" sx={{ maxHeight: 450 }}>
            <Table stickyHeader aria-label="sticky table">

              <TableHead sx={{ backgroundColor: "#090F27" }}>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: "20%", fontWeight: "700", fontSize: "1rem", textAlign: "center", backgroundColor: "#090F27", color: "white" }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {avaliacoes?.elementos.map((avaliacao) => (
                  <StyledTableRow key={avaliacao.idAvaliacao}>

                    <StyledTableCell sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px", cursor: "default" }} component="td" scope="row"> {avaliacao.idAvaliacao}</StyledTableCell>

                    <Tooltip title={avaliacao.acompanhamento.titulo} PopperProps={{ sx: { marginTop: "-25px !important" } }} arrow>
                      <StyledTableCell id={`titulo-${avaliacao.idAvaliacao}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px", cursor: "default" }} >{avaliacao.acompanhamento.titulo}</StyledTableCell>
                    </Tooltip>

                    <Tooltip title={avaliacao.aluno.nome} PopperProps={{ sx: { marginTop: "-25px !important" } }} arrow>
                      <StyledTableCell id={`id-aluno-${avaliacao.aluno.idAluno}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px", cursor: "default" }} >{avaliacao.aluno.nome}</StyledTableCell>
                    </Tooltip>

                    <Tooltip title={avaliacao.tipoAvaliacao === "POSITIVO" ? "Positivo" : "Atenção"} PopperProps={{ sx: { marginTop: "-25px !important" } }} arrow>
                      <StyledTableCell id={`tipo-${avaliacao.idAvaliacao}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px", cursor: "default" }}>{avaliacao.tipoAvaliacao === "POSITIVO" ? "Positivo" : "Atenção"}</StyledTableCell>
                    </Tooltip>

                    <StyledTableCell id="acoes" sx={{ justifyContent: "center", display: "flex", wrap: "nowrap" }}>
                      <Button id={`botao-editar-${avaliacao.idAvaliacao}`} title="Editar" onClick={() => navigate("/editar-avaliacao", { state: avaliacao })}><Edit /></Button>
                      <Button id={`botao-deletar-${avaliacao.idAvaliacao}`} title="Deletar" onClick={() => { handleOpen(); setIdDelete(avaliacao.idAvaliacao) }}><DeleteForever /></Button>
                    </StyledTableCell>

                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination rowsPerPageOptions={[]} component="div" count={avaliacoes ? avaliacoes.totalElementos : 0} rowsPerPage={avaliacoes ? avaliacoes.tamanho : 0} page={avaliacoes ? avaliacoes.pagina : 0} onPageChange={handleChangePage} />

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
    </Box>
  )
}
