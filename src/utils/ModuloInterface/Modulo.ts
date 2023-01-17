export interface IModulo {
  pegarModulo: (pagina?: number, tamanho?: number) => Promise<void>,
  modulo: IModuloAPI | null,
  moduloPorTrilha: IModulosPorTrilha[],
  deletarModulo: (id: number | undefined) => Promise<void>,
  cadastrarModulo: (dadosModulo: ICadastroModulo) => Promise<void>,
  editarModulo: (dadosModulo: ICadastroModulo, id: number) => Promise<void>,
  clonarModulo: (id: number) => Promise<void>,
  pegarModuloPorFiltro: (pagina?: number, tamanho?: number, filtros?: string) => Promise<void>,
  pegarModuloPorTrilha: (id: number) => Promise<void>,
  pegarModuloPorId: (id: string) => Promise<void>,
  moduloPorId: IModuloTrilha | null
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
  trilhaDTO: ITrilhaDTO[],
  listProgramaDTO: IListProgramaDTO[]
}

export interface ITrilhaDTO {
  idTrilha: number,
  descricao: string,
  nome: string,
  ativo: string
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
  trilha: number[]
}

export interface IModulosPorTrilha {
  idModulo: number,
  nome: string
}

export interface IEditarModulo {
  idModulo: number,
  nome: string,
  trilha: number[]
}

export interface IModuloTrilha {
  idModulo: number,
  nome: string,
  trilhas: [{
    idTrilha: number,
    nome: string,
    descricao: string
  }]
}
