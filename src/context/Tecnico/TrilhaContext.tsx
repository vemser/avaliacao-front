import { createContext, useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import nProgress from "nprogress";
import { toast } from "react-toastify";

import { toastConfig } from "../../utils/toast";
import { API } from "../../utils/api";
import { IChildren, IDadosTrilha, ITrilha, ITrilhasAPI } from "../../utils/TrilhaInterface/trilha";
import { usePrograma } from "./ProgramaContext";

export const TrilhaContext = createContext({} as ITrilha);

export const TrilhaProvider = ({ children }: IChildren) => {
  const navigate = useNavigate();

  const [trilhas, setTrilhas] = useState<ITrilhasAPI | null>(null);
  const { setMudaDashboard } = usePrograma();

  const pegarTrilha = async (pagina: number = 0, tamanho: number = 10) => {
    try {
      nProgress.start();     
      await API.get(`/trilha/lista-trilha-page?page=${pagina}&size=${tamanho}`, { headers: { Authorization: localStorage.getItem("token") }}).then((response) => {
        setTrilhas(response.data)
      })
    } catch (error) {
      toast.error('Houve um erro inesperado.', toastConfig);
    } finally {
      nProgress.done();
    }
  };

  const pegarTrilhaFiltroNome = async (nome: string, pagina: number = 0, tamanho: number = 10) => {
    try {
      nProgress.start();
      await API.get(`/trilha/lista-trilha-nome?nome=${nome}&page=${pagina}&size=${tamanho}`, { headers: { Authorization: localStorage.getItem("token") }}).then((response) => {
        setTrilhas(response.data)
      })
    } catch (error) {
      toast.error('Houve um erro inesperado.', toastConfig);
    } finally {
      nProgress.done();
    }
  }

  const cadastrarTrilha = async (dadosTrilha: IDadosTrilha) => {
    try {
      nProgress.start();
      await API.post('/trilha', dadosTrilha, { headers: { Authorization: localStorage.getItem("token") }}).then((response) => {
        setMudaDashboard(false)
        navigate('/trilhas-e-programas');
        toast.success('Trilha foi cadastrada com sucesso.', toastConfig);
      })
    } catch (error) {
      toast.error('Houve um erro inesperado.', toastConfig);
    } finally {
      nProgress.done();
    }
  };

  const editarTrilha = async (dadosTrilha: IDadosTrilha, idTrilha: number) => {
    try {
      nProgress.start();
      await API.put(`/trilha/update/${idTrilha}`, dadosTrilha, { headers: { Authorization: localStorage.getItem("token") }}).then((response) => {
        navigate('/trilhas-e-programas');
        toast.success('Trilha foi editada com sucesso.', toastConfig);
      });
    } catch (error) {
      toast.error('Houve um erro inesperado.', toastConfig);
    } finally {
      nProgress.done();
    }
  };

  const deletarTrilha = async (idTrilha: number | undefined) => {
    try {
      nProgress.start();
      await API.delete(`/trilha/${idTrilha}`, { headers: { Authorization: localStorage.getItem("token") }});
      toast.success('Trilha desativada com sucesso.', toastConfig);
      pegarTrilha();
    } catch(error) {
      toast.error('Houve um erro inesperado.', toastConfig);
    } finally {
      nProgress.done();
    }
  };
  
  return (
    <TrilhaContext.Provider value={{ cadastrarTrilha, pegarTrilha, editarTrilha, deletarTrilha, pegarTrilhaFiltroNome, trilhas }}>
      {children}
    </TrilhaContext.Provider>
  );
}

export const useTrilha = () => {
  return useContext(TrilhaContext)
}