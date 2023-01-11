import { createContext, useContext, useState } from "react";

import nProgress from 'nprogress';
import { toast } from "react-toastify";
import { toastConfig } from "../../utils/toast";

import { API } from "../../utils/api";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import { IChildren, IAvaliacaoContext, ICadastrarAvalicao, IAvaliacaoAPI,IEditarAvaliacao } from "../../utils/AvaliacaoInterface/Avaliacao";

export const AvaliacaoContext = createContext({} as IAvaliacaoContext);

export const AvaliacaoProvider = ({ children }: IChildren) => {
  const navigate = useNavigate()

  const cadastrarAvalicao = async (avalicao: ICadastrarAvalicao) => {
    try {
      nProgress.start();
      await API.post("/avaliacao/create", avalicao, { headers: { Authorization: localStorage.getItem("token") }})
      toast.success("Avaliação criada com sucesso!", toastConfig);
      navigate("/avaliacoes")
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

  const [avaliacoes, setAvaliacoes] = useState<IAvaliacaoAPI | null>(null)

  const pegarAvaliacao = async (pagina: number = 0, tamanho: number = 10, filtros: string = '') => {
    try {
      nProgress.start();
      await API.get(`/avaliacao/listar-avaliacao-por-acompanhamento-aluno?pagina=${pagina}&tamanho=${tamanho}${filtros}`, { headers: { Authorization: localStorage.getItem("token") }}).then((response) => {
        setAvaliacoes(response.data);
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

  const deletarAvaliacao = async (idAluno: number | undefined) => {
    try {
      await API.delete(`/avaliacao/desativar/${idAluno}`, { headers: { Authorization: localStorage.getItem("token") }});
      toast.success('Avaliação desativada com sucesso!', toastConfig);
      pegarAvaliacao()
    } catch (error: any) {
      let message = "Ops, algo deu errado!";
      if (error.response.status === 403) {
        message = "Você não tem permissão para acessar esse recurso"
      } else if (axios.isAxiosError(error) && error?.response) {
        message = error.response.data.message || error.response.data.errors[0];
      }  
      toast.error(message, toastConfig);
    }
  }

  const editarAvaliacao = async (avalicao: IEditarAvaliacao,id: number) => {
    try {
      nProgress.start();
      await API.put(`/avaliacao/${id}`, avalicao, { headers: { Authorization: localStorage.getItem("token") }})
      toast.success("Avaliação editada com sucesso!", toastConfig);
      navigate("/avaliacoes")
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
    <AvaliacaoContext.Provider value={{ cadastrarAvalicao, pegarAvaliacao, deletarAvaliacao, avaliacoes, editarAvaliacao }}>
      {children}
    </AvaliacaoContext.Provider>
  );
}

export const useAvaliacao = () => {
  return useContext(AvaliacaoContext)
}