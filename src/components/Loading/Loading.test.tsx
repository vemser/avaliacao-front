import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import { Loading } from "./Loading";

test("Verifica se existe o container main", () => {
  render(<Router><Loading /></Router>);

  const main = screen.getByRole("main");
  expect(main).toBeInTheDocument();
})


test("Verifica se existe o título de loading", () => {
  render(<Router><Loading /></Router>);

  const titulo = screen.getByText('Carregando...');
  expect(titulo).toBeInTheDocument();
})