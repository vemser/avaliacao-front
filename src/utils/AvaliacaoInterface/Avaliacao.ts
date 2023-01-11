export interface IAvaliacaoContext {
  cadastrarAvalicao: (avalicao: ICadastrarAvalicao) => Promise<void>
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
  situacao: string
}

export interface ICadastrarAvalicao {
  idAcompanhamento: number,
  idAluno: number,
  descricao: string,
  tipoAvaliacao: string,
  dataCriacao: string
}