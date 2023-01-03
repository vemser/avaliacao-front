import { createContext, useContext, useState } from "react";

import nProgress from "nprogress";
import axios from "axios";
import { toast } from "react-toastify";
import { toastConfig } from "../../utils/toast";

import { API } from "../../utils/api";
import { IChildren } from "../../utils/interface";
import { IProgramas, IObjectProgramas, IProgramaContext } from "../../utils/programaInterface"
import { useNavigate } from "react-router-dom";

export const ProgramaContext = createContext({} as IProgramaContext);

export const ProgramaProvider = ({ children }: IChildren) => {
  const navigate = useNavigate();
  
  const [programas, setProgramas] = useState<IObjectProgramas | null>(null)
  const [mudaDashboard, setMudaDashboard] = useState<boolean>(false);
  
  const cadastrarPrograma = async (programa: IProgramas) => {
    try {
      nProgress.start();
      await API.post(`/programa`, programa);
      toast.success("Programa criado com sucesso!", toastConfig);
      navigate('/trilhas-e-programas')
      setMudaDashboard(true)
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

  const pegarPrograma = async (pagina: number = 0, tamanho: number = 10) => {
    try {
      nProgress.start();
      const { data } = await API.get(`/programa?page=${pagina}&size=${tamanho}`);
      setProgramas(data);
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

  const pegarProgramaPorNome = async (nome: string, pagina: number = 0, tamanho: number = 10) => {
    try {
      nProgress.start();
      const { data } = await API.get(`/programa/list-nome?page=${pagina}&size=${tamanho}&nome=${nome}`);
      setProgramas(data);
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

  const deletarProgama = async (id: number) => {
    try {
      nProgress.start();
      await API.delete(`/programa/${id}`);
      toast.success("Programa deletado com sucesso!", toastConfig);
      await pegarPrograma();
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

  const editarPrograma = async (programa: IProgramas, id: number) => {
    try {
      nProgress.start();
      await API.put(`/programa/${id}`, programa);
      toast.success("Programa atualizado com sucesso!", toastConfig);
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
    <ProgramaContext.Provider value={{ programas, cadastrarPrograma, pegarPrograma, deletarProgama, editarPrograma, pegarProgramaPorNome, mudaDashboard, setMudaDashboard }}>
      {children}
    </ProgramaContext.Provider>
  );
}

export const usePrograma = () => {
  return useContext(ProgramaContext);
}