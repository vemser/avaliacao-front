import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Paper, TableContainer, Table, TableRow, TableCell, TableBody, Button, TablePagination, tableCellClasses, Box, Typography, Modal, styled, TableHead, Tooltip } from "@mui/material";
import { Edit, DeleteForever } from "@mui/icons-material";

import * as Componentes from "../../components";

import { useAluno } from "../../context/Comportamental/AlunoContext";
import { IAlunosElementos } from "../../utils/AlunoInterface/aluno";
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
  id: "codigo" | "nome" | "email" | "trilha" | "situacao" | "acoes";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: Column[] = [
  { id: "codigo", label: "Código", minWidth: 5 },
  { id: "nome", label: "Nome", minWidth: 5 },
  { id: "email", label: "E-mail", minWidth: 5 },
  { id: "trilha", label: "Trilha", minWidth: 5 },
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

export const ListarAluno: React.FC = () => {
  const navigate = useNavigate();
  const { pegarAluno, alunos, deletarAluno } = useAluno();

  const [inputFiltro, setInputFiltro] = useState<string>('');

  useEffect(() => {
    pegarAluno();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Funções Modal
  const [idDelete, setIdDelete] = useState<number | undefined>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangePage = async (event: unknown, newPage: number) => {
    if (inputFiltro) {
      filtrosAluno(inputFiltro, newPage)
    } else {
      await pegarAluno(newPage);
    }
  };

  const filtrosAluno = async (valor: any, pagina: number = 0, tamanho: number = 10) => {
    setInputFiltro(valor);

    if (valor.includes("@")) {
      await pegarAluno(pagina, tamanho, `&email=${valor}`)
    } else if (!isNaN(valor)) {
      await pegarAluno(pagina, tamanho, `&idAluno=${valor}`)
    } else {
      await pegarAluno(pagina, tamanho, `&nome=${valor}`);
    }
  }

  const resetFiltroAluno = async () => {
    await pegarAluno();
  }

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "80px", paddingBottom: "50px" }}>
      <Componentes.Titulo texto="Alunos" />

      <Box sx={{ width: { xs: "95%", md: "80%" }, display: "flex", alignItems: "end", flexDirection: "column", paddingTop: "20px", background: "#FFF", borderRadius: "10px", boxShadow: "5px 5px 10px var(--azul</Box>-escuro-dbc)" }}>

        <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "10px", paddingInline: 2 }}>
          <Componentes.CampoBusca label="Código, E-mail ou Nome" buscar={filtrosAluno} resetar={resetFiltroAluno} />

          <Button onClick={() => navigate("/cadastrar-aluno")} variant="contained" sx={{ width: "auto", paddingLeft: "15px", paddingRight: "15px", display: "flex", textTransform: "capitalize", fontSize: "1rem" }}>Cadastrar Aluno</Button>
        </Box>

        <Paper sx={{ width: "100%", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
          <TableContainer sx={{ maxHeight: 430 }}>
            <Table component="table" stickyHeader aria-label="sticky table">
              <TableHead sx={{ backgroundColor: "#090F27" }}>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: "16.6%", fontWeight: "700", fontSize: "1rem", textAlign: "center", backgroundColor: "#090F27", color: "white" }}>{column.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {alunos?.elementos.map((aluno: IAlunosElementos) => (
                  <StyledTableRow sx={{ ":hover": { opacity: "0.7", cursor: "pointer" } }} key={aluno.idAluno}>

                    <StyledTableCell onClick={() => navigate("/verificar-aluno", { state: aluno })} id="codigo" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }} component="td" scope="row">{aluno.idAluno}</StyledTableCell>

                    <Tooltip title={aluno.nome} PopperProps={{ sx: { marginTop: "-25px !important" } }} arrow>
                      <StyledTableCell onClick={() => navigate("/verificar-aluno", { state: aluno })} id="nome" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }}>{aluno.nome}</StyledTableCell>
                    </Tooltip>

                    <Tooltip title={aluno.email} PopperProps={{ sx: { marginTop: "-25px !important" } }} arrow>
                      <StyledTableCell onClick={() => navigate("/verificar-aluno", { state: aluno })} id="email" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }}>{aluno.email}</StyledTableCell>
                    </Tooltip>

                    <StyledTableCell onClick={() => navigate("/verificar-aluno", { state: aluno })} id="stack" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", textTransform: "capitalize", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }}>{formatarTexto(aluno.trilha.nome)}</StyledTableCell>

                    <StyledTableCell onClick={() => navigate("/verificar-aluno", { state: aluno })} id="situacao" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", textTransform: "capitalize", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }}>{formatarTexto(aluno.situacao)}</StyledTableCell>

                    <StyledTableCell id="acoes" sx={{ justifyContent: "center", minWidth: "150px", display: "flex", wrap: "nowrap" }}>
                      <Button id={`botao-editar-${aluno.idAluno}`} title="Editar" onClick={() => navigate("/editar-aluno", { state: aluno })}><Edit /></Button>
                      <Button id={`botao-deletar-${aluno.idAluno}`} title="Deletar" onClick={() => { handleOpen(); setIdDelete(aluno.idAluno) }}><DeleteForever /></Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Paginação */}
          <TablePagination rowsPerPageOptions={[]} component="div" count={alunos ? alunos.totalElementos : 0} rowsPerPage={alunos ? alunos.tamanho : 0} page={alunos ? alunos.pagina : 0} onPageChange={handleChangePage} />

          {/* Modal Confirmar Delete */}
          <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-titulo" aria-describedby="modal-modal-description" sx={{ backdropFilter: "blur(6px)" }}>
            <Box sx={style}>
              <Typography id="modal-modal-titulo" variant="h6" sx={{ fontWeight: 600, userSelect: "none", marginBottom: "10px", color: "var(--azul-forte-dbc)", fontSize: "1.4rem" }}>Você tem certeza?</Typography>
              <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", bottom: 0, paddingTop: "20px", gap: 2, flexDirection: "column" }}>
                <Button type="button" onClick={() => { deletarAluno(idDelete); handleClose(); }} variant="contained" color="error" sx={{ textTransform: "capitalize", fontSize: "1.05rem", width: "180px" }}>Deletar</Button>
                <Button type="button" onClick={handleClose} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d" }, textTransform: "capitalize", fontSize: "1.05rem", width: "180px" }}>Cancelar</Button>
              </Box>
            </Box>
          </Modal>

        </Paper>
      </Box>
    </Box>
  )
}