import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Typography, Paper, TableContainer, TablePagination, Table, TableRow, TableCell, TableBody, Button, Modal, styled, tableCellClasses, TableHead } from "@mui/material";

import { Edit, DeleteForever } from "@mui/icons-material";

import * as Componentes from "../../components";

import { useModulo } from "../../context/Tecnico/ModuloContext";
import Tooltip from "@mui/material/Tooltip";


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
  const navigate = useNavigate();
  const { pegarModulo, pegarModuloPorFiltro, deletarModulo, modulo } = useModulo();
  const [inputFiltro, setInputFiltro] = useState<string>('');

  useEffect(() => {
    pegarModulo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangePage = async (event: unknown, newPage: number) => {
    if (inputFiltro) {
      filtroModulo(inputFiltro, newPage)
    } else {
      await pegarModulo(newPage);
    }
  };

  const filtroModulo = async (valor: any, pagina: number = 0, tamanho: number = 10) => {
    setInputFiltro(valor);

    if (!isNaN(valor)) {
      await pegarModuloPorFiltro(pagina, tamanho, `&idModulo=${valor}`);
    } else {
      await pegarModuloPorFiltro(pagina, tamanho, `&nomeModulo=${valor}`);
    }
  }

  const resetFiltroModulo = async () => {
    await pegarModulo();
  }

  // Funções Modal
  const deletar = async (id: number) => { await deletarModulo(id) }

  const [idDelete, setIdDelete] = useState<number | undefined>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "80px", paddingBottom: "50px" }}>
      <Componentes.Titulo texto="Avalições" />

      <Box sx={{ width: { xs: "95%", md: "80%" }, display: "flex", alignItems: "end", flexDirection: "column", paddingTop: "20px", background: "#FFF", borderRadius: "10px", boxShadow: "5px 5px 10px var(--azul</Box>-escuro-dbc)" }}>

        <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "10px", paddingInline: 2 }}>
          <Componentes.CampoBusca label="Código ou Nome" buscar={filtroModulo} resetar={resetFiltroModulo} />

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
                {modulo?.elementos.map((data) => (
                  <StyledTableRow key={data.idModulo}>
                    <StyledTableCell id="nome" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }} scope="row">{data.idModulo}</StyledTableCell>

                    <StyledTableCell id="programa" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }}>{data.nome}</StyledTableCell>

                    <Tooltip title={data.trilhaDTO.map((trilha) => `${trilha.nome}`).join(', ')} PopperProps={{ sx: { marginTop: "-25px !important" } }} arrow>
                      <StyledTableCell id="trilha" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }}>
                        {data.trilhaDTO.map((trilha) => `${trilha.nome}`).join(', ')}
                      </StyledTableCell>
                    </Tooltip>

                    <StyledTableCell id="programa" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }}>
                      {data.listProgramaDTO.map((programa) => `${programa.nome}`).join(', ')}
                    </StyledTableCell>

                    <StyledTableCell id="acoes" sx={{ justifyContent: "center", minWidth: "150px", display: "flex", wrap: "nowrap" }}>
                      <Button id={`botao-editar-modulo`} title="Editar" onClick={() => { navigate("/editar-avaliacao", { state: data }) }}><Edit /></Button>
                      <Button id={`botao-deletar-modulo`} title="Deletar" onClick={() => { handleOpen(); setIdDelete(data.idModulo) }}><DeleteForever /></Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination rowsPerPageOptions={[]} component="div" count={modulo ? modulo.totalElementos : 0} rowsPerPage={modulo ? modulo.tamanho : 0} page={modulo ? modulo.pagina : 0} onPageChange={handleChangePage} />

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
