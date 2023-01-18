import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { API } from "../../utils/api";

import { toastConfig } from "../../utils/toast";
import { toast } from "react-toastify";
import nProgress from "nprogress";

import { ICadastroModulo, IModuloTrilha, IModulo, IModuloAPI, IModulosPorTrilha } from "../../utils/ModuloInterface/Modulo";
import { IChildren } from "../../utils/interface";
import axios from "axios";

export const ModuloContext = createContext({} as IModulo);

export const ModuloProvider = ({ children }: IChildren) => {
  const navigate = useNavigate();
  const [modulo, setModulo] = useState<IModuloAPI | null>(null);
  const [moduloPorId, setModuloPorId] = useState<IModuloTrilha | null>(null);
  const [moduloPorTrilha, setModuloPorTrilha] = useState<IModulosPorTrilha[]>([]);

  const pegarModulo = async (pagina: number = 0, tamanho: number = 10) => {
    try {
      nProgress.start()
      const { data } = await API.get(`/modulo/lista-todos-modulos?page=${pagina}&size=${tamanho}`)
      setModulo(data)
    } catch (error: any) {
      let message = "Ops, algo deu errado!";
      if (error.response.status === 403) {
        message = "Você não tem permissão para acessar esse recurso"
      } else if (axios.isAxiosError(error) && error?.response) {
        message = error.response.data.message || error.response.data.errors[0];
      }
      toast.error(message, toastConfig);
    } finally {
      nProgress.done()
    }
  }

  const pegarModuloPorFiltro = async (pagina: number = 0, tamanho: number = 10, filtros: string = '') => {
    try {
      nProgress.start();
      await API.get(`/modulo/listar-id-nome?pagina=${pagina}&tamanho=${tamanho}${filtros}`).then((response) => {
        setModulo(response.data);
      })
    } catch (error: any) {
      let message = "Ops, algo deu errado!";
      if (error.response.status === 403) {
        message = "Você não tem permissão para acessar esse recurso"
      } else if (axios.isAxiosError(error) && error?.response) {
        message = error.response.data.message || error.response.data.errors[0];
      }
      toast.error(message, toastConfig);
    } finally {
      nProgress.done();
    }
  }

  const pegarModuloPorTrilha = async (id: number) => {
    try {
      nProgress.start();
      await API.get(`/modulo/listar-modulos-por-trilha?idTrilha=${id}`).then((response) => {
        setModuloPorTrilha(response.data)
      })
    } catch (error: any) {
      let message = "Ops, algo deu errado!";
      if (error.response.status === 403) {
        message = "Você não tem permissão para acessar esse recurso"
      } else if (axios.isAxiosError(error) && error?.response) {
        message = error.response.data.message || error.response.data.errors[0];
      }
      toast.error(message, toastConfig);
    } finally {
      nProgress.done();
    }
  }

  const pegarModuloPorId = async (id: number) => {
    try {
      nProgress.start();
      API.defaults.headers.common["Authorization"] = localStorage.getItem("token");

      const { data } = await API.get(`/modulo/find-id-modulo?idModulo=${id}`);

      return data;
    } catch (error: any) {
      let message = "Ops, algo deu errado!";
      if (error.response.status === 403) {
        message = "Você não tem permissão para acessar esse recurso"
      } else if (axios.isAxiosError(error) && error?.response) {
        message = error.response.data.message || error.response.data.errors[0];
      }
      toast.error(message, toastConfig);
    } finally {
      nProgress.done();
    }
  }

  const cadastrarModulo = async (dadosModulo: ICadastroModulo) => {
    try {
      nProgress.start();
      await API.post("/modulo/adicionar", dadosModulo);
      navigate(-1);
      toast.success("Módulo cadastrado com sucesso!", toastConfig);
    } catch (error: any) {
      let message = "Ops, algo deu errado!";
      if (error.response.status === 403) {
        message = "Você não tem permissão para acessar esse recurso"
      } else if (axios.isAxiosError(error) && error?.response) {
        message = error.response.data.message || error.response.data.errors[0];
      }
      toast.error(message, toastConfig);
    } finally {
      nProgress.done();
    }
  }

  const editarModulo = async (dadosModulo: ICadastroModulo, id: number) => {
    try {
      nProgress.start();
      await API.put(`/modulo/editar?id=${id}`, dadosModulo);
      navigate(-1);
      toast.success("Módulo editado com sucesso!", toastConfig);
    } catch (error: any) {
      let message = "Ops, algo deu errado!";
      if (error.response.status === 403) {
        message = "Você não tem permissão para acessar esse recurso"
      } else if (axios.isAxiosError(error) && error?.response) {
        message = error.response.data.message || error.response.data.errors[0];
      }
      toast.error(message, toastConfig);
    } finally {
      nProgress.done();
    }
  }

  const clonarModulo = async (id: number) => {
    try {
      nProgress.start();
      API.defaults.headers.common["Authorization"] = localStorage.getItem("token");
      await API.post(`/modulo/clonar/${id}`);
      toast.success("Módulo duplicado com sucesso!", toastConfig);
      pegarModulo();
    } catch (error: any) {
      let message = "Ops, algo deu errado!";
      if (error.response.status === 403) {
        message = "Você não tem permissão para acessar esse recurso"
      } else if (axios.isAxiosError(error) && error?.response) {
        message = error.response.data.message || error.response.data.errors[0];
      }
      toast.error(message, toastConfig);
    } finally {
      nProgress.done();
    }
  }

  const deletarModulo = async (id: number | undefined) => {
    try {
      nProgress.start()
      await API.delete(`/modulo/desativar?idModulo=${id}`);
      toast.success("Módulo desativado com sucesso!", toastConfig);
    } catch (error: any) {
      let message = "Ops, algo deu errado!";
      if (error.response.status === 403) {
        message = "Você não tem permissão para acessar esse recurso"
      } else if (axios.isAxiosError(error) && error?.response) {
        message = error.response.data.message || error.response.data.errors[0];
      }
      toast.error(message, toastConfig);
    } finally {
      nProgress.done()
    }
  }

  return (
    <ModuloContext.Provider value={{ pegarModulo, modulo, deletarModulo, cadastrarModulo, editarModulo, pegarModuloPorFiltro, clonarModulo, pegarModuloPorTrilha, moduloPorTrilha, pegarModuloPorId, moduloPorId }}>
      {children}
    </ModuloContext.Provider>
  )
}

export const useModulo = () => {
  return useContext(ModuloContext)
}