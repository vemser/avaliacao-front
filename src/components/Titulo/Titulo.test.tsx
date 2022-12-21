import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import { Titulo } from "./Titulo";

test("Verifica se existe o título e se funciona a passagem de props", () => {
  render(<Router><Titulo texto="Este é um titulo" /></Router>);

  const titulo = screen.getByText('Este é um titulo');
  expect(titulo).toBeInTheDocument();
})