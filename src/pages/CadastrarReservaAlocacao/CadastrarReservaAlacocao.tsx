import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack, FormControl, TextField, InputLabel, Button, Select, MenuItem, Autocomplete, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Titulo } from '../../components/Titulo/Titulo';
import { useCliente } from '../../context/Alocacao/ClienteContext';
import { useReservaAlocacao } from '../../context/Alocacao/ReservaAlocacaoContext';
import { useVaga } from '../../context/Alocacao/VagaContext';
import { useAluno } from '../../context/Comportamental/AlunoContext';
import { IResrevaAlocacao } from '../../utils/ReservaAlocacaoInterface/ReservaAlocacao';
import { reservaAlocacaoSchema } from '../../utils/schemas';

export const CadastrarReservaAlacocao = () => {

  const navigate = useNavigate()
  const { pegarAlunoDisponivel, alunos } = useAluno()
  const { pegarVagas, vagas } = useVaga()
  const { pegarCliente, cliente } = useCliente()

  const [vagaErro, setVagaErro] = useState<boolean>(false);
  const [AlunoErro, setAlunoErro] = useState<boolean>(false);
  const [dataVaga, setDataVaga] = useState<string>();
  const [dataAluno, setDataAluno] = useState<string>();



  const { cadastrarReservaAlocacao } = useReservaAlocacao()


  useEffect(() => {
    pegarAlunoDisponivel(0, alunos?.totalElementos);
    pegarVagas(0, vagas?.totalElementos);
    pegarCliente(0, cliente?.totalElementos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const { register, handleSubmit, formState: { errors } } = useForm<IResrevaAlocacao>({
    resolver: yupResolver(reservaAlocacaoSchema)
  });


  const erroVaga = () => {
    if (dataVaga) {
      setVagaErro(false)
    } else {
      setVagaErro(true)
    }
  }

  const erroAluno = () => {
    if (dataAluno) {
      setAlunoErro(false)
    } else {
      setAlunoErro(true)
    }
  }

  const handleChangeVaga = () => {
    setVagaErro(false)
    setDataVaga('')

  };

  const handleChangeAluno = () => {
    setAlunoErro(false)
    setDataAluno('')
  }



  const cadastroReservaAlocacao = (data: IResrevaAlocacao) => {
    setDataVaga(data.idVaga.toString())
    setDataAluno(data.idAluno.toString())
    data.idAluno = parseInt(data.idAluno.toString().split(' ')[0])
    data.idVaga = parseInt(data.idVaga.toString().split(' ')[0])
    cadastrarReservaAlocacao(data)
  }


  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "60px", paddingBottom: "50px" }}>
      <Titulo texto="Cadastrar Reserva e Alocação" />

      <Box component="form" onSubmit={handleSubmit(cadastroReservaAlocacao)} sx={{
        display: "flex", flexDirection: { xs: "column", lg: "row" }, justifyContent: "space-between", backgroundColor: "var(--branco)", width: { xs: "95%", md: "90%", lg: "85%" }, borderRadius: "10px", padding: {
          xs: 3, sm: 5
        }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: { xs: 3, xl: 8 }
      }}>
        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: { xs: "start", md: "start" } }}>

          <FormControl sx={{ width: "100%" }} >
            <Autocomplete disablePortal id="aluno" onChange={handleChangeAluno} noOptionsText="Nenhum aluno disponível" isOptionEqualToValue={(option, value) => option.label === value.label} options={alunos ? alunos.elementos.map((aluno) => ({ label: `${aluno.idAluno} - ${aluno.nome}` })) : []} renderInput={(params) => <TextField {...params} label="Aluno" variant="filled" {...register("idAluno")} />} />
            {AlunoErro && <Typography id="erro-vaga" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">Por favor, escolha uma vaga</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }} >
            <Autocomplete disablePortal id="vaga" onChange={handleChangeVaga} isOptionEqualToValue={(option, value) => option.label === value.label} options={vagas ? vagas.elementos.map((vaga) => ({ label: `${vaga.idVaga} - ${vaga.nome}` })) : []} renderInput={(params) => <TextField {...params} label="Vaga" variant="filled" {...register("idVaga")} />} />
            {vagaErro && <Typography id="erro-vaga" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">Por favor, escolha uma vaga</Typography>}
          </FormControl>

          <FormControl variant="filled" sx={{ width: { xs: "100%", md: "100%" } }}>
            <InputLabel id="selectAluno">Situação</InputLabel>
            <Select labelId="demo-simple-select-filled-label" defaultValue="" id="select-trilha" {...register("situacao")} >
              <MenuItem value="initial-stack" disabled><em>Selecione uma situação</em></MenuItem>
              <MenuItem id="reservado" value="RESERVADO">Reservado</MenuItem>
            </Select>
            {errors.situacao && <Typography id="erro-situacao" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.situacao.message}</Typography>}
          </FormControl>
        </Stack>

        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: "end" }}>

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }}>
            <TextField
              placeholder="Digite uma descrição"
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

            <Button type="submit" onClick={() => { erroVaga(); erroAluno(); }} variant="contained" color="success" sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cadastrar</Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
