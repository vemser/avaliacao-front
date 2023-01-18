import React from "react";
import { useNavigate } from 'react-router-dom';

import { Box, FormControl, TextField, Button, Typography, Select, MenuItem, InputLabel, Stack } from '@mui/material';

import { Titulo } from '../../components/Titulo/Titulo';

import logo from '../../assets/dbc-logo.webp';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IProgramas } from "../../utils/programaInterface";
import { ProgramaSchema } from "../../utils/schemas";
import { usePrograma } from "../../context/Tecnico/ProgramaContext";

export const CadastrarPrograma: React.FC = () => {
  const navigate = useNavigate()
  const { cadastrarPrograma } = usePrograma()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IProgramas>({
    resolver: yupResolver(ProgramaSchema)
  });

  const cadastrar = async (data: IProgramas) => {
    await cadastrarPrograma(data)
    reset();
  }

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "60px", paddingBottom: "50px" }}>
      <Titulo texto="Cadastrar Programa" />

      <Box component="form" onSubmit={handleSubmit(cadastrar)} sx={{
        display: "flex", flexDirection: { xs: "column", lg: "row" }, justifyContent: "space-between", backgroundColor: "var(--branco)", width: { xs: "95%", md: "90%" }, borderRadius: "10px", padding: { xs: 3, sm: 5 }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: { xs: 3, xl: 8 }
      }}>

        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: { xs: "start", md: "start" } }}>
          <FormControl sx={{ width: "100%" }}>
            <TextField id="nome-programa" label="Nome" placeholder="Digite um nome para o programa" variant="filled" {...register("nome")} />
            {errors.nome && <Typography id="erro-nome-programa" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.nome.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField id="descricao-programa" label="Descrição" multiline rows={4} placeholder="Digite uma descrição para o programa" variant="filled" {...register("descricao")} />
          </FormControl>

          <FormControl sx={{ width: "100%" }} variant="filled">
            <InputLabel>Situação</InputLabel>
            <Select label="Situação" defaultValue="" id="situacao-programa" {...register("situacaoVagaPrograma")}>
              <MenuItem value="ABERTO" >Aberto</MenuItem>
              <MenuItem value="FECHADO">Fechado</MenuItem>
            </Select>
            {errors.situacaoVagaPrograma && <Typography id="erro-situacao" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.situacaoVagaPrograma.message}</Typography>}
          </FormControl>
        </Stack>

        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: { xs: "start", md: "start" } }}>
          <FormControl sx={{ width: "100%" }}>
            <TextField id="dataInicioPrograma" label="Data inicial" type="date" sx={{ width: "100%" }} InputLabelProps={{ shrink: true }}  {...register("dataInicio")} variant="filled" />
            {errors.dataInicio && <Typography id="erro-dataInicioPrograma" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.dataInicio.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField id="dataFimPrograma" label="Data final" type="date" sx={{ width: "100%" }} InputLabelProps={{ shrink: true }}  {...register("dataFim")} variant="filled" />
            {errors.dataFim && <Typography id="erro-dataFimPrograma" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.dataFim.message}</Typography>}
          </FormControl>

          <Box sx={{ display: "flex", width: "100%", justifyContent: { xs: "center", lg: "end" }, alignItems: { xs: "center", lg: "end" }, bottom: 0, paddingTop: "20px", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
            <Button type="button" onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d " }, textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cancelar</Button>

            <Button variant="contained" type="submit" color="success" sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cadastrar</Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}
