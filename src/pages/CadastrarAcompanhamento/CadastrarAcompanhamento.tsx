import { useContext } from "react";


import { Box, Typography, Stack, FormControl, TextField, Button } from "@mui/material";

import { Header } from "../../components/Header/Header"
import { BotaoAzul } from "../../components/BotaoAzul/BotaoAzul";
import { Titulo } from "../../components/Titulo/Titulo";

import logo from "../../assets/dbc-logo.webp";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CadastrarAcompanhamentoSchema } from "../../utils/schemas";

import { GestorContext } from "../../context/GestorContext";

import { ICadastrarAcompanhamento } from "../../utils/interface";
import { useNavigate } from "react-router-dom";

export const CadastrarAcompanhamento = () => {
  const navigate = useNavigate();
  const { criarAcompanhamento } = useContext(GestorContext);

  const { register, handleSubmit, formState: { errors } } = useForm<ICadastrarAcompanhamento>({
    resolver: yupResolver(CadastrarAcompanhamentoSchema)
  })

  const cadastrarAcompanhamento = (data: ICadastrarAcompanhamento) => { criarAcompanhamento(data) }

  // const infosUsuario = JSON.parse(localStorage.getItem("infoUsuario") || "{}");
  // if (infosUsuario.cargo !== "Gestor de Pessoas") return <Navigate to="/" />

  return (
    <>
      <Header />

      <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 64px)", paddingTop: "80px", paddingBottom: "50px" }}>
        <Titulo texto="Cadastrar acompanhamento" />

        <Box component="form" onSubmit={handleSubmit(cadastrarAcompanhamento)} sx={{
          display: { xs: "flex", md: "flex" }, flexDirection: "column", alignItems: "center", backgroundColor: "var(--branco)", width: { xs: "90%", md: "70%", lg: "40%" }, borderRadius: "10px", padding: {
            xs: 5, md: 5
          }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: 2
        }}>
          <img src={logo} alt="Logo DBC" width={150} />
          <Stack component="div" spacing={2} sx={{ width: { xs: "100%", md: "100%" }, display: "flex", alignItems: { xs: "start", md: "start" } }}>

            <FormControl sx={{ width: { xs: "100%", md: "100%" } }}>
              <TextField id="titulo" error={!!errors.titulo} {...register("titulo")} label="Titulo acompanhamento" placeholder="Digite um titulo" variant="filled" focused />
              {errors.titulo && <Typography id="erro-titulo" sx={{ fontWeight: "500", display: "inline-block", marginTop: "5px" }} color="error">{errors.titulo.message}</Typography>}
            </FormControl>

            <FormControl sx={{ width: { xs: "100%", md: "100%" } }}>
              <TextField id="descricao" error={!!errors.descricao} label="Digite uma descrição" placeholder="Digite uma descrição" multiline rows={4} focused variant="filled" {...register("descricao")} />
              {errors.descricao && <Typography id="erro-descricao" sx={{ fontWeight: "500", display: "inline-block", marginTop: "5px" }} color="error">{errors.descricao.message}</Typography>}
            </FormControl>

            <FormControl sx={{ width: { xs: "100%", md: "100%" } }}>
              <TextField id="dataInicio" error={!!errors.dataInicio} label="Data inicial" type="date" sx={{ width: "100%" }} InputLabelProps={{ shrink: true }} {...register("dataInicio")} />
              {errors.dataInicio && <Typography id="erro-dataInicio" sx={{ fontWeight: "500", display: "inline-block", marginTop: "5px" }} color="error">{errors.dataInicio.message}</Typography>}
            </FormControl>
          </Stack>

          <Box sx={{ display: "flex", alignItems: "end", bottom: 0, paddingTop: "20px", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
            <Button onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d " }, textTransform: "capitalize", fontSize: "1rem", width: { xs: "180px", md: "160px", lg: "180px" } }}>Cancelar</Button>
            <Button variant="contained" color="success" sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "180px", md: "160px", lg: "180px" } }}>Cadastrar</Button>
          </Box>

        </Box>
      </Box>
    </>
  )
}
