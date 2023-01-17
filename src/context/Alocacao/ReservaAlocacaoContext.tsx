import axios from "axios";
import nProgress from "nprogress";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../utils/api";
import { IChildren } from "../../utils/interface";
import { IEditarReservaAlocacao, IReservaAlocacaoContext, IReservaAlocacaoObject, IResrevaAlocacao } from "../../utils/ReservaAlocacaoInterface/ReservaAlocacao";
import { toastConfig } from "../../utils/toast";


export const ReservaAlocacaoContext = createContext({} as IReservaAlocacaoContext);


export const ReservaAlocacaoProvider = ({children} : IChildren) =>{
  
  const navigate = useNavigate()

  const [reservaAlocacao, setReservaAlocacao] = useState<IReservaAlocacaoObject | null>(null)

  const cadastrarReservaAlocacao = async (ReservaAlocacao: IResrevaAlocacao) => {
    try {
      nProgress.start()
      await API.post("/reserva-alocacao", ReservaAlocacao)
      navigate("/alocacao-reserva")
      toast.success("Reserva e Alocação criado com sucesso!", toastConfig);
    } catch (error: any) {
      let message = "Ops, algo deu errado!";
      if (error.response.status === 403) {
        message = "Você não tem permissão para acessar esse recurso"
      } else if (axios.isAxiosError(error) && error?.response) {
        message = error.response.data.message || error.response.data.errors[0];
      }  
      toast.error(message, toastConfig);
    } finally {
      nProgress.done()
    }
  }

  const pegarReservaAlocacao = async (pagina: number = 0, tamanho: number = 10) => {
    try {
      const {data} = await API.get(`reserva-alocacao?pagina=${pagina}&tamanho=${tamanho}`)
      setReservaAlocacao(data)
    } catch (error: any) {
      let message = "Ops, algo deu errado!";
      if (error.response.status === 403) {
        message = "Você não tem permissão para acessar esse recurso"
      } else if (axios.isAxiosError(error) && error?.response) {
        message = error.response.data.message || error.response.data.errors[0];
      }  
      toast.error(message, toastConfig);
    } finally {

    }
  }

  const filtroReservaAlocacao = async (nome: string, pagina: number = 0, tamanho: number = 10 ) => {
    try {
      nProgress.start();
      const {data} = await API.get(`/reserva-alocacao?pagina=${pagina}&tamanho=${tamanho}&nome=${nome}`)
      setReservaAlocacao(data)
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

  const editarReservaAlocacao = async (reservaAlocacao: IEditarReservaAlocacao, id: number) => {
    try {
      nProgress.start();
      await API.put(`/reserva-alocacao/${id}`, reservaAlocacao)
      navigate("/alocacao-reserva")
      toast.success("Reserva e Alocação editado com sucesso!", toastConfig);
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
    <ReservaAlocacaoContext.Provider value={{cadastrarReservaAlocacao,pegarReservaAlocacao,reservaAlocacao,filtroReservaAlocacao,editarReservaAlocacao}}>
      {children}
    </ReservaAlocacaoContext.Provider>
  )
}

export const useReservaAlocacao = () => {
  return useContext(ReservaAlocacaoContext);
}