export interface ITecnologiaContext {
  pegarTecnologia: (pagina?: number, tamanho?: number) => Promise<void>,
  cadastrarTecnologia: (dadosTecnologia: object) => Promise<void>,
  tecnologias: ITecnologiasAPI | null
}

export interface IChildren {
  children: React.ReactNode;
}

export interface ITecnologiasAPI {
  totalElementos: number,
  quantidadePaginas: number,
  pagina: number,
  tamanho: number,
  elementos: ITecnologiasElementos[]
}

export interface ITecnologiasElementos {
  nome: string,
  idTecnologia: number
}