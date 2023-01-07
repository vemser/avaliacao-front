import { IProgramas } from "../programaInterface";
import { IAlunosElementos } from "../AlunoInterface/aluno";
import { ITrilhaDTO, IListProgramaDTO } from "../ModuloInterface/Modulo";

export interface IFeedback {
    pegarFeedback: (pagina?: number, tamanho?: number, filtros?: string) => Promise<void>,
    deletarFeedback: (idFeedback: number | undefined) => Promise<void>,
    feedback: IFeedbackAPI | null
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
    data: string,
    alunoDTO: IAlunosElementos,
    programaDTO: IProgramas,
    trilhaDTO: ITrilhaDTO[],
    listProgramaDTO: IListProgramaDTO
}