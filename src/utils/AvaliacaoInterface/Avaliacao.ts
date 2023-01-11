export interface IAvaliacaoContext {

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