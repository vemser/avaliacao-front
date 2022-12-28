import { useContext } from 'react'

import { useLocation, useNavigate } from 'react-router-dom';

import { BotaoVerde } from '../../components/BotaoVerde/BotaoVerde';
import { Titulo } from '../../components/Titulo/Titulo';

import { Box, Stack, FormControl, TextField, Typography, InputLabel, Select, MenuItem, Button } from '@mui/material';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editarAlunoSchema } from '../../utils/schemas';

import { AlunoContext } from '../../context/AlunoContext';

import { IEditarAluno } from '../../utils/interface';

import Autocomplete from '@mui/material/Autocomplete';

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 }
];

export const EditarAluno = () => {
  const { state } = useLocation()

  const navigate = useNavigate()

  const { editarAluno } = useContext(AlunoContext)

  const { register, handleSubmit, formState: { errors } } = useForm<IEditarAluno>({
    resolver: yupResolver(editarAlunoSchema),
    defaultValues: {
      nome: state.nome,
      email: state.email
    }
  });

  const editarAlunos = (data: IEditarAluno) => { editarAluno(data, state.idAluno) };

  // const infosUsuario = JSON.parse(localStorage.getItem("infoUsuario") || "{}");
  // if (infosUsuario.cargo !== "Gestor de Pessoas" && infosUsuario.cargo !== "Instrutor") return <Navigate to="/" />

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 64px)", paddingTop: "80px", paddingBottom: "50px" }}>
      <Titulo texto={`Editar ${state.nome}`} />

      <Box component="form" onSubmit={handleSubmit(editarAlunos)} sx={{
        display: "flex", flexDirection: { xs: "column", lg: "row" }, justifyContent: "space-between", backgroundColor: "var(--branco)", width: { xs: "95%", md: "90%", lg: "85%" }, borderRadius: "10px", padding: {
          xs: 3, sm: 5
        }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: { xs: 3, xl: 8 }
      }}>
        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: { xs: "start", md: "start" } }}>

          <FormControl sx={{ width: "100%" }}>
            <TextField id="nomeCompletoAluno" label="Nome Completo" placeholder="Fulano da Silva" variant="filled" error={!!errors.nome}  {...register("nome")} />
            {errors.nome && <Typography id="erro-nomeCompletoAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.nome.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField id="emailAluno" label="E-mail DBC" placeholder="fulano.silva@dbccompany.com.br" variant="filled" {...register("email")} error={!!errors.email} />

            {errors.email && <Typography id="erro-emailAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.email.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField type="number" label="Telefone" placeholder='Digite o número de telefone' id='telefone' variant="filled"
            />
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField type="text" label="Cidade" placeholder='Digite a cidade' id='cidade' variant="filled"
            />
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField type="text" label="Estado" placeholder='Digite o estado' id='estado' variant="filled"
            />
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField
              placeholder="Digite uma descrição"
              multiline
              rows={4}
              sx={{ width: "100%" }}
              id="descricao"
              label="Descrição"
              variant='filled'
            />
          </FormControl>
        </Stack>

        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: "end" }}>

          <FormControl sx={{ width: { xs: "100%", md: "100%" }, display: "flex", flexDirection: "row", gap: "10px" }}>
            <TextField sx={{ width: "90%" }} type="text" label='Tecnologias' placeholder='Tecnologias' id='tecnologias' variant="outlined" />

            <Button id="botao-adiconar-tecnologia" variant={"contained"} sx={{ width: '10%', fontSize: "20px" }}>
              +
            </Button>

          </FormControl>

          <Box sx={{
            border: '1px solid #ababab',
            borderRadius: '5px',
            p: '5px',
            display: 'flex',
            width: '100%',
            height: '55px',
            overflowX: 'auto',
            alignItems: 'center',
            gap: '10px'
          }}>

            {/* <Box
                  sx={{
                    display: 'flex',
                    border: '1px solid #ababab',
                    borderRadius: '15px',
                    p: '10px',
                    height: '50px',
                    gap: '5px'
                  }}
                >
                  <Box sx={{
                    width: '30px',
                    borderRadius: '100%',
                    background: 'red',
                    display: 'flex',
                    justigyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    color: 'white',
                    paddingLeft: '2px'
                  }}>
                  </Box>
                </Box> */}

          </Box>

          <FormControl variant="filled" sx={{ width: "100%" }}>
            <InputLabel id="selectAluno">Trilha do Aluno</InputLabel>
            <Select labelId="demo-simple-select-filled-label" defaultValue={state.stack} id="select-trilha" error={!!errors.stack}  {...register("stack")}>
              <MenuItem id="frontend" value="FRONTEND">Front-End</MenuItem>
              <MenuItem id="backend" value="BACKEND">Back-End</MenuItem>
              <MenuItem id="qa" value="QA">Quality Assurance</MenuItem>
            </Select>
            {errors.stack && <Typography id="erro-selectAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.stack.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }} >
            <Autocomplete
              disablePortal
              id="programa"
              options={top100Films}
              renderInput={(params) => <TextField {...params} label="Programa" variant="filled" />}
            />
          </FormControl>

          <FormControl variant="filled" sx={{ width: { xs: "100%", md: "100%" } }}>
            <InputLabel id="selectAluno">Situação</InputLabel>
            <Select labelId="demo-simple-select-filled-label" defaultValue="initial-stack" id="select-situacao">
              <MenuItem value="initial-stack" disabled><em>Selecione uma situação</em></MenuItem>
              <MenuItem id="disponivel" value="DISPONIVEL">Disponível</MenuItem>
              <MenuItem id="reservado" value="RESERVADO">Reservado</MenuItem>
              <MenuItem id="alocado" value="ALOCADO">Alocado</MenuItem>
              <MenuItem id="inativo" value="INATIVO">Inativo</MenuItem>
            </Select>
            {errors.stack && <Typography id="erro-selectAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.stack.message}</Typography>}
          </FormControl>

          <Box sx={{ display: "flex", alignItems: "end" }}>

            <Button onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d " }, textTransform: "capitalize", width: { xs: "15ch", md: "25ch" } }} >Cancelar</Button>

            <BotaoVerde texto="Editar" />

          </Box>
        </Stack>
      </Box>
    </Box>
  )
}
