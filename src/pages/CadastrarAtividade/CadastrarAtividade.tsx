import { Box, Stack, FormControl, TextField, Typography, Button, InputLabel, Select, MenuItem, Autocomplete } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BotaoVerde } from '../../components/BotaoVerde/BotaoVerde'
import { Header } from '../../components/Header/Header'
import { Titulo } from '../../components/Titulo/Titulo'


const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 }
];

export const CadastrarAtividade = () => {

  const navigate = useNavigate()

  return (
    <>
      <Header />
    
      <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "calc(100vh - 64px)" }}>
        <Titulo texto="Cadastrar Atividade" />

        <Box component="form" sx={{ display: { xs: "block", md: "flex" }, justifyContent: "space-between", backgroundColor: "var(--branco)", width: { xs: "90%", md: "70%" }, borderRadius: "10px", padding: { xs: 5, md: 5 }, boxShadow: "10px 10px 10px var(--azul-escuro-dbc)",gap:"50px" }}>
          <Stack component="div" spacing={3} sx={{ width: { xs: "100%", md: "50%" }, display: "flex", alignItems: { xs: "start", md: "start" } }}>

            <FormControl sx={{ width: { xs: "100%", md: "100%" } }}>
              <TextField id="titulo-atividade" label="Título" placeholder="Digite um título para atividade" variant="filled"focused />
             
            </FormControl>

            <FormControl sx={{ width: { xs: "100%", md: "100%" }}} >
              <Autocomplete
                disablePortal
                id="programa"
                options={top100Films}
                renderInput={(params) => <TextField {...params} label="Programa"  variant="filled"  />}
              />
            </FormControl>

            <FormControl sx={{ width: { xs: "100%", md: "100%" } }}>
            <TextField
                placeholder="Digite uma descrição"
                multiline
                rows={4}
                sx={{width: "100%"}}
                id="descricao"
                label="Descrição"
                variant='filled'
                focused
              />
            </FormControl>

          </Stack>

          <Stack component="div" spacing={3} sx={{ width: { xs: "100%", md: "50%" }, display: "flex", alignItems: "end", marginTop: { xs: 2, md: 0 } }}>

          <FormControl variant="filled" sx={{ width: { xs: "100%", md: "100%" } }}>
              <InputLabel id="select-atividade">Módulo</InputLabel>
              <Select labelId="demo-simple-select-filled-label" defaultValue="initial-stack" id="select-modulo" >
                <MenuItem value="initial-stack" disabled><em>Selecione um módulo</em></MenuItem>
                <MenuItem id="frontend" value="FRONTEND">ReactJs</MenuItem>
                <MenuItem id="backend" value="BACKEND">JavaScript</MenuItem>
                <MenuItem id="qa" value="QA">TypeScript</MenuItem>
              </Select>
             
            </FormControl> 

            <FormControl sx={{ width: { xs: "100%", md: "100%" } }}>
              <TextField type="number" label="Peso atividade " placeholder='Digite o peso da atividade' id='peso' variant="filled" focused
              />
            </FormControl> 

            <FormControl sx={{ width: { xs: "100%", md: "100%" }}} >
              <Autocomplete
                disablePortal
                id="programa"
                options={top100Films}
                renderInput={(params) => <TextField {...params} label="Alunos"  variant="filled"  />}
              />
            </FormControl>

            <FormControl sx={{ width: { xs: "100%", md: "100%" } }}>
              <TextField type="datetime-local" label="Data/horário de entrega " placeholder='Digite uam data de entrega' id='data-entrega' variant="filled" focused
              />
            </FormControl> 

            

            <Box sx={{display:"flex",alignItems:"end"}}>

              <Button onClick={()=>{navigate(-1)}} variant="contained"  sx={{backgroundColor:"#808080 ",":hover":{backgroundColor:"#5f5d5d "},textTransform: "capitalize", width:{ xs:"15ch", md:"25ch"}}} >Cancelar</Button>

              <BotaoVerde texto="Enviar" />
              
            </Box>
          </Stack>
        </Box>
      </Box>
    </>

    
  )
}
