import { useEffect, useState } from "react";
import React from 'react';

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IMaskInput } from 'react-imask';

import { Titulo } from "../../components/Titulo/Titulo";

import { Box, FormControl, TextField, Stack, Typography, InputLabel, MenuItem, Select, Button } from "@mui/material";

import Autocomplete from '@mui/material/Autocomplete';

import { yupResolver } from "@hookform/resolvers/yup";
import { alunoSchema } from "../../utils/schemas";
import { ICadastroAluno } from "../../utils/interface";

import { useAluno } from "../../context/Comportamental/AlunoContext";
import { toast } from "react-toastify";
import { toastConfig } from "../../utils/toast";

import Input from '@mui/material/Input';

import DeleteIcon from '@mui/icons-material/Delete';
import { useTrilha } from "../../context/Tecnico/TrilhaContext";


const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 }
];

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(00) 00000-0000"
        definitions={{
          '#': /[1-9]/,
        }}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  },
);


interface State {
  textmask: string;
}

export const CadastrarAluno = () => {
  const navigate = useNavigate()
  // const { criarAluno } = useAluno();
  const { pegarTrilha, trilhas } = useTrilha();
  console.log(trilhas)

  useEffect(() => {
    pegarTrilha()
  }, [])

  const [values, setValues] = React.useState<State>({
    textmask: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const [tec, setTec] = useState<string>('')
  const [mostrarTec, setMostrarTec] = useState<string[]>([])

  const { register, handleSubmit, formState: { errors } } = useForm<ICadastroAluno>({
    resolver: yupResolver(alunoSchema)
  });

  const adicionarTecnologia = () => {
    mostrarTec.includes(tec) ? alert("ja existe") : setMostrarTec([...mostrarTec, tec])
    setTec("")
  }

  const cadastroAluno = (data: ICadastroAluno) => {
    // if (data.stack === "initial-stack") {
    //   toast.error("Preencha todos os campos!", toastConfig)
    // } else {
    //   criarAluno(data)
    // }
  };

  // const infosUsuario = JSON.parse(localStorage.getItem("infoUsuario") || "{}");
  // if (infosUsuario.cargo !== "Instrutor" && infosUsuario.cargo !== "Gestor de Pessoas") return <Navigate to="/" />

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 64px)", paddingTop: "80px", paddingBottom: "50px" }}>
      <Titulo texto="Cadastrar Aluno" />

      <Box component="form" onSubmit={handleSubmit(cadastroAluno)} sx={{
        display: "flex", flexDirection: { xs: "column", lg: "row" }, justifyContent: "space-between", backgroundColor: "var(--branco)", width: { xs: "95%", md: "90%", lg: "85%" }, borderRadius: "10px", padding: {
          xs: 3, sm: 5
        }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: { xs: 3, xl: 8 }
      }}>
        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: { xs: "start", md: "start" } }}>

          <FormControl sx={{ width: "100%" }}>
            <TextField id="nomeCompletoAluno" label="Nome Completo" placeholder="Fulano da Silva" variant="filled" error={!!errors.nome}  {...register("nome")} />
            {errors.nome && <Typography id="erro-nomeCompletoAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.nome.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField id="emailAluno" label="E-mail DBC" placeholder="fulano.silva@dbccompany.com.br" variant="filled" {...register("email")} error={!!errors.email} />

            {errors.email && <Typography id="erro-emailAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.email.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }} variant="standard">
            <InputLabel htmlFor="formatted-text-mask-input">Telefone</InputLabel>
            <Input
              value={values.textmask}
              {...register("telefone")}
              onChange={handleChange}
              name="textmask"
              id="telefone"
              inputComponent={TextMaskCustom as any}
            />
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField type="text" label="Cidade" placeholder='Digite sua cidade' id='cidade' variant="filled" {...register("cidade")} />
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField type="text" label="Estado" placeholder='Digite seu estado' id='estado' variant="filled" {...register("estado")} />
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
              {...register("descricao")}
            />
          </FormControl>
        </Stack>

        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: "end" }}>

          <FormControl sx={{ width: { xs: "100%", md: "100%" }, display: "flex", flexDirection: "row", gap: "10px" }}>

            <TextField sx={{ width: "90%" }} type="text" label='Tecnologias' placeholder='Tecnologias' id='tecnologias' value={tec} onChange={(e) => setTec(e.target.value)} variant="outlined" />

            <Button id="botao-adiconar-tecnologia" variant={"contained"} sx={{ width: '10%', fontSize: "20px" }} onClick={adicionarTecnologia}>
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

            {mostrarTec.map((el) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: "center",
                  border: '1px solid #ababab',
                  borderRadius: '15px',
                  p: '10px',
                  height: '30px',
                  gap: '5px'
                }}
              >
                {el}
                <Box sx={{
                  width: '25px',
                  height: '25px',
                  borderRadius: '100%',
                  background: 'red',
                  display: 'flex',
                  justigyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  color: 'white',
                  paddingLeft: '2px'
                }} onClick={() => setMostrarTec(mostrarTec.filter(r => r !== el))} >
                  <DeleteIcon sx={{ fontSize: "20px" }} />
                </Box>

              </Box>

            ))}

          </Box>

          <FormControl variant="filled" sx={{ width: "100%" }}>
            <InputLabel id="selectAluno">Trilha do Aluno</InputLabel>
            <Select labelId="demo-simple-select-filled-label" defaultValue="initial-stack" id="select-trilha" error={!!errors.stack} {...register("stack")}>
              <MenuItem value="initial-stack" disabled><em>Selecione a Trilha</em></MenuItem>
              {trilhas?.elementos.map((trilha) => (
                <MenuItem id={`id-trilha=${trilha.idTrilha}`} value={`${trilha.nome}`}>{trilha.idTrilha} - {trilha.nome}</MenuItem>
              ))}
            </Select>
            {errors.stack && <Typography id="erro-selectAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.stack.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }} >
            <Autocomplete disablePortal id="programa" {...register("programa")} options={top100Films} renderInput={(params) => <TextField {...params} label="Programa" variant="filled" />} />
          </FormControl>

          <FormControl variant="filled" sx={{ width: "100%" }}>
            <InputLabel id="selectAluno">Situação</InputLabel>
            <Select labelId="demo-simple-select-filled-label" defaultValue="initial-stack" id="situacao" {...register("situacao")}>
              <MenuItem value="initial-stack" disabled><em>Selecione uma situação</em></MenuItem>
              <MenuItem id="disponivel" value="DISPONIVEL">Disponível</MenuItem>
              <MenuItem id="reservado" value="RESERVADO">Reservado</MenuItem>
              <MenuItem id="alocado" value="ALOCADO">Alocado</MenuItem>
              <MenuItem id="inativo" value="INATIVO">Inativo</MenuItem>
            </Select>
            {errors.stack && <Typography id="erro-selectAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.stack.message}</Typography>}
          </FormControl>

          <Box sx={{ display: "flex", width: "100%", justifyContent: { xs: "center", lg: "end" }, alignItems: { xs: "center", lg: "end" }, bottom: 0, paddingTop: "20px", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
            <Button type="button" onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d " }, textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cancelar</Button>

            <Button variant="contained" type="submit" color="success" sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cadastrar</Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
