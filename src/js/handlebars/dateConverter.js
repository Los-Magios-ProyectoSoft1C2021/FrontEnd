const { ISODateToDDMMYYY } = require("../utils/DateFormatConvert")

module.exports = function (date) {
    return ISODateToDDMMYYY(date);
}