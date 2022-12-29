import { useNavigate } from 'react-router-dom';

import { Box, FormControl, TextField, Button, Typography } from '@mui/material';

import { Titulo } from '../../components/Titulo/Titulo';

import logo from '../../assets/dbc-logo.webp';
import { useForm } from 'react-hook-form';
import { useTrilha } from '../../context/Tecnico/TrilhaContext';
import { IDadosTrilha } from '../../utils/TrilhaInterface/trilha';

import { trilhaSchema } from '../../utils/schemas';
import { yupResolver } from '@hookform/resolvers/yup';

export const CadastrarTrilha = () => {
  const navigate = useNavigate();
  const { cadastrarTrilha } = useTrilha();

  const { register, handleSubmit, formState: { errors } } = useForm<IDadosTrilha>({
    resolver: yupResolver(trilhaSchema)
  });

  const enviaDadosForm = (data: IDadosTrilha) => cadastrarTrilha(data);

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 64px)", paddingTop: "80px", paddingBottom: "50px" }}>
      <Titulo texto="Cadastrar Trilha" />

        <Box component="form" onSubmit={handleSubmit(enviaDadosForm)} sx={{
          display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "var(--branco)", width: { xs: "95%", md: "70%", lg: "60%", xl: "50%" }, borderRadius: "10px", padding: {
            xs: 3, sm: 5
          }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: 3
        }}>
          <img src={logo} alt="Logo DBC Azul" width={150} />

          <FormControl sx={{ width: "100%" }}>
            <TextField id="nome-trilha" label="Nome da Trilha" placeholder="Ex: FrontEnd" variant="filled" {...register('nome')} />
            {errors.nome && <Typography id="erro-nome-trilha" sx={{ fontWeight: "500", display: "inline-block", marginTop: "5px", whiteSpace: "nowrap" }} color="error">{errors.nome.message}</Typography>}
          </FormControl>
          <FormControl sx={{ width: "100%" }}>
            <TextField id="descricao-trilha" label="Descrição da Trilha" multiline rows={4} placeholder="Ex: Esta é a trilha de QA..." variant="filled" {...register('descricao')} />
          </FormControl>

        <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", bottom: 0, paddingTop: "20px", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
          <Button type="button" onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d " }, textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cancelar</Button>

            <Button variant="contained" color="success" type="submit" sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cadastrar</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}