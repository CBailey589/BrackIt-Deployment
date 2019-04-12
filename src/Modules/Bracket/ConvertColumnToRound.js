function ConvertColumnToRound(col, numColumns) {
    let champColumn = Math.ceil(numColumns / 2)
    let round = champColumn
    if (col < champColumn) {
        round = col
    } else if (col > champColumn) {
        round = numColumns - col + 1
    }
    return round
}

export default ConvertColumnToRound