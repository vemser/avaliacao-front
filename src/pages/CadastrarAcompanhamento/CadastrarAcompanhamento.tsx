import { Box, Typography, Stack, FormControl, TextField, Button, Autocomplete } from "@mui/material";

import * as Componentes from "../../components";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CadastrarAcompanhamentoSchema } from "../../utils/schemas";

import { ICadastrarAcompanhamentoForm } from "../../utils/interface";
import { useNavigate } from "react-router-dom";
import { usePrograma } from "../../context/Tecnico/ProgramaContext";
import { useEffect } from "react";
import { useAcompanhamento } from "../../context/Comportamental/AcompanhamentoContext";

import { filtroDebounce } from "../../utils/functions";

export const CadastrarAcompanhamento = () => {
  const navigate = useNavigate();
  const { programas, pegarProgramaAtivo, pegarProgramaPorNomeAtivo } = usePrograma();
  const { cadastrarAcompanhamento } = useAcompanhamento();

  const { register, handleSubmit, formState: { errors }, control } = useForm<ICadastrarAcompanhamentoForm>({
    resolver: yupResolver(CadastrarAcompanhamentoSchema)
  })

  const cadastrar = (data: ICadastrarAcompanhamentoForm) => { 
    const novoData = { ...data, idPrograma: parseInt(data.idPrograma)}
    cadastrarAcompanhamento(novoData)
  }

  useEffect(() => {
    pegarProgramaAtivo(0, 10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "60px", paddingBottom: "50px" }}>
      <Componentes.Titulo texto="Cadastrar Acompanhamento" />

      <Box component="form" onSubmit={handleSubmit(cadastrar)} sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, justifyContent: "space-between", backgroundColor: "var(--branco)", width: { xs: "95%", md: "90%", lg: "85%" }, borderRadius: "10px", padding: { xs: 3, sm: 5 }, boxShadow: "5px 5px 10px var(--azul-escuro-dbc)", gap: { xs: 3, xl: 8 } }}>

        <Stack component="div" spacing={3} sx={{ width: "100%", display: "flex", alignItems: { xs: "start", md: "start" } }}>
          <FormControl sx={{ width: "100%" }}>
            <TextField id="titulo" error={!!errors.titulo} {...register("titulo")} label='Título do acompanhamento' placeholder="Digite um título" variant="filled" inputProps={{ maxLength: 250 }} />
            {errors.titulo && <Typography id="erro-titulo" sx={{ fontWeight: "500", display: "inline-block", marginTop: "5px" }} color="error">{errors.titulo.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }} >
            <Controller control={control} name="idPrograma" render={({ field: { onChange } }) => (
              <Autocomplete disablePortal id="programa" 
                onChange={(event, data) => onChange(data?.id)} 
                getOptionLabel={(option) => option.label}
                onInputChange={(event, value) => filtroDebounce(value, pegarProgramaPorNomeAtivo, pegarProgramaAtivo )}
                isOptionEqualToValue={(option, value) => option.label === value.label}
                options={programas ? programas.elementos.map((programa) => ({ label: `${programa.nome}`, id: programa.idPrograma })) : []} renderInput={(params) => <TextField {...params} label="Programa" variant="filled"/>} /> 
            )} />
            {errors.idPrograma && <Typography id="erro-programa" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.idPrograma.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField id="descricao" error={!!errors.descricao} label="Digite uma descrição" placeholder="Digite uma descrição" multiline rows={4} variant="filled" {...register("descricao")} inputProps={{ maxLength: 4000 }} />
            {errors.descricao && <Typography id="erro-descricao" sx={{ fontWeight: "500", display: "inline-block", marginTop: "5px" }} color="error">{errors.descricao.message}</Typography>}
          </FormControl>
        </Stack>

        <Stack component="div" spacing={3} sx={{ width: "100%", display: "flex", alignItems: { xs: "start", md: "start" } }}>
          <FormControl sx={{ width: "100%" }}>
            <TextField id="dataInicio" error={!!errors.dataInicio} label="Data inicial" type="date" sx={{ width: "100%" }} InputLabelProps={{ shrink: true }} {...register("dataInicio")} variant="filled" />
            {errors.dataInicio && <Typography id="erro-dataInicio" sx={{ fontWeight: "500", display: "inline-block", marginTop: "5px" }} color="error">{errors.dataInicio.message}</Typography>}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField id="data-final" label="Data final" type="date" sx={{ width: "100%" }} InputLabelProps={{ shrink: true }} {...register("dataFim")} variant="filled" />
          </FormControl>

          <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", bottom: 0, paddingTop: "20px", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
            <Button type="button" onClick={() => { navigate(-1) }} variant="contained" sx={{ backgroundColor: "#808080 ", ":hover": { backgroundColor: "#5f5d5d " }, textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cancelar</Button>

            <Button type="submit" variant="contained" color="success" sx={{ textTransform: "capitalize", fontSize: "1rem", width: { xs: "200px", md: "160px" } }}>Cadastrar</Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}
