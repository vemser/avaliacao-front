import { Autocomplete, Button, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useEffect } from "react";
import { useAcompanhamento } from "../../context/Comportamental/AcompanhamentoContext";
import { useAluno } from "../../context/Comportamental/AlunoContext";
import { filtroDebounce } from "../../utils/functions";
import { useForm, Controller } from "react-hook-form";
import { useAvaliacao } from "../../context/Comportamental/AvaliacaoContext";
import { usePrograma } from "../../context/Tecnico/ProgramaContext";
import { debounce } from 'lodash';

interface IFiltro {
  tituloAcompanhamento: string | null,
  programa: { label: string, id: number } | null,
  nomeAluno: { label: string, id: number } | null,
  tipoAvaliacao: string | null,
}

export const FiltroAvaliacao = ({ setFiltro }: any) => {
  const { alunosFiltro, pegarAlunoFiltroProgramaTrilhaNome } = useAluno();
  const { acompanhamentos, pegarAcompanhamentoTitulo, pegarAcompanhamentos } = useAcompanhamento();
  const { pegarAvaliacao } = useAvaliacao();
  const { programas, pegarProgramaAtivo, pegarProgramaPorNomeAtivo } = usePrograma();
  const { handleSubmit, register, control, reset, watch } = useForm<IFiltro>();

  const watchTodos = watch();

  useEffect(() => {
    pegarAlunoFiltroProgramaTrilhaNome(watchTodos.programa ? watchTodos.programa.id : null, null, watchTodos.nomeAluno ? watchTodos.nomeAluno.label : null);
    pegarAcompanhamentos();
    pegarProgramaAtivo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filtrar = async (data: IFiltro) => {
    var string = "";
    if (data.tituloAcompanhamento) string += `&tituloAcompanhamento=${data.tituloAcompanhamento.trim()}`;
    if (data.nomeAluno) string += `&nomeAluno=${data.nomeAluno.label.trim()}`;
    if (data.tipoAvaliacao) string += `&tipoAvaliacao=${data.tipoAvaliacao.trim()}`;
    if (data.programa) string += `&idPrograma=${data.programa.id}`;
    setFiltro(string);
    await pegarAvaliacao(0, 10, string);
  }

  const resetar = async () => {
    reset({
      programa: null,
      tituloAcompanhamento: null,
      nomeAluno: null,
      tipoAvaliacao: null,
    })
    setFiltro(null);
    await pegarAlunoFiltroProgramaTrilhaNome();
    await pegarAcompanhamentos();
    await pegarAvaliacao();
  }

  const filtrarAlunoDebounce = debounce((value, programa) => {
    if (value) {
      pegarAlunoFiltroProgramaTrilhaNome(programa, null, value)
    } else {
      pegarAlunoFiltroProgramaTrilhaNome(programa, null);
    }
  }, 500)

  useEffect(() => {
    if (watchTodos.programa) pegarAlunoFiltroProgramaTrilhaNome(watchTodos.programa ? watchTodos.programa.id : null, null, watchTodos.nomeAluno ? watchTodos.nomeAluno.label : null);
    if (!watchTodos.programa) pegarAlunoFiltroProgramaTrilhaNome(null, null, watchTodos.nomeAluno ? watchTodos.nomeAluno.label : null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchTodos.programa]);

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
          noOptionsText={""}
          options={programas ? programas.elementos.map((programa) => { return { label: programa.nome, id: programa.idPrograma } }) : []}
          renderOption={(props, option) => (<li {...props} key={option.id}>{option.label}</li>)}
          sx={{ minWidth: 200, display: "flex" }}
          renderInput={(params) => <TextField {...params} label="Programa" />}
        />
      )} />

      <Controller control={control} name="nomeAluno" render={({ field: { onChange } }) => (
        <Autocomplete
          onChange={(event, data) => onChange(data)}
          size="small"
          disablePortal
          id="combo-box-demo"
          onInputChange={(event, value) => {
            filtrarAlunoDebounce(value, watchTodos.programa ? watchTodos.programa.id : null)
          }}
          value={watchTodos.nomeAluno ? { label: watchTodos.nomeAluno.label, id: watchTodos.nomeAluno.id } : null}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.label === value.label}
          noOptionsText={""}
          renderOption={(props, option) => (<li {...props} key={option.id}>{option.label}</li>)}
          options={alunosFiltro ? alunosFiltro.elementos.map((aluno) => { return { label: aluno.nome, id: aluno.idAluno } }) : []}
          sx={{ minWidth: 200, display: "flex" }}
          renderInput={(params) => <TextField {...params} label="Alunos" />}
        />
      )} />

      <FormControl size="small" sx={{ minWidth: 200, display: "flex" }}>
        <InputLabel id="selectFeedback">Situação</InputLabel>
        <Select size="small" label="Situacao" labelId="selectFeedback" value={watchTodos.tipoAvaliacao ? watchTodos.tipoAvaliacao : ""} id="situacao" {...register("tipoAvaliacao")}>
          <MenuItem value="initial-situacao" disabled><em>Selecione uma situação</em></MenuItem>
          <MenuItem id="nenhum" value="">Nenhum</MenuItem>
          <MenuItem id="positivo" value="POSITIVO">Positivo</MenuItem>
          <MenuItem id="atencao" value="ATENCAO">Atenção</MenuItem>
        </Select>
      </FormControl>

      <Button onClick={resetar} variant="outlined" sx={{ width: "auto", display: "flex", textTransform: "capitalize", fontSize: "1rem" }}>Resetar Filtro</Button>

      <Button onClick={handleSubmit(filtrar)} variant="contained" sx={{ width: "auto", display: "flex", textTransform: "capitalize", fontSize: "1rem" }}>Pesquisar</Button>
    </>
  )
}