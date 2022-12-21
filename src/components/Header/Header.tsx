import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Avatar, Tooltip, MenuItem, Divider, ListItemIcon } from "@mui/material";
import { LockReset, ExitToApp, PersonPin } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

import logo from "../../assets/dbc-logo.webp";

export const Header = () => {
  const { usuarioLogout } = useContext(AuthContext);
  
  const infosUsuario = JSON.parse(localStorage.getItem("infoUsuario") || "{}");
  const primeiroNome = infosUsuario.nome.split(" ")[0];
  const primeiroCargo = infosUsuario.cargo.split(" ")[0].toLowerCase();

  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  // Funções Header
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => { setAnchorElNav(event.currentTarget); };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => { setAnchorElUser(event.currentTarget); };
  const handleCloseNavMenu = () => { setAnchorElNav(null); };
  const handleCloseUserMenu = () => { setAnchorElUser(null); };

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
                <MenuItem id="dashboard-responsivo-admin" onClick={handleCloseNavMenu}>
                  <Typography onClick={() => navigate("/dashboard/admin")} textAlign="center">Dashboard</Typography>
                </MenuItem>
                <Divider />
                <MenuItem id="cadastrar-colaborador-responsivo-admin" onClick={handleCloseNavMenu}>
                  <Typography onClick={() => navigate("/cadastrar-colaborador")} textAlign="center">Cadastrar colaborador</Typography>
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
                <MenuItem id="dashboard-visible-admin" onClick={handleCloseNavMenu}>
                  <Typography onClick={() => navigate("/dashboard/admin")} textAlign="center">Dashboard</Typography>
                </MenuItem>
                <Divider />
                <MenuItem id="cadastrar-colaborador-visible-admin" onClick={handleCloseNavMenu}>
                  <Typography onClick={() => navigate("/cadastrar-colaborador")} textAlign="center">Cadastrar colaborador</Typography>
                </MenuItem>
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center", gap: 2 }}>
              <Typography id="boas-vindas-admin" sx={{ minWidth: 100, fontWeight: 600, color: "#090F27", textDecoration: "underline", display: { xs: "none", md: "flex" } }}>Seja bem-vindo(a) {primeiroNome}!</Typography>
              <Tooltip title="Menu">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar id="menu-avatar-admin" alt="Foto Usuario" src={`data:image/jpeg;base64,${infosUsuario.foto}`} />
                </IconButton>
              </Tooltip>
              <Menu sx={{ mt: "45px" }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: "top", horizontal: "right" }} keepMounted transformOrigin={{ vertical: "top", horizontal: "right" }} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                <MenuItem onClick={() => { handleCloseUserMenu(); navigate("/alterar-senha"); }}>
                  <ListItemIcon>
                    <LockReset fontSize="medium" />
                  </ListItemIcon>
                  <Typography textAlign="center">Trocar senha</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => { handleCloseUserMenu(); navigate("/editar-usuario"); }}>
                  <ListItemIcon>
                    <PersonPin fontSize="medium" />
                  </ListItemIcon>
                  <Typography textAlign="center">Editar</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => { handleCloseUserMenu(); usuarioLogout(); }}>
                  <ListItemIcon>
                    <ExitToApp fontSize="medium" />
                  </ListItemIcon>
                  <Typography textAlign="center">Sair</Typography>
                </MenuItem>
              </Menu>
            </Box>
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
                <MenuItem id="dashboard-responsivo-gestor" onClick={handleCloseNavMenu}>
                  <Typography onClick={() => navigate("/dashboard/gestor")} textAlign="center">Dashboard</Typography>
                </MenuItem>
                <Divider />
                <MenuItem id="lista-acompanhamento-responsivo-gestor" onClick={handleCloseNavMenu}>
                  <Typography onClick={() => navigate("/lista-acompanhamento")} textAlign="center">Lista acompanhamentos</Typography>
                </MenuItem>
                <Divider />
                <MenuItem id="cadastrar-aluno-responsivo-gestor" onClick={handleCloseNavMenu}>
                  <Typography onClick={() => navigate("/cadastrar-aluno")} textAlign="center">Cadastrar aluno</Typography>
                </MenuItem>
                <Divider />
                <MenuItem id="cadastrar-acompanhamento-responsivo-gestor" onClick={handleCloseNavMenu}>
                  <Typography onClick={() => navigate("/cadastrar-acompanhamento")}  textAlign="center">Cadastrar acompanhamento</Typography>
                </MenuItem>
                <Divider />
                <MenuItem id="avaliar-acompanhamento-responsivo-gestor" onClick={handleCloseNavMenu}>
                  <Typography onClick={() => navigate("/avaliar-acompanhamento")}  textAlign="center">Avaliar acompanhamento</Typography>
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
                <MenuItem id="dashboard-visible-gestor" onClick={handleCloseNavMenu}>
                  <Typography onClick={() => navigate("/dashboard/gestor")} textAlign="center">Dashboard</Typography>
                </MenuItem>
                <Divider />
                <MenuItem id="lista-acompanhamento-visible-gestor" onClick={handleCloseNavMenu}>
                  <Typography onClick={() => navigate("/lista-acompanhamento")} textAlign="center">Lista acompanhamentos</Typography>
                </MenuItem>
                <Divider />
                <MenuItem id="cadastrar-aluno-visible-gestor" onClick={handleCloseNavMenu}>
                  <Typography onClick={() => navigate("/cadastrar-aluno")} textAlign="center">Cadastrar aluno</Typography>
                </MenuItem>
                <Divider />
                <MenuItem id="cadastrar-acompanhamento-visible-gestor" onClick={handleCloseNavMenu}>
                  <Typography onClick={() => navigate("/cadastrar-acompanhamento")}  textAlign="center">Cadastrar acompanhamento</Typography>
                </MenuItem>
                <Divider />
                <MenuItem id="avaliar-acompanhamento-visible-gestor" onClick={handleCloseNavMenu}>
                  <Typography onClick={() => navigate("/avaliar-acompanhamento")}  textAlign="center">Avaliar acompanhamento</Typography>
                </MenuItem>
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center", gap: 2 }}>
              <Typography id="boas-vindas-gestor" sx={{ minWidth: 100, fontWeight: 600, color: "#090F27", textDecoration: "underline", display: { xs: "none", md: "flex" } }}>Seja bem-vindo(a) {primeiroNome}!</Typography>
              <Tooltip title="Menu">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar id="menu-avatar-gestor" alt="Foto Usuario" src={`data:image/jpeg;base64,${infosUsuario.foto}`} />
                </IconButton>
              </Tooltip>
              <Menu sx={{ mt: "45px" }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: "top", horizontal: "right" }} keepMounted transformOrigin={{ vertical: "top", horizontal: "right" }} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                <MenuItem onClick={() => { handleCloseUserMenu(); navigate("/alterar-senha"); }}>
                  <ListItemIcon>
                    <LockReset fontSize="medium" />
                  </ListItemIcon>
                  <Typography textAlign="center">Trocar senha</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => { handleCloseUserMenu(); navigate("/editar-usuario"); }}>
                  <ListItemIcon>
                    <PersonPin fontSize="medium" />
                  </ListItemIcon>
                  <Typography textAlign="center">Editar</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => { handleCloseUserMenu(); usuarioLogout(); }}>
                  <ListItemIcon>
                    <ExitToApp fontSize="medium" />
                  </ListItemIcon>
                  <Typography textAlign="center">Sair</Typography>
                </MenuItem>
              </Menu>
            </Box>
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
                <MenuItem id="dashboard-responsivo-instrutor" onClick={handleCloseNavMenu}>
                  <Typography onClick={() => navigate("/dashboard/instrutor")} textAlign="center">Dashboard</Typography>
                </MenuItem>
                <Divider />
                <MenuItem id="dashboard-feedback-responsivo-instrutor" onClick={handleCloseNavMenu}>
                  <Typography onClick={() => navigate("/lista-feedback")} textAlign="center">Lista feedbacks</Typography>
                </MenuItem>
                <Divider />
                <MenuItem id="cadastrar-aluno-responsivo-instrutor" onClick={handleCloseNavMenu}>
                  <Typography onClick={() => navigate("/cadastrar-aluno")} textAlign="center">Cadastrar aluno</Typography>
                </MenuItem>
                <Divider />
                <MenuItem id="cadastrar-feedback-responsivo-instrutor" onClick={handleCloseNavMenu}>
                  <Typography onClick={()=>{navigate("/cadastrar-feedback")}} textAlign="center">Cadastrar feedback</Typography>
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
                <MenuItem id="dashboard-visible-instrutor" onClick={handleCloseNavMenu}>
                  <Typography onClick={() => navigate("/dashboard/instrutor")} textAlign="center">Dashboard</Typography>
                </MenuItem>
                <Divider />
                <MenuItem id="dashboard-feedbacks-visible-instrutor" onClick={handleCloseNavMenu}>
                  <Typography onClick={() => navigate("/lista-feedback")} textAlign="center">Lista feedbacks</Typography>
                </MenuItem>
                <Divider />
                <MenuItem id="cadastrar-aluno-visible-instrutor" onClick={handleCloseNavMenu}>
                  <Typography onClick={() => navigate("/cadastrar-aluno")} textAlign="center">Cadastrar aluno</Typography>
                </MenuItem>
                <Divider />
                <MenuItem id="cadastrar-feedback-visible-instrutor" onClick={handleCloseNavMenu}>
                  <Typography onClick={()=>{navigate("/cadastrar-feedback")}} textAlign="center">Cadastrar feedback</Typography>
                </MenuItem>
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center", gap: 2 }}>
              <Typography id="boas-vindas-instrutor" sx={{ minWidth: 100, fontWeight: 600, color: "#090F27", textDecoration: "underline", display: { xs: "none", md: "flex" } }}>Seja bem-vindo(a) {primeiroNome}!</Typography>
              <Tooltip title="Menu">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar id="menu-avatar-instrutor" alt="Foto Usuario" src={`data:image/jpeg;base64,${infosUsuario.foto}`} />
                </IconButton>
              </Tooltip>
              <Menu sx={{ mt: "45px" }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: "top", horizontal: "right" }} keepMounted transformOrigin={{ vertical: "top", horizontal: "right" }} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                <MenuItem onClick={() => { handleCloseUserMenu(); navigate("/alterar-senha"); }}>
                  <ListItemIcon>
                    <LockReset fontSize="medium" />
                  </ListItemIcon>
                  <Typography textAlign="center">Trocar senha</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => { handleCloseUserMenu(); navigate("/editar-usuario"); }}>
                  <ListItemIcon>
                    <PersonPin fontSize="medium" />
                  </ListItemIcon>
                  <Typography textAlign="center">Editar</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => { handleCloseUserMenu(); usuarioLogout(); }}>
                  <ListItemIcon>
                    <ExitToApp fontSize="medium" />
                  </ListItemIcon>
                  <Typography textAlign="center">Sair</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>
      } 
    </>
  );
};