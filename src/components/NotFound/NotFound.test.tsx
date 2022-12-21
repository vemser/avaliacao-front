import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import { NotFound } from "./NotFound";

test("Verifica se existe o botão voltar para a página inicial", () => {
  render(<Router><NotFound /></Router>);

  const botaoTelaInicial = screen.getByRole('button', { name: "Voltar para tela inicial" });
  expect(botaoTelaInicial).toBeInTheDocument();
})

test("Verifica se existe o logo DBC na página", () => {
  render(<Router><NotFound /></Router>);
  
  const imagem = screen.getByRole("img");
  expect(imagem).toBeInTheDocument();
});