import { Box, Stack, FormControl, TextField, InputLabel, Select, MenuItem, Button } from '@mui/material';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Titulo } from '../../components';

import logo from "../../assets/dbc-logo.webp";
import { useForm } from 'react-hook-form';

import { IEditarReservaAlocacao } from '../../utils/ReservaAlocacaoInterface/ReservaAlocacao';
import { useReservaAlocacao } from '../../context/Alocacao/ReservaAlocacaoContext';

export const EditarReservaAlocacao = () => {

  const {state} = useLocation()

  const {editarReservaAlocacao} = useReservaAlocacao()

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<IEditarReservaAlocacao>({
    defaultValues: {
      descricao: state.descricao
    }
  });

  const editar = (data: IEditarReservaAlocacao) => {
    editarReservaAlocacao(data, state.idReservaAlocacao)
  }

  return (
    <>
      <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "80px", paddingBottom: "50px" }}>
        <Titulo texto="Editar Reserva e Alocação" />

        <Box component="form" onSubmit={handleSubmit(editar)} sx={{
                display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "var(--branco)", width: { xs: "95%", md: "70%", lg: "60%", xl: "50%" }, borderRadius: "10px", padding: {
                    xs: 3, sm: 5
                }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: 3
            }}>

          <img src={logo} alt="Logo DBC" width={150} />

          <Stack component="div" spacing={3} sx={{ width: "100%", display: "flex", alignItems: { xs: "start", md: "start" } }}>

          <FormControl variant="filled" sx={{ width: { xs: "100%", md: "100%" } }}>
            <InputLabel id="selectAluno">Situação</InputLabel>
            <Select labelId="demo-simple-select-filled-label" defaultValue={state.situacao} id="situacao" {...register("situacao")}  >
              <MenuItem value="initial-stack" disabled><em>Selecione uma situação</em></MenuItem>
              <MenuItem id="reservado" value="RESERVADO">Reservado</MenuItem>
              <MenuItem id="alocado" value="ALOCADO">Alocado</MenuItem>
              <MenuItem id="disponivel" value="DISPONIVEL">Disponivel</MenuItem>
              <MenuItem id="cancelado" value="CANCELADO">Cancelado</MenuItem>

            </Select>

          </FormControl>

          <FormControl sx={{ width: { xs: "100%", md: "100%" } }}>
            <TextField
              placeholder="Digite uma descrição"
              multiline
              rows={4}
              sx={{ width: "100%" }}
              id="descricao"
              label="Descrição"
              variant='filled'
              {...register("descricao")}
            />
          </FormControl>

          </Stack>
          <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", bottom: 0, paddingTop: "20px", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
          <Button type="button" onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d " }, textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cancelar</Button>

          <Button type="submit" variant="contained" color="success" sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Salvar</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
