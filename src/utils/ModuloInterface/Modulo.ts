export interface IModulo {
  pegarModulo: (pagina?: number, tamanho?: number) => Promise<void>,
  modulo: IModuloAPI | null,
  deletarModulo: (id: number | undefined) => Promise<void>,
  cadastrarModulo: (dadosModulo: ICadastroModulo) => Promise<void>,
  editarModulo: (dadosModulo: ICadastroModulo, id: number) => Promise<void>,
  clonarModulo: (id: number) => Promise<void>,
  pegarModuloPorFiltro: (pagina?: number, tamanho?: number, filtros?: string) => Promise<void>
}

export interface IModuloAPI {
  totalElementos: number,
  quantidadePaginas: number,
  pagina: number,
  tamanho: number,
  elementos: IModuloElementos[]
}

export interface IModuloElementos {
  idModulo: number,
  nome: string,
  dataInicio: string,
  dataFim: string,
  ativo: string,
  trilhaDTO: ITrilhaDTO,
  listProgramaDTO: IListProgramaDTO[]
}

export interface ITrilhaDTO {
  idTrilha: number,
  descricao: string,
  nome: string
}

export interface IListProgramaDTO {
  idPrograma: number,
  nome: string,
  descricao: string,
  situacao: string,
  dataInicio: string,
  dataFim: string
}

export interface ICadastroModulo {
  nome: string,
  idTrilha: number,
  listPrograma: number[]
}