export interface IAtividadeObject {
  totalElementos: number;
  quantidadePaginas: number;
  pagina: number;
  tamanho: number;
  elementos: IAtividadeApi[];
}

export interface IAtividadeApi {
  idAtividade: number,
  nomeInstrutor: string,
  titulo: string,
  descricao: string,
  pesoAtividade: number,
  dataCriacao: string,
  dataEntrega: string,
  situacao: string,
  ativo: "S" | "N"
  programa: {
    idPrograma: number,
    nome: string,
    descricao: string,
    situacao: string,
    dataInicio: string,
    dataFim: string,
  },
  alunos: IAlunoAtividade[],
  modulos: IModuloAtividade[]
}

export interface IAlunoAtividade {
  idAluno: number,
  nome: string,
  cidade: string,
  estado: string,
  email: string,
  telefone: string,
  descricao: string,
  pontuacao: number
}

export interface IModuloAtividade {
  idModulo: number,
  nome: string,
  dataInicio: string,
  dataFim: string,
  ativo: "S" | "N"
}

export interface IAtividadeContext {
  atividades: IAtividadeObject | null,
  cadastrarAtividade: (atividade: IAtividadeForm) => Promise<void>,
  pegarAtividade: (pagina?: number, tamanho?: number) => Promise<void>,
  deletarAtividade: (id: number) => Promise<void>,
  editarAtividade: (atividade: IAtividadeForm, id: number) => Promise<void>,
  pegarAtividadePorId: (id: number) => Promise<void>,
}

export interface IAtividadeForm {
  titulo: string,
  pesoAtividade: string,
  dataEntrega: string,
  descricao: string,
  nomeInstrutor: string,
  idPrograma: string,
  modulos: number[],
  alunos: number[]
}