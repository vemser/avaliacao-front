export interface IAcompanhamento {
  cadastrarAcompanhamento: (dadosAcompanhamento: ICadastrarAcompanhamento) => Promise<void>,
  
}

export interface IChildren {
  children: React.ReactNode;
}

export interface ICadastrarAcompanhamento {
  titulo: string,
  descricao: string,
  dataInicio: string,
  dataFim: string,
  idPrograma: number,
}