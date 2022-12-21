import { createContext, useState } from "react";

import { IAuth, IChildren, IEditarNome, ISenhas, IUsuario, IUsuarioLogado } from "../utils/interface";

import nProgress from 'nprogress';
import { toast } from "react-toastify";
import { toastConfig } from "../utils/toast";

import { API } from "../utils/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({} as IAuth);

export const AuthProvider = ({ children }: IChildren) => {
  const navigate = useNavigate();
  const [tokenAuth, setTokenAuth] = useState<string>(localStorage.getItem("token") || "");
  const [usuarioLogado, setUsuarioLogado] = useState<IUsuarioLogado>({
    cargo: "", idUsuario: 0, email: "", foto: "", nome: ""
  });

  const usuarioLogin = async (infoUser: IUsuario) => {
    try {
      nProgress.start();
      const { data } = await API.post("/auth/login", infoUser);
      localStorage.setItem("token", data);
      toast.success("Seja bem-vindo(a)", toastConfig);
      setTokenAuth(data);
      
      await API.get("/auth/usuario-logado", { 
        headers: { Authorization: localStorage.getItem("token") }
       }).then((response) => {
        setUsuarioLogado(response.data)
        localStorage.setItem("infoUsuario", JSON.stringify(response.data));
        const cargoSplitado = response.data.cargo.split(" ")[0].toLowerCase();
        navigate(`/dashboard/${cargoSplitado}`);
      })
    } catch (error) {
      toast.error("Email ou senha incorretos. Login não concluído.", toastConfig);
    } finally {
      nProgress.done();
    }
  }

  const usuarioLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('infoUsuario');
    setTokenAuth('');
  };

  const trocarSenhaLogado = async (senhas: ISenhas) => {
    try {
      nProgress.start();
      await API.put("/auth/alterar-senha-usuario-logado", senhas, { 
        headers: { Authorization: localStorage.getItem("token") }
       }).then((response) => {
        toast.success("Senha atualizada com sucesso.", toastConfig)
        navigate(`/`);
      })
    } catch (error) {
      toast.error("Houve um erro", toastConfig)
    } finally {
      nProgress.done();
    }
  }

  const redefinirSenha = async (email: string) => {
    try {
      nProgress.start()
      await API.post(`/auth/recuperar-senha?email=${email}`, email, { 
        headers: { Authorization: localStorage.getItem("token") }
       }).then((response) => {
        toast.success("Recuperação de senha realizada com sucesso.", toastConfig);
      });
    } catch (error) {
      toast.error("Email incorreto! Não será possivel continuar com a recuperação de senha!", toastConfig);
    } finally {
      nProgress.done()
    }
  }

  const recuperarSenha = async (senha: string) => {
    try {
      nProgress.start()
      await API.put(`/auth/alterar-senha-usuario-recuperacao?senha=${senha}`, senha, {
        headers: { Authorization: localStorage.getItem("recuperarSenha") }
      }).then((response) => { 
        localStorage.removeItem("recuperarSenha");
        toast.success("Senha atualizada com sucesso!", toastConfig);
        navigate('/')
      })
    } catch (error) {
      toast.error("Não foi identificado permissão para realizar esta recuperação.", toastConfig);
    } finally {
      nProgress.done()
    }
  }

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
    <AuthContext.Provider value={{ tokenAuth, usuarioLogin, usuarioLogado, redefinirSenha, usuarioLogout, trocarSenhaLogado, recuperarSenha, editarPerfil }}>
      {children}
    </AuthContext.Provider>
  );
};