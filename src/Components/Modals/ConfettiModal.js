import React, { Component } from 'react'

import ConfettiPiece from "./ConfettiPiece"

class ConfettiModal extends Component {
    render() {
        let confettiIndexes = []
        for (var i = 0; i < 250; i++) {
            confettiIndexes.push(i)
        }

        return (
            <React.Fragment>
                <div className="ConfettiModal" id="ConfettiModal">
                    {
                        confettiIndexes.map(idx =>
                            <ConfettiPiece key={`ConfettiPiece-${idx}`}
                                idx={idx} />
                        )
                    }
                </div>
            </React.Fragment >
        )
    }
}

export default ConfettiModal