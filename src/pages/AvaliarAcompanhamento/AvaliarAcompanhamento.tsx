import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Typography, Stack, FormControl, TextField, FormLabel, Button, InputLabel, MenuItem, Select } from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CriarAvaliacaoSchema } from "../../utils/schemas";

import { AlunoContext } from "../../context/AlunoContext";
import { GestorContext } from "../../context/GestorContext";
import { toastConfig } from "../../utils/toast";
import { toast } from "react-toastify";

import { IAvaliarAcompanhamento } from "../../utils/interface";
import { Titulo } from "../../components/Titulo/Titulo";

const itemHeigth = 48;
const itemPaddingTop = 8;
const MenuProps = { PaperProps: { style: { maxHeight: itemHeigth * 4.5 + itemPaddingTop, width: 250 } } };

export const AvaliarAcompanhamento = () => {
  const navigate = useNavigate();
  const { pegarAluno, alunos } = useContext(AlunoContext);
  const { pegarAcompanhamento, acompanhamento, criarAvaliacao } = useContext(GestorContext)

  useEffect(() => { pegarAluno(); pegarAcompanhamento() }, [])

  const [mudaRadio, setMudaRadio] = useState('')
  const manipulaState = (event: string) => { setMudaRadio(event) }
  const resetFiltros = () => { setMudaRadio('') }

  const { register, handleSubmit, formState: { errors } } = useForm<IAvaliarAcompanhamento>({
    resolver: yupResolver(CriarAvaliacaoSchema)
  })

  const avaliarAcompanhamento = (data: IAvaliarAcompanhamento) => {
    if (data.idAcompanhamento === "initial-acompanhamento" || data.idAluno === "initial-aluno" || data.tipo === "initial-status") {
      toast.error("Preencha todos os campos!", toastConfig)
    } else {
      const avaliacao = { idAcompanhamento: parseInt(data.idAcompanhamento), idAluno: parseInt(data.idAluno), tipo: data.tipo, descricao: data.descricao, dataCriacao: data.dataCriacao }
      criarAvaliacao(avaliacao)
    }
  }

  const infosUsuario = JSON.parse(localStorage.getItem("infoUsuario") || "{}");
  // if (infosUsuario.cargo !== "Gestor de Pessoas") return <Navigate to="/" />

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 64px)", paddingTop: "80px", paddingBottom: "50px" }}>
      
      <Titulo texto="Avaliar Acompanhamento" />

      <Box component="form" onSubmit={handleSubmit(avaliarAcompanhamento)} sx={{
        display: "flex", flexDirection: { xs: "column", lg: "row" }, justifyContent: "space-between", backgroundColor: "var(--branco)", width: { xs: "95%", md: "90%", lg: "85%" }, borderRadius: "10px", padding: {
          xs: 3, sm: 5
        }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: { xs: 3, xl: 8 }
      }}>

        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: { xs: "start", md: "start" } }}>
          <FormControl variant="filled" sx={{ width: "100%" }}>
            <InputLabel id="acompanhamento">Título do Acompanhamento</InputLabel>
            <Select MenuProps={MenuProps} labelId="demo-simple-select-filled-label" id="acompanhamento" error={!!errors.idAcompanhamento} {...register("idAcompanhamento")} defaultValue="initial-acompanhamento">
              <MenuItem value="initial-acompanhamento" disabled><em>Selecione o Acompanhamento</em></MenuItem>
              {acompanhamento.map((acompanhamentos) => (
                <MenuItem id={`acompanhamento-${acompanhamentos.idAcompanhamento}`} key={acompanhamentos.idAcompanhamento} value={acompanhamentos.idAcompanhamento}>{acompanhamentos.titulo}</MenuItem>
              ))}
            </Select>
            {errors.idAcompanhamento && <Typography id="erro-acompanhamento" sx={{ fontWeight: "500", display: "inline-block", marginTop: "5px", whiteSpace: "nowrap" }} color="error">{errors.idAcompanhamento.message}</Typography>}
          </FormControl>

          <FormControl variant="filled">
            <FormLabel sx={{ color: "var(--azul-claro-dbc)", fontWeight: "500", marginBottom: "10px" }} id="demo-controlled-radio-buttons-group">Filtrar alunos por trilha</FormLabel>

            <Box sx={{ display: "flex", flexWrap: { xs: "wrap" }, alignItems: "center", gap: 2 }}>

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

              <Button id="limpar-filtro" type="button" size="small" variant="contained" onClick={resetFiltros} sx={{ textTransform: "capitalize", fontSize: "1rem", width: "140px" }}>Limpar filtros</Button>
            </Box>
          </FormControl>

          <FormControl variant="filled" sx={{ width: "100%" }}>
            <InputLabel id="aluno-label">Aluno</InputLabel>
            <Select MenuProps={MenuProps} labelId="demo-simple-select-filled-label" defaultValue="initial-aluno" id="aluno-select" error={!!errors.idAluno} {...register("idAluno")}>
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
            {errors.idAluno && <Typography id="erro-aluno" sx={{ fontWeight: "500", display: "inline-block", marginTop: "5px" }} color="error">{errors.idAluno.message}</Typography>}
          </FormControl>

          <FormControl variant="filled" sx={{ width: "100%" }}>
            <InputLabel id="responsavel">Responsável</InputLabel>
            <Select labelId="demo-simple-select-filled-label" id="responsavel" value="responsavel">
              <MenuItem value="responsavel">{infosUsuario.nome}</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="filled" sx={{ width: "100%" }}>
            <InputLabel id="status">Status</InputLabel>
            <Select labelId="demo-simple-select-filled-label" defaultValue="initial-status" id="status" error={!!errors.tipo} {...register("tipo")}>
              <MenuItem value="initial-status" disabled><em>Selecione o Status</em></MenuItem>
              <MenuItem id="positivo" value="POSITIVO">Positivo</MenuItem>
              <MenuItem id="atencao" value="ATENCAO">Atenção</MenuItem>
            </Select>
            {errors.tipo && <Typography id="erro-status" sx={{ fontWeight: "500", display: "inline-block", marginTop: "5px" }} color="error">{errors.tipo.message}</Typography>}
          </FormControl>

        </Stack>

        <Stack component="div" spacing={4} sx={{
          width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: "end"
        }}>
          <FormControl sx={{ width: "100%" }}>
            <TextField id="descricao" error={!!errors.descricao} label="Digite uma descrição" placeholder="Digite uma descrição" multiline rows={4} variant="filled" {...register("descricao")} />
            {errors.descricao && <Typography id="erro-descricao" sx={{ fontWeight: "500", display: "inline-block", marginTop: "5px" }} color="error">{errors.descricao.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField id="data" error={!!errors.dataCriacao} label="Data inicial" type="date" sx={{ width: "100%" }} InputLabelProps={{ shrink: true }} {...register("dataCriacao")} />
            {errors.dataCriacao && <Typography id="erro-dataCriacao" sx={{ fontWeight: "500", display: "inline-block", marginTop: "5px" }} color="error">{errors.dataCriacao.message}</Typography>}
          </FormControl>

          <Box sx={{ display: "flex", width: "100%", justifyContent: { xs: "center", lg: "end" }, alignItems: { xs: "center", lg: "end" }, bottom: 0, paddingTop: "20px", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
            <Button type="button" onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d " }, textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cancelar</Button>

            <Button type="submit" variant="contained" color="success" sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Salvar</Button>
          </Box>

        </Stack>
      </Box>
    </Box>
  )
}
