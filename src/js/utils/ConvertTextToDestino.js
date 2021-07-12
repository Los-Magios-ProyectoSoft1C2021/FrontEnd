const convertTextToDestino = (text) => {
    if (text.indexOf(",") != -1)
        return text.substring(0, text.indexOf(","));

    return text;
}

export { convertTextToDestino }