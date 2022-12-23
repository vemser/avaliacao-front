import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Header } from "../../components/Header/Header";
import { BotaoVerde } from "../../components/BotaoVerde/BotaoVerde";
import { Titulo } from "../../components/Titulo/Titulo";

import { Box, FormControl, TextField, Stack, Typography, InputLabel, MenuItem, Select, Avatar, Button } from "@mui/material";

import Autocomplete from '@mui/material/Autocomplete';

import { yupResolver } from "@hookform/resolvers/yup";
import { alunoSchema } from "../../utils/schemas";
import { ICadastroAluno } from "../../utils/interface";

import { AlunoContext } from "../../context/AlunoContext";
import { toast } from "react-toastify";
import { toastConfig } from "../../utils/toast";

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 }
];

export const CadastrarAluno = () => {
  const navigate = useNavigate()
  const { criarAluno } = useContext(AlunoContext)

  const [selectedImage, setSelectedImage] = useState();

  const imageChange = (e: any): void => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const { register, handleSubmit, formState: { errors } } = useForm<ICadastroAluno>({
    resolver: yupResolver(alunoSchema)
  });

  const imagemAPI = new FormData();
  if (selectedImage) {
    imagemAPI.append("file", selectedImage)
  }

  const cadastroAluno = (data: ICadastroAluno) => {
    if (data.stack === "initial-stack") {
      toast.error("Preencha todos os campos!", toastConfig)
    } else {
      criarAluno(data, imagemAPI)
    }
  };

  // const infosUsuario = JSON.parse(localStorage.getItem("infoUsuario") || "{}");
  // if (infosUsuario.cargo !== "Instrutor" && infosUsuario.cargo !== "Gestor de Pessoas") return <Navigate to="/" />

  return (
    <>
      <Header />
      <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "calc(100vh - 64px)" }}>
        <Titulo texto="Cadastrar aluno" />

        <Box component="form" onSubmit={handleSubmit(cadastroAluno)} sx={{ display: { xs: "block", md: "flex" }, justifyContent: "space-between", backgroundColor: "var(--branco)", width: { xs: "90%", md: "70%" }, borderRadius: "10px", padding: { xs: 5, md: 5 }, boxShadow: "10px 10px 10px var(--azul-escuro-dbc)",gap:"50px" }}>
          <Stack component="div" spacing={3} sx={{ width: { xs: "100%", md: "50%" }, display: "flex", alignItems: { xs: "start", md: "start" } }}>

            <FormControl sx={{ width: { xs: "100%", md: "100%" } }}>
              <TextField id="nomeCompletoAluno" label="Nome Completo" placeholder="Fulano da Silva" variant="filled" error={!!errors.nome}  {...register("nome")} focused />
              {errors.nome && <Typography id="erro-nomeCompletoAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.nome.message}</Typography>}
            </FormControl>

            <FormControl sx={{ width: { xs: "100%", md: "100%" } }}>
              <TextField id="emailAluno" label="E-mail DBC" placeholder="fulano.silva@dbccompany.com.br" variant="filled" {...register("email")} error={!!errors.email} focused />

              {errors.email && <Typography id="erro-emailAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.email.message}</Typography>}
            </FormControl>

            <FormControl sx={{ width: { xs: "100%", md: "100%" } }}>
              <TextField type="number" label="Telefone" placeholder='Digite o número de telefone' id='telefone' variant="filled" focused
              />
            </FormControl>

            <FormControl sx={{ width: { xs: "100%", md: "100%" } }}>
              <TextField type="text" label="Cidade" placeholder='Digite sua cidade' id='cidade' variant="filled" focused
              />
            </FormControl>

            <FormControl sx={{ width: { xs: "100%", md: "100%" } }}>
              <TextField type="text" label="Estado" placeholder='Digite seu estado' id='estado' variant="filled" focused
              />
            </FormControl>

            <FormControl sx={{ width: { xs: "100%", md: "100%" } }}>
            <TextField
                placeholder="Digite uma descrição"
                multiline
                rows={3}
                sx={{width: "100%"}}
                id="descricao"
                label="Descrição"
                variant='filled'
                focused
              />
            </FormControl>
          </Stack>

          <Stack component="div" spacing={3} sx={{ width: { xs: "100%", md: "50%" }, display: "flex", alignItems: "end", marginTop: { xs: 2, md: 0 } }}>

          <FormControl sx={{ width: { xs: "100%", md: "100%"},display:"flex",flexDirection:"row",gap:"10px" }}>
            <TextField sx={{width:"90%"}} type="text" label='Tecnologias' placeholder='Tecnologias' id='tecnologias' variant="outlined"/>

            <Button id="botao-adiconar-tecnologia" variant={"contained"} sx={{ width: '10%',fontSize:"20px"}}>
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

          <FormControl variant="filled" sx={{ width: { xs: "100%", md: "100%" } }}>
              <InputLabel id="selectAluno">Trilha do Aluno</InputLabel>
              <Select labelId="demo-simple-select-filled-label" defaultValue="initial-stack" id="select-trilha" error={!!errors.stack}  {...register("stack")}>
                <MenuItem value="initial-stack" disabled><em>Selecione a Trilha</em></MenuItem>
                <MenuItem id="frontend" value="FRONTEND">Front-End</MenuItem>
                <MenuItem id="backend" value="BACKEND">Back-End</MenuItem>
                <MenuItem id="qa" value="QA">Quality Assurance</MenuItem>
              </Select>
              {errors.stack && <Typography id="erro-selectAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.stack.message}</Typography>}
            </FormControl>

            <FormControl sx={{ width: { xs: "100%", md: "100%" }}} >
              <Autocomplete
                disablePortal
                id="programa"
                options={top100Films}
                renderInput={(params) => <TextField {...params} label="Programa"  variant="filled"  />}
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

            <Box sx={{display:"flex",alignItems:"end"}}>

              <Button onClick={()=>{navigate(-1)}} variant="contained"  sx={{backgroundColor:"#808080 ",":hover":{backgroundColor:"#5f5d5d "},textTransform: "capitalize", width:{ xs:"15ch", md:"25ch"}}} >Cancelar</Button>

              <BotaoVerde texto="Enviar" />
              
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
};
