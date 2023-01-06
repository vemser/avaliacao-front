import React, { useState } from 'react'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface IProps {
  label: string;
  buscar: (valor: string) => Promise<void>;
  resetar: () => Promise<void>;
}

export const CampoBusca: React.FC<IProps> = ({ buscar, label, resetar }) => {
  const [search, setSearch] = useState<string | null>(null);
  const [buscou, setBuscou] = useState<boolean>(false);
 
  const handleKeyPress = (event: any) => {
    if (event.charCode === 13) {
      if(search) { buscar(search); setBuscou(true) };
    }
  }

  return (
    <TextField
    id="campo-busca-home"
    variant="outlined"
    label={label}
    sx={{ width: "250px" }}
    size="small"
    value={search ? search : ""}
    onKeyPress={handleKeyPress}
    onChange={(e) => { 
      setSearch(e.target.value);
      if(e.target.value === "") {
        resetar();
        setBuscou(false);
      }
      else
        setBuscou(false);
    }}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end" sx={{ marginRight: "-12px" }}>
          {
            !buscou ?
            <IconButton onClick={() => { if(search) { buscar(search); setBuscou(true) } }}>
              <SearchIcon />
            </IconButton>
            :
            <IconButton onClick={() => { if(search) { resetar(); setBuscou(false); setSearch(null) } }}>
              <HighlightOffIcon />
            </IconButton>
          }
        </InputAdornment>
      ),
    }}
  />
  )
}
