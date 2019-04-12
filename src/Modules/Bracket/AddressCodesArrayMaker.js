function AddressCodesArrayMaker(totalRounds, currentRound, nextRoundsArray) {
    if (totalRounds < currentRound) {
        return ["winner"]
    }
    else if (totalRounds === currentRound) {
        return ["1"]
    }
    else {
        let expandedArray = []
        nextRoundsArray.forEach(address => {
            let add1 = address
            let add2 = address
            let newAddress1 = add1 += "1"
            let newAddress2 = add2 += "2"
            expandedArray.push(newAddress1)
            expandedArray.push(newAddress2)
        });
        return expandedArray
    }
}

export default AddressCodesArrayMaker