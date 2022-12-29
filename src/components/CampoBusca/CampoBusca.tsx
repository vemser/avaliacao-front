import React, { useState } from 'react'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from '@mui/icons-material/RestartAlt';

interface IProps {
  label: string;
  buscar: (valor: string) => Promise<void>;
  resetar: () => Promise<void>;
}

export const CampoBusca: React.FC<IProps> = ({ buscar, resetar, label }) => {
  const [buscou, setBuscou] = useState<boolean>(false)
  const [search, setSearch] = useState<string | null>(null);

  return (
    <TextField
    id="campo-busca-home"
    variant="outlined"
    label={label}
    sx={{ width: "250px" }}
    value={search ? search : ""}
    onChange={(e) => setSearch(e.target.value)}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          {
            !buscou ?
            <IconButton onClick={() => { if(search) { buscar(search); setBuscou(true) } }}>
              <SearchIcon />
            </IconButton>
            :
            <IconButton onClick={() => { if(search) { resetar(); setBuscou(false) } }}>
              <RestartAltIcon />
            </IconButton>
          }
        </InputAdornment>
      ),
    }}
  />
  )
}
