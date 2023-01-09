import { useContext, useEffect } from 'react';

import { Box, Stack, FormControl, TextField, InputLabel, MenuItem, Select, Button, Autocomplete } from '@mui/material';

import { Titulo } from '../../components/Titulo/Titulo';

// import logo from "../../assets/dbc-logo.webp";

// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { CadastrarFeedbackSchema } from '../../utils/schemas';

// import { useAluno } from '../../context/Comportamental/AlunoContext';
// import { InstrutorContext } from '../../context/InstrutorContext';
// import { toast } from 'react-toastify';
// import { toastConfig } from '../../utils/toast';

// import { ICadastrarFeedbackForm } from '../../utils/interface';
import { useNavigate } from 'react-router-dom';
import { usePrograma } from '../../context/Tecnico/ProgramaContext';
import { ModuloContext } from '../../context/Tecnico/ModuloContext';
import { useAluno } from '../../context/Comportamental/AlunoContext';
import { useTrilha } from '../../context/Tecnico/TrilhaContext';

// const itemHeigth = 48;
// const itemPaddingTop = 8;
// const MenuProps = { PaperProps: { style: { maxHeight: itemHeigth * 4.5 + itemPaddingTop, width: 250, } } };


export const CadastrarFeedback = () => {
  const navigate = useNavigate();
  const { pegarAluno, alunos } = useAluno();
  const { pegarModulo, modulo } = useContext(ModuloContext);

  useEffect(() => {
    pegarModulo(0, modulo?.totalElementos);
    pegarAluno(0, alunos?.totalElementos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  // const { pegarAluno, alunos } = useAluno();
  // const { cadastrarFeedback } = useContext(InstrutorContext);

  // const [mudaRadio, setMudaRadio] = useState('')
  // const manipulaState = (event: string) => { setMudaRadio(event) }
  // const resetFiltros = () => { setMudaRadio('') }

  // useEffect(() => { pegarAluno(); }, [])

  // const { register, handleSubmit, formState: { errors } } = useForm<ICadastrarFeedbackForm>({
  //   resolver: yupResolver(CadastrarFeedbackSchema)
  // })

  // const cadastrarFeedbacks = (data: ICadastrarFeedbackForm) => {
  //   if (data.idAluno === "initial-aluno" || data.tipo === "initial-status") {
  //     toast.error("Preencha todos os campos!", toastConfig)
  //   } else {
  //     const feedback = { idAluno: parseInt(data.idAluno), descricao: data.descricao, tipo: data.tipo }
  //     cadastrarFeedback(feedback)
  //   }
  // }

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "80px", paddingBottom: "50px" }}>
      <Titulo texto="Cadastrar Feedback" />

      <Box component="form" sx={{
        display: "flex", flexDirection: { xs: "column", lg: "row" }, justifyContent: "space-between", backgroundColor: "var(--branco)", width: { xs: "95%", md: "90%", lg: "85%" }, borderRadius: "10px", padding: {
          xs: 3, sm: 5
        }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: { xs: 3, xl: 8 }
      }}>
        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: { xs: "start", md: "start" } }}>

          <FormControl sx={{ width: "100%" }} >
            <Autocomplete disablePortal id="modulo" isOptionEqualToValue={(option, value) => option.label === value.label} options={modulo ? modulo.elementos.map((modulos) => ({ label: `${modulos.idModulo} - ${modulos.nome}` })) : []} renderInput={(params) => <TextField {...params} label="Módulo" variant="filled" />} />
          </FormControl>

          <FormControl sx={{ width: "100%" }} >
            <Autocomplete disablePortal id="aluno" isOptionEqualToValue={(option, value) => option.label === value.label} options={alunos ? alunos.elementos.map((aluno) => ({ label: `${aluno.idAluno} - ${aluno.nome}` })) : []} renderInput={(params) => <TextField {...params} label="Aluno" variant="filled" />} />
          </FormControl>

          <FormControl variant="filled" sx={{ width: { xs: "100%", md: "100%" } }}>
            <InputLabel id="selectAluno">Situação</InputLabel>
            <Select labelId="demo-simple-select-filled-label" id="select-trilha" >
              <MenuItem value="initial-stack" disabled><em>Selecione a situação do feedback</em></MenuItem>
              <MenuItem id="positivo" value="POSITIVO">Positivo</MenuItem>
              <MenuItem id="atencao" value="ATENCAO">Atenção</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: "end" }}>

          <FormControl sx={{ width: "100%" }}>
            <TextField id="data" label="Data" type="date" sx={{ width: "100%" }} InputLabelProps={{ shrink: true }} />
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField
              placeholder="Digite uma descrição para o feedback"
              multiline
              rows={3}
              sx={{ width: "100%" }}
              id="descricao"
              label="Descrição"
              variant='filled'
            />
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
