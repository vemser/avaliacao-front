import { Autocomplete, Button, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useEffect } from "react";
import { useAcompanhamento } from "../../context/Comportamental/AcompanhamentoContext";
import { useAluno } from "../../context/Comportamental/AlunoContext";
import { filtroDebounce } from "../../utils/functions";

export const FiltroAvaliacao = () => {
  const { alunos, pegarAluno } = useAluno();

  const {acompanhamentos,pegarAcompanhamentoTitulo,pegarAcompanhamentos} = useAcompanhamento()

  useEffect(() => {
    pegarAluno(0, 3);
    pegarAcompanhamentos(0,3)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>

      <Autocomplete
        size="small"
        disablePortal
        id="combo-box-demo"
        onInputChange={(event, value) => {
          filtroDebounce(value, pegarAcompanhamentoTitulo, pegarAcompanhamentos)
        }}
        noOptionsText={""}
        options={acompanhamentos ? acompanhamentos.elementos.map((acompanhamento) => { return { label: acompanhamento.titulo, id: acompanhamento.idAcompanhamento } }) : []}
        sx={{ minWidth: 200, display: "flex" }}
        renderInput={(params) => <TextField {...params} label="Acompanhamento" />}
      />

      <Autocomplete
        size="small"
        disablePortal
        id="combo-box-demo"
        onInputChange={(event, value) => {
          filtroDebounce(value, pegarAluno, pegarAluno, `&nome=${value}`)
        }}
        noOptionsText={""}
        options={alunos ? alunos.elementos.map((aluno) => { return { label: aluno.nome, id: aluno.idAluno } }) : []}
        sx={{ minWidth: 200, display: "flex" }}
        renderInput={(params) => <TextField {...params} label="Alunos" />}
      />

      <FormControl size="small" sx={{ minWidth: 200, display: "flex" }}>
        <InputLabel id="selectFeedback">Situação</InputLabel>
        <Select size="small" label="Situacao" labelId="selectFeedback" defaultValue="" id="situacao">
          <MenuItem value="initial-situacao" disabled><em>Selecione uma situação</em></MenuItem>
          <MenuItem id="positivo" value="POSITIVO">Positivo</MenuItem>
          <MenuItem id="atencao" value="ATENCAO">Atenção</MenuItem>
        </Select>
      </FormControl>

      <Button variant="outlined" sx={{ width: "auto", display: "flex", textTransform: "capitalize", fontSize: "1rem" }}>Resetar Filtro</Button>

      <Button variant="contained" sx={{ width: "auto", display: "flex", textTransform: "capitalize", fontSize: "1rem" }}>Pesquisar</Button>
    </>
  )
}