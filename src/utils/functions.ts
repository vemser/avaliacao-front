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