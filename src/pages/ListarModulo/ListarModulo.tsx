import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Typography, Paper, TableContainer, TablePagination, Table, TableRow, TableCell, TableBody, Button, Modal, styled, tableCellClasses } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Titulo } from "../../components/Titulo/Titulo";
import TableHead from "@mui/material/TableHead";
import { ModuloContext } from "../../context/Tecnico/ModuloContext";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: { backgroundColor: theme.palette.common.black, color: theme.palette.common.white },
    [`&.${tableCellClasses.body}`]: { fontSize: 14 },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
    "&:last-child td, &:last-child th": { border: 0 },
}));

interface Column {
    id: "idModulo" | "nome" | "trilha" | "programa" | "dataInicio" | "dataFim" | "acoes";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: "idModulo", label: "Código", minWidth: 5 },
    { id: "nome", label: "Nome", minWidth: 5 },
    { id: "trilha", label: "Trilha", minWidth: 5 },
    { id: "programa", label: "Programa", minWidth: 5 },
    { id: "dataInicio", label: "Data de Início", minWidth: 5 },
    { id: "dataFim", label: "Data Final", minWidth: 5, align: "right", format: (value: number) => value.toLocaleString("en-US") },
    { id: "acoes", label: "Ações", minWidth: 5, align: "right", format: (value: number) => value.toLocaleString("en-US") }
];

const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "none",
    borderRadius: "5px",
    textAlign: "center",
    boxShadow: 24,
    p: 4,
};

export const ListarModulo = () => {
    const navigate = useNavigate();
    const { pegarModulo, modulo } = useContext(ModuloContext);

    useEffect(() => { pegarModulo(); }, []);

    const handleChangePage = async (event: unknown, newPage: number) => { await pegarModulo(newPage) };

    // Funções Modal
    const [idDelete, setIdDelete] = useState<number | undefined>();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 64px)", paddingTop: "80px", paddingBottom: "50px" }}>
            <Titulo texto="Módulos" />

            <Box sx={{ width: { xs: "95%", md: "80%" }, display: "flex", alignItems: "end", flexDirection: "column", paddingTop: "20px", background: "#FFF", borderRadius: "10px", boxShadow: "5px 5px 10px var(--azul</Box>-escuro-dbc)" }}>

                <Button onClick={() => navigate("/cadastrar-modulo")} variant="contained" sx={{ width: "auto", paddingLeft: "15px", paddingRight: "15px", display: "flex", marginBottom: "10px", marginRight: "14px", textTransform: "capitalize", fontSize: "1rem" }}>Cadastrar Módulo</Button>

                <Paper sx={{ width: "100%", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
                    <TableContainer id="tabela-admin" sx={{ maxHeight: 430 }}>
                        <Table stickyHeader aria-label="sticky table">

                            <TableHead sx={{ backgroundColor: "#090F27" }}>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} align={column.align} style={{ minWidth: "12.5%", fontWeight: "700", fontSize: "1rem", textAlign: "center", backgroundColor: "#090F27", color: "white" }}>
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {modulo?.elementos.map((data) => (
                                    <StyledTableRow key={data.idModulo}>
                                        <StyledTableCell id="nome" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }} scope="row">{data.idModulo}</StyledTableCell>

                                        <StyledTableCell id="programa" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", width: { md: "200px" } }}>{data.listProgramaDTO.map((programa: IListProgramaDTO) =>  programa.nome )}</StyledTableCell>

                                        <StyledTableCell id="trilha" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100px" }}>{data.trilhaDTO.nome}</StyledTableCell>

                                        <StyledTableCell id="programa" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", width: { md: "200px" } }}>

                                            {data.listProgramaDTO.map((programa) => 
                                                `${programa.nome}`
                                            ).join(', ')}

                                        </StyledTableCell>

                                        <StyledTableCell id="nome" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", width: { md: "200px" } }} scope="row">{data.dataInicio}</StyledTableCell>

                                        <StyledTableCell id="nome" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", width: { md: "200px" } }} scope="row">{data.dataFim}</StyledTableCell>

                                        <StyledTableCell id="acoes" sx={{ textAlign: "center" }}>
                                            <Button id={`botao-editar-modulo`} title="Editar" onClick={() => { navigate("/editar-modulo", { state: modulo }) }}><EditIcon /></Button>
                                            <Button id={`botao-duplicar-modulo`} title="Duplicar"><ContentCopyIcon /></Button>
                                            <Button id={`botao-deletar-modulo`} title="Deletar"><DeleteForeverIcon /></Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination rowsPerPageOptions={[]} component="div" count={modulo ? modulo.totalElementos : 0} rowsPerPage={modulo ? modulo.tamanho : 0} page={modulo ? modulo.pagina : 0} onPageChange={handleChangePage} />
                    {/* Modal Confirmar Delete */}
                    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-titulo" aria-describedby="modal-modal-description" sx={{ backdropFilter: "blur(10px)" }}>
                        <Box sx={style}>
                            <Typography id="modal-modal-titulo" variant="h6" component="h2" color="error">Você realmente deseja excluir?</Typography>
                            <Box sx={{ display: "flex", gap: 2, alignItems: "center", justifyContent: "center" }}>
                                <Button id="botao-confirmar-modal" size="medium" color="success" type="submit" sx={{ mt: 2 }} variant="contained">Confirmar</Button>
                                <Button id="botao-fechar-modal" onClick={handleClose} size="medium" type="submit" sx={{ mt: 2 }} variant="contained">Fechar</Button>
                            </Box>
                        </Box>
                    </Modal>
                </Paper>
            </Box>
        </Box>
    )
}
