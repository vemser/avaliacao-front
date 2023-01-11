import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Stack, FormControl, TextField, InputLabel, MenuItem, Select, Button, Autocomplete } from '@mui/material';

import { Controller, useForm } from "react-hook-form"
import { Titulo } from '../../components/Titulo/Titulo';

import { useModulo } from '../../context/Tecnico/ModuloContext';
import { useAluno } from '../../context/Comportamental/AlunoContext';
import { filtroDebounce } from '../../utils/functions';
import { usePrograma } from '../../context/Tecnico/ProgramaContext';
import { useTrilha } from '../../context/Tecnico/TrilhaContext';

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

export const EditarFeedback = () => {
  const navigate = useNavigate();
  const { pegarAluno, alunos } = useAluno();
  const { pegarPrograma, pegarProgramaPorNome, programas } = usePrograma();
  const { pegarTrilha, pegarTrilhaFiltroNome, trilhas } = useTrilha();
  const { pegarModulo, pegarModuloPorFiltro, modulo } = useModulo();
  const { control, register, handleSubmit, formState: { errors } } = useForm<any>();

  useEffect(() => {
    pegarPrograma(0, 10);
    pegarModulo(0, 10);
    pegarAluno(0, 10);
    pegarTrilha(0, 10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editarFeedback = async (data: any) => {
    console.log(data);
  }

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "60px", paddingBottom: "50px" }}>
      <Titulo texto="Editar Feedback" />

      <Box component="form" onSubmit={handleSubmit(editarFeedback)} sx={{
        display: "flex", flexDirection: { xs: "column", lg: "row" }, justifyContent: "space-between", backgroundColor: "var(--branco)", width: { xs: "95%", md: "90%" }, borderRadius: "10px", padding: {
          xs: 3, sm: 5
        }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: { xs: 3, xl: 8 }
      }}>
        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: { xs: "start", md: "start" } }}>

          <FormControl sx={{ width: "100%" }} >
            <Autocomplete
              disablePortal
              id="programa"
              onInputChange={(event, value) => {
                filtroDebounce(value, pegarProgramaPorNome, pegarPrograma)
              }}
              isOptionEqualToValue={(option, value) => option.label === value.label}
              options={programas ? programas.elementos.map((programa) => ({ label: `${programa.idPrograma} - ${programa.nome}`, id: programa.idPrograma })) : []}
              renderInput={(params) => <TextField {...params} label="Programa" variant="filled" />}
            />
          </FormControl>

          <FormControl sx={{ width: "100%" }} >
            <Autocomplete
              disablePortal
              id="trilha"
              onInputChange={(event, value) => {
                filtroDebounce(value, pegarTrilhaFiltroNome, pegarTrilha)
              }}
              isOptionEqualToValue={(option, value) => option.label === value.label}
              options={trilhas ? trilhas.elementos.map((trilha) => ({ label: `${trilha.idTrilha} - ${trilha.nome}`, id: trilha.idTrilha })) : []}
              renderInput={(params) => <TextField {...params} label="Trilha" variant="filled" />}
            />
          </FormControl>

          <FormControl sx={{ width: "100%" }} >
            <Controller control={control} name="idAluno" render={({ field: { onChange } }) => (
              <Autocomplete
                disablePortal
                id="aluno"
                onInputChange={(event, value) => {
                  filtroDebounce(value, pegarAluno, pegarAluno, `&nome=${value}`)
                }}
                onChange={(event, data) => onChange(data?.id)}
                isOptionEqualToValue={(option, value) => option.label === value.label}
                options={alunos ? alunos.elementos.map((aluno) => ({ label: `${aluno.idAluno} - ${aluno.nome}`, id: aluno.idAluno })) : []}
                renderInput={(params) => <TextField {...params} label="Aluno" variant="filled" />} />
            )} />
          </FormControl>

          <FormControl sx={{ width: "100%" }} >
            <Controller control={control} name="modulo" render={({ field: { onChange } }) => (
              <Autocomplete
                disablePortal
                id="modulo"
                onChange={(event, data) => onChange(data.map(item => item.id))}
                multiple
                onInputChange={(event, value) => {
                  filtroDebounce(value, pegarModuloPorFiltro, pegarModulo, `&nomeModulo=${value}`)
                }}
                isOptionEqualToValue={(option, value) => option.label === value.label}
                options={modulo ? modulo.elementos.map((modulos) => ({ label: `${modulos.idModulo} - ${modulos.nome}`, id: modulos.idModulo })) : []}
                renderInput={(params) => <TextField {...params}
                  label="Módulo"
                  variant="filled" />} />
            )} />
          </FormControl>


        </Stack>

        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: "end" }}>

          <FormControl variant="filled" sx={{ width: { xs: "100%", md: "100%" } }}>
            <InputLabel id="selectAluno">Situação</InputLabel>
            <Select labelId="demo-simple-select-filled-label" defaultValue="" id="select-trilha" {...register("situacao")} >
              <MenuItem value="situacao" disabled><em>Selecione a situação do feedback</em></MenuItem>
              <MenuItem id="positivo" value="POSITIVO">Positivo</MenuItem>
              <MenuItem id="atencao" value="ATENCAO">Atenção</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField
              placeholder="Digite uma descrição para o feedback"
              multiline
              rows={3}
              sx={{ width: "100%" }}
              id="descricao"
              label="Descrição"
              variant='filled'
              {...register("descricao")}
            />
          </FormControl>

          <Box sx={{ display: "flex", width: "100%", justifyContent: { xs: "center", lg: "end" }, alignItems: { xs: "center", lg: "end" }, bottom: 0, paddingTop: "20px", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
            <Button type="button" onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d " }, textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cancelar</Button>

            <Button type="submit" variant="contained" color="success" sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cadastrar</Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
