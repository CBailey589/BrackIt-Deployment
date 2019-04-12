function AddressCodesRegionizer(obj) {
    if (obj.columnInfo.length !== 0) {
        let columnInfo = obj.columnInfo
        let regionBreak = Math.ceil((columnInfo.length) / 2) - 1
        columnInfo.forEach((column, index) => {
            let region = ""
            let firstAddress = column.addressCodes[0]
            if (firstAddress.startsWith("L") || firstAddress.startsWith("R") || firstAddress.startsWith("w")) {
                region = ""
            } else if (index < regionBreak) {
                region = "L"
            } else if (index > regionBreak) {
                region = "R"
            }
            column.addressCodes = column.addressCodes.map(code => `${region}${code}`)
        })
    }
    return obj
}

export default AddressCodesRegionizer