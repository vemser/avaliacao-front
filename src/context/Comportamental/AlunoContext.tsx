import { createContext, useContext, useState } from "react";

import nProgress from 'nprogress';
import { toast } from "react-toastify";
import { toastConfig } from "../../utils/toast";

import { API } from "../../utils/api";
import { IAlunosAPI, IChildren, IAluno } from "../../utils/AlunoInterface/aluno";
import { useNavigate } from "react-router-dom";

import { ICadastroAlunoAPI } from "../../utils/interface";

export const AlunoContext = createContext({} as IAluno);

export const AlunoProvider = ({ children }: IChildren) => {
  const navigate = useNavigate();

  const [alunos, setAlunos] = useState<IAlunosAPI | null>(null);

  const cadastrarAluno = async (dadosAluno: ICadastroAlunoAPI) => {
    try {
      nProgress.start();
      await API.post('/aluno/cadastrar-aluno', dadosAluno, { headers: { Authorization: localStorage.getItem("token") }}).then((response) => {
        navigate('/alunos');
        toast.success('Aluno(a) foi cadastrado(a) com sucesso.', toastConfig);
      })
    } catch (error) {
      toast.error('Houve um erro inesperado.', toastConfig);
    } finally {
      nProgress.done();
    }
  }

  const editarAluno = async (dadosAluno: ICadastroAlunoAPI, id: number) => {
    try {
      nProgress.start();
      await API.put(`/aluno/atualizar-aluno/${id}`, dadosAluno, { headers: { Authorization: localStorage.getItem("token") }}).then((response) => {
        navigate('/alunos');
        toast.success('Aluno(a) foi editado(a) com sucesso.', toastConfig);
      })
    } catch (error) {
      toast.error('Houve um erro inesperado.', toastConfig);
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
    } catch (error) {
      toast.error('Houve um erro inesperado.', toastConfig);
    } finally {
      nProgress.done();
    }
  }

  const deletarAluno = async (idAluno: number | undefined) => {
    try {
      nProgress.start();
      await API.delete(`/aluno/deletar/${idAluno}`, { headers: { Authorization: localStorage.getItem("token") }});
      toast.success('Aluno desativado com sucesso.', toastConfig);
      pegarAluno()
    } catch (error) {
      toast.error('Houve um erro inesperado.', toastConfig);
    } finally {
      nProgress.done();
    }
  }

  return (
    <AlunoContext.Provider value={{ alunos, pegarAluno, deletarAluno, cadastrarAluno, editarAluno }}>
      {children}
    </AlunoContext.Provider>
  );
}

export const useAluno = () => {
  return useContext(AlunoContext)
}