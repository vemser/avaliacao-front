import { Button } from "@mui/material";

interface ITexto {
  texto: string
}

export const BotaoAzul: React.FC<ITexto> = ({texto}) => {
  return (
    <>
      <Button id="botao-azul" type="submit" sx={{textTransform: "capitalize",width:{ xs:"20%", md:"150px" },display:"flex",margin:"0 auto"}} variant="contained">{texto}</Button>
    </>
  )
}
