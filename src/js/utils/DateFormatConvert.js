const ISODateToDDMMYYY = (date) => {
    if (date.indexOf("T") != -1)
        date = date.split("T")[0];

    let array = date.split("-");
    return array[2] + "/" + array[1] + "/" + array[0];
}

export { ISODateToDDMMYYY }