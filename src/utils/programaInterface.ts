import { IModulosPorTrilha } from "./ModuloInterface/Modulo";

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
  programaTrilhaModulo: IProgramaTrilhaModulo | null;
  cadastrarPrograma: (programa: IProgramas) => Promise<void>;
  pegarPrograma: (pagina?: number, tamanho?: number) => Promise<void>;
  pegarProgramaPorNome: (nome: string, pagina?: number, tamanho?: number) => Promise<void>;
  pegarProgramaFiltroID: (id: string) => Promise<void>;
  deletarProgama: (id: number) => Promise<void>;
  editarPrograma: (programa: IProgramas, id: number) => Promise<void>;
  pegarProgramaAtivo: (pagina?: number, tamanho?: number) => Promise<void>;
  pegarProgramaPorNomeAtivo: (nome: string, pagina?: number, tamanho?: number) => Promise<void>;
  clonarPrograma: (id: number) => Promise<void>;
  pegarProgramaPorTrilhaModulo: (id: number) => Promise<void>;
}

export interface IObjectProgramas {
  totalElementos: number;
  quantidadePaginas: number;
  pagina: number;
  tamanho: number;
  elementos: IProgramas[];
}

export interface IProgramaTrilhaModulo {
  idPrograma: number;
  nome: string;
  situacaoVagaPrograma: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  trilha: {
    nome: string,
    descricao: string,
    idTrilha: number
    moduloDTOS: {
      idModulo: number,
      nome: string
    }[]
  }[]
}