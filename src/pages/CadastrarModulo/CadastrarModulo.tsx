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

export const CadastrarModulo = () => {
    const navigate = useNavigate();
    const [programaSelecionado, setProgramaSelecionado] = useState<string[]>([]);

    const handleChange = (event: any) => {
        const {
            target: { value },
        } = event;
        setProgramaSelecionado(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 64px)", paddingTop: "80px", paddingBottom: "50px" }}>
            <Titulo texto="Cadastrar Módulo" />

            <Box component="form" sx={{
                display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "var(--branco)", width: { xs: "95%", md: "70%", lg: "60%", xl: "50%" }, borderRadius: "10px", padding: {
                    xs: 3, sm: 5
                }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: 3
            }}>
                <img src={logo} alt="Logo DBC" width={150} />
                <Stack component="div" spacing={3} sx={{ width: "100%", display: "flex", alignItems: { xs: "start", md: "start" } }}>
                    <FormControl sx={{ width: "100%" }}>
                        <TextField id="descricao" label="Digite um nome" placeholder="Digite o nome do Módulo" multiline variant="filled" />
                    </FormControl>
                    <FormControl variant="filled" sx={{ width: "100%" }}>
                        <InputLabel id="aluno">Selecione uma trilha</InputLabel>
                        <Select MenuProps={MenuProps} labelId="demo-simple-select-filled-label" id="aluno" >
                            <MenuItem value="initial-aluno" disabled><em>Selecione a Trilha</em></MenuItem>
                            <MenuItem id={`trilha-1`} value={'Frontend'}>Frontend</MenuItem>
                            <MenuItem id={`trilha-2`} value={'Backend'}>Backend</MenuItem>
                            <MenuItem id={`trilha-3`} value={'QA'}>QA</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="filled" sx={{ width: "100%" }}>
                        <InputLabel id="demo-multiple-name-label">Selecione um Programa</InputLabel>
                        <Select
                            id="select-programa"
                            multiple
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
                <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", bottom: 0, paddingTop: "20px", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
                    <Button onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d " }, textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cancelar</Button>

                    <Button variant="contained" color="success" sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cadastrar</Button>
                </Box>
            </Box>
        </Box>
    )
}
