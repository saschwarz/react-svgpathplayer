import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Snap from 'snapsvg';
import './svgpathplayer.scss';


export default class SVGPathPlayer extends React.Component {
    /*
     Animates "drawing" of path with optional marker that is moved
     along the path. Stepping is enabled if segments are supplied.
     Segments are not animated only hidden/displayed.
     Assumes:
     In the input svg:
       - path is initially display:none
       - segments are initially display:none
       - marker can have any initial display and it will be made
         visible and positioned at the start of the path on mount.
     - If a marker is defined and the path or segments have markers
       their markers will be hidden and the marker will be moved and
       displayed (at the start of the path/end of segments).
     */
    static propTypes = {
        controls: React.PropTypes.bool,  // show controls
        loading: React.PropTypes.bool,  // show loading indicator
        marker: React.PropTypes.string,   // selector to SVG object to use as path marker
        path: React.PropTypes.string.isRequired,  // selector to SVG path to render

        position: React.PropTypes.number,       // start position along path
        repeat: React.PropTypes.bool,  // loop playing

        segments: React.PropTypes.string,  // selector to container of SVG path segments to render
        startplaying: React.PropTypes.bool,  // start playing
        step: React.PropTypes.number,       // starting segment 0-based

        svg: React.PropTypes.string.isRequired,  // URL to svg element
        time: React.PropTypes.number,   // path animation time defaults to 2000ms
        units: React.PropTypes.oneOf(['yds', 'm'])  // convert inches to these units
    };

    static defaultProps = {
        svg: '',
        path: '',
        marker: '',
        units: 'yds',
        position: 0,
        time: 2000,

        segments: '',
        step: -1,

        startplaying: false,
        loading: true,
        controls: true,
        repeat: false
    };

    state = {
        length: 0,
        position: this.props.position,
        mode: 'path',
        step: this.props.step,
        steps: 0,

        playing: false,
        loading: true
    };

    constructor(props) {
        super(props);
        this.svg = null;
        this.snapAnimate = null;
        this.snapSegment = null;
        this.snapSegments = [];

        this.path = null;
        this.marker = null;
        this.segmentLengths = [];

        this.play = this.play.bind(this);
        this.playSegmentForward = this.playSegmentForward.bind(this);
        this.playSegmentBackward = this.playSegmentBackward.bind(this);
        this.pause = this.pause.bind(this);
    };

    play(){
        let start = this.state.position;
        if (start >= this.state.length){
            start = 0; // at the end and pressed play so restart
        }
        let remainingLength = this.state.length - start;
        let remainingTime = this.props.time * remainingLength / this.state.length;
        this._segmentToPath();
        this.setState({playing: true});
        this.path.attr({'stroke-dasharray': this.state.length + ' ' + this.state.length});
        this.path.attr({display: 'block'});
        this.snapAnimate = Snap.animate(remainingLength, 0,
                                        (val) => { // incremental callback
                                            let newPos = this.state.length - val;
                                            this.path.attr({'stroke-dashoffset': val});
                                            if (this.marker) {
                                                this.positionMarker(this.path,
                                                                    newPos,
                                                                    this.state.length);
                                            }
                                            this.setState({position: newPos,
                                                           step: this._segmentFromPosition(newPos)});
                                        },
                                        remainingTime,
                                        mina.linear,
                                        () => { // end callback
                                            this.setState({playing: false,
                                                           position: 0});
                                            if (this.props.repeat){
                                                setTimeout(() => this.play(), 1);
                                            }
                                        });
    };

    positionMarker(path, location, end){
        if (this.marker) {
            let point = Snap.path.getPointAtLength(path, location);
            let now = point;
            if (end && end - location < 1) {
                // Snap.svg at very end of path returns rotation as 90 degrees
                while (point.alpha === 90) {
                    location -= 1;
                    point = Snap.path.getPointAtLength(path, location);
                }
            }
            this.marker.transform('translate(' + now.x + ',' + now.y + ') rotate('+ (point.alpha - 90)+')');
        }
    };

    playSegmentForward(){
        let nextStep;
        if ((this.state.step === -1) ||  // never stepped
            (this.state.step + 1 > this.state.steps - 1)) { // stepped off end
            nextStep = 0;
        } else {
            nextStep = this.state.step + 1;
        }
        this._transitionSegment(nextStep);
    };

    playSegmentBackward(){
        let nextStep;
        if (this.state.step <= 0){  // never stepped start at -1
            nextStep = this.state.steps - 1;
        } else {
            nextStep = this.state.step - 1;
        }
        this._transitionSegment(nextStep);
    }

    componentDidMount() {
        Snap.load(this.props.svg,
                  (file) => {
                      let pathLength = 0;
                      this.svg = Snap(this.svgImage);
                      this.svg.append(file);
                      if (this.props.path){
                          this.selectPath(this.props.path, true);
                          pathLength = this.path.getTotalLength();
                      }
                      if (this.props.segments){
                          this.snapSegments = this.svg.selectAll(this.props.segments + ' path');
                          this.segmentLengths = this._segmentLengths();
                          if (!pathLength){
                              pathLength = this._segmentPosition(this.snapSegments.length-1);
                          }
                      }
                      if (this.props.marker) {
                          this.marker = this.svg.select(this.props.marker);
                          this.marker.attr({marker:'', markerStart:'', markerEnd:''});
                          if (this.props.path){
                              this.path.attr({marker:'', markerStart:'', markerEnd:''});
                          }
                          if (this.props.segments){
                              this.snapSegments.attr({marker:'', markerStart:'', markerEnd:''});
                          }
                          this.positionMarker(this.path, 0);
                      }
                      this.setState({loading: false,
                                     steps: this.snapSegments.length,
                                     length: pathLength});
                      this._hideSegments();
                      if (this.props.startplaying) {
                          this.play();
                      }
                  });
    };

