import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import { Titulo } from "../../components/Titulo/Titulo";

import { Box, FormControl, TextField, Stack, Typography, InputLabel, MenuItem, Select, Button } from "@mui/material";

import InputMask from 'react-input-mask';

import Autocomplete from '@mui/material/Autocomplete';

import { yupResolver } from "@hookform/resolvers/yup";
import { alunoSchema } from "../../utils/schemas";
import { ICadastroAlunoForm } from "../../utils/interface";

import { useTrilha } from "../../context/Tecnico/TrilhaContext";
import { usePrograma } from "../../context/Tecnico/ProgramaContext";
import { useAluno } from "../../context/Comportamental/AlunoContext";
import { useTecnologia } from "../../context/Tecnico/TecnologiasContext";

export const CadastrarAluno = () => {
  const navigate = useNavigate();

  const { cadastrarAluno } = useAluno();
  const { pegarTrilha, trilhas } = useTrilha();
  const { pegarProgramaAtivo, programas } = usePrograma();
  const { pegarTecnologia, cadastrarTecnologia, tecnologias } = useTecnologia();

  useEffect(() => {
    pegarTrilha(0, trilhas?.totalElementos);
    pegarProgramaAtivo(0, programas?.totalElementos);
    pegarTecnologia(0, tecnologias?.totalElementos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [inputTecnologia, setInputTecnologia] = useState<string>('')
  const [tecnologiaSelecionada, setTecnologiaSelecionada] = useState<number[]>([]);



  const { register, handleSubmit, formState: { errors },control } = useForm<ICadastroAlunoForm>({
    resolver: yupResolver(alunoSchema)
  });

  

  const cadastroAluno = (data: ICadastroAlunoForm) => {
    const novoData = { ...data, idTrilha: parseInt(data.idTrilha), idPrograma: parseInt(data.idPrograma.split(' ')[0]), tecnologias: tecnologiaSelecionada }
    cadastrarAluno(novoData);
  };

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "80px", paddingBottom: "50px" }}>
      <Titulo texto="Cadastrar Aluno" />

      <Box component="form" onSubmit={handleSubmit(cadastroAluno)} sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, justifyContent: "space-between", backgroundColor: "var(--branco)", width: { xs: "95%", md: "90%", lg: "85%" }, borderRadius: "10px", padding: { xs: 3, sm: 5 }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: { xs: 3, xl: 8 } }}>
        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: { xs: "start", md: "start" } }}>

          <FormControl sx={{ width: "100%" }}>
            <TextField id="nomeCompletoAluno" label="Nome Completo" placeholder="Digite o nome do aluno" variant="filled" error={!!errors.nome} {...register("nome")} />
            {errors.nome && <Typography id="erro-nomeCompletoAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.nome.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField id="emailAluno" label="E-mail DBC" placeholder="Digite o e-mail DBC do aluno" variant="filled" {...register("email")} error={!!errors.email} />
            {errors.email && <Typography id="erro-emailAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.email.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }} variant="filled">
            <InputMask style={{ padding: "18px 13px", borderRadius: "4px 4px 0 0", backgroundColor: '#f0f0f0', border: "none", outline: "none", borderBottom: "1px solid gray", fontFamily: "Inter", fontSize: "1rem", color: "rgba(0, 0, 0, 0.87)" }} mask="(99)99999-9999" type="text" id="telefone" placeholder="Telefone" {...register('telefone')} />
            {errors.telefone && <Typography id="erro-telefoneAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.telefone.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField type="text" label="Cidade" placeholder='Digite a cidade do aluno' id='cidade' variant="filled" {...register("cidade")} error={!!errors.cidade} />
            {errors.cidade && <Typography id="erro-cidadeAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.cidade.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField type="text" label="Estado" placeholder='Digite o estado do aluno' id='estado' variant="filled" {...register("estado")} error={!!errors.estado} />
            {errors.estado && <Typography id="erro-estadoAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.estado.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField placeholder="Digite uma descrição para o aluno" multiline rows={3} sx={{ width: "100%" }} id="descricao" label="Descrição" variant='filled' {...register("descricao")} error={!!errors.descricao} />
            {errors.descricao && <Typography id="erro-descricaoAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.descricao.message}</Typography>}
          </FormControl>
        </Stack>

        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: "end" }}>
          <FormControl sx={{ width: { xs: "100%", md: "100%" }, display: "flex", flexDirection: "row", gap: "10px" }}>
            <Autocomplete sx={{ width: "90%" }}
              multiple disablePortal id="tecnologias" noOptionsText="Nenhuma opção encontrada. Cadastre a tecnologia"
              onChange={(e, values) => { if (values.length === 0) setTecnologiaSelecionada([]); setTecnologiaSelecionada(values.map((value) => value.id)) }}
              isOptionEqualToValue={(option, value) => option.label === value.label}
              options={tecnologias ? tecnologias.elementos.map((tecnologia) => ({ label: `${tecnologia.nome}`, id: tecnologia.idTecnologia })) : []} renderOption={(props, option) => (<li {...props} key={option.id}>{option.label}</li>)}
              renderInput={(params) => <TextField {...params} label="Tecnologias" variant="filled" onChange={(e) => setInputTecnologia(e.target.value)} />} />

            <Button id="botao-cadastrar-tecnologia" variant={"contained"} sx={{ width: '10%', fontSize: "20px" }} onClick={() => { if (inputTecnologia) cadastrarTecnologia({ nome: inputTecnologia }); setInputTecnologia('') }}>+</Button>
          </FormControl>

          <FormControl variant="filled" sx={{ width: "100%" }}>
            <InputLabel id="trilhaAluno">Trilha</InputLabel>
            <Select labelId="demo-simple-select-filled-label" id="select-trilha" defaultValue="" error={!!errors.idTrilha} {...register("idTrilha")}>
              <MenuItem value="initial-stack" disabled><em>Selecione a trilha do aluno</em></MenuItem>
              {trilhas?.elementos.map((trilha) => (
                <MenuItem key={trilha.idTrilha} id={`id-trilha=${trilha.idTrilha}`} value={`${trilha.idTrilha}`}>{trilha.nome}</MenuItem>
              ))}
            </Select>
            {errors.idTrilha && <Typography id="erro-trilhaAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.idTrilha.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }} >
          <Controller control={control} name="idPrograma" render={({ field: { onChange } }) => (
            <Autocomplete disablePortal onChange={(event, data) => onChange(data?.label)}  id="programa" getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => option.label === value.label}
              options={programas ? programas.elementos.map((programa) => ({ label: `${programa.idPrograma} - ${programa.nome}` })) : []} renderInput={(params) => <TextField {...params} label="Programa" variant="filled"/>} />
              )}/>
              {errors.idPrograma && <Typography id="erro-programa" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.idPrograma.message}</Typography>}
          </FormControl>

          <FormControl variant="filled" sx={{ width: "100%" }}>
            <InputLabel id="situacaoAluno">Situação</InputLabel>
            <Select labelId="demo-simple-select-filled-label" defaultValue="" id="situacao" error={!!errors.situacao} {...register("situacao")}>
              <MenuItem value="initial-situacao" disabled><em>Selecione uma situação inicial para o aluno</em></MenuItem>
              <MenuItem id="disponivel" value="DISPONIVEL">Disponível</MenuItem>
            </Select>
            {errors.situacao && <Typography id="erro-situacaoAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.situacao.message}</Typography>}
          </FormControl>

          <Box sx={{ display: "flex", width: "100%", justifyContent: { xs: "center", lg: "end" }, alignItems: { xs: "center", lg: "end" }, bottom: 0, paddingTop: "20px", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
            <Button type="button" onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d " }, textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cancelar</Button>

            <Button variant="contained" type="submit" color="success" sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cadastrar</Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
