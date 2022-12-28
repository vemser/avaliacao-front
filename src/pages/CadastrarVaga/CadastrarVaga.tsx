import { Box, Stack, FormControl, Autocomplete, TextField, InputLabel, Select, MenuItem, Button } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Titulo } from '../../components';
import { BotaoVerde } from '../../components/BotaoVerde/BotaoVerde';

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 }
];

export const CadastrarVaga = () => {

  const navigate = useNavigate()

  return (
    <>
      <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "calc(100vh - 64px)" }}>
        <Titulo texto="Cadastrar vaga" />

        <Box component="form" sx={{ display: { xs: "block", md: "flex" }, justifyContent: "space-between", backgroundColor: "var(--branco)", width: { xs: "90%", md: "70%" }, borderRadius: "10px", padding: { xs: 5, md: 5 }, boxShadow: "10px 10px 10px var(--azul-escuro-dbc)",gap:"50px" }}>
          <Stack component="div" spacing={3} sx={{ width: { xs: "100%", md: "50%" }, display: "flex", alignItems: { xs: "start", md: "start" } }}>

            <FormControl sx={{ width: "100%" }}>
              <TextField id="nomeVaga" label="Nome da vaga" placeholder="Digite o nome da vaga" variant="filled" />
              
            </FormControl> 

            <FormControl sx={{ width: { xs: "100%", md: "100%" }}} >
              <Autocomplete
                disablePortal
                id="cliente"
                options={top100Films}
                renderInput={(params) => <TextField {...params} label="Cliente"  variant="filled"  />}
              />
            </FormControl> 
            
            <FormControl sx={{ width: { xs: "100%", md: "100%" }}} >
              <Autocomplete
                disablePortal
                id="programa"
                options={top100Films}
                renderInput={(params) => <TextField {...params} label="Programa"  variant="filled"  />}
              />
            </FormControl>  

            <FormControl sx={{ width: "100%" }}>
              <TextField id="vagaTotais" type="number" label="Quantidade de vagas" placeholder="Digite a quantidade de vagas" variant="filled" />
            </FormControl>  


          </Stack>

          <Stack component="div" spacing={3} sx={{ width: { xs: "100%", md: "50%" }, display: "flex", alignItems: "end", marginTop: { xs: 2, md: 0 } }}>

            <FormControl sx={{ width: "100%" }}>
              <TextField id="dataAbertura" label="Data Abertura" type="date" sx={{ width: "100%" }} InputLabelProps={{ shrink: true }}/>
            
            </FormControl>

            <FormControl sx={{ width: "100%" }}>
              <TextField id="dataFechamento" label="Data fechamento" type="date" sx={{ width: "100%" }} InputLabelProps={{ shrink: true }}/>
            
            </FormControl>

            <FormControl sx={{ width: "100%" }}>
              <TextField id="dataCriacao" label="Data Criação" type="date" sx={{ width: "100%" }} InputLabelProps={{ shrink: true }}/>
            
            </FormControl>

            <FormControl variant="filled" sx={{ width: { xs: "100%", md: "100%" } }}>
              <InputLabel id="selectAluno">Situação</InputLabel>
              <Select labelId="demo-simple-select-filled-label" defaultValue="initial-stack" id="select-trilha" >
                <MenuItem value="initial-stack" disabled><em>Selecione uma situação</em></MenuItem>
                <MenuItem id="aberta" value="ABERTA">Aberta</MenuItem>
                <MenuItem id="fechada" value="FECHADA">Fechada</MenuItem>
              </Select>
             
            </FormControl>

            <Box sx={{display:"flex",alignItems:"end"}}>

              <Button onClick={()=>{navigate(-1)}} variant="contained"  sx={{backgroundColor:"#808080 ",":hover":{backgroundColor:"#5f5d5d "},textTransform: "capitalize", width:{ xs:"15ch", md:"25ch"}}} >Cancelar</Button>

              <BotaoVerde texto="Enviar" />
              
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
