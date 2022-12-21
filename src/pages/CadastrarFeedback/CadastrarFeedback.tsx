import { useContext, useEffect, useState } from 'react';

import { Navigate } from 'react-router-dom';

import { Box, Typography, Stack, FormControl, TextField, FormLabel, InputLabel, MenuItem, Select, Button } from '@mui/material'

import { Header } from '../../components/Header/Header'
import { BotaoAzul } from '../../components/BotaoAzul/BotaoAzul';
import { Titulo } from '../../components/Titulo/Titulo';

import logo from "../../assets/dbc-logo.webp";

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CadastrarFeedbackSchema } from '../../utils/schemas';

import { AlunoContext } from '../../context/AlunoContext';
import { InstrutorContext } from '../../context/InstrutorContext';
import { toast } from 'react-toastify';
import { toastConfig } from '../../utils/toast';

import { ICadastrarFeedbackForm } from '../../utils/interface';

const itemHeigth = 48;
const itemPaddingTop = 8;
const MenuProps = { PaperProps: { style: { maxHeight: itemHeigth * 4.5 + itemPaddingTop, width: 250, } } };

export const CadastrarFeedback = () => {
  const { getAlunos, alunos } = useContext(AlunoContext);
  const { cadastrarFeedback } = useContext(InstrutorContext);

  const [mudaRadio, setMudaRadio] = useState('')
  const manipulaState = (event: string) => { setMudaRadio(event) }
  const resetFiltros = () => { setMudaRadio('') }

  useEffect(() => { getAlunos(); }, [])

  const { register, handleSubmit, formState: { errors } } = useForm<ICadastrarFeedbackForm>({
    resolver: yupResolver(CadastrarFeedbackSchema)
  })

  const cadastrarFeedbacks = (data: ICadastrarFeedbackForm) => {
    if (data.idAluno === "initial-aluno" || data.tipo === "initial-status") {
      toast.error("Preencha todos os campos!", toastConfig)
    } else {
      const feedback = { idAluno: parseInt(data.idAluno), descricao: data.descricao, tipo: data.tipo }
      cadastrarFeedback(feedback)
    }
  }

  const infosUsuario = JSON.parse(localStorage.getItem("infoUsuario") || "{}");
  if (infosUsuario.cargo !== "Instrutor") return <Navigate to="/" />

  return (
    <>
      <Header />

      <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "calc(100vh - 64px)" }}>
        <Titulo texto="Cadastrar feedback" />

        <Box component="form" onSubmit={handleSubmit(cadastrarFeedbacks)} sx={{ display: { xs: "flex", md: "flex" }, flexDirection: "column", alignItems: "center", backgroundColor: "var(--branco)", width: { xs: "90%", md: "35%" }, borderRadius: "10px", padding: { xs: 5, md: 5 }, boxShadow: "10px 10px 10px var(--azul-escuro-dbc)", gap: 2 }}>
          <img src={logo} alt="Logo DBC" width={150} />
          <Stack component="div" spacing={2} sx={{ width: { xs: "100%", md: "100%" }, display: "flex", alignItems: { xs: "start", md: "start" } }}>

            <FormControl variant="filled">
              <FormLabel sx={{ color: "var(--azul-claro-dbc)", fontWeight: "500", marginBottom: "10px" }} id="demo-controlled-radio-buttons-group">Filtrar alunos por stack:</FormLabel>

              <Box sx={{ display: "flex", flexWrap: { xs: "wrap", md: "nowrap" }, alignItems: "center", gap: 2 }}>

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

                <Button id="limpar-filtro" type="button" size="small" variant="contained" onClick={resetFiltros}>Limpar filtros</Button>
              </Box>
            </FormControl>

            <FormControl variant="filled" sx={{ width: { xs: "100%", md: "100%" } }}>
              <InputLabel id="aluno">Selecione aluno</InputLabel>
              <Select MenuProps={MenuProps} labelId="demo-simple-select-filled-label" defaultValue="initial-aluno" id="idAluno" {...register("idAluno")}>
                <MenuItem value="initial-aluno" disabled><em>Selecione o Aluno</em></MenuItem>
                {alunos.map((aluno) => {
                  if (mudaRadio) {
                    if (mudaRadio === aluno.stack) {
                      return (<MenuItem id={`alunos-${aluno.stack.toLowerCase()}-${aluno.idAluno}`} key={aluno.idAluno} value={aluno.idAluno}>{aluno.nome}</MenuItem>)
                    }
                  } else {
                    return (<MenuItem id={`alunos-geral-${aluno.idAluno}`} key={aluno.idAluno} value={aluno.idAluno}>{aluno.nome}</MenuItem>)
                  }
                })}
              </Select>
              {errors.idAluno && <Typography id="erro-aluno" sx={{ fontWeight: "500", display: "inline-block", marginTop: "5px", whiteSpace: "nowrap" }} color="error">{errors.idAluno.message}</Typography>}
            </FormControl>

            <FormControl sx={{ width: { xs: "100%", md: "100%" } }}>
              <TextField id="descricao" {...register("descricao")} error={!!errors.descricao} label="Digite uma descrição" placeholder="Digite uma descrição" multiline variant="filled" />
              {errors.descricao && <Typography id="erro-descricao" sx={{ fontWeight: "500", display: "inline-block", marginTop: "5px", whiteSpace: "nowrap" }} color="error">{errors.descricao.message}</Typography>}
            </FormControl>

            <FormControl variant="filled" sx={{ width: { xs: "100%", md: "100%" } }}>
              <InputLabel id="status">Status</InputLabel>
              <Select labelId="demo-simple-select-filled-label" id="status" defaultValue="initial-status" error={!!errors.tipo} {...register("tipo")}>
                <MenuItem value="initial-status" disabled><em>Selecione o Status</em></MenuItem>
                <MenuItem value="POSITIVO">Positivo</MenuItem>
                <MenuItem value="ATENCAO">Atencao</MenuItem>
              </Select>
              {errors.tipo && <Typography id="erro-status" sx={{ fontWeight: "500", display: "inline-block", marginTop: "5px", whiteSpace: "nowrap" }} color="error">{errors.tipo.message}</Typography>}
            </FormControl>
          </Stack>

          <BotaoAzul texto="Enviar" />
        </Box>
      </Box>
    </>
  )
}
