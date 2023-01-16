import { createContext, useContext, useState } from "react";

import nProgress from "nprogress";
import axios from "axios";
import { toast } from "react-toastify";
import { toastConfig } from "../../utils/toast";

import { API } from "../../utils/api";
import { IChildren } from "../../utils/interface";
import { IProgramas, IObjectProgramas, IProgramaContext, IProgramaCompleto, IProgramaTrilhaModulo } from "../../utils/programaInterface"
import { useNavigate } from "react-router-dom";

export const ProgramaContext = createContext({} as IProgramaContext);

export const ProgramaProvider = ({ children }: IChildren) => {
  const navigate = useNavigate();  
  const [programas, setProgramas] = useState<IObjectProgramas | null>(null);
  const [programaCompleto, setProgramaCompleto] = useState<IProgramaCompleto | null>(null);

  const [programaTrilhaModulo, setProgramaTrilhaModulo] = useState<IProgramaTrilhaModulo | null>(null);
  
  const cadastrarPrograma = async (programa: IProgramas) => {
    try {
      nProgress.start();
      await API.post(`/programa`, programa, { headers: { Authorization: localStorage.getItem("token") }});
      toast.success("Programa criado com sucesso!", toastConfig);
      navigate('/programas')
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

  const clonarPrograma = async (id: number) => {
    try {
      nProgress.start();
      API.defaults.headers.common["Authorization"] = localStorage.getItem("token");
      await API.post(`/programa/clone/${id}`).then((response) => {
        toast.success("Programa clonado com sucesso!", toastConfig);
        pegarPrograma();
      })
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

  const pegarPrograma = async (pagina: number = 0, tamanho: number = 10) => {
    try {
      nProgress.start();
      const { data } = await API.get(`/programa?page=${pagina}&size=${tamanho}`, { headers: { Authorization: localStorage.getItem("token") }});
      setProgramas(data);
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

  const pegarProgramaFiltroID = async (id: string) => {
    try {
      nProgress.start();
      await API.get(`/programa/${id}`, { headers: { Authorization: localStorage.getItem("token") }}).then((response) => {
        setProgramas({ totalElementos: 1, quantidadePaginas: 1, pagina: 0, tamanho: 1, elementos: [response.data] })
      })
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

  const pegarProgramaAtivo = async (pagina: number = 0, tamanho: number = 10) => {
    try {
      nProgress.start();
      const { data } = await API.get(`/programa?page=${pagina}&size=${tamanho}`, { headers: { Authorization: localStorage.getItem("token") } });
      let programasAtivos = data;
      programasAtivos.elementos = programasAtivos.elementos.filter((programa: IProgramas) => programa.situacaoVagaPrograma === "ABERTO");
      setProgramas(programasAtivos);
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

  const pegarProgramaPorNome = async (nome: string, pagina: number = 0, tamanho: number = 10) => {
    try {
      nProgress.start();
      const { data } = await API.get(`/programa/list-nome?page=${pagina}&size=${tamanho}&nome=${nome}`, { headers: { Authorization: localStorage.getItem("token") }});
      setProgramas(data);
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

  const pegarProgramaPorTrilhaModulo = async (id: number) => {
    try {
      nProgress.start();
      await API.get(`/programa/buscar-programa-trilha-modulo?idPrograma=${id}`, { headers: { Authorization: localStorage.getItem("token") }}).then((response) => {
        setProgramaTrilhaModulo(response.data);
      })
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

  const pegarProgramaPorNomeAtivo = async (nome: string, pagina: number = 0, tamanho: number = 10) => {
    try {
      nProgress.start();
      const { data } = await API.get(`/programa?nomePrograma=${nome}&page=${pagina}&size=${tamanho}`, { headers: { Authorization: localStorage.getItem("token") }});
      let programasAtivos = data;
      programasAtivos.elementos = programasAtivos.elementos.filter((programa: IProgramas) => programa.situacaoVagaPrograma === "ABERTO");
      setProgramas(programasAtivos);
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

  const pegarProgramaCompleto = async (id: number) => {
    try {
      nProgress.start();
      const { data } = await API.get(`/programa/buscar-programa-trilha-modulo?idPrograma=${id}`, { headers: { Authorization: localStorage.getItem("token") } });

      data.trilha = data.trilha.sort((a: any, b: any) => {
        if (a.nome < b.nome) {
          return -1;
        } if (a.nome > b.nome) {
          return 1;
        }
        return 0
      });

      console.log(data)

      setProgramaCompleto(data);
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

  const deletarProgama = async (id: number) => {
    try {
      nProgress.start();
      await API.delete(`/programa/${id}`, { headers: { Authorization: localStorage.getItem("token") }});
      await pegarPrograma();
      toast.success("Programa desativado com sucesso!", toastConfig);
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

  const editarPrograma = async (programa: IProgramas, id: number) => {
    try {
      nProgress.start();
      await API.put(`/programa/${id}`, programa, { headers: { Authorization: localStorage.getItem("token") }});
      toast.success("Programa atualizado com sucesso!", toastConfig);
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
    <ProgramaContext.Provider value={{ programas, cadastrarPrograma, pegarPrograma, deletarProgama, editarPrograma, pegarProgramaPorNome, pegarProgramaFiltroID, pegarProgramaAtivo, pegarProgramaPorNomeAtivo, clonarPrograma, programaCompleto, pegarProgramaCompleto, programaTrilhaModulo, pegarProgramaPorTrilhaModulo }}>
      {children}
    </ProgramaContext.Provider>
  );
}

export const usePrograma = () => {
  return useContext(ProgramaContext);
}