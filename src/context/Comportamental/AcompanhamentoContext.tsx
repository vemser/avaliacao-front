import { createContext, useContext, useState } from "react";

import axios from "axios";
import nProgress from 'nprogress';
import { toast } from "react-toastify";
import { toastConfig } from "../../utils/toast";

import { useNavigate } from "react-router-dom";

import { API } from "../../utils/api";

import { IAcompanhamento, IChildren, ICadastrarAcompanhamento } from "../../utils/AcompanhamentoInterface/acompanhamento";

export const AcompanhamentoContext = createContext({} as IAcompanhamento);

export const AcompanhamentoProvider = ({ children }: IChildren) => {
  const navigate = useNavigate();

  const cadastrarAcompanhamento = async (dadosAcompanhamento: ICadastrarAcompanhamento) => {
    try {
      nProgress.start();
      await API.post('/acompanhamento/criar', dadosAcompanhamento, { headers: { Authorization: localStorage.getItem("token") }}).then((response) => {
        navigate('/acompanhamentos');
        toast.success('Aluno cadastrado com sucesso!', toastConfig);
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

  const editarAcompanhamento = async (dadosAluno: any, id: number) => {
    try {
      nProgress.start();
      await API.put(`/aluno/atualizar-aluno/${id}`, dadosAluno, { headers: { Authorization: localStorage.getItem("token") }}).then((response) => {
        navigate('/alunos');
        toast.success('Aluno editado com sucesso!', toastConfig);
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
    <AcompanhamentoContext.Provider value={{ cadastrarAcompanhamento }}>
      {children}
    </AcompanhamentoContext.Provider>
  );
}

export const useAcompanhamento = () => {
  return useContext(AcompanhamentoContext)
}