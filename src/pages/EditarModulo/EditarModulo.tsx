import { useLocation, useNavigate } from 'react-router-dom';

import { Titulo } from '../../components/Titulo/Titulo';

import { useForm } from "react-hook-form";

import logo from "../../assets/dbc-logo.webp";

import { Box, Stack, FormControl, Button, InputLabel, Select, MenuItem, TextField, OutlinedInput, Checkbox, ListItemText, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTrilha } from '../../context/Tecnico/TrilhaContext';
import { usePrograma } from '../../context/Tecnico/ProgramaContext';
import { useModulo } from '../../context/Tecnico/ModuloContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { moduloSchema } from '../../utils/schemas';
import { ICadastroModulo } from '../../utils/ModuloInterface/Modulo';

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

export const EditarModulo = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { trilhas, pegarTrilha } = useTrilha();
  const { pegarPrograma, programas } = usePrograma();
  const { editarModulo } = useModulo();

  const [programaSelecionado, setProgramaSelecionado] = useState<number[]>([]);
  const [estadoErro, setEstadoErro] = useState<boolean>(false);

  const initialState = () => {
    let result = state.listProgramaDTO.map((programas: any) => programas.idPrograma)
    setProgramaSelecionado(result)
  }

  useEffect(() => {
    pegarTrilha(0, trilhas?.totalElementos);
    pegarPrograma(0, programas?.totalElementos);
    initialState()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const { handleSubmit, register, formState: { errors } } = useForm<ICadastroModulo>({
    resolver: yupResolver(moduloSchema)
  });

  const erroPrograma = () => {
    if(programaSelecionado.length > 0) {
      setEstadoErro(false)
    } else {
      setEstadoErro(true) 
    }
  }
  
  const editar = (data: any) => {
    const novoData = { ...data, dataInicio: state.dataInicio, dataFim: state.dataFim, idTrilha: parseInt(data.idTrilha), listPrograma: programaSelecionado }
    if(programaSelecionado.length > 0) editarModulo(novoData, state.idModulo)
  }

  const handleChange = (event: any) => {
    setEstadoErro(false)
    const {
      target: { value },
    } = event;
    setProgramaSelecionado(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

    return (
      <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 64px)", paddingTop: "80px", paddingBottom: "50px" }}>
        <Titulo texto="Editar Módulo" />

        <Box component="form" onSubmit={handleSubmit(editar)} sx={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "var(--branco)", width: { xs: "95%", md: "70%", lg: "60%", xl: "50%" }, borderRadius: "10px", padding: { xs: 3, sm: 5 }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: 3 }}>

          <img src={logo} alt="Logo DBC" width={150} />

          <Stack component="div" spacing={3} sx={{ width: "100%", display: "flex", alignItems: { xs: "start", md: "start" } }}>
            <FormControl sx={{ width: "100%" }}>
              <TextField id="nome-modulo" defaultValue={state.nome} label="Digite um nome" placeholder="Digite um nome" multiline variant="filled" {...register('nome')} />
            </FormControl>

            <FormControl sx={{ width: "100%" }}>
            <TextField id="dataInicio" label="Data Início" defaultValue={state.dataInicio} type="date" sx={{ width: "100%" }} InputLabelProps={{ shrink: true }} {...register("dataInicio")} />
            {errors.dataInicio && <Typography id="erro-dataInicioModulo" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.dataInicio.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField id="dataFim" label="Data Fim" defaultValue={state.dataFim} type="date" sx={{ width: "100%" }} InputLabelProps={{ shrink: true }} {...register("dataFim")} />
            {errors.dataFim && <Typography id="erro-dataFimModulo" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.dataFim.message}</Typography>}
          </FormControl>

            <FormControl variant="filled" sx={{ width: "100%" }}>
              <InputLabel id="trilha-modulo">Selecione uma trilha</InputLabel>
              <Select MenuProps={MenuProps} {...register("idTrilha")} labelId="demo-simple-select-filled-label" id="trilha-modulo" defaultValue={state.trilhaDTO.idTrilha}>
                <MenuItem value="initial-stack" disabled><em>Selecione uma trilha</em></MenuItem>
                {trilhas?.elementos.map((trilha) => (
                  <MenuItem key={trilha.idTrilha} id={`id-trilha=${trilha.idTrilha}`} value={`${trilha.idTrilha}`}>{trilha.nome}</MenuItem>
                ))}
              </Select>
              {errors.idTrilha && <Typography id="erro-trilhaAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.idTrilha.message}</Typography>}
            </FormControl>

            <FormControl variant="filled" sx={{ width: "100%" }}>
              <InputLabel id="select-programa" variant='filled'>Selecione o Programa</InputLabel>
              <Select MenuProps={MenuProps} id="select-programa" multiple value={programaSelecionado} onChange={handleChange} renderValue={(selected) => programas?.elementos.filter((programa) => selected.includes(programa.idPrograma)).map((programa) => programa.nome).join(', ')}>
                <MenuItem value="initial-programa" disabled><em>Selecione um ou mais programas</em></MenuItem>
                {programas?.elementos.map((programa) => (
                  <MenuItem key={programa.idPrograma} value={programa.idPrograma}>
                    <Checkbox checked={programaSelecionado.indexOf(programa.idPrograma) > -1} />
                    <ListItemText primary={programa.nome} />
                  </MenuItem>
                ))}
              </Select>
              {estadoErro && <Typography id="erro-programaAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">Por favor, escolha um programa</Typography>}
            </FormControl>
          </Stack>

          <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", bottom: 0, paddingTop: "20px", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
            <Button type="button" onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d " }, textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cancelar</Button>

            <Button type="submit"  onClick={() => { erroPrograma() }} variant="contained" color="success" sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Salvar</Button>
          </Box>
      </Box>
    </Box>
  )
}
