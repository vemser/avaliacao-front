import { createContext, useState } from "react";

import nProgress from 'nprogress';
import { toast } from "react-toastify";
import { toastConfig } from "../utils/toast";

import { API } from "../utils/api";
import { IAdmin, IChildren, IColaboradorEditado, IPegarColaborador, IUserColaborador } from "../utils/interface";
import { useNavigate } from "react-router-dom";

export const AdminContext = createContext({} as IAdmin);

export const AdminProvider = ({ children }: IChildren) =>{
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [colaborador, setColaborador] = useState<IPegarColaborador[]>([])
  
  const criarColaborador = async (userColaborador: IUserColaborador, imagem: FormData) => {
    try {
      nProgress.start();
      API.defaults.headers.common["Authorization"] = token;
      const { data } = await API.post(`/administrador/cadastrar-usuario?cargo=${userColaborador.cargo}`, userColaborador)
      navigate("/dashboard/admin")
      toast.success("Colaborador cadastrado com sucesso!", toastConfig);

      if(imagem){
        await API.put(`/administrador/upload-imagem/${data.idUsuario}`, imagem, { 
          headers: { Authorization: localStorage.getItem("token"), 'Content-Type': 'multipart/form-data' },
         }).then((response) => {
          toast.success("Foto enviada com sucesso", toastConfig);
          localStorage.removeItem("idCadastrado")
        }).catch((error) => {
          toast.error("Foto não enviada", toastConfig)
        })    
      }
    } catch (error) {
      toast.error("Campo nulo, ou preenchido de forma incorreta, tente de novo.", toastConfig);
    } finally{
      nProgress.done();
    }
  }

  const editarColaborador = async (dadosEditados: IColaboradorEditado, id: number, imagem: FormData) => {
    try {
      nProgress.start();
      await API.put(`/administrador/atualizar-usuario/${id}`, dadosEditados, {
        headers: { Authorization: localStorage.getItem("token") }
      }).then((response) => {
        navigate("/dashboard/admin")
        toast.success("Colaborador editado com sucesso!", toastConfig);
      });

      if(imagem) {
        await API.put(`/administrador/upload-imagem/${id}`, imagem, { 
        headers: { Authorization: localStorage.getItem("token") },
        }).then((response) => { toast.success("Foto editada com sucesso!", toastConfig); })
      }
    } catch (error) {
      toast.error("Campo nulo, ou preenchido de forma incorreta, tente de novo.", toastConfig);
    } finally {
      nProgress.done();
    }
  }

  const pegarColaborador = async () => {
    try {
      nProgress.start();
      API.defaults.headers.common["Authorization"] = token;
      const { data } = await API.get(`/administrador/listar-usuarios?page=0&size=1000`)
      setColaborador(data.elementos)
    } catch (error) {
      toast.error("Houve algum erro", toastConfig);
    } finally{
      nProgress.done();
    }
  }

  const deletarColaborador = async (id: number | undefined) => {
    try {
      nProgress.start();
      API.defaults.headers.common["Authorization"] = token;
      await API.delete(`/administrador/delete/${id}`);
      toast.success("Colaborador desativado com sucesso.", toastConfig);
      pegarColaborador()
    } catch (error) {
      toast.error('Você não tem autorização para remover este colaborador.', toastConfig);
    } finally {
      nProgress.done();
    }
  }

  return (
    <AdminContext.Provider value={{ criarColaborador, pegarColaborador, colaborador, deletarColaborador, editarColaborador }}>
      {children}
    </AdminContext.Provider>
  );
}