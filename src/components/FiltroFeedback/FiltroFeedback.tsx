import { Autocomplete, Button, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { debounce } from 'lodash';
import { useEffect } from "react";
import { useAluno } from "../../context/Comportamental/AlunoContext";
import { useTrilha } from "../../context/Tecnico/TrilhaContext";
import { filtroDebounce } from "../../utils/functions";

export const FiltroFeedback = () => {
  const { alunos, pegarAluno } = useAluno();
  const { trilhas, pegarTrilhaFiltroNome, pegarTrilha } = useTrilha();

 

  useEffect(() => {
    pegarAluno(0, 3);
    pegarTrilha(0, 3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Autocomplete
        size="small"
        disablePortal
        id="combo-box-demo"
        onInputChange={(event, value) => {
          filtroDebounce(value, pegarAluno,pegarAluno, `&nome=${value}`)
        }}
        noOptionsText={""}
        options={alunos ? alunos.elementos.map((aluno) => { return { label: aluno.nome, id: aluno.idAluno } }) : []}
        sx={{ minWidth: 200, display: "flex" }}
        renderInput={(params) => <TextField {...params} label="Alunos" />}
      />

      <Autocomplete
        size="small"
        disablePortal
        id="combo-box-demo"
        onInputChange={(event, value) => {
          filtroDebounce(value, pegarTrilhaFiltroNome, pegarTrilha)
        }}
        noOptionsText={""}
        options={trilhas ? trilhas.elementos.map((trilha) => { return { label: trilha.nome, id: trilha.idTrilha } }) : []}
        sx={{ minWidth: 200, display: "flex" }}
        renderInput={(params) => <TextField {...params} label="Trilhas" />}
      />

      <FormControl size="small" sx={{ minWidth: 200, display: "flex" }}>
        <InputLabel id="selectFeedback">Situação</InputLabel>
        <Select size="small" label="Situacao" labelId="selectFeedback" defaultValue="" id="situacao">
          <MenuItem value="initial-situacao" disabled><em>Selecione uma situação</em></MenuItem>
          <MenuItem id="positivo" value="POSITIVO">Positivo</MenuItem>
          <MenuItem id="atencao" value="ATENCAO">Atenção</MenuItem>
        </Select>
      </FormControl>

      {/*
      <Autocomplete
        size="small"
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ minWidth: 200, display: "flex" }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />  */}

      <Button variant="outlined" sx={{ width: "auto", display: "flex", textTransform: "capitalize", fontSize: "1rem" }}>Resetar Filtro</Button>

      <Button variant="contained" sx={{ width: "auto", display: "flex", textTransform: "capitalize", fontSize: "1rem" }}>Pesquisar</Button>
    </>
  )
}