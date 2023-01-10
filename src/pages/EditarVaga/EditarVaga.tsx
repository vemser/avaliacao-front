import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack, FormControl, TextField, Autocomplete, InputLabel, Select, MenuItem, Button, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Titulo } from '../../components';
import { useCliente } from '../../context/Alocacao/ClienteContext';
import { useVaga } from '../../context/Alocacao/VagaContext';
import { usePrograma } from '../../context/Tecnico/ProgramaContext';
import { VagaSchema } from '../../utils/schemas';
import { IVaga } from '../../utils/VagaInterface/vaga';
import { useForm } from "react-hook-form";
import { useEffect } from 'react';

export const EditarVaga = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { editarVaga } = useVaga();
  const { pegarPrograma, programas } = usePrograma();
  const { pegarCliente, cliente } = useCliente();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IVaga>(
    {
      resolver: yupResolver(VagaSchema),
      defaultValues: {
        dataAbertura: state.dataAbertura,
        dataCriacao: state.dataCriacao,
        dataFechamento: state.dataFechamento,
        idCliente: state.cliente.idCliente,
        idPrograma: state.programas[0].idPrograma,
        idVaga: state.idVaga,
        nome: state.nome,
        quantidade: state.quantidade,
        situacao: state.situacao
      }
    });

  const editar = async (data: IVaga) => {
    data.idCliente = parseInt(data.idCliente.toString().split(' ')[0]);
    data.idPrograma = parseInt(data.idPrograma.toString().split(' ')[0]);
    await editarVaga(data, state.idVaga);
    reset();
    navigate(-1);
  }

  useEffect(() => {
    pegarPrograma(0, programas?.totalElementos);
    pegarCliente(0, cliente?.totalElementos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "60px", paddingBottom: "50px" }}>
      <Titulo texto="Editar Vaga" />

      <Box component="form" onSubmit={handleSubmit(editar)} sx={{
        display: "flex", flexDirection: { xs: "column", lg: "row" }, justifyContent: "space-between", backgroundColor: "var(--branco)", width: { xs: "95%", md: "90%" }, borderRadius: "10px", padding: {
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
              defaultValue={{ label: `${state.cliente.idCliente} - ${state.cliente.nome}` }}
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
              defaultValue={{ label: `${state.programas[0].idPrograma} - ${state.programas[0].nome}` }}
              renderInput={(params) => <TextField {...params} label="Programa" variant="filled" {...register("idPrograma")} />}
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
            <Select labelId="demo-simple-select-filled-label" defaultValue={state.situacao} id="select-trilha" {...register("situacao")}>
              <MenuItem value="initial-stack" disabled><em>Selecione uma situação</em></MenuItem>
              <MenuItem id="aberto" value="ABERTO">Aberto</MenuItem>
              <MenuItem id="fechado" value="FECHADO">Fechado</MenuItem>
            </Select>
            {errors.situacao && <Typography id="erro-situacao-vaga" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.situacao.message}</Typography>}
          </FormControl>

          <Box sx={{ display: "flex", width: "100%", justifyContent: { xs: "center", lg: "end" }, alignItems: { xs: "center", lg: "end" }, bottom: 0, paddingTop: "20px", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
            <Button type="button" onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d " }, textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cancelar</Button>

            <Button type="submit" variant="contained" color="success" sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Salvar</Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
