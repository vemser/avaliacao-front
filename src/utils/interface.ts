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

export interface IAuth {
  usuarioLogin: (infoUser: IUsuario) => Promise<void>,
  redefinirSenha: (email: string) => Promise<void>,
  usuarioLogout: () => void,
  trocarSenhaLogado: (senhas: ISenhas) => Promise<void>,
  recuperarSenha: (senha: string) => Promise<void>,
  editarPerfil: (nome: IEditarNome, imagem: FormData, id: number) => Promise<void>,
  tokenAuth: string | null,
  usuarioLogado: any | undefined
}

export interface IAdmin {
  criarColaborador: (userColaborador: IUserColaborador, imagem: FormData) => Promise<void>,
  deletarColaborador: (id: number | undefined) => Promise<void>,
  pegarColaborador: () => Promise<void>,
  editarColaborador: (dadosEditados: IColaboradorEditado, id: number, imagem: FormData) => Promise<void>,
  colaborador: IPegarColaborador[]
}

export interface IAluno {
  getAlunos: () => Promise<void>,
  deletarAluno: (id: number | undefined) => Promise<void>,
  criarAluno: (infosAluno: ICadastroAluno, imagem: FormData) => Promise<void>,
  alunos: IAlunosCadastrados[],
  editarAluno: (dadosEditados: IEditarAluno, id: number, imagem: FormData) => Promise<void>
}

export interface IGestor {
  criarAcompanhamento: (acompanhamento: ICriarAcompanhamento) => Promise<void>,
  editAcompanhamento: (dadosEditados: IEditarAcompanhamento, id: number) => Promise<void>,
  pegarAcompanhamento: () => Promise<void>,
  getAvaliacaoPorID: (id: number, page: number) => Promise<void>,
  criarAvaliacao: (avalicao: ICriarAvaliacao) => void,
  editarAvaliacao: (dadosEditados: IEditarAvaliacao, id: number) => Promise<void>,
  acompanhamento: ICriarAcompanhamento[],
  avaliacoesPorID: IAvaliacaoPorId[],
  avaliacoes: any | null
}

export interface IInstrutor {
  cadastrarFeedback: (feedbacks: object) => Promise<void>,
  pegarFeedback: () => Promise<void>,
  getFeedbackPorID: (id: number, page: number) => Promise<void>,
  editarFeedback: (id: number, dadosEditados: IEditarFeedback) => Promise<void>,
  feedback: ICadastrarFeedback[],
  feedbackPorID: IFeedbackPorId[],
  feedbacks: any | null
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

export interface ICadastroAluno {
  nome: string,
  email: string,
  stack: string
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
  email: string,
  senha: string
}

export interface IUsuarioLogado {
  idUsuario: number,
  nome: string,
  email: string,
  foto: string | null,
  cargo: string
}

export interface IColaboradorEditado {
  nome: string,
  email: string
}

export interface IUserColaborador {
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
  titulo: string,
  descricao: string
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

export interface IEditarAluno {
  idAluno: number,
  stack:string,
  nome: string,
  email: string
}

export interface ICriarAvaliacao {
  idAcompanhamento: number,
  idAluno: number,
  descricao: string,
  tipo: string,
  dataCriacao: string
}