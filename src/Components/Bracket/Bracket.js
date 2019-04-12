import React, { Component } from 'react'

import PrepareBracketList from "../../Modules/Bracket/PrepareBracketList"
import DetermineBracketAttributes from "../../Modules/Bracket/DetermineBracketAttributes"
import AddressCodesRegionizer from '../../Modules/Bracket/AddressCodesRegionizer'
import SplitItemsToRegions from '../../Modules/Bracket/SplitItemsToRegions'
import SendItemsToAddresses from "../../Modules/Bracket/SendItemsToAddresses"
import MakeRangeArrays from "../../Modules/Bracket/MakeRangeArrays"

import ChampModalContent from "../Modals/ChampModalContent"
import ConfettiModal from "../Modals/ConfettiModal"

import BracketSquare from "./BracketSquare"
import "./Bracket.css"
import ListManager from '../../Modules/ResourceManagers/ListManager'
import ListItemManager from '../../Modules/ResourceManagers/ListItemManager'
import NavBar from "../NavBar/NavBar"
import SideBar from "../SideBar/SideBar"
import Footer from "../Footer/Footer"


class Bracket extends Component {
    state = {
        bracketObj: {
            rows: 0,
            columns: 0,
            AddressesWithItems: {},
            columnInfo: [],
            rounds: 0,
            rowIdxs: [],
            colIdxs: [],
            zoomScale: 1
        },
        isDown: false,
        startX: 0,
        startY: 0,
        scrollLeft: 0,
        scrollTop: 0,
        squareScale: 1,
        vw: 0,
        vh: 0,
        champModalContent: [],
        confettiModal: []
    }

    advanceItemToNextRound = (evt) => {
        let newState = {}
        newState.bracketObj = this.state.bracketObj
        let multiplier
        let round
        let row
        let col

        if (evt.target.id.includes("L") === false && evt.target.id.includes("R") === false) {
            let id = evt.target.id.split("--")[0].split("-")
            round = parseInt(id[0])
            row = parseInt(id[1])
            col = parseInt(id[2])

            let choice1Weight = this.state.bracketObj.AddressesWithItems[document.querySelector(`div[id^="${`${col}-${row - 1 * (Math.pow(2, (round - 1)))}`}"]`).id.split("--")[1]].itemWeight || 0
            let choice2Weight = this.state.bracketObj.AddressesWithItems[document.querySelector(`div[id^="${`${col}-${row + 1 * (Math.pow(2, (round - 1)))}`}"]`).id.split("--")[1]].itemWeight || 0

            if ((choice1Weight * Math.random()) > (choice2Weight * Math.random())) {
                multiplier = -1
            } else {
                multiplier = 1
            }
        } else {
            let id = evt.target.id.split("--")[0].split("-")
            round = parseInt(id[2])
            row = parseInt(id[1])
            col = parseInt(id[0])
            multiplier = 0
        }


        let idToFind = `${col}-${row + multiplier * (Math.pow(2, (round - 1)))}`
        let squareWithItem = document.querySelector(`div[id^="${idToFind}"]`)

        let addressToAdvanceFrom = squareWithItem.id.split("--")[1]
        let addressToAdvanceTo = addressToAdvanceFrom.substring(0, addressToAdvanceFrom.length - 1)

        newState.bracketObj.AddressesWithItems[addressToAdvanceTo] = this.state.bracketObj.AddressesWithItems[addressToAdvanceFrom]

        for (let index = 1; index < addressToAdvanceTo.length; index++) {
            if (addressToAdvanceTo.length - index >= 2) {
                let furtherAddress = addressToAdvanceTo.substring(0, addressToAdvanceTo.length - index)
                newState.bracketObj.AddressesWithItems[furtherAddress] = ""
            } else if (addressToAdvanceFrom.length - index === 2) {
                newState.bracketObj.AddressesWithItems["winner"] = ""
            }
        }
        this.setState(newState)
    }

    pickChamp = (evt) => {
        let newState = {}
        newState.bracketObj = this.state.bracketObj
        let round
        let row
        let col
        let modifier

        if (evt.target.id.includes("Champ")) {
            let id = evt.target.id.split("--")[0].split("-")
            round = parseInt(id[0])
            row = parseInt(id[1]) - 1
            col = parseInt(id[2])

            let choice1Weight = this.state.bracketObj.AddressesWithItems["L1"].itemWeight || 0
            let choice2Weight = this.state.bracketObj.AddressesWithItems["R1"].itemWeight || 0

            if ((choice1Weight * Math.random()) > (choice2Weight * Math.random())) {
                modifier = -1
            } else {
                modifier = 1
            }
        }
        else if (evt.target.classList.contains("Final2")) {
            let id = evt.target.id.split("--")[0].split("-")
            round = parseInt(id[2])
            row = parseInt(id[1])
            col = parseInt(id[0])
            modifier = 0
        }

        let idToFind = `${col + modifier}-${row}`
        let squareWithItem = document.querySelector(`div[id^="${idToFind}"]`)

        let addressToAdvanceFrom = squareWithItem.id.split("--")[1]

        newState.bracketObj.AddressesWithItems["winner"] = this.state.bracketObj.AddressesWithItems[addressToAdvanceFrom]

        this.setState(newState)
        this.showChamp()
    }

