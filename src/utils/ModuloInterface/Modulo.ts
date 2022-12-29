export interface IModulo {
  pegarModulo: (pagina?: number, tamanho?: number) => Promise<void>,
  modulo: IModuloAPI | null,
  deletarModulo: (id: number | undefined) => Promise<void>

}

export interface IModuloAPI{
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
  ativo: string
}