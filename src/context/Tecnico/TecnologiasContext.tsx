import { createContext, useContext, useState } from "react";

import nProgress from "nprogress";
import { toast } from "react-toastify";
import { toastConfig } from "../../utils/toast";

import { API } from "../../utils/api";
import { IChildren } from "../../utils/interface";
import { ITecnologiaContext, ITecnologiasAPI } from "../../utils/TecnologiaInterface/tecnologia";

import axios from "axios";

export const TecnologiaContext = createContext({} as ITecnologiaContext);

export const TecnologiaProvider = ({ children }: IChildren) => {
  const [tecnologias, setTecnologias] = useState<ITecnologiasAPI | null>(null);

  const pegarTecnologia = async (pagina: number = 0, tamanho: number = 10) => {
    try {
      nProgress.start();     
      await API.get(`/tecnologia?pagina=${pagina}&tamanho=${tamanho}`, { headers: { Authorization: localStorage.getItem("token") }}).then((response) => {
        setTecnologias(response.data)
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
  };

  const cadastrarTecnologia = async (dadosTecnologia: object) => {
    try {
      nProgress.start();     
      await API.post('/tecnologia', dadosTecnologia, { headers: { Authorization: localStorage.getItem("token") }}).then((response) => {
        toast.success('Tecnologia cadastrada com sucesso!', toastConfig);
        pegarTecnologia();
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

  return (
    <TecnologiaContext.Provider value={{ pegarTecnologia, cadastrarTecnologia, tecnologias }}>
      {children}
    </TecnologiaContext.Provider>
  );
}

export const useTecnologia = () => {
  return useContext(TecnologiaContext);
}