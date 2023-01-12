import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toastConfig } from "../../utils/toast";
import { toast } from "react-toastify";
import nProgress from 'nprogress';

import { API } from "../../utils/api";
import axios from "axios";

import { IChildren, IEditarFeedback, IFeedback, IFeedbackAPI, IFeedbackCadastro, IFeedbackElementos } from "../../utils/FeedbackInterface/Feedback";

export const FeedbackContext = createContext({} as IFeedback);

export const FeedbackProvider = ({ children }: IChildren) => {
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState<IFeedbackAPI | null>(null);

    const pegarFeedback = async (pagina: number = 0, tamanho: number = 10, filtros: string = '') => {
        try {
            nProgress.start()
            const { data } = await API.get(`/feedback/listar-feedback?page=${pagina}&size=${tamanho}${filtros}`, { headers: { Authorization: localStorage.getItem("token") } })

            setFeedback(data)
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

    const pegarFeedbackFiltros = async (pagina: number = 0, tamanho: number = 10, filtros: string = '') => {
        try {
            nProgress.start()
            const { data } = await API.get(`/feedback/listar-feedbacks-com-filtro?page=${pagina}&size=${tamanho}${filtros}`, { headers: { Authorization: localStorage.getItem("token") } })
            setFeedback(data)
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


    const cadastrarFeedback = async (data: IFeedbackCadastro) => {
        try {
            nProgress.start();

            await API.post("/feedback/cadastrar-feedback", data, { headers: { Authorization: localStorage.getItem("token") } });

            navigate("/feedbacks");
            toast.success("Feedback cadastrado com sucesso!", toastConfig);
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

    // const cadastrarAluno = async (dadosAluno: ICadastroAlunoAPI) => {
    //     try {
    //         nProgress.start();
    //         await API.post('/aluno/cadastrar-aluno', dadosAluno, { headers: { Authorization: localStorage.getItem("token") } }).then((response) => {
    //             navigate('/alunos');
    //             toast.success('Aluno cadastrado com sucesso!', toastConfig);
    //         })
    //     } catch (error: any) {
    //         let message = "Ops, algo deu errado!";
    //         if (error.response.status === 403) {
    //             message = "Você não tem permissão para acessar esse recurso"
    //         } else if (axios.isAxiosError(error) && error?.response) {
    //             message = error.response.data.message || error.response.data.errors[0];
    //         }
    //         toast.error(message, toastConfig);
    //     } finally {
    //         nProgress.done();
    //     }
    // }

    const deletarFeedback = async (idFeedback: number | undefined) => {
        try {
            await API.delete(`/feedback/desativar-feedback/${idFeedback}`, { headers: { Authorization: localStorage.getItem("token") } });

            pegarFeedback();
            toast.success('Feedback desativado com sucesso!', toastConfig);
        } catch (error: any) {
            let message = "Ops, algo deu errado!";
            if (error.response.status === 403) {
                message = "Você não tem permissão para acessar esse recurso"
            } else if (axios.isAxiosError(error) && error?.response) {
                message = error.response.data.message || error.response.data.errors[0];
            }
            toast.error(message, toastConfig);
        }
    }

    const editarFeedback = async (feedback: IEditarFeedback, id: number) => {
        try {
            nProgress.start();
            await API.put(`/feedback/editar-feedback/${id}`, feedback, { headers: { Authorization: localStorage.getItem("token") } })
            toast.success("Feedback editado com sucesso!", toastConfig);
            navigate("/feedbacks")
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
        <FeedbackContext.Provider value={{ pegarFeedback, deletarFeedback, feedback, cadastrarFeedback, editarFeedback, pegarFeedbackFiltros }}>
            {children}
        </FeedbackContext.Provider>
    );
}

export const useFeedback = () => {
    return useContext(FeedbackContext)
}