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
          <Context.AdminProvider>
          <Context.AlunoProvider>
          <Context.GestorProvider>
          <Context.InstrutorProvider>
            <Routes>
              <Route index element={<Pages.Login />} />
              <Route path="*" element={<Components.NotFound />} />
              <Route path="/dashboard/undefined" element={<Components.Loading />} />

              {/* Redefinir senha com token e email */}
              <Route path="/recuperar-senha" element={<Components.Intermediaria />} />
              <Route path="/redefinir-senha" element={<Pages.RedefinirSenha />} />

              <Route element={<Components.RotaPrivada />}>
                {/* Rotas admin */}
                <Route path="/dashboard/admin" element={<Pages.DashboardAdmin />} />
                <Route path="/cadastrar-colaborador" element={<Pages.CadastrarColaborador />} />
                <Route path="/editar-colaborador" element={<Pages.EditarColaborador />} />
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

                {/* Trocar senha logado e editar usuario logado */}
                <Route path="/alterar-senha" element={<Pages.AlterarSenha />} />
                <Route path="/editar-usuario" element={<Pages.EditarUsuario />} />
              </Route>
            </Routes>
          </Context.InstrutorProvider>
          </Context.GestorProvider>
          </Context.AlunoProvider>
          </Context.AdminProvider>
        </Context.AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;