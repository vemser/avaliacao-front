import { Box, Stack, FormControl, TextField, InputLabel, Select, MenuItem, Button, Autocomplete, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { usePrograma } from '../../context/Tecnico/ProgramaContext';

import * as Componentes from '../../components/index';
import { useTrilha } from '../../context/Tecnico/TrilhaContext';
import { useAluno } from '../../context/Comportamental/AlunoContext';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editarAvalicaoSchema } from '../../utils/schemas';
import { useAcompanhamento } from '../../context/Comportamental/AcompanhamentoContext';
import { IEditarAvaliacao } from '../../utils/AvaliacaoInterface/Avaliacao';




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


export const EditarAvaliacao = () => {
  const navigate = useNavigate();

  const { pegarProgramaAtivo, programas } = usePrograma();
  const { pegarTrilha, trilhas } = useTrilha();
  const { pegarAluno, alunos } = useAluno();
  const { pegarAcompanhamentos, acompanhamentos } = useAcompanhamento();
  let data = moment()
  let novaData = data.format("YYYY-MM-DD")


  useEffect(() => {
    pegarProgramaAtivo(0, programas?.totalElementos);
    pegarTrilha(0, trilhas?.totalElementos);
    pegarAluno(0, alunos?.totalElementos);
    pegarAcompanhamentos(0, acompanhamentos?.totalElementos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { register, handleSubmit, formState: { errors } } = useForm<IEditarAvaliacao>({
    resolver: yupResolver(editarAvalicaoSchema)
  });


  const editar = (data: IEditarAvaliacao) => {
    console.log(data)
  }


  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "60px", paddingBottom: "50px" }}>
      <Componentes.Titulo texto="Editar Avaliação" />


      <Box component="form" onSubmit={handleSubmit(editar)} sx={{
        display: "flex", flexDirection: { xs: "column", lg: "row" }, justifyContent: "space-between", backgroundColor: "var(--branco)", width: { xs: "95%", md: "90%" }, borderRadius: "10px", padding: {
          xs: 3, sm: 5
        }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: { xs: 3, xl: 8 }
      }}>
        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: { xs: "start", md: "start" } }}>

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }} >
            <Autocomplete
              noOptionsText="Nenhum acompanhamento encontrado"
              disabled
              disablePortal
              id="acompanhemnto"
              options={acompanhamentos ? acompanhamentos.elementos.map(item => ({ label: `${item.idAcompanhamento} - ${item.titulo}` })) : []}
              renderInput={(params) => <TextField {...params} label="Acompanhamento" variant="filled" />}
            />
          </FormControl>

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }} >
            <Autocomplete
              noOptionsText="Nenhum programa encontrado"
              disabled
              disablePortal
              id="programa"
              isOptionEqualToValue={(option, value) => option.label === value.label}
              options={programas ? programas.elementos.map(item => ({ label: `${item.idPrograma} - ${item.nome}` })) : []}
              renderInput={(params) => <TextField {...params} label="Programa" variant="filled" />}
            />
          </FormControl>

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }} >
            <Autocomplete
              noOptionsText="Nenhuma trilha encontrada"
              disabled
              disablePortal
              id="trilha"
              isOptionEqualToValue={(option, value) => option.label === value.label}
              options={trilhas ? trilhas.elementos.map(item => ({ label: `${item.idTrilha} - ${item.nome}` })) : []}
              renderInput={(params) => <TextField {...params} label="Trilha" variant="filled" />}
            />
          </FormControl>

          <FormControl sx={{ width: "100%" }} >
            <Autocomplete noOptionsText="Nenhum aluno encontrado" disabled disablePortal id="aluno" isOptionEqualToValue={(option, value) => option.label === value.label} options={alunos ? alunos.elementos.map((aluno) => ({ label: `${aluno.idAluno} - ${aluno.nome}` })) : []} renderInput={(params) => <TextField {...params} label="Aluno" variant="filled" />} />
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
              id="dataAvalicao" label="Data" type="date" defaultValue={novaData} sx={{ width: "100%" }} InputLabelProps={{ shrink: true }} variant="filled" disabled />
          </FormControl>

          <FormControl variant="filled" sx={{ width: { xs: "100%", md: "100%" } }}>
            <InputLabel id="selectAluno">Situação</InputLabel>
            <Select labelId="demo-simple-select-filled-label" defaultValue="" id="select-trilha" {...register("situacao")}>
              <MenuItem value="initial-stack" disabled><em>Selecione uma situação</em></MenuItem>
              <MenuItem id="positivo" value="POSITIVO">Positivo</MenuItem>
              <MenuItem id="atencao" value="ATENCAO">Atenção</MenuItem>
            </Select>
            {errors.situacao && <Typography id="erro-situacao" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.situacao.message}</Typography>}
          </FormControl>

          <Box sx={{ display: "flex", width: "100%", justifyContent: { xs: "center", lg: "end" }, alignItems: { xs: "center", lg: "end" }, bottom: 0, paddingTop: "20px", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
            <Button type="button" onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d " }, textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cancelar</Button>

            <Button type="submit" variant="contained" color="success" sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Salvar</Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}
