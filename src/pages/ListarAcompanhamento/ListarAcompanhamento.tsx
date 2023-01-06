import React, { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { TableCell, tableCellClasses, TableRow, Box, Paper, TableContainer, Table, TableBody, Button, TablePagination, styled, TableHead } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { GestorContext } from "../../context/GestorContext";
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
  id: "codigo" | "titulo" | "dataInicial" | "descricao" | "acoes";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "codigo", label: "Código", minWidth: 5 },
  { id: "titulo", label: "Título", minWidth: 5 },
  { id: "dataInicial", label: "Data inicial", minWidth: 5 },
  { id: "descricao", label: "Descrição", minWidth: 5, align: "right", format: (value: number) => value.toLocaleString("en-US") },
  { id: "acoes", label: "Ações", minWidth: 5, align: "right", format: (value: number) => value.toLocaleString("en-US") }
];

export const ListarAcompanhamento = () => {
  const { acompanhamento, pegarAcompanhamento, paginacaoAcompanhamento } = useContext(GestorContext);
  const navigate = useNavigate()

  const handleChangePage = async (event: unknown, newPage: number) => { await pegarAcompanhamento(newPage); };

  useEffect(() => { 
    // pegarAcompanhamento()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "80px", paddingBottom: "50px" }}>
      <Titulo texto="Acompanhamentos" />

      <Box sx={{ width: { xs: "95%", md: "80%" }, display: "flex", alignItems: "end", flexDirection: "column", paddingTop: "20px", background: "#FFF", borderRadius: "10px", boxShadow: "5px 5px 10px var(--azul</Box>-escuro-dbc)" }}>

        <Button onClick={() => navigate("/cadastrar-acompanhamento")} variant="contained" sx={{ width: "auto", paddingLeft: "15px", paddingRight: "15px", display: "flex", marginBottom: "10px", marginRight: "14px", textTransform: "capitalize", fontSize: "1rem" }}>Cadastrar Acompanhamento</Button>

        <Paper sx={{ width: "100%", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
          <TableContainer sx={{ maxHeight: 430 }}>
            <Table stickyHeader aria-label="sticky table">

              <TableHead sx={{ backgroundColor: "#090F27" }} >
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: "20%", fontWeight: "700", fontSize: "1rem", textAlign: "center", backgroundColor: "#090F27", color: "white" }}>{column.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {acompanhamento.map((acompanhamentos) => (
                  <StyledTableRow key={acompanhamentos.idAcompanhamento}>

                    <StyledTableCell sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }} component="td" scope="row"> {acompanhamentos.idAcompanhamento}</StyledTableCell>

                    <StyledTableCell id={`titulo-${acompanhamentos.idAcompanhamento}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }} >{acompanhamentos.titulo}</StyledTableCell>


                    <StyledTableCell id={`dataInicio-${acompanhamentos.idAcompanhamento}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }}>{acompanhamentos.dataInicio.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1")}</StyledTableCell>

                    <StyledTableCell id={`descricao-${acompanhamentos.idAcompanhamento}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }} >{acompanhamentos.descricao}</StyledTableCell>

                    <StyledTableCell id={`cargo-${acompanhamentos.idAcompanhamento}`} sx={{ textAlign: "center" }}><Button id={`botao-avaliar-acompanhamento-${acompanhamentos.idAcompanhamento}`}
                      onClick={() => { navigate("/editar-acompanhamento", { state: acompanhamentos }) }}
                      title="Avaliar acompanhamento"><EditIcon /></Button></StyledTableCell>

                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Paginação */}
          <TablePagination rowsPerPageOptions={[]} component="div" count={paginacaoAcompanhamento.totalElementos} rowsPerPage={paginacaoAcompanhamento.tamanho} page={paginacaoAcompanhamento.pagina} onPageChange={handleChangePage} />
        </Paper>
      </Box>
    </Box>
  );
};