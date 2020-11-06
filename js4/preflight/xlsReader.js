const xlsx = require('xlsx')

const provision = xlsx.readFile('./provision.xls')
const provisionsArr = xlsx.utils.sheet_add_json(provision.Sheets.PROV)
