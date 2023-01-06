import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

import { FeedbackContext } from "../../context/Comportamental/FeedbackContext";

import { Box, TablePagination, Button } from "@mui/material";

import * as Components from "../../components";

export const ListarFeedback: React.FC = () => {
  const navigate = useNavigate();
  const { pegarFeedback, feedback } = useContext(FeedbackContext);
  const [inputFiltro, setInputFiltro] = useState<string>('');

  function formatarTexto(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const handleChangePage = async (event: unknown, newPage: number) => {
    if (inputFiltro) {
      filtrarFeedback(inputFiltro, newPage)
    } else {
      await pegarFeedback(newPage);
    }
  };

  const filtrarFeedback = async (valor: any, pagina: number = 0, tamanho: number = 10) => {
    setInputFiltro(valor);

    if (!isNaN(valor)) {
      await pegarFeedback(pagina, tamanho, `&idFeedback=${valor}`)
    } else {
      await pegarFeedback(pagina, tamanho, `&nome=${valor}`);
    }
  }

  const resetarFiltroFeedback = async () => {
    await pegarFeedback();
  }

  useEffect(() => {
    pegarFeedback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: "80px", paddingBottom: "50px" }}>
      <Components.Titulo texto="Feedbacks" />

      <Box sx={{ width: { xs: "95%", md: "80%" }, backgroundColor: "var(--branco)", borderRadius: "10px", boxShadow: "10px 10px 10px var(--azul</Box>-escuro-dbc)", padding: "20px" }}>

        <Box sx={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
          <Components.CampoBusca label='Código ou Nome do Aluno' buscar={filtrarFeedback} resetar={resetarFiltroFeedback} />

          <Button variant="contained" onClick={() => navigate("/cadastrar-vaga")} sx={{ width: "auto", display: "flex", textTransform: "capitalize", fontSize: "1rem" }}>Cadastrar Feedback</Button>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%", justifyContent: "center", gap: "2rem", mt: 5 }}>
          {feedback?.elementos.map(item => <Components.CardFeedback key={item.idFeedBack} {...item} />
          )}
        </Box>

        <TablePagination rowsPerPageOptions={[]} component="div" count={feedback ? feedback.totalElementos : 0} rowsPerPage={feedback ? feedback.tamanho : 0} page={feedback ? feedback.pagina : 0} onPageChange={handleChangePage} />
      </Box>
    </Box>
  )
}