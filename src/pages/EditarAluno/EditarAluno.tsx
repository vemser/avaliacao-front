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
import { filtroDebounce, formatarNomeCompleto } from '../../utils/functions';

export const EditarAluno = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { editarAluno } = useAluno();
  const { programas, pegarProgramaAtivo, pegarProgramaPorNomeAtivo } = usePrograma();
  const { pegarTrilha, pegarTrilhaFiltroNome, pegarTrilhaPorPrograma, trilhasPorPrograma } = useTrilha();
  const { pegarTecnologia, pegarTecnologiaPorNome, cadastrarTecnologia, tecnologias } = useTecnologia();

  const [inputTecnologia, setInputTecnologia] = useState<string>('')
  const [tecnologiaSelecionada, setTecnologiaSelecionada] = useState<number[]>([]);

  const { register, handleSubmit, formState: { errors }, control, watch, reset } = useForm<ICadastroAlunoForm>({
    resolver: yupResolver(alunoSchema),
    defaultValues: {
      idPrograma: state.programa.idPrograma,
      idTrilha: { label: state.trilha.nome, id: state.trilha.idTrilha }
    }
  });

  const inputValor = watch();

  const initialState = () => {
    let result = state.tecnologias.map((tecnologia: ITecnologiasAluno) => tecnologia.idTecnologia)
    setTecnologiaSelecionada(result)
  }

  const editar = (data: ICadastroAlunoForm) => {
    const novoData = { ...data, idTrilha: data?.idTrilha?.id, idPrograma: data.idPrograma ? parseInt(data.idPrograma) : state.programa.idPrograma, tecnologias: tecnologiaSelecionada }
    editarAluno(novoData, state.idAluno)
  };

  useEffect(() => {
    pegarProgramaAtivo();
    pegarTrilha();
    pegarTecnologia();
    initialState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (inputValor.idPrograma) pegarTrilhaPorPrograma(parseInt(inputValor.idPrograma));
    if (!inputValor.idPrograma) {
      reset({ idTrilha: null, idPrograma: '' });
      pegarProgramaAtivo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValor.idPrograma])

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "60px", paddingBottom: "50px" }}>
      <Titulo texto={`Editar ${formatarNomeCompleto(state.nome)}`} />

      <Box component="form" onSubmit={handleSubmit(editar)} sx={{
        display: "flex", flexDirection: { xs: "column", lg: "row" }, justifyContent: "space-between", backgroundColor: "var(--branco)", width: { xs: "95%", md: "90%" }, borderRadius: "10px", padding: {
          xs: 3, sm: 5
        }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: { xs: 3, xl: 8 }
      }}>
        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: { xs: "start", md: "start" } }}>

          <FormControl sx={{ width: "100%" }}>
            <TextField id="nomeCompletoAluno" label="Nome Completo" defaultValue={state.nome} placeholder="Digite o nome do aluno" variant="filled" error={!!errors.nome} {...register("nome")} />
            {errors.nome && <Typography id="erro-nomeCompletoAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.nome.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField id="emailAluno" label="E-mail DBC" defaultValue={state.email} placeholder="Digite o e-mail DBC do aluno" variant="filled" {...register("email")} error={!!errors.email} />
            {errors.email && <Typography id="erro-emailAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.email.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <InputMask style={{ padding: "18px 13px", borderRadius: "4px 4px 0 0", backgroundColor: '#f0f0f0', border: "none", outline: "none", borderBottom: "1px solid gray", fontFamily: "Inter", fontSize: "1rem", color: "rgba(0, 0, 0, 0.87)" }} mask="(99)99999-9999" type="text" id="telefone" defaultValue={state.telefone} placeholder="Telefone" {...register('telefone')} />
            {errors.telefone && <Typography id="erro-telefoneAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.telefone.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField type="text" label="Cidade" defaultValue={state.cidade} {...register("cidade")} placeholder='Digite a cidade do aluno' id='cidade' variant="filled" error={!!errors.cidade} />
            {errors.cidade && <Typography id="erro-cidadeAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.cidade.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField type="text" label="Estado" defaultValue={state.estado} {...register("estado")} placeholder='Digite o estado do aluno' id='estado' variant="filled" error={!!errors.estado} />
            {errors.estado && <Typography id="erro-estadoAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.estado.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField defaultValue={state.descricao} placeholder="Digite uma descrição para o aluno" multiline rows={4} sx={{ width: "100%" }} id="descricao" label="Descrição" {...register("descricao")} variant='filled' error={!!errors.descricao} />
            {errors.descricao && <Typography id="erro-descricaoAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.descricao.message}</Typography>}
          </FormControl>
        </Stack>

        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: "end" }}>
          <FormControl sx={{ width: { xs: "100%", md: "100%" }, display: "flex", flexDirection: "row", gap: "10px" }}>
            <Controller control={control} name="tecnologias" render={({ field: { onChange } }) => (
              <Autocomplete sx={{ width: "90%" }} multiple disablePortal id="tecnologias"
                defaultValue={state.tecnologias.map((tecnologia: ITecnologiasAluno) => ({ label: tecnologia.nome, id: tecnologia.idTecnologia }))}
                noOptionsText="Nenhuma opção encontrada. Cadastre a tecnologia"
                onChange={(e, values) => { if (values.length === 0) setTecnologiaSelecionada([]); setTecnologiaSelecionada(values.map((value) => value.id)) }}
                onInputChange={(event, value) => {
                  filtroDebounce(value, pegarTecnologiaPorNome, pegarTecnologia)
                }}
                isOptionEqualToValue={(option, value) => option.label === value.label}
                options={tecnologias ? tecnologias.elementos.map((tecnologia) => ({ label: `${tecnologia.nome}`, id: tecnologia.idTecnologia })) : []}
                renderOption={(props, option) => (<li {...props} key={option.id}>{option.label}</li>)}
                renderInput={(params) => <TextField {...params} label="Tecnologias" variant="filled" onChange={(e) => setInputTecnologia(e.target.value)} />}
              />
            )} />
            <Button id="botao-cadastrar-tecnologia" variant={"contained"} sx={{ width: '10%', fontSize: "20px" }} onClick={() => { if (inputTecnologia) cadastrarTecnologia({ nome: inputTecnologia }); setInputTecnologia('') }}>+</Button>
          </FormControl>

          <FormControl sx={{ width: "100%" }} variant="filled">
            <Controller control={control} name="idPrograma" render={({ field: { onChange } }) => (
              <Autocomplete disablePortal
                onChange={(event, data) => {
                  onChange(data?.id);
                  reset({ idPrograma: data?.id, idTrilha: null })
                }}
                id="programa" getOptionLabel={(option) => option.label}
                defaultValue={{ label: state.programa.nome, id: state.programa.idPrograma }}
                onInputChange={(event, value) => {
                  filtroDebounce(value, pegarProgramaPorNomeAtivo, pegarProgramaAtivo)
                }}
                isOptionEqualToValue={(value, option) => option.label === value.label}
                options={programas ? programas.elementos.map((programa) => ({ label: `${programa.nome}`, id: programa.idPrograma })) : []}
                renderOption={(props, option) => (<li {...props} key={option.id}>{option.label}</li>)}
                renderInput={(params) => <TextField {...params} label="Programa" variant="filled" />} />
            )} />
            {errors.idPrograma && <Typography id="erro-idPrograma" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.idPrograma.message}</Typography>}
          </FormControl>

          <FormControl variant="filled" sx={{ width: "100%" }}>
            <Controller control={control} name="idTrilha" render={({ field: { onChange } }) => (
              <Autocomplete noOptionsText="Nenhuma trilha encontrada" disablePortal id="trilha"
                disabled={!inputValor.idPrograma ? true : false}
                value={inputValor.idTrilha ? inputValor.idTrilha : null}
                onChange={(event, data) => onChange(data)}
                onInputChange={(event, value) => {
                  filtroDebounce(value, pegarTrilhaFiltroNome, pegarTrilha)
                }}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.label === value.label}
                options={trilhasPorPrograma ? trilhasPorPrograma.map((trilha) => ({ label: trilha.nome, id: trilha.idTrilha })) : []}
                renderOption={(props, option) => (<li {...props} key={option.id}>{option.label}</li>)}
                renderInput={(params) => <TextField key={params.id} {...params} label="Trilha" variant="filled" />} />
            )} />
            {errors.idTrilha && <Typography id="erro-trilhaAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.idTrilha.message}</Typography>}
          </FormControl>

          <FormControl variant="filled" sx={{ width: { xs: "100%", md: "100%" } }}>
            <InputLabel id="selectAluno">Situação</InputLabel>
            <Select labelId="demo-simple-select-filled-label" defaultValue={state.situacao} error={!!errors.situacao} {...register("situacao")} id="select-situacao">
              <MenuItem id="disponivel" value="DISPONIVEL">Disponível</MenuItem>
              <MenuItem id="reservado" value="RESERVADO">Reservado</MenuItem>
              <MenuItem id="alocado" value="ALOCADO">Alocado</MenuItem>
              <MenuItem id="cancelado" value="CANCELADO">Cancelado</MenuItem>
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
