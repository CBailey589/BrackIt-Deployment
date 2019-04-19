import React, { Component } from 'react'

import MakeBracketSquareInfo from "../../Modules/Bracket/MakeBracketSquareInfo"
import ConvertColumnToRound from "../../Modules/Bracket/ConvertColumnToRound"

class BracketSqaure extends Component {
    render() {
        const bracketObj = this.props.bracketObj
        const rounds = bracketObj.rounds
        const numRows = bracketObj.rows
        const numCols = bracketObj.columns
        const squareScale = this.props.squareScale
        const vw = this.props.vw
        const vh = this.props.vh
        const vmin = this.props.vmin
        const col = this.props.col
        const row = this.props.row
        let squareInfo = MakeBracketSquareInfo(col, row, bracketObj)
        let round = ConvertColumnToRound(col, bracketObj.columns)
        const classList = `BracketSquare ${squareInfo.classList}`
        return (
            <React.Fragment>
                <div
                    className={`${classList}`}
                    id={`${col}-${row}-${round}--${squareInfo.itemKey}`}
                    style={{
                        height: `${vh / numRows * squareScale}px`,
                        width: `${vw / numCols * squareScale}px`,
                        // ********NEEDS TWEAKING ON SIZE?*************
                        // THIS WAS THE OLD ONE, IS THE NEW ONE BETTER?
                        // fontSize: `${(4 + (((7 - rounds) * 2) + (round * 1.5))) * squareScale}px`
                        fontSize: `${((vmin / 100) + (round * 1.5)) * squareScale * ((7 - rounds)*(1/2))}px`
                    }}
                    onClick={(evt) => {
                        try { this.props.advanceItemToNextRound(evt) }
                        catch (error) { }
                        if (evt.target.classList.contains("Final2") || evt.target.classList.contains("ChampButtons")) {
                            try { this.props.pickChamp(evt) }
                            catch (error) { }
                        }
                    }}
                >
                    {squareInfo.itemText}
                    {
                        (classList.includes("ButtonSquare"))
                            ? <div className="ButtonDiv">
                                <div key={`${round}-${row}-${col}`}
                                    className="BracketButton"
                                    id={`${round}-${row}-${col}`}
                                    onClick={(evt) => {
                                        this.props.advanceItemToNextRound(evt)
                                    }}
                                    style={{
                                        // ********NEEDS TWEAKING ON SIZE?*************
                                        // height: `${squareScale * 2.5 * ((2 * round)) * (7 - rounds)}px`,
                                        // width: `${squareScale * 2.5 * ((2 * round)) * (7 - rounds)}px`,
                                        height: `${squareScale * 1.5 * ((2* round)) * ((7 - rounds)*(2/3)) + (vmin / 350)}px`,
                                        width: `${squareScale * 1.5 * ((2* round)) * ((7 - rounds)*(2/3)) + (vmin / 350)}px`,
                                        // fontSize: `${squareScale * 2 * ((2 * round)) * (7 - rounds)}px`,
                                        fontSize: `${(1 * (vmin / 100) + (round * 1.5)) * squareScale * ((7 - rounds)*(1/4))}px`
                                    }}
                                >
                                    ?
                                </div>
                            </div>
                            : null
                    }
                    {
                        (classList.includes("ChampButtons"))
                            ? <div className="ButtonDiv">
                                <div key={`${row}-${col}`}
                                    className="BracketButton"
                                    id={`${round}-${row}-${col}--Champ`}
                                    onClick={(evt) => {
                                        this.props.pickChamp(evt)
                                    }}
                                    style={{
                                        // ********NEEDS TWEAKING ON SIZE?*************
                                        // height: `${squareScale * 2.5 * ((2 * round)) * (7 - rounds)}px`,
                                        // width: `${squareScale * 2.5 * ((2 * round)) * (7 - rounds)}px`,
                                        height: `${squareScale * 1.5 * ((2 * round)) * ((7 - rounds)*(2/3)) + (vmin / 100)}px`,
                                        width: `${squareScale * 1.5 * ((2 * round)) * ((7 - rounds)*(2/3)) + (vmin / 100)}px`,
                                        // fontSize: `${squareScale * 2 * ((2 * round)) * (7 - rounds)}px`
                                        fontSize: `${((vmin / 100) + (round * 2)) * squareScale * ((7 - rounds)*(2/3))}px`
                                    }}
                                >
                                    ?
                                </div>
                            </div>
                            : null
                    }
                </div>
            </React.Fragment >
        )
    }
}

export default BracketSqaure