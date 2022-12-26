import { createContext, useState } from "react";

import { IAuth, IChildren, IEditarNome, IUsuario, IUsuarioLogado } from "../utils/interface";

import nProgress from 'nprogress';
import { toast } from "react-toastify";
import { toastConfig } from "../utils/toast";

import { API, AuthAPI } from "../utils/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({} as IAuth);

export const AuthProvider = ({ children }: IChildren) => {
  const navigate = useNavigate();

  const [tokenAuth, setTokenAuth] = useState<string>(localStorage.getItem("token") || "");
  const [usuarioLogado, setUsuarioLogado] = useState<IUsuarioLogado>({ cargo: "", idUsuario: 0, imagem: "", login: ""
  });

  const usuarioLogin = async (infoUser: IUsuario) => {
    try {
      nProgress.start();
      const { data } = await AuthAPI.post("/usuario/login", infoUser);
      localStorage.setItem("token", data);
      setTokenAuth(data);
      navigate("/dashboard/gestor")
      toast.success("Seja bem-vindo(a)", toastConfig);
      pegarUsuarioLogado()
    } catch (error) {
      toast.error("Usuário ou senha incorretos. Login não concluído.", toastConfig);
    } finally {
      nProgress.done();
    }
  }

  const pegarUsuarioLogado = async () => {
    try {
      await AuthAPI.get("/usuario/logged-user", { headers: { Authorization: localStorage.getItem("token") }
       }).then((response) => {
        setUsuarioLogado(response.data)
        localStorage.setItem("cargo", usuarioLogado.cargo)
      })
    } catch (error) {
      toast.error("Você não tem permissão para acessar este recurso.", toastConfig);
    }
  }

  const usuarioLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cargo');
    setTokenAuth('');
  };

  // Função de editar perfil precisa ser alterada
  const editarPerfil = async (nome: IEditarNome, imagem: FormData, id: number) => {
    try {
      nProgress.start()
      await API.put('/auth/atualizar-usuario-logado', nome, {
        headers: { Authorization: localStorage.getItem("token") }
      }).then((response) => {
        localStorage.removeItem("infoUsuario");
        localStorage.setItem("infoUsuario", JSON.stringify(response.data));
        toast.success("Nome foi editado com sucesso!", toastConfig);
        navigate('/')
      })

      if(imagem){
        await API.put(`/auth/upload-imagem-usuario-logado/${id}`, imagem, { 
          headers: { Authorization: localStorage.getItem("token"), 'Content-Type': 'multipart/form-data' },
         }).then((response) => {
          localStorage.removeItem("infoUsuario");
          localStorage.setItem("infoUsuario", JSON.stringify(response.data));
          toast.success("Foto editada com sucesso", toastConfig);
          navigate('/')
        }).catch((error) => {
          toast.error("Foto não enviada", toastConfig)
        })
      }
    } catch (error) {
      toast.error("Campo nulo, ou preenchido de forma incorreta, tente de novo.", toastConfig);
    } finally {
      nProgress.done()
    }
  }

  return (
    <AuthContext.Provider value={{ tokenAuth, usuarioLogin, usuarioLogado, usuarioLogout, editarPerfil }}>
      {children}
    </AuthContext.Provider>
  );
};