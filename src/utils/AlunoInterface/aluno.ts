import { ICadastroAlunoAPI } from "../interface";

export interface IAluno {
  pegarAluno: (pagina?: number, tamanho?: number, filtros?: string) => Promise<void>,
  deletarAluno: (idAluno: number | undefined) => Promise<void>,
  cadastrarAluno: (dadosAluno: ICadastroAlunoAPI) => Promise<void>,
  editarAluno: (dadosAluno: ICadastroAlunoAPI, id: number) => Promise<void>,
  alunos: IAlunosAPI | null,
  alunosFiltro: IAlunosAPI | null,
  pegarAlunoDisponivel: (pagina?: number, tamanho?: number) => Promise<void>,
  pegarAlunoDisponivelPorNome: (nome: string, pagina?: number, tamanho?: number) => Promise<void>,
  pegarAlunoPorTrilha: (idPrograma: number, idTrilha?: number, pagina?: number, tamanho?: number) => Promise<void>,
  pegarAlunoFiltroProgramaTrilhaNome: (idPrograma?: number | null, idTrilha?: number | null, nome?: string | null, pagina?: number, tamanho?: number) => Promise<void>,
  pegarAlunoFiltroListagem: (idPrograma?: number | null, trilha?: string | null, nomeAluno?: string | null, pagina?: number, tamanho?: number) => Promise<void>
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