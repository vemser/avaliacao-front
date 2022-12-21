import { Routes, Route, BrowserRouter } from "react-router-dom";

import { Login } from "./pages/Login/Login";
import { DashboardAdmin } from "./pages/DashboardAdmin/DashboardAdmin";
import { DashboardGestor } from "./pages/DashboardGestor/DashboardGestor";
import { DashboardInstrutor } from "./pages/DashboardInstrutor/DashboardInstrutor";
import { CadastrarAluno } from "./pages/CadastrarAluno/CadastrarAluno";
import { CadastrarColaborador } from "./pages/CadastrarColaborador/CadastrarColaborador";
import { RedefinirSenha } from "./pages/RedefinirSenha/RedefinirSenha";
import { AlterarSenha } from "./pages/AlterarSenha/AlterarSenha";
import { EditarColaborador } from "./pages/EditarColaborador/EditarColaborador";
import { CadastrarAcompanhamento } from "./pages/CadastrarAcompanhamento/CadastrarAcompanhamento";
import { VerificarAluno } from "./pages/VerificarAluno/VerificarAluno";
import { AvaliarAcompanhamento } from "./pages/AvaliarAcompanhamento/AvaliarAcompanhamento";
import { CadastrarFeedback } from "./pages/CadastrarFeedback/CadastrarFeedback";
import { ListarAcompanhamento } from "./pages/ListarAcompanhamento/ListarAcompanhamento";
import { EditarAvaliacao } from "./pages/EditarAvaliacao/EditarAvaliacao";
import { EditarFeedback } from "./pages/EditarFeedback/EditarFeedback";
import { EditarUsuario } from "./pages/EditarUsuario/EditarUsuario";
import { ListarFeedback } from "./pages/ListarFeedback/ListarFeedback";
import { EditarAluno } from "./pages/EditarAluno/EditarAluno";
import { EditarAcompanhamento } from "./pages/EditarAcompanhamento/EditarAcompanhamento";

import { RotaPrivada } from "./components/RotasPrivadas/RotasPrivadas";
import { Intermediaria } from "./components/Intermediaria/Intermediaria";
import { NotFound } from "./components/NotFound/NotFound";
import { Loading } from "./components/Loading/Loading";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'nprogress/nprogress.css';

import { AuthProvider } from "./context/AuthContext";
import { AdminProvider } from "./context/AdminContext";
import { AlunoProvider } from "./context/AlunoContext";
import { GestorProvider } from "./context/GestorContext";
import { InstrutorProvider } from "./context/InstrutorContext";
import { DetalhesColaborador } from "./pages/DetalhesColaborador/DetalhesColaborador";

function AppRoutes() {
  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <ToastContainer />
        <AuthProvider>
          <AdminProvider>
          <AlunoProvider>
          <GestorProvider>
          <InstrutorProvider>
            <Routes>
              <Route index element={<Login />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/dashboard/undefined" element={<Loading />} />

              {/* Redefinir senha com token e email */}
              <Route path="/recuperar-senha" element={<Intermediaria />} />
              <Route path="/redefinir-senha" element={<RedefinirSenha />} />

              <Route element={<RotaPrivada />}>
                {/* Rotas admin */}
                <Route path="/dashboard/admin" element={<DashboardAdmin />} />
                <Route path="/cadastrar-colaborador" element={<CadastrarColaborador />} />
                <Route path="/editar-colaborador" element={<EditarColaborador />} />
                <Route path="/detalhes-colaborador" element={<DetalhesColaborador />} />

                {/* Rotas Gestor */}
                <Route path="/dashboard/gestor" element={<DashboardGestor />} />
                <Route path="/cadastrar-aluno" element={<CadastrarAluno />} />
                <Route path="/cadastrar-acompanhamento" element={<CadastrarAcompanhamento />} />
                <Route path="/avaliar-acompanhamento" element={<AvaliarAcompanhamento />} />
                <Route path="/lista-acompanhamento" element={<ListarAcompanhamento />} />
                <Route path="/editar-acompanhamento" element={<EditarAcompanhamento />} />
                <Route path="/editar-avaliacao" element=  {<EditarAvaliacao />} />
                <Route path="/editar-aluno" element={<EditarAluno />} />

                {/* Rotas Instrutor */}
                <Route path="/dashboard/instrutor" element={<DashboardInstrutor />} />
                <Route path="/cadastrar-aluno" element={<CadastrarAluno />} />
                <Route path="/cadastrar-feedback" element={<CadastrarFeedback />} />
                <Route path="/verificar-aluno" element={<VerificarAluno />} />
                <Route path="/lista-feedback" element={<ListarFeedback />} />
                <Route path="/editar-feedback" element={<EditarFeedback />} />

                {/* Trocar senha logado e editar usuario logado */}
                <Route path="/alterar-senha" element={<AlterarSenha />} />
                <Route path="/editar-usuario" element={<EditarUsuario />} />
              </Route>
            </Routes>
          </InstrutorProvider>
          </GestorProvider>
          </AlunoProvider>
          </AdminProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;