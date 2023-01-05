import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, TablePagination } from '@mui/material';

import * as Components from "../../components";
import { useAtividade } from '../../context/Tecnico/AtividadeContext';

export const ListarAtividade: React.FC = () => {
  const navigate = useNavigate();
  const { atividades, pegarAtividade, pegarAtividadePorId } = useAtividade();
  const [inputFiltro, setInputFiltro] = useState<string>('');

  useEffect(() => {
    pegarAtividade();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const buscarPorFiltro = async (valor: any, pagina: number = 0, tamanho: number = 10) => {
    setInputFiltro(valor);
    if (!isNaN(valor)) {
      await pegarAtividadePorId(valor)
    }
  }

  const resetBuscaAtividade = async () => {
    await pegarAtividade();
  }

  const mudarPagina = async (event: unknown, newPage: number) => {
    if (inputFiltro) {
      await buscarPorFiltro(inputFiltro, newPage);
    } else {
      await pegarAtividade(newPage);
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 64px)", paddingTop: "80px", paddingBottom: "50px" }}>
      <Components.Titulo texto="Atividades" />

      <Box sx={{ width: { xs: "95%", md: "80%" }, backgroundColor: "var(--branco)", borderRadius: "10px", boxShadow: "10px 10px 10px var(--azul</Box>-escuro-dbc)", padding: "20px" }}>

        <Box sx={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
          <Components.CampoBusca label='Nome' buscar={buscarPorFiltro} resetar={resetBuscaAtividade} />
          <Button variant="contained" onClick={() => navigate("/cadastrar-atividade")} sx={{ width: "auto", paddingLeft: "15px", paddingRight: "15px", display: "flex", marginBottom: "10px", textTransform: "capitalize", fontSize: "1rem" }}>Cadastrar Atividade</Button>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%", justifyContent: "center", gap: "2rem", mt: 5 }}>
          {atividades?.elementos.map(item => <Components.CardAtividade key={item.idAtividade} {...item} />)}
        </Box>

        <TablePagination rowsPerPageOptions={[]} component="div" count={atividades ? atividades.totalElementos : 0} rowsPerPage={atividades ? atividades.tamanho : 0} page={atividades ? atividades.pagina : 0} onPageChange={mudarPagina} />
      </Box>
    </Box>
  )
}