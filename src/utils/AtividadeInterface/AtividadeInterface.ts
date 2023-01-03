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