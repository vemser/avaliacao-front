import { Box, Stack, FormControl, TextField,  InputLabel, Select, MenuItem, Button, Autocomplete, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { usePrograma } from '../../context/Tecnico/ProgramaContext';


import * as Componentes from '../../components/index';
import { useTrilha } from '../../context/Tecnico/TrilhaContext';
import { useAluno } from '../../context/Comportamental/AlunoContext';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { IAvaliacao } from '../../utils/AvaliacaoInterface/Avaliacao';
import { avalicaoSchema } from '../../utils/schemas';
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

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 }
];

export const CadastrarAvaliacao = () => {
  const navigate = useNavigate();
  
  const { pegarProgramaAtivo, programas } = usePrograma();
  const { pegarTrilha, trilhas } = useTrilha();
  const { pegarAluno, alunos } = useAluno();
  let data = moment()
  let novaData = data.format("YYYY-MM-DD")


  const [acompanhamentoErro, setAcompanhamentoErro] = useState<boolean>(false);
  const [dataAcompanhamento, setDataAcompanhamento] = useState<string>()
  const [programaErro, setProgramaErro] = useState<boolean>(false);
  const [dataPrograma, setDataPrograma] = useState<string>()
  const [trilhaErro, setTrilhaErro] = useState<boolean>(false);
  const [dataTrilha, setDataTrilha] = useState<string>()
  const [alunoErro, setAlunoErro] = useState<boolean>(false);
  const [dataAluno, setDataAluno] = useState<string>()

  useEffect(() => {
    pegarProgramaAtivo(0, programas?.totalElementos);
    pegarTrilha(0,trilhas?.totalElementos);
    pegarAluno(0, alunos?.totalElementos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { register, handleSubmit, formState: { errors }} = useForm<IAvaliacao>({
    resolver: yupResolver(avalicaoSchema)
  });

  
  const handleChangeAcompanhamento = () => {
    setAcompanhamentoErro(false)
    setDataAcompanhamento('')
  };
  
  const handleChangePrograma = () => {
    setProgramaErro(false)
    setDataPrograma('')
  };

  const handleChangeTrilha = () => {
    setTrilhaErro(false)
    setDataTrilha('')
  };

  const handleChangeAluno = () => {
    setAlunoErro(false)
    setDataAluno('')
  };
 

  const erro = (estado: string | undefined, setErro: any): void => {
    if(estado) {
      setErro(false)
    } else {
      setErro(true) 
    }
  }
  


  const cadastrarAvalicao = (data: IAvaliacao) => {
    setDataAcompanhamento(data.idAcompanhamento.toString())
    setDataPrograma(data.idPrograma.toString())
    setDataTrilha(data.idTrilha.toString())
    setDataAluno(data.idAluno.toString())
    console.log(data)
  }

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "80px", paddingBottom: "50px" }}>
        <Componentes.Titulo texto="Cadastrar avalicação" />


      <Box component="form" onSubmit={handleSubmit(cadastrarAvalicao)}  sx={{
        display: "flex", flexDirection: { xs: "column", lg: "row" }, justifyContent: "space-between", backgroundColor: "var(--branco)", width: { xs: "95%", md: "90%", lg: "85%" }, borderRadius: "10px", padding: {
          xs: 3, sm: 5
        }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: { xs: 3, xl: 8 }
      }}>
        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: { xs: "start", md: "start" } }}>

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }} >
          <Autocomplete
            disablePortal
            onChange={handleChangeAcompanhamento}
            id="acompanhemnto"
            options={top100Films}
            renderInput={(params) => <TextField {...params} label="Acompanhamento" variant="filled" {...register("idAcompanhamento")}/>}
          />
          {acompanhamentoErro && <Typography id="erro-acompanhamento" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">Por favor, escolha um acompanhamento</Typography>}
          </FormControl>

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }} >
            <Autocomplete
              disablePortal
              onChange={handleChangePrograma}
              id="programa"
              isOptionEqualToValue={(option, value) => option.label === value.label}
              options={programas ? programas.elementos.map(item => ({ label: `${item.idPrograma} - ${item.nome}` })) : []}
              renderInput={(params) => <TextField {...params}  label="Programa" variant="filled" {...register("idPrograma")}/>}
            />
            {programaErro && <Typography id="erro-programa" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">Por favor, escolha um programa</Typography>}
          </FormControl>

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }} >
            <Autocomplete
              disablePortal
              onChange={handleChangeTrilha}
              id="trilha"
              isOptionEqualToValue={(option, value) => option.label === value.label}
              options={trilhas ? trilhas.elementos.map(item => ({ label: `${item.idTrilha} - ${item.nome}` })) : []}
              renderInput={(params) => <TextField {...params}  label="Trilha" variant="filled" {...register("idTrilha")} />}
            />
            {trilhaErro && <Typography id="erro-trilha" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">Por favor, escolha uma trilha</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }} >
            <Autocomplete disablePortal id="aluno" onChange={handleChangeAluno} isOptionEqualToValue={(option, value) => option.label === value.label} options={alunos ? alunos.elementos.map((aluno) => ({ label: `${aluno.idAluno} - ${aluno.nome}` })) : []} renderInput={(params) => <TextField {...params} label="Aluno" variant="filled" {...register("idAluno")} />}/>
            {alunoErro && <Typography id="erro-aluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">Por favor, escolha um aluno</Typography>}
          </FormControl>

        </Stack>

        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: "end" }}>

        <FormControl sx={{ width: "100%" }}>
            <TextField
              placeholder="Digite uma descrição para a avaliação"
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
              id="dataAvalicao" label="Data" type="date" defaultValue={novaData} sx={{ width: "100%" }} InputLabelProps={{ shrink: true }} variant="filled" {...register("data")} />

          </FormControl>

          <FormControl variant="filled" sx={{ width: { xs: "100%", md: "100%" } }}>
            <InputLabel id="selectAluno">Situação</InputLabel>
            <Select labelId="demo-simple-select-filled-label" defaultValue="" id="situacao" {...register("situacao")}>
              <MenuItem value="initial-stack" disabled><em>Selecione uma situação</em></MenuItem>
              <MenuItem id="positivo" value="POSITIVO">Positivo</MenuItem>
              <MenuItem id="atencao" value="ATENCAO">Atenção</MenuItem>
            </Select>
            {errors.situacao && <Typography id="erro-situacao" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.situacao.message}</Typography>}
          </FormControl>

          <Box sx={{ display: "flex", width: "100%", justifyContent: { xs: "center", lg: "end" }, alignItems: { xs: "center", lg: "end" }, bottom: 0, paddingTop: "20px", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
            <Button type="button" onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d " }, textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cancelar</Button>

            <Button type="submit" onClick={() => { erro(dataAcompanhamento,setAcompanhamentoErro); erro(dataPrograma,setProgramaErro); erro(dataTrilha,setTrilhaErro); erro(dataAluno,setAlunoErro);}} variant="contained" color="success" sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cadastrar</Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}
