import React from 'react';
import classNames from 'classnames';


export default class Controls extends React.Component {
    static propTypes = {
        backward: React.PropTypes.any,      // func to call stepping backward
        decimalPlaces: React.PropTypes.number,  // distance display decimal places - default to 1
        forward: React.PropTypes.any,       // func to call stepping forward
        length: React.PropTypes.number,     // total path length
        mode: React.PropTypes.string,       // "loading", "path", "playing", "segment"
        pause: React.PropTypes.any,         // func to pause animation
        play: React.PropTypes.any,          // func to start animation
        position: React.PropTypes.number,   // start position along path
        scale: React.PropTypes.number,      // multiply length/position by this before display default 1
        step: React.PropTypes.number,       // starting segment 0-based
        units: React.PropTypes.string       // unit display string default ''
    };

    static defaultProps = {
        decimalPlaces: 1,
        mode: 'loading',
        position: 0,
        scale: 1.0,
        step: 0,
        units: ''
    };

    _displayDistance(position){
        return (position * this.props.scale).toFixed(this.props.decimalPlaces);
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
            let showPause = this.props.mode === 'playing';
            let playDisplay = {display: !showPause ? 'inline' : 'none'};
            let pauseDisplay = {display: showPause ? 'inline' : 'none'};

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
            <label className={distanceClasses}>{this._displayDistance(this.props.position)} : {this._displayDistance(this.props.length)} {this.props.units}</label>
        );

        return (<div className="buttons">{buttons}
                  <div className="status">{steps}{distance}</div>
                </div>);
    }
}
