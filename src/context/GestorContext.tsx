import { createContext, useState } from "react";
import { API } from "../utils/api";
import { ICriarAcompanhamento, IChildren, IGestor, ICriarAvaliacao, IEditarAcompanhamento, IAvaliacaoPorId, IEditarAvaliacao, IPaginacao } from "../utils/interface";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastConfig } from "../utils/toast";
import nProgress from "nprogress";

export const GestorContext = createContext({} as IGestor);

export const GestorProvider = ({children} : IChildren) =>{
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [paginacaoAcompanhamento, setPaginacaoAcompanhamento] = useState<IPaginacao>({pagina: 0, quantidadePagina: 0, tamanho: 0, totalElementos: 0})
  const [paginacaoAvaliacao, setPaginacaoAvaliacao] = useState<IPaginacao>({pagina: 0, quantidadePagina: 0, tamanho: 0, totalElementos: 0})
  const [acompanhamento,setAcompanhamento] = useState<ICriarAcompanhamento[]>([])
  const [avaliacoesPorID, setAvaliacoesPorID] = useState<IAvaliacaoPorId[]>([])
  const [avaliacoes, setAvaliacoes] = useState<any | null>(null)

  const criarAcompanhamento = async (acompanhamento: ICriarAcompanhamento) =>{
    try {
      nProgress.start()
      API.defaults.headers.common["Authorization"] = token;
      await API.post("/acompanhamento/cadastrar-acompanhamento",acompanhamento)
      navigate("/lista-acompanhamento")
      toast.success("Acompanhamento cadastrado com sucesso!", toastConfig);
    } catch (error) {
      toast.error("Campo nulo, ou preenchido de forma incorreta, tente de novo.", toastConfig);
    } finally{
      nProgress.done()
    }
  }

  const pegarAcompanhamento = async (pagina?: number) => {
    try {
      nProgress.start()
      API.defaults.headers.common["Authorization"] = token;
      const {data} = await API.get(`/acompanhamento/listar-acompanhamento?page=${pagina ? pagina : 0}&size=10`)
      setAcompanhamento(data.elementos)
      setPaginacaoAcompanhamento({pagina: data.pagina, quantidadePagina: data.quantidadePaginas, tamanho: data.tamanho, totalElementos: data.totalElementos})
    } catch (error) {
      toast.error("Você não possui credenciais para acessar essas informações.", toastConfig);
    } finally {
      nProgress.done()
    }
  }

  const editAcompanhamento = async (dadosEditados: IEditarAcompanhamento, id: number) => {
    try {
      nProgress.start()
      await API.put(`/acompanhamento/editar-acompanhamento/${id}`, dadosEditados, {
        headers: { Authorization: localStorage.getItem("token") }
      }).then((response) => {
        toast.success("Acompanhamento editado com sucesso!", toastConfig);
        navigate('/lista-acompanhamento')
      })
    } catch (error) {
      toast.error("Você não possui credenciais para acessar essas informações.", toastConfig);
    } finally {
      nProgress.done()
    }
  }

  const criarAvaliacao = async (avalicao: ICriarAvaliacao) => {
    try {
      nProgress.start()
      API.defaults.headers.common["Authorization"] = token;
      await API.post("/avaliacao-acompanhamento/cadastrar-avaliacao",avalicao)
      navigate("/dashboard/gestor")
      toast.success("Avaliação cadastrada com sucesso!", toastConfig);
    } catch (error) {
      toast.error("Campo nulo, ou preenchido de forma incorreta, tente de novo.", toastConfig);
    } finally{
      nProgress.done()
    }
  }

  const editarAvaliacao = async (dadosEditados: IEditarAvaliacao, id: number) => {
    try {
      nProgress.start()
      await API.put(`/avaliacao-acompanhamento/${id}`, dadosEditados, {
        headers: { Authorization: localStorage.getItem("token") }
      }).then((response) => {
        toast.success("Avaliação editada com sucesso!", toastConfig);
        navigate("/dashboard/gestor")
      })
    } catch (error) {
      toast.error("Houve um erro inesperado.", toastConfig);
    } finally{
      nProgress.done()
    }
  }

  const getAvaliacaoPorID = async (id: number, page: number) => {
    try {
      nProgress.start()
      API.defaults.headers.common["Authorization"] = localStorage.getItem("token");
      const { data } = await API.get(`/avaliacao-acompanhamento/${id}?page=${page}&size=5`)
      setAvaliacoesPorID(data.elementos)
      setAvaliacoes(data)
      setPaginacaoAvaliacao({pagina: data.pagina, quantidadePagina: data.quantidadePaginas, tamanho: data.tamanho, totalElementos: data.totalElementos})
    } catch (error) {
      toast.error("Houve um erro inesperado.", toastConfig);
    } finally{
      nProgress.done()
    }
  }

  return (
    <GestorContext.Provider value={{ criarAcompanhamento, pegarAcompanhamento, acompanhamento, criarAvaliacao, editAcompanhamento, getAvaliacaoPorID, avaliacoesPorID, editarAvaliacao, avaliacoes, paginacaoAcompanhamento, paginacaoAvaliacao }}>
      {children}
    </GestorContext.Provider>
  );
}
