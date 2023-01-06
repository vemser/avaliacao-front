import { Box, Stack, FormControl, Autocomplete, TextField, InputLabel, Select, MenuItem, Button, Typography } from '@mui/material';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from 'react-router-dom';
import { Titulo } from '../../components';

import { VagaSchema } from "../../utils/schemas";
import { IVaga } from '../../utils/VagaInterface/vaga';
import { useVaga } from '../../context/Alocacao/VagaContext';
import { usePrograma } from '../../context/Tecnico/ProgramaContext';
import { useEffect } from 'react';
import { useCliente } from '../../context/Alocacao/ClienteContext';

export const CadastrarVaga = () => {
  const navigate = useNavigate();
  const { pegarProgramaAtivo, programas } = usePrograma();
  const { pegarCliente, cliente } = useCliente();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IVaga>({ resolver: yupResolver(VagaSchema) });
  const { cadastrarVaga } = useVaga();

  const cadastrar = async (data: IVaga) => {

    data.dataCriacao = new Date().toISOString().split("T")[0];
    data.idCliente = parseInt(data.idCliente.toString().split(' ')[0]);
    data.idPrograma = parseInt(data.idPrograma.toString().split(' ')[0]);
    await cadastrarVaga(data);
    reset();
    navigate(-1);
  }

  useEffect(() => {
    pegarProgramaAtivo(0, programas?.totalElementos);
    pegarCliente(0, cliente?.totalElementos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "80px", paddingBottom: "50px" }}>
      <Titulo texto="Cadastrar Vaga" />

      <Box component="form" onSubmit={handleSubmit(cadastrar)} sx={{
        display: "flex", flexDirection: { xs: "column", lg: "row" }, justifyContent: "space-between", backgroundColor: "var(--branco)", width: { xs: "95%", md: "90%", lg: "85%" }, borderRadius: "10px", padding: {
          xs: 3, sm: 5
        }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: { xs: 3, xl: 8 }
      }}>
        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: { xs: "start", md: "start" } }}>

          <FormControl sx={{ width: "100%" }}>
            <TextField id="nomeVaga" label="Nome da vaga" placeholder="Digite o nome da vaga" variant="filled" {...register("nome")} />
            {errors.nome && <Typography id="erro-nome-vaga" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.nome.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }} >
            <Autocomplete
              disablePortal
              id="cliente"
              isOptionEqualToValue={(option, value) => option.label === value.label}
              options={cliente ? cliente.elementos.map(item => ({ label: `${item.idCliente} - ${item.nome}` })) : []}
              renderInput={(params) => <TextField {...params} label="Cliente" variant="filled" {...register("idCliente")} />}
            />
            {errors.idCliente && <Typography id="erro-cliente-vaga" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.idCliente.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }} >
            <Autocomplete
              disablePortal
              id="programa"
              isOptionEqualToValue={(option, value) => option.label === value.label}
              options={programas ? programas.elementos.map(item => ({ label: `${item.idPrograma} - ${item.nome}` })) : []}
              renderInput={(params) => <TextField {...params} {...register("idPrograma")} label="Programa" variant="filled" />}
            />
            {errors.idPrograma && <Typography id="erro-programa-vaga" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.idPrograma.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField
              id="vagaTotais" type="number" label="Quantidade de vagas" placeholder="Digite a quantidade de vagas" variant="filled" {...register("quantidade")} />
            {errors.quantidade && <Typography id="erro-quantidade-vaga" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.quantidade.message}</Typography>}
          </FormControl>
        </Stack>

        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: "end" }}>

          <FormControl sx={{ width: "100%" }}>
            <TextField
              id="dataAbertura" label="Data de Abertura" type="date" sx={{ width: "100%" }} InputLabelProps={{ shrink: true }} {...register("dataAbertura")} variant="filled" />
            {errors.dataAbertura && <Typography id="erro-dataAbertura" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.dataAbertura.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField
              id="dataFechamento" label="Data de Fechamento" type="date" sx={{ width: "100%" }} InputLabelProps={{ shrink: true }} {...register("dataFechamento")} variant="filled" />
            {errors.dataFechamento && <Typography id="erro-dataFechamento" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.dataFechamento.message}</Typography>}
          </FormControl>

          <FormControl variant="filled" sx={{ width: { xs: "100%", md: "100%" } }}>
            <InputLabel id="selectAluno">Situação</InputLabel>
            <Select labelId="demo-simple-select-filled-label" defaultValue="" id="select-trilha" {...register("situacao")}>
              <MenuItem value="initial-stack" disabled><em>Selecione uma situação</em></MenuItem>
              <MenuItem id="aberto" value="ABERTO">Aberto</MenuItem>
              <MenuItem id="fechado" value="FECHADO">Fechado</MenuItem>
            </Select>
            {errors.situacao && <Typography id="erro-situacao-vaga" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.situacao.message}</Typography>}
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
