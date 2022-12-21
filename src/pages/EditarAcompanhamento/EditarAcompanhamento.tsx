import { useContext } from "react"

import { Navigate, useLocation } from "react-router-dom";

import { Box, Typography, Stack, FormControl, TextField } from "@mui/material"

import { Header } from "../../components/Header/Header"
import { BotaoAzul } from "../../components/BotaoAzul/BotaoAzul";
import { Titulo } from "../../components/Titulo/Titulo";

import logo from "../../assets/dbc-logo.webp";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditarAcompanhamentoSchema } from "../../utils/schemas";

import { IEditarAcompanhamento } from "../../utils/interface";

import { GestorContext } from "../../context/GestorContext";

export const EditarAcompanhamento = () => {
  const { state } = useLocation();
  const { editAcompanhamento } = useContext(GestorContext)

  const {register, handleSubmit, formState:{errors}}= useForm<IEditarAcompanhamento>({
    resolver: yupResolver(EditarAcompanhamentoSchema)
  })

  const handleEdit = (data: IEditarAcompanhamento) => { editAcompanhamento(data, state.idAcompanhamento) }

  const infosUsuario = JSON.parse(localStorage.getItem("infoUsuario") || "{}");
  if(infosUsuario.cargo !== "Gestor de Pessoas") return <Navigate to="/"/>

  return (
    <>
      <Header />
      <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center",justifyContent: "center", height:"calc(100vh - 64px)" }}>
        <Titulo texto="Editar Acompanhamento"/>

        <Box component="form" onSubmit={handleSubmit(handleEdit)} sx={{ display: { xs:"flex", md:"flex"
        },flexDirection:"column",alignItems:"center",backgroundColor: "#fff", width: { xs:"90%", md:"30%" }, borderRadius: "10px", padding: { xs: 5, md: 5 }, boxShadow: "10px 10px 10px #2f407ccf",gap:2 }}>
          <img  src={logo} alt="Logo DBC" width={150} />

          <Stack component="div" spacing={2} sx={{ width: { xs:"100%", md:"100%" }, display: "flex", alignItems:{ xs:"start", md:"start" }}}>

            <FormControl sx={{ width: { xs:"100%", md:"100%" }}}>
              <TextField id="titulo" error={!!errors.titulo} {...register("titulo")} label="Titulo acompanhamento" placeholder="Digite um titulo" variant="filled" focused defaultValue={state.titulo} />
              {errors.titulo && <Typography id="erro-titulo" sx={{fontWeight:"500", display: "inline-block", marginTop: "5px"}} color="error">{errors.titulo.message}</Typography>}
            </FormControl>

            <FormControl sx={{ width: { xs:"100%", md:"100%" }}}>
              <TextField id="descricao" error={!!errors.descricao} label="Digite uma descrição" placeholder="Digite uma descrição" focused variant="filled" {...register("descricao")} defaultValue={state.descricao}/>
              {errors.descricao && <Typography id="erro-descricao" sx={{fontWeight:"500", display: "inline-block", marginTop: "5px"}} color="error">{errors.descricao.message}</Typography>}
            </FormControl>

          </Stack>
          <BotaoAzul texto="Editar"/>
        </Box>
      </Box>
    </>
  )
}