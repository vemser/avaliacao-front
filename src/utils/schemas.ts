import * as yup from "yup";

const regexEmail = /^[A-Za-z0-9._%+-]+@dbccompany.com.br$/;

const regexEmailUserName = /^(?:([A-Za-z0-9._%+-]+@dbccompany.com.br)|([A-Za-z]+.[A-Za-z]+))$/

export const userSchema = yup.object().shape({
  username: yup.string().required("Por favor, digite seu usuário").matches(regexEmailUserName, "Precisa ser email @dbccompany.com.br ou usuário válido"),
  password: yup.string().required("Por favor, digite sua senha").min(8, "A senha deve ter no mínimo 8 caracteres")
});

export const alunoSchema = yup.object().shape({
  nome: yup.string().required("Por favor, digite seu nome completo").min(3,"O nome deve conter no mínimo 3 caracteres"),
  telefone: yup.string().required("Por favor, digite o telefone"),
  cidade: yup.string().required("Por favor, digite sua Cidade"),
  estado: yup.string().required("Por favor, digite seu Estado"),
  email: yup.string().required("Por favor, digite seu e-mail").email("Por favor, digite um e-mail válido").matches(regexEmail, "Só aceitamos email @dbccompany.com.br"),
  situacao: yup.string().required("Por favor, escolha uma situação"),
  descricao: yup.string().required("Por favor, digite uma descrição"),
  idTrilha: yup.string().required("Por favor, escolha uma trilha"),
  idPrograma: yup.string().required('Por favor, escolha um programa'),
});

export const trilhaSchema = yup.object().shape({
  nome: yup.string().required("Por favor, digite o nome da Trilha").min(3,"O nome deve conter no mínimo 3 caracteres"),
  descricao: yup.string()
})

export const editarAlunoSchema = yup.object().shape({
  nome: yup.string().required("Por favor, digite seu nome completo").min(3,"O nome deve conter no mínimo 3 caracteres"),
  email: yup.string().required("Por favor, digite seu e-mail").email("Por favor, digite um e-mail válido").matches(regexEmail, "Só aceitamos email @dbccompany.com.br"),
  trilha: Object({ nome: yup.string().required("Edição é obrigatória!") })
});

export const editarNomePerfil = yup.object().shape({
  nome: yup.string().required("Por favor, digite seu nome completo").min(3,"O nome deve conter no mínimo 3 caracteres")
})

export const colaboradorSchema = yup.object().shape({
  nome: yup.string().required("Por favor, digite seu nome completo").min(3,"O nome deve conter no mínimo 3 caracteres"),
  email: yup.string().required("Por favor, digite seu e-mail").email("Por favor, digite um e-mail válido").matches(regexEmail, "Só aceitamos email @dbccompany.com.br"),
  cargo: yup.string().required("Por favor, escolha um dos tipos de perfil.").nullable()
});

export const editarColaboradorSchema = yup.object().shape({
  nome: yup.string().required("Por favor, digite seu nome completo").min(3,"O nome deve conter no mínimo 3 caracteres"),
  email: yup.string().required("Por favor, digite seu e-mail").email("Por favor, digite um e-mail válido").matches(regexEmail, "Só aceitamos email @dbccompany.com.br")
});

export const redefinirSenhaSchema = yup.object().shape({
  novaSenha: yup.string().required("Por favor, digite sua nova senha").min(8,"A nova senha deve conter no mínimo 8 caracteres"),
  confirmarNovaSenha: yup.string().required("Por favor, confirme sua nova senha.").oneOf([yup.ref("novaSenha")],"As senhas devem corresponder!")
});

export const AlterarSenhaSchema = yup.object().shape({
  senhaAntiga: yup.string().required("Por favor, digite sua antiga senha").min(8,"A nova senha deve conter no mínimo 8 caracteres"),
  novaSenha: yup.string().required("Por favor, digite sua nova senha").min(8,"A nova senha deve conter no mínimo 8 caracteres"),
  confirmarNovaSenha: yup.string().required("Por favor, confirme sua nova senha.").oneOf([yup.ref("novaSenha")],"As senhas devem corresponder!")
});

