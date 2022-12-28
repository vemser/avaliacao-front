import { createContext, useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import nProgress from "nprogress";
import { toast } from "react-toastify";

import { toastConfig } from "../../utils/toast";
import { API } from "../../utils/api";
import { IChildren, IDadosTrilha, ITrilha, ITrilhasAPI } from "../../utils/TrilhaInterface/trilha";

export const TrilhaContext = createContext({} as ITrilha);

export const TrilhaProvider = ({ children }: IChildren) => {
  const navigate = useNavigate();

  const [trilhas, setTrilhas] = useState<ITrilhasAPI | null>(null);

  const pegarTrilha = async (pagina: number = 0, tamanho: number = 10) => {
    try {
      nProgress.start();     
      await API.get(`/trilha/lista-trilha-page?page=${pagina}&size=${tamanho}`)
      .then((response) => {
        setTrilhas(response.data)
      })
    } catch (error) {
      toast.error('Houve um erro inesperado.', toastConfig);
    } finally {
      nProgress.done();
    }
  };

  // Finalizar essa request
  const pegarTrilhaFiltroNome = async () => {
    try {
      nProgress.start();  
    } catch (error) {
      toast.error('Houve um erro inesperado.', toastConfig);
    } finally {
      nProgress.done();
    }
  }

  const cadastrarTrilha = async (dadosTrilha: IDadosTrilha) => {
    try {
      nProgress.start();
      await API.post('/trilha', dadosTrilha).then((response) => {
        console.log(response.data)
        navigate('/trilha-programa');
      })
    } catch (error) {
      toast.error('Houve um erro inesperado.', toastConfig);
    } finally {
      nProgress.done();
    }
  };

  const deletarTrilha = async (idTrilha: number | undefined) => {
    try {
      nProgress.start();
      await API.delete(`/trilha/${idTrilha}`);
      pegarTrilha();
    } catch(error) {
      toast.error('Houve um erro inesperado.', toastConfig);
    } finally {
      nProgress.done();
    }
  };
  
  return (
    <TrilhaContext.Provider value={{ cadastrarTrilha, pegarTrilha, deletarTrilha, trilhas }}>
      {children}
    </TrilhaContext.Provider>
  );
}

export const useTrilha = () => {
  return useContext(TrilhaContext)
}