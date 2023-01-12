import { Autocomplete, Button, TextField, Select, MenuItem, InputLabel, FormControl, Box } from "@mui/material";
import { useEffect } from "react";
import { useAcompanhamento } from "../../context/Comportamental/AcompanhamentoContext";
import { useAluno } from "../../context/Comportamental/AlunoContext";
import { filtroDebounce } from "../../utils/functions";
import { useForm, Controller } from "react-hook-form";
import { useAvaliacao } from "../../context/Comportamental/AvaliacaoContext";

interface IFiltro {
  tituloAcompanhamento: string,
  nomeAluno: string,
  tipoAvaliacao: string,
}

export const FiltroAvaliacao = () => {
  const { alunos, pegarAluno } = useAluno();
  const { acompanhamentos, pegarAcompanhamentoTitulo, pegarAcompanhamentos } = useAcompanhamento();
  const { pegarAvaliacao } = useAvaliacao();
  const { handleSubmit, register, control, formState: { errors }, reset, watch } = useForm<IFiltro>();

  const watchTodos = watch();

  useEffect(() => {
    pegarAluno(0, 10);
    pegarAcompanhamentos(0, 10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filtrar = async (data: IFiltro) => {
    var string = "";
    if (data.tituloAcompanhamento) string += `&tituloAcompanhamento=${data.tituloAcompanhamento}`;
    if (data.nomeAluno) string += `&nomeAluno=${data.nomeAluno}`;
    if (data.tipoAvaliacao) string += `&tipoAvaliacao=${data.tipoAvaliacao}`;
    await pegarAvaliacao(0, 10, string);
  }

  const resetar = async () => {
    await pegarAluno(0, 10);
    await pegarAcompanhamentos(0, 10);
    await pegarAvaliacao(0, 10);
    reset({
      tituloAcompanhamento: "",
      nomeAluno: "",
      tipoAvaliacao: ""
    })
  }

  return (
    <>
      <Controller control={control} name="tituloAcompanhamento" render={({ field: { onChange } }) => (
        <Autocomplete
          onChange={(event, data) => onChange(data?.label)}
          size="small"
          disablePortal
          id="combo-box-demo"
          onInputChange={(event, value) => {
            filtroDebounce(value, pegarAcompanhamentoTitulo, pegarAcompanhamentos)
          }}
          value={watchTodos.tituloAcompanhamento ? { label: `${watchTodos.tituloAcompanhamento}` } : null}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.label === value.label}
          noOptionsText={""}
          options={acompanhamentos ? acompanhamentos.elementos.map((acompanhamento) => { return { label: acompanhamento.titulo } }) : []}
          sx={{ minWidth: 200, display: "flex" }}
          renderInput={(params) => <TextField {...params} label="Acompanhamento" />}
        />
      )} />

      <Controller control={control} name="nomeAluno" render={({ field: { onChange } }) => (
        <Autocomplete
          onChange={(event, data) => onChange(data?.label)}
          size="small"
          disablePortal
          id="combo-box-demo"
          onInputChange={(event, value) => {
            filtroDebounce(value, pegarAluno, pegarAluno, `&nome=${value}`)
          }}
          value={watchTodos.nomeAluno ? { label: `${watchTodos.nomeAluno}` } : null}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.label === value.label}
          noOptionsText={""}
          options={alunos ? alunos.elementos.map((aluno) => { return { label: aluno.nome } }) : []}
          sx={{ minWidth: 200, display: "flex" }}
          renderInput={(params) => <TextField {...params} label="Alunos" />}
        />
      )} />

      <FormControl size="small" sx={{ minWidth: 200, display: "flex" }}>
        <InputLabel id="selectFeedback">Situação</InputLabel>
        <Select size="small" label="Situacao" labelId="selectFeedback" value={watchTodos.tipoAvaliacao ? watchTodos.tipoAvaliacao : ""} id="situacao" {...register("tipoAvaliacao")}>
          <MenuItem value="initial-situacao" disabled><em>Selecione uma situação</em></MenuItem>
          <MenuItem id="positivo" value="POSITIVO">Positivo</MenuItem>
          <MenuItem id="atencao" value="ATENCAO">Atenção</MenuItem>
        </Select>
      </FormControl>

      <Button onClick={resetar} variant="outlined" sx={{ width: "auto", display: "flex", textTransform: "capitalize", fontSize: "1rem" }}>Resetar Filtro</Button>

      <Button onClick={handleSubmit(filtrar)} variant="contained" sx={{ width: "auto", display: "flex", textTransform: "capitalize", fontSize: "1rem" }}>Pesquisar</Button>
    </>
  )
}