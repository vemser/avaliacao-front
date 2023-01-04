import { createContext, useContext, useState } from "react";

import nProgress from "nprogress";
import { toast } from "react-toastify";
import { toastConfig } from "../../utils/toast";

import { API } from "../../utils/api";
import { IChildren } from "../../utils/interface";
import { ITecnologiaContext, ITecnologiasAPI } from "../../utils/TecnologiaInterface/tecnologia";
import { useNavigate } from "react-router-dom";

export const TecnologiaContext = createContext({} as ITecnologiaContext);

export const TecnologiaProvider = ({ children }: IChildren) => {
  const navigate = useNavigate();

  const [tecnologias, setTecnologias] = useState<ITecnologiasAPI | null>(null);

  const pegarTecnologia = async (pagina: number = 0, tamanho: number = 10) => {
    try {
      nProgress.start();     
      await API.get(`/tecnologia?pagina=${pagina}&tamanho=${tamanho}`, { headers: { Authorization: localStorage.getItem("token") }}).then((response) => {
        setTecnologias(response.data)
      })
    } catch (error) {
      toast.error('Houve um erro inesperado.', toastConfig);
    } finally {
      nProgress.done();
    }
  };

  const cadastrarTecnologia = async (dadosTecnologia: object) => {
    try {
      nProgress.start();     
      await API.post('/tecnologia', dadosTecnologia, { headers: { Authorization: localStorage.getItem("token") }}).then((response) => {
        toast.success('Tecnologia cadastrada com sucesso.', toastConfig);
        pegarTecnologia();
      })
    } catch (error) {
      toast.error('Houve um erro inesperado.', toastConfig);
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