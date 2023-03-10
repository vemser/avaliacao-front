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
  const [alunosFiltro, setAlunosFiltro] = useState<IAlunosAPI | null>(null);

  const cadastrarAluno = async (dadosAluno: ICadastroAlunoAPI) => {
    try {
      
      nProgress.start();
      await API.post('/aluno/cadastrar-aluno', dadosAluno).then((response) => {
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
      await API.put(`/aluno/atualizar-aluno/${id}`, dadosAluno).then((response) => {
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
      await API.get(`/aluno/listar-alunos?page=${pagina}&size=${tamanho}${filtros}`).then((response) => {
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

  const pegarAlunoFiltroListagem = async (idPrograma?: number | null, trilha?: string | null, nomeAluno?: string | null, pagina: number = 0, tamanho: number = 10) => {
    try {
      nProgress.start();
      await API.get(`/aluno/listar-alunos?page=${pagina}&size=${tamanho}${idPrograma ? `&idPrograma=${idPrograma}` : ""}${trilha ? `&trilha=${trilha}` : ""}${nomeAluno ? `&nomeAluno=${nomeAluno}` : ""}`).then((response) => {
        setAlunosFiltro(response.data);
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
      const { data } = await API.get(`/aluno/disponiveis?page=${pagina}&size=${tamanho}`);
      setAlunos(data);
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

  const pegarAlunoDisponivelPorNome = async (nome: string, pagina: number = 0, tamanho: number = 10) => {
    try {
      nProgress.start();
      const { data } = await API.get(`/aluno/disponiveis?page=${pagina}&size=${tamanho}&nome=${nome}`);
      setAlunos(data);
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

  const pegarAlunoPorTrilha = async (idPrograma: number, idTrilha?: number, pagina: number = 0, tamanho: number = 10) => {
    try {
      nProgress.start();
      const { data } = await API.get(`/aluno/alunos-ativos-por-programa/${idPrograma}?page=${pagina}&size=${tamanho}${idTrilha ? `&idTrilha=${idTrilha}` : ''}`);
      setAlunos(data)
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

  const pegarAlunoFiltroProgramaTrilhaNome = async (idPrograma?: number | null, idTrilha?: number | null, nome?: string | null, pagina: number = 0, tamanho: number = 10) => {
    try {
      nProgress.start();
      const { data } = await API.get(`/aluno/alunos-por-programa-trilha-nome?page=${pagina}&size=${tamanho}${idPrograma ? `&idPrograma=${idPrograma}` : ""}${idTrilha ? `&idTrilha=${idTrilha}` : ""}${nome ? `&nome=${nome}` : ""}`);
      setAlunosFiltro(data);
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
      await API.delete(`/aluno/deletar/${idAluno}`);
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
    <AlunoContext.Provider value={{ alunos, pegarAluno, deletarAluno, cadastrarAluno, editarAluno, pegarAlunoDisponivel, pegarAlunoDisponivelPorNome, pegarAlunoPorTrilha, pegarAlunoFiltroProgramaTrilhaNome, alunosFiltro, pegarAlunoFiltroListagem }}>
      {children}
    </AlunoContext.Provider>
  );
}

export const useAluno = () => {
  return useContext(AlunoContext)
}