import { Box, Stack, FormControl, TextField, Button } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Titulo } from '../../components/Titulo/Titulo';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ClienteSchema } from '../../utils/schemas';
import Typography from '@mui/material/Typography';
import { ICadastrarCliente } from '../../utils/ClienteInterface/Cliente';
import InputMask from 'react-input-mask';

import logo from "../../assets/dbc-logo.webp";
import { useCliente } from '../../context/Alocacao/ClienteContext';


export const CadastrarCliente = () => {

  const {cadastrarCliente} = useCliente()

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<ICadastrarCliente>({
    resolver: yupResolver(ClienteSchema)
  });

  const cadastroCliente = (data: ICadastrarCliente) => {
    cadastrarCliente(data)
  }

  return (
    <Box component="section"sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 64px)", paddingTop: "80px", paddingBottom: "50px" }}>
      <Titulo texto="Cadastrar Cliente" />

      <Box component="form" onSubmit={handleSubmit(cadastroCliente)} sx={{
                display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "var(--branco)", width: { xs: "95%", md: "70%", lg: "60%", xl: "50%" }, borderRadius: "10px", padding: {
                    xs: 3, sm: 5
                }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: 3
            }}>
        <img src={logo} alt="Logo DBC" width={150} />

        <Stack component="div" spacing={3} sx={{ width: "100%", display: "flex", alignItems: { xs: "start", md: "start" } }}>

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }}>
            <TextField id="nomeCliente" label="Nome Cliente" {...register("nome")} placeholder="Digite o nome do cleinte" variant="filled"  />
            {errors.nome && <Typography id="erro-nomeCliente" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.nome.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }}>
            <TextField id="emailCliente" label="Email Cliente" {...register("email")} placeholder="Digite o email do cliente" variant="filled"  />
            {errors.email && <Typography id="erro-nomeCliente" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.email.message}</Typography>}
          </FormControl>

          <div style={{width:"100%",display:"flex",flexDirection:"column",gap:"5px"}}>
            <label htmlFor="telefone">Digite seu telefone:</label>
            <InputMask
               style={{padding:"10px",border:"none",borderBottom:"1px solid gray",outline:"none"}}
                mask="(99)99999-9999"
                type="text"
                id="telefone"
                {...register("telefone")}
              />
              {errors.telefone && <Typography id="erro-nomeCliente" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.telefone.message}</Typography>}
          </div>

        </Stack>
        <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", bottom: 0, paddingTop: "20px", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
          <Button type="button" onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d " }, textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cancelar</Button>

          <Button type="submit" variant="contained" color="success" sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cadastrar</Button>
       </Box>

      </Box>
    </Box>
  );
};
