import { Box, Stack, FormControl, TextField, Button, InputLabel, Select, MenuItem, Typography, OutlinedInput } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { Titulo } from '../../components/Titulo/Titulo';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModulo } from '../../context/Tecnico/ModuloContext';
import { usePrograma } from '../../context/Tecnico/ProgramaContext';
import { useAtividade } from '../../context/Tecnico/AtividadeContext';
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAluno } from '../../context/Comportamental/AlunoContext';
import { atividadeSchema } from '../../utils/schemas';
import { IAtividadeForm } from '../../utils/AtividadeInterface/AtividadeInterface';
import { IProgramas } from '../../utils/programaInterface';

const itemHeigth = 48;
const itemPaddingTop = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: itemHeigth * 4.5 + itemPaddingTop,
      width: 250,
    },
  },
};

export const CadastrarAtividade = () => {
  const navigate = useNavigate();
  const { cadastrarAtividade } = useAtividade();
  const { pegarModulo, modulo } = useModulo();
  const { pegarProgramaAtivo, programas } = usePrograma();
  const { pegarAluno, alunos } = useAluno();
  const { usuarioLogado } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<IAtividadeForm>({ resolver: yupResolver(atividadeSchema) });
  const [moduloSelecionado, setModuloSelecionado] = useState<number[]>([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState<number[]>([]);
  const [erroModulos, setErroModulos] = useState<boolean>(false);
  const [erroAlunos, setErroAlunos] = useState<boolean>(false);

  const cadastrar = async (data: IAtividadeForm) => {
    if (alunoSelecionado.length > 0 && moduloSelecionado.length > 0) {
      await cadastrarAtividade({ ...data, modulos: moduloSelecionado, alunos: alunoSelecionado, nomeInstrutor: usuarioLogado.login.split('.')[0] });
    }
  }

  const mudaModulo = (event: any) => {
    setErroModulos(false);
    const {
      target: { value },
    } = event;
    if (!(typeof value === 'number')) {
      setModuloSelecionado(
        value
      );
    }
  };

  const checarErroAluno = () => {
    if (alunoSelecionado.length > 0) {
      setErroAlunos(false)
    } else {
      setErroAlunos(true)
    }
  }

  const checarErroModulo = () => {
    if (moduloSelecionado.length > 0) {
      setErroModulos(false)
    } else {
      setErroModulos(true)
    }
  }

  const mudaAluno = (event: any) => {
    setErroAlunos(false);
    const {
      target: { value },
    } = event;
    if (!(typeof value === 'number')) {
      setAlunoSelecionado(
        value
      );
    }
  };

  useEffect(() => {
    pegarModulo(0, modulo?.totalElementos);
    pegarProgramaAtivo(0, programas?.totalElementos);
    pegarAluno(0, alunos?.totalElementos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "60px", paddingBottom: "50px" }}>
      <Titulo texto="Cadastrar Atividade" />

      <Box component="form" onSubmit={handleSubmit(cadastrar)} sx={{
        display: "flex", flexDirection: { xs: "column", lg: "row" }, justifyContent: "space-between", backgroundColor: "var(--branco)", width: { xs: "95%", md: "90%" }, borderRadius: "10px", padding: {
          xs: 3, sm: 5
        }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: { xs: 3, xl: 8 }
      }}>
        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: { xs: "start", md: "start" } }}>

          <FormControl sx={{ width: "100%" }}>
            <TextField id="titulo-atividade" label="T??tulo" placeholder="Digite um t??tulo para a atividade" variant="filled" {...register("titulo")} />
            {errors.titulo && <Typography id="erro-nome-programa" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.titulo.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }} variant="filled">
            <InputLabel id="programas-list">Programa</InputLabel>
            <Select MenuProps={MenuProps} {...register("idPrograma")} defaultValue="" label="Programas" labelId="demo-simple-select-filled-label" id="aluno" >
              <MenuItem value="initial-programa" disabled><em>Selecione um programa</em></MenuItem>
              {programas?.elementos.map((programas: IProgramas) =>
                <MenuItem key={programas.idPrograma} id={`${programas.idPrograma}`} value={programas.idPrograma}>{programas.nome}</MenuItem>
              )}
            </Select>
            {errors.idPrograma && <Typography id="erro-nome-programa" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.idPrograma.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="select-modulo">M??dulo</InputLabel>
            <Select
              MenuProps={MenuProps}
              id="select-modulo"
              multiple
              value={moduloSelecionado}
              onChange={mudaModulo}
              input={<OutlinedInput label="M??dulos" />}
              renderValue={(selected) => modulo?.elementos.filter((modulo) => selected.includes(modulo.idModulo)).map((modulo) => modulo.nome).join(', ')}
            >
              <MenuItem value="initial-modulo" disabled><em>Selecione um ou mais m??dulos</em></MenuItem>
              {modulo?.elementos.map((modulo) => (
                <MenuItem key={modulo.idModulo} value={modulo.idModulo}>
                  <Checkbox checked={moduloSelecionado.indexOf(modulo.idModulo) > -1} />
                  <ListItemText primary={modulo.nome} />
                </MenuItem>
              ))}
            </Select>
            {erroModulos && <Typography id="erro-nome-modulo" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">Por favor, selecione um M??dulo</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField
              placeholder="Digite uma descri????o para a atividade"
              multiline
              rows={4}
              sx={{ width: "100%" }}
              id="descricao"
              label="Descri????o"
              variant='filled'
              {...register("descricao")}
            />
          </FormControl>
          {errors.descricao && <Typography id="erro-nome-programa" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.descricao.message}</Typography>}
        </Stack>

        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: "end" }}>

          <FormControl sx={{ width: "100%" }}>
            <TextField type="number" label="Peso" placeholder='Digite o peso da atividade' id='peso' variant="filled" {...register("pesoAtividade")} />
            {errors.pesoAtividade && <Typography id="erro-nome-programa" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.pesoAtividade.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }} >
            <InputLabel id="select-alunos">Alunos</InputLabel>
            <Select
              id="select-alunos"
              multiple
              value={alunoSelecionado}
              onChange={mudaAluno}
              input={<OutlinedInput label="Alunos" />}
              renderValue={(selected) => alunos?.elementos.filter((alunos) => selected.includes(alunos.idAluno)).map((alunos) => alunos.nome).join(', ')}
            >
              <MenuItem value="initial-aluno" disabled><em>Selecione um ou mais alunos</em></MenuItem>
              {alunos?.elementos.map((alunos) => (
                <MenuItem key={alunos.idAluno} value={alunos.idAluno}>
                  <Checkbox checked={alunoSelecionado.indexOf(alunos.idAluno) > -1} />
                  <ListItemText primary={alunos.nome} />
                </MenuItem>
              ))}
            </Select>
            {erroAlunos && <Typography id="erro-nome-aluno" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">Por favor, selecione um Aluno</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField type="datetime-local" label="Prazo de entrega"
              placeholder='Digite uma data de entrega' id='data-entrega' variant="filled" InputLabelProps={{ shrink: true }} {...register("dataEntrega")} />
            {errors.dataEntrega && <Typography id="erro-nome-programa" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.dataEntrega.message}</Typography>}
          </FormControl>

          <Box sx={{ display: "flex", width: "100%", justifyContent: { xs: "center", lg: "end" }, alignItems: { xs: "center", lg: "end" }, bottom: 0, paddingTop: "20px", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
            <Button type="button" onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d " }, textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cancelar</Button>

            <Button type="submit" onClick={() => { checarErroModulo(); checarErroAluno() }} variant="contained" color="success" sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cadastrar</Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}
