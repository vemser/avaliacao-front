import { Box, Button } from "@mui/material"
import { useNavigate } from "react-router-dom";

import logo from "../../assets/logo-branco.webp";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box component="main" sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100vw", height: "100vh", color: "#fff", flexDirection: "column", gap: 5 }}>
        <img src={logo} alt="Logo DBC" width={150} />
        <h1>Página não encontrada</h1>
        <Button variant="contained" color="error" onClick={() => navigate("/")}>Voltar para tela inicial</Button>
      </Box>
    </>
  );
};
