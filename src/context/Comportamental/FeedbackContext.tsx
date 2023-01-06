import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toastConfig } from "../../utils/toast";
import { toast } from "react-toastify";
import nProgress from 'nprogress';

import { API } from "../../utils/api";
import axios from "axios";

import { IChildren, IFeedback, IFeedbackAPI } from "../../utils/FeedbackInterface/Feedback";

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

    return (
        <FeedbackContext.Provider value={{ pegarFeedback, feedback }}>
            {children}
        </FeedbackContext.Provider>
    );
}