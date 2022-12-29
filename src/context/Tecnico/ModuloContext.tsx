import nProgress from "nprogress";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { API } from "../../utils/api";
import { IModulo, IModuloAPI } from "../../utils/ModuloInterface/Modulo";
import { toastConfig } from "../../utils/toast";
import { IChildren } from "../../utils/interface";

export const ModuloContext = createContext({} as IModulo);


export const ModuloProvider = ({children} : IChildren) => {

  const [modulo,setModulo] = useState<IModuloAPI | null>(null)

  const pegarModulo = async (pagina: number = 0, tamanho: number = 10) =>{
    try {
      nProgress.start()
      const {data} = await API.get(`/modulo/lista-todos-modulos?page=${pagina}&size=${tamanho}`)
      setModulo(data)
      console.log(data)
    } catch (error) {
      toast.error("Você não possui credenciais para acessar essas informações.", toastConfig);
      
    } finally{
      nProgress.done()

    }
  }

  const deletarModulo = async (id: number | undefined) => {
    try {
      nProgress.start()
      await API.delete(`/modulo/desativar?idUsuario=${id}`);
      toast.success("Modulo desativado com sucesso", toastConfig)
      pegarModulo()
    } catch (error) {
      toast.error("Você não possui credenciais para acessar essas informações.", toastConfig);
      
    } finally {
      nProgress.done()
      
    }
  }

  return(
    <ModuloContext.Provider value={{pegarModulo, modulo, deletarModulo}}>
      {children}
    </ModuloContext.Provider>
  )
}