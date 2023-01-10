import { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { TableCell, Tooltip, tableCellClasses, TableRow, Box, Paper, TableContainer, Table, TableBody, Button, TablePagination, styled, TableHead } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { GestorContext } from "../../context/GestorContext";
import * as Componentes from "../../components";
import { useAcompanhamento } from "../../context/Comportamental/AcompanhamentoContext";
import { IAcompanhamentoApi } from "../../utils/AcompanhamentoInterface/acompanhamento";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: { backgroundColor: theme.palette.common.black, color: theme.palette.common.white },

  [`&.${tableCellClasses.body}`]: { fontSize: 14 },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
  "&:last-child td, &:last-child th": { border: 0 },
}));
interface Column {
  id: "codigo" | "titulo" | "dataInicial" | "programa" | "descricao" | "acoes";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: Column[] = [
  { id: "codigo", label: "Código", minWidth: 5 },
  { id: "titulo", label: "Título", minWidth: 5 },
  { id: "programa", label: "Programa", minWidth: 5 },
  { id: "dataInicial", label: "Data inicial", minWidth: 5 },
  { id: "descricao", label: "Descrição", minWidth: 5 },
  { id: "acoes", label: "Ações", minWidth: 5 }
];

export const ListarAcompanhamento = () => {
  const { pegarAcompanhamentos, acompanhamentos } = useAcompanhamento()
  const navigate = useNavigate()

  // const handleChangePage = async (event: unknown, newPage: number) => { await pegarAcompanhamento(newPage); };

  const filtrarAcompanhamento = async (valor: any, pagina: number = 0, tamanho: number = 10) => {
    console.log(valor);
  }

  const resetFiltroAcompanhamento = async () => {
    console.log("resetar");
  }

  useEffect(() => {
    pegarAcompanhamentos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "80px", paddingBottom: "50px" }}>
      <Componentes.Titulo texto="Acompanhamentos" />

      <Box sx={{ width: { xs: "95%", md: "80%" }, display: "flex", alignItems: "end", flexDirection: "column", paddingTop: "20px", background: "#FFF", borderRadius: "10px", boxShadow: "5px 5px 10px var(--azul</Box>-escuro-dbc)" }}>

        <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "10px", paddingInline: 2 }}>
          <Componentes.CampoBusca label="Nome" buscar={filtrarAcompanhamento} resetar={resetFiltroAcompanhamento} />
          <Button onClick={() => navigate("/cadastrar-acompanhamento")} variant="contained" sx={{ width: "auto", paddingLeft: "15px", paddingRight: "15px", display: "flex", marginBottom: "10px", marginRight: "14px", textTransform: "capitalize", fontSize: "1rem" }}>Cadastrar Acompanhamento</Button>
        </Box>

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
                {acompanhamentos?.elementos.map((acompanhamentos: IAcompanhamentoApi) => (
                  <StyledTableRow key={acompanhamentos.idAcompanhamento}>

                    <StyledTableCell sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }} component="td" scope="row"> {acompanhamentos.idAcompanhamento}</StyledTableCell>

                    <Tooltip title={acompanhamentos.titulo} PopperProps={{ sx: { marginTop: "-25px !important" } }} arrow>
                      <StyledTableCell id={`titulo-${acompanhamentos.idAcompanhamento}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }} >{acompanhamentos.titulo}</StyledTableCell>
                    </Tooltip>

                    <Tooltip title={acompanhamentos.descricao} PopperProps={{ sx: { marginTop: "-25px !important" } }} arrow>
                      <StyledTableCell id={`titulo-programa-${acompanhamentos.idAcompanhamento}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }} >{acompanhamentos.descricao}</StyledTableCell>
                    </Tooltip>

                    <Tooltip title={acompanhamentos.dataInicio.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1")} PopperProps={{ sx: { marginTop: "-25px !important" } }} arrow>
                      <StyledTableCell id={`dataInicio-${acompanhamentos.idAcompanhamento}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }}>{acompanhamentos.dataInicio.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1")}</StyledTableCell>
                    </Tooltip>

                    <Tooltip title={acompanhamentos.descricao} PopperProps={{ sx: { marginTop: "-25px !important" } }} arrow>
                      <StyledTableCell id={`descricao-${acompanhamentos.idAcompanhamento}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }} >{acompanhamentos.descricao}</StyledTableCell>
                    </Tooltip>

                    <StyledTableCell id={`cargo-${acompanhamentos.idAcompanhamento}`} sx={{ textAlign: "center" }}><Button id={`botao-avaliar-acompanhamento-${acompanhamentos.idAcompanhamento}`}
                      onClick={() => { navigate("/editar-acompanhamento", { state: acompanhamentos }) }}
                      title="Avaliar acompanhamento"><EditIcon /></Button></StyledTableCell>

                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Paginação */}
          {/* <TablePagination rowsPerPageOptions={[]} component="div" count={paginacaoAcompanhamento.totalElementos} rowsPerPage={paginacaoAcompanhamento.tamanho} page={paginacaoAcompanhamento.pagina} onPageChange={handleChangePage} /> */}
        </Paper>
      </Box>
    </Box>
  );
};