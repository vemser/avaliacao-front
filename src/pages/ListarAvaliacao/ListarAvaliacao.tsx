import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Paper, TableContainer, TablePagination, Table, TableRow, TableCell, TableBody, Button, Modal, styled, tableCellClasses, TableHead } from "@mui/material";

import { Edit, DeleteForever } from "@mui/icons-material";

import * as Componentes from "../../components";

import Tooltip from "@mui/material/Tooltip";
import { GestorContext } from "../../context/GestorContext";


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
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "idAvalicao", label: "Código", minWidth: 5 },
  { id: "acompanhamento", label: "Acompanhamento", minWidth: 5 },
  { id: "aluno", label: "Aluno", minWidth: 5 },
  { id: "situacao", label: "Situação", minWidth: 5 },
  { id: "acoes", label: "Ações", minWidth: 5, align: "right", format: (value: number) => value.toLocaleString("en-US") }
];

// const style = {
//   position: "absolute" as const,
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 320,
//   bgcolor: "background.paper",
//   border: "none",
//   borderRadius: "5px",
//   textAlign: "center",
//   boxShadow: 20,
//   p: 4,
// };

export const ListarAvaliacao = () => {
  const { acompanhamento, pegarAcompanhamento, paginacaoAcompanhamento } = useContext(GestorContext);
  const navigate = useNavigate()

  const handleChangePage = async (event: unknown, newPage: number) => { await pegarAcompanhamento(newPage); };

  const filtrarAcompanhamento = async (valor: any, pagina: number = 0, tamanho: number = 10) => {
    console.log(valor);
  }

  const resetFiltroAcompanhamento = async () => {
    console.log("resetar");
  }

  useEffect(() => {
    // pegarAcompanhamento()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Funções Modal
  // const deletar = async (id: number) => { await deletarModulo(id) }

  // const [idDelete, setIdDelete] = useState<number | undefined>();
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "80px", paddingBottom: "50px" }}>
      <Componentes.Titulo texto="Avalições" />

      <Box sx={{ width: { xs: "95%", md: "80%" }, display: "flex", alignItems: "end", flexDirection: "column", paddingTop: "20px", background: "#FFF", borderRadius: "10px", boxShadow: "5px 5px 10px var(--azul</Box>-escuro-dbc)" }}>

        <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "10px", paddingInline: 2 }}>
          <Componentes.CampoBusca label="Código ou Nome" buscar={filtrarAcompanhamento} resetar={resetFiltroAcompanhamento} />

          <Button onClick={() => navigate("/cadastrar-avaliacao")} variant="contained" sx={{ width: "auto", paddingLeft: "15px", paddingRight: "15px", display: "flex", textTransform: "capitalize", fontSize: "1rem" }}>Cadastrar avaliação</Button>
        </Box>

        <Paper sx={{ width: "100%", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
          <TableContainer id="tabela-admin" sx={{ maxHeight: 430 }}>
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
                {acompanhamento?.map((acompanhamentos) => (
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
                      title="Avaliar acompanhamento"><Edit/></Button></StyledTableCell>

                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination rowsPerPageOptions={[]} component="div" count={paginacaoAcompanhamento.totalElementos} rowsPerPage={paginacaoAcompanhamento.tamanho} page={paginacaoAcompanhamento.pagina} onPageChange={handleChangePage} />

          {/* <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-titulo" aria-describedby="modal-modal-description" sx={{ backdropFilter: "blur(6px)" }}>
            <Box sx={style}>
              <Typography id="modal-modal-titulo" variant="h6" sx={{ fontWeight: 600, userSelect: "none", marginBottom: "10px", color: "var(--azul-forte-dbc)", fontSize: "1.4rem" }}>Você tem certeza?</Typography>
              <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", bottom: 0, paddingTop: "20px", gap: 2, flexDirection: "column" }}>
                <Button type="button" onClick={() => { if (idDelete) deletar(idDelete); handleClose(); }} variant="contained" color="error" sx={{ textTransform: "capitalize", fontSize: "1.05rem", width: "180px" }}>Deletar</Button>
                <Button type="button" onClick={handleClose} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d" }, textTransform: "capitalize", fontSize: "1.05rem", width: "180px" }}>Cancelar</Button>
              </Box>
            </Box>
          </Modal> */}
        </Paper>
      </Box>
    </Box>
  )
}
