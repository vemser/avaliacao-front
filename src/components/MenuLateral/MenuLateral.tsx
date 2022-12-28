import React, { useContext, useEffect } from "react";
import { Avatar, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";

import { MenuLateralContext } from "../../context/MenuLateralContext";
import { useAuth } from "../../context/AuthContext";

// icons
import { Home, ExitToApp, Menu } from "@mui/icons-material";

import logo from '../../assets/dbc-logo.webp';

interface IProps {
  children: React.ReactNode;
}

export const MenuLateral: React.FC<IProps> = ({ children }) => {
  const { usuarioLogout, usuarioLogado, pegarUsuarioLogado } = useAuth()

  const { isOpen, toggleOpen } = useContext(MenuLateralContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    pegarUsuarioLogado()
  }, [])
  

  return (
    <>
      {mdDown && (
        <IconButton onClick={toggleOpen} sx={{ position: "fixed" }}>
          <Menu color="action" fontSize="large" sx={{ color: "black" }} />
        </IconButton>
      )}
      <Drawer
        open={isOpen}
        onClose={toggleOpen}
        variant={mdDown ? "temporary" : "permanent"}
      >
        <Box
          width={theme.spacing(35)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(30)}
            display="flex"
            flexDirection="column"
            gap="0.5rem"
            alignItems="center"
            justifyContent="center"
          >
            <img src={logo} alt="Logo DBC Azul" width={100} style={{ marginBottom: "20px" }} />
            <Avatar sx={{ height: theme.spacing(12), width: theme.spacing(12) }} src={`data:image/jpeg;base64,${usuarioLogado.imagem}`}
            />
            <Typography sx={{ width: "100%", padding: "0 2rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textAlign: "center", textTransform: "capitalize" }}>
              Olá, <strong>{usuarioLogado.login.split('.')[0]}</strong>
            </Typography>
          </Box>

          <Divider />

          <Box flex="1">
            <List component="nav">
              <ListItemButton onClick={() => { navigate("/dashboard/instrutor") }}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Aluno" />
              </ListItemButton>
              <ListItemButton onClick={() => { navigate("/lista-feedback") }}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Feedback" />
              </ListItemButton>
              <ListItemButton onClick={() => { navigate("/lista-acompanhamento") }}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Acompanhamento" />
              </ListItemButton>
              <ListItemButton onClick={() => { navigate("/dashboard/trilha-programa") }}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Trilha/programa" />
              </ListItemButton>
              <ListItemButton onClick={() => { navigate("/lista-modulo") }}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Modulo" />
              </ListItemButton>
              <ListItemButton onClick={() => { navigate("/lista-alocacao-reserva") }}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Reserva e alocação" />
              </ListItemButton>
              <ListItemButton onClick={() => { navigate("/lista-cliente") }}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Cliente" />
              </ListItemButton>
              <ListItemButton onClick={() => { usuarioLogout(); }}>
                <ListItemIcon>
                  <ExitToApp fontSize="medium" />
                </ListItemIcon>
                <Typography textAlign="center">Sair</Typography>
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box minHeight="100vh" marginLeft={mdDown ? 0 : theme.spacing(35)}>
        {children}
      </Box>
    </>
  );
};