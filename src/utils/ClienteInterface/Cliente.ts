
export interface ICadastrarCliente {
  nome: string,
  email: string,
  telefone: string
}


export interface IClienteContext {
  cadastrarCliente: (cliente: any) => Promise<void>,
  pegarCliente: (pagina?: number, tamanho?: number) => Promise<void>,
  cliente: IClienteAPI | null,
  deletarCliente: (id: number | undefined) => Promise<void>,
  pegarClientePorNome: (nome: string, pagina?: number, tamanho?: number) => Promise<void>,
  pegarClientePorEmail: (nome: string, pagina?: number, tamanho?: number) => Promise<void>
}

export interface IClienteAPI {
  totalElementos: number,
  quantidadePaginas: number,
  pagina: number,
  tamanho: number,
  elementos: IClienteElementos[]
}

export interface IClienteElementos {
  idCliente: number,
  nome: string,
  email: string,
  telefone: string,
  ativo: string,
}