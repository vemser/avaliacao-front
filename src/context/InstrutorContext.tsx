import nProgress from "nprogress";
import { createContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../utils/api";
import { ICadastrarFeedback, IChildren, IEditarFeedback, IFeedbackPorId, IInstrutor, IPaginacao } from "../utils/interface";
import { toastConfig } from "../utils/toast";

export const InstrutorContext = createContext({} as IInstrutor);

export const InstrutorProvider = ({children}: IChildren) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate()

  const [feedback,setFeedback] = useState<ICadastrarFeedback[]>([])
  const [feedbackPorID, setFeedbackPorID] = useState<IFeedbackPorId[]>([])
  const [feedbacks, setFeedbacks] = useState<any | null>(null)
  const [paginacaoFeedback, setPaginacaoFeedback] = useState<IPaginacao>({pagina: 0, quantidadePagina: 0, tamanho: 0, totalElementos: 0})

  const cadastrarFeedback = async (feedbacks: object) =>{
    try {
      nProgress.start()
      API.defaults.headers.common["Authorization"] = token;
      await API.post("/feedback/cadastrar-feedback",feedbacks)
      navigate("/lista-feedback")
      toast.success("Feedback cadastrado com sucesso!", toastConfig);
    } catch (error) {
      toast.error("Campo nulo, ou preenchido de forma incorreta, tente de novo.", toastConfig);
    } finally{
      nProgress.done()
    }
  }

  const pegarFeedback = async (pagina?: number) =>{
    try {
      nProgress.start()
      API.defaults.headers.common["Authorization"] = token;
      const { data } = await API.get(`/feedback/listar-feedback?page=${pagina ? pagina : 0}&size=10`)
      setFeedback(data.elementos)
      setPaginacaoFeedback({pagina: data.pagina, quantidadePagina: data.quantidadePaginas, tamanho: data.tamanho, totalElementos: data.totalElementos})
    } catch (error) {
      toast.error("Você não possui credenciais para acessar essas informações.", toastConfig);
    } finally {
      nProgress.done()
    }
  }

  const editarFeedback = async (id: number, dadosEditados: IEditarFeedback) =>{
    try {
      nProgress.start()
      API.defaults.headers.common["Authorization"] = token;
      await API.put(`/feedback/editar-feedback/${id}`,dadosEditados)
      toast.success("Feedback editado com sucesso!", toastConfig);
      navigate("/lista-feedback")
    } catch (error) {
      toast.error("Campo nulo, ou preenchido de forma incorreta, ou com id inválido, tente de novo.", toastConfig);
    } finally {
      nProgress.done()
    }
  }

  const getFeedbackPorID = async (id: number, page: number) => {
    try {
      nProgress.start()
      API.defaults.headers.common["Authorization"] = localStorage.getItem("token");
      const { data } = await API.get(`/feedback/listar-feedback-por-id/${id}?page=${page}&size=5`)
      setFeedbackPorID(data.elementos)
      setFeedbacks(data)
      setPaginacaoFeedback({pagina: data.pagina, quantidadePagina: data.quantidadePaginas, tamanho: data.tamanho, totalElementos: data.totalElementos})
    } catch (error) {
      toast.error("Houve um erro inesperado.", toastConfig);
    } finally{
      nProgress.done()
    }
  }
  
  return (
    <InstrutorContext.Provider value={{ cadastrarFeedback, pegarFeedback, feedback, editarFeedback, getFeedbackPorID, feedbackPorID, feedbacks, paginacaoFeedback }}>
      {children}
    </InstrutorContext.Provider>
  );
}
