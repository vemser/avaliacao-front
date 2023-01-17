import axios from "axios";
import nProgress from "nprogress";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../utils/api";
import { ICadastrarCliente, IClienteAPI, IClienteContext } from "../../utils/ClienteInterface/Cliente";
import { IChildren } from "../../utils/interface";
import { toastConfig } from "../../utils/toast";

export const ClienteContext = createContext({} as IClienteContext);

export const ClienteProvider = ({ children }: IChildren) => {

  const navigate = useNavigate()

  const [cliente, setCliente] = useState<IClienteAPI | null>(null)

  const cadastrarCliente = async (cliente: ICadastrarCliente) => {
    try {
      nProgress.start();
      await API.post("cliente", cliente)
      toast.success("Cliente criado com sucesso!", toastConfig);
      navigate("/clientes")
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

  const pegarCliente = async (pagina: number = 0, tamanho: number = 10) => {
    try {
      nProgress.start();
      const { data } = await API.get(`cliente?pagina=${pagina}&tamanho=${tamanho}`, { headers: { Authorization: localStorage.getItem("token") }})
      setCliente(data)
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

  const pegarClientePorNome = async (nome: string, pagina: number = 0, tamanho: number = 10) => {
    try {
      nProgress.start();
      const { data } = await API.get(`/cliente/nome/${nome}?pagina=${pagina}&tamanho=${tamanho}`)
      setCliente(data)
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

  const pegarClientePorEmail = async (nome: string, pagina: number = 0, tamanho: number = 10) => {
    try {
      nProgress.start();
      const { data } = await API.get(`/cliente/email/${nome}?pagina=${pagina}&tamanho=${tamanho}`)
      setCliente(data)
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

  const editarCliente = async (cliente: ICadastrarCliente, id: number) => {
    try {
      nProgress.start();
      await API.put(`/cliente/${id}`, cliente)
      navigate("/clientes")
      toast.success("Cliente editado com sucesso!", toastConfig);
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

  const deletarCliente = async (id: number | undefined) => {
    try {
      nProgress.start();
      await API.delete(`/cliente/${id}`);
      toast.success("Cliente desativado com sucesso!", toastConfig);
      pegarCliente();
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

  return(
    <ClienteContext.Provider value={{cadastrarCliente,pegarCliente,cliente,deletarCliente,pegarClientePorNome,pegarClientePorEmail,editarCliente}}>
      {children}
    </ClienteContext.Provider>
  )

}

export const useCliente = () => {
  return useContext(ClienteContext);
}
