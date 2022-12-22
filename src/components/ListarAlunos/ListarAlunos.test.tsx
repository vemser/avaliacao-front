import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import { ListarAlunos } from "./ListarAlunos";

test("Verifica se existe o título e se funciona a passagem de props", () => {
  render(<Router><ListarAlunos /></Router>);

  const titulo = screen.getByText('Dashboard Alunos');
  expect(titulo).toBeInTheDocument();
})

test("Verifica se existe a tabela de alunos", () => {
  render(<Router><ListarAlunos /></Router>);

  const tabela = screen.getByRole('table');
  expect(tabela).toBeInTheDocument();
})

test("Verifica se existe a coluna Código na tabela", () => {
  render(<Router><ListarAlunos /></Router>);

  const colunaCodigo = screen.getByText('Código');
  expect(colunaCodigo).toBeInTheDocument();
})

test("Verifica se existe a coluna Nome na tabela", () => {
  render(<Router><ListarAlunos /></Router>);

  const colunaNome = screen.getByText('Nome');
  expect(colunaNome).toBeInTheDocument();
})

test("Verifica se existe a coluna Stack na tabela", () => {
  render(<Router><ListarAlunos /></Router>);

  const colunaStatus = screen.getByText('Stack');
  expect(colunaStatus).toBeInTheDocument();
})

test("Verifica se existe a coluna Ações na tabela", () => {
  render(<Router><ListarAlunos /></Router>);

  const colunaAcoes = screen.getByText('Ações');
  expect(colunaAcoes).toBeInTheDocument();
})

test("Verifica se exite o paragrafo Linhas por página na tabela", () => {
  render(<Router><ListarAlunos /></Router>);

  const rowsPerPage = screen.getByText("Linhas por página:")
  expect(rowsPerPage).toBeInTheDocument();
})