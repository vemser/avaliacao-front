import { createContext, useContext, useState } from "react";

import { IAuth, IChildren, IUsuario, IUsuarioLogado, IUsuariosFiltro } from "../utils/interface";

import nProgress from 'nprogress';
import { toast } from "react-toastify";
import { toastConfig } from "../utils/toast";

import { AuthAPI } from "../utils/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext({} as IAuth);

export const AuthProvider = ({ children }: IChildren) => {
  const navigate = useNavigate();
  const [usuariosFiltro, setUsuariosFiltro] = useState<IUsuariosFiltro | null>(null);
  const [cargos, setCargos] = useState<string[]>([]);
  const [usuarioLogado, setUsuarioLogado] = useState<IUsuarioLogado>({
    cargo: [""], idUsuario: 0, imagem: "", login: ""
  });

  const usuarioLogin = async (infoUser: IUsuario) => {
    try {
      nProgress.start();
      const { data } = await AuthAPI.post("/usuario/login", infoUser);
      localStorage.setItem("token", data);
      await decodificarJWT();
      await pegarUsuarioLogado();
      toast.success("Seja bem-vindo(a)", toastConfig);
      navigate("/alunos");
    } catch (error) {
      toast.error("Desculpe, houve algum erro", toastConfig);
    } finally {
      nProgress.done();
    }
  }

  const decodificarJWT = async () => {
    try {
      let token = localStorage.getItem("token");
      if (token) {
        let decodedJWT = JSON.parse(atob(token.split('.')[1]));
        let roles = decodedJWT.cargos;

        setCargos(roles);
      }
    } catch (error) {
      setCargos([]);
    }
  }

  const editarPerfil = async (imagem: FormData) => {
    try {
      nProgress.start()
      await AuthAPI.put('/foto/upload-image-perfil', imagem, {
        headers: { Authorization: localStorage.getItem("token"), 'Content-Type': 'multipart/form-data' }
      }).then((response) => {
        setUsuarioLogado(response.data)
        toast.success("Foto atualizada com sucesso!", toastConfig);
      })
    } catch (error) {
      toast.error("Foto não enviada", toastConfig);
    } finally {
      nProgress.done()
    }
  }

  const pegarUsuarioLogado = async () => {
    try {
      await AuthAPI.get("/usuario/logged-user", {
        headers: { Authorization: localStorage.getItem("token") }
      }).then((response) => {
        setUsuarioLogado(response.data);
      })
    } catch (error) {
      toast.error("Você não tem permissão para acessar este recurso.", toastConfig);
    }
  }

  const usuarioLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cargo');
    navigate("/");
  };

  const pegarUsuariosLoginCargo = async (pagina: number = 0, tamanho: number = 10, login: string = "") => {
    try {
      nProgress.start();
      const { data } = await AuthAPI.get(`/usuario/filtro-usuario-login-cargo?pagina=${pagina}&tamanho=${tamanho}&nomes=ROLE_INSTRUTOR&login=${login}`, { headers: { Authorization: localStorage.getItem("token") } });
      setUsuariosFiltro(data);
    } catch (error: any) {
      let message = "Ops, algo deu errado!";
      if (error.response.status === 403) {
        message = "Você não tem permissão para acessar esse recurso"
      } else if (axios.isAxiosError(error) && error?.response) {
        message = error.response.data.message || error.response.data.errors[0];
      }
      toast.error(message, toastConfig);
    } finally {
      nProgress.done();
    }
  }

  return (
    <AuthContext.Provider value={{ usuarioLogin, usuariosFiltro, cargos, usuarioLogado, usuarioLogout, editarPerfil, pegarUsuarioLogado, decodificarJWT, pegarUsuariosLoginCargo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext)
}
