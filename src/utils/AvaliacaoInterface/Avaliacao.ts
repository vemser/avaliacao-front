import { IAcompanhamentoApi } from "../AcompanhamentoInterface/acompanhamento";
import { IAlunosElementos } from "../AlunoInterface/aluno";

export interface IAvaliacaoContext {
  cadastrarAvalicao: (avalicao: ICadastrarAvalicao) => Promise<void>,
  pegarAvaliacao: (pagina?: number, tamanho?: number, filtros?: string) => Promise<void>,
  deletarAvaliacao: (idAluno: number | undefined) => Promise<void>,
  avaliacoes: IAvaliacaoAPI | null,
  editarAvaliacao: (avalicao: IEditarAvaliacao, id: number) => Promise<void>
}

export interface IChildren {
  children: React.ReactNode;
}

export interface IAvaliacao {
  idAcompanhamento: number,
  // idPrograma: number,
  // idTrilha: number,
  idAluno: number,
  descricao: string,
  tipoAvaliacao: string,
  dataCriacao: string,
}

export interface IEditarAvaliacao {
  descricao: string,
  dataCriacao: string,
  tipoAvaliacao: string
}

export interface ICadastrarAvalicao {
  idAcompanhamento: number,
  idAluno: number,
  descricao: string,
  tipoAvaliacao: string,
  dataCriacao: string
}

export interface IAvaliacaoAPI {
  totalElementos: number,
  quantidadePaginas: number,
  pagina: number,
  tamanho: number,
  elementos: IAvaliacaoElementos[]
}

export interface IAvaliacaoElementos {
  idAvaliacao: number,
  descricao: string,
  tipoAvaliacao: string,
  dataCriacao: string,
  acompanhamento: IAcompanhamentoApi,
  aluno: IAlunosElementos,
}