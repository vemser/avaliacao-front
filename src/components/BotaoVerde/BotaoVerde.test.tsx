import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import { BotaoVerde } from "./BotaoVerde";

test("Verifica se existe o botão verde e se funciona a passagem de props", () => {
  render(<Router><BotaoVerde texto="Botão Verde" /></Router>);

  const botaoVerde = screen.getByRole('button', { name: "Botão Verde" });
  expect(botaoVerde).toBeInTheDocument();
})