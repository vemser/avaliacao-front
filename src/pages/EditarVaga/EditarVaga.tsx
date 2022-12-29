import { Box, Stack, FormControl, TextField, Autocomplete, InputLabel, Select, MenuItem, Button } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Titulo } from '../../components';


const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 }
];


export const EditarVaga = () => {

  const navigate = useNavigate()

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 64px)", paddingTop: "80px", paddingBottom: "50px" }}>
      <Titulo texto="Editar Vaga" />

      <Box component="form" sx={{
        display: "flex", flexDirection: { xs: "column", lg: "row" }, justifyContent: "space-between", backgroundColor: "var(--branco)", width: { xs: "95%", md: "90%", lg: "85%" }, borderRadius: "10px", padding: {
          xs: 3, sm: 5
        }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: { xs: 3, xl: 8 }
      }}>
        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: { xs: "start", md: "start" } }}>

          <FormControl sx={{ width: "100%" }}>
            <TextField id="nomeVaga" label="Nome da vaga" placeholder="Digite o nome da vaga" variant="filled" />

          </FormControl>

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }} >
            <Autocomplete
              disablePortal
              id="cliente"
              options={top100Films}
              renderInput={(params) => <TextField {...params} label="Cliente" variant="filled" />}
            />
          </FormControl>

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }} >
            <Autocomplete
              disablePortal
              id="programa"
              options={top100Films}
              renderInput={(params) => <TextField {...params} label="Programa" variant="filled" />}
            />
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField id="vagaTotais" type="number" label="Quantidade de vagas" placeholder="Digite a quantidade de vagas" variant="filled" />
          </FormControl>
        </Stack>

        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: "end" }}>

          <FormControl sx={{ width: "100%" }}>
            <TextField id="dataAbertura" label="Data de Abertura" type="date" sx={{ width: "100%" }} InputLabelProps={{ shrink: true }} />
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField id="dataFechamento" label="Data de Fechamento" type="date" sx={{ width: "100%" }} InputLabelProps={{ shrink: true }} />
          </FormControl>

          <FormControl variant="filled" sx={{ width: { xs: "100%", md: "100%" } }}>
            <InputLabel id="selectAluno">Situação</InputLabel>
            <Select labelId="demo-simple-select-filled-label" defaultValue="initial-stack" id="select-trilha" >
              <MenuItem value="initial-stack" disabled><em>Selecione uma situação</em></MenuItem>
              <MenuItem id="aberta" value="ABERTA">Aberta</MenuItem>
              <MenuItem id="fechada" value="FECHADA">Fechada</MenuItem>
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
}
