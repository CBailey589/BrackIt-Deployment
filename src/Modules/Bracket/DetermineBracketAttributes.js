
import AddressCodesArrayMaker from "./AddressCodesArrayMaker"

function DetermineBracketAttributes(array) {
    const bracketInfo = {}

    if (array.length > 0) {
        bracketInfo.rounds = Math.ceil(Math.log2(array.length))
        if (bracketInfo.rounds === 1) {
            bracketInfo.rows = 1
            bracketInfo.columns = 3
        } else {
            bracketInfo.rows = (Math.pow(2, bracketInfo.rounds) - 1)
            bracketInfo.columns = (bracketInfo.rounds * 2) + 1
        }
        bracketInfo.columnInfo = []
        let builderIndex = Math.ceil((bracketInfo.columns) / 2)
        for (var i = builderIndex; i > 0; i--) {
            let columnObj = {}
            if (i === builderIndex) {
                columnObj.top = Math.ceil(bracketInfo.rows / 2)
                columnObj.inOut = 0
                columnObj.bottom = columnObj.top - 1
                columnObj.numItemsIn = 1
                columnObj.items = []
                columnObj.addressCodes = AddressCodesArrayMaker(bracketInfo.rounds, i)
                bracketInfo.columnInfo.push(columnObj)
            } else if (i === builderIndex - 1) {
                columnObj.top = Math.ceil(bracketInfo.rows / 2)
                columnObj.inOut = 0
                columnObj.bottom = columnObj.top - 1
                columnObj.numItemsIn = 1
                columnObj.items = []
                columnObj.addressCodes = AddressCodesArrayMaker(bracketInfo.rounds, i)
                const columnObj2 = Object.assign({}, columnObj)
                bracketInfo.columnInfo.unshift(columnObj)
                bracketInfo.columnInfo.push(columnObj2)
            } else {
                columnObj.top = Math.pow(2, i - 1)
                columnObj.inOut = Math.pow(2, i)
                columnObj.bottom = columnObj.top - 1
                columnObj.numItemsIn = Math.pow(2, bracketInfo.rounds - i)
                columnObj.items = []
                columnObj.addressCodes = AddressCodesArrayMaker(bracketInfo.rounds, i, bracketInfo.columnInfo[0].addressCodes)
                const columnObj2 = Object.assign({}, columnObj)
                bracketInfo.columnInfo.unshift(columnObj)
                bracketInfo.columnInfo.push(columnObj2)
            }
        }
    }
    return bracketInfo
}

export default DetermineBracketAttributes