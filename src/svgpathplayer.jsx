import React from 'react';
import _ from 'lodash';
import Snap from 'snapsvg';
import './svgpathplayer.scss';
import Controls from './controls';
import Spinner from './spinner';


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
        mode: 'loading',
        step: this.props.step,
        steps: 0
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
    }

    play(){
        let start = this.state.position;
        if (start >= this.state.length){
            start = 0; // at the end and pressed play so restart
        }
        let remainingLength = this.state.length - start;
        let remainingTime = this.props.time * remainingLength / this.state.length;
        this._segmentToPath();
        this.setState({mode: 'playing'});
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
                                            this.setState({mode: 'path',
                                                           position: 0});
                                            if (this.props.repeat){
                                                setTimeout(() => this.play(), 1);
                                            }
                                        });
    }

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
    }

    playSegmentForward(){
        let nextStep;
        if ((this.state.step === -1) ||  // never stepped
            (this.state.step + 1 > this.state.steps - 1)) { // stepped off end
            nextStep = 0;
        } else {
            nextStep = this.state.step + 1;
        }
        this._transitionSegment(nextStep);
    }

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
                      let mode = 'path';
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
                      this.setState({mode: mode,
                                     steps: this.snapSegments.length,
                                     length: pathLength});
                      this._hideSegments();
                      if (this.props.startplaying) {
                          this.play();
                      }
                  });
    }

    componentWillUnmount() {
        this.svg.remove();  // destory SnapSVG for this DOM element
    }

    render() {
        let loading = this.state.mode === 'loading';
        let  controls = !this.props.controls ? '' : (<Controls backward={this.playSegmentBackward} forward={this.playSegmentForward} length={this.state.length} loading={loading} mode={this.state.mode} path={this.props.path} pause={this.pause} play={this.play} position={this.state.position} segments={this.props.segments} step={this.state.step} units={this.props.units}/>);
        return (
            <div className="svg-path-player">
                <Spinner loading={this.props.loading && loading}/>
                    <div className="svg-container svg-container-box" ref={(ref) => this.svgImage = ref}>
                </div>
                {controls}
            </div>
        );
    }

    selectPath(pathClass, display){
        this.svg.select(pathClass).attr({display: ''});
        this.path = this.svg.select(pathClass + ' path');
        if (!display) {
            this._hidePath();
        }
    }

    pause(){
        this.setState({mode: 'path'});
        this.snapAnimate.stop();  // resume() doesn't work... :(
    }

    _hidePath(){
        if (this.path){
            this.path.attr({display: 'none'});
        }
    }

    _transitionSegment(nextStep){
        let pathLen;
        this._pathToSegment();
        this.setState({mode: 'playing'});
        this._hideCurrentSegment();
        this._showSegment(nextStep);

        pathLen = this._segmentPosition(nextStep);
        this.positionMarker(this.snapSegment, pathLen, pathLen);
        this.setState({step: nextStep,
                       position: this._segmentPosition(nextStep),
                       mode: 'segment'});
    }

    _segmentFromPosition(pos){
        let x = _.findLastIndex(this.segmentLengths,
                                (length) => {
                                    return pos >= length;
                                });
        x = x < 0 ? 0 : x;
        return x;
    }

    _pathToSegment(){ // switch from playing path to playing segment
        if (this.mode === 'playing') {
            this.pause();
        }
        this.setState({mode: 'segment'});
        this._hidePath();
    }

    _segmentToPath(){ // switch from playing segment to playing path
        this.setState({mode: 'path'});
        this._hideSegments();
    }

    _hideSegments(){
        _.each(this.snapSegments, (segment) => { segment.attr({display: 'none'});});
    }

    _hideCurrentSegment(){
        if (this.snapSegment){
            this.snapSegment.attr({display: 'none'});
        }
    }

    _showSegment(step){
        this.snapSegment = this.snapSegments[step];
        this.snapSegment.attr({display: 'block'});
    }

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
    }

    _segmentPosition(step){
        return this.segmentLengths[step];
    }
}
