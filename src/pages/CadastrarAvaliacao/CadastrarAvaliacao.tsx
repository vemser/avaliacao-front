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
  const { pegarTrilha, trilhas, pegarTrilhaFiltroNome } = useTrilha();
  const { alunos, pegarAlunoDisponivel,pegarAlunoDisponivelPorNome } = useAluno();
  const { pegarAcompanhamentos, acompanhamentos,pegarAcompanhamentoTitulo } = useAcompanhamento();
  const { cadastrarAvalicao } = useAvaliacao()
  let data = moment()
  let novaData = data.format("YYYY-MM-DD")

  useEffect(() => {
    pegarProgramaAtivo(0, 10);
    pegarTrilha(0, 10);
    pegarAlunoDisponivel(0, 10);
    pegarAcompanhamentos(0, 10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { register, handleSubmit, formState: { errors }, control } = useForm<ICadastrarAvalicao>({
    resolver: yupResolver(avalicaoSchema)
  });


  const cadastrar = (data: ICadastrarAvalicao) => {
    data.idAluno = parseInt(data.idAluno.toString())
    data.idAcompanhamento = parseInt(data.idAcompanhamento.toString())
    cadastrarAvalicao(data)

  }

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
                getOptionLabel={(option) => option.label}
                options={acompanhamentos ? acompanhamentos.elementos.map(item => ({ label: `${item.titulo}`,id: item.idAcompanhamento })) : []}
                renderInput={(params) => <TextField {...params} label="Acompanhamento" variant="filled" />}
              />
            )} />
            {errors.idAcompanhamento && <Typography id="erro-nome-acompanhamento" sx={{ fontWeight: "500", display: "inline-block", marginTop: "5px", whiteSpace: "nowrap" }} color="error">{errors.idAcompanhamento.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }} >
              <Autocomplete
                disablePortal
                onInputChange={(event, value) => {
                  filtroDebounce(value, pegarProgramaPorNomeAtivo, pegarProgramaAtivo)
                }}
                noOptionsText={"Nenhum programa encontrado"}
                id="programa"
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.label === value.label}
                options={programas ? programas.elementos.map(item => ({ label: `${item.nome}` })) : []}
                renderInput={(params) => <TextField {...params} label="Programa" variant="filled" />}
              />
            {/* {errors.idPrograma && <Typography id="erro-nome-programa" sx={{ fontWeight: "500", display: "inline-block", marginTop: "5px", whiteSpace: "nowrap" }} color="error">{errors.idPrograma.message}</Typography>} */}
          </FormControl>

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }} >
              <Autocomplete
                disablePortal
                onInputChange={(event, value) => {
                  filtroDebounce(value, pegarTrilhaFiltroNome, pegarTrilha)
                }}
                noOptionsText={"Nenhuma trilha encontrada"}
                id="trilha"
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.label === value.label}
                options={trilhas ? trilhas.elementos.map(item => ({ label: `${item.nome}` })) : []}
                renderInput={(params) => <TextField {...params} label="Trilha" variant="filled" />}
              />
            {/* {errors.idTrilha && <Typography id="erro-nome-trilha" sx={{ fontWeight: "500", display: "inline-block", marginTop: "5px", whiteSpace: "nowrap" }} color="error">{errors.idTrilha.message}</Typography>} */}
          </FormControl>

          <FormControl sx={{ width: "100%" }} >
            <Controller control={control} name="idAluno" render={({ field: { onChange } }) => (
              <Autocomplete disablePortal onInputChange={(event, value) => {
                filtroDebounce(value, pegarAlunoDisponivelPorNome, pegarAlunoDisponivel)
              }}
                noOptionsText={"Nenhum aluno encontrado"} onChange={(event, data) => onChange(data?.id)} id="aluno" getOptionLabel={(option) => option.label} isOptionEqualToValue={(option, value) => option.label === value.label} options={alunos ? alunos.elementos.map((aluno) => ({ label: `${aluno.nome}`, id: aluno.idAluno })) : []} renderInput={(params) => <TextField {...params} label="Aluno" variant="filled" />} />
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
