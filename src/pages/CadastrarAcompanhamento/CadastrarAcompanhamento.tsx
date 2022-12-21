import { useContext } from "react";

import { Navigate } from "react-router-dom";

import { Box, Typography, Stack, FormControl, TextField } from "@mui/material";

import { Header } from "../../components/Header/Header"
import { BotaoAzul } from "../../components/BotaoAzul/BotaoAzul";
import { Titulo } from "../../components/Titulo/Titulo";

import logo from "../../assets/dbc-logo.webp";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CadastrarAcompanhamentoSchema } from "../../utils/schemas";

import { GestorContext } from "../../context/GestorContext";


interface ICadastrarAcompanhamento{
  idAcompanhamento: number,
  titulo: string,
  descricao: string,
  dataInicio: string
}

export const CadastrarAcompanhamento = () => {
  const { criarAcompanhamento } = useContext(GestorContext)

  const {register, handleSubmit, formState:{errors}}= useForm<ICadastrarAcompanhamento>({
    resolver: yupResolver(CadastrarAcompanhamentoSchema)
  })

  const cadastrarAcompanhamento = (data:ICadastrarAcompanhamento) => { criarAcompanhamento(data) }

  const infosUsuario = JSON.parse(localStorage.getItem("infoUsuario") || "{}");
  if(infosUsuario.cargo !== "Gestor de Pessoas") return <Navigate to="/"/>

  return (
    <>
      <Header/>

      <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center",justifyContent: "center", height:"calc(100vh - 64px)" }}>
        <Titulo texto="Cadastrar acompanhamento"/>

        <Box component="form" onSubmit={handleSubmit(cadastrarAcompanhamento)} sx={{ display: { xs:"flex", md:"flex" },flexDirection:"column",alignItems:"center",backgroundColor: "#fff", width: { xs:"90%", md:"30%" }, borderRadius: "10px", padding: { xs: 5, md: 5
        }, boxShadow: "10px 10px 10px #2f407ccf",gap:2 }}>
          <img  src={logo} alt="Logo DBC" width={150} />
          <Stack component="div" spacing={2} sx={{ width:{ xs:"100%", md:"100%" }, display: "flex", alignItems:{ xs:"start", md:"start" }}}>

            <FormControl sx={{ width: { xs:"100%", md:"100%" }}}>
              <TextField id="titulo" error={!!errors.titulo} {...register("titulo")}label="Titulo acompanhamento" placeholder="Digite um titulo" variant="filled" focused />
              {errors.titulo && <Typography id="erro-titulo" sx={{fontWeight:"500", display: "inline-block", marginTop: "5px"}} color="error">{errors.titulo.message}</Typography>}
            </FormControl>

            <FormControl sx={{ width: { xs:"100%", md:"100%" }}}>
              <TextField id="descricao" error={!!errors.descricao} label="Digite uma descrição" placeholder="Digite uma descrição" multiline variant="filled" {...register("descricao")} />
              {errors.descricao && <Typography id="erro-descricao" sx={{fontWeight:"500", display: "inline-block", marginTop: "5px"}} color="error">{errors.descricao.message}</Typography>}
            </FormControl>

            <FormControl sx={{ width: { xs:"100%", md:"100%" }}}>
              <TextField id="dataInicio" error={!!errors.dataInicio} label="Data inicial" type="date" sx={{ width: "100%" }} InputLabelProps={{ shrink: true }} {...register("dataInicio")} />
              {errors.dataInicio && <Typography id="erro-dataInicio" sx={{fontWeight:"500", display: "inline-block", marginTop: "5px"}} color="error">{errors.dataInicio.message}</Typography>}
            </FormControl>
          </Stack>

          <BotaoAzul texto="Enviar"/>
        </Box>
      </Box>
    </>
  )
}
