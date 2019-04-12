import React, { Component } from 'react'

class ChampModalContent extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="ChampModalContent" id="ChampModalContent">
                    <div className="ChampModalHeader">
                        And the champion is...
                    </div>
                    <div className="ChampModalWinner">
                        {this.props.winner}!
                    </div>
                </div>
            </React.Fragment >
        )
    }
}

export default ChampModalContent