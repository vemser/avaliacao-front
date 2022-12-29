import { useLocation, useNavigate } from 'react-router-dom';

import { Box, FormControl, TextField, Button } from '@mui/material';

import { Titulo } from '../../components/Titulo/Titulo';

import { useTrilha } from '../../context/Tecnico/TrilhaContext';

import logo from '../../assets/dbc-logo.webp';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { trilhaSchema } from '../../utils/schemas';
import { IDadosTrilha } from '../../utils/TrilhaInterface/trilha';

export const EditarTrilha = () => {
  const navigate = useNavigate()
  const { editarTrilha } = useTrilha();

  const { state } = useLocation();

  const { register, handleSubmit } = useForm<IDadosTrilha>({
    resolver: yupResolver(trilhaSchema)
  });

  const dadosForm = (data: IDadosTrilha) => { editarTrilha(data, state.idTrilha) }

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 64px)", paddingTop: "80px", paddingBottom: "50px" }}>
      <Titulo texto="Editar Trilha" />

      <Box component="form" onSubmit={handleSubmit(dadosForm)} sx={{
        display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "var(--branco)", width: { xs: "95%", md: "70%", lg: "60%", xl: "50%" }, borderRadius: "10px", padding: {
          xs: 3, sm: 5
        }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: 3
      }}>
        <img src={logo} alt="Logo DBC Azul" width={150} />

        <FormControl sx={{ width: "100%" }}>
          <TextField id="editar-nome-trilha" {...register('nome')} label="Nome da Trilha" defaultValue={state.nome} variant="filled" />
        </FormControl>
        <FormControl sx={{ width: "100%" }}>
          <TextField id="editar-descricao-trilha" {...register('descricao')} label="Descrição da Trilha" multiline rows={4} defaultValue={state.descricao} variant="filled" />
        </FormControl>

        <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", bottom: 0, paddingTop: "20px", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
          <Button onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d " }, textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cancelar</Button>

          <Button variant="contained" color="success" type='submit' sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Salvar</Button>
        </Box>
      </Box>
    </Box>
  )
}
