import { Box, Stack, FormControl, TextField, InputLabel, Select, MenuItem, Button } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BotaoVerde } from '../../components/BotaoVerde/BotaoVerde';
import { Titulo } from '../../components/Titulo/Titulo';

import Input from '@mui/material/Input';
import { IMaskInput } from 'react-imask';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(00) 00000-0000"
        definitions={{
          '#': /[1-9]/,
        }}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  },
);

interface State {
  textmask: string;
}

export const CadastrarCliente = () => {
  const navigate = useNavigate()

  const [values, setValues] = React.useState<State>({
    textmask: '(99) 99999-9999'
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 64px)", paddingTop: "80px", paddingBottom: "50px" }}>
      <Titulo texto="Cadastrar Cliente" />

      <Box component="form" sx={{
        display: "flex", flexDirection: { xs: "column", lg: "row" }, justifyContent: "space-between", backgroundColor: "var(--branco)", width: { xs: "95%", md: "90%", lg: "85%" }, borderRadius: "10px", padding: {
          xs: 3, sm: 5
        }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: { xs: 3, xl: 8 }
      }}>
        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: { xs: "start", md: "start" } }}>

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }}>
            <TextField id="nomeCliente" label="Nome Cliente" placeholder="Digite o nome do cleinte" variant="filled"  />
          </FormControl>

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }}>
            <TextField id="emailCliente" label="Email Cliente" placeholder="Digite o email do cleinte" variant="filled"  />
          </FormControl>

        </Stack>

        <Stack component="div" spacing={3} sx={{ width: { xs: "100%", lg: "50%" }, display: "flex", alignItems: "end" }}>

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }} variant="standard">
            <InputLabel htmlFor="formatted-text-mask-input">Telefone</InputLabel>
            <Input
              value={values.textmask}
              onChange={handleChange}
              name="textmask"
              id="formatted-text-mask-input"
              inputComponent={TextMaskCustom as any}
            />
          </FormControl>

          <FormControl variant="filled" sx={{ width: { xs: "100%", md: "100%" }, marginTop: "32px !important" }}>
            <InputLabel id="selectAluno">Situação</InputLabel>
            <Select labelId="demo-simple-select-filled-label" defaultValue="initial-stack" id="select-trilha" >
              <MenuItem value="initial-stack" disabled><em>Selecione uma situação</em></MenuItem>
              <MenuItem id="ativo" value="ATIVO">Ativo</MenuItem>
              <MenuItem id="inativo" value="INATIVO">Inativo</MenuItem>
            </Select>

          </FormControl>

          <Box sx={{ display: "flex", width: "100%", justifyContent: { xs: "center", lg: "end" }, alignItems: { xs: "center", lg: "end" }, bottom: 0, paddingTop: "20px", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
            <Button onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d " }, textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cancelar</Button>

            <Button variant="contained" color="success" sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cadastrar</Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
