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

export const filtroDebounce = debounce((valor, request, reset, option?) => {
    if (valor) {
      if (option)
        request(0, 10, option);
      else
        request(valor, 0, 10);
    } else {
      reset();
    }
}, 500)
  
export function generateRandomId() {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}