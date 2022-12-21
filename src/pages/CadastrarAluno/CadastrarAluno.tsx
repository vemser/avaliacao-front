import { useContext, useState } from "react";

import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Header } from "../../components/Header/Header";
import { BotaoVerde } from "../../components/BotaoVerde/BotaoVerde";
import { Titulo } from "../../components/Titulo/Titulo";

import { Box, FormControl, TextField, Stack, Typography, InputLabel, MenuItem, Select, Avatar, Button } from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import { alunoSchema } from "../../utils/schemas";
import { ICadastroAluno } from "../../utils/interface";

import { AlunoContext } from "../../context/AlunoContext";
import { toast } from "react-toastify";
import { toastConfig } from "../../utils/toast";

export const CadastrarAluno = () => {
  const { criarAluno } = useContext(AlunoContext)

  const [selectedImage, setSelectedImage] = useState();

  const imageChange = (e: any): void => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const { register, handleSubmit, formState: { errors } } = useForm<ICadastroAluno>({
    resolver: yupResolver(alunoSchema)
  });

  const imagemAPI = new FormData();
  if (selectedImage) {
    imagemAPI.append("file", selectedImage)
  }

  const cadastroAluno = (data: ICadastroAluno) => {
    if (data.stack === "initial-stack") {
      toast.error("Preencha todos os campos!", toastConfig)
    } else {
      criarAluno(data, imagemAPI)
    }
  };

  const infosUsuario = JSON.parse(localStorage.getItem("infoUsuario") || "{}");
  if (infosUsuario.cargo !== "Instrutor" && infosUsuario.cargo !== "Gestor de Pessoas") return <Navigate to="/" />

  return (
    <>
      <Header />
      <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "calc(100vh - 64px)" }}>
        <Titulo texto="Cadastrar aluno" />

        <Box component="form" onSubmit={handleSubmit(cadastroAluno)} sx={{ display: { xs: "block", md: "flex" }, justifyContent: "space-between", backgroundColor: "var(--branco)", width: { xs: "90%", md: "50%" }, borderRadius: "10px", padding: { xs: 5, md: 5 }, boxShadow: "10px 10px 10px var(--azul-escuro-dbc)" }}>
          <Stack component="div" spacing={2} sx={{ width: { xs: "100%", md: "50%" }, display: "flex", alignItems: { xs: "start", md: "start" } }}>

            <FormControl sx={{ width: { xs: "100%", md: "100%" } }}>
              <TextField id="nomeCompletoAluno" label="Nome Completo" placeholder="Fulano da Silva" variant="filled" error={!!errors.nome}  {...register("nome")} focused />
              {errors.nome && <Typography id="erro-nomeCompletoAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.nome.message}</Typography>}
            </FormControl>

            <FormControl sx={{ width: { xs: "100%", md: "100%" } }}>
              <TextField id="emailAluno" label="E-mail DBC" placeholder="fulano.silva@dbccompany.com.br" variant="filled" {...register("email")} error={!!errors.email} focused />
              {errors.email && <Typography id="erro-emailAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.email.message}</Typography>}
            </FormControl>

            <FormControl variant="filled" sx={{ width: { xs: "100%", md: "100%" } }}>
              <InputLabel id="selectAluno">Trilha do Aluno</InputLabel>
              <Select labelId="demo-simple-select-filled-label" defaultValue="initial-stack" id="select-trilha" error={!!errors.stack}  {...register("stack")}>
                <MenuItem value="initial-stack" disabled><em>Selecione a Trilha</em></MenuItem>
                <MenuItem id="frontend" value="FRONTEND">Front-End</MenuItem>
                <MenuItem id="backend" value="BACKEND">Back-End</MenuItem>
                <MenuItem id="qa" value="QA">Quality Assurance</MenuItem>
              </Select>
              {errors.stack && <Typography id="erro-selectAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.stack.message}</Typography>}
            </FormControl>
            <Typography id="aviso-imagem" variant="body1" sx={{ fontWeight: "700", display: "inline-block", marginTop: "10px", paddingBottom: 0, marginBottom: 0, color: "#ff9800" }} >*Imagens são opcionais</Typography>
            <Typography id="aviso-extensao" variant="body1" sx={{ fontWeight: "700", display: "inline-block", paddingTop: 0, marginTop: 0, color: "#ff9800" }} >*Só são aceitas imagens com extensão .jpg</Typography>
          </Stack>

          <Stack component="div" spacing={2} sx={{ width: { xs: "100%", md: "50%" }, display: "flex", alignItems: "center", marginTop: { xs: 2, md: 0 } }}>
            {selectedImage && <Avatar alt="Foto Enviada" src={URL.createObjectURL(selectedImage)} sx={{ width: 150, height: 150 }} />}
            {!selectedImage && <Avatar alt="Foto Padrao" sx={{ width: 150, height: 150 }} />}

            <Button component="label" variant="contained">
              <input id="imagemAluno" type="file" hidden accept="image/jpeg" onChange={imageChange} />
              <Typography sx={{ textTransform: "capitalize" }} variant="body1">Inserir Foto</Typography>
            </Button>

            <BotaoVerde texto="Enviar" />
          </Stack>
        </Box>
      </Box>
    </>
  );
};
