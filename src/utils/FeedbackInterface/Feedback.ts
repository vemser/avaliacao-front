import { IProgramas } from "../programaInterface";
import { IAlunosElementos } from "../AlunoInterface/aluno";
import { ITrilhaDTO, IListProgramaDTO } from "../ModuloInterface/Modulo";

export interface IFeedback {
    pegarFeedback: (pagina?: number, tamanho?: number, filtros?: string) => Promise<void>,
    deletarFeedback: (idFeedback: number | undefined) => Promise<void>,
    feedback: IFeedbackAPI | null,
    cadastrarFeedback: (data: iFeedbackCadastroContext) => Promise<void>,
    editarFeedback: (feedback: IEditarFeedback, id: number) => Promise<void>,
    pegarFeedbackFiltros: (pagina?: number, tamanho?: number, filtros?: string) => Promise<void>
}

export interface IChildren {
    children: React.ReactNode
}

export interface IFeedbackAPI {
    totalElementos: number,
    quantidadePaginas: number,
    pagina: number,
    tamanho: number,
    elementos: IFeedbackElementos[]
}

export interface IFeedbackElementos {
    idFeedBack: number,
    descricao: string,
    situacao: string,
    nomeInstrutor: string,
    data: string,
    alunoDTO: IAlunosElementos,
    moduloDTO: IModuloDTO[]
}

export interface IModuloDTO {
    idModulo: number,
    nome: string,
    ativo: string,
    trilhaDTO: ITrilhaDTO,
    listProgramaDTO: IListProgramaDTO
}

export interface IFeedbackCadastro {
    idAluno: {label: string, id: number} | null,
    modulo: number[],
    descricao: string,
    situacao: string,
    idPrograma: string
    idTrilha: {label: string, id: number} | null
}

export interface iFeedbackCadastroContext {
    idAluno: number | undefined,
    modulo: number[],
    descricao: string,
    situacao: string,
}

export interface IEditarFeedback {
    descricao: string,
    situacao: string
}