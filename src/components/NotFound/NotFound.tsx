import { Box, Button } from "@mui/material"
import { useNavigate } from "react-router-dom";

import logo from "../../assets/logo-branco.webp";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box component="main" sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100vw", height: "100vh", color: "var(--branco)", flexDirection: "column", gap: 5 }}>
      <img src={logo} alt="Logo DBC" width={220} />
      <h1 style={{ userSelect: "none", fontWeight: 600, fontSize: "1.9rem" }}>Página não encontrada</h1>
      <Button variant="contained" color="success" sx={{ textTransform: "none", fontSize: "1.1rem", width: "160px", fontWeight: 600 }} onClick={() => navigate(-1)}>Voltar</Button>
    </Box>
  );
};
