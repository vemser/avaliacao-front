import { Typography } from '@mui/material'

interface ITexto{
  texto: string
}

export const Titulo: React.FC<ITexto> = ({texto}) => {
  return (
    <>
      <Typography id="titulo-componente" sx={{textAlign: "center",marginBottom:"20px",fontSize:{ xs:"35px", md:"40px" }, fontWeight:"700",color:"white"}} variant="h3">{texto}</Typography>
    </>
  )
}
