import { createContext, useContext, useState } from "react";
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
      const { data } = await API.get(`/modulo/lista-todos-modulos?page=${pagina}&size=${tamanho}`, { headers: { Authorization: localStorage.getItem("token") }})
      setModulo(data)
    } catch (error) {
      toast.error("Houve algum erro.", toastConfig);
    } finally {
      nProgress.done()
    }
  }

  const pegarModuloPorID = async (id: number) => {
    try {
      nProgress.start()
      const { data } = await API.get(`/modulo/find-id-modulo?idModulo=${id}`, { headers: { Authorization: localStorage.getItem("token") }})
      setModulo({ totalElementos: 1, quantidadePaginas: 1, pagina: 0, tamanho: 1, elementos: [data] })
    } catch (error) {
      toast.error("Houve algum erro.", toastConfig);
    } finally {
      nProgress.done()
    }
  }

  const cadastrarModulo = async (dadosModulo: ICadastroModulo) => {
    try {
      nProgress.start();
      await API.post("/modulo/adicionar", dadosModulo, { headers: { Authorization: localStorage.getItem("token") }});
      navigate("/modulos");
      toast.success("Módulo cadastrado com sucesso!", toastConfig);
    } catch (error) {
      toast.error("Houve algum erro, cheque os dados e tente novamente.", toastConfig);
    } finally {
      nProgress.done();
    }
  }

  const editarModulo = async (dadosModulo: ICadastroModulo, id: number) => {
    try {
      nProgress.start();
      await API.put(`/modulo/editar?id=${id}`, dadosModulo, { headers: { Authorization: localStorage.getItem("token") }});
      navigate("/modulos");
      toast.success("Módulo editado com sucesso!", toastConfig);
    } catch (error) {
      toast.error("Houve algum erro, cheque os dados e tente novamente.", toastConfig);
    } finally {
      nProgress.done();
    }
  }

  const clonarModulo = async (id: number) => {
    try {
      nProgress.start();
      await API.post(`/modulo/clonar/${id}`, { headers: { Authorization: localStorage.getItem("token") }});
      toast.success("Módulo duplicado com sucesso!", toastConfig);
      pegarModulo();
    } catch (error) {
      toast.error("Houve algum erro, cheque os dados e tente novamente.", toastConfig);
    } finally {
      nProgress.done();
    }
  }

  const deletarModulo = async (id: number | undefined) => {
    try {
      nProgress.start()
      await API.delete(`/modulo/desativar?idModulo=${id}`, { headers: { Authorization: localStorage.getItem("token") }});
      toast.success("Modulo desativado com sucesso", toastConfig)
      pegarModulo()
    } catch (error) {
      toast.error("Houve algum erro.", toastConfig);
    } finally {
      nProgress.done()
    }
  }

  return (
    <ModuloContext.Provider value={{ pegarModulo, modulo, deletarModulo, cadastrarModulo, editarModulo, pegarModuloPorID, clonarModulo }}>
      {children}
    </ModuloContext.Provider>
  )
}

export const useModulo = () => {
  return useContext(ModuloContext)
}