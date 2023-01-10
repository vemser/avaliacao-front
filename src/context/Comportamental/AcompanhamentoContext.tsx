import { createContext, useContext, useState } from "react";

import axios from "axios";
import nProgress from 'nprogress';
import { toast } from "react-toastify";
import { toastConfig } from "../../utils/toast";

import { API } from "../../utils/api";

import { IAcompanhamento, IAcompanhamentoObject, IChildren } from "../../utils/AcompanhamentoInterface/acompanhamento";

export const AcompanhamentoContext = createContext({} as IAcompanhamento);

export const AcompanhamentoProvider = ({ children }: IChildren) => {
  const [acompanhamentos, setAcompanhamentos] = useState<IAcompanhamentoObject | null>(null);

  const pegarAcompanhamentos = async (pagina: number = 0, tamanho: number = 10) => {
    try {
      nProgress.start();
      const { data } = await API.get(`/acompanhamento/listar-acompanhamento?page=${pagina}&size=${tamanho}`, { headers: { Authorization: localStorage.getItem("token") } });
      setAcompanhamentos(data);
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

  const pegarAcompanhamentoNomePrograma = async (nome: string, pagina: number = 0, tamanho: number = 10) => {
    try {
      nProgress.start();
      const { data } = await API.get(`/acompanhamento/listar-acompanhamento-por-nome-programa?page=${pagina}&size=${tamanho}&nome=${nome}`, { headers: { Authorization: localStorage.getItem("token") } });
      setAcompanhamentos(data);
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

  const desativarAcompanhamento = async (id: number) => {
    try {
      nProgress.start();
      await API.delete(`/acompanhamento/desativar/${id}`, { headers: { Authorization: localStorage.getItem("token") } });
      await pegarAcompanhamentos();
      toast.success("Acompanhamento desativado com sucesso!", toastConfig);
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
    <AcompanhamentoContext.Provider value={{ acompanhamentos, pegarAcompanhamentos, pegarAcompanhamentoNomePrograma, desativarAcompanhamento }}>
      {children}
    </AcompanhamentoContext.Provider>
  );
}

export const useAcompanhamento = () => {
  return useContext(AcompanhamentoContext)
}