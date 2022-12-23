import { useLocation, useNavigate } from 'react-router-dom';

import { Header } from '../../components/Header/Header';
import { Titulo } from '../../components/Titulo/Titulo';

import logo from "../../assets/dbc-logo.webp";

import { Box, Stack, FormControl, FormLabel, Typography, Button, InputLabel, Select, MenuItem, TextField, OutlinedInput, Checkbox, ListItemText } from '@mui/material';
import { useState } from 'react';

const itemHeigth = 48;
const itemPaddingTop = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: itemHeigth * 4.5 + itemPaddingTop,
            width: 250,
        },
    },
};

const programas = [
    'VemSer 9ª Edição',
    'VemSer 10ª Edição',
    'VemSer 11ª Edição',
    'VemSer 12ª Edição'
];

export const EditarModulo = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [ programaSelecionado, setProgramaSelecionado ] = useState<string[]>([]);

    const handleChange = (event: any) => {
        const {
            target: { value },
        } = event;
        setProgramaSelecionado(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <>
            <Header />
            <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 64px)", paddingTop: "50px", paddingBottom: "50px" }}>

                <Titulo texto="Editar Módulo" />

                <Box component="form" sx={{ display: { xs: "flex", md: "flex" }, flexDirection: "column", alignItems: "center", backgroundColor: "var(--branco)", width: { xs: "90%", md: "35%" }, borderRadius: "10px", padding: { xs: 5, md: 5 }, boxShadow: "10px 10px 10px var(--azul-escuro-dbc)", gap: 2 }}>

                    <img src={logo} alt="Logo DBC" width={150} />

                    <Stack component="div" spacing={2} sx={{ width: { xs: "100%", md: "100%" }, display: "flex", alignItems: { xs: "start", md: "start" } }}>

                        <FormControl sx={{ width: { xs: "100%", md: "100%" } }}>
                            <TextField id="descricao" defaultValue={state.nome} label="Digite um nome" placeholder="Digite um nome" multiline variant="filled" />
                        </FormControl>

                        <FormControl variant="filled" sx={{ width: { xs: "100%", md: "100%" } }}>
                            <InputLabel id="aluno">Selecione uma trilha</InputLabel>
                            <Select MenuProps={MenuProps} labelId="demo-simple-select-filled-label" id="aluno" defaultValue={state.trilha} >
                                <MenuItem value="initial-aluno" disabled><em>Selecione a Trilha</em></MenuItem>
                                <MenuItem id={`trilha-1`} value={'Frontend'}>Frontend</MenuItem>
                                <MenuItem id={`trilha-2`} value={'Backend'}>Backend</MenuItem>
                                <MenuItem id={`trilha-3`} value={'QA'}>QA</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="filled" sx={{ width: { xs: "100%", md: "100%" } }}>
                            <InputLabel id="demo-multiple-name-label">Selecione o Programa</InputLabel>
                            <Select
                                id="select-programa"
                                multiple
                                defaultValue={state.programa}
                                value={programaSelecionado}
                                onChange={handleChange}
                                input={<OutlinedInput label="Name" />}
                                renderValue={(selected) => selected.join(', ')}
                            >
                                {programas.map((programa) => (
                                    <MenuItem key={programa} value={programa}>
                                        <Checkbox checked={programaSelecionado.indexOf(programa) > -1} />
                                        <ListItemText primary={programa} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    </Stack>

                    <Box sx={{ display: "flex", alignItems: "end", gap: 2 }}>
                        <Button onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d " }, textTransform: "capitalize", width: { xs: "15ch", md: "25ch" } }}>Cancelar</Button>
                        <Button variant="contained" color="success" sx={{ textTransform: "capitalize", width: { xs: "15ch", md: "25ch" } }}>Salvar</Button>
                    </Box>

                </Box>
            </Box>
        </>
    )
}