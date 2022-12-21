import { useContext } from "react";

import { Box, FormControl, Stack, TextField, Typography } from "@mui/material";

import { Header } from "../../components/Header/Header";
import { BotaoAzul } from "../../components/BotaoAzul/BotaoAzul";
import { Titulo } from "../../components/Titulo/Titulo";

import logo from "../../assets/dbc-logo.webp";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { AlterarSenhaSchema } from "../../utils/schemas";

import { AuthContext } from "../../context/AuthContext";

interface IAlterarSenha{
  senhaAntiga: string,
  novaSenha: string,
  confirmarNovaSenha: string
}

export const AlterarSenha = () => {
  const { trocarSenhaLogado } = useContext(AuthContext);

  const {register,handleSubmit, formState:{errors}} = useForm<IAlterarSenha>({
    resolver: yupResolver(AlterarSenhaSchema)
  })

  const alterarSenha = (data: IAlterarSenha ) => {
    const inputSenhas = { senhaAntiga: data.senhaAntiga, senhaNova: data.confirmarNovaSenha };
    trocarSenhaLogado(inputSenhas);
  }

  return (
    <>
      <Header />

      <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center",justifyContent: "center", height:"calc(100vh - 64px)" }}>
        <Titulo texto="Alterar senha"/>

        <Box component="form" onSubmit={handleSubmit(alterarSenha)} sx={{ display: { xs:"flex", md:"flex" },flexDirection:"column",alignItems:"center",backgroundColor: "#fff", width: { xs:"90%", md:"25%" }, borderRadius: "10px", padding: { xs: 5, md: 5 }, boxShadow: "10px 10px 10px #2f407ccf",gap:2 }}>
          <img  src={logo} alt="Logo DBC" width={150} />
          <Stack component="div" spacing={2} sx={{ width:{ xs:"100%", md:"100%" }, display: "flex", alignItems:{ xs:"start", md:"start"} }}>

            <FormControl sx={{ width: { xs:"100%", md:"100%" } }}>
              <TextField type="password" error={!!errors.senhaAntiga} id="senhaAntiga" {...register("senhaAntiga")} label="Senha antiga" placeholder="Digite sua senha antiga" variant="filled" focused />
              {errors.senhaAntiga && <Typography id="erro-senhaAntiga" sx={{fontWeight:"500", display: "inline-block", marginTop: "5px"}} color="error">{errors.senhaAntiga.message}</Typography>}
            </FormControl>

            <FormControl sx={{ width: { xs:"100%", md:"100%" } }}>
              <TextField type="password" error={!!errors.novaSenha} id="novaSenha" {...register("novaSenha")} label="Senha nova" placeholder="Digite sua senha nova" variant="filled" focused />
              {errors.novaSenha && <Typography id="erro-novaSenha" sx={{fontWeight:"500", display: "inline-block", marginTop: "5px"}} color="error">{errors.novaSenha.message}</Typography>}
            </FormControl>

            <FormControl sx={{ width:  { xs:"100%", md:"100%" }}}>
              <TextField type="password" id="confirmarNovaSenha"  error={!!errors.confirmarNovaSenha} {...register("confirmarNovaSenha")} label="Confirme senha nova" placeholder="Confirme sua senha nova" variant="filled" focused />
              {errors.confirmarNovaSenha && <Typography id="erro-confirmaSenha" sx={{fontWeight:"500", display: "inline-block", marginTop: "5px"}} color="error">{errors.confirmarNovaSenha.message}</Typography>}
            </FormControl>
          </Stack>

          <BotaoAzul texto="Enviar"/>
        </Box>
      </Box>
    </>
  );
};
