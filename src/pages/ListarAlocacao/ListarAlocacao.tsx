import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { TableCell, tableCellClasses, TableRow, Box, Paper, TableContainer, Table, TableBody, Button, TablePagination, styled, TableHead } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import { Titulo } from "../../components/Titulo/Titulo";
import { useReservaAlocacao } from "../../context/Alocacao/ReservaAlocacaoContext";

import * as Componentes from "../../components";
import { formatarTexto } from "../../utils/functions";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: { backgroundColor: theme.palette.common.black, color: theme.palette.common.white },
  [`&.${tableCellClasses.body}`]: { fontSize: 14 },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
  "&:last-child td, &:last-child th": { border: 0 },
}));


interface Column {
  id: "codigo" | "aluno" | "vaga" | "cliente" | "situacao" | "acoes";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: Column[] = [
  { id: "codigo", label: "Código", minWidth: 5 },
  { id: "aluno", label: "Aluno", minWidth: 5 },
  { id: "vaga", label: "Vaga", minWidth: 5 },
  { id: "cliente", label: "Cliente", minWidth: 5 },
  { id: "situacao", label: "Situação", minWidth: 5 },
  { id: "acoes", label: "Ações", minWidth: 5 }
];


export const ListarAlocacao: React.FC = () => {
  const navigate = useNavigate();
  const { pegarReservaAlocacao, reservaAlocacao, filtroReservaAlocacao } = useReservaAlocacao()


  const filtroAlocacao = async (valor: string, pagina: number = 0, tamanho: number = 10) => {
    await filtroReservaAlocacao(valor, pagina, tamanho)
  }

  const resetBuscaAlocacao = async () => {
    await pegarReservaAlocacao();
  }

  useEffect(() => {
    pegarReservaAlocacao()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleChangePage = async (event: unknown, newPage: number) => { await pegarReservaAlocacao(newPage) };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "60px", paddingBottom: "50px" }}>
      <Titulo texto="Reserva e Alocação" />

      <Box sx={{ width: { xs: "95%", md: "90%" }, display: "flex", alignItems: "end", flexDirection: "column", paddingTop: "20px", background: "#FFF", borderRadius: "10px", boxShadow: "5px 5px 10px var(--azul</Box>-escuro-dbc)" }}>

        <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "10px", paddingInline: 2 }}>

          <Componentes.CampoBusca label="Nome, vaga ou cliente" buscar={filtroAlocacao} resetar={resetBuscaAlocacao} />

          <Button onClick={() => navigate("/cadastrar-reserva-alocacao")} variant="contained" sx={{ width: "auto", paddingLeft: "15px", paddingRight: "15px", display: "flex", textTransform: "capitalize", fontSize: "1rem" }}>Cadastrar Alocação</Button>
        </Box>


        <Paper sx={{ width: "100%", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
          <TableContainer sx={{ maxHeight: 450 }}>
            <Table stickyHeader aria-label="sticky table">

              <TableHead sx={{ backgroundColor: "#090F27" }} >
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: "16.6%", fontWeight: "700", fontSize: "1rem", textAlign: "center", backgroundColor: "#090F27", color: "white" }}>{column.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {reservaAlocacao?.elementos.map((alocacao) => (
                  <StyledTableRow key={alocacao?.idReservaAlocacao}>

                    <StyledTableCell sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }} component="td" scope="row"> {alocacao?.idReservaAlocacao}</StyledTableCell>

                    <StyledTableCell id={`aluno}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }} >{alocacao?.aluno.nome}</StyledTableCell>

                    <StyledTableCell id={`vaga`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }}>{alocacao?.vaga.nome}</StyledTableCell>

                    <StyledTableCell id={`cliente`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }} >{alocacao?.vaga.cliente.nome}</StyledTableCell>

                    <StyledTableCell id={`situacao`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }} >{formatarTexto(alocacao.situacao)}</StyledTableCell>

                    <StyledTableCell id={`editar-reserva`} sx={{ textAlign: "center" }}>
                      <Button id={`botao-alocacao-reserva-${alocacao.idReservaAlocacao}`} onClick={() => navigate("/editar-alocacao-reserva", { state: alocacao })} title="Editar"><EditIcon /></Button>
                    </StyledTableCell>

                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Paginação */}
          <TablePagination rowsPerPageOptions={[]} component="div" count={reservaAlocacao ? reservaAlocacao.totalElementos : 0} rowsPerPage={reservaAlocacao ? reservaAlocacao.tamanho : 0} page={reservaAlocacao ? reservaAlocacao.pagina : 0} onPageChange={handleChangePage} />
        </Paper>

      </Box>
    </Box>
  );
};