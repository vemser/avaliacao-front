import { createContext, useContext, useState } from "react";

import nProgress from "nprogress";
import axios from "axios";
import { toast } from "react-toastify";
import { toastConfig } from "../../utils/toast";

import { API } from "../../utils/api";
import { IChildren } from "../../utils/interface";
import { useNavigate } from "react-router-dom";
import { IAtividadeContext, IAtividadeForm, IAtividadeObject } from "../../utils/AtividadeInterface/AtividadeInterface";

export const AtividadeContext = createContext({} as IAtividadeContext);

export const AtividadeProvider = ({ children }: IChildren) => {
  const navigate = useNavigate();

  const [atividades, setAtividades] = useState<IAtividadeObject | null>(null)

  const cadastrarAtividade = async (atividade: IAtividadeForm) => {
    try {
      nProgress.start();
      let novaData = { ...atividade, idPrograma: parseInt(atividade.idPrograma) }
      console.log(novaData)
      await API.post(`/atividade`, atividade);
      toast.success("Atividade criado com sucesso!", toastConfig);
      navigate('/listar-atividade');
    } catch (error) {
      let message = "Ops, algo deu errado!";
      if (axios.isAxiosError(error) && error?.response) {
        message = error.response.data.message;
      }
      toast.error(message, toastConfig);
    } finally {
      nProgress.done();
    }
  }

  const pegarAtividade = async (pagina: number = 0, tamanho: number = 10) => {
    try {
      nProgress.start();
      const { data } = await API.get(`/atividade/listar-paginado?page=${pagina}&size=${tamanho}`);
      setAtividades(data);
    } catch (error) {
      let message = "Ops, algo deu errado!";
      if (axios.isAxiosError(error) && error?.response) {
        message = error.response.data.message;
      }
      toast.error(message, toastConfig);
    } finally {
      nProgress.done();
    }
  }

  // const pegarProgramaPorNome = async (nome: string, pagina: number = 0, tamanho: number = 10) => {
  //   try {
  //     nProgress.start();
  //     const { data } = await API.get(`/programa/list-nome?page=${pagina}&size=${tamanho}&nome=${nome}`);
  //     setProgramas(data);
  //   } catch(error) {
  //     let message = "Ops, algo deu errado!";
  //     if (axios.isAxiosError(error) && error?.response) {
  //       message = error.response.data.message;
  //     }
  //     toast.error(message, toastConfig);
  //   } finally {
  //     nProgress.done();
  //   }
  // }

  const deletarAtividade = async (id: number) => {
    try {
      nProgress.start();
      console.log(id)
      await API.delete(`/atividade/deletar-atividade?idAtividade=${id}`);
      await pegarAtividade();
      toast.success("Atividade deletado com sucesso!", toastConfig);
    } catch (error) {
      let message = "Ops, algo deu errado!";
      if (axios.isAxiosError(error) && error?.response) {
        message = error.response.data.message;
      }
      toast.error(message, toastConfig);
    } finally {
      nProgress.done();
    }
  }

  // const editarPrograma = async (programa: IProgramas, id: number) => {
  //   try {
  //     nProgress.start();
  //     await API.put(`/programa/${id}`, programa);
  //     toast.success("Programa atualizado com sucesso!", toastConfig);
  //   } catch(error) {
  //     let message = "Ops, algo deu errado!";
  //     if (axios.isAxiosError(error) && error?.response) {
  //       message = error.response.data.message;
  //     }
  //     toast.error(message, toastConfig);
  //   } finally {
  //     nProgress.done();
  //   }
  // }

  return (
    <AtividadeContext.Provider value={{ atividades, cadastrarAtividade, pegarAtividade, deletarAtividade }}>
      {children}
    </AtividadeContext.Provider>
  );
}

export const useAtividade = () => {
  return useContext(AtividadeContext);
}