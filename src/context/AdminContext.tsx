import { createContext, useState } from "react";

import nProgress from "nprogress";
import { toast } from "react-toastify";
import { toastConfig } from "../utils/toast";

import { API } from "../utils/api";
import { IAdmin, IChildren, IPaginacao, IPegarColaborador } from "../utils/interface";

export const AdminContext = createContext({} as IAdmin);

export const AdminProvider = ({ children }: IChildren) => {
  const [colaborador, setColaborador] = useState<IPegarColaborador[]>([])
  const [paginacaoColaborador, setPaginacaoColaborador] = useState<IPaginacao>({ pagina: 0, quantidadePagina: 0, tamanho: 0, totalElementos: 0 });
  
  const pegarColaborador = async (pagina?: number) => {
    try {
      nProgress.start();
      API.defaults.headers.common["Authorization"] = localStorage.getItem("token");
      const { data } = await API.get(`/administrador/listar-usuarios?page=${pagina ? pagina: 0}&size=10`)
      setColaborador(data.elementos)
      setPaginacaoColaborador({pagina: data.pagina, quantidadePagina: data.quantidadePaginas, tamanho: data.tamanho, totalElementos: data.totalElementos})
    } catch (error) {
      toast.error("Houve algum erro", toastConfig);
    } finally{
      nProgress.done();
    }
  }

  const deletarColaborador = async (id: number | undefined) => {
    try {
      nProgress.start();
      API.defaults.headers.common["Authorization"] = localStorage.getItem("token");
      await API.delete(`/administrador/delete/${id}`);
      toast.success("Colaborador desativado com sucesso!", toastConfig);
      pegarColaborador()
    } catch (error) {
      toast.error('Você não tem autorização para remover este colaborador.', toastConfig);
    } finally {
      nProgress.done();
    }
  }

  return (
    <AdminContext.Provider value={{ pegarColaborador, colaborador, deletarColaborador, paginacaoColaborador }}>
      {children}
    </AdminContext.Provider>
  );
}