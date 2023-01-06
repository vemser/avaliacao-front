import { useState } from 'react';

import { Avatar, Box, Button, Typography } from '@mui/material';

import { Titulo } from '../../components/Titulo/Titulo';

import logo from '../../assets/dbc-logo.webp';

import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const EditarUsuario = () => {
  const navigate = useNavigate();
  const { editarPerfil, usuarioLogado } = useAuth();
  const [selectedImage, setSelectedImage] = useState<File>();

  const imageChange = (e: any): void => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const imagemAPI = new FormData();
  if (selectedImage) {
    imagemAPI.append("imagem", selectedImage)
  }

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "80px", paddingBottom: "50px" }}>
      <Titulo texto="Configurações do Perfil" />

      <Box sx={{
        display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "var(--branco)", width: { xs: "95%", md: "70%", lg: "60%", xl: "50%" }, borderRadius: "10px", padding: {
          xs: 3, sm: 5
        }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: 3
      }}>
        <img src={logo} alt="Logo DBC Azul" width={150} />

        <Avatar alt="Foto Enviada" id="foto-enviada" src={selectedImage ? URL.createObjectURL(selectedImage) : usuarioLogado.imagem ? `data:image/jpeg;base64,${usuarioLogado.imagem}` : ""} sx={{ width: 150, height: 150 }} />
        <Button component="label" variant="contained">
          <input id="imagemUsuario" type="file" hidden accept="image/jpeg" onChange={imageChange} />
          <Typography sx={{ textTransform: "capitalize" }} variant="body1">Alterar Foto</Typography>
        </Button>

        <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", bottom: 0, paddingTop: "20px", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
          <Button type="button" onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d " }, textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cancelar</Button>

          <Button type="button" onClick={() => editarPerfil(imagemAPI)} variant="contained" color="success" sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Salvar</Button>
        </Box>
      </Box>
    </Box>
  )
}
