import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../../components/Header/Header";

import { Box, Typography, Paper, TableContainer, Table, TableRow, TableCell, TableBody, Button, Modal, styled, tableCellClasses } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: { backgroundColor: theme.palette.common.black, color: theme.palette.common.white },
    [`&.${tableCellClasses.body}`]: { fontSize: 14 },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
    "&:last-child td, &:last-child th": { border: 0 },
}));

interface Column {
    id: "idModulo" | "nome" | "trilha" | "programa" | "acoes";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: "idModulo", label: "Código", minWidth: 5 },
    { id: "nome", label: "Nome", minWidth: 5 },
    { id: "trilha", label: "Trilha", minWidth: 5 },
    { id: "programa", label: "Programa", minWidth: 5, align: "right", format: (value: number) => value.toLocaleString("en-US") },
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

const modulos = [
    { idModulo: '1', nome: 'React', trilha: 'Frontend', programa: 'VemSer 10ª Edição' },
    { idModulo: '2', nome: 'JavaScript', trilha: 'Frontend', programa: 'VemSer 10ª Edição' },
    { idModulo: '3', nome: 'Java', trilha: 'Backend', programa: 'VemSer 10ª Edição' },
    { idModulo: '4', nome: 'Spring', trilha: 'Backend', programa: 'VemSer 10ª Edição' },
    { idModulo: '5', nome: 'Cypress', trilha: 'QA', programa: 'VemSer 10ª Edição' },
    { idModulo: '6', nome: 'Selenium', trilha: 'QA', programa: 'VemSer 10ª Edição' },
    { idModulo: '7', nome: 'Next', trilha: 'Frontend', programa: 'VemSer 11ª Edição' },
    { idModulo: '8', nome: 'Redux', trilha: 'Frontend', programa: 'VemSer 11ª Edição' }
]

export const ListarModulo = () => {
    const navigate = useNavigate();

    // Funções Modal
    const [idDelete, setIdDelete] = useState<number | undefined>();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Box sx={{ minHeight: "calc(100vh - 64px)", paddingTop: "50px", paddingBottom: "50px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 5 }}>
                <Typography id="titulo-body" sx={{ textAlign: "center", fontSize: { xs: 30, md: 44 }, fontWeight: "700", color: "white" }} variant="h3">Lista de Módulos</Typography>

                <Box sx={{ width: "60%", display: "flex", alignItems: "end", flexDirection: "column", padding: "20px", background: "#f8f8fff8", borderRadius: "10px", boxShadow: "10px 10px 10px var(--azul</Box>-escuro-dbc)" }}>

                    <Button onClick={() => navigate("/cadastrar-modulo")} variant="contained" sx={{ width: "200px", whiteSpace: "nowrap", display: "flex", marginBottom: "10px" }}>Cadastrar Módulo</Button>

                    <Paper sx={{ width: { xs: "100%", md: "100%" }, borderRadius: "10px" }}>
                        <TableContainer id="tabela-admin" sx={{ maxHeight: 430, borderRadius: "10px" }}>
                            <Table stickyHeader aria-label="sticky table">
                                <thead>
                                    <TableRow sx={{ backgroundColor: "#090F27", color: "white" }}>
                                        {columns.map((column) => (
                                            <TableCell key={column.id} align={column.align} style={{ top: 57, minWidth: column.minWidth, fontWeight: "700", fontSize: "1rem", textAlign: "center" }}>
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </thead>
                                <TableBody>
                                    {modulos.map((data) => (
                                        <StyledTableRow key={data.idModulo}>
                                            <StyledTableCell id="nome" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }} scope="row">{data.idModulo}</StyledTableCell>

                                            <StyledTableCell id="nome" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", width: { md: "200px" } }} scope="row">{data.nome}</StyledTableCell>

                                            <StyledTableCell id="trilha" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100px" }}>{data.trilha}</StyledTableCell>

                                            <StyledTableCell id="programa" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem", width: { md: "200px" } }}>{data.programa}</StyledTableCell>

                                            <StyledTableCell id="acoes" sx={{ textAlign: "center" }}>
                                                <Button id={`botao-editar-modulo`} title="Editar" onClick={() => { navigate("/editar-modulo", { state: data }) }}><EditIcon /></Button>
                                                <Button id={`botao-duplicar-modulo`} title="Duplicar"><ContentCopyIcon /></Button>
                                                <Button id={`botao-deletar-modulo`} title="Deletar"><DeleteForeverIcon /></Button>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
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
        </>
    )
}
