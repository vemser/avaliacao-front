export interface IProgramas {
  idPrograma: number;
  nome: string;
  situacao: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
}

export interface IProgramaContext {
  programas: IObjectProgramas | null;
  cadastrarPrograma: (programa: IProgramas) => Promise<void>;
  pegarPrograma: (pagina?: number, tamanho?: number) => Promise<void>;
  pegarProgramaPorNome: (nome: string, pagina?: number, tamanho?: number) => Promise<void>;
  deletarProgama: (id: number) => Promise<void>;
  editarPrograma: (programa: IProgramas, id: number) => Promise<void>;
}

export interface IObjectProgramas {
  totalElementos: number;
  quantidadePaginas: number;
  pagina: number;
  tamanho: number;
  elementos: IProgramas[];
}