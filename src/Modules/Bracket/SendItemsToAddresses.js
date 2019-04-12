function SendItemsToAddresses(obj) {
    obj.AddressesWithItems = {}
    let columnArray = obj.columnInfo
    columnArray.forEach((col, colIdx) => {
        let colItems = col.items
        let colAddresses = col.addressCodes
        colAddresses.forEach(address => {
            obj.AddressesWithItems[`${address}`] = {}
        })
        colItems.forEach((item, itmIdx) => {
            if (colIdx === 0 || colIdx === columnArray.length - 1) {
                let addressKey = colAddresses[itmIdx]
                obj.AddressesWithItems[`${addressKey}`] = item
            } else if (colIdx === 1 || colIdx === columnArray.length - 2) {
                let addressKey = colAddresses[colAddresses.length - (itmIdx + 1)]
                obj.AddressesWithItems[`${addressKey}`] = item
            }
        })
    })
    return obj
}

export default SendItemsToAddresses