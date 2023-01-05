import { Box } from "@mui/material";

import { usePrograma } from "../../context/Tecnico/ProgramaContext";

import * as Componentes from "../../components";

export const TrilhaPrograma = () => {
  const { mudaDashboard } = usePrograma();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 64px)", paddingTop: "80px", paddingBottom: "50px" }}>
      {!mudaDashboard &&
        <>
          <Componentes.Titulo texto="Trilhas" />
          <Componentes.ListarTrilha />
        </>
      }
      {mudaDashboard &&
        <>
          <Componentes.Titulo texto="Programas" />
          <Componentes.ListarPrograma />
        </>
      }
    </Box>
  )
}
