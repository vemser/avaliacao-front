import { ICadastroAlunoAPI } from "../interface";

export interface IAluno {
  pegarAluno: (pagina?: number, tamanho?: number, filtros?: string) => Promise<void>,
  deletarAluno: (idAluno: number | undefined) => Promise<void>,
  cadastrarAluno: (dadosAluno: ICadastroAlunoAPI) => Promise<void>,
  editarAluno: (dadosAluno: ICadastroAlunoAPI, id: number) => Promise<void>,
  alunos: IAlunosAPI | null
}

export interface IChildren {
  children: React.ReactNode;
}

export interface IAlunosAPI {
  totalElementos: number,
  quantidadePaginas: number,
  pagina: number,
  tamanho: number,
  elementos: IAlunosElementos[]
}

export interface IAlunosElementos {
  idAluno: number,
  nome: string,
  cidade: string,
  estado: string,
  email: string,
  telefone: string,
  situacao: string,
  descricao: string,
  pontuacao: number,
  tecnologias: ITecnologiasAluno,
  trilha: ITrilhaAluno,
  programa: IProgramaAluno
}

export interface ITrilhaAluno {
  nome: string,
  descricao: string,
  idTrilha: number
}

export interface IProgramaAluno {
  idPrograma: number,
  nome: string,
  descricao: string,
  situacao: string,
  dataInicio: string,
  dataFim: string
}

export interface ITecnologiasAluno {
  nome: string,
  idTecnologia: number,
}