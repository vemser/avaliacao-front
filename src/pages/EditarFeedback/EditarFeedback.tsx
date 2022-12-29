import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Box, Stack, FormControl, FormLabel, Typography, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { EditarFeedbackSchema } from '../../utils/schemas'

import { Titulo } from '../../components/Titulo/Titulo'

import logo from "../../assets/dbc-logo.webp";

import { useAluno } from '../../context/Comportamental/AlunoContext'
import { InstrutorContext } from '../../context/InstrutorContext'

import { toast } from 'react-toastify'
import { toastConfig } from '../../utils/toast'

import { IEditarFeedbackForm } from '../../utils/interface'

const itemHeigth = 48;
const itemPaddingTop = 8;
const MenuProps = { PaperProps: { style: { maxHeight: itemHeigth * 4.5 + itemPaddingTop, width: 250 } } };

export const EditarFeedback = () => {
  const navigate = useNavigate();
  const { editarFeedback } = useContext(InstrutorContext);
  const { pegarAluno, alunos } = useAluno();
  const { state } = useLocation();

  useEffect(() => { pegarAluno(); }, [])

  const [mudaRadio, setMudaRadio] = useState('')
  const manipulaState = (event: string) => { setMudaRadio(event) }
  const resetFiltros = () => { setMudaRadio('') }

  const { register, handleSubmit, formState: { errors } } = useForm<IEditarFeedbackForm>({
    resolver: yupResolver(EditarFeedbackSchema)
  })

  const editarFeedbacks = (data: IEditarFeedbackForm) => {
    if (data.idAluno === "initial-aluno") {
      toast.error("Preencha todos os campos!", toastConfig)
    } else {
      const editarfeedback = { idAluno: parseInt(data.idAluno), descricao: data.descricao, tipo: data.tipo }
      editarFeedback(state.idFeedBack, editarfeedback)
    }
  }

  // const infosUsuario = JSON.parse(localStorage.getItem("infoUsuario") || "{}");
  // if (infosUsuario.cargo !== "Instrutor") return <Navigate to="/" />

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 64px)", paddingTop: "80px", paddingBottom: "50px" }}>
      <Titulo texto="Editar Feedback" />

      <Box component="form" onSubmit={handleSubmit(editarFeedbacks)} sx={{
        display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "var(--branco)", width: { xs: "95%", md: "70%", lg: "60%", xl: "50%" }, borderRadius: "10px", padding: {
          xs: 3, sm: 5
        }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: 3
      }}>

        <img src={logo} alt="Logo DBC" width={150} />
        <Stack component="div" spacing={3} sx={{ width: "100%", display: "flex", alignItems: { xs: "start", md: "start" } }}>

          <FormControl variant="filled">
            <FormLabel sx={{ color: "var(--azul-claro-dbc)", fontWeight: "500", marginBottom: "10px" }} id="demo-controlled-radio-buttons-group">Filtrar alunos por stack:</FormLabel>

            <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 2 }}>

              <Box color="primary" sx={{ display: "flex", flexDirection: "column", gap: 1, color: "var(--azul-claro-dbc)" }}>
                <Stack spacing={2} direction="row">
                  <input type="radio" value="QA" id="qa" name="stack" onChange={(e) => manipulaState(e.target.value)} />
                  <Typography sx={{ fontWeight: "700" }}>QA</Typography>
                </Stack>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1, color: "var(--azul-claro-dbc)" }}>
                <Stack spacing={2} direction="row">
                  <input type="radio" value="BACKEND" id="backend" name="stack" onChange={(e) => manipulaState(e.target.value)} />
                  <Typography sx={{ fontWeight: "700" }}>Backend</Typography>
                </Stack>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1, color: "var(--azul-claro-dbc)" }}>
                <Stack spacing={2} direction="row">
                  <input type="radio" value="FRONTEND" id="frontend" name="stack" onChange={(e) => manipulaState(e.target.value)} />
                  <Typography sx={{ fontWeight: "700" }}>Frontend</Typography>
                </Stack>
              </Box>

              <Button id="limpar-filtros" type="button" size="small" variant="contained" onClick={resetFiltros} sx={{ textTransform: "capitalize", fontSize: "1rem", width: "140px" }}>Limpar filtros</Button>
            </Box>
          </FormControl>

          <FormControl variant="filled" sx={{ width: "100%" }}>
            <InputLabel id="aluno">Selecione aluno</InputLabel>
            <Select MenuProps={MenuProps} labelId="demo-simple-select-filled-label" id="aluno" {...register("idAluno")} defaultValue="initial-aluno">
              <MenuItem value="initial-aluno" disabled><em>Selecione o Aluno</em></MenuItem>
              {alunos?.elementos.map((aluno) => {
                if (mudaRadio) {
                  if (mudaRadio === aluno.trilha.nome) {
                    return (<MenuItem id={`alunos-${aluno.trilha.nome.toLowerCase()}-${aluno.idAluno}`} key={aluno.idAluno} value={aluno.idAluno}>{aluno.nome}</MenuItem>)
                  }
                } else {
                  return (<MenuItem id={`alunos-geral-${aluno.idAluno}`} key={aluno.idAluno} value={aluno.idAluno}>{aluno.nome}</MenuItem>)
                }
              })}
            </Select>
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField id="descricao" defaultValue={state.descricao} {...register("descricao")} error={!!errors.descricao} label="Digite uma descrição" placeholder="Digite uma descrição" multiline rows={4} variant="filled" />
          </FormControl>

          <FormControl variant="filled" sx={{ width: "100%" }}>
            <InputLabel id="tipo">Status</InputLabel>
            <Select labelId="demo-simple-select-filled-label" defaultValue={state.tipo} id="tipo" error={!!errors.tipo} {...register("tipo")} >
              <MenuItem id="positivo" value="POSITIVO">Positivo</MenuItem>
              <MenuItem id="atencao" value="ATENCAO">Atencao</MenuItem>
            </Select>
          </FormControl>

        </Stack>
        <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", bottom: 0, paddingTop: "20px", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
          <Button type="button" onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d " }, textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cancelar</Button>

          <Button type="submit" variant="contained" color="success" sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Salvar</Button>
        </Box>
      </Box>
    </Box>
  )
}
