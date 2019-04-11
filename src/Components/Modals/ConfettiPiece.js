
import React, { Component } from 'react'

class ConfettiPiece extends Component {
    render() {
        var width = Math.random() * 8;
        var height = width * 0.4;
        let RLMvmt = (Math.random() * 400) - 200
        var colorIdx = Math.ceil(Math.random() * 3);
        var color = "defaultColor";
        switch (colorIdx) {
            case 1:
                color = "altColor1";
                break;
            case 2:
                color = "altColor2";
                break;
            default:
                color = "defaultColor";
        }
        return (
            <React.Fragment>
                <div className={`confetti ${color}`}
                    key={`confetti-${this.props.idx}`}
                    style={{
                        left: `${Math.random() * 100}%`,
                        animationName: "fallingConfetti",
                        animationDuration: `${(Math.random()*12) + 5}s`,
                        animationTimingFunction: "ease-out",
                        animationDelay: `${(Math.random() * 12)}s`,
                        animationDirection: "normal",
                        animationIterationCount: "infinite",
                        opacity: 0,
                        height: `${height}px`,
                        width: `${width}px`,
                        "--RL-movement": `${RLMvmt}px`
                    }}>
                </div>
            </React.Fragment >
        )
    }
}

export default ConfettiPiece