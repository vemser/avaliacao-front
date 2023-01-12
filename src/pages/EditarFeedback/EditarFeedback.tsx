import { useLocation, useNavigate } from 'react-router-dom';

import { useEffect } from 'react';

import { Box, Stack, FormControl, TextField, InputLabel, MenuItem, Select, Button, Autocomplete } from '@mui/material';

import { useForm } from "react-hook-form"
import { Titulo } from '../../components/Titulo/Titulo';

import { useModulo } from '../../context/Tecnico/ModuloContext';
import { useAluno } from '../../context/Comportamental/AlunoContext';
import { usePrograma } from '../../context/Tecnico/ProgramaContext';
import { useTrilha } from '../../context/Tecnico/TrilhaContext';
import { IEditarFeedback } from '../../utils/FeedbackInterface/Feedback'
import { useFeedback } from '../../context/Comportamental/FeedbackContext'

export const EditarFeedback = () => {
  const navigate = useNavigate();
  const { state } = useLocation()

  const { pegarPrograma, programas } = usePrograma()
  const { pegarModulo, modulo } = useModulo()
  const { pegarAluno, alunos } = useAluno()
  const { pegarTrilha, trilhas } = useTrilha()
  const { editarFeedback } = useFeedback()

  useEffect(() => {
    pegarPrograma(0, 10);
    pegarModulo(0, 10);
    pegarAluno(0, 10);
    pegarTrilha(0, 10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { register, handleSubmit } = useForm<IEditarFeedback>();

  const editar = (data: IEditarFeedback) => {
    editarFeedback(data, state.idFeedBack)
  }

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "60px", paddingBottom: "50px" }}>
      <Titulo texto="Editar Feedback" />

      <Box component="form" onSubmit={handleSubmit(editar)} sx={{
        display: "flex", flexDirection: { xs: "column", lg: "row" }, justifyContent: "space-between", backgroundColor: "var(--branco)", width: { xs: "95%", md: "90%" }, borderRadius: "10px", padding: {
          xs: 3, sm: 5
        }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: { xs: 3, xl: 8 }
      }}>
        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: { xs: "start", md: "start" } }}>

          <FormControl sx={{ width: "100%" }} >
            <Autocomplete disablePortal disabled defaultValue={{ label: state.alunoDTO.programa.nome }} id="programa" isOptionEqualToValue={(option, value) => option.label === value.label} options={programas ? programas.elementos.map((programa) => ({ label: programa.nome })) : []} renderInput={(params) => <TextField {...params} label="Programa" variant="filled" />} />
          </FormControl>

          <FormControl sx={{ width: "100%" }} >
            <Autocomplete disablePortal disabled defaultValue={{ label: state.moduloDTO.map((modulo: any) => modulo.nome).join(", ") }} id="modulo" isOptionEqualToValue={(option, value) => option.label === value.label} options={modulo ? modulo.elementos.map((modulos) => ({ label: modulos.nome })) : []} renderInput={(params) => <TextField {...params} label="Módulo" variant="filled" />} /> 
          </FormControl>

          <FormControl sx={{ width: "100%" }} >
            <Autocomplete disablePortal disabled defaultValue={{ label: state.alunoDTO.nome }} id="aluno" isOptionEqualToValue={(option, value) => option.label === value.label} options={alunos ? alunos.elementos.map((aluno) => ({ label: aluno.nome })) : []} renderInput={(params) => <TextField {...params} label="Aluno" variant="filled" />} />
          </FormControl>

          <FormControl sx={{ width: "100%" }} >
            <Autocomplete disablePortal disabled defaultValue={{ label: state.alunoDTO.trilha.nome }} id="trilha" isOptionEqualToValue={(option, value) => option.label === value.label} options={trilhas ? trilhas.elementos.map((trilha) => ({ label: trilha.nome })) : []} renderInput={(params) => <TextField {...params} label="Trilha" variant="filled" />} />
          </FormControl>


        </Stack>

        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: "end" }}>

          <FormControl sx={{ width: "100%" }}>
            <TextField id="data" label="Data" disabled defaultValue={state.data} type="date" sx={{ width: "100%" }} InputLabelProps={{ shrink: true }} />
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField
              placeholder="Digite uma descrição"
              defaultValue={state.descricao}
              multiline
              rows={3}
              sx={{ width: "100%" }}
              id="descricao"
              label="Descrição"
              variant='filled'
              {...register("descricao")}
            />
          </FormControl>

          <FormControl variant="filled" sx={{ width: { xs: "100%", md: "100%" } }}>
            <InputLabel id="selectAluno">Situação</InputLabel>
            <Select labelId="demo-simple-select-filled-label" defaultValue={state.situacao} id="select-trilha" {...register("situacao")} >
              <MenuItem value="initial-stack" disabled><em>Selecione uma situação</em></MenuItem>
              <MenuItem id="positivo" value="POSITIVO">Positivo</MenuItem>
              <MenuItem id="atencao" value="ATENCAO">Atenção</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", width: "100%", justifyContent: { xs: "center", lg: "end" }, alignItems: { xs: "center", lg: "end" }, bottom: 0, paddingTop: "20px", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
            <Button type="button" onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d " }, textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cancelar</Button>

            <Button type="submit" variant="contained" color="success" sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Salvar</Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
