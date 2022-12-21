import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import { Intermediaria } from "./Intermediaria";

test("Verifica se existe o container na página", () => {
  render(<Router><Intermediaria /></Router>);

  const container = screen.getByRole('main');
  expect(container).toBeInTheDocument();
})

test("Verifica se existe o logo DBC na página", () => {
  render(<Router><Intermediaria /></Router>);
  
  const imagem = screen.getByRole("img");
  expect(imagem).toBeInTheDocument();
});