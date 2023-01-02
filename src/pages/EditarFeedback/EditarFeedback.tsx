// import React, { useContext, useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'

import { Box, Stack, FormControl, InputLabel, Select, MenuItem, TextField, Button, Autocomplete } from '@mui/material'

// import { yupResolver } from '@hookform/resolvers/yup'
// import { useForm } from 'react-hook-form'
// import { EditarFeedbackSchema } from '../../utils/schemas'

import { Titulo } from '../../components/Titulo/Titulo'

// import logo from "../../assets/dbc-logo.webp";

// import { useAluno } from '../../context/Comportamental/AlunoContext'
// import { InstrutorContext } from '../../context/InstrutorContext'

// import { toast } from 'react-toastify'
// import { toastConfig } from '../../utils/toast'

// import { IEditarFeedbackForm } from '../../utils/interface'

// const itemHeigth = 48;
// const itemPaddingTop = 8;
// // const MenuProps = { PaperProps: { style: { maxHeight: itemHeigth * 4.5 + itemPaddingTop, width: 250 } } };

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 }
];

export const EditarFeedback = () => {
  const navigate = useNavigate();
  // const { editarFeedback } = useContext(InstrutorContext);
  // const { pegarAluno, alunos } = useAluno();
  // const { state } = useLocation();

  // useEffect(() => { pegarAluno(); }, [])

  // const [mudaRadio, setMudaRadio] = useState('')
  // const manipulaState = (event: string) => { setMudaRadio(event) }
  // const resetFiltros = () => { setMudaRadio('') }

  // const { register, handleSubmit, formState: { errors } } = useForm<IEditarFeedbackForm>({
  //   resolver: yupResolver(EditarFeedbackSchema)
  // })

  // const editarFeedbacks = (data: IEditarFeedbackForm) => {
  //   if (data.idAluno === "initial-aluno") {
  //     toast.error("Preencha todos os campos!", toastConfig)
  //   } else {
  //     const editarfeedback = { idAluno: parseInt(data.idAluno), descricao: data.descricao, tipo: data.tipo }
  //     editarFeedback(state.idFeedBack, editarfeedback)
  //   }
  // }

  // const infosUsuario = JSON.parse(localStorage.getItem("infoUsuario") || "{}");
  // if (infosUsuario.cargo !== "Instrutor") return <Navigate to="/" />

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 64px)", paddingTop: "80px", paddingBottom: "50px" }}>
      <Titulo texto="Cadastrar Feedback" />

      <Box component="form" sx={{
        display: "flex", flexDirection: { xs: "column", lg: "row" }, justifyContent: "space-between", backgroundColor: "var(--branco)", width: { xs: "95%", md: "90%", lg: "85%" }, borderRadius: "10px", padding: {
          xs: 3, sm: 5
        }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: { xs: 3, xl: 8 }
      }}>
        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: { xs: "start", md: "start" } }}>

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }} >
            <Autocomplete
              disablePortal
              id="programa"
              options={top100Films}
              renderInput={(params) => <TextField {...params} label="Programa" variant="filled" />}
            />
          </FormControl>

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }} >
            <Autocomplete
              disablePortal
              id="modulo"
              options={top100Films}
              renderInput={(params) => <TextField {...params} label="Módulo" variant="filled" />}
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
              id="trilha"
              options={top100Films}
              renderInput={(params) => <TextField {...params} label="Trilha" variant="filled" />}
            />
          </FormControl>
        </Stack>

        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: "end" }}>

          <FormControl sx={{ width: "100%" }}>
            <TextField id="data" label="Data" type="date" sx={{ width: "100%" }} InputLabelProps={{ shrink: true }} />
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField
              placeholder="Digite uma descrição"
              multiline
              rows={3}
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
              <MenuItem id="positivo" value="POSITIVO">Positivo</MenuItem>
              <MenuItem id="atencao" value="ATENCAO">Atenção</MenuItem>
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
