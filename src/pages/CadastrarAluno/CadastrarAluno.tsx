import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Titulo } from "../../components/Titulo/Titulo";

import { Box, FormControl, TextField, Stack, Typography, InputLabel, MenuItem, Select, Button } from "@mui/material";

import InputMask from 'react-input-mask';

import Autocomplete from '@mui/material/Autocomplete';

import { yupResolver } from "@hookform/resolvers/yup";
import { alunoSchema } from "../../utils/schemas";
import { ICadastroAlunoForm } from "../../utils/interface";

import DeleteIcon from '@mui/icons-material/Delete';

import { useTrilha } from "../../context/Tecnico/TrilhaContext";
import { usePrograma } from "../../context/Tecnico/ProgramaContext";
import { useAluno } from "../../context/Comportamental/AlunoContext";

export const CadastrarAluno = () => {
  const navigate = useNavigate();

  const { cadastrarAluno } = useAluno();
  const { pegarTrilha, trilhas } = useTrilha();
  const { pegarPrograma, programas } = usePrograma();

  useEffect(() => {
    pegarTrilha(0, 999);
    pegarPrograma(0, 999);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [tec, setTec] = useState<string>('')
  const [mostrarTec, setMostrarTec] = useState<string[]>([])

  const { register, handleSubmit, formState: { errors } } = useForm<ICadastroAlunoForm>({
    resolver: yupResolver(alunoSchema)
  });

  const adicionarTecnologia = () => {
    mostrarTec.includes(tec) ? alert("ja existe") : setMostrarTec([...mostrarTec, tec])
    setTec("")
  }

  const cadastroAluno = (data: ICadastroAlunoForm) => {
    const novoData = { ...data, idTrilha: parseInt(data.idTrilha), idPrograma: parseInt(data.idPrograma.split(' ')[0]), tecnologias: [1] }
    cadastrarAluno(novoData)
  };

  // const infosUsuario = JSON.parse(localStorage.getItem("infoUsuario") || "{}");
  // if (infosUsuario.cargo !== "Instrutor" && infosUsuario.cargo !== "Gestor de Pessoas") return <Navigate to="/" />

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 64px)", paddingTop: "80px", paddingBottom: "50px" }}>
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

          <FormControl sx={{ width: "100%" }} variant="standard">
            <label htmlFor="telefone">Telefone</label>
            <InputMask style={{ padding: "10px", border: "none", outline: "none", borderBottom: "1px solid gray" }} mask="(99)99999-9999" type="text" id="telefone" placeholder="Digite seu telefone" {...register('telefone')} />
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
        {/* Corrigir tecnologia, get autocomplete */}
          <FormControl sx={{ width: { xs: "100%", md: "100%" }, display: "flex", flexDirection: "row", gap: "10px" }}>
            <TextField sx={{ width: "90%" }} type="text" label='Tecnologias' placeholder='Digite uma tecnologia' id='tecnologias' value={tec} onChange={(e) => setTec(e.target.value)} variant="outlined" />

            <Button id="botao-adiconar-tecnologia" variant={"contained"} sx={{ width: '10%', fontSize: "20px" }} onClick={adicionarTecnologia}>+</Button>
          </FormControl>

          <Box sx={{ border: '1px solid #ababab', borderRadius: '5px', p: '5px', display: 'flex', width: '100%', height: '55px', overflowX: 'auto', alignItems: 'center', gap: '10px' }}>
            {mostrarTec.map((el, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: "center", border: '1px solid #ababab', borderRadius: '15px', p: '10px', height: '30px', gap: '5px' }}>{el}
                <Box sx={{ width: '25px', height: '25px', borderRadius: '100%', background: 'red', display: 'flex', justigyContent: 'center', alignItems: 'center', cursor: 'pointer', color: 'white', paddingLeft: '2px' }} onClick={() => setMostrarTec(mostrarTec.filter(r => r !== el))}>
                  <DeleteIcon sx={{ fontSize: "20px" }} />
                </Box>
              </Box>
            ))}
          </Box>

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
            <Autocomplete disablePortal id="programa" isOptionEqualToValue={(option, value) => option.label === value.label} options={programas ? programas.elementos.map((programa) => ( { label: `${programa.idPrograma} - ${programa.nome}`})) : []} renderInput={(params) => <TextField {...params} label="Programa" variant="filled" {...register("idPrograma")} />} />
            {errors.idPrograma && <Typography id="erro-programaAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.idPrograma.message}</Typography>}
          </FormControl>

          <FormControl variant="filled" sx={{ width: "100%" }}>
            <InputLabel id="situacaoAluno">Situação</InputLabel>
            <Select labelId="demo-simple-select-filled-label" defaultValue="" id="situacao" error={!!errors.situacao} {...register("situacao")}>
              <MenuItem value="initial-situacao" disabled><em>Selecione uma situação inicial para o aluno</em></MenuItem>
              <MenuItem id="disponivel" value="DISPONIVEL">Disponível</MenuItem>
              <MenuItem id="reservado" value="RESERVADO">Reservado</MenuItem>
              <MenuItem id="alocado" value="ALOCADO">Alocado</MenuItem>
              <MenuItem id="inativo" value="INATIVO">Inativo</MenuItem>
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
