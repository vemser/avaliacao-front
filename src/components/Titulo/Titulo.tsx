import React from 'react'
import { Typography } from '@mui/material'

interface ITexto {
  texto: string
}

export const Titulo: React.FC<ITexto> = ({ texto }) => {
  return (
    <Typography id="titulo-componente" sx={{ textAlign: "center", marginBottom: "30px", fontSize: { xs: "2.25rem", md: "2.6rem" }, fontWeight: "600", color: "white", userSelect: "none" }} variant="h1">{texto}</Typography>
  )
}
