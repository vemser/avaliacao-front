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
            <Routes>
              <Route index element={<Pages.Login />} />
              <Route path="*" element={<Components.NotFound />} />
              <Route path="/dashboard/undefined" element={<Components.Loading />} />

              <Route element={<Components.RotaPrivada />}>
                <Route path="/dashboard/trilha-programa" element={<Pages.TrilhaPrograma />} />
                <Route path="/cadastrar-trilha" element={<Pages.CadastrarTrilha />} />
                <Route path="/cadastrar-programa" element={<Pages.CadastrarPrograma />} />
                <Route path="/editar-trilha" element={<Pages.EditarTrilha />} />
                <Route path="/editar-programa" element={<Pages.EditarPrograma />} />
                <Route path="/cadastrar-atividade" element={<Pages.CadastrarAtividade/>}/>
                <Route path="/cadastrar-vaga" element={<Pages.CadastrarVaga/>}/>
-
                <Route path="/cadastrar-reserva-alocacao" element={<Pages.CadastrarReservaAlacocao/>}/>
                <Route path="/cadastrar-cliente" element={<Pages.CadastrarCliente/>}/>

                {/* Rotas admin */}
                <Route path="/dashboard/admin" element={<Pages.DashboardAdmin />} />
                <Route path="/detalhes-colaborador" element={<Pages.DetalhesColaborador />} />

                {/* Rotas Gestor */}
                <Route path="/dashboard/gestor" element={<Pages.DashboardGestor />} />
                <Route path="/cadastrar-aluno" element={<Pages.CadastrarAluno />} />
                <Route path="/cadastrar-acompanhamento" element={<Pages.CadastrarAcompanhamento />} />
                <Route path="/avaliar-acompanhamento" element={<Pages.AvaliarAcompanhamento />} />
                <Route path="/lista-acompanhamento" element={<Pages.ListarAcompanhamento />} />
                <Route path="/editar-acompanhamento" element={<Pages.EditarAcompanhamento />} />
                <Route path="/editar-avaliacao" element={<Pages.EditarAvaliacao />} />
                <Route path="/editar-aluno" element={<Pages.EditarAluno />} />

                {/* Rotas Instrutor */}
                <Route path="/dashboard/instrutor" element={<Pages.DashboardInstrutor />} />
                <Route path="/cadastrar-aluno" element={<Pages.CadastrarAluno />} />
                <Route path="/cadastrar-feedback" element={<Pages.CadastrarFeedback />} />
                <Route path="/verificar-aluno" element={<Pages.VerificarAluno />} />
                <Route path="/lista-feedback" element={<Pages.ListarFeedback />} />
                <Route path="/editar-feedback" element={<Pages.EditarFeedback />} />
                      
                {/* Novas Rotas Gerais */}
                <Route path="/lista-modulo" element={<Pages.ListarModulo />} />
                <Route path="/cadastrar-modulo" element={<Pages.CadastrarModulo />} />
                <Route path="/editar-modulo" element={<Pages.EditarModulo />} />
                      
                {/* Trocar senha logado e editar usuario logado */}
                <Route path="/editar-usuario" element={<Pages.EditarUsuario />} />

                {/* Rotas de alocação/reserva */}
                <Route path="/lista-alocacao-reserva" element={<Pages.ListarAlocacao />} />
                <Route path="/editar-alocacao-reserva" element={<Pages.EditarReservaAlocacao />} />

                {/* Rotas de cliente */}
                <Route path="/lista-cliente" element={<Pages.ListarCliente />} />
                <Route path="/editar-cliente" element={<Pages.EditarCliente />} />
                {/* Rotas de vagas */}
                <Route path="/lista-vaga" element={<Pages.ListarVaga />} />


              </Route>
            </Routes>
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