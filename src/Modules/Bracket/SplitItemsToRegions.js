function SplitItemsToRegions(array, obj) {
    if (obj.columnInfo.length !== 0) {
        const fullRounds = obj.rounds - 1
        const numItems = array.length
        const numItemsInFullRounds = Math.pow(2, fullRounds)
        const excessItemsTotal = (numItems - numItemsInFullRounds) * 2
        let excessItemsLeft = 0
        if ((excessItemsTotal / 2) % 2 === 0) {
            excessItemsLeft = (excessItemsTotal / 2)
        } else {
            excessItemsLeft = (excessItemsTotal / 2) + 1
        }
        const excessItemsRight = excessItemsTotal - excessItemsLeft
        const itemsLeft = ((numItemsInFullRounds / 2) - excessItemsLeft / 2)
        const itemsRight = ((numItemsInFullRounds / 2) - excessItemsRight / 2)
        const L1Idx = 0
        const L2Idx = 1
        const R1Idx = obj.columnInfo.length - 1
        const R2Idx = R1Idx - 1
        obj.columnInfo[L1Idx].items = array.splice(0, excessItemsLeft)
        obj.columnInfo[L2Idx].items = array.splice(0, itemsLeft)
        obj.columnInfo[R1Idx].items = array.splice(0, excessItemsRight)
        obj.columnInfo[R2Idx].items = array.splice(0, itemsRight)
    }
    return obj
}

export default SplitItemsToRegions