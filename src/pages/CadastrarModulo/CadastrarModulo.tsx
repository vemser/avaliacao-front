import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import * as Componentes from '../../components/index';

import logo from "../../assets/dbc-logo.webp";

import { Box, Stack, FormControl, Button, InputLabel, Select, MenuItem, TextField, Checkbox, ListItemText, Typography } from '@mui/material';

import { ICadastroModulo } from '../../utils/ModuloInterface/Modulo';

import { useTrilha } from '../../context/Tecnico/TrilhaContext';
import { useModulo } from '../../context/Tecnico/ModuloContext';
import { usePrograma } from '../../context/Tecnico/ProgramaContext';
import { moduloSchema } from '../../utils/schemas';
import { yupResolver } from '@hookform/resolvers/yup';

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
  const [trilhaSelecionado, setTrilhaSelecionado] = useState<number[]>([]);
  const [estadoErro, setEstadoErro] = useState<boolean>(false);
  const [estadoErroTrilha, setEstadoErroTrilha] = useState<boolean>(false);

  const { pegarTrilha, trilhas } = useTrilha();
  const { pegarProgramaAtivo, programas } = usePrograma();
  const { cadastrarModulo } = useModulo();

  useEffect(() => {
    pegarTrilha(0, trilhas?.totalElementos);
    pegarProgramaAtivo(0, programas?.totalElementos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { register, handleSubmit, formState: { errors } } = useForm<ICadastroModulo>({
    resolver: yupResolver(moduloSchema)
  });

  const cadastrar = async (data: any) => {
    const novoData = { ...data, trilha: trilhaSelecionado, listPrograma: programaSelecionado }
    if (programaSelecionado.length > 0 && trilhaSelecionado.length > 0) await cadastrarModulo(novoData)
  }

  const erroPrograma = () => {
    if (programaSelecionado.length > 0) {
      setEstadoErro(false)
    } else {
      setEstadoErro(true)
    }
  }

  const erroTrilha = () => {
    if (trilhaSelecionado.length > 0) {
      setEstadoErroTrilha(false)
    } else {
      setEstadoErroTrilha(true)
    }
  }

  const handleChange = (event: any) => {
    setEstadoErro(false);
    const {
      target: { value },
    } = event;
    if (!(typeof value === 'number')) {
      setProgramaSelecionado(
        value
      );
    }
  };

  const pegarTrilhaSelect = (event: any) => {
    setEstadoErroTrilha(false);
    const {
      target: { value },
    } = event;
    if (!(typeof value === 'number')) {
      setTrilhaSelecionado(
        value
      );
    }
  };

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "60px", paddingBottom: "50px" }}>
      <Componentes.Titulo texto="Cadastrar Módulo" />

      <Box component="form" onSubmit={handleSubmit(cadastrar)} sx={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "var(--branco)", width: { xs: "95%", md: "70%", lg: "60%", xl: "50%" }, borderRadius: "10px", padding: { xs: 3, sm: 5 }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: 3 }}>

        <Stack component="div" spacing={3} sx={{ width: "100%", display: "flex", alignItems: { xs: "start", md: "start" } }}>
          <FormControl sx={{ width: "100%" }}>
            <TextField id="nome-modulo" label="Nome" placeholder="Digite um nome para o módulo" multiline variant="filled" {...register("nome")} />
            {errors.nome && <Typography id="erro-nomeModulo" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.nome.message}</Typography>}
          </FormControl>

          <FormControl variant="filled" sx={{ width: "100%" }}>
            <InputLabel id="label-trilha">Trilha</InputLabel>
            <Select id="select-trilha" MenuProps={MenuProps} multiple value={trilhaSelecionado} onChange={pegarTrilhaSelect} renderValue={(selected) => trilhas?.elementos.filter((trilha) => selected.includes(trilha.idTrilha)).map((trilha) => trilha.nome).join(', ')}>
              <MenuItem value="initial-trilha" disabled><em>Selecione uma ou mais trilhas</em></MenuItem>
              {trilhas?.elementos.map((trilha) => {
                return (
                  <MenuItem key={trilha.idTrilha} value={trilha.idTrilha}>
                    <Checkbox checked={trilhaSelecionado.indexOf(trilha.idTrilha) > -1} />
                    <ListItemText primary={trilha.nome} />
                  </MenuItem>
                )
              }
              )}
            </Select>
            {estadoErroTrilha && <Typography id="erro-programaAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">Por favor, escolha uma trilha</Typography>}
          </FormControl>

          <FormControl variant="filled" sx={{ width: "100%" }}>
            <InputLabel id="select-programa">Programa</InputLabel>
            <Select id="select-programa" MenuProps={MenuProps} multiple value={programaSelecionado} onChange={handleChange} renderValue={(selected) => programas?.elementos.filter((programa) => selected.includes(programa.idPrograma)).map((programa) => programa.nome).join(', ')}>
              <MenuItem value="initial-programa" disabled><em>Selecione um ou mais programas</em></MenuItem>
              {programas?.elementos.map((programa) => {
                return (
                  <MenuItem key={programa.idPrograma} value={programa.idPrograma}>
                    <Checkbox checked={programaSelecionado.indexOf(programa.idPrograma) > -1} />
                    <ListItemText primary={programa.nome} />
                  </MenuItem>
                )
              }
              )}
            </Select>

            {estadoErro && <Typography id="erro-programaAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">Por favor, escolha um programa</Typography>}
          </FormControl>
        </Stack>
        <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", bottom: 0, paddingTop: "20px", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
          <Button type="button" onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d " }, textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cancelar</Button>

          <Button type='submit' onClick={() => { erroPrograma(); erroTrilha() }} variant="contained" color="success" sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cadastrar</Button>
        </Box>
      </Box>
    </Box>
  )
}
