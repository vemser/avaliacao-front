import { createContext, useContext, useState } from "react";

import nProgress from "nprogress";
import axios from "axios";
import { toast } from "react-toastify";
import { toastConfig } from "../../utils/toast";

import { API } from "../../utils/api";
import { IChildren } from "../../utils/interface";
import { IVagaObject, IVagaContext, IVaga } from "../../utils/VagaInterface/vaga";

export const VagaContext = createContext({} as IVagaContext);

export const VagaProvider = ({ children }: IChildren) => {
  const [vagas, setVagas] = useState<IVagaObject | null>(null)

  const cadastrarVaga = async (vaga: IVaga) => {
    try {
      nProgress.start();
      await API.post(`/vaga`, vaga, { headers: { Authorization: localStorage.getItem("token") } });
      toast.success("Vaga criado com sucesso!", toastConfig);
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

  const pegarVagas = async (pagina: number = 0, tamanho: number = 10, filtros: string = '') => {
    try {
      nProgress.start();
      const { data } = await API.get(`/vaga/listar-id-nome?pagina=${pagina}&tamanho=${tamanho}${filtros}`, { headers: { Authorization: localStorage.getItem("token") } });
      setVagas(data);
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

  const deletarVaga = async (id: number) => {
    try {
      nProgress.start();
      await API.delete(`/vaga/desativar/${id}`, { headers: { Authorization: localStorage.getItem("token") } });
      toast.success("Vaga deletada com sucesso!", toastConfig);
      await pegarVagas();
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

  const editarVaga = async (vaga: IVaga, id: number) => {
    try {
      nProgress.start();
      await API.put(`/vaga/${id}`, vaga, { headers: { Authorization: localStorage.getItem("token") } });
      toast.success("Vaga atualizado com sucesso!", toastConfig);
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

  return (
    <VagaContext.Provider value={{ vagas, cadastrarVaga, pegarVagas, deletarVaga, editarVaga }}>
      {children}
    </VagaContext.Provider>
  );
}

export const useVaga = () => {
  return useContext(VagaContext);
}