import { useState } from 'react';

import { Avatar, Box, Button, Typography } from '@mui/material';

import { Titulo } from '../../components/Titulo/Titulo';

import logo from '../../assets/dbc-logo.webp';

import { useAuth } from '../../context/AuthContext';

export const EditarUsuario = () => {
  const { editarPerfil, usuarioLogado } = useAuth()

  const [selectedImage, setSelectedImage] = useState<File>();

  const imageChange = (e: any): void => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const imagemAPI = new FormData();
  if(selectedImage) {
    imagemAPI.append("imagem", selectedImage)
  }

  return (
    <>
      <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "calc(100vh - 64px)" }}>
        <Titulo texto="Editar Foto" />

        <Box sx={{ display: { xs: "flex", md: "flex" }, flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "var(--branco)", width: { xs: "90%", md: "25%" }, borderRadius: "10px", padding: { xs: 5, md: 5 }, boxShadow: "10px 10px 10px var(--azul-escuro-dbc)", gap: 3 }}>

          <img src={logo} alt="Logo DBC Azul" width={100} />

          <Avatar alt="Foto Enviada" id="foto-enviada" src={selectedImage ? URL.createObjectURL(selectedImage) : usuarioLogado.imagem ? `data:image/jpeg;base64,${usuarioLogado.imagem}` : ""} sx={{ width: 150, height: 150 }} />
          <Button component="label" variant="contained">
            <input id="imagemUsuario" type="file" hidden accept="image/jpeg" onChange={imageChange} />
            <Typography sx={{ textTransform: "capitalize" }} variant="body1">Inserir Foto</Typography>
          </Button>

          <Box sx={{ display:"flex", alignItems:"end", gap: 2 }}>
            <Button type="button" variant="contained" sx={{backgroundColor:"#808080 ", ":hover":{backgroundColor:"#5f5d5d "}, textTransform: "capitalize", width:{ xs:"15ch", md:"25ch"}}}>Cancelar</Button>

            <Button onClick={() => editarPerfil(imagemAPI)} variant="contained" color="success" sx={{ textTransform: "capitalize", width:{ xs:"15ch", md:"25ch" }}}>Salvar</Button>
          </Box>

        </Box>
      </Box>
    </>
  )
}
