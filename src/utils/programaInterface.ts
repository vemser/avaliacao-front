export interface IProgramas {
  idPrograma: number;
  nome: string;
  situacaoVagaPrograma: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
}

export interface IProgramaContext {
  programas: IObjectProgramas | null;
  cadastrarPrograma: (programa: IProgramas) => Promise<void>;
  pegarPrograma: (pagina?: number, tamanho?: number) => Promise<void>;
  pegarProgramaPorNome: (nome: string, pagina?: number, tamanho?: number) => Promise<void>;
  pegarProgramaFiltroID: (id: string) => Promise<void>;
  deletarProgama: (id: number) => Promise<void>;
  editarPrograma: (programa: IProgramas, id: number) => Promise<void>;
  pegarProgramaAtivo: (pagina?: number, tamanho?: number) => Promise<void>;
  pegarProgramaPorNomeAtivo: (nome: string, pagina?: number, tamanho?: number) => Promise<void>;
  clonarPrograma: (id: number) => Promise<void>;
  pegarProgramaCompleto: (id: number) => Promise<void>;
  programaCompleto: IProgramaCompleto | null;
}

export interface IObjectProgramas {
  totalElementos: number;
  quantidadePaginas: number;
  pagina: number;
  tamanho: number;
  elementos: IProgramas[];
}

export interface IProgramaCompleto {
  idPrograma: number,
  nome: string,
  descricao: string,
  situacaoVagaPrograma: string,
  dataInicio: string,
  dataFim: string,
  trilha: ITrilhas[]
}

export interface ITrilhas {
  idTrilha: number,
  descricao: string,
  nome: string,
  moduloDTOS: IModuloDTOS[]
}

export interface IModuloDTOS {
  idModulo: number,
  nome: string
}