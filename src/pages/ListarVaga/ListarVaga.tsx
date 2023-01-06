import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, TablePagination } from '@mui/material';

import * as Components from "../../components";
import { useVaga } from '../../context/Alocacao/VagaContext';

export const ListarVaga: React.FC = () => {
  const { pegarVagas, vagas } = useVaga();
  const [inputFiltro, setInputFiltro] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    pegarVagas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtrarVagas = async (valor: any, pagina: number = 0, tamanho: number = 10) => {
    setInputFiltro(valor);

    if (!isNaN(valor)) {
      await pegarVagas(pagina, tamanho, `&idVaga=${valor}`)
    } else {
      await pegarVagas(pagina, tamanho, `&nome=${valor}`);
    }
  }

  const resetBuscaVaga = async () => {
    await pegarVagas();
  }

  const mudarPagina = async (event: unknown, newPage: number) => {
    if (inputFiltro) {
      await filtrarVagas(inputFiltro, newPage);
    } else {
      await pegarVagas(newPage);
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 64px)", paddingTop: "80px", paddingBottom: "50px" }}>
      <Components.Titulo texto="Vagas" />

      <Box sx={{ width: { xs: "95%", md: "80%" }, backgroundColor: "var(--branco)", borderRadius: "10px", boxShadow: "10px 10px 10px var(--azul</Box>-escuro-dbc)", padding: "20px" }}>

        <Box sx={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
          <Components.CampoBusca label='Código ou Nome' buscar={filtrarVagas} resetar={resetBuscaVaga} />

          <Button variant="contained" onClick={() => navigate("/cadastrar-vaga")} sx={{ width: "auto", display: "flex", textTransform: "capitalize", fontSize: "1rem" }}>Cadastrar Vaga</Button>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%", justifyContent: "center", gap: "2rem", mt: 5 }}>
          {vagas?.elementos.map(item => <Components.CardVaga key={item.idVaga} {...item} />
          )}
        </Box>

        <TablePagination rowsPerPageOptions={[]} component="div" count={vagas ? vagas.totalElementos : 0} rowsPerPage={vagas ? vagas.tamanho : 0} page={vagas ? vagas.pagina : 0} onPageChange={mudarPagina} />
      </Box>
    </Box>
  )
}
