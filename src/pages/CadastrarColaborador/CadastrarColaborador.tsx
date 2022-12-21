import { useContext, useState } from "react";

import { Navigate } from "react-router-dom";

import { Header } from "../../components/Header/Header";
import { BotaoVerde } from "../../components/BotaoVerde/BotaoVerde";
import { Titulo } from "../../components/Titulo/Titulo";

import { Box, FormControl, TextField, Stack, Typography,  Avatar, Button,FormLabel } from "@mui/material";

import { colaboradorSchema} from "../../utils/schemas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { AdminContext } from "../../context/AdminContext";

interface IColaborador{
  nome: string,
  email: string,
  cargo: string,
}

export const CadastrarColaborador = () => {
  const { criarColaborador } = useContext(AdminContext);

  const [selectedImage, setSelectedImage] = useState();

  const imageChange = (e: any): void => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const {register,handleSubmit, formState:{errors}} = useForm<IColaborador>({
    resolver: yupResolver(colaboradorSchema)
  });

  const imagemAPI = new FormData();
  if(selectedImage) {
    imagemAPI.append("file", selectedImage)
  }

  const cadastroColaborador = (data: IColaborador) => { criarColaborador(data, imagemAPI); };

  const infosUsuario = JSON.parse(localStorage.getItem("infoUsuario") || "{}");
  if(infosUsuario.cargo !== "Admin") return <Navigate to="/"/>

  return (
    <>
      <Header />
      <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center",justifyContent: "center", height:"calc(100vh - 64px)" }}>
        <Titulo texto="Cadastrar colaborador"/>

        <Box component="form" onSubmit={handleSubmit(cadastroColaborador)} sx={{ display: { xs:"block", md:"flex"}, justifyContent: "space-between", backgroundColor: "#fff", width: {xs:"90%",md:"50%"
        }, borderRadius: "10px", padding: { xs: 5, md: 5}, boxShadow: "10px 10px 10px #2f407ccf" }}>

          <Stack component="div" spacing={2} sx={{ width:{ xs:"100%", md:"50%"}, display: "flex", alignItems:{ xs:"start", md:"start"} }}>

            <FormControl sx={{ width: { xs:"100%", md:"100%"} }}>
              <TextField id="nome" {...register("nome")} error={!!errors.nome} label="Nome Completo" placeholder="Fulano da Silva" variant="filled" focused />
              {errors.nome && <Typography id="erro-nome" sx={{fontWeight:"500", display: "flex", marginTop: "5px"}} color="error">{errors.nome.message}</Typography>}
            </FormControl>
            <FormControl sx={{ width:  { xs:"100%", md:"100%" } }}>
              <TextField id="email" error={!!errors.email} {...register("email")} label="E-mail DBC" placeholder="fulano.silva@dbccompany.com.br" variant="filled" focused />
              {errors.email && <Typography id="erro-email" sx={{fontWeight:"500", display: "flex", marginTop: "5px"}} color="error">{errors.email.message}</Typography>}
            </FormControl>

            <FormControl variant="filled">
              <FormLabel sx={{color:"#1D58F9",fontWeight:"500",marginBottom:"10px"}} id="demo-controlled-radio-buttons-group">Selecionar cargo</FormLabel>

              <Box sx={{display:"flex",gap:4}}>
                <Box color="primary" sx={{display:"flex",flexDirection:"column", gap:1,color:"#1D58F9"}}>
                  <Stack spacing={2} direction="row">
                    <input type="radio" value="GESTOR" id="gestor" {...register("cargo")}/>
                    <Typography sx={{fontWeight:"700"}}>Gestor de Pessoas</Typography>
                  </Stack>
                </Box>

                <Box sx={{display:"flex",flexDirection:"column", gap:1,color:"#1D58F9"}}>
                  <Stack spacing={2} direction="row">
                    <input type="radio" value="INSTRUTOR" id="instrutor" {...register("cargo")} />
                    <Typography sx={{fontWeight:"700"}}>Instrutor</Typography>
                  </Stack>
                </Box>
              </Box>
              {errors.cargo && <Typography id="erro-cargo" sx={{fontWeight:"500", display: "inline-block", marginTop: "5px"}} color="error">{errors.cargo.message}</Typography>}

            </FormControl>
            <Typography id="aviso-imagem" variant="body1" sx={{fontWeight:"700", display: "inline-block", marginTop: "10px", paddingBottom: 0, marginBottom: 0, color: "#ff9800"}} >*Imagens são opcionais</Typography>
            <Typography id="aviso-extensao" variant="body1" sx={{fontWeight:"700", display: "inline-block", paddingTop: 0, marginTop: 0, color: "#ff9800"}} >*Só são aceitas imagens com extensão .jpg</Typography>
          </Stack>

          <Stack component="div" spacing={2} sx={{ width: { xs:"100%", md:"50%" }, display: "flex", alignItems: "center",marginTop:{ xs:2, md:0 }}}>
            {selectedImage && <Avatar alt="Foto Enviada" src={URL.createObjectURL(selectedImage)} sx={{ width: 150, height: 150 }} />}
            {!selectedImage && <Avatar alt="Foto Padrao" sx={{ width: 150, height: 150 }} />}

            <Button component="label" variant="contained">
              <input id="imagemAluno" type="file" accept="image/jpeg" hidden onChange={imageChange} />
              <Typography sx={{ textTransform: "capitalize" }} variant="body1">Inserir Foto</Typography>
            </Button>

            <BotaoVerde texto="Enviar"/>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

