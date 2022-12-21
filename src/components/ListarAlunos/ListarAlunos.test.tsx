import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import { ListarAlunos } from "./ListarAlunos";

test("Verifica se existe o título e se funciona a passagem de props", () => {
  render(<Router><ListarAlunos alunos={[{ idAluno: 1 }]} deletarAluno="" /></Router>);

  const titulo = screen.getByText('Dashboard Alunos');
  expect(titulo).toBeInTheDocument();
})

test("Verifica se existe a tabela de alunos", () => {
  render(<Router><ListarAlunos alunos={[{ idAluno: 1 }]} deletarAluno="" /></Router>);

  const tabela = screen.getByRole('table');
  expect(tabela).toBeInTheDocument();
})

test("Verifica se existe a coluna Código na tabela", () => {
  render(<Router><ListarAlunos alunos={[{ idAluno: 1 }]} deletarAluno="" /></Router>);

  const colunaCodigo = screen.getByText('Código');
  expect(colunaCodigo).toBeInTheDocument();
})

test("Verifica se existe a coluna Nome na tabela", () => {
  render(<Router><ListarAlunos alunos={[{ idAluno: 1 }]} deletarAluno="" /></Router>);

  const colunaNome = screen.getByText('Nome');
  expect(colunaNome).toBeInTheDocument();
})

test("Verifica se existe a coluna Status na tabela", () => {
  render(<Router><ListarAlunos alunos={[{ idAluno: 1 }]} deletarAluno="" /></Router>);

  const colunaStatus = screen.getByText('Status');
  expect(colunaStatus).toBeInTheDocument();
})

test("Verifica se existe a coluna Ações na tabela", () => {
  render(<Router><ListarAlunos alunos={[{ idAluno: 1 }]} deletarAluno="" /></Router>);

  const colunaAcoes = screen.getByText('Ações');
  expect(colunaAcoes).toBeInTheDocument();
})

test("Verifica se exite o paragrafo Rows per page na tabela", () => {
  render(<Router><ListarAlunos alunos={[{ idAluno: 1 }]} deletarAluno="" /></Router>);

  const rowsPerPage = screen.getByText("Rows per page:")
  expect(rowsPerPage).toBeInTheDocument();
})