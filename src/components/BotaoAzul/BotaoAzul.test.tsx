import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import { BotaoAzul } from "./BotaoAzul";

test("Verifica se existe o botão azul e se funciona a passagem de props", () => {
  render(<Router><BotaoAzul texto="Botão Azul" /></Router>);

  const botaoAzul = screen.getByRole('button', { name: "Botão Azul" });
  expect(botaoAzul).toBeInTheDocument();
})