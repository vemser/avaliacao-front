import { Box, Stack, FormControl, TextField, InputLabel, Select, MenuItem, Button, Autocomplete, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { usePrograma } from '../../context/Tecnico/ProgramaContext';

import * as Componentes from '../../components/index';
import { useTrilha } from '../../context/Tecnico/TrilhaContext';
import { useAluno } from '../../context/Comportamental/AlunoContext';
import moment from 'moment';
import { Controller, useForm } from 'react-hook-form';
import { IAvaliacao, ICadastrarAvalicao } from '../../utils/AvaliacaoInterface/Avaliacao';
import { avalicaoSchema } from '../../utils/schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAcompanhamento } from '../../context/Comportamental/AcompanhamentoContext';
import { filtroDebounce } from '../../utils/functions';
import { useAvaliacao } from '../../context/Comportamental/AvaliacaoContext';


export const CadastrarAvaliacao = () => {
  const navigate = useNavigate();

  const { pegarProgramaAtivo, programas, pegarProgramaPorNomeAtivo } = usePrograma();
  const { pegarTrilha, trilhas, pegarTrilhaFiltroNome, pegarTrilhaPorPrograma, trilhasPorPrograma } = useTrilha();
  const { alunos, pegarAlunoDisponivel, pegarAlunoDisponivelPorNome, pegarAlunoPorTrilha } = useAluno();
  const { pegarAcompanhamentos, acompanhamentos, pegarAcompanhamentoTitulo } = useAcompanhamento();
  const { cadastrarAvalicao } = useAvaliacao()
  let data = moment()
  let novaData = data.format("YYYY-MM-DD")


  const { register, handleSubmit, formState: { errors }, control, watch, reset } = useForm<ICadastrarAvalicao>({
    resolver: yupResolver(avalicaoSchema)
  });

  const filtro = watch()

  const cadastrar = async (data: ICadastrarAvalicao) => {
    data.idAcompanhamento = parseInt(data.idAcompanhamento.toString())
    if (data.idAluno) {
      const novaData = { idAcompanhamento: data.idAcompanhamento, idAluno: data.idAluno?.id, descricao: data.descricao, tipoAvaliacao: data.tipoAvaliacao, dataCriacao: data.dataCriacao }
      await cadastrarAvalicao(novaData);
    }
  }

  useEffect(() => {
    pegarProgramaAtivo();
    pegarTrilha();
    pegarAlunoDisponivel();
    pegarAcompanhamentos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (filtro.idPrograma) pegarTrilhaPorPrograma(filtro.idPrograma)
    if (filtro.idTrilha) if (filtro.idPrograma) pegarAlunoPorTrilha(filtro.idPrograma, filtro.idTrilha.id)

    if (!filtro.idPrograma) {
      reset({
        idAcompanhamento: filtro.idAcompanhamento,
        idAluno: null,
        idTrilha: null,
      })
      pegarProgramaAtivo()
    }

    if (filtro.idPrograma) {
      if (!filtro.idTrilha) {
        pegarAlunoPorTrilha(filtro.idPrograma)
      }
      if (filtro.idTrilha) {
        pegarAlunoPorTrilha(filtro.idPrograma, filtro.idTrilha.id)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtro.idPrograma, filtro.idTrilha])

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "60px", paddingBottom: "50px" }}>
      <Componentes.Titulo texto="Cadastrar Avaliação" />


      <Box component="form" onSubmit={handleSubmit(cadastrar)} sx={{
        display: "flex", flexDirection: { xs: "column", lg: "row" }, justifyContent: "space-between", backgroundColor: "var(--branco)", width: { xs: "95%", md: "90%" }, borderRadius: "10px", padding: {
          xs: 3, sm: 5
        }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: { xs: 3, xl: 8 }
      }}>
        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: { xs: "start", md: "start" } }}>

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }} >
            <Controller control={control} name="idAcompanhamento" render={({ field: { onChange } }) => (
              <Autocomplete
                noOptionsText="Nenhum acompanhamento encontrado"
                disablePortal
                onInputChange={(event, value) => {
                  filtroDebounce(value, pegarAcompanhamentoTitulo, pegarAcompanhamentos)
                }}
                onChange={(event, data) => onChange(data?.id)}
                id="acompanhemnto"
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (<li {...props} key={option.id}>{option.label}</li>)}
                options={acompanhamentos ? acompanhamentos.elementos.map(item => ({ label: `${item.titulo}`, id: item.idAcompanhamento })) : []}
                renderInput={(params) => <TextField {...params} label="Acompanhamento" variant="filled" />}
              />
            )} />
            {errors.idAcompanhamento && <Typography id="erro-nome-acompanhamento" sx={{ fontWeight: "500", display: "inline-block", marginTop: "5px", whiteSpace: "nowrap" }} color="error">{errors.idAcompanhamento.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }} >
            <Controller control={control} name="idPrograma" render={({ field: { onChange } }) => (
              <Autocomplete
                disablePortal
                id="idPrograma"
                onChange={(event, data) => onChange(data?.id)}
                onInputChange={(event, value) => {
                  filtroDebounce(value, pegarProgramaPorNomeAtivo, pegarProgramaAtivo)
                }}
                noOptionsText={"Nenhum programa encontrado"}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                options={programas ? programas.elementos.map(item => ({ label: `${item.nome}`, id: item.idPrograma })) : []}
                renderOption={(props, option) => (<li {...props} key={option.id}>{option.label}</li>)}
                renderInput={(params) => <TextField {...params} label="Programa" variant="filled" />}
              />
            )} />
          </FormControl>

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }} >
            <Controller control={control} name="idTrilha" render={({ field: { onChange } }) => (

              <Autocomplete
                disablePortal
                disabled={!filtro.idPrograma ? true : false}
                onChange={(event, data) => onChange(data)}
                onInputChange={(event, value) => {
                  filtroDebounce(value, pegarTrilhaFiltroNome, pegarTrilha)
                }}
                noOptionsText={"Nenhuma trilha encontrada"}
                id="trilha"
                value={filtro.idTrilha ? filtro.idTrilha : null}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                options={trilhasPorPrograma ? trilhasPorPrograma.map(item => ({ label: `${item.nome}`, id: item.idTrilha })) : []}
                renderOption={(props, option) => (<li {...props} key={option.id}>{option.label}</li>)}
                renderInput={(params) => <TextField {...params} label="Trilha" variant="filled" />}
              />
            )} />
            {/* {errors.idTrilha && <Typography id="erro-nome-trilha" sx={{ fontWeight: "500", display: "inline-block", marginTop: "5px", whiteSpace: "nowrap" }} color="error">{errors.idTrilha.message}</Typography>} */}
          </FormControl>

          <FormControl sx={{ width: "100%" }} >
            <Controller control={control} name="idAluno" render={({ field: { onChange } }) => (
              <Autocomplete disablePortal
                disabled={!filtro.idPrograma ? true : false}
                onInputChange={(event, value) => {
                  filtroDebounce(value, pegarAlunoDisponivelPorNome, pegarAlunoDisponivel)
                }}
                value={filtro.idAluno ? filtro.idAluno : null}
                noOptionsText={"Nenhum aluno encontrado"} onChange={(event, data) => onChange(data)} id="aluno" renderOption={(props, option) => (<li {...props} key={option.id}>{option.label}</li>)} getOptionLabel={(option) => option.label} isOptionEqualToValue={(option, value) => option.label === value.label} options={alunos ? alunos.elementos.map((aluno) => ({ label: `${aluno.nome}`, id: aluno.idAluno })) : []} renderInput={(params) => <TextField {...params} label="Aluno" variant="filled" />} />
            )} />
            {errors.idAluno && <Typography id="erro-nome-aluno" sx={{ fontWeight: "500", display: "inline-block", marginTop: "5px", whiteSpace: "nowrap" }} color="error">{errors.idAluno.message}</Typography>}
          </FormControl>

        </Stack>

        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: "end" }}>

          <FormControl sx={{ width: "100%" }}>
            <TextField
              placeholder="Digite uma descrição"
              multiline
              rows={3}
              sx={{ width: "100%" }}
              id="descricao"
              label="Descrição"
              variant='filled'
              inputProps={{ maxLength: 5000 }}
              {...register("descricao")}
            />
            {errors.descricao && <Typography id="erro-descricao" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.descricao.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField
              id="dataAvalicao" label="Data" type="date" defaultValue={novaData} sx={{ width: "100%" }} InputLabelProps={{ shrink: true }} variant="filled" {...register("dataCriacao")} />

          </FormControl>

          <FormControl variant="filled" sx={{ width: { xs: "100%", md: "100%" } }}>
            <InputLabel id="selectAluno">Situação</InputLabel>
            <Select labelId="demo-simple-select-filled-label" defaultValue="" id="situacao" {...register("tipoAvaliacao")}>
              <MenuItem value="initial-stack" disabled><em>Selecione uma situação</em></MenuItem>
              <MenuItem id="positivo" value="POSITIVO">Positivo</MenuItem>
              <MenuItem id="atencao" value="ATENCAO">Atenção</MenuItem>
            </Select>
            {errors.tipoAvaliacao && <Typography id="erro-situacao" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.tipoAvaliacao.message}</Typography>}
          </FormControl>

          <Box sx={{ display: "flex", width: "100%", justifyContent: { xs: "center", lg: "end" }, alignItems: { xs: "center", lg: "end" }, bottom: 0, paddingTop: "20px", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
            <Button type="button" onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d " }, textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cancelar</Button>

            <Button type="submit" variant="contained" color="success" sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cadastrar</Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}
