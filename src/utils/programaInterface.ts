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
  mudaDashboard: boolean;
  setMudaDashboard: React.Dispatch<React.SetStateAction<boolean>>;
  cadastrarPrograma: (programa: IProgramas) => Promise<void>;
  pegarPrograma: (pagina?: number, tamanho?: number) => Promise<void>;
  pegarProgramaPorNome: (nome: string, pagina?: number, tamanho?: number) => Promise<void>;
  deletarProgama: (id: number) => Promise<void>;
  editarPrograma: (programa: IProgramas, id: number) => Promise<void>;
  pegarProgramaAtivo: (pagina?: number, tamanho?: number) => Promise<void>;
}

export interface IObjectProgramas {
  totalElementos: number;
  quantidadePaginas: number;
  pagina: number;
  tamanho: number;
  elementos: IProgramas[];
}