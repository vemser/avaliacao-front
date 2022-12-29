import { createContext, useContext, useState } from "react";

import nProgress from 'nprogress';
import { toast } from "react-toastify";
import { toastConfig } from "../../utils/toast";

import { API } from "../../utils/api";
import { IAlunosAPI, IChildren, IAluno } from "../../utils/AlunoInterface/aluno";
import { useNavigate } from "react-router-dom";

export const AlunoContext = createContext({} as IAluno);

export const AlunoProvider = ({ children }: IChildren) => {
  const navigate = useNavigate();

  const [alunos, setAlunos] = useState<IAlunosAPI | null>(null);

  const pegarAluno = async (pagina: number = 0, tamanho: number = 10) => {
    try {
      nProgress.start();
      await API.get(`/aluno/listar-alunos?page=${pagina}&size=${tamanho}`).then((response) => {
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
      await API.delete(`/aluno/deletar/${idAluno}`);
      toast.success('Aluno desativado com sucesso.', toastConfig);
      pegarAluno()
    } catch (error) {
      toast.error('Houve um erro inesperado.', toastConfig);
    } finally {
      nProgress.done();
    }
  }

  return (
    <AlunoContext.Provider value={{ alunos, pegarAluno, deletarAluno }}>
      {children}
    </AlunoContext.Provider>
  );
}

export const useAluno = () => {
  return useContext(AlunoContext)
}