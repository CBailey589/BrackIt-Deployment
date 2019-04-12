
function MakeBracketSquareInfo(col, row, bracketObj) {
    const squareInfo = {
        itemKey: "",
        itemText: ""
    }
    let columnInfo = bracketObj.columnInfo[col - 1]
    let numItemsInCol = columnInfo.items.length
    let top = columnInfo.top
    let inOut = columnInfo.inOut
    let bottom = columnInfo.bottom
    let regionBreak = Math.floor(bracketObj.columns / 2)
    let firstLastCol = false
    let addressesWithItems = bracketObj.AddressesWithItems
    // Check to see if current column is the first or last column
    if (col === 1 || col === bracketObj.columns) {
        firstLastCol = true
    }

    //Check to see if current square should have an item in it
    if (top === row && firstLastCol === false) {
        squareInfo.holdsItem = true
        squareInfo.itemKey = columnInfo.addressCodes[0]
        squareInfo.itemText = addressesWithItems[squareInfo.itemKey].itemText
    } else if (firstLastCol === true && top === row && numItemsInCol > 0) {
        squareInfo.holdsItem = true
        squareInfo.itemKey = columnInfo.addressCodes[0]
        squareInfo.itemText = addressesWithItems[squareInfo.itemKey].itemText
    } else if (firstLastCol && Number.isInteger((row - top) / inOut) && ((row - top) / inOut) <= numItemsInCol - 1) {
        squareInfo.holdsItem = true
        squareInfo.itemKey = columnInfo.addressCodes[(row - top) / inOut]
        squareInfo.itemText = addressesWithItems[squareInfo.itemKey].itemText
    } else if (firstLastCol === false && Number.isInteger((row - top) / inOut)) {
        squareInfo.holdsItem = true
        squareInfo.itemKey = columnInfo.addressCodes[(row - top) / inOut]
        squareInfo.itemText = addressesWithItems[squareInfo.itemKey].itemText
    }

    // Check to see if boxes should have side borders, and which side they should be on
    if (firstLastCol === true && bottom <= (bracketObj.rows - row) && row > top && Math.floor((row - top) / inOut - 0.5) % 2 === 0 && ((row - top) / inOut) <= numItemsInCol) {
        if (Math.floor((row - top) / inOut) % 2 === 0 && col < regionBreak) {
            squareInfo.inside = "InsideLeftTop"
        } else if ((row + 1) % (4) === 0 && col < regionBreak) {
            squareInfo.inside = "InsideLeftBottom"
        } else if (Math.floor((row - top) / inOut) % 2 === 0 && col > regionBreak) {
            squareInfo.inside = "InsideRightTop"
        } else if ((row + 1) % (4) === 0 && col > regionBreak) {
            squareInfo.inside = "InsideRightBottom"
        } else if (col < regionBreak) {
            squareInfo.inside = "InsideLeft"
        } else {
            squareInfo.inside = "InsideRight"
        }
    } else if (firstLastCol === false && bottom <= (bracketObj.rows - row) && row > top && Math.floor((row - top) / (inOut + 0.01)) % 2 === 0) {
        // if (((row + (Math.floor(inOut / 2))) % inOut === 0) && col < regionBreak) {
        if (((row + ((inOut / 2) - 1)) % inOut === 0) && col < regionBreak) {
            squareInfo.inside = "InsideLeftTop"
        } else if (((row + (Math.floor(inOut / 2))) % inOut === 0) && col < regionBreak) {
            squareInfo.inside = "InsideLeftBottom"
        } else if (((row + ((inOut / 2) - 1)) % inOut === 0) && col > regionBreak) {
            squareInfo.inside = "InsideRightTop"
        } else if (((row + (Math.floor(inOut / 2))) % inOut === 0) && col > regionBreak) {
            squareInfo.inside = "InsideRightBottom"
        } else if (col < regionBreak) {
            squareInfo.inside = "InsideLeft"
        } else {
            squareInfo.inside = "InsideRight"
        }
    } else if (col === regionBreak && row === Math.ceil(bracketObj.rows / 2)) {
        squareInfo.inside = "Final2"
    } else if (col === regionBreak + 2 && row === Math.ceil(bracketObj.rows / 2)) {
        squareInfo.inside = "Final2"
    }

    //Check to see if button should be in square
    if (firstLastCol === false && row % inOut === 0 && (row / inOut) % 2 !== 0) {
            squareInfo.button = true
        } else if (firstLastCol === true && row % inOut === 0 && (row / inOut) % 2 !== 0 && ((row - top) / inOut) <= numItemsInCol) {
            squareInfo.button = true
        }

    // Check to see if championship buttons should be in square
    if (col === regionBreak + 1 && row === Math.ceil(bracketObj.rows / 2) + 1) {
        squareInfo.champButton = true
    }

    let classList = []
    if (squareInfo.holdsItem === true) {
        classList.push("HoldsItem")
    }
    if (squareInfo.inside) {
        classList.push(`${squareInfo.inside}`)
    }
    if (squareInfo.button === true) {
        classList.push("ButtonSquare")
    }
    if (squareInfo.champButton === true) {
        classList.push("ChampButtons")
    }

    squareInfo.classList = classList.join(" ")
    return squareInfo
}

export default MakeBracketSquareInfo