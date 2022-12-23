import { useNavigate } from 'react-router-dom';

import { Box, FormControl, TextField, Button } from '@mui/material';

import { Header } from '../../components/Header/Header';
import { Titulo } from '../../components/Titulo/Titulo';

import logo from '../../assets/dbc-logo.webp';

export const CadastrarPrograma = () => {
  const navigate = useNavigate()

  return (
    <>      
      <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "calc(100vh - 64px)" }}>
        <Titulo texto="Cadastrar programa" />

        <Box component="form" sx={{ display: { xs: "flex", md: "flex" }, flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "var(--branco)", width: { xs: "90%", md: "25%" }, borderRadius: "10px", padding: { xs: 5, md: 5 }, boxShadow: "10px 10px 10px var(--azul-escuro-dbc)", gap: 3 }}>
          <img src={logo} alt="Logo DBC Azul" width={100} />

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }}>
            <TextField id="nome-programa" label="Nome do Programa" placeholder="Ex: Vem Ser 10" variant="filled" focused />
          </FormControl>
          <FormControl sx={{ width: { xs: "100%", md: "100%" } }}>
            <TextField id="descricao-programa" label="Descrição do Programa" multiline rows={4} placeholder="Ex: Este programa é destinado..." variant="filled" focused />
          </FormControl>

          <Box sx={{ display:"flex", alignItems:"end", gap: 2 }}>
            <Button onClick={() => { navigate(-1) }} variant="contained" sx={{backgroundColor:"#808080 ", ":hover":{backgroundColor:"#5f5d5d "}, textTransform: "capitalize", width:{ xs:"15ch", md:"25ch"}}}>Cancelar</Button>

            <Button variant="contained" color="success" sx={{ textTransform: "capitalize", width:{ xs:"15ch", md:"25ch" }}}>Cadastrar</Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}
