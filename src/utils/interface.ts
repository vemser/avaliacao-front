import { number } from "yup";
import { IProgramas } from "./programaInterface";

export interface ILogin {
  password: string,
  showPassword: boolean,
}

export interface IHeaderProps {
  nome: string,
  cargo: string,
  avatar?: string
}

export interface IEditarNome {
  nome: string
}

export interface IPaginacao {
  pagina: number;
  quantidadePagina: number;
  tamanho: number;
  totalElementos: number
}
export interface IAuth {
  usuarioLogin: (infoUser: IUsuario) => Promise<void>,
  usuarioLogout: () => void,
  editarPerfil: (imagem: FormData) => Promise<void>,
  pegarUsuarioLogado: () => Promise<void>,
  decodificarJWT: () => Promise<any>,
  usuarioLogado: any | undefined,
  cargos: string[],
}

export interface IAdmin {
  pegarColaborador: (pagina?: number) => Promise<void>,
  deletarColaborador: (id: number | undefined) => Promise<void>,
  colaborador: IPegarColaborador[],
  paginacaoColaborador: IPaginacao
}

export interface IAluno {
  pegarAluno: (pagina?: number) => Promise<void>,
  editarAluno: (dadosEditados: IEditarAluno, id: number) => Promise<void>,
  deletarAluno: (id: number | undefined) => Promise<void>,
  alunos: IAlunosCadastrados[],
  paginacaoAlunos: IPaginacao,
}

export interface IEditarAluno {
  idAluno: number,
  stack:string,
  nome: string,
  email: string
}

export interface IGestor {
  criarAcompanhamento: (acompanhamento: ICriarAcompanhamento) => Promise<void>,
  editarAcompanhamento: (dadosEditados: IEditarAcompanhamento, id: number) => Promise<void>,
  pegarAcompanhamento: (pagina?: number) => Promise<void>,
  pegarAvaliacaoPorID: (id: number, pagina: number) => Promise<void>,
  criarAvaliacao: (avalicao: ICriarAvaliacao) => void,
  editarAvaliacao: (dadosEditados: IEditarAvaliacao, id: number) => Promise<void>,
  acompanhamento: ICriarAcompanhamento[],
  avaliacoesPorID: IAvaliacaoPorId[],
  avaliacoes: any | null, 
  paginacaoAcompanhamento: IPaginacao
  paginacaoAvaliacao: IPaginacao
}

export interface IInstrutor {
  cadastrarFeedback: (feedbacks: object) => Promise<void>,
  pegarFeedback: (pagina?: number) => Promise<void>,
  pegarFeedbackPorID: (id: number, page: number) => Promise<void>,
  editarFeedback: (id: number, dadosEditados: IEditarFeedback) => Promise<void>,
  feedback: ICadastrarFeedback[],
  feedbackPorID: IFeedbackPorId[],
  feedbacks: any | null,
  paginacaoFeedback: IPaginacao
}

export interface IEditarAvaliacao {
  idAluno: number,
  idAcompanhamento: number,
  descricao: string,
  status: string
}

export interface IAvaliacaoPorId {
  idAvaliacao: number,
  acompanhamento: any,
  aluno: any,
  responsavel: any,
  descricao: string,
  tipo: string,
  dataCriacao: string
}

export interface IFeedbackPorId {
  idFeedBack: number,
  descricao: string,
  tipo: string,
  usuarioDTO: any,
  alunoDTO: any
}

export interface ICadastroAlunoForm {
  nome: string,
  telefone: string,
  cidade: string,
  estado: string,
  email: string,
  situacao: string
  descricao: string,
  idTrilha: string,
  idPrograma: string,
  tecnologias: number[]
}

export interface ICadastroAlunoAPI {
  nome: string,
  telefone: string,
  cidade: string,
  estado: string,
  email: string,
  situacao: string
  descricao: string,
  idTrilha: number,
  idPrograma: number,
  tecnologias: number[]
}

export interface IAlunosCadastrados {
  idAluno: number,
  nome: string,
  stack: string,
  foto: string
}

export interface IChildren {
  children: React.ReactNode;
}

export interface ISenhas {
  senhaAntiga: string,
  senhaNova: string
}

export interface IUsuario {
  username: string,
  password: string
}

export interface IUsuarioLogado {
  idUsuario: number,
  login: string,
  imagem: string | null,
  cargo: string[]
}

export interface IColaboradorEditado {
  nome: string,
  email: string
}

export interface IDadosColaborador {
  nome: string,
  email: string,
  cargo: string
}

export interface IPegarColaborador {
  idUsuario: number,
  nome: string,
  email: string,
  foto: string,
  cargo: string
}

export interface ICriarAcompanhamento {
  idAcompanhamento: number,
  titulo: string,
  descricao: string,
  dataInicio: string
}

export interface IEditarAcompanhamento {
  idPrograma: string,
  titulo: string,
  descricao: string,
  dataInicio: string,
  dataFim: string,
}

export interface ICadastrarFeedback {
  idFeedBack:number,
  usuarioDTO: any,
  alunoDTO: any,
  idUsuario: number,
  idAluno: number,
  descricao: string,
  tipo: string
}

export interface IEditarFeedback {
  idAluno: number,
  descricao: string,
  tipo: string
}

export interface ICriarAvaliacao {
  idAcompanhamento: number,
  idAluno: number,
  descricao: string,
  tipo: string,
  dataCriacao: string
}

export interface IAlterarSenha {
  senhaAntiga: string,
  novaSenha: string,
  confirmarNovaSenha: string
}

export interface IAvaliarAcompanhamento {
  idAcompanhamento: string,
  idAluno: string,
  tipo: string,
  descricao: string,
  dataCriacao: string
}

export interface ICadastrarAcompanhamentoForm {
  idPrograma: string
  titulo: string,
  descricao: string,
  dataInicio: string,
  dataFim: string,
}

export interface IColaborador{
  nome: string,
  email: string,
  cargo: string,
}

export interface ICadastrarFeedbackForm {
  idAluno: string,
  descricao: string,
  tipo: string
}

export interface IEditarFeedbackForm {
  idAluno: string,
  descricao: string,
  tipo: string
}

export interface IEditarAvaliacaoForm {
  idAluno: string,
  idAcompanhamento: string,
  descricao: string,
  status: string
}

export interface IListarAlunos {
  idAluno: number,
  nome: string,
  email: string,
  stack: string,
  foto: string | null
}

export interface ICargosLista {
  nome: string,
  descricao: string
}

export interface IFiltroFeedback {
  idAluno: number,
  idTrilha: number,
  situacao: string,
  nomeInstrutor: string,
}