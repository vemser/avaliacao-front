import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, TablePagination, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

import * as Components from "../../components";
import { useAtividade } from '../../context/Tecnico/AtividadeContext';
import { useAuth } from '../../context/AuthContext';

export const ListarAtividadeAluno: React.FC = () => {
  const navigate = useNavigate();
  const { usuarioLogado } = useAuth();
  const { atividades, pegarAtividade, pegarAtividadePorId } = useAtividade();
  const [inputFiltro, setInputFiltro] = useState<string>('');

  useEffect(() => {
    pegarAtividade();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const buscarPorFiltro = async (valor: any, pagina: number = 0, tamanho: number = 10) => {

  }

  const resetBuscaAtividade = async () => {
  }

  const mudarPagina = async (event: unknown, newPage: number) => {

  }

  function formatarTexto(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "80px", paddingBottom: "50px" }}>
      <Components.Titulo texto={`Atividades do ${formatarTexto(usuarioLogado.login.split(".")[0])}`} />

      <Box sx={{ width: { xs: "95%", md: "80%" }, backgroundColor: "var(--branco)", borderRadius: "10px", boxShadow: "10px 10px 10px var(--azul</Box>-escuro-dbc)", padding: "20px" }}>

        <Box sx={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
          <FormControl variant="outlined" sx={{ width: "250px" }}>
            <InputLabel id="situacaoAtividade">Situação</InputLabel>
            <Select labelId="demo-simple-select-filled-label" label="Situação" defaultValue="PENDENTE" id="atividade-busca">
              <MenuItem value="PENDENTE" disabled><em>Selecione uma opção</em></MenuItem>
              <MenuItem id="ENTREGAR" value="ENTREGAR">ENTREGAR</MenuItem>
              <MenuItem id="PENDENTE" value="PENDENTE">PENDENTE</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%", justifyContent: "center", gap: "2rem", mt: 5 }}>
          <Components.CardAtividadeAluno />
          <Components.CardAtividadeAluno />
          <Components.CardAtividadeAluno />
          <Components.CardAtividadeAluno />
        </Box>

        <TablePagination rowsPerPageOptions={[]} component="div" count={atividades ? atividades.totalElementos : 0} rowsPerPage={atividades ? atividades.tamanho : 0} page={atividades ? atividades.pagina : 0} onPageChange={mudarPagina} />
      </Box >
    </Box >
  )
}