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
      await API.post(`/vaga`, vaga, { headers: { Authorization: localStorage.getItem("token") }});
      toast.success("Vaga criado com sucesso!", toastConfig);
    } catch (error) {
      let message = "Ops, algo deu errado!";
      if (axios.isAxiosError(error) && error?.response) {
        message = error.response.data.message;
      }
      toast.error(message, toastConfig);
    } finally{
      nProgress.done();
    }
  }

  const pegarVagas = async (pagina: number = 0, tamanho: number = 10) => {
    try {
      nProgress.start();
      const { data } = await API.get(`/vaga?pagina=${pagina}&tamanho=${tamanho}`, { headers: { Authorization: localStorage.getItem("token") }});
      setVagas(data);
    } catch(error) {
      let message = "Ops, algo deu errado!";
      if (axios.isAxiosError(error) && error?.response) {
        message = error.response.data.message;
      }
      toast.error(message, toastConfig);
    } finally {
      nProgress.done();
    }
  }

  const pegarVagaPorNome = async (nome: string, pagina: number = 0, tamanho: number = 10) => {
    try {
      nProgress.start();
      const { data } = await API.get(`/vaga/nome/${nome}?pagina=${pagina}&tamanho=${tamanho}`, { headers: { Authorization: localStorage.getItem("token") }});
      setVagas(data);
    } catch(error) {
      let message = "Ops, algo deu errado!";
      if (axios.isAxiosError(error) && error?.response) {
        message = error.response.data.message;
      }
      toast.error(message, toastConfig);
    } finally {
      nProgress.done();
    }
  }

  const deletarVaga = async (id: number) => {
    try {
      nProgress.start();
      await API.delete(`/vaga/${id}`, { headers: { Authorization: localStorage.getItem("token") }});
      toast.success("Vaga deletada com sucesso!", toastConfig);
      await pegarVagas();
    } catch(error) {
      let message = "Ops, algo deu errado!";
      if (axios.isAxiosError(error) && error?.response) {
        message = error.response.data.message;
      }
      toast.error(message, toastConfig);
    } finally {
      nProgress.done();
    }
  }

  const editarVaga = async (vaga: IVaga, id: number) => {
    try {
      nProgress.start();
      await API.put(`/vaga/${id}`, vaga, { headers: { Authorization: localStorage.getItem("token") }});
      toast.success("Vaga atualizado com sucesso!", toastConfig);
    } catch(error) {
      let message = "Ops, algo deu errado!";
      if (axios.isAxiosError(error) && error?.response) {
        message = error.response.data.message;
      }
      toast.error(message, toastConfig);
    } finally {
      nProgress.done();
    }
  }

  return (
    <VagaContext.Provider value={{ vagas, cadastrarVaga, pegarVagas, pegarVagaPorNome, deletarVaga, editarVaga }}>
      {children}
    </VagaContext.Provider>
  );
}

export const useVaga = () => {
  return useContext(VagaContext);
}