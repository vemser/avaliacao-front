import { useLocation, useNavigate } from 'react-router-dom';

import { Box, FormControl, TextField, Button, Typography } from '@mui/material';

import { Titulo } from '../../components/Titulo/Titulo';

import { useTrilha } from '../../context/Tecnico/TrilhaContext';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { trilhaSchema } from '../../utils/schemas';
import { IDadosTrilha } from '../../utils/TrilhaInterface/trilha';

export const EditarTrilha = () => {
  const navigate = useNavigate()
  const { editarTrilha } = useTrilha();
  const { state } = useLocation();

  const { register, handleSubmit, formState: { errors } } = useForm<IDadosTrilha>({
    resolver: yupResolver(trilhaSchema)
  });

  const dadosForm = (data: IDadosTrilha) => { editarTrilha(data, state.trilha.idTrilha) }

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "60px", paddingBottom: "50px" }}>
      <Titulo texto="Editar Trilha" />

      <Box component="form" onSubmit={handleSubmit(dadosForm)} sx={{
        display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "var(--branco)", width: { xs: "95%", md: "70%", lg: "60%", xl: "50%" }, borderRadius: "10px", padding: {
          xs: 3, sm: 5
        }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: 3
      }}>

        <Typography sx={{ width: "100%", textAlign: "center", display: "flex", justifyContent: "center", fontSize: "1.4rem", fontWeight: 600, userSelect: "none", color: "var(--azul-claro-dbc)", padding: "10px" }}>
          {`Programa ${state.nomePrograma}`}
        </Typography>

        <FormControl sx={{ width: "100%" }}>
          <TextField id="editar-nome-trilha" {...register('nome')} label="Nome" placeholder='Digite um nome para a trilha' defaultValue={state.trilha.nome} variant="filled" />
          {errors.nome && <Typography id="erro-nome-trilha" sx={{ fontWeight: "500", display: "inline-block", marginTop: "5px", whiteSpace: "nowrap" }} color="error">{errors.nome.message}</Typography>}
        </FormControl>

        <FormControl sx={{ width: "100%" }}>
          <TextField id="editar-descricao-trilha" {...register('descricao')} label="Descri????o" placeholder='Digite uma descri????o para a trilha' multiline rows={4} defaultValue={state.trilha.descricao} variant="filled" />
        </FormControl>

        <FormControl sx={{ display: "none" }}>
          <TextField id="id-trilha" {...register('idPrograma')} defaultValue={state.idPrograma} variant="filled" />
        </FormControl>

        <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", bottom: 0, paddingTop: "20px", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
          <Button type="button" onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d " }, textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cancelar</Button>
          <Button variant="contained" color="success" type='submit' sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Salvar</Button>
        </Box>
      </Box>
    </Box>
  )
}
