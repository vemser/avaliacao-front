import { createContext, useContext } from "react";

import nProgress from 'nprogress';
import { toast } from "react-toastify";
import { toastConfig } from "../../utils/toast";

import { API } from "../../utils/api";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import { IChildren, IAvaliacaoContext } from "../../utils/AvaliacaoInterface/Avaliacao";

export const AvaliacaoContext = createContext({} as IAvaliacaoContext);

export const AvaliacaoProvider = ({ children }: IChildren) => {

  return (
    <AvaliacaoContext.Provider value={{ }}>
      {children}
    </AvaliacaoContext.Provider>
  );
}

export const useAvaliacao = () => {
  return useContext(AvaliacaoContext)
}