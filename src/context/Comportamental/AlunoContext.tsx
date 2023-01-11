import { createContext, useContext, useState } from "react";

import nProgress from 'nprogress';
import { toast } from "react-toastify";
import { toastConfig } from "../../utils/toast";

import { API } from "../../utils/api";
import { IAlunosAPI, IChildren, IAluno } from "../../utils/AlunoInterface/aluno";
import { useNavigate } from "react-router-dom";

import { ICadastroAlunoAPI } from "../../utils/interface";
import axios from "axios";

export const AlunoContext = createContext({} as IAluno);

export const AlunoProvider = ({ children }: IChildren) => {
  const navigate = useNavigate();
  const [alunos, setAlunos] = useState<IAlunosAPI | null>(null);

  const cadastrarAluno = async (dadosAluno: ICadastroAlunoAPI) => {
    try {
      nProgress.start();
      await API.post('/aluno/cadastrar-aluno', dadosAluno, { headers: { Authorization: localStorage.getItem("token") }}).then((response) => {
        navigate('/alunos');
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

  const editarAluno = async (dadosAluno: ICadastroAlunoAPI, id: number) => {
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

  const pegarAluno = async (pagina: number = 0, tamanho: number = 10, filtros: string = '') => {
    try {
      nProgress.start();
      await API.get(`/aluno/listar-alunos?page=${pagina}&size=${tamanho}${filtros}`, { headers: { Authorization: localStorage.getItem("token") }}).then((response) => {
        setAlunos(response.data);
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

  const pegarAlunoDisponivel = async (pagina: number = 0, tamanho: number = 10) => {
    try {
      nProgress.start();
      const { data } = await API.get(`/aluno/listar-alunos?page=${pagina}&size=${tamanho}`, { headers: { Authorization: localStorage.getItem("token") } });
      let alunoDisponivel = data;
      alunoDisponivel.elementos = alunoDisponivel.elementos.filter((aluno: any) => aluno.situacao === "DISPONIVEL");
      setAlunos(alunoDisponivel);
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

  const pegarAlunoDisponivelPorNome = async (nome:string, pagina: number = 0, tamanho: number = 10) => {
    try {
      nProgress.start();
      const { data } = await API.get(`/aluno/listar-alunos?page=${pagina}&size=${tamanho}&nome=${nome}`, { headers: { Authorization: localStorage.getItem("token") } });
      let alunoDisponivel = data;
      alunoDisponivel.elementos = alunoDisponivel.elementos.filter((aluno: any) => aluno.situacao === "DISPONIVEL");
      setAlunos(alunoDisponivel);
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



  const deletarAluno = async (idAluno: number | undefined) => {
    try {
      await API.delete(`/aluno/deletar/${idAluno}`, { headers: { Authorization: localStorage.getItem("token") }});
      toast.success('Aluno desativado com sucesso!', toastConfig);
      pegarAluno()
    } catch (error: any) {
      let message = "Ops, algo deu errado!";
      if (error.response.status === 403) {
        message = "Você não tem permissão para acessar esse recurso"
      } else if (axios.isAxiosError(error) && error?.response) {
        message = error.response.data.message || error.response.data.errors[0];
      }  
      toast.error(message, toastConfig);
    }
  }

  return (
    <AlunoContext.Provider value={{ alunos, pegarAluno, deletarAluno, cadastrarAluno, editarAluno,pegarAlunoDisponivel,pegarAlunoDisponivelPorNome }}>
      {children}
    </AlunoContext.Provider>
  );
}

export const useAluno = () => {
  return useContext(AlunoContext)
}