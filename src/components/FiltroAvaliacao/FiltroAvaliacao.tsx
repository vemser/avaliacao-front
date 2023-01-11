import { Autocomplete, Button, TextField, Select, MenuItem, InputLabel, FormControl, Box } from "@mui/material";
import { useEffect } from "react";
import { useAcompanhamento } from "../../context/Comportamental/AcompanhamentoContext";
import { useAluno } from "../../context/Comportamental/AlunoContext";
import { filtroDebounce } from "../../utils/functions";
import { useForm, Controller } from "react-hook-form";

export const FiltroAvaliacao = () => {
  const { alunos, pegarAluno } = useAluno();
  const { acompanhamentos, pegarAcompanhamentoTitulo, pegarAcompanhamentos } = useAcompanhamento();
  const { handleSubmit, register, control, formState: { errors }, reset } = useForm<any>();

  useEffect(() => {
    pegarAluno(0, 10);
    pegarAcompanhamentos(0, 10)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filtrar = async (data: any) => {
    var seila = "";
    if (data.acompanhamento) seila += `&tituloAcompanhamento=${data.acompanhamento}`;
    if (data.aluno) seila += `&nomeAluno=${data.aluno}`;
    if (data.situacao) seila += `&tipoAvaliacao=${data.situacao}`;
    console.log(seila)
  }

  const resetar = () => {
    reset({
      acompanhamentos: "",
      aluno: null,
      situacao: ""
    })
  }

  return (
    <>
      <Controller control={control} name="acompanhamento" render={({ field: { onChange } }) => (
        <Autocomplete
          onChange={(event, data) => onChange(data?.id)}
          size="small"
          disablePortal
          id="combo-box-demo"
          onInputChange={(event, value) => {
            filtroDebounce(value, pegarAcompanhamentoTitulo, pegarAcompanhamentos)
          }}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.label === value.label}
          noOptionsText={""}
          options={acompanhamentos ? acompanhamentos.elementos.map((acompanhamento) => { return { label: acompanhamento.titulo, id: acompanhamento.idAcompanhamento } }) : []}
          sx={{ minWidth: 200, display: "flex" }}
          renderInput={(params) => <TextField {...params} label="Acompanhamento" />}
        />
      )} />

      <Controller control={control} name="aluno" render={({ field: { onChange } }) => (
        <Autocomplete
          onChange={(event, data) => onChange(data?.id)}
          size="small"
          disablePortal
          id="combo-box-demo"
          onInputChange={(event, value) => {
            filtroDebounce(value, pegarAluno, pegarAluno, `&nome=${value}`)
          }}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.label === value.label}
          noOptionsText={""}
          options={alunos ? alunos.elementos.map((aluno) => { return { label: aluno.nome, id: aluno.idAluno } }) : []}
          sx={{ minWidth: 200, display: "flex" }}
          renderInput={(params) => <TextField {...params} label="Alunos" />}
        />
      )} />

      <FormControl size="small" sx={{ minWidth: 200, display: "flex" }}>
        <InputLabel id="selectFeedback">Situação</InputLabel>
        <Select size="small" label="Situacao" labelId="selectFeedback" defaultValue="" id="situacao" {...register("situacao")}>
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