    componentWillUnmount() {
        this.svg.remove();  // destory SnapSVG for this DOM element
    };

    render() {
        let loading = this.state.loading;
        let playDisplay = {display: !this.state.playing ? 'inline' : 'none'};
        let pauseDisplay = {display: this.state.playing ? 'inline' : 'none'};
        let stepClasses = classNames(['steps'], {'inactive': this.state.mode=='path' || this.state.playing || loading});
        let distanceClasses = classNames(['distance'], {'inactive': loading});
        let controls = '';
        let segmentButtons, playPauseButtons, steps, distance, buttons;
        if (this.props.path){
            playPauseButtons = (
                <span>
                    <button aria-pressed="false" autoComplete="off" className="btn btn-success" disabled={loading} onClick={this.play} style={playDisplay} type="button">
                        <span aria-hidden="true" className="glyphicon glyphicon-play"></span>
                    </button>
                    <button aria-pressed="false" autoComplete="off" className="btn" disabled={loading} onClick={this.pause} style={pauseDisplay} type="button">
                        <span aria-hidden="true" className="glyphicon glyphicon-pause"></span>
                    </button>
                </span>
            );
        }

        if (this.props.segments){
            segmentButtons = (
                <span>
                        <button aria-pressed="false" autoComplete="off" className="btn step-backward" disabled={loading} onClick={this.playSegmentBackward} type="button">
                            <span aria-hidden="true" className="glyphicon glyphicon-step-backward"></span>
                        </button>
                        <button aria-pressed="false" autoComplete="off" className="btn step-forward" disabled={loading} onClick={this.playSegmentForward} type="button">
                            <span aria-hidden="true" className="glyphicon glyphicon-step-forward"></span>
                        </button>
                </span>
            );
            steps = (
                <label className={stepClasses}>{this._displayStep(this.state.step)} - {this._displayStep(this.state.step + 1)}</label>
            );
        }

        buttons = (
                <span>
                    {playPauseButtons}
                    {segmentButtons}
                </span>
            );

        distance = (
            <label className={distanceClasses}> {this._displayDistance(this.state.position)} : {this._displayDistance(this.state.length)} {this.props.units}</label>
        );
        let loadingImg = this.props.loading && loading ? (<div className="loading glyphicon glyphicon-refresh glyphicon-spin"></div>) : '';
        if (this.props.controls) {
            controls = (<div className="buttons">{buttons}
                        <div className="status">{steps}{distance}</div>
                        </div>);
        }

        return (
            <div className="svg-path-player">
                {loadingImg}
                <div className="svg-container svg-container-box" ref={(ref) => this.svgImage = ref}>
                </div>
                {controls}
            </div>
        );
    };

    selectPath(pathClass, display){
        this.svg.select(pathClass).attr({display: ''});
        this.path = this.svg.select(pathClass + ' path');
        if (!display) {
            this._hidePath();
        }
    };

    pause(){
        this.setState({playing: false});
        this.snapAnimate.stop();  // resume() doesn't work... :(
    };

    _hidePath(){
        if (this.path){
            this.path.attr({display: 'none'});
        }
    };

    _transitionSegment(nextStep){
        let pathLen;
        this._pathToSegment();
        this.setState({playing: true});
        this._hideCurrentSegment();
        this._showSegment(nextStep);

        pathLen = this._segmentPosition(nextStep);
        this.positionMarker(this.snapSegment, pathLen, pathLen);
        this.setState({step: nextStep,
                       position: this._segmentPosition(nextStep),
                       playing: false});
    };

    _segmentFromPosition(pos){
        let x = _.findLastIndex(this.segmentLengths,
                                (length) => {
                                    return pos >= length;
                                });
        x = x < 0 ? 0 : x;
        return x;
    };

    _pathToSegment(){ // switch from playing path to playing segment
        if (this.state.playing) {
            this.pause();
        }
        this.setState({mode: 'segment'});
        this._hidePath();
    };

    _segmentToPath(){ // switch from playing segment to playing path
        this.setState({mode: 'path'});
        this._hideSegments();
    };

    _hideSegments(){
        _.each(this.snapSegments, (segment) => { segment.attr({display: 'none'});});
    };

    _hideCurrentSegment(){
        if (this.snapSegment){
            this.snapSegment.attr({display: 'none'});
        }
    };

    _showSegment(step){
        this.snapSegment = this.snapSegments[step];
        this.snapSegment.attr({display: 'block'});
    };

    _segmentLengths(){
        // total length of path at end of each segment
        return _.reduce(this.snapSegments,
                        (a, v) => {
                            if (_.last(a)) {
                                a.push(_.last(a) + v.getTotalLength());
                            } else {
                                a.push(v.getTotalLength());
                            }
                            return a;
                        }, []);
    };

    _segmentPosition(step){
        return this.segmentLengths[step];
    };

    _displayStep(step){
        if (step < 0){
            return 0;
        }
        return step + 1;
    };

    _displayDistance(inches){
        if (this.props.units == 'm') {
            return Number(inches / 39.37).toFixed();
        } else {
            return Number(inches / 36.00).toFixed();
        }
    }
};
