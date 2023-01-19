import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { TableCell, Tooltip, tableCellClasses, TableRow, Typography, Modal, Box, Paper, TableContainer, Table, TableBody, Button, TablePagination, styled, TableHead } from "@mui/material";
import { Edit, DeleteForever } from "@mui/icons-material";

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

export const ListarAcompanhamento = () => {
  const { pegarAcompanhamentos, pegarAcompanhamentoNomePrograma, acompanhamentos, desativarAcompanhamento } = useAcompanhamento();
  const [inputFiltro, setInputFiltro] = useState<string>('');
  const navigate = useNavigate()

  const mudarPagina = async (event: unknown, newPage: number) => {
    if (inputFiltro) {
      await filtrarAcompanhamento(inputFiltro, newPage);
    } else {
      await pegarAcompanhamentos(newPage);
    }
  };

  // Funções Modal
  const [idDelete, setIdDelete] = useState<number | undefined>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filtrarAcompanhamento = async (valor: any, pagina: number = 0, tamanho: number = 10) => {
    setInputFiltro(valor);
    await pegarAcompanhamentoNomePrograma(valor);
  }

  const resetFiltroAcompanhamento = async () => {
    setInputFiltro("");
    pegarAcompanhamentos();
  }

  useEffect(() => {
    pegarAcompanhamentos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "60px", paddingBottom: "50px" }}>
        <Componentes.Titulo texto="Acompanhamentos" />

        <Box sx={{ width: { xs: "95%", md: "90%" }, display: "flex", alignItems: "end", flexDirection: "column", paddingTop: "20px", background: "#FFF", borderRadius: "10px", boxShadow: "5px 5px 10px var(--azul</Box>-escuro-dbc)" }}>

          <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "10px", paddingInline: 2 }}>
            <Componentes.CampoBusca label="Nome do Programa" buscar={filtrarAcompanhamento} resetar={resetFiltroAcompanhamento} />
            <Button onClick={() => navigate("/cadastrar-acompanhamento")} variant="contained" sx={{ width: "auto", paddingLeft: "15px", paddingRight: "15px", display: "flex", textTransform: "capitalize", fontSize: "1rem" }}>Cadastrar Acompanhamento</Button>
          </Box>

          <Paper sx={{ width: "100%", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
            <TableContainer sx={{ maxHeight: 450 }}>
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

                      <StyledTableCell sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px", cursor: "default" }} component="td" scope="row"> {acompanhamentos.idAcompanhamento}</StyledTableCell>

                      <Tooltip title={acompanhamentos.titulo} PopperProps={{ sx: { marginTop: "-25px !important" } }} arrow>
                        <StyledTableCell id={`titulo-${acompanhamentos.idAcompanhamento}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px", cursor: "default" }} >{acompanhamentos.titulo}</StyledTableCell>
                      </Tooltip>

                      <Tooltip title={acompanhamentos.programa.nome} PopperProps={{ sx: { marginTop: "-25px !important" } }} arrow>
                        <StyledTableCell id={`titulo-programa-${acompanhamentos.idAcompanhamento}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px", cursor: "default" }} >{acompanhamentos.programa.nome}</StyledTableCell>
                      </Tooltip>

                      <Tooltip title={acompanhamentos.dataInicio.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1")} PopperProps={{ sx: { marginTop: "-25px !important" } }} arrow>
                        <StyledTableCell id={`dataInicio-${acompanhamentos.idAcompanhamento}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px", cursor: "default" }}>{acompanhamentos.dataInicio.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1")}</StyledTableCell>
                      </Tooltip>

                      <Tooltip title={acompanhamentos.descricao} PopperProps={{ sx: { marginTop: "-25px !important" } }} arrow>
                        <StyledTableCell id={`descricao-${acompanhamentos.idAcompanhamento}`} sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px", cursor: "default" }} >{acompanhamentos.descricao}</StyledTableCell>
                      </Tooltip>

                      <StyledTableCell id="acoes" sx={{ justifyContent: "center", display: "flex", wrap: "nowrap" }}>
                        <Button id={`botao-editar-${acompanhamentos.idAcompanhamento}`} title="Deletar" onClick={() => navigate("/editar-acompanhamento", { state: acompanhamentos })}><Edit /></Button>
                        <Button id={`botao-deletar-${acompanhamentos.idAcompanhamento}`} title="Deletar" onClick={() => { handleOpen(); setIdDelete(acompanhamentos.idAcompanhamento) }}><DeleteForever /></Button>
                      </StyledTableCell>

                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Paginação */}
            <TablePagination rowsPerPageOptions={[]} component="div" count={acompanhamentos ? acompanhamentos.totalElementos : 0} rowsPerPage={acompanhamentos ? acompanhamentos.tamanho : 0} page={acompanhamentos ? acompanhamentos.pagina : 0} onPageChange={mudarPagina} />
          </Paper>
        </Box>
      </Box>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-titulo" aria-describedby="modal-modal-description" sx={{ backdropFilter: "blur(6px)" }}>
        <Box sx={style}>
          <Typography id="modal-modal-titulo" variant="h6" sx={{ fontWeight: 600, userSelect: "none", marginBottom: "10px", color: "var(--azul-forte-dbc)", fontSize: "1.4rem" }}>Você tem certeza?</Typography>
          <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", bottom: 0, paddingTop: "20px", gap: 2, flexDirection: "column" }}>
            <Button type="button" onClick={() => { if (idDelete) desativarAcompanhamento(idDelete); handleClose(); }} variant="contained" color="error" sx={{ textTransform: "capitalize", fontSize: "1.05rem", width: "180px" }}>Deletar</Button>
            <Button type="button" onClick={handleClose} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d" }, textTransform: "capitalize", fontSize: "1.05rem", width: "180px" }}>Cancelar</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};