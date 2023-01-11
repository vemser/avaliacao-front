import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Stack, FormControl, TextField, Button, Typography } from '@mui/material';

import { Titulo } from '../../components';
import { ICadastrarCliente } from '../../utils/ClienteInterface/Cliente';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import logo from "../../assets/dbc-logo.webp";
import { ClienteSchema } from '../../utils/schemas';
import InputMask from 'react-input-mask';
import { useCliente } from '../../context/Alocacao/ClienteContext';




export const EditarCliente = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { editarCliente } = useCliente()

  const { register, handleSubmit, formState: { errors } } = useForm<ICadastrarCliente>({
    resolver: yupResolver(ClienteSchema), defaultValues: {
      nome: state.nome,
      email: state.email
    }
  });

  const editaCliente = (data: ICadastrarCliente) => {
    editarCliente(data, state.idCliente)
  }

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "60px", paddingBottom: "50px" }}>
      <Titulo texto={`Editar ${state.nome}`} />

      <Box component="form" onSubmit={handleSubmit(editaCliente)} sx={{
        display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "var(--branco)", width: { xs: "95%", md: "70%", lg: "60%", xl: "50%" }, borderRadius: "10px", padding: {
          xs: 3, sm: 5
        }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: 3
      }}>
        <img src={logo} alt="Logo DBC" width={150} />

        <Stack component="div" spacing={3} sx={{ width: "100%", display: "flex", alignItems: { xs: "start", md: "start" } }}>

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }}>
            <TextField id="nomeCliente" label="Nome" {...register("nome")} placeholder="Digite um nome para o cliente" variant="filled" />
            {errors.nome && <Typography id="erro-nomeCliente" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.nome.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }}>
            <TextField id="emailCliente" label="E-mail" {...register("email")} placeholder="Digite o e-mail do cliente" variant="filled" />
            {errors.email && <Typography id="erro-nomeCliente" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.email.message}</Typography>}
          </FormControl>

          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "5px" }}>
            <InputMask defaultValue={state.telefone} style={{ padding: "18px 13px", borderRadius: "4px 4px 0 0", backgroundColor: '#f0f0f0', border: "none", outline: "none", borderBottom: "1px solid gray", fontFamily: "Inter", fontSize: "1rem", color: "rgba(0, 0, 0, 0.87)" }} mask="(99)99999-9999" type="text" id="telefone" placeholder='Telefone' {...register("telefone")} />
            {errors.telefone && <Typography id="erro-nomeCliente" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.telefone.message}</Typography>}
          </div>

        </Stack>
        <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", bottom: 0, paddingTop: "20px", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
          <Button type="button" onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d " }, textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cancelar</Button>

          <Button type="submit" variant="contained" color="success" sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Salvar</Button>
        </Box>

      </Box>
    </Box>
  );
}
