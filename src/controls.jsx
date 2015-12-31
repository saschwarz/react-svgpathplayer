import React from 'react';
import classNames from 'classnames';


export default class Controls extends React.Component {
    static propTypes = {
        backward: React.PropTypes.func,         // func to call stepping backward
        forward: React.PropTypes.func,          // func to call stepping forward
        length: React.PropTypes.number,         // total path length
        mode: React.PropTypes.string,           // "loading", "path", "playing", "segment"
        pause: React.PropTypes.func,            // func to pause animation
        play: React.PropTypes.func,             // func to start animation
        position: React.PropTypes.number,       // start position along path
        step: React.PropTypes.number,           // starting segment 0-based
        units: React.PropTypes.oneOf(['yds', 'm'])  // convert inches to these units
    };

    _displayDistance(inches){
        if (this.props.units == 'm') {
            return Number(inches / 39.37).toFixed();
        } else {
            return Number(inches / 36.00).toFixed();
        }
    }

    _displayStep(step){
        if (step < 0){
            return 0;
        }
        return step + 1;
    }

    render() {
        let steps, playPauseButtons, segmentButtons;
        let loading = this.props.mode === 'loading';
        let stepClasses = classNames(['steps'], {'inactive': this.props.mode === 'path' || this.props.mode === 'playing' || loading});
        let distanceClasses = classNames(['distance'], {'inactive': loading});
        if (this.props.play || this.props.pause){
            let playDisplay = {display: this.props.mode !== 'playing' ? 'inline' : 'none'};
            let pauseDisplay = {display: this.props.mode === 'playing' ? 'inline' : 'none'};

            playPauseButtons = (
                <span>
                    <button aria-pressed="false" autoComplete="off" className="btn btn-success play" disabled={loading} onClick={this.props.play} style={playDisplay} type="button">
                        <span aria-hidden="true" className="glyphicon glyphicon-play"></span>
                    </button>
                    <button aria-pressed="false" autoComplete="off" className="btn pause" disabled={loading} onClick={this.props.pause} style={pauseDisplay} type="button">
                        <span aria-hidden="true" className="glyphicon glyphicon-pause"></span>
                    </button>
                </span>
            );
        }
        if (this.props.backward || this.props.forward){
            segmentButtons = (
                <span>
                    <button aria-pressed="false" autoComplete="off" className="btn step-backward" disabled={loading} onClick={this.props.backward} type="button">
                        <span aria-hidden="true" className="glyphicon glyphicon-step-backward"></span>
                    </button>
                    <button aria-pressed="false" autoComplete="off" className="btn step-forward" disabled={loading} onClick={this.props.forward} type="button">
                        <span aria-hidden="true" className="glyphicon glyphicon-step-forward"></span>
                    </button>
                </span>
            );
            steps = (
                <label className={stepClasses}>{this._displayStep(this.props.step)} - {this._displayStep(this.props.step + 1)}</label>
            );
        }

        let buttons = (<span>
                       {playPauseButtons}
                       {segmentButtons}
                       </span>);

        let distance = (
            <label className={distanceClasses}> {this._displayDistance(this.props.position)} : {this._displayDistance(this.props.length)} {this.props.units}</label>
        );

        return (<div className="buttons">{buttons}
                  <div className="status">{steps}{distance}</div>
                </div>);
    }
}
