import { AuthContext } from '../../context/AuthContext';
import React, { useContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { LockReset, PersonPin, ExitToApp } from '@mui/icons-material';
import { Box, Typography, Tooltip, IconButton, Avatar, Menu, MenuItem, ListItemIcon, Divider } from '@mui/material';

export const HeaderConfig: React.FC = () => {
  const { usuarioLogout } = useContext(AuthContext);

  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const infosUsuario = JSON.parse(localStorage.getItem("infoUsuario") || "{}");
  const primeiroNome = infosUsuario.nome.split(" ")[0];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => { setAnchorElUser(event.currentTarget); };
  const handleCloseUserMenu = () => { setAnchorElUser(null); };

  return (
    <>
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
    </>
  )
}
