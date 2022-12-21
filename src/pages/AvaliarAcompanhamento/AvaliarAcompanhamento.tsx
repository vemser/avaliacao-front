import { useContext, useEffect, useState } from "react";

import { Navigate } from "react-router-dom";

import { Box, Typography, Stack, FormControl, TextField, FormLabel, Button, InputLabel, MenuItem, Select } from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CriarAvaliacaoSchema } from "../../utils/schemas";

import { Header } from "../../components/Header/Header"

import { AlunoContext } from "../../context/AlunoContext";
import { GestorContext } from "../../context/GestorContext";
import { toastConfig } from "../../utils/toast";
import { toast } from "react-toastify";

const itemHeigth = 48;
const itemPaddingTop = 8;
const MenuProps = { PaperProps: { style: { maxHeight: itemHeigth * 4.5 + itemPaddingTop, width: 250 }}};

interface IAvaliarAcompanhamento {
  idAcompanhamento: string,
  idAluno: string,
  tipo: string,
  descricao: string,
  dataCriacao: string
}

export const AvaliarAcompanhamento = () => {
  const infosUsuario = JSON.parse(localStorage.getItem("infoUsuario") || "{}");
  const { getAlunos, alunos } = useContext(AlunoContext);
  const { pegarAcompanhamento, acompanhamento,criarAvaliacao } = useContext(GestorContext)

  useEffect(() => { getAlunos(); pegarAcompanhamento() }, [])

  const [filtroQA, setFiltroQA] = useState<boolean>(false);
  const [filtroFront, setFiltroFront] = useState<boolean>(false);
  const [filtroBack, setFiltroBack] = useState<boolean>(false);

  const filtradoQA = alunos.filter((aluno) => { if(aluno.stack === "QA") return aluno })
  const filtradoFront = alunos.filter((aluno) => { if(aluno.stack === "FRONTEND") return aluno })
  const filtradoBack = alunos.filter((aluno) => { if(aluno.stack === "BACKEND") return aluno })

  const {register,handleSubmit, formState:{errors}} = useForm<IAvaliarAcompanhamento>({
    resolver: yupResolver(CriarAvaliacaoSchema)
  })

  const resetFiltros = () => {
    setFiltroBack(false)
    setFiltroFront(false)
    setFiltroQA(false)
  }

  const avaliarAcompanhamento = (data: IAvaliarAcompanhamento) => {
    if(data.idAcompanhamento === "initial-acompanhamento" || data.idAluno === "initial-aluno" || data.tipo === "initial-status") {
      toast.error("Preencha todos os campos!", toastConfig)
    } else {
      const avaliacao = {idAcompanhamento: parseInt(data.idAcompanhamento),idAluno: parseInt(data.idAluno), tipo: data.tipo, descricao: data.descricao, dataCriacao: data.dataCriacao}
      criarAvaliacao(avaliacao)
    }
  }

  if(infosUsuario.cargo !== "Gestor de Pessoas") return <Navigate to="/"/>

  return (
    <>
      <Header/>

      <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center",justifyContent: "center", height:"calc(100vh - 64px)" }}>
        <Typography id="titulo-body" sx={{textAlign: "center",marginBottom:"20px",fontSize:{ xs:"35px", md:"40px"}, fontWeight:"700",color:"white" }} variant="h3">Avaliar acompanhamento</Typography>
        
        <Box component="form" onSubmit={handleSubmit(avaliarAcompanhamento)} sx={{ display: { xs:"block", md:"flex" }, justifyContent: "space-between", backgroundColor: "#fff", width: { xs:"90%", md:"60%" }, borderRadius: "10px", padding: { xs: 5, md: 5
        }, boxShadow: "10px 10px 10px #2f407ccf", gap: 8 }}>

          <Stack component="div" spacing={3} sx={{ width: { xs:"100%", md:"50%" }, display: "flex", alignItems:{ xs:"start", md:"start" }}}>
            <FormControl variant="filled" sx={{ width: { xs:"100%", md:"100%" }}}>
              <InputLabel id="acompanhamento">Titulo do Acompanhamento</InputLabel>
              <Select MenuProps={MenuProps} labelId="demo-simple-select-filled-label" id="acompanhamento" error={!!errors.idAcompanhamento} {...register("idAcompanhamento")} defaultValue="initial-acompanhamento">
                <MenuItem value="initial-acompanhamento" disabled><em>Selecione o Acompanhamento</em></MenuItem>  
                {acompanhamento.map((acompanhamentos)=> (
                  <MenuItem id={`acompanhamento-${acompanhamentos.idAcompanhamento}`} key={acompanhamentos.idAcompanhamento} value={acompanhamentos.idAcompanhamento}>{acompanhamentos.titulo}</MenuItem>
                ))}
              </Select>
              {errors.idAcompanhamento && <Typography id="erro-acompanhamento" sx={{fontWeight:"500", display: "inline-block", marginTop: "5px",whiteSpace:"nowrap"}} color="error">{errors.idAcompanhamento.message}</Typography>}
            </FormControl>
            
            <FormControl variant="filled">
              <FormLabel sx={{color:"#1D58F9",fontWeight:"500",marginBottom:"10px"}} id="demo-controlled-radio-buttons-group">Filtrar alunos por trilha</FormLabel>

              <Box sx={{display:"flex", flexWrap: { xs: "wrap", md: "nowrap" }, alignItems: "center", gap:2}}>

                <Box color="primary" sx={{display:"flex",flexDirection:"column", gap:1,color:"#1D58F9"}}>
                  <Stack spacing={2} direction="row">
                    <input type="radio" value="QA" id="qa" name="stack" onClick={() => { 
                      setFiltroQA(true)
                      setFiltroBack(false)
                      setFiltroFront(false)
                    }} />
                    <Typography sx={{fontWeight:"700"}}>QA</Typography>
                  </Stack>
                </Box>

                <Box sx={{display:"flex",flexDirection:"column", gap:1,color:"#1D58F9"}}>
                  <Stack spacing={2} direction="row">
                    <input type="radio" value="BACKEND" id="backend" name="stack" onClick={() => { 
                      setFiltroBack(true) 
                      setFiltroFront(false)
                      setFiltroQA(false)
                    }} />
                    <Typography sx={{fontWeight:"700"}}>Backend</Typography>
                  </Stack>
                </Box>

                <Box sx={{display:"flex",flexDirection:"column", gap:1,color:"#1D58F9"}}>
                  <Stack spacing={2} direction="row">
                    <input type="radio" value="FRONTEND" id="frontend" name="stack" onClick={() => { 
                      setFiltroFront(true) 
                      setFiltroQA(false)
                      setFiltroBack(false)
                    }} />
                    <Typography sx={{fontWeight:"700"}}>Frontend</Typography>
                  </Stack>
                </Box>
                
                <Button id="limpar-filtro" type="button" size="small" variant="contained" onClick={resetFiltros}>Limpar filtros</Button>
              </Box>
            </FormControl>

            <FormControl variant="filled" sx={{ width: { xs:"100%", md:"100%" }}}>
              <InputLabel id="aluno-label">Aluno</InputLabel>
                <Select MenuProps={MenuProps} labelId="demo-simple-select-filled-label" defaultValue="initial-aluno" id="aluno-select" error={!!errors.idAluno} {...register("idAluno")}>
                  <MenuItem value="initial-aluno" disabled><em>Selecione o Aluno</em></MenuItem> 
                  {filtroQA ? filtradoQA.map((aluno) => ( <MenuItem id={`alunos-qa-${aluno.idAluno}`} key={aluno.idAluno} value={aluno.idAluno}>{aluno.nome}</MenuItem> )) 
                  : filtroFront ? filtradoFront.map((aluno) => ( <MenuItem id={`alunos-front-${aluno.idAluno}`} key={aluno.idAluno} value={aluno.idAluno}>{aluno.nome}</MenuItem> )) 
                  : filtroBack ? filtradoBack.map((aluno) => ( <MenuItem id={`alunos-back-${aluno.idAluno}`} key={aluno.idAluno} value={aluno.idAluno}>{aluno.nome}</MenuItem> )) 
                  : alunos.map((aluno) => ( <MenuItem id={`alunos-geral-${aluno.idAluno}`} key={aluno.idAluno} value={aluno.idAluno}>{aluno.nome}</MenuItem> ))
                  }
                </Select>
              {errors.idAluno && <Typography id="erro-aluno" sx={{fontWeight:"500", display: "inline-block", marginTop: "5px"}} color="error">{errors.idAluno.message}</Typography>}
            </FormControl>

            <FormControl variant="filled" sx={{ width: { xs:"100%", md:"100%" } }}>
              <InputLabel id="responsavel">Responsavel</InputLabel>
              <Select labelId="demo-simple-select-filled-label" id="responsavel" value="responsavel">
                <MenuItem value="responsavel">{infosUsuario.nome}</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="filled" sx={{ width: { xs:"100%", md:"100%" }}}>
              <InputLabel id="status">Status</InputLabel>
              <Select labelId="demo-simple-select-filled-label" defaultValue="initial-status" id="status" error={!!errors.tipo} {...register("tipo")}>
                <MenuItem value="initial-status" disabled><em>Selecione o Status</em></MenuItem>
                <MenuItem id="positivo" value="POSITIVO">Positivo</MenuItem>
                <MenuItem id="atencao" value="ATENCAO">Atenção</MenuItem>
              </Select>
              {errors.tipo && <Typography id="erro-status" sx={{fontWeight:"500", display: "inline-block", marginTop: "5px"}} color="error">{errors.tipo.message}</Typography>}
            </FormControl>

          </Stack>

          <Stack component="div" spacing={4} sx={{ width: { xs:"100%", md:"50%" }, display: "flex", alignItems: "end", marginTop:{xs:2,md:0
          }}}>
            <FormControl sx={{ width: { xs:"100%", md:"100%" }}}>
              <TextField id="descricao" error={!!errors.descricao} label="Digite uma descrição" placeholder="Digite uma descrição" multiline variant="filled" {...register("descricao")} />
              {errors.descricao && <Typography id="erro-descricao" sx={{fontWeight:"500", display: "inline-block", marginTop: "5px"}} color="error">{errors.descricao.message}</Typography>}
            </FormControl>

            <FormControl sx={{ width: { xs:"100%", md:"100%" }}}>
              <TextField id="data" error={!!errors.dataCriacao} label="Data inicial" type="date" sx={{ width: "100%" }} InputLabelProps={{ shrink: true }} {...register("dataCriacao")} />
              {errors.dataCriacao && <Typography id="erro-dataCriacao" sx={{fontWeight:"500", display: "inline-block", marginTop: "5px"}} color="error">{errors.dataCriacao.message}</Typography>}
            </FormControl>

            <Button id="botao-avaliar" type="submit" sx={{textTransform: "capitalize", width:{ xs:"20%", md:"150px" },marginTop:{ xs:"10px!important", md:"200px!important" }}} variant="contained">Avaliar</Button>
          </Stack>
        </Box>
      </Box>
    </>
  )
}
