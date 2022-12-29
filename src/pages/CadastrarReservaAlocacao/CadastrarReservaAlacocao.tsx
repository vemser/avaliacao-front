import { Box, Stack, FormControl, TextField, Typography, InputLabel, Input, Button, Select, MenuItem, Autocomplete } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BotaoVerde } from '../../components/BotaoVerde/BotaoVerde';
import { Titulo } from '../../components/Titulo/Titulo';


const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 }
];

export const CadastrarReservaAlacocao = () => {

  const navigate = useNavigate()


  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 64px)", paddingTop: "80px", paddingBottom: "50px" }}>
      <Titulo texto="Cadastrar Reserva e Alocação" />

      <Box component="form" sx={{
        display: "flex", flexDirection: { xs: "column", lg: "row" }, justifyContent: "space-between", backgroundColor: "var(--branco)", width: { xs: "95%", md: "90%", lg: "85%" }, borderRadius: "10px", padding: {
          xs: 3, sm: 5
        }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: { xs: 3, xl: 8 }
      }}>
        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: { xs: "start", md: "start" } }}>

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }} >
            <Autocomplete
              disablePortal
              id="alocacao"
              options={top100Films}
              renderInput={(params) => <TextField {...params} label="Alocações" variant="filled" />}
            />
          </FormControl>

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }} >
            <Autocomplete
              disablePortal
              id="aluno"
              options={top100Films}
              renderInput={(params) => <TextField {...params} label="Aluno" variant="filled" />}
            />
          </FormControl>

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }} >
            <Autocomplete
              disablePortal
              id="vaga"
              options={top100Films}
              renderInput={(params) => <TextField {...params} label="Vaga" variant="filled" />}
            />
          </FormControl>

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }} >
            <Autocomplete
              disablePortal
              id="cliente"
              options={top100Films}
              renderInput={(params) => <TextField {...params} label="Cliente" variant="filled" />}
            />
          </FormControl>

        </Stack>

        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: "end" }}>

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }}>
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

          <FormControl variant="filled" sx={{ width: { xs: "100%", md: "100%" } }}>
            <InputLabel id="selectAluno">Situação</InputLabel>
            <Select labelId="demo-simple-select-filled-label" defaultValue="initial-stack" id="select-trilha" >
              <MenuItem value="initial-stack" disabled><em>Selecione uma situação</em></MenuItem>
              <MenuItem id="reservado" value="RESERVADO">Reservado</MenuItem>
              <MenuItem id="alocado" value="ALOCADO">Alocado</MenuItem>
              <MenuItem id="inativo" value="INATIVO">Inativo</MenuItem>
              <MenuItem id="cancelado" value="CANCELADO">Cancelado</MenuItem>
              <MenuItem id="finalizado" value="FINALIZADO">Finalizado</MenuItem>
            </Select>

          </FormControl>

          <Box sx={{ display: "flex", width: "100%", justifyContent: { xs: "center", lg: "end" }, alignItems: { xs: "center", lg: "end" }, bottom: 0, paddingTop: "20px", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
            <Button type="button" onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d " }, textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cancelar</Button>

            <Button type="submit" variant="contained" color="success" sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cadastrar</Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
