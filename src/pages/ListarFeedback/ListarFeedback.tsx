import React, { useContext, useEffect, useState } from "react"

import { Navigate } from "react-router-dom";

import { Box, Typography, Paper, TableContainer, Table, TableRow, TableCell, TableBody, TablePagination, styled, tableCellClasses } from "@mui/material"

import { Header } from "../../components/Header/Header"

import { InstrutorContext } from "../../context/InstrutorContext";

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

export const ListarFeedback = () => {
  const { pegarFeedback, feedback} = useContext(InstrutorContext);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => { setPage(newPage); };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => { pegarFeedback(); }, [])

  const infosUsuario = JSON.parse(localStorage.getItem("infoUsuario") || "{}");
  if(infosUsuario.cargo !== "Instrutor") return <Navigate to="/"/>

  return (
    <>
      <Header/>

      <Box sx={{height:"calc(100vh - 64px)",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:5}}>
        <Typography id="titulo-body" sx={{textAlign: "center", fontSize: { xs:30, md:44 },fontWeight:"700",color:"white"}} variant="h3">Lista feedbacks</Typography>  

        <Paper sx={{ width: { xs:"95%", md:"65%" }, borderRadius: "10px", boxShadow: "10px 10px 10px #2f407ccf" }}>
          <TableContainer sx={{ maxHeight:430 }}>
            <Table stickyHeader aria-label="sticky table">
              <thead>
                <TableRow sx={{ backgroundColor:"#090F27", color: "white" }}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ top: 57, minWidth: column.minWidth,fontWeight:"700", fontSize:"1rem", textAlign: "center" }}>{column.label}</TableCell>
                  ))}
                </TableRow>
              </thead>
              <TableBody>
                {feedback.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
                  <StyledTableRow key={data.idFeedBack}>
                    <StyledTableCell id={`idFeedback-${data.idFeedBack}`} sx={{textAlign:"center", fontWeight:"600", fontSize: "1rem"}} component="td" scope="row">{data.idFeedBack}</StyledTableCell>
                    <StyledTableCell id={`nome-${data.idFeedBack}`} sx={{textAlign:"center", fontWeight:"600", fontSize: "1rem"}}>{data.alunoDTO.nome}</StyledTableCell> 
                    <StyledTableCell id={`tipo-${data.idFeedBack}`} sx={{textAlign:"center", fontWeight:"600", fontSize: "1rem"}}>{data.tipo}</StyledTableCell> 
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Paginação */}
          <Box sx={{display:"flex",alignItems:"center",justifyContent:"end",width:"100%",padding:"0 20px"}}>
            <TablePagination rowsPerPageOptions={[10, 20, 30]} component="div" count={feedback.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} labelRowsPerPage="Linhas por página:" />
          </Box>
        </Paper>
      </Box>
    </>
  )
}
