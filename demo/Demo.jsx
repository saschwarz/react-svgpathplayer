import React from 'react';
import SVGPathPlayer from '../src/svgpathplayer.jsx';
require('./images/image.svg');


export default class Demo extends React.Component {
    render() {
        let examples = [{title: 'AJAX, Path, Segments, Marker, Time, Loading & Controls',
                         props: {svg:'./images/image.svg',
                                 path:'.dog-path-0',
                                 segments:'.dog-path-segments-0',
                                 marker:'.dog',
                                 loading:true,
                                 time:10236}
                        },
                        {title: 'AJAX, Segments, Marker, Time, Loading & Controls',
                         props: {svg: './images/image.svg',
                                 segments:'.dog-path-segments-0',
                                 marker:'.dog',
                                 loading:true,
                                 time:10236}
                        },
                        {title: 'AJAX, Path, Marker, Time, Loading & Controls',
                         props: {svg:'./images/image.svg',
                                 path:'.dog-path-0',
                                 marker:'.dog',
                                 loading:true,
                                 time:10236}
                        },
                        {title: 'AJAX, Path, Segments, Marker, Time, Loading, Start & Repeat',
                         props: {svg:'./images/image.svg',
                                 path:'.dog-path-0',
                                 segments:'.dog-path-segments-0',
                                 marker:'.dog',
                                 loading:true,
                                 time:10236,
                                 controls:false,
                                 startplaying:true,
                                 repeat:true}
                        },
                        {title: 'AJAX, Path, Marker, Time, Loading & Start',
                         props: {svg:'./images/image.svg',
                                 path:'.dog-path-0',
                                 marker:'.dog',
                                 loading:true,
                                 time:10236,
                                 startplaying:true,
                                 controls:false}
                        }
                       ];
        return (
                <div>
                {examples.map((e, i) =>
                    <div className="pure-u-8-24 demo-container" key={i}>
                      <h4>{e.title}</h4>
                      <SVGPathPlayer {...e.props}/>
                      <pre className="props">{ JSON.stringify(e.props, null, '    ') }</pre>
                    </div>
                )}
                </div>);
    }
}
