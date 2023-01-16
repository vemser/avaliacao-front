import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Controller, useForm } from 'react-hook-form';

import * as Componentes from '../../components/index';

import { Box, Stack, FormControl, Button, TextField, Typography, Autocomplete } from '@mui/material';

import { ICadastroModulo } from '../../utils/ModuloInterface/Modulo';

import { useTrilha } from '../../context/Tecnico/TrilhaContext';
import { useModulo } from '../../context/Tecnico/ModuloContext';
import { moduloSchema } from '../../utils/schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { filtroDebounce } from '../../utils/functions';

const itemHeigth = 48;
const itemPaddingTop = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: itemHeigth * 4.5 + itemPaddingTop,
      width: 250,
    },
  },
};

export const CadastrarModulo = () => {
  const navigate = useNavigate();
  const { pegarTrilha, trilhas, pegarTrilhaFiltroNome } = useTrilha();
  const { cadastrarModulo } = useModulo();

  useEffect(() => {
    pegarTrilha();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { register, handleSubmit, control, formState: { errors } } = useForm<ICadastroModulo>({
    resolver: yupResolver(moduloSchema)
  });

  const cadastrar = async (data: ICadastroModulo) => {
    await cadastrarModulo(data)
  }

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "60px", paddingBottom: "50px" }}>
      <Componentes.Titulo texto="Cadastrar Módulo" />

      <Box component="form" onSubmit={handleSubmit(cadastrar)} sx={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "var(--branco)", width: { xs: "95%", md: "70%", lg: "60%", xl: "50%" }, borderRadius: "10px", padding: { xs: 3, sm: 5 }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: 3 }}>

        <Stack component="div" spacing={3} sx={{ width: "100%", display: "flex", alignItems: { xs: "start", md: "start" } }}>
          <FormControl sx={{ width: "100%" }}>
            <TextField id="nome-modulo" label="Nome" placeholder="Digite um nome para o módulo" multiline variant="filled" {...register("nome")} />
            {errors.nome && <Typography id="erro-nomeModulo" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.nome.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <Controller control={control} name="trilha" render={({ field: { onChange } }) => (
              <Autocomplete sx={{ width: "100%" }}
                multiple disablePortal id="trilha" noOptionsText="Nenhuma trilha encontrada"
                onInputChange={(event, value) => {
                  filtroDebounce(value, pegarTrilhaFiltroNome, pegarTrilha)
                }}
                onChange={(event, data) => onChange(data?.map(item => { return item.id }))}
                isOptionEqualToValue={(option, value) => option.label === value.label}
                options={trilhas ? trilhas.elementos.map((trilha) => ({ label: trilha.nome, id: trilha.idTrilha })) : []}
                renderOption={(props, option) => (<li {...props} key={option.id}>{option.label}</li>)}
                renderInput={(params) => <TextField {...params} label="Trilha" variant="filled" />} />
            )} />
            {errors.trilha && <Typography id="erro-trilha" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.trilha.message}</Typography>}
          </FormControl>

        </Stack>
        <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", bottom: 0, paddingTop: "20px", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
          <Button type="button" onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d " }, textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cancelar</Button>

          <Button type='submit' variant="contained" color="success" sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cadastrar</Button>
        </Box>
      </Box>
    </Box>
  )
}
