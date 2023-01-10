export interface IAcompanhamento {
  cadastrarAcompanhamento: (dadosAcompanhamento: ICadastrarAcompanhamento) => Promise<void>,
    acompanhamentos: IAcompanhamentoObject | null,
  pegarAcompanhamentos: (pagina?: number, tamanho?: number) => Promise<void>,
  pegarAcompanhamentoNomePrograma: (nome: string, pagina?: number, tamanho?: number) => Promise<void>,
  desativarAcompanhamento: (id: number) => Promise<void>
}

export interface IChildren {
  children: React.ReactNode;
}

export interface ICadastrarAcompanhamento {
  titulo: string,
  descricao: string,
  dataInicio: string,
  dataFim: string,
  idPrograma: number,
}

export interface IAcompanhamentoObject {
 totalElementos: number,
  quantidadePaginas: number,
  pagina: number,
  tamanho: number,
  elementos: IAcompanhamentoApi[]
}

export interface IPrograma {
  idPrograma: number,
  nome: string,
  descricao: string,
  situacaoVagaPrograma: string,
  dataInicio: string,
  dataFim: string
}
export interface IAcompanhamentoApi {
  idAcompanhamento: number,
  titulo: string,
  dataInicio: string,
  dataFim: string,
  descricao: string,
  programa: IPrograma
}