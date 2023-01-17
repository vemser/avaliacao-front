import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Stack, FormControl, TextField, InputLabel, MenuItem, Select, Button, Autocomplete } from '@mui/material';

import { Titulo } from '../../components/Titulo/Titulo';

import { useModulo } from '../../context/Tecnico/ModuloContext';
import { useAluno } from '../../context/Comportamental/AlunoContext';
import { Controller, useForm } from 'react-hook-form';
import { filtroDebounce } from '../../utils/functions';
import { IFeedbackCadastro } from '../../utils/FeedbackInterface/Feedback';
import { useFeedback } from '../../context/Comportamental/FeedbackContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { feedbackSchema } from '../../utils/schemas';
import Typography from '@mui/material/Typography';
import { usePrograma } from '../../context/Tecnico/ProgramaContext';
import { useTrilha } from '../../context/Tecnico/TrilhaContext';

export const CadastrarFeedback = () => {
  const navigate = useNavigate();

  const { cadastrarFeedback } = useFeedback();
  const { pegarAluno, pegarAlunoPorTrilha, alunos } = useAluno();
  const { pegarModulo, pegarModuloPorFiltro, moduloPorTrilha, pegarModuloPorTrilha } = useModulo();
  const { pegarProgramaAtivo, pegarProgramaPorNomeAtivo, programas, pegarProgramaPorTrilhaModulo, programaTrilhaModulo } = usePrograma();
  const { pegarTrilhaFiltroNome, pegarTrilha } = useTrilha();

  const { register, handleSubmit, formState: { errors }, control, watch, reset } = useForm<IFeedbackCadastro>({
    resolver: yupResolver(feedbackSchema), defaultValues: {
      modulo: null
    }
  });

  const filtros = watch();

  const cadastrar = (data: IFeedbackCadastro) => {
    if (data.idAluno && data.modulo) {
      const novaData = { descricao: data.descricao, idAluno: data.idAluno?.id, modulo: data.modulo.map(item => parseInt(item.id.toString())), situacao: data.situacao }
      cadastrarFeedback(novaData);
    }
  }

  useEffect(() => {
    pegarProgramaAtivo();
    pegarModulo();
    pegarAluno();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (filtros.idPrograma) {
      pegarProgramaPorTrilhaModulo(parseInt(filtros.idPrograma))
    }

    if (filtros.idTrilha) pegarModuloPorTrilha(filtros.idTrilha.id)

    if (!filtros.idPrograma) {
      reset({
        idAluno: null,
        idTrilha: null,
      })
      pegarProgramaAtivo()
    }

    if (filtros.idPrograma) {
      if (!filtros.idTrilha) {
        pegarAlunoPorTrilha(parseInt(filtros.idPrograma))
      }
      if (filtros.idTrilha) {
        pegarAlunoPorTrilha(parseInt(filtros.idPrograma), filtros.idTrilha.id)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros.idPrograma, filtros.idTrilha])

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "60px", paddingBottom: "50px" }}>
      <Titulo texto="Cadastrar Feedback" />

      <Box component="form" onSubmit={handleSubmit(cadastrar)} sx={{
        display: "flex", flexDirection: { xs: "column", lg: "row" }, justifyContent: "space-between", backgroundColor: "var(--branco)", width: { xs: "95%", md: "90%" }, borderRadius: "10px", padding: {
          xs: 3, sm: 5
        }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: { xs: 3, xl: 8 }
      }}>
        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: { xs: "start", md: "start" } }}>

          <FormControl sx={{ width: "100%" }} >
            <Controller control={control} name="idPrograma" render={({ field: { onChange } }) => (
              <Autocomplete noOptionsText="Nenhum programa encontrado" disablePortal id="programa"
                onChange={(event, data) => onChange(data?.id)}
                onInputChange={(event, value) => {
                  filtroDebounce(value, pegarProgramaPorNomeAtivo, pegarProgramaAtivo)
                }}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.label === value.label}
                options={programas ? programas.elementos.map((programa) => ({ label: programa.nome, id: programa.idPrograma })) : []}
                renderOption={(props, option) => (<li {...props} key={option.id}>{option.label}</li>)}
                renderInput={(params) => <TextField key={params.id} {...params} label="Programa" variant="filled" />} />
            )} />
            {errors.idPrograma && <Typography id="erro-programa" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.idPrograma.message}</Typography>}
          </FormControl>

          <FormControl variant="filled" sx={{ width: "100%" }}>
            <Controller control={control} name="idTrilha" render={({ field: { onChange } }) => (
              <Autocomplete noOptionsText="Nenhuma trilha encontrada" disablePortal id="trilha"
                disabled={!filtros.idPrograma ? true : false}
                onChange={(event, data) => {

                  onChange(data)
                }}
                onInputChange={(event, value) => {
                  if (!value) reset({ idPrograma: filtros.idPrograma, modulo: null, idAluno: filtros.idAluno })
                  filtroDebounce(value, pegarTrilhaFiltroNome, pegarTrilha)
                }}
                value={filtros.idTrilha ? filtros.idTrilha : null}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.label === value.label}
                options={programaTrilhaModulo ? programaTrilhaModulo.trilha.map((trilhas) => ({ label: trilhas.nome, id: trilhas.idTrilha })) : []}
                renderOption={(props, option) => (<li {...props} key={option.id}>{option.label}</li>)}
                renderInput={(params) => <TextField key={params.id} {...params} label="Trilha" variant="filled" />} />
            )} />
            {errors.idTrilha && <Typography id="erro-trilhaAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.idTrilha.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <Controller control={control} name="modulo" render={({ field: { onChange } }) => (
              <Autocomplete sx={{ width: "100%" }}
                multiple disablePortal id="modulo" noOptionsText=""
                disabled={!filtros.idTrilha ? true : false}
                onInputChange={(event, value) => {
                  filtroDebounce(value, pegarModuloPorFiltro, pegarModulo, `&nome=${value}`)
                }}
                value={filtros.modulo ? filtros.modulo : []}
                onChange={(event, data) => onChange(data?.map(item => ({ label: item.label, id: item.id })))}
                isOptionEqualToValue={(option, value) => option.label === value.label}
                options={moduloPorTrilha ? moduloPorTrilha.map((modulos) => ({ label: modulos.nome, id: modulos.idModulo })) : []}
                renderOption={(props, option) => (<li {...props} key={option.id}>{option.label}</li>)}
                renderInput={(params) => <TextField {...params} label="Módulo" variant="filled" />} />
            )} />
            {errors.modulo && <Typography id="erro-trilhaAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.modulo.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }} >
            <Controller control={control} name="idAluno" render={({ field: { onChange } }) => (
              <Autocomplete disablePortal noOptionsText="Nenhum(a) aluno(a) encontrado(a)"
                disabled={!filtros.idPrograma ? true : false}
                onInputChange={(event, value) => {
                  filtroDebounce(value, pegarAluno, pegarAluno, `&nome=${value}`)
                }} onChange={(event, data) => onChange(data)} id="aluno" value={filtros.idAluno ? filtros.idAluno : null} getOptionLabel={(option) => option.label} isOptionEqualToValue={(option, value) => option.label === value.label} options={alunos ? alunos.elementos.map((aluno) => ({ label: ` ${aluno.nome}`, id: aluno.idAluno })) : []} renderOption={(props, option) => (<li {...props} key={option.id}>{option.label}</li>)} renderInput={(params) => <TextField {...params} label="Aluno" variant="filled" />} />
            )} />
            {errors.idAluno && <Typography id="erro-idAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.idAluno.message}</Typography>}
          </FormControl>
        </Stack>

        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: "end" }}>

          <FormControl variant="filled" sx={{ width: { xs: "100%", md: "100%" } }}>
            <InputLabel id="selectAluno">Situação</InputLabel>
            <Select labelId="demo-simple-select-filled-label" id="select-trilha" defaultValue='' {...register("situacao")}>
              <MenuItem value="initial-stack" disabled><em>Selecione a situação do feedback</em></MenuItem>
              <MenuItem id="positivo" value="POSITIVO">Positivo</MenuItem>
              <MenuItem id="atencao" value="ATENCAO">Atenção</MenuItem>
            </Select>
            {errors.situacao && <Typography id="erro-situacao" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.situacao.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField
              placeholder="Digite uma descrição para o feedback"
              multiline
              rows={4}
              sx={{ width: "100%" }}
              id="descricao"
              label="Descrição"
              variant='filled'
              {...register("descricao")}
            />
            {errors.descricao && <Typography id="erro-descricao" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.descricao.message}</Typography>}
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
