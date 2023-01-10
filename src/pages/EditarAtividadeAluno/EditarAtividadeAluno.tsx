import { Stack, Box, Typography, TextField, Divider, Button } from '@mui/material';

import { AutoStories } from '@mui/icons-material';

import * as Componentes from '../../components/index';

import { useAuth } from '../../context/AuthContext';

export const EditarAtividadeAluno = () => {
  const { usuarioLogado } = useAuth();

  const nome = usuarioLogado.login.split('.');

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "60px", paddingBottom: "50px" }}>
      <Componentes.Titulo texto="Entregar Atividade" />

      <Box component="form" sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, justifyContent: "space-between", backgroundColor: "var(--branco)", width: { xs: "95%", md: "90%" }, borderRadius: "10px", padding: { xs: 3, sm: 5 }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: { xs: 3, xl: 8 } }}>

        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "70%" }, display: "flex", alignItems: { xs: "start", md: "start" } }}>
          <Typography sx={{ color: "var(--azul-claro-dbc)", fontWeight: '700', display: 'flex', alignItems: 'center', gap: 1, fontSize: "1.2rem", userSelect: "none" }}><AutoStories sx={{ fontSize: "25px" }} /> Atividade 01 - React Context</Typography>

          <Typography><strong>Instrutor: </strong> <span style={{ textTransform: 'capitalize' }}>{nome[0]} {nome[1]}</span></Typography>

          <Typography sx={{ display: 'flex', flexWrap: { xs: 'wrap' }, gap: { xs: 2 }, justifyContent: 'space-between', width: '100%' }}><span><strong>Nota:</strong> 0/10</span> <span><strong>Data de entrega:</strong> 06/01 de 2023 - 14:00</span></Typography>

          <Divider sx={{ width: "100%" }} />

          <Typography><strong>Descrição da atividade:</strong></Typography>
          <Typography>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Typography>
        </Stack>

        <Stack component="div" spacing={2} sx={{ width: { xs: "100%", lg: "30%" }, height: { xs: "100%", lg: "30%" }, display: "flex", alignItems: "end", boxShadow: "0px 0px 5px var(--azul-escuro-dbc)", borderRadius: '5px', padding: '5px 10px' }}>
          <Typography sx={{ display: 'flex', alignItems: 'center', flexWrap: { xs: 'wrap' }, gap: { xs: 2 }, justifyContent: 'space-between', width: '100%' }}><span style={{ fontSize: '20px', fontWeight: '700' }}>Envios</span> <span style={{ fontSize: '16px', color: '#ff9800' }}>Pendente</span></Typography>
          <Box sx={{ width: '100%', paddingBottom: '10px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
            <TextField sx={{ width: '90%' }} placeholder='Insira o link da atividade' id="filled-basic" label="Link da Atividade" variant="standard" />
            <Button variant="contained" type="submit" color="success" sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "90%" } }}>Enviar</Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}
