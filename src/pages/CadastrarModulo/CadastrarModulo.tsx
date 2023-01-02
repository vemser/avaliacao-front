import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { Titulo } from '../../components/Titulo/Titulo';

import logo from "../../assets/dbc-logo.webp";

import { Box, Stack, FormControl, Button, InputLabel, Select, MenuItem, TextField, OutlinedInput, Checkbox, ListItemText, Typography } from '@mui/material';
import { TrilhaContext } from '../../context/Tecnico/TrilhaContext';
import { moduloSchema } from '../../utils/schemas';
import { ICadastroModulo } from '../../utils/ModuloInterface/Modulo';
import { ModuloContext } from '../../context/Tecnico/ModuloContext';
import { ProgramaContext } from '../../context/Tecnico/ProgramaContext';

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

export const CadastrarModulo = () => {
    const navigate = useNavigate();
    const [programaSelecionado, setProgramaSelecionado] = useState<number[]>([]);
    const { pegarTrilha, trilhas } = useContext(TrilhaContext);
    const { cadastrarModulo } = useContext(ModuloContext);
    const { pegarPrograma, programas } = useContext(ProgramaContext);

    useEffect(() => {
        pegarTrilha(0, 999);
        pegarPrograma(0, 999);
    }, [])

    const { register, handleSubmit, formState: { errors } } = useForm<ICadastroModulo>({
        resolver: yupResolver(moduloSchema)
    });

    const cadastrar = (data: any) => {
        console.log(data)
        console.log(programaSelecionado)
    }

    const handleChange = (event: any) => {
        const {
            target: { value },
        } = event;
        if (!(typeof value === 'number')) {
            setProgramaSelecionado(
                value
            );
        }
    };

    return (
        <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 64px)", paddingTop: "80px", paddingBottom: "50px" }}>
            <Titulo texto="Cadastrar Módulo" />

            <Box component="form" onSubmit={handleSubmit(cadastrarModulo)} sx={{
                display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "var(--branco)", width: { xs: "95%", md: "70%", lg: "60%", xl: "50%" }, borderRadius: "10px", padding: {
                    xs: 3, sm: 5
                }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: 3
            }}>
                <img src={logo} alt="Logo DBC" width={150} />
                <Stack component="div" spacing={3} sx={{ width: "100%", display: "flex", alignItems: { xs: "start", md: "start" } }}>
                    <FormControl sx={{ width: "100%" }}>
                        <TextField id="descricao" label="Nome" placeholder="Digite o nome do módulo" multiline variant="filled" {...register("nome")} />
                        {errors.nome && <Typography id="erro-nomeModulo" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.nome.message}</Typography>}
                    </FormControl>

                    <FormControl sx={{ width: "100%" }}>
                        <TextField id="dataInicio" label="Data Início" type="date" sx={{ width: "100%" }} InputLabelProps={{ shrink: true }} {...register("dataInicio")} />
                        {errors.dataInicio && <Typography id="erro-dataInicioModulo" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.dataInicio.message}</Typography>}
                    </FormControl>

                    <FormControl sx={{ width: "100%" }}>
                        <TextField id="dataFim" label="Data Fim" type="date" sx={{ width: "100%" }} InputLabelProps={{ shrink: true }} {...register("dataFim")} />
                        {errors.dataFim && <Typography id="erro-dataFimModulo" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.dataFim.message}</Typography>}
                    </FormControl>

                    <FormControl variant="filled" sx={{ width: "100%" }}>
                        <InputLabel id="aluno">Trilha</InputLabel>
                        <Select MenuProps={MenuProps} defaultValue="" labelId="demo-simple-select-filled-label" id="aluno" >
                            <MenuItem value="initial-trilha" disabled><em>Selecione a trilha do módulo</em></MenuItem>
                            {trilhas?.elementos.map((trilha: any) => (
                                <MenuItem key={trilha.idTrilha} id={`${trilha.idTrilha}`} value={trilha.idTrilha}>{trilha.nome}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl variant="filled" sx={{ width: "100%" }}>
                        <InputLabel id="demo-multiple-name-label">Programa</InputLabel>
                        <Select
                            id="select-programa"
                            multiple
                            value={programaSelecionado}
                            onChange={handleChange}
                            input={<OutlinedInput label="Name" />}
                            renderValue={(selected) => programas?.elementos.filter((programa) => selected.includes(programa.idPrograma)).map((programa) => programa.nome).join(', ')}
                        >
                            <MenuItem value="initial-programa" disabled><em>Selecione um ou mais programas</em></MenuItem>
                            {programas?.elementos.map((programa) => (
                                <MenuItem key={programa.idPrograma} value={programa.idPrograma}>
                                    <Checkbox checked={programaSelecionado.indexOf(programa.idPrograma) > -1} />
                                    <ListItemText primary={programa.nome} />
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.listPrograma && <Typography id="erro-listProgramaModulo" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.listPrograma.message}</Typography>}
                    </FormControl>
                </Stack>
                <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", bottom: 0, paddingTop: "20px", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
                    <Button type="button" onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d " }, textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cancelar</Button>

                    <Button type="submit" variant="contained" color="success" sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cadastrar</Button>
                </Box>
            </Box>
        </Box>
    )
}
