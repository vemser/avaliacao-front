import { useContext, useState } from 'react'

import { Navigate, useLocation } from 'react-router-dom';

import { Header } from '../../components/Header/Header'
import { BotaoVerde } from '../../components/BotaoVerde/BotaoVerde';
import { Titulo } from '../../components/Titulo/Titulo';

import { Box, Stack, FormControl, TextField, Typography, InputLabel, Select, MenuItem, Avatar, Button } from '@mui/material';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {editarAlunoSchema } from '../../utils/schemas';

import { AlunoContext } from '../../context/AlunoContext';

interface IEditarAluno{
  idAluno: number,
  stack: string,
  nome: string,
  email: string
}

export const EditarAluno = () => {
  const {state} = useLocation()

  const { editarAluno } = useContext(AlunoContext)

  const [selectedImage, setSelectedImage] = useState();

  const imageChange = (e: any): void => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const {register, handleSubmit, formState: { errors }} = useForm<IEditarAluno>({
    resolver: yupResolver(editarAlunoSchema)
  });

  const imagemAPI = new FormData()
  if(selectedImage) {
    imagemAPI.append("file", selectedImage)
  }

  const editarAlunos = (data: IEditarAluno) => { editarAluno(data, state.idAluno, imagemAPI) };

  const infosUsuario = JSON.parse(localStorage.getItem("infoUsuario") || "{}");
  if(infosUsuario.cargo !== "Gestor de Pessoas" && infosUsuario.cargo !== "Instrutor") return <Navigate to="/"/>

  return (
    <>
      <Header/>

      <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center",justifyContent: "center", height:"calc(100vh - 64px)" }}>
        <Titulo texto="Editar aluno"/>

        <Box component="form" onSubmit={handleSubmit(editarAlunos)} sx={{ display: { xs:"block", md:"flex" }, justifyContent: "space-between", backgroundColor: "#fff", width: { xs:"90%", md:"50%" }, borderRadius: "10px", padding: { xs: 5, md: 5 }, boxShadow: "10px 10px 10px #2f407ccf" }}>
          <Stack component="div" spacing={2} sx={{ width:{ xs:"100%", md:"50%" }, display: "flex", alignItems:{ xs:"start", md:"start" }}}>

            <FormControl sx={{ width: { xs:"100%", md:"100%" }}}>
              <TextField id="nomeCompletoAluno" defaultValue={state.nome} label="Nome Completo" placeholder="Fulano da Silva" variant="filled" error={!!errors.nome}  {...register("nome")} focused />
              {errors.nome && <Typography id="erro-nomeCompletoAluno" sx={{fontWeight:"500", display: "flex", marginTop: "5px"}} color="error">{errors.nome.message}</Typography>}
            </FormControl>

            <FormControl sx={{ width: { xs:"100%", md:"100%" }}}>
              <TextField id="emailAluno" label="E-mail DBC" placeholder="fulano.silva@dbccompany.com.br" variant="filled" defaultValue={state.email} {...register("email")} error={!!errors.email} focused />
              {errors.email && <Typography id="erro-emailAluno" sx={{fontWeight:"500", display: "flex", marginTop: "5px"}} color="error">{errors.email.message}</Typography>}
            </FormControl>

            <FormControl variant="filled" sx={{ width: { xs:"100%", md:"100%" }}}>
              <InputLabel id="selectAluno">Trilha do Aluno</InputLabel>
              <Select labelId="demo-simple-select-filled-label" defaultValue={state.stack} id="select-trilha" {...register("stack")}>
                <MenuItem id='frontend' value="FRONTEND">Front-end</MenuItem>
                <MenuItem id='backend' value="BACKEND">Back-end</MenuItem>
                <MenuItem id='qa' value="QA">QA</MenuItem>
              </Select>
            </FormControl>

            <Typography id="aviso-imagem" variant="body1" sx={{fontWeight:"700", display: "inline-block", marginTop: "10px", paddingBottom: 0, marginBottom: 0, color: "#ff9800"}} >*Imagens são opcionais</Typography>
            <Typography id="aviso-extensao" variant="body1" sx={{fontWeight:"700", display: "inline-block", paddingTop: 0, marginTop: 0, color: "#ff9800"}}>*Só são aceitas imagens com extensão .jpg</Typography>
          </Stack>

          <Stack component="div" spacing={2} sx={{ width: { xs:"100%", md:"50%" }, display: "flex", alignItems: "center",marginTop:{ xs:2, md:0 }}}>
            <Avatar alt="Foto Enviada" id="foto-enviada" src={selectedImage ? URL.createObjectURL(selectedImage) : state.foto ? `data:image/jpeg;base64,${state.foto}` : ""} sx={{ width: 150, height: 150 }} />

            <Button component="label" variant="contained">
              <input id="imagemAluno" type="file" hidden accept="image/jpeg" onChange={imageChange} />
              <Typography sx={{ textTransform: "capitalize" }} variant="body1">Inserir Foto</Typography>
            </Button>

            <BotaoVerde texto="Editar"/>
          </Stack>
        </Box>
      </Box>
    </>
  )
}
