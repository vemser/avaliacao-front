import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Titulo } from '../../components/Titulo/Titulo';

import { Box, Stack, FormControl, TextField, Typography, InputLabel, Select, MenuItem, Button } from '@mui/material';

import InputMask from 'react-input-mask';

import { Controller, useForm } from 'react-hook-form';

import { useTrilha } from '../../context/Tecnico/TrilhaContext';
import { usePrograma } from '../../context/Tecnico/ProgramaContext';

import { ICadastroAlunoForm } from "../../utils/interface";

import Autocomplete from '@mui/material/Autocomplete';
import { useTecnologia } from '../../context/Tecnico/TecnologiasContext';
import { useAluno } from '../../context/Comportamental/AlunoContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { alunoSchema } from '../../utils/schemas';
import { ITecnologiasAluno } from '../../utils/AlunoInterface/aluno';
import { formatarNomeCompleto } from '../../utils/functions';

const itemHeigth = 48;
const itemPaddingTop = 8;
const MenuProps = { PaperProps: { style: { maxHeight: itemHeigth * 4.5 + itemPaddingTop, width: 250 } } };

export const EditarAluno = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { editarAluno } = useAluno();
  const { programas, pegarPrograma } = usePrograma();
  const { trilhas, pegarTrilha } = useTrilha();
  const { pegarTecnologia, cadastrarTecnologia, tecnologias } = useTecnologia();

  const [inputTecnologia, setInputTecnologia] = useState<string>('')
  const [tecnologiaSelecionada, setTecnologiaSelecionada] = useState<number[]>([]);

  const initialState = () => {
    let result = state.tecnologias.map((tecnologia: ITecnologiasAluno) => tecnologia.idTecnologia)
    setTecnologiaSelecionada(result)
  }

  const { register, handleSubmit, formState: { errors }, control } = useForm<ICadastroAlunoForm>({
    resolver: yupResolver(alunoSchema)
  });

  const editar = (data: ICadastroAlunoForm) => {
    const novoData = { ...data, idTrilha: parseInt(data.idTrilha), idPrograma: data.idPrograma ? parseInt(data.idPrograma.split(' ')[0]) : state.programa.idPrograma, tecnologias: tecnologiaSelecionada }
    editarAluno(novoData, state.idAluno)
  };

  useEffect(() => {
    pegarPrograma(0, programas?.totalElementos);
    pegarTrilha(0, trilhas?.totalElementos);
    pegarTecnologia(0, tecnologias?.totalElementos);
    initialState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "60px", paddingBottom: "50px" }}>
      <Titulo texto={`Editar ${formatarNomeCompleto(state.nome)}`} />

      <Box component="form" onSubmit={handleSubmit(editar)} sx={{
        display: "flex", flexDirection: { xs: "column", lg: "row" }, justifyContent: "space-between", backgroundColor: "var(--branco)", width: { xs: "95%", md: "90%", lg: "85%" }, borderRadius: "10px", padding: {
          xs: 3, sm: 5
        }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: { xs: 3, xl: 8 }
      }}>
        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: { xs: "start", md: "start" } }}>

          <FormControl sx={{ width: "100%" }}>
            <TextField id="nomeCompletoAluno" label="Nome Completo" defaultValue={state.nome} placeholder="Fulano da Silva" variant="filled" error={!!errors.nome} {...register("nome")} />
            {errors.nome && <Typography id="erro-nomeCompletoAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.nome.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField id="emailAluno" label="E-mail DBC" defaultValue={state.email} placeholder="fulano.silva@dbccompany.com.br" variant="filled" {...register("email")} error={!!errors.email} />
            {errors.email && <Typography id="erro-emailAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.email.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <InputMask style={{ padding: "18px 13px", borderRadius: "4px 4px 0 0", backgroundColor: '#f0f0f0', border: "none", outline: "none", borderBottom: "1px solid gray", fontFamily: "Inter", fontSize: "1rem", color: "rgba(0, 0, 0, 0.87)" }} mask="(99)99999-9999" type="text" id="telefone" defaultValue={state.telefone} placeholder="Telefone" {...register('telefone')} />
            {errors.telefone && <Typography id="erro-telefoneAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.telefone.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField type="text" label="Cidade" defaultValue={state.cidade} {...register("cidade")} placeholder='Digite a cidade' id='cidade' variant="filled" error={!!errors.cidade} />
            {errors.cidade && <Typography id="erro-cidadeAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.cidade.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField type="text" label="Estado" defaultValue={state.estado} {...register("estado")} placeholder='Digite o estado' id='estado' variant="filled" error={!!errors.estado} />
            {errors.estado && <Typography id="erro-estadoAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.estado.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField defaultValue={state.descricao} placeholder="Digite uma descrição" multiline rows={4} sx={{ width: "100%" }} id="descricao" label="Descrição" {...register("descricao")} variant='filled' error={!!errors.descricao} />
            {errors.descricao && <Typography id="erro-descricaoAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.descricao.message}</Typography>}
          </FormControl>
        </Stack>

        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: "end" }}>
          <FormControl sx={{ width: { xs: "100%", md: "100%" }, display: "flex", flexDirection: "row", gap: "10px" }}>
            <Autocomplete sx={{ width: "90%" }} defaultValue={state.tecnologias.map((tecnologia: ITecnologiasAluno) => ({ label: tecnologia.nome, id: tecnologia.idTecnologia }))}
              multiple disablePortal id="tecnologias" noOptionsText="Nenhuma opção encontrada. Cadastre a tecnologia"
              onChange={(e, values) => { if (values.length === 0) setTecnologiaSelecionada([]); setTecnologiaSelecionada(values.map((value) => value.id)) }}
              isOptionEqualToValue={(option, value) => option.label === value.label}
              options={tecnologias ? tecnologias.elementos.map((tecnologia) => ({ label: `${tecnologia.nome}`, id: tecnologia.idTecnologia })) : []}
              renderOption={(props, option) => (<li {...props} key={option.id}>{option.label}</li>)}
              renderInput={(params) => <TextField {...params} label="Tecnologias" variant="filled" onChange={(e) => setInputTecnologia(e.target.value)} />}
            />

            <Button id="botao-cadastrar-tecnologia" variant={"contained"} sx={{ width: '10%', fontSize: "20px" }} onClick={() => { if (inputTecnologia) cadastrarTecnologia({ nome: inputTecnologia }); setInputTecnologia('') }}>+</Button>
          </FormControl>

          <FormControl variant="filled" sx={{ width: "100%" }}>
            <InputLabel id="selectAluno">Trilha do Aluno</InputLabel>
            <Select MenuProps={MenuProps} labelId="demo-simple-select-filled-label" defaultValue={state.trilha.idTrilha} id="select-trilha" {...register("idTrilha")} error={!!errors.idTrilha}>
              {trilhas?.elementos.map((trilha) => (
                <MenuItem key={trilha.idTrilha} id={`id-trilha=${trilha.idTrilha}`} value={`${trilha.idTrilha}`}>{trilha.nome}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ width: "100%" }} variant="filled">
            <Controller control={control} name="idPrograma" render={({ field: { onChange } }) => (
              <Autocomplete disablePortal onChange={(event, data) => onChange(data?.label)} id="programa" getOptionLabel={(option) => option.label}
                defaultValue={{ label: `${state.programa.idPrograma} - ${state.programa.nome}`, id: state.programa.idPrograma }}
                isOptionEqualToValue={(option) => option.label === `${state.programa.idPrograma} - ${state.programa.nome}`}
                options={programas ? programas.elementos.map((programa) => ({ label: `${programa.idPrograma} - ${programa.nome}`, id: programa.idPrograma })) : []}
                renderOption={(props, option) => (<li {...props} key={option.id}>{option.label}</li>)}
                renderInput={(params) => <TextField {...params} label="Programa" variant="filled" />} />
            )} />
            {errors.idPrograma && <Typography id="erro-idPrograma" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.idPrograma.message}</Typography>}
          </FormControl>

          <FormControl variant="filled" sx={{ width: { xs: "100%", md: "100%" } }}>
            <InputLabel id="selectAluno">Situação</InputLabel>
            <Select labelId="demo-simple-select-filled-label" defaultValue={state.situacao} error={!!errors.situacao} {...register("situacao")} id="select-situacao">
              <MenuItem id="disponivel" value="DISPONIVEL">Disponível</MenuItem>
              <MenuItem id="reservado" value="RESERVADO">Reservado</MenuItem>
              <MenuItem id="alocado" value="ALOCADO">Alocado</MenuItem>
              <MenuItem id="inativo" value="INATIVO">Inativo</MenuItem>
            </Select>
            {errors.situacao && <Typography id="erro-situacaoAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.situacao.message}</Typography>}
          </FormControl>

          <Box sx={{ display: "flex", width: "100%", justifyContent: { xs: "center", lg: "end" }, alignItems: { xs: "center", lg: "end" }, bottom: 0, paddingTop: "20px", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
            <Button type="button" onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d" }, textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cancelar</Button>

            <Button type="submit" variant="contained" color="success" sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Salvar</Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}
