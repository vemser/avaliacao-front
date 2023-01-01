import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Titulo } from '../../components/Titulo/Titulo';

import { Box, Stack, FormControl, TextField, Typography, InputLabel, Select, MenuItem, Button, Input } from '@mui/material';
import { Delete } from '@mui/icons-material';

import { IMaskInput } from 'react-imask';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editarAlunoSchema } from '../../utils/schemas';

import { useTrilha } from '../../context/Tecnico/TrilhaContext';
import { usePrograma } from '../../context/Tecnico/ProgramaContext';

import { IAlunosElementos } from '../../utils/AlunoInterface/aluno';

import Autocomplete from '@mui/material/Autocomplete';

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
        mask="(00)00000-0000"
        definitions={{
          '#': /[1-9]/,
        }}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  },
);

const itemHeigth = 48;
const itemPaddingTop = 8;
const MenuProps = { PaperProps: { style: { maxHeight: itemHeigth * 4.5 + itemPaddingTop, width: 250 }}};

interface State {
  textmask: string;
}

export const EditarAluno = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { programas, pegarPrograma } = usePrograma();
  const { trilhas, pegarTrilha } = useTrilha(); 

  useEffect(() => { 
    pegarPrograma();
    pegarTrilha();
  }, []);

  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 }
  ];

  const [values, setValues] = useState<State>({
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

  const adicionarTecnologia = () => {
    mostrarTec.includes(tec) ? alert("ja existe") : setMostrarTec([...mostrarTec, tec])
    setTec("")
  }

  const { register, handleSubmit, formState: { errors } } = useForm<IAlunosElementos>({
    resolver: yupResolver(editarAlunoSchema)
  });

  const editarAlunos = (data: IAlunosElementos) => { console.log('falta endpoint') };

  // const infosUsuario = JSON.parse(localStorage.getItem("infoUsuario") || "{}");
  // if (infosUsuario.cargo !== "Gestor de Pessoas" && infosUsuario.cargo !== "Instrutor") return <Navigate to="/" />

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 64px)", paddingTop: "80px", paddingBottom: "50px" }}>
      <Titulo texto={`Editar ${state.nome}`} />

      <Box component="form" onSubmit={handleSubmit(editarAlunos)} sx={{
        display: "flex", flexDirection: { xs: "column", lg: "row" }, justifyContent: "space-between", backgroundColor: "var(--branco)", width: { xs: "95%", md: "90%", lg: "85%" }, borderRadius: "10px", padding: {
          xs: 3, sm: 5
        }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: { xs: 3, xl: 8 }
      }}>
        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: { xs: "start", md: "start" } }}>

          <FormControl sx={{ width: "100%" }}>
            <TextField id="nomeCompletoAluno" label="Nome Completo" defaultValue={state.nome} placeholder="Fulano da Silva" variant="filled" error={!!errors.nome} {...register("nome")} />
            {errors.nome && <Typography id="erro-nomeCompletoAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.nome.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField id="emailAluno" label="E-mail DBC" defaultValue={state.email} placeholder="fulano.silva@dbccompany.com.br" variant="filled" {...register("email")} error={!!errors.email} />
            {errors.email && <Typography id="erro-emailAluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.email.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <InputLabel htmlFor="formatted-text-mask-input">Telefone</InputLabel>
            <Input defaultValue={state.telefone} value={values.textmask} {...register("telefone")} onChange={handleChange} name="textmask" id="telefone" inputComponent={TextMaskCustom as any} />
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField type="text" label="Cidade" defaultValue={state.cidade} placeholder='Digite a cidade' id='cidade' variant="filled" />
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField type="text" label="Estado" defaultValue={state.estado} placeholder='Digite o estado' id='estado' variant="filled" />
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField defaultValue={state.descricao} placeholder="Digite uma descrição" multiline rows={4} sx={{ width: "100%" }} id="descricao" label="Descrição" variant='filled' />
          </FormControl>
        </Stack>

        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: "end" }}>

          <FormControl sx={{ width: { xs: "100%", md: "100%" }, display: "flex", flexDirection: "row", gap: "10px" }}>
            <TextField sx={{ width: "90%" }} type="text" label='Tecnologias' placeholder='Tecnologias' id='tecnologias' value={tec} onChange={(e) => setTec(e.target.value)} variant="outlined" />

            <Button id="botao-adiconar-tecnologia" variant={"contained"} sx={{ width: '10%', fontSize: "20px" }} onClick={adicionarTecnologia}>
              +
            </Button>
          </FormControl>

          <Box sx={{ border: '1px solid #ababab', borderRadius: '5px', p: '5px', display: 'flex', width: '100%', height: '55px', overflowX: 'auto', alignItems: 'center', gap: '10px' }}>
            {mostrarTec.map((el, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: "center", border: '1px solid #ababab', borderRadius: '15px', p: '10px', height: '30px', gap: '5px' }}>{el}
                <Box sx={{ width: '25px', height: '25px', borderRadius: '100%', background: 'red', display: 'flex', justigyContent: 'center', alignItems: 'center', cursor: 'pointer', color: 'white', paddingLeft: '2px'}} onClick={() => setMostrarTec(mostrarTec.filter(r => r !== el))}>
                  <Delete sx={{ fontSize: "20px" }} />
                </Box>
              </Box>
            ))}
          </Box>

          <FormControl variant="filled" sx={{ width: "100%" }}>
            <InputLabel id="selectAluno">Trilha do Aluno</InputLabel>
            <Select MenuProps={MenuProps} labelId="demo-simple-select-filled-label" defaultValue={state.trilha.idTrilha} id="select-trilha">
              {trilhas?.elementos.map((trilha) => (
                <MenuItem key={trilha.idTrilha} id={`id-trilha=${trilha.idTrilha}`} value={`${trilha.idTrilha}`}>{trilha.idTrilha} - {trilha.nome}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ width: "100%" }} >
            <Autocomplete
              disablePortal
              id="programa"
              options={top100Films}
              renderInput={(params) => <TextField {...params} label="Programa" variant="filled" />}
            />
          </FormControl>

          <FormControl variant="filled" sx={{ width: { xs: "100%", md: "100%" } }}>
            <InputLabel id="selectAluno">Situação</InputLabel>
            <Select labelId="demo-simple-select-filled-label" defaultValue={state.situacao} id="select-situacao">
              <MenuItem id="disponivel" value="DISPONIVEL">Disponível</MenuItem>
              <MenuItem id="reservado" value="RESERVADO">Reservado</MenuItem>
              <MenuItem id="alocado" value="ALOCADO">Alocado</MenuItem>
              <MenuItem id="inativo" value="INATIVO">Inativo</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", width: "100%", justifyContent: { xs: "center", lg: "end" }, alignItems: { xs: "center", lg: "end" }, bottom: 0, paddingTop: "20px", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
            <Button type="button" onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d" }, textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cancelar</Button>

            <Button type="submit" variant="contained" color="success" sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Salvar</Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}
