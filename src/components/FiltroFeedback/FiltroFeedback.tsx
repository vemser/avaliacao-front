import { Autocomplete, Button, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

import { useEffect } from "react";
import { useAluno } from "../../context/Comportamental/AlunoContext";
import { useTrilha } from "../../context/Tecnico/TrilhaContext";
import { useForm, Controller } from "react-hook-form";

import { filtroDebounce } from "../../utils/functions";
import { useAuth } from "../../context/AuthContext";
import { useFeedback } from "../../context/Comportamental/FeedbackContext";

interface IFiltro {
  idAluno: string | null,
  idTrilha: string | null,
  situacao: string | null,
  nomeInstrutor: string | null,
}

export const FiltroFeedback = () => {
  const { alunos, pegarAluno } = useAluno();
  const { trilhas, pegarTrilhaFiltroNome, pegarTrilha } = useTrilha();
  const { usuariosFiltro, pegarUsuariosLoginCargo } = useAuth();
  const { handleSubmit, register, control, reset, watch } = useForm<IFiltro>();
  const { pegarFeedbackFiltros, pegarFeedback } = useFeedback();

  const watchTodos = watch();

  useEffect(() => {
    pegarAluno(0, 10);
    pegarTrilha(0, 10);
    pegarUsuariosLoginCargo(0, 10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtrar = async (data: IFiltro) => {
    var string = "";
    if (data.idAluno) string += `&nomeAluno=${data.idAluno}`;
    if (data.idTrilha) string += `&trilha=${data.idTrilha}`;
    if (data.nomeInstrutor) string += `&nomeInstrutor=${data.nomeInstrutor}`;
    if (data.situacao) string += `&situacao=${data.situacao}`;
    console.log(string);
    await pegarFeedbackFiltros(0, 10, string);
  }

  const resetar = async () => {
    reset({
      idAluno: null,
      idTrilha: null,
      nomeInstrutor: null,
      situacao: null
    })
    await pegarFeedback();
    await pegarAluno();
    await pegarTrilha();
    await pegarUsuariosLoginCargo();
  }

  return (
    <>
      <Controller control={control} name="idAluno" render={({ field: { onChange } }) => (
        <Autocomplete
          onChange={(event, data) => onChange(data?.label)}
          size="small"
          disablePortal
          id="combo-box-demo"
          onInputChange={(event, value) => {
            filtroDebounce(value, pegarAluno, pegarAluno, `&nome=${value}`)
          }}
          value={watchTodos.idAluno ? { label: `${watchTodos.idAluno}` } : null}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.label === value.label}
          noOptionsText={""}
          options={alunos ? alunos.elementos.map((aluno) => { return { label: aluno.nome } }) : []}
          sx={{ minWidth: 200, display: "flex" }}
          renderInput={(params) => <TextField {...params} label="Alunos" />}
        />
      )} />

      <Controller control={control} name="idTrilha" render={({ field: { onChange } }) => (
        <Autocomplete
          onChange={(event, data) => onChange(data?.label)}
          size="small"
          disablePortal
          id="combo-box-demo"
          onInputChange={(event, value) => {
            filtroDebounce(value, pegarTrilhaFiltroNome, pegarTrilha)
          }}
          value={watchTodos.idTrilha ? { label: `${watchTodos.idTrilha}` } : null}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.label === value.label}
          noOptionsText={""}
          options={trilhas ? trilhas.elementos.map((trilha) => { return { label: trilha.nome } }) : []}
          sx={{ minWidth: 200, display: "flex" }}
          renderInput={(params) => <TextField {...params} label="Trilhas" />}
        />
      )} />

      <FormControl size="small" sx={{ minWidth: 200, display: "flex" }}>
        <InputLabel id="selectFeedback">Situação</InputLabel>
        <Select size="small" label="Situacao" labelId="selectFeedback" value={watchTodos.situacao ? watchTodos.situacao : ""} id="situacao" {...register("situacao")}>
          <MenuItem value="initial-situacao" disabled><em>Selecione uma situação</em></MenuItem>
          <MenuItem id="positivo" value="POSITIVO">Positivo</MenuItem>
          <MenuItem id="atencao" value="ATENCAO">Atenção</MenuItem>
        </Select>
      </FormControl>

      <Controller control={control} name="nomeInstrutor" render={({ field: { onChange } }) => (
        <Autocomplete
          onChange={(event, data) => onChange(data?.label)}
          size="small"
          disablePortal
          id="combo-box-demo"
          onInputChange={(event, value) => {
            filtroDebounce(value, pegarUsuariosLoginCargo, pegarUsuariosLoginCargo, `${value}`)
          }}
          value={watchTodos.nomeInstrutor ? { label: `${watchTodos.nomeInstrutor}` } : null}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.label === value.label}
          noOptionsText={""}
          options={usuariosFiltro ? usuariosFiltro.elementos.map((usuario) => { return { label: usuario.login } }) : []}
          sx={{ minWidth: 200, display: "flex" }}
          renderInput={(params) => <TextField {...params} label="Usuários" />}
        />
      )} />

      <Button onClick={resetar} variant="outlined" sx={{ width: "auto", display: "flex", textTransform: "capitalize", fontSize: "1rem" }}>Resetar Filtro</Button>

      <Button onClick={handleSubmit(filtrar)} variant="contained" sx={{ width: "auto", display: "flex", textTransform: "capitalize", fontSize: "1rem" }}>Pesquisar</Button>
    </>
  )
}