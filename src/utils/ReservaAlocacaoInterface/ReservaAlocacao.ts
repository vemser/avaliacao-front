export interface IReservaAlocacaoContext {
  cadastrarReservaAlocacao: (ReservaAlocacao: IResrevaAlocacao) => Promise<void>,
  pegarReservaAlocacao: (pagina?: number, tamanho?: number) => Promise<void>,
  reservaAlocacao: IReservaAlocacaoObject | null,
  filtroReservaAlocacao: (nome: string, pagina?: number, tamanho?: number) => Promise<void>,
  editarReservaAlocacao: (reservaAlocacao: IEditarReservaAlocacao, id: number) => Promise<void>
}

export interface IResrevaAlocacao {
  idAluno: number,
  idVaga: number,
  descricao: string,
  situacao: string
  
}

export interface IEditarReservaAlocacao {
  situacao: string,
  descricao: string
}

export interface IReservaAlocacaoObject {
  totalElementos: number,
  quantidadePaginas: number,
  pagina: number,
  tamanho: number,
  elementos: ICadastrarReservaAlocacao[]
}


export interface ICadastrarReservaAlocacao {
  idReservaAlocacao: number,
  vaga: IVaga,
  cliente : ICliente,
  programa: IPrograma[],
  aluno: IAluno,
  situacao: string,
  descricao: string
}

export interface IVaga {
  idVaga: number,
  nome: string,
  quantidade: number,
  quantidadeAlocados: number,
  situacao: "ALOCADO" | "DISPONIVEL" | "RESERVADO" | "CANCELADO",
  dataAbertura: string,
  dataFechamento: string,
  dataCriacao: string,
  cliente: ICliente
}

export interface ICliente {
  idCliente: number,
  nome: string,
  email: string,
  telefone: string,
  ativo: string,
}

export interface IPrograma {
  idPrograma: number;
  nome: string;
  situacao: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
}

export interface IAluno {
  idAluno: number,
  nome: string,
  cidade: string,
  estado: string,
  email: string,
  telefone: string,
  situacao: string,
  descricao: string,
  pontuacao: number,
  tecnologias: ITecnologiasAluno[],
  trilha: ITrilhaAluno,
  programa: IProgramaAluno
}

export interface ITecnologiasAluno {
  nome: string,
  idTecnologia: number,
}

export interface ITrilhaAluno {
  nome: string,
  descricao: string,
  idTrilha: number,
  ativo: string
}

export interface IProgramaAluno {
  idPrograma: number,
  nome: string,
  descricao: string,
  situacao: string,
  dataInicio: string,
  dataFim: string
}