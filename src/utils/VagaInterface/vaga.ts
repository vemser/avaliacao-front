export interface IVaga {
  nome: string,
  quantidade: number,
  idCliente: number,
  idPrograma: number,
  situacao: "ABERTO" | "FECHADO",
  dataAbertura: string,
  dataFechamento: string,
  dataCriacao: string,
  idVaga: number,
}

export interface IVagaContext {
  vagas: IVagaObject | null,
  cadastrarVaga: (vaga: IVaga) => Promise<void>,
  pegarVagas: (pagina?: number, tamanho?: number, filtros?: string) => Promise<void>
  deletarVaga: (id: number) => Promise<void>,
  editarVaga: (vaga: IVaga, id: number) => Promise<void>,
}

export interface IVagaObject {
  totalElementos: number;
  quantidadePaginas: number;
  pagina: number;
  tamanho: number;
  elementos: IVagaApi[];
}

export interface IVagaApi {
  nome: string,
  quantidade: number,
  quantidadeAlocados: number,
  cliente: {
    idCliente: number,
    nome: string,
    email: string,
    telefone: string,
    ativo: "S" | "N"
  }
  programas: {
    idPrograma: number,
    nome: string;
    descricao: string;
    situacao: string;
    dataInicio: string;
    dataFim: string;
  }
  situacao: "ABERTO" | "FECHADO",
  dataAbertura: string,
  dataFechamento: string,
  dataCriacao: string,
  idVaga: number,
}