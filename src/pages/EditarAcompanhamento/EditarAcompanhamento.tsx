import { useContext } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { Box, Typography, Stack, FormControl, TextField, Button } from "@mui/material";

import { Titulo } from "../../components/Titulo/Titulo";

import logo from "../../assets/dbc-logo.webp";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditarAcompanhamentoSchema } from "../../utils/schemas";

import { IEditarAcompanhamento } from "../../utils/interface";

import { GestorContext } from "../../context/GestorContext";

export const EditarAcompanhamento = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { editarAcompanhamento } = useContext(GestorContext)

  const { register, handleSubmit, formState: { errors } } = useForm<IEditarAcompanhamento>({
    resolver: yupResolver(EditarAcompanhamentoSchema)
  })

  const handleEdit = (data: IEditarAcompanhamento) => { editarAcompanhamento(data, state.idAcompanhamento) }

  // const infosUsuario = JSON.parse(localStorage.getItem("infoUsuario") || "{}");
  // if (infosUsuario.cargo !== "Gestor de Pessoas") return <Navigate to="/" />

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 64px)", paddingTop: "80px", paddingBottom: "50px" }}>
      <Titulo texto="Editar Acompanhamento" />

      <Box component="form" onSubmit={handleSubmit(handleEdit)} sx={{
        display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "var(--branco)", width: { xs: "95%", md: "70%", lg: "60%", xl: "50%" }, borderRadius: "10px", padding: {
          xs: 3, sm: 5
        }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: 3
      }}>
        <img src={logo} alt="Logo DBC" width={150} />

        <Stack component="div" spacing={3} sx={{ width: "100%", display: "flex", alignItems: { xs: "start", md: "start" } }}>

          <FormControl sx={{ width: "100%" }}>
            <TextField id="titulo" error={!!errors.titulo} {...register("titulo")} label="Titulo acompanhamento" placeholder="Digite um titulo" variant="filled" defaultValue={state.titulo} />
            {errors.titulo && <Typography id="erro-titulo" sx={{ fontWeight: "500", display: "inline-block", marginTop: "5px" }} color="error">{errors.titulo.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField id="descricao" error={!!errors.descricao} label="Digite uma descrição" placeholder="Digite uma descrição" multiline rows={4} variant="filled" {...register("descricao")} defaultValue={state.descricao} />
            {errors.descricao && <Typography id="erro-descricao" sx={{ fontWeight: "500", display: "inline-block", marginTop: "5px" }} color="error">{errors.descricao.message}</Typography>}
          </FormControl>

        </Stack>
        <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", bottom: 0, paddingTop: "20px", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
          <Button onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d " }, textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cancelar</Button>

          <Button variant="contained" color="success" sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Salvar</Button>
        </Box>
      </Box>
    </Box>
  )
}