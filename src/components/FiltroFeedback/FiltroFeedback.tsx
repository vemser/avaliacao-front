import { Autocomplete, Button, TextField } from "@mui/material";

export const FiltroFeedback = () => {
  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 }]

  return (
    <>
      <Autocomplete
        size="small"
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ minWidth: 200, display: "flex" }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />

      <Autocomplete
        size="small"
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ minWidth: 200, display: "flex" }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />

      <Autocomplete
        size="small"
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ minWidth: 200, display: "flex" }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />

      <Autocomplete
        size="small"
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ minWidth: 200, display: "flex" }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />

      <Button variant="outlined" sx={{ width: "auto", display: "flex", textTransform: "capitalize", fontSize: "1rem" }}>Resetar Filtro</Button>

      <Button variant="contained" sx={{ width: "auto", display: "flex", textTransform: "capitalize", fontSize: "1rem" }}>Pesquisar</Button>
    </>
  )
}