import React from 'react'
import { Typography } from '@mui/material'

interface ITexto{
  texto: string
}

export const Titulo: React.FC<ITexto> = ({texto}) => {
  return (
    <>
      <Typography id="titulo-componente" sx={{textAlign: "center",marginBottom:"30px",fontSize:{ xs:"35px", md:"40px" }, fontWeight:"600", color:"white", userSelect: "none" }} variant="h3">{texto}</Typography>
    </>
  )
}
