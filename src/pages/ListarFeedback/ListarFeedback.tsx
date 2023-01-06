import React, { useContext, useEffect } from "react"

import { Box, Paper, TableContainer, Table, TableRow, TableCell, TableBody, TablePagination, styled, tableCellClasses, Button } from "@mui/material"

import { InstrutorContext } from "../../context/InstrutorContext";
import { Titulo } from "../../components/Titulo/Titulo";
import { useNavigate } from "react-router-dom";
import TableHead from "@mui/material/TableHead";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: { backgroundColor: theme.palette.common.black, color: theme.palette.common.white },
  [`&.${tableCellClasses.body}`]: { fontSize: 14 },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
  "&:last-child td, &:last-child th": { border: 0 },
}));

interface Column {
  id: "codigo" | "nome" | "status";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "codigo", label: "Código", minWidth: 5 },
  { id: "nome", label: "Nome", minWidth: 5 },
  { id: "status", label: "Status", minWidth: 5, align: "right", format: (value: number) => value.toLocaleString("en-US") },
];

export const ListarFeedback: React.FC = () => {
  const navigate = useNavigate();
  const { pegarFeedback, feedback, paginacaoFeedback } = useContext(InstrutorContext);

  function formatarTexto(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const handleChangePage = async (event: unknown, newPage: number) => { await pegarFeedback(newPage); };

  useEffect(() => {
    // pegarFeedback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "80px", paddingBottom: "50px" }}>
      <Titulo texto="Feedbacks" />

      <Box sx={{ width: { xs: "95%", md: "80%" }, display: "flex", alignItems: "end", flexDirection: "column", paddingTop: "20px", background: "#FFF", borderRadius: "10px", boxShadow: "5px 5px 10px var(--azul</Box>-escuro-dbc)" }}>

        <Button onClick={() => navigate("/cadastrar-feedback")} variant="contained" sx={{ width: "auto", paddingLeft: "15px", paddingRight: "15px", display: "flex", marginBottom: "10px", marginRight: "14px", textTransform: "capitalize", fontSize: "1rem" }}>Cadastrar Feedback</Button>

        <Paper sx={{ width: "100%", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
          <TableContainer sx={{ maxHeight: 430 }}>
            <Table stickyHeader aria-label="sticky table">

              <TableHead sx={{ backgroundColor: "#090F27" }}>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: "33.33%", fontWeight: "700", fontSize: "1rem", textAlign: "center", backgroundColor: "#090F27", color: "white" }}>{column.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {feedback.map((data) => (
                  <StyledTableRow key={data.idFeedBack}>

                    <StyledTableCell id={`idFeedback-${data.idFeedBack}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }} component="td" scope="row">{data.idFeedBack}</StyledTableCell>

                    <StyledTableCell id={`nome-${data.idFeedBack}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }}>{data.alunoDTO.nome}</StyledTableCell>

                    <StyledTableCell id={`tipo-${data.idFeedBack}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }}>{formatarTexto(data.tipo)}</StyledTableCell>

                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Paginação */}
          <TablePagination rowsPerPageOptions={[]} component="div" count={paginacaoFeedback.totalElementos} rowsPerPage={paginacaoFeedback.tamanho} page={paginacaoFeedback.pagina} onPageChange={handleChangePage} />

        </Paper>
      </Box>
    </Box>
  )
}