import * as  yup from "yup";

const regexEmail = /^[A-Za-z0-9._%+-]+@dbccompany.com.br$/

export const userSchema = yup.object().shape({
  email: yup.string().required("Por favor, digite seu e-mail").email("Por favor, digite um e-mail válido").matches(regexEmail, "Só aceitamos email @dbccompany.com.br"),
  senha: yup.string().required("Por favor, digite sua senha").min(8, "A senha deve ter no mínimo 8 caracteres")
});

export const alunoSchema = yup.object().shape({
  nome: yup.string().required("Por favor, digite seu nome completo").min(3,"O nome deve conter no mínimo 3 caracteres"),
  email: yup.string().required("Por favor, digite seu e-mail").email("Por favor, digite um e-mail válido").matches(regexEmail, "Só aceitamos email @dbccompany.com.br"),
  stack: yup.string().required("Por favor, escolha um dos tipos de trilha."),
});

export const editarAlunoSchema = yup.object().shape({
  nome: yup.string().required("Por favor, digite seu nome completo").min(3,"O nome deve conter no mínimo 3 caracteres"),
  email: yup.string().required("Por favor, digite seu e-mail").email("Por favor, digite um e-mail válido").matches(regexEmail, "Só aceitamos email @dbccompany.com.br")
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