import { Routes, Route, BrowserRouter } from "react-router-dom";

import * as Pages from './pages/index';
import * as Components from './components/index';
import * as Context from './context/index';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'nprogress/nprogress.css';

function AppRoutes() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ToastContainer />
      <Context.AuthProvider>
        <Context.ProgramaProvider>
          <Context.MenuLateralProvider>
            <Context.AdminProvider>
              <Context.AlunoProvider>
                <Context.GestorProvider>
                  <Context.InstrutorProvider>
                    <Context.ModuloProvider>
                      <Context.TrilhaProvider>
                        <Context.FeedbackProvider>
                          <Context.ClienteProvider>
                            <Context.VagaProvider>
                              <Context.AtividadeProvider>
                                <Context.TecnologiaProvider>
                                  <Context.ReservaAlocacaoProvider>
                                    <Context.AcompanhamentoProvider>
                                      <Context.AvaliacaoProvider>
                                        <Routes>
                                          <Route index element={<Pages.Login />} />
                                          <Route path="*" element={<Components.NotFound />} />

                                          <Route element={<Components.RotaPrivada />}>

                                            <Route path="*" element={<Components.NotFound />} />
                                            <Route path="/home" element={<Pages.TelaPrinciapl />} />
                                            <Route path="/editar-usuario" element={<Pages.EditarUsuario />} />
                                            <Route path="/atividades-aluno" element={<Pages.ListarAtividadeAluno />} />

                                            <Route element={<Components.ComportamentalRotas />}>
                                              <Route path="/alunos" element={<Pages.ListarAluno />} />
                                              <Route path="/cadastrar-aluno" element={<Pages.CadastrarAluno />} />
                                              <Route path="/editar-aluno" element={<Pages.EditarAluno />} />
                                              <Route path="/verificar-aluno" element={<Pages.VerificarAluno />} />
                                              <Route path="/feedbacks" element={<Pages.ListarFeedback />} />
                                              <Route path="/cadastrar-feedback" element={<Pages.CadastrarFeedback />} />
                                              <Route path="/editar-feedback" element={<Pages.EditarFeedback />} />
                                              <Route path="/cadastrar-acompanhamento" element={<Pages.CadastrarAcompanhamento />} />
                                              <Route path="/avaliar-acompanhamento" element={<Pages.AvaliarAcompanhamento />} />
                                              <Route path="/acompanhamentos" element={<Pages.ListarAcompanhamento />} />
                                              <Route path="/editar-acompanhamento" element={<Pages.EditarAcompanhamento />} />
                                              <Route path="/editar-avaliacao" element={<Pages.EditarAvaliacao />} />
                                              <Route path="/avaliacoes" element={<Pages.ListarAvaliacao />} />
                                              <Route path="/cadastrar-avaliacao" element={<Pages.CadastrarAvaliacao />} />
                                            </Route>

                                            <Route element={<Components.TecnicoRotas />}>
                                              <Route path="/programas" element={<Pages.ListarProgramas />} />
                                              <Route path="/configuracao-programa" element={<Pages.ConfiguracaoPrograma />} />
                                              <Route path="/cadastrar-trilha" element={<Pages.CadastrarTrilha />} />
                                              <Route path="/cadastrar-programa" element={<Pages.CadastrarPrograma />} />
                                              <Route path="/editar-trilha" element={<Pages.EditarTrilha />} />
                                              <Route path="/editar-programa" element={<Pages.EditarPrograma />} />
                                              <Route path="/cadastrar-modulo" element={<Pages.CadastrarModulo />} />
                                              <Route path="/editar-modulo" element={<Pages.EditarModulo />} />
                                              <Route path="/atividades" element={<Pages.ListarAtividade />} />
                                              <Route path="/cadastrar-atividade" element={<Pages.CadastrarAtividade />} />
                                              <Route path="/editar-atividade" element={<Pages.EditarAtividade />} />
                                            </Route>

                                            <Route element={<Components.AlocacaoRotas />}>
                                              <Route path="/cadastrar-vaga" element={<Pages.CadastrarVaga />} />
                                              <Route path="/editar-vaga" element={<Pages.EditarVaga />} />
                                              <Route path="/cadastrar-reserva-alocacao" element={<Pages.CadastrarReservaAlacocao />} />
                                              <Route path="/cadastrar-cliente" element={<Pages.CadastrarCliente />} />
                                              <Route path="/clientes" element={<Pages.ListarCliente />} />
                                              <Route path="/editar-cliente" element={<Pages.EditarCliente />} />
                                              <Route path="/vagas" element={<Pages.ListarVaga />} />
                                              <Route path="/alocacao-reserva" element={<Pages.ListarAlocacao />} />
                                              <Route path="/editar-alocacao-reserva" element={<Pages.EditarReservaAlocacao />} />
                                            </Route>

                                            <Route path="/entregar-atividade" element={<Pages.EditarAtividadeAluno />} />
                                          </Route>
                                        </Routes>
                                      </Context.AvaliacaoProvider>
                                    </Context.AcompanhamentoProvider>
                                  </Context.ReservaAlocacaoProvider>
                                </Context.TecnologiaProvider>
                              </Context.AtividadeProvider>
                            </Context.VagaProvider>
                          </Context.ClienteProvider>
                        </Context.FeedbackProvider>
                      </Context.TrilhaProvider>
                    </Context.ModuloProvider>
                  </Context.InstrutorProvider>
                </Context.GestorProvider>
              </Context.AlunoProvider>
            </Context.AdminProvider>
          </Context.MenuLateralProvider>
        </Context.ProgramaProvider>
      </Context.AuthProvider>
    </BrowserRouter>
  );
}

export default AppRoutes;