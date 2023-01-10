import * as yup from "yup";

const regexEmail = /^[A-Za-z0-9._%+-]+@dbccompany.com.br$/;

const regexEmailUserName = /^(?:([A-Za-z0-9._%+-]+@dbccompany.com.br)|([A-Za-z]+.[A-Za-z]+))$/;

const regexNome = /^[\D]+$/;

export const userSchema = yup.object().shape({
  username: yup.string().required("Por favor, digite seu usuário").matches(regexEmailUserName, "Precisa ser email @dbccompany.com.br ou usuário válido"),
  password: yup.string().required("Por favor, digite sua senha").min(8, "A senha deve ter no mínimo 8 caracteres")
});

export const alunoSchema = yup.object().shape({
  nome: yup.string().required("Por favor, digite o nome completo").min(3,"O nome deve conter no mínimo 3 caracteres").matches(regexNome, 'Por favor, digite apenas letras.'),
  telefone: yup.string().required("Por favor, digite o telefone"),
  cidade: yup.string().required("Por favor, digite a cidade").matches(regexNome, 'Por favor, digite apenas letras.'),
  estado: yup.string().required("Por favor, digite o estado").matches(regexNome, 'Por favor, digite apenas letras.'),
  email: yup.string().required("Por favor, digite o e-mail DBC").email("Por favor, digite um e-mail válido").matches(regexEmail, "Necessário ser e-mail @dbccompany.com.br"),
  idPrograma: yup.string().required("Por favor, escolha um programa"),
  situacao: yup.string().required("Por favor, escolha uma situação"),
  descricao: yup.string().required("Por favor, digite uma descrição"),
  idTrilha: yup.string().required("Por favor, escolha uma trilha")
});

export const trilhaSchema = yup.object().shape({
  nome: yup.string().required("Por favor, digite o nome da Trilha").min(3,"O nome deve conter no mínimo 3 caracteres").matches(regexNome, 'Por favor, digite apenas letras.'),
  descricao: yup.string()
})

export const editarAlunoSchema = yup.object().shape({
  nome: yup.string().required("Por favor, digite o nome completo").min(3,"O nome deve conter no mínimo 3 caracteres").matches(regexNome, 'Por favor, digite apenas letras.'),
  email: yup.string().required("Por favor, digite o e-mail").email("Por favor, digite um e-mail válido").matches(regexEmail, "Necessário ser e-mail @dbccompany.com.br"),
  trilha: Object({ nome: yup.string().required("Edição é obrigatória!") })
});

// tirar
export const editarNomePerfil = yup.object().shape({
  nome: yup.string().required("Por favor, digite seu nome completo").min(3,"O nome deve conter no mínimo 3 caracteres")
})

export const colaboradorSchema = yup.object().shape({
  nome: yup.string().required("Por favor, digite o nome completo").min(3,"O nome deve conter no mínimo 3 caracteres"),
  email: yup.string().required("Por favor, digite o e-mail").email("Por favor, digite um e-mail válido").matches(regexEmail, "Necessário ser e-mail @dbccompany.com.br"),
  cargo: yup.string().required("Por favor, escolha um dos tipos de perfil.").nullable()
});

export const editarColaboradorSchema = yup.object().shape({
  nome: yup.string().required("Por favor, digite o nome completo").min(3,"O nome deve conter no mínimo 3 caracteres"),
  email: yup.string().required("Por favor, digite o e-mail").email("Por favor, digite um e-mail válido").matches(regexEmail, "Necessário ser e-mail @dbccompany.com.br")
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
  dataInicio: yup.string().required("Por favor, escolha uma data inicial"),
  dataFim: yup.string(),
  idPrograma: yup.string().required("Por favor, insira um programa")
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
  titulo: yup.string().required("Por favor, digite algum titulo"),
  descricao: yup.string().required("Por favor, digite alguma coisa na descrição"),
  dataInicio: yup.string().required("Por favor, escolha uma data inicial"),
  dataFinal: yup.string(),
  idPrograma: yup.string().required("Por favor, insira um programa")
})

export const ProgramaSchema = yup.object().shape({
  nome: yup.string().required("Por favor, insira um nome para a trilha").min(3, "O nome deve 3 caracteres"),
  descricao: yup.string(),
  dataInicio: yup.string().required("Por favor, insira uma data inicial"),
  dataFim: yup.string().required("Por favor, insira uma data final"),
})

export const moduloSchema = yup.object().shape({
  nome: yup.string().required("Por favor, insira um nome para a trilha").matches(regexNome, 'Por favor, digite apenas letras.'),
})

export const ClienteSchema = yup.object().shape({
  nome: yup.string().required("Por favor, digite o nome do cliente").matches(regexNome, 'Por favor, digite apenas letras.'),
  email: yup.string().required("Por favor, digite o e-mail do cliente").email("Por favor, digite um e-mail válido"),
  telefone: yup.string().required("Por favor, digite o telefone do cliente")
})

export const VagaSchema = yup.object().shape({
  nome: yup.string().required("Por favor, insira um nome para a vaga").min(3, "O nome ter deve 3 caracteres no mínimo").matches(regexNome, 'Por favor, digite apenas letras.'),
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

export const reservaAlocacaoSchema = yup.object().shape({
  situacao: yup.string().required("Por favor, insira a situação da vaga"),
  descricao: yup.string().required("Por favor, insira uma descrição"),
})

export const feedbackSchema = yup.object().shape({
  idAluno: yup.number().required("Por favor, selecione o aluno recebendo o feedback"),
  idModulo: yup.number().required("Por favor, selecione o módulo"),
  nomeInstrutor: yup.string().required(),
  descricao: yup.string().required("Por favor, insira uma descrição"),
  data: yup.string().required()
})

export const avalicaoSchema = yup.object().shape({
  descricao: yup.string().required("Por favor, insira uma descrição"),
  idAcompanhamento: yup.string().required("Por favor, escolha um acompanhamento"),
  idPrograma: yup.string().required("Por favor, escolha um programa"),
  idTrilha: yup.string().required("Por favor, escolha uma trilha"),
  idAluno: yup.string().required("Por favor, escolha um aluno"),
  situacao: yup.string().required("Por favor, insira a situação da avaliação")
})
