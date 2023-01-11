import { IAcompanhamentoApi } from "../AcompanhamentoInterface/acompanhamento";
import { IAlunosElementos } from "../AlunoInterface/aluno";

export interface IAvaliacaoContext {
  pegarAvaliacao: (pagina?: number, tamanho?: number, filtros?: string) => Promise<void>,
  deletarAvaliacao: (idAluno: number | undefined) => Promise<void>,
  avaliacoes: IAvaliacaoAPI | null
}

export interface IChildren {
  children: React.ReactNode;
}

export interface IAvaliacao {
  idAcompanhamento: number,
  idPrograma: number,
  idTrilha: number,
  idAluno: number,
  descricao: string,
  data: string,
  situacao: string
}

export interface IEditarAvaliacao {
  descricao: string,
  situacao: string
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