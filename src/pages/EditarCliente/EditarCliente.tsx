import { Box, Stack, FormControl, TextField, InputLabel, Input, Select, MenuItem, Button } from '@mui/material';
import React from 'react'
import { IMaskInput } from 'react-imask';
import { useNavigate } from 'react-router-dom';
import { Titulo } from '../../components';
import { BotaoVerde } from '../../components/BotaoVerde/BotaoVerde';


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

export const EditarCliente = () => {

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
    <>
      <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "calc(100vh - 64px)" }}>
        <Titulo texto="Editar cliente" />

        <Box component="form" sx={{ display: { xs: "block", md: "flex" }, justifyContent: "space-between", backgroundColor: "var(--branco)", width: { xs: "90%", md: "70%" }, borderRadius: "10px", padding: { xs: 5, md: 5 }, boxShadow: "10px 10px 10px var(--azul-escuro-dbc)",gap:"50px" }}>
          <Stack component="div" spacing={3} sx={{ width: { xs: "100%", md: "50%" }, display: "flex", alignItems: { xs: "start", md: "start" } }}>

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }}>
              <TextField id="nomeCliente" label="Nome Cliente" placeholder="Digite o nome do cleinte" variant="filled" focused />
          </FormControl>

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }}>
              <TextField id="emailCliente" label="Email Cliente" placeholder="Digite o email do cleinte" variant="filled" focused />
          </FormControl>  

          </Stack>

          <Stack component="div" spacing={3} sx={{ width: { xs: "100%", md: "50%" }, display: "flex", alignItems: "end", marginTop: { xs: 2, md: 0 } }}>

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

            <FormControl variant="filled" sx={{ width: { xs: "100%", md: "100%" } }}>
              <InputLabel id="selectAluno">Situação</InputLabel>
              <Select labelId="demo-simple-select-filled-label" defaultValue="initial-stack" id="select-trilha" >
                <MenuItem value="initial-stack" disabled><em>Selecione uma situação</em></MenuItem>
                <MenuItem id="ativo" value="ATIVO">Ativo</MenuItem>
                <MenuItem id="inativo" value="INATIVO">Inativo</MenuItem>
              </Select>
             
            </FormControl>

            <Box sx={{display:"flex",alignItems:"end"}}>

              <Button onClick={()=>{navigate(-1)}} variant="contained"  sx={{backgroundColor:"#808080 ",":hover":{backgroundColor:"#5f5d5d "},textTransform: "capitalize", width:{ xs:"15ch", md:"25ch"}}} >Cancelar</Button>

              <BotaoVerde texto="Enviar" />
              
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
