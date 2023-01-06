import React, { useContext, useEffect } from "react";
import { Avatar, Collapse, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";

import { MenuLateralContext } from "../../context/MenuLateralContext";
import { useAuth } from "../../context/AuthContext";

import { ExitToApp, Menu, ThumbUpAlt, School, Event, Source, Terminal, WorkHistory, BusinessCenter, Feed, Settings, ExpandLess, ExpandMore, AssignmentInd, IntegrationInstructions, Group, AutoStories } from "@mui/icons-material";

import logo from '../../assets/dbc-logo.webp';

interface IProps {
  children: React.ReactNode;
}

export const MenuLateral: React.FC<IProps> = ({ children }) => {
  const { usuarioLogout, usuarioLogado, pegarUsuarioLogado } = useAuth();
  const { isOpen, toggleOpen } = useContext(MenuLateralContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const [openTab1, setOpenTab1] = React.useState(false);
  const [openTab2, setOpenTab2] = React.useState(false);
  const [openTab3, setOpenTab3] = React.useState(false);

  const handleClickTab1 = () => {
    setOpenTab1(!openTab1);
  };

  const handleClickTab2 = () => {
    setOpenTab2(!openTab2);
  };

  const handleClickTab3 = () => {
    setOpenTab3(!openTab3);
  };

  useEffect(() => {
    pegarUsuarioLogado();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const infosUsuario = JSON.parse(localStorage.getItem("cargo") || "{}");

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
            height={theme.spacing(32)}
            display="flex"
            flexDirection="column"
            gap="0.5rem"
            alignItems="center"
            justifyContent="center"
            padding="10px"
          >
            <img src={logo} alt="Logo DBC" width={100} style={{ marginBottom: theme.spacing(2) }} />
            <Avatar sx={{ height: theme.spacing(14), width: theme.spacing(14) }} src={`data:image/jpeg;base64,${usuarioLogado.imagem}`}
            />
            <Typography sx={{ width: "100%", padding: "0 2rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textAlign: "center", textTransform: "capitalize" }}>
              <span style={{ fontWeight: "500", userSelect: "none" }}>Olá, </span> <strong style={{ color: "var(--azul-claro-dbc)", userSelect: "none" }}>{usuarioLogado.login.split('.')[0]}</strong>
            </Typography>
          </Box>

          <Divider />

          <Box flex="1">
            <List component="nav">

              {infosUsuario.some((cargo: string) => cargo === "Administrador" || cargo === "Coordenador" || cargo === "Gestão de pessoas" || cargo === "Instrutor") &&
                (<>
                  <ListItemButton onClick={handleClickTab1}>
                    <ListItemIcon>
                      <AssignmentInd sx={{ color: "var(--azul-forte-dbc)" }} />
                    </ListItemIcon>

                    <ListItemText primary="Comportamental" />
                    {openTab1 ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openTab1} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }} onClick={() => { navigate("/alunos") }}>
                        <ListItemIcon>
                          <School sx={{ color: "var(--azul-escuro-dbc)" }} />
                        </ListItemIcon>
                        <ListItemText primary="Alunos" />
                      </ListItemButton>

                      <ListItemButton sx={{ pl: 4 }} onClick={() => { navigate("/feedbacks") }}>
                        <ListItemIcon>
                          <ThumbUpAlt sx={{ color: "var(--azul-escuro-dbc)" }} />
                        </ListItemIcon>
                        <ListItemText primary="Feedbacks" />
                      </ListItemButton>

                      <ListItemButton sx={{ pl: 4 }} onClick={() => { navigate("/acompanhamentos") }}>
                        <ListItemIcon>
                          <Event sx={{ color: "var(--azul-escuro-dbc)" }} />
                        </ListItemIcon>
                        <ListItemText primary="Acompanhamentos" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                </>)}


              {infosUsuario.some((cargo: string) => cargo === "Administrador" || cargo === "Coordenador" || cargo === "Gestão de pessoas" || cargo === "Instrutor") &&
                (<>
                  <ListItemButton onClick={handleClickTab2}>
                    <ListItemIcon>
                      <IntegrationInstructions sx={{ color: "var(--azul-forte-dbc)" }} />
                    </ListItemIcon>
                    <ListItemText primary="Técnico" />
                    {openTab2 ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openTab2} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }} onClick={() => { navigate("/trilhas-e-programas") }}>
                        <ListItemIcon>
                          <Source sx={{ color: "var(--azul-escuro-dbc)" }} />
                        </ListItemIcon>
                        <ListItemText primary="Trilhas e Programas" />
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 4 }} onClick={() => { navigate("/modulos") }}>
                        <ListItemIcon>
                          <Terminal sx={{ color: "var(--azul-escuro-dbc)" }} />
                        </ListItemIcon>
                        <ListItemText primary="Módulos" />
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 4 }} onClick={() => { navigate("/atividades") }}>
                        <ListItemIcon>
                          <AutoStories sx={{ color: "var(--azul-escuro-dbc)" }} />
                        </ListItemIcon>
                        <ListItemText primary="Atividades" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                </>)}

              {infosUsuario.some((cargo: string) => cargo === "Administrador" || cargo === "Coordenador" || cargo === "Gestão de pessoas") &&
                (<>
                  <ListItemButton onClick={handleClickTab3}>
                    <ListItemIcon>
                      <BusinessCenter sx={{ color: "var(--azul-forte-dbc)" }} />
                    </ListItemIcon>
                    <ListItemText primary="Alocação" />
                    {openTab3 ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openTab3} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }} onClick={() => { navigate("/alocacao-reserva") }}>
                        <ListItemIcon>
                          <WorkHistory sx={{ color: "var(--azul-escuro-dbc)" }} />
                        </ListItemIcon>
                        <ListItemText primary="Reserva e Alocação" />
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 4 }} onClick={() => { navigate("/clientes") }}>
                        <ListItemIcon>
                          <Group sx={{ color: "var(--azul-escuro-dbc)" }} />
                        </ListItemIcon>
                        <ListItemText primary="Clientes" />
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 4 }} onClick={() => { navigate("/vagas") }}>
                        <ListItemIcon>
                          <Feed sx={{ color: "var(--azul-escuro-dbc)" }} />
                        </ListItemIcon>
                        <ListItemText primary="Vagas" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                </>)}

              <ListItemButton onClick={() => { navigate("/editar-usuario") }}>
                <ListItemIcon>
                  <Settings sx={{ color: "var(--azul-forte-dbc)" }} />
                </ListItemIcon>
                <ListItemText primary="Configurações" />
              </ListItemButton>

              <ListItemButton onClick={() => { usuarioLogout(); }}>
                <ListItemIcon>
                  <ExitToApp sx={{ color: "var(--azul-forte-dbc)" }} />
                </ListItemIcon>
                <ListItemText primary="Sair" />
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
