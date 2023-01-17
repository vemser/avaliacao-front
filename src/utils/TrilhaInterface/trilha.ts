export interface ITrilha {
  pegarTrilha: (pagina?: number, tamanho?: number) => Promise<void>,
  deletarTrilha: (idTrilha: number | undefined) => Promise<void>,
  cadastrarTrilha: (dadosTrilha: IDadosTrilha) => Promise<void>,
  editarTrilha: (dadosTrilha: IDadosTrilha, idTrilha: number) => Promise<void>,
  pegarTrilhaFiltroNome: (nome: string, pagina?: number, tamanho?: number) => Promise<void>,
  pegarTrilhaFiltroID: (id: string) => Promise<void>,
  pegarTrilhaPorPrograma: (id: number) => Promise<void>,
  trilhas: ITrilhasAPI | null,
  trilhasPorPrograma: ITrilhasPorPrograma[]
}

export interface IChildren {
  children: React.ReactNode;
}

export interface ITrilhasAPI {
  totalElementos: number,
  quantidadePaginas: number,
  pagina: number,
  tamanho: number,
  elementos: ITrilhasElementos[]
}

export interface ITrilhasElementos {
  nome: string,
  descricao: string,
  idTrilha: number
}

export interface IDadosTrilha {
  nome: string, 
  descricao: string,
  idPrograma: number
}

export interface ITrilhasPorPrograma {
  idTrilha: number,
  nome: string,
  descricao: string
}