import { createContext, useContext } from "react";

import nProgress from 'nprogress';
import { toast } from "react-toastify";
import { toastConfig } from "../../utils/toast";

import { API } from "../../utils/api";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import { IChildren, IAvaliacaoContext, ICadastrarAvalicao } from "../../utils/AvaliacaoInterface/Avaliacao";

export const AvaliacaoContext = createContext({} as IAvaliacaoContext);

export const AvaliacaoProvider = ({ children }: IChildren) => {
  const navigate = useNavigate()

  const cadastrarAvalicao = async (avalicao: ICadastrarAvalicao) => {
    try {
      nProgress.start();
      await API.post("/avaliacao/create", avalicao, { headers: { Authorization: localStorage.getItem("token") }})
      toast.success("Cliente criado com sucesso!", toastConfig);
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
    <AvaliacaoContext.Provider value={{ cadastrarAvalicao }}>
      {children}
    </AvaliacaoContext.Provider>
  );
}

export const useAvaliacao = () => {
  return useContext(AvaliacaoContext)
}