    showChamp = () => {
        const newState = {}

        let champModalContent = <ChampModalContent
            winner={this.state.bracketObj.AddressesWithItems["winner"].itemText} />

        let confettiModal = <ConfettiModal />

        newState.champModalContent = champModalContent
        newState.confettiModal = confettiModal
        this.setState({
            champModalContent: newState.champModalContent,
            confettiModal: newState.confettiModal
        }, () => {
        })
    }

    componentDidMount() {
        const newState = {}
        let userId = parseInt(this.props.userId)
        let items
        let prom1 = ListItemManager.CUSTOMSEARCH(`?userId=${userId}&&listId=${this.props.match.params.listId}`).then(json => items = json)
        Promise.all([prom1])
            .then(() => {
                const preparedArray = PrepareBracketList(items)
                if (preparedArray.length > 0) {
                    let bracketInfo = DetermineBracketAttributes(preparedArray)
                    bracketInfo = AddressCodesRegionizer(bracketInfo)
                    bracketInfo = SplitItemsToRegions(preparedArray, bracketInfo)
                    bracketInfo = SendItemsToAddresses(bracketInfo)
                    newState.bracketObj = MakeRangeArrays(bracketInfo)

                    newState.vw = document.querySelector(".BracketView").clientWidth
                    newState.vh = document.querySelector(".BracketView").clientHeight


                    this.setState(newState)
                } else {
                    this.props.history.push("/")
                }
            })
    }

    setBracketScale = (evt) => {
        evt.preventDefault()
        let scale = this.state.squareScale
        if (evt.deltaY < 0) {
            // Zoom in
            scale += evt.deltaY * -.005;
        }
        else {
            // Zoom out
            scale -= evt.deltaY * .005;
        }
        // Restrict scale to between 1 and 8
        scale = Math.min(Math.max(1, scale), 8);
        this.setState({ squareScale: scale })
    }

    render() {
        let rowIdxs = this.state.bracketObj.rowIdxs
        let colIdxs = this.state.bracketObj.colIdxs
        return (
            <React.Fragment>
                <NavBar
                    {...this.props} />
                <SideBar />
                <Footer />

                <section className="BracketView">
                    <section className="BracketSquareContainer"
                        onWheel={(evt) => { this.setBracketScale(evt) }}

                        // Dragging for bracket area starts here:
                        onMouseDown={(evt) => {
                            document.querySelector(".BracketSquareContainer").classList.add("active")
                            this.setState({
                                isDown: true,
                                startX: evt.pageX - document.querySelector(".BracketView").offsetLeft,
                                startY: evt.pageY - document.querySelector(".BracketView").offsetTop,
                                scrollLeft: document.querySelector(".BracketView").scrollLeft,
                                scrollTop: document.querySelector(".BracketView").scrollTop
                            })
                        }}
                        onMouseUp={(evt) => {
                            this.setState({ isDown: false })
                            document.querySelector(".BracketSquareContainer").classList.remove("active")
                        }}
                        onMouseLeave={(evt) => {
                            this.setState({ isDown: false })
                            document.querySelector(".BracketSquareContainer").classList.remove("active")
                        }}
                        onMouseMove={(evt) => {
                            if (this.state.isDown === false) {
                                return
                            } else {
                                evt.preventDefault()
                                const x = evt.pageX - document.querySelector(".BracketView").offsetLeft
                                const walkX = (x - this.state.startX) * 2.5
                                const y = evt.pageY - document.querySelector(".BracketView").offsetTop
                                const walkY = (y - this.state.startY) * 2.5
                                document.querySelector(".BracketView").scrollLeft = this.state.scrollLeft - walkX
                                document.querySelector(".BracketView").scrollTop = this.state.scrollTop - walkY
                            }
                        }}
                        // Dragging for bracket area ends here.

                        style={{ height: `${this.state.vh * this.state.squareScale}px`, width: `${this.state.vw * this.state.squareScale}px` }}
                    >
                        {
                            rowIdxs.map(row =>
                                colIdxs.map(col =>
                                    <BracketSquare key={`col-${col}-row-${row}`}
                                        row={row}
                                        col={col}
                                        bracketObj={this.state.bracketObj}
                                        advanceItemToNextRound={this.advanceItemToNextRound}
                                        pickChamp={this.pickChamp}
                                        vh={this.state.vh}
                                        vw={this.state.vw}
                                        squareScale={this.state.squareScale} />
                                ))
                        }
                    </section>
                    <div className="ChampModalSection" id="ChampModalSection">
                        <div>
                            {this.state.confettiModal}
                        </div>
                        <div>
                            {this.state.champModalContent}
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

export default Bracket