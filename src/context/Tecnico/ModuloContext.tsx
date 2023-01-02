import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { API } from "../../utils/api";

import { toastConfig } from "../../utils/toast";
import { toast } from "react-toastify";
import nProgress from "nprogress";

import { ICadastroModulo, IModulo, IModuloAPI } from "../../utils/ModuloInterface/Modulo";
import { IChildren } from "../../utils/interface";

export const ModuloContext = createContext({} as IModulo);

export const ModuloProvider = ({ children }: IChildren) => {
  const navigate = useNavigate();
  const [modulo, setModulo] = useState<IModuloAPI | null>(null);

  const pegarModulo = async (pagina: number = 0, tamanho: number = 10) => {
    try {
      nProgress.start()
      const { data } = await API.get(`/modulo/lista-todos-modulos?page=${pagina}&size=${tamanho}`)
      setModulo(data)
    } catch (error) {
      toast.error("Houve algum erro.", toastConfig);

    } finally {
      nProgress.done()

    }
  }

  const cadastrarModulo = async (dadosModulo: ICadastroModulo) => {
    try {
      nProgress.start();
      await API.post("/modulo/adicionar", dadosModulo);
      navigate("/lista-modulo");
      toast.success("Módulo cadastrado com sucesso!", toastConfig);
    } catch (error) {
      toast.error("Houve algum erro, cheque os dados e tente novamente.", toastConfig);
    } finally {
      nProgress.done();
    }
  }

  const deletarModulo = async (id: number | undefined) => {
    try {
      nProgress.start()
      await API.delete(`/modulo/desativar?idUsuario=${id}`);
      toast.success("Modulo desativado com sucesso", toastConfig)
      pegarModulo()
    } catch (error) {
      toast.error("Houve algum erro.", toastConfig);

    } finally {
      nProgress.done()

    }
  }

  return (
    <ModuloContext.Provider value={{ pegarModulo, modulo, deletarModulo, cadastrarModulo }}>
      {children}
    </ModuloContext.Provider>
  )
}