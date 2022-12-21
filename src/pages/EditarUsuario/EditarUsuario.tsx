import { useContext, useState } from 'react';

import { Avatar, Box, Button, FormControl, TextField, Typography } from '@mui/material';

import { BotaoVerde } from '../../components/BotaoVerde/BotaoVerde';
import { Header } from '../../components/Header/Header';
import { Titulo } from '../../components/Titulo/Titulo';

import logo from '../../assets/dbc-logo.webp';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editarNomePerfil } from '../../utils/schemas';
import { IEditarNome } from '../../utils/interface';

import { AuthContext } from '../../context/AuthContext';

export const EditarUsuario = () => {
  const [selectedImage, setSelectedImage] = useState();
  const { editarPerfil } = useContext(AuthContext)

  const infosUsuario = JSON.parse(localStorage.getItem("infoUsuario") || "{}");
  
  const { register, handleSubmit, formState: { errors } } = useForm<IEditarNome>({
    resolver: yupResolver(editarNomePerfil)
  })

  const imageChange = (e: any): void => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const imagemAPI = new FormData();
  if(selectedImage) {
    imagemAPI.append("file", selectedImage)
  }

  const nomeEditado = (data: IEditarNome) => { editarPerfil(data, imagemAPI, infosUsuario.idUsuario) }

  return (
    <>
      <Header/>

      <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center",justifyContent: "center", height:"calc(100vh - 64px)" }}>
        <Titulo texto="Editar perfil"/>

        <Box component="form" onSubmit={handleSubmit(nomeEditado)} sx={{ display: { xs:"flex", md:"flex" },flexDirection:"column",alignItems:"center",justifyContent: "center", backgroundColor: "#fff", width: { xs:"90%", md:"25%" }, borderRadius: "10px", padding: { xs: 5, md: 5 }, boxShadow: "10px 10px 10px #2f407ccf", gap:3 }}>
          <img src={logo} alt="Logo DBC Azul" width={100} />
          <FormControl sx={{ width: { xs:"100%", md:"100%" }}}>
            <TextField id="nomeCompletoUsuario" {...register("nome")} defaultValue={infosUsuario.nome} label="Editar nome" placeholder="Fulano da Silva" variant="filled" focused />
            {errors.nome && <Typography id="erro-nome" sx={{fontWeight:"500", display: "flex", marginTop: "5px"}} color="error">{errors.nome.message}</Typography>}
          </FormControl>

          <Avatar alt="Foto Enviada" id="foto-enviada" src={selectedImage ? URL.createObjectURL(selectedImage) : infosUsuario.foto ? `data:image/jpeg;base64,${infosUsuario.foto}` : "" } sx={{ width: 150, height: 150 }} />
          <Button component="label" variant="contained">
            <input id="imagemUsuario" type="file" hidden accept="image/jpeg" onChange={imageChange} />
            <Typography sx={{ textTransform: "capitalize" }} variant="body1">Inserir Foto</Typography>
          </Button>
          <BotaoVerde texto="Editar" />
        </Box>
      </Box>
    </>
  )
}
