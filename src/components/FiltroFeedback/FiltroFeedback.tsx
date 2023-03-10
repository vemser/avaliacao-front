import { Autocomplete, Button, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { debounce } from 'lodash';

import { useEffect } from "react";
import { useAluno } from "../../context/Comportamental/AlunoContext";
import { useTrilha } from "../../context/Tecnico/TrilhaContext";
import { useForm, Controller } from "react-hook-form";

import { filtroDebounce } from "../../utils/functions";
import { useAuth } from "../../context/AuthContext";
import { useFeedback } from "../../context/Comportamental/FeedbackContext";
import { usePrograma } from "../../context/Tecnico/ProgramaContext";

interface IFiltro {
  programa: { label: string, id: number } | null,
  nomeAluno: { label: string, id: number } | null,
  trilha: { label: string, id: number } | null,
  situacao: string | null,
  nomeInstrutor: string | null,
}

export const FiltroFeedback = ({ setFiltro }: any) => {
  const { alunosFiltro, pegarAlunoFiltroProgramaTrilhaNome } = useAluno();
  const { pegarTrilha, pegarTrilhaPorPrograma, trilhasPorPrograma } = useTrilha();
  const { usuariosFiltro, pegarUsuariosLoginCargo } = useAuth();
  const { handleSubmit, register, control, reset, watch } = useForm<IFiltro>();
  const { pegarFeedbackFiltros, pegarFeedback } = useFeedback();
  const { programas, pegarProgramaAtivo, pegarProgramaPorNomeAtivo } = usePrograma();

  const watchTodos = watch();

  const filtrarAlunoDebounce = debounce((value, programa, trilha) => {
    if (value) {
      pegarAlunoFiltroProgramaTrilhaNome(programa, trilha, value)
    } else {
      pegarAlunoFiltroProgramaTrilhaNome(programa, trilha);
    }
  }, 500)

  useEffect(() => {
    pegarAlunoFiltroProgramaTrilhaNome(watchTodos.programa ? watchTodos.programa.id : null,
      watchTodos.trilha ? watchTodos.trilha.id : null,
      watchTodos.nomeAluno ? watchTodos.nomeAluno.label : null);
    pegarTrilha();
    pegarUsuariosLoginCargo();
    pegarProgramaAtivo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtrar = async (data: IFiltro) => {
    var string = "";
    if (data.nomeAluno) string += `&nomeAluno=${data.nomeAluno.label.trim()}`;
    if (data.trilha) string += `&trilha=${data.trilha.label.trim()}`;
    if (data.nomeInstrutor) string += `&nomeInstrutor=${data.nomeInstrutor.trim()}`;
    if (data.situacao) string += `&situacao=${data.situacao.trim()}`;
    if (data.programa) string += `&idPrograma=${data.programa.id}`;
    setFiltro(string);
    await pegarFeedbackFiltros(0, 10, string);
  }

  const resetar = async () => {
    reset({
      nomeAluno: null,
      trilha: null,
      nomeInstrutor: null,
      situacao: null
    })
    setFiltro(null);
    await pegarFeedback();
    await pegarAlunoFiltroProgramaTrilhaNome();
    await pegarTrilha();
    await pegarUsuariosLoginCargo();
  }

  useEffect(() => {
    if (watchTodos.programa) {
      pegarAlunoFiltroProgramaTrilhaNome(watchTodos.programa ? watchTodos.programa.id : null,
        watchTodos.trilha ? watchTodos.trilha.id : null,
        watchTodos.nomeAluno ? watchTodos.nomeAluno.label : null);
      pegarTrilhaPorPrograma(watchTodos.programa.id)
    };

    if (!watchTodos.programa) {
      pegarAlunoFiltroProgramaTrilhaNome();
      reset({
        nomeAluno: null,
        trilha: null,
      })
    };

    if (watchTodos.trilha) if (watchTodos.programa) pegarAlunoFiltroProgramaTrilhaNome(watchTodos.programa ? watchTodos.programa.id : null,
      watchTodos.trilha ? watchTodos.trilha.id : null,
      watchTodos.nomeAluno ? watchTodos.nomeAluno.label : null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchTodos.programa, watchTodos.trilha]);

  return (
    <>
      <Controller control={control} name="programa" render={({ field: { onChange } }) => (
        <Autocomplete
          onChange={(event, data) => onChange(data)}
          size="small"
          disablePortal
          id="combo-box-demo"
          onInputChange={(event, value) => {
            filtroDebounce(value, pegarProgramaPorNomeAtivo, pegarProgramaAtivo)
          }}
          value={watchTodos.programa ? { label: watchTodos.programa.label, id: watchTodos.programa.id } : null}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.label === value.label}
          noOptionsText={"Nenhum programa encontrado"}
          options={programas ? programas.elementos.map((programa) => { return { label: programa.nome, id: programa.idPrograma } }) : []}
          renderOption={(props, option) => (<li {...props} key={option.id}>{option.label}</li>)}
          sx={{ minWidth: 200, display: "flex" }}
          renderInput={(params) => <TextField {...params} label="Programa" />}
        />
      )} />

      <Controller control={control} name="trilha" render={({ field: { onChange } }) => (
        <Autocomplete
          onChange={(event, data) => onChange(data)}
          size="small"
          disablePortal
          id="combo-box-demo"
          disabled={!watchTodos.programa ? true : false}
          value={watchTodos.trilha ? watchTodos.trilha : null}
          getOptionLabel={(option) => option.label || ""}
          isOptionEqualToValue={(option, value) => option.label === value.label}
          noOptionsText={"Nenhuma trilha encontrada"}
          options={trilhasPorPrograma ? trilhasPorPrograma.map((trilha) => { return { label: trilha.nome, id: trilha.idTrilha } }) : []}
          renderOption={(props, option) => (<li {...props} key={option.id}>{option.label}</li>)}
          sx={{ minWidth: 200, display: "flex" }}
          renderInput={(params) => <TextField {...params} label="Trilhas" />}
        />
      )} />

      <Controller control={control} name="nomeAluno" render={({ field: { onChange } }) => (
        <Autocomplete
          onChange={(event, data) => onChange(data)}
          size="small"
          disablePortal
          id="combo-box-demo"
          onInputChange={(event, value) => {
            filtrarAlunoDebounce(value, watchTodos.programa ? watchTodos.programa.id : null, watchTodos.trilha ? watchTodos.trilha.id : null)
          }}
          value={watchTodos.nomeAluno ? watchTodos.nomeAluno : null}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.label === value.label}
          noOptionsText={"Nenhum aluno encontrado"}
          options={alunosFiltro ? alunosFiltro.elementos.map((aluno) => { return { label: aluno.nome, id: aluno.idAluno } }) : []}
          renderOption={(props, option) => (<li {...props} key={option.id}>{option.label}</li>)}
          sx={{ minWidth: 200, display: "flex" }}
          renderInput={(params) => <TextField {...params} label="Alunos" />}
        />
      )} />

      <FormControl size="small" sx={{ minWidth: 200, display: "flex" }}>
        <InputLabel id="selectFeedback">Situa????o</InputLabel>
        <Select size="small" label="Situacao" labelId="selectFeedback" value={watchTodos.situacao ? watchTodos.situacao : ""} id="situacao" {...register("situacao")}>
          <MenuItem value="initial-situacao" disabled><em>Selecione uma situa????o</em></MenuItem>
          <MenuItem id="nenhum" value="">Nenhum</MenuItem>
          <MenuItem id="positivo" value="POSITIVO">Positivo</MenuItem>
          <MenuItem id="atencao" value="ATENCAO">Aten????o</MenuItem>
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
          noOptionsText={"Nenhum instrutor encontrado"}
          options={usuariosFiltro ? usuariosFiltro.elementos.map((usuario) => { return { label: usuario.login } }) : []}
          sx={{ minWidth: 200, display: "flex" }}
          renderInput={(params) => <TextField {...params} label="Instrutor" />}
        />
      )} />

      <Button onClick={resetar} variant="outlined" sx={{ width: "auto", display: "flex", textTransform: "capitalize", fontSize: "1rem" }}>Resetar Filtro</Button>

      <Button onClick={handleSubmit(filtrar)} variant="contained" sx={{ width: "auto", display: "flex", textTransform: "capitalize", fontSize: "1rem" }}>Pesquisar</Button>
    </>
  )
}