import { createContext, useContext, useState } from "react";

import axios from "axios";
import nProgress from 'nprogress';
import { toast } from "react-toastify";
import { toastConfig } from "../../utils/toast";

import { useNavigate } from "react-router-dom";

import { API } from "../../utils/api";

import { IAcompanhamento, IAcompanhamentoObject, IChildren, ICadastrarAcompanhamento, IEditarAcompanhamento } from "../../utils/AcompanhamentoInterface/acompanhamento";

export const AcompanhamentoContext = createContext({} as IAcompanhamento);

export const AcompanhamentoProvider = ({ children }: IChildren) => {
  const [acompanhamentos, setAcompanhamentos] = useState<IAcompanhamentoObject | null>(null);
  const navigate = useNavigate();

  const cadastrarAcompanhamento = async (dadosAcompanhamento: ICadastrarAcompanhamento) => {
    try {
      nProgress.start();
      await API.post('/acompanhamento/criar', dadosAcompanhamento, { headers: { Authorization: localStorage.getItem("token") } }).then((response) => {
        navigate('/acompanhamentos');
        toast.success('Acompanhamento cadastrado com sucesso!', toastConfig);
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

  const editarAcompanhamento = async (dadosAcompanhamento: IEditarAcompanhamento, id: number) => {
    try {
      nProgress.start();
      await API.put(`/acompanhamento/editar/${id}`, dadosAcompanhamento, { headers: { Authorization: localStorage.getItem("token") } }).then((response) => {
        navigate('/acompanhamentos');
        toast.success('Acompanhamento editado com sucesso!', toastConfig);
      })
    } catch (error: any) {
      let message = "Ops, algo deu errado!";
      if (error.response.status === 403) {
        message = "Você não tem permissão para acessar esse recurso";
      } else if (axios.isAxiosError(error) && error?.response) {
        message = error.response.data.message || error.response.data.errors[0];
      }
      toast.error(message, toastConfig);
    } finally {
      nProgress.done();
    }
  }

  const pegarAcompanhamentos = async (pagina: number = 0, tamanho: number = 10) => {
    try {
      nProgress.start();
      const { data } = await API.get(`/acompanhamento/listar-acompanhamento?pagina=${pagina}&tamanho=${tamanho}`, { headers: { Authorization: localStorage.getItem("token") } });
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
      const { data } = await API.get(`/acompanhamento/listar-acompanhamento?nomePrograma=${nome}&pagina=${pagina}&tamanho=${tamanho}`, { headers: { Authorization: localStorage.getItem("token") } });
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
        message = "Você não tem permissão para acessar esse recurso";
      } else if (axios.isAxiosError(error) && error?.response) {
        message = error.response.data.message || error.response.data.errors[0];
      }
      toast.error(message, toastConfig);
    } finally {
      nProgress.done();
    }
  }

  return (
    <AcompanhamentoContext.Provider value={{ cadastrarAcompanhamento, editarAcompanhamento, acompanhamentos, pegarAcompanhamentos, pegarAcompanhamentoNomePrograma, desativarAcompanhamento }}>
      {children}
    </AcompanhamentoContext.Provider>
  );
}

export const useAcompanhamento = () => {
  return useContext(AcompanhamentoContext)
}