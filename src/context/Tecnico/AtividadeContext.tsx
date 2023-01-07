import { createContext, useContext, useState } from "react";

import nProgress from "nprogress";
import axios from "axios";
import { toast } from "react-toastify";
import { toastConfig } from "../../utils/toast";

import { API } from "../../utils/api";
import { IChildren } from "../../utils/interface";
import { useNavigate } from "react-router-dom";
import { IAtividadeContext, IAtividadeForm, IAtividadeObject } from "../../utils/AtividadeInterface/AtividadeInterface";
import { useAuth } from "../AuthContext";

export const AtividadeContext = createContext({} as IAtividadeContext);

export const AtividadeProvider = ({ children }: IChildren) => {
  const navigate = useNavigate();
  const { usuarioLogado } = useAuth();

  const [atividades, setAtividades] = useState<IAtividadeObject | null>(null)

  const cadastrarAtividade = async (atividade: IAtividadeForm) => {
    try {
      nProgress.start();
      let novaData = { ...atividade, idPrograma: parseInt(atividade.idPrograma), nomeInstrutor: `${usuarioLogado.login.split(".")[0]} ${usuarioLogado.login.split(".")[1]}` }
      await API.post(`/atividade`, novaData, { headers: { Authorization: localStorage.getItem("token") } });
      toast.success("Atividade criada com sucesso!", toastConfig);
      navigate('/atividades');
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

  const pegarAtividade = async (pagina: number = 0, tamanho: number = 10) => {
    try {
      nProgress.start();
      const { data } = await API.get(`/atividade/listar-paginado?page=${pagina}&size=${tamanho}`, { headers: { Authorization: localStorage.getItem("token") } });
      setAtividades(data);
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

  const pegarAtividadeAluno = async (situacao: string, pagina: number = 0, tamanho: number = 10) => {
    try {
      nProgress.start();
      const { data } = await API.get(`/atividade/listar-por-situacao-paginada?page=${pagina}&size=${tamanho}`, { headers: { Authorization: localStorage.getItem("token") } });
      setAtividades(data);
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

  const pegarAtividadePorId = async (id: number) => {
    try {
      nProgress.start();
      const { data } = await API.get(`/atividade/find-id-atividade?idAtividade=${id}`, { headers: { Authorization: localStorage.getItem("token") } });
      setAtividades({ totalElementos: 1, quantidadePaginas: 1, pagina: 0, tamanho: 1, elementos: [data] })
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

  const deletarAtividade = async (id: number) => {
    try {
      nProgress.start();
      await API.delete(`/atividade/deletar-atividade?idAtividade=${id}`, { headers: { Authorization: localStorage.getItem("token") } });
      await pegarAtividade();
      toast.success("Atividade desativada com sucesso!", toastConfig);
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

  const editarAtividade = async (atividade: IAtividadeForm, id: number) => {
    try {
      nProgress.start();
      let novaData = { ...atividade, idPrograma: parseInt(atividade.idPrograma), nomeInstrutor: `${usuarioLogado.login.split(".")[0]} ${usuarioLogado.login.split(".")[1]}` };
      await API.put(`/atividade/update/${id}`, novaData, { headers: { Authorization: localStorage.getItem("token") } });
      toast.success("Atividade atualizado com sucesso!", toastConfig);
      navigate(-1);
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
    <AtividadeContext.Provider value={{ atividades, cadastrarAtividade, pegarAtividade, deletarAtividade, editarAtividade, pegarAtividadePorId, pegarAtividadeAluno }}>
      {children}
    </AtividadeContext.Provider>
  );
}

export const useAtividade = () => {
  return useContext(AtividadeContext);
}