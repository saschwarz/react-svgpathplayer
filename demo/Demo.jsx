import React from 'react';
import SVGPathPlayer from '../src/svgpathplayer.jsx';


export default class Demo extends React.Component {
  render() {
  return (<div>
    <h1>SVGPathPlayer Demos</h1>
    <div className="row">
      <div className="col-sm-4">
        <h4>AJAX, Path, Segments, Marker, Time, Loading & Controls</h4>
        <div id="player-1"></div>
      </div>
      <div className="col-sm-4">
        <h4>AJAX, Segments, Marker, Time, Loading & Controls</h4>
        <div id="player-2"></div>
      </div>
      <div className="col-sm-4">
        <h4>AJAX, Path, Marker, Time, Loading & Controls</h4>
        <div id="player-3"></div>
      </div>
    </div>
    <div className="row">
      <div className="col-sm-4">
        <h4>AJAX, Path, Segments, Marker, Time, Loading, Start & Repeat</h4>
        <div id="player-4"></div>
      </div>
      <div className="col-sm-4">
        <h4>AJAX, Path, Marker, Time, Loading & Start</h4>
        <p>Runs automatically at start one time.</p>
        <div id="player-5"></div>
      </div>
    </div>
  </div>);
  }

}