export const CadastrarAcompanhamentoSchema = yup.object().shape({
  titulo: yup.string().required("Por favor, digite algum titulo"),
  descricao: yup.string().required("Por favor, digite alguma coisa na descrição"),
  dataInicio: yup.string().required("Por favor, escolha uma data inicial")
})

export const EditarAvaliacaoSchema = yup.object().shape({
  idAcompanhamento: yup.string().required("Por favor, selecione um acompanhamento"),
  idAluno:  yup.string().required("Por favor, selecione uns dos alunos"),
  status: yup.string().required("Por favor, selecione uns dos tipos"),
  descricao: yup.string().required("Por favor, digite alguma coisa na descrição")
})

export const CriarAvaliacaoSchema = yup.object().shape({
  idAcompanhamento: yup.string().required("Por favor, selecione um acompanhamento"),
  idAluno:  yup.string().required("Por favor, selecione uns dos alunos"),
  tipo: yup.string().required("Por favor, selecione uns dos tipos"),
  descricao: yup.string().required("Por favor, digite alguma coisa na descrição"),
  dataCriacao: yup.string().required("Por favor, escolha uma data inicial")
})

export const EditarAcompanhamentoSchema = yup.object().shape({
  titulo: yup.string().required("Por favor, digite um titulo para o acompanhamento"),
  descricao: yup.string().required("Por favor, preencha a descrição"),
})

export const CadastrarFeedbackSchema = yup.object().shape({
  idAluno:  yup.string().required("Por favor, selecione uns dos alunos"),
  descricao: yup.string().required("Por favor, digite alguma coisa na descrição"),
  tipo: yup.string().required("Por favor, selecione uns dos tipos")
})

export const EditarFeedbackSchema = yup.object().shape({
  idAluno:  yup.string().required("Por favor, selecione uns dos alunos"),
  descricao: yup.string().required("Por favor, digite alguma coisa na descrição"),
  tipo: yup.string().required("Por favor, selecione uns dos tipos")
})

export const ProgramaSchema = yup.object().shape({
  nome:  yup.string().required("Por favor, insira um nome para a trilha").min(3, "O nome deve 3 caracteres"),
  descricao: yup.string(),
  dataInicio: yup.string().required("Por favor, insira uma data inicial"),
  dataFim: yup.string().required("Por favor, insira uma data final"),
})

export const moduloSchema = yup.object().shape({
  nome: yup.string().required("Por favor, insira um nome para a trilha").min(3, "O nome deve 3 caracteres"),
  dataInicio: yup.string().required("Por favor, insira uma data inicial"),
  dataFim: yup.string().required("Por favor, insira uma data final"),
  idTrilha: yup.string().required("Por favor, selecione uma trilha")
})

export const ClienteSchema = yup.object().shape({
  nome: yup.string().required("Por favor, digite o nome do cliente"),
  email: yup.string().required("Por favor, digite o e-mail do cliente").email("Por favor, digite um e-mail válido").matches(regexEmail, "Só aceitamos email @dbccompany.com.br"),
  telefone: yup.string().required("Por favor, digite o telefone do cliente")
})

export const VagaSchema = yup.object().shape({
  nome: yup.string().required("Por favor, insira um nome para a vaga").min(3, "O nome ter deve 3 caracteres no mínimo"),
  quantidade: yup.number().typeError("Deve ser um número").required("Por favor, insira uma quantidade de vagas"),
  idPrograma: yup.string().required("Por favor, insira um programa"),
  idCliente: yup.string().required("Por favor, insira um cliente"),
  situacao: yup.string().required("Por favor, insira a situação da vaga"),
  dataAbertura: yup.string().required("Por favor, insira uma data de abertura"),
  dataFechamento: yup.string().required("Por favor, insira uma data de fechamento"),
})

export const atividadeSchema = yup.object().shape({
  titulo: yup.string().required("Por favor, insira um título para a atividade").min(3, "O nome deve ter 3 caracteres no mínimo"),
  pesoAtividade: yup.number().positive("Deve ser um número positivo").typeError("Deve ser um número").required("Por favor, insira um peso para a atividade"),
  dataEntrega: yup.string().required("Por favor, insira uma data de entrega"),
  idPrograma: yup.string().required("Por favor, selecione um programa"),
  descricao: yup.string().required("Por favor, insira uma descrição"),
})