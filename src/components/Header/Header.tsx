import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import logo from "../../assets/dbc-logo.webp";
import { HeaderConfig } from "../HeaderConfig/HeaderConfig";

export const Header: React.FC = () => { 
  const infosUsuario = JSON.parse(localStorage.getItem("infoUsuario") || "{}");
  const primeiroCargo = infosUsuario.cargo.split(" ")[0].toLowerCase();

  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  // Funções Header
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => { setAnchorElNav(event.currentTarget); };
  const handleCloseNavMenu = () => { setAnchorElNav(null); };

  return (
    <>
      {/* Header Admin */}
      {primeiroCargo === "admin" && 
      <AppBar position="static" sx={{ backgroundColor: "#f8f8fff8" }}>
        <Box sx={{ padding: "0 50px" }}>
          <Toolbar disableGutters>
            <Box component="div" sx={{ mr: 2, display: { xs: "none", md: "flex" }}}>
              <a href="https://www.dbccompany.com.br/" id="logo-dbc-admin" title="DBC Company" rel="noreferrer" target={"_blank"}><img style={{ cursor: "pointer" }} src={logo} width={80} alt="Logo DBC" /></a>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, color: "#000" }}>
              <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu id="menu-responsivo-admin" anchorEl={anchorElNav} anchorOrigin={{ vertical: "bottom", horizontal: "left" }} keepMounted transformOrigin={{ vertical: "top", horizontal: "left" }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: "block", md: "none" } }}>
                  <MenuItem id="dashboard-responsivo-admin" onClick={() => { handleCloseNavMenu(); navigate("/colaboradores") }}>
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
                <Divider />
                <MenuItem id="cadastrar-colaborador-responsivo-admin" onClick={() => { handleCloseNavMenu(); navigate("/cadastrar-colaborador") } }>
                  <Typography textAlign="center">Cadastrar colaborador</Typography>
                </MenuItem>
              </Menu>
            </Box>

            <Box component="div"
              sx={{ mr: 2, display: { xs: "flex", md: "none" }, flexGrow: 1 }}>
              <a href="https://www.dbccompany.com.br/" id="logo-dbc-admin" title="DBC Company" rel="noreferrer" target={"_blank"}><img style={{ cursor: "pointer" }} src={logo} width={80} alt="Logo DBC" /></a>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, color: "#000" }}>
              <IconButton sx={{ display: "flex", gap: 1 }} size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                <Typography textAlign="center"><strong>Menu</strong></Typography>
                <MenuIcon />
              </IconButton>
              <Menu id="menu-visible-admin" anchorEl={anchorElNav} anchorOrigin={{ vertical: "bottom", horizontal: "left" }} keepMounted transformOrigin={{ vertical: "top", horizontal: "left" }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: "none", md: "flex" } }}>
                <MenuItem id="dashboard-visible-admin" onClick={() => { handleCloseNavMenu(); navigate("/colaboradores") }}>
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
                <Divider />
                <MenuItem id="cadastrar-colaborador-visible-admin" onClick={() => { handleCloseNavMenu(); navigate("/cadastrar-colaborador") }}>
                  <Typography textAlign="center">Cadastrar colaborador</Typography>
                </MenuItem>
              </Menu>
            </Box>

            <HeaderConfig />
          </Toolbar>
        </Box>
      </AppBar>
      }

      {/* Header Gestor */}
      {primeiroCargo === "gestor" && 
      <AppBar position="static" sx={{ backgroundColor: "#f8f8fff8" }}>
        <Box sx={{ padding: "0 50px" }}>
          <Toolbar disableGutters>
            <Box component="div" sx={{ mr: 2, display: { xs: "none", md: "flex" }}}>
              <a href="https://www.dbccompany.com.br/" id="logo-dbc-gestor" title="DBC Company" rel="noreferrer" target={"_blank"}><img style={{ cursor: "pointer" }} src={logo} width={80} alt="Logo DBC" /></a>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, color: "#000" }}>
              <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu id="menu-responsivo-gestor" anchorEl={anchorElNav} anchorOrigin={{ vertical: "bottom", horizontal: "left" }} keepMounted transformOrigin={{ vertical: "top", horizontal: "left" }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: "block", md: "none" } }}>
                <MenuItem id="dashboard-responsivo-gestor" onClick={() => { handleCloseNavMenu(); navigate("/alunos") }}>
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
                <Divider />
                <MenuItem id="lista-acompanhamento-responsivo-gestor" onClick={() => { handleCloseNavMenu(); navigate("/acompanhamentos") }}>
                  <Typography textAlign="center">Lista acompanhamentos</Typography>
                </MenuItem>
                <Divider />
                <MenuItem id="cadastrar-aluno-responsivo-gestor" onClick={() => { handleCloseNavMenu(); navigate("/cadastrar-aluno") }}>
                  <Typography textAlign="center">Cadastrar aluno</Typography>
                </MenuItem>
                <Divider />
                <MenuItem id="cadastrar-acompanhamento-responsivo-gestor" onClick={() => { handleCloseNavMenu(); navigate("/cadastrar-acompanhamento") }}>
                  <Typography textAlign="center">Cadastrar acompanhamento</Typography>
                </MenuItem>
                <Divider />
                <MenuItem id="avaliar-acompanhamento-responsivo-gestor" onClick={() => { handleCloseNavMenu(); navigate("/avaliar-acompanhamento") }}>
                  <Typography textAlign="center">Avaliar acompanhamento</Typography>
                </MenuItem>
              </Menu>
            </Box>

            <Box component="div"
              sx={{ mr: 2, display: { xs: "flex", md: "none" }, flexGrow: 1 }}>
              <a href="https://www.dbccompany.com.br/" id="logo-dbc-gestor" title="DBC Company" rel="noreferrer" target={"_blank"}><img style={{ cursor: "pointer" }} src={logo} width={80} alt="Logo DBC" /></a>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, color: "#000" }}>
              <IconButton sx={{ display: "flex", gap: 1 }} size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                <Typography textAlign="center"><strong>Menu</strong></Typography>
                <MenuIcon />
              </IconButton>
              <Menu id="menu-visible-gestor" anchorEl={anchorElNav} anchorOrigin={{ vertical: "bottom", horizontal: "left" }} keepMounted transformOrigin={{ vertical: "top", horizontal: "left" }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: "none", md: "flex" } }}>
                <MenuItem id="dashboard-visible-gestor" onClick={() => { handleCloseNavMenu(); navigate("/alunos") }}>
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
                <Divider />
                <MenuItem id="lista-acompanhamento-visible-gestor" onClick={() => { handleCloseNavMenu(); navigate("/acompanhamentos") }}>
                  <Typography textAlign="center">Lista acompanhamentos</Typography>
                </MenuItem>
                <Divider />
                <MenuItem id="cadastrar-aluno-visible-gestor" onClick={() => { handleCloseNavMenu();  navigate("/cadastrar-aluno") }}>
                  <Typography textAlign="center">Cadastrar aluno</Typography>
                </MenuItem>
                <Divider />
                <MenuItem id="cadastrar-acompanhamento-visible-gestor" onClick={() => { handleCloseNavMenu(); navigate("/cadastrar-acompanhamento") }}>
                  <Typography textAlign="center">Cadastrar acompanhamento</Typography>
                </MenuItem>
                <Divider />
                <MenuItem id="avaliar-acompanhamento-visible-gestor" onClick={() => { handleCloseNavMenu(); navigate("/avaliar-acompanhamento") }}>
                  <Typography textAlign="center">Avaliar acompanhamento</Typography>
                </MenuItem>
              </Menu>
            </Box>

            <HeaderConfig />
          </Toolbar>
        </Box>
      </AppBar>
      }

      {/* Header Instrutor */}
      {primeiroCargo === "instrutor" && 
      <AppBar position="static" sx={{ backgroundColor: "#f8f8fff8" }}>
        <Box sx={{ padding: "0 50px" }}>
          <Toolbar disableGutters>
            <Box component="div" sx={{ mr: 2, display: { xs: "none", md: "flex" }}}>
              <a href="https://www.dbccompany.com.br/" id="logo-dbc-instrutor" title="DBC Company" rel="noreferrer" target={"_blank"}><img style={{ cursor: "pointer" }} src={logo} width={80} alt="Logo DBC" /></a>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, color: "#000" }}>
              <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu id="menu-responsivo-instrutor" anchorEl={anchorElNav} anchorOrigin={{ vertical: "bottom", horizontal: "left" }} keepMounted transformOrigin={{ vertical: "top", horizontal: "left" }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: "block", md: "none" } }}>
                <MenuItem id="dashboard-responsivo-instrutor" onClick={() => { handleCloseNavMenu(); navigate("/alunos") }}>
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
                <Divider />
                <MenuItem id="dashboard-feedback-responsivo-instrutor" onClick={() => { handleCloseNavMenu(); navigate("/feedbacks") }}>
                  <Typography textAlign="center">Lista feedbacks</Typography>
                </MenuItem>
                <Divider />
                <MenuItem id="cadastrar-aluno-responsivo-instrutor" onClick={() => { handleCloseNavMenu(); navigate("/cadastrar-aluno") }}>
                  <Typography textAlign="center">Cadastrar aluno</Typography>
                </MenuItem>
                <Divider />
                <MenuItem id="cadastrar-feedback-responsivo-instrutor" onClick={() => { handleCloseNavMenu(); navigate("/cadastrar-feedback") }}>
                  <Typography textAlign="center">Cadastrar feedback</Typography>
                </MenuItem>
              </Menu>
            </Box>

            <Box component="div"
              sx={{ mr: 2, display: { xs: "flex", md: "none" }, flexGrow: 1 }}>
              <a href="https://www.dbccompany.com.br/" id="logo-dbc-instrutor" title="DBC Company" rel="noreferrer" target={"_blank"}><img style={{ cursor: "pointer" }} src={logo} width={80} alt="Logo DBC" /></a>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, color: "#000" }}>
              <IconButton sx={{ display: "flex", gap: 1 }} size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
              <Typography textAlign="center"><strong>Menu</strong></Typography>
                <MenuIcon />
              </IconButton>
              <Menu id="menu-visible-instrutor" anchorEl={anchorElNav} anchorOrigin={{ vertical: "bottom", horizontal: "left" }} keepMounted transformOrigin={{ vertical: "top", horizontal: "left" }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: "none", md: "flex" } }}>
                <MenuItem id="dashboard-visible-instrutor" onClick={() => { handleCloseNavMenu(); navigate("/alunos") }}>
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
                <Divider />
                <MenuItem id="dashboard-feedbacks-visible-instrutor" onClick={() => { handleCloseNavMenu(); navigate("/feedbacks") }}>
                  <Typography textAlign="center">Lista feedbacks</Typography>
                </MenuItem>
                <Divider />
                <MenuItem id="cadastrar-aluno-visible-instrutor" onClick={() => { handleCloseNavMenu(); navigate("/cadastrar-aluno") }}>
                  <Typography textAlign="center">Cadastrar aluno</Typography>
                </MenuItem>
                <Divider />
                <MenuItem id="cadastrar-feedback-visible-instrutor" onClick={() => { handleCloseNavMenu(); navigate("/cadastrar-feedback") }}>
                  <Typography textAlign="center">Cadastrar feedback</Typography>
                </MenuItem>
              </Menu>
            </Box>

            <HeaderConfig />
          </Toolbar>
        </Box>
      </AppBar>
      } 
    </>
  );
};