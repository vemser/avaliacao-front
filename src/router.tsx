import { Routes, Route, BrowserRouter } from "react-router-dom";

import * as Pages from './pages/index';
import * as Components from './components/index';
import * as Context from './context/index';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'nprogress/nprogress.css';

function AppRoutes() {
  return (
    <>
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
                          <Context.ClienteProvider>
                            <Context.VagaProvider>
                              <Context.AtividadeProvider>
                                <Routes>
                                  <Route index element={<Pages.Login />} />
                                  <Route path="*" element={<Components.NotFound />} />
                                  <Route path="/undefined" element={<Components.Loading />} />

                                  <Route element={<Components.RotaPrivada />}>
                                    <Route path="/trilhas-e-programas" element={<Pages.TrilhaPrograma />} />
                                    <Route path="/cadastrar-trilha" element={<Pages.CadastrarTrilha />} />
                                    <Route path="/cadastrar-programa" element={<Pages.CadastrarPrograma />} />
                                    <Route path="/editar-trilha" element={<Pages.EditarTrilha />} />
                                    <Route path="/editar-programa" element={<Pages.EditarPrograma />} />
                                    <Route path="/cadastrar-atividade" element={<Pages.CadastrarAtividade />} />
                                    <Route path="/cadastrar-vaga" element={<Pages.CadastrarVaga />} />
                                    <Route path="/editar-vaga" element={<Pages.EditarVaga />} />
                                    <Route path="/editar-atividade" element={<Pages.EditarAtividade />} />
                                    <Route path="/atividades" element={<Pages.ListarAtividade />} />

                                    <Route path="/cadastrar-reserva-alocacao" element={<Pages.CadastrarReservaAlacocao />} />
                                    <Route path="/cadastrar-cliente" element={<Pages.CadastrarCliente />} />

                                    {/* Rotas admin */}
                                    <Route path="/colaboradores" element={<Pages.ListarColaborador />} />
                                    <Route path="/detalhes-colaborador" element--={<Pages.DetalhesColaborador />} />

                                    {/* Rotas Gestor */}
                                    <Route path="/alunos" element={<Pages.ListarAluno />} />
                                    <Route path="/cadastrar-aluno" element={<Pages.CadastrarAluno />} />
                                    <Route path="/cadastrar-acompanhamento" element={<Pages.CadastrarAcompanhamento />} />
                                    <Route path="/avaliar-acompanhamento" element={<Pages.AvaliarAcompanhamento />} />
                                    <Route path="/acompanhamentos" element={<Pages.ListarAcompanhamento />} />
                                    <Route path="/editar-acompanhamento" element={<Pages.EditarAcompanhamento />} />
                                    <Route path="/editar-avaliacao" element={<Pages.EditarAvaliacao />} />
                                    <Route path="/editar-aluno" element={<Pages.EditarAluno />} />

                                    {/* Rotas Instrutor */}
                                    <Route path="/alunos" element={<Pages.ListarAluno />} />
                                    <Route path="/cadastrar-aluno" element={<Pages.CadastrarAluno />} />
                                    <Route path="/cadastrar-feedback" element={<Pages.CadastrarFeedback />} />
                                    <Route path="/verificar-aluno" element={<Pages.VerificarAluno />} />
                                    <Route path="/feedbacks" element={<Pages.ListarFeedback />} />
                                    <Route path="/editar-feedback" element={<Pages.EditarFeedback />} />

                                    {/* Novas Rotas Gerais */}
                                    <Route path="/modulos" element={<Pages.ListarModulo />} />
                                    <Route path="/cadastrar-modulo" element={<Pages.CadastrarModulo />} />
                                    <Route path="/editar-modulo" element={<Pages.EditarModulo />} />

                                    {/* Trocar senha logado e editar usuario logado */}
                                    <Route path="/editar-usuario" element={<Pages.EditarUsuario />} />

                                    {/* Rotas de alocação/reserva */}
                                    <Route path="/alocacao-reserva" element={<Pages.ListarAlocacao />} />
                                    <Route path="/editar-alocacao-reserva" element={<Pages.EditarReservaAlocacao />} />

                                    {/* Rotas de cliente */}
                                    <Route path="/clientes" element={<Pages.ListarCliente />} />
                                    <Route path="/editar-cliente" element={<Pages.EditarCliente />} />
                                    {/* Rotas de vagas */}
                                    <Route path="/vagas" element={<Pages.ListarVaga />} />


                                  </Route>
                                </Routes>
                              </Context.AtividadeProvider>
                            </Context.VagaProvider>
                          </Context.ClienteProvider>
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
    </>
  );
}

export default AppRoutes;