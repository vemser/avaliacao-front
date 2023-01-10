import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/dbc-logo.webp';

import { Box, FormControl, TextField, Button, Typography, MenuItem, Select, InputLabel } from '@mui/material';
import { Titulo } from '../../components/Titulo/Titulo';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IProgramas } from "../../utils/programaInterface";
import { ProgramaSchema } from "../../utils/schemas";
import { usePrograma } from "../../context/Tecnico/ProgramaContext";

export const EditarPrograma: React.FC = () => {
  const navigate = useNavigate();
  const { editarPrograma } = usePrograma();
  const { state } = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm<IProgramas>({
    resolver: yupResolver(ProgramaSchema), defaultValues: {
      nome: state.nome,
      descricao: state.descricao,
      situacaoVagaPrograma: state.situacaoVagaPrograma,
      dataFim: state.dataFim,
      dataInicio: state.dataInicio
    }
  });

  const editar = async (data: IProgramas) => {
    await editarPrograma(data, state.idPrograma);
    navigate(-1);
  }

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "80px", paddingBottom: "50px" }}>
      <Titulo texto="Editar Programa" />

      <Box component="form" onSubmit={handleSubmit(editar)} sx={{
        display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "var(--branco)", width: { xs: "95%", md: "70%", lg: "60%", xl: "50%" }, borderRadius: "10px", padding: {
          xs: 3, sm: 5
        }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: 3
      }}>
        <img src={logo} alt="Logo DBC Azul" width={150} />

        <FormControl sx={{ width: "100%" }}>
          <TextField id="editar-nome-programa" label="Nome do Programa" defaultValue={state.nome} variant="filled"  {...register("nome")} />
          {errors.nome && <Typography id="erro-nome-programa" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.nome.message}</Typography>}
        </FormControl>

        <FormControl sx={{ width: "100%" }}>
          <TextField id="editar-descricao-programa" label="Descrição do Programa" multiline rows={4} placeholder="Ex: Este programa é destinado..." variant="filled" {...register("descricao")} />
        </FormControl>

        <FormControl sx={{ width: "100%" }} variant="filled">
          <InputLabel>Situação</InputLabel>
          <Select labelId="demo-simple-select-filled-label" defaultValue={state.situacao} id="situacao-programa" {...register("situacaoVagaPrograma")}  >
            <MenuItem value="ABERTO" >Aberto</MenuItem>
            <MenuItem value="FECHADO">Fechado</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
          <FormControl sx={{ width: "45%" }}>
            <TextField id="dataInicioPrograma" label="Data inicial" type="date" sx={{ width: "100%" }} InputLabelProps={{ shrink: true }}  {...register("dataInicio")} variant="filled" />
            {errors.dataInicio && <Typography id="erro-dataInicioPrograma" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.dataInicio.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "45%" }}>
            <TextField id="dataFimPrograma" label="Data final" type="date" sx={{ width: "100%" }} InputLabelProps={{ shrink: true }}  {...register("dataFim")} variant="filled" />
            {errors.dataFim && <Typography id="erro-dataFimPrograma" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.dataFim.message}</Typography>}
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", bottom: 0, paddingTop: "20px", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
          <Button type="button" onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d " }, textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cancelar</Button>

          <Button type="submit" variant="contained" color="success" sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Salvar</Button>
        </Box>
      </Box>
    </Box>
  )
}
