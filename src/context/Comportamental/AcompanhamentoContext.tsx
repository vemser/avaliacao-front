import { createContext, useContext, useState } from "react";

import axios from "axios";
import nProgress from 'nprogress';
import { toast } from "react-toastify";
import { toastConfig } from "../../utils/toast";

import { API } from "../../utils/api";

import { IAcompanhamento, IChildren } from "../../utils/AcompanhamentoInterface/acompanhamento";

export const AcompanhamentoContext = createContext({} as IAcompanhamento);

export const AcompanhamentoProvider = ({ children }: IChildren) => {

  return (
    <AcompanhamentoContext.Provider value={{ }}>
      {children}
    </AcompanhamentoContext.Provider>
  );
}

export const useAcompanhamento = () => {
  return useContext(AcompanhamentoContext)
}