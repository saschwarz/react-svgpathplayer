import React from 'react';
import SVGPathPlayer from '../src/svgpathplayer.jsx';


export default class Demo extends React.Component {
  render() {
  return (
      <div>
        <div className="row">
          <div className="col-sm-4">
            <h4>AJAX, Path, Segments, Marker, Time, Loading & Controls</h4>
            <SVGPathPlayer svg="/demo/image.svg" path=".dog-path-0" segments=".dog-path-segments-0" marker=".dog" loading={true} time={10236}><img width="50%" src="/demo/image.svg" /></SVGPathPlayer>
            <pre>{'svg:"/image.svg", path:".dog-path-0", segments:".dog-path-segments-0", marker:".dog", loading:true, time:10236'}</pre>
          </div>
        </div>
      </div>);
  }
}
