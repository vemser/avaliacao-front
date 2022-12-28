import { useNavigate } from 'react-router-dom';

import { Box, FormControl, TextField, Button } from '@mui/material';

import { Header } from '../../components/Header/Header';
import { Titulo } from '../../components/Titulo/Titulo';

import logo from '../../assets/dbc-logo.webp';

export const CadastrarPrograma = () => {
  const navigate = useNavigate()

  return (
    <>
      <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 64px)", paddingTop: "80px", paddingBottom: "50px" }}>
        <Titulo texto="Cadastrar Programa" />

        <Box component="form" sx={{
          display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "var(--branco)", width: { xs: "95%", md: "70%", lg: "60%", xl: "50%" }, borderRadius: "10px", padding: {
            xs: 3, sm: 5
          }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: 3
        }}>
          <img src={logo} alt="Logo DBC Azul" width={150} />

          <FormControl sx={{ width: "100%" }}>
            <TextField id="nome-programa" label="Nome do Programa" placeholder="Ex: Vem Ser 10" variant="filled" />
          </FormControl>
          <FormControl sx={{ width: "100%" }}>
            <TextField id="descricao-programa" label="Descrição do Programa" multiline rows={4} placeholder="Ex: Este programa é destinado..." variant="filled" />
          </FormControl>

          <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", bottom: 0, paddingTop: "20px", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
            <Button onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d " }, textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cancelar</Button>

            <Button variant="contained" color="success" sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cadastrar</Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}
