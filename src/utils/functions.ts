import { debounce } from 'lodash';

export function formatarNomeCompleto(str: string) {
    const words = str.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    return words.join(" ");
}

export function formatarTexto(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const filtroDebounce = debounce((valor, request, option?) => {
    if (valor) {
      if (option)
        request(0, 10, option);
      else
        request(valor, 0, 10);
    } else {
      request(0, 3);
    }
  }, 500)