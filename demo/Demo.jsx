import React from 'react';
import SVGPathPlayer from '../src/svgpathplayer.jsx';
require('./images/segments.svg');
require('./images/pathsegments.svg');


export default class Demo extends React.Component {
    render() {
        let examples = [{title: 'Path, Segments, Marker, Units, Scale, Time, Loading & Controls',
                         description: 'Marker\'s position along the length and step numbers update when using buttons. Converts path inches to yards and display units.',
                         props: {svg:'./images/pathsegments.svg',
                                 path:'.dog-path-0',
                                 segments:'.dog-path-segments-0',
                                 marker:'.dog',
                                 units:'yd',
                                 scale:1/36.0,
                                 loading:true,
                                 time:10236
                                }
                        },
                        {title: 'Segments, Marker, Units, Scale, Loading & Controls',
                         description: 'Step through path segments. Position along length and step numbers update. Converts path inches to meters and display units.',
                         props: {svg: './images/segments.svg',
                                 segments:'.dog-path-segments-0',
                                 marker:'.dog',
                                 units:'m',
                                 scale:1/39.37,
                                 loading:true
                                }
                        },
                        {title: 'Path, Marker, Units, Time, Loading & Controls',
                         description: 'Animate path/marker along path. Position along length updates. Units displayed without scaling.',
                         props: {svg:'./images/pathsegments.svg',
                                 path:'.dog-path-0',
                                 marker:'.dog',
                                 units:'in',
                                 loading:true,
                                 time:10236}
                        },
                        {title: 'Path, Segments, Time, Loading & Controls',
                         description: 'Path is drawn, length, step numbers update via controls without marker.',
                         props: {svg:'./images/pathsegments.svg',
                                 path:'.dog-path-0',
                                 segments:'.dog-path-segments-0',
                                 loading:true,
                                 time:10236}
                        },
                        {title: 'Path, Marker, Time, Loading, Start & Repeat',
                         description:'Hide controls and continuously play path animation with marker.',
                         props: {svg:'./images/pathsegments.svg',
                                 path:'.dog-path-0',
                                 marker:'.dog',
                                 controls:false,
                                 startplaying:true,
                                 repeat:true,
                                 loading:true,
                                 time:10236}
                        },
                        {title: 'Path, Marker, Time, Loading & Start',
                         description: 'Hide controls and automatically play path animation with marker at start. Only plays one time.',
                         props: {svg:'./images/pathsegments.svg',
                                 path:'.dog-path-0',
                                 marker:'.dog',
                                 startplaying:true,
                                 controls:false,
                                 loading:true,
                                 time:10236}
                        }
                       ];
        return (
                <div>
                {examples.map((e, i) =>
                <div key={'key' + i}>
                    <div className="col-xs-12 col-sm-6 col-lg-4" key={i}>
                      <h4>{e.title}</h4>
                      <p>{e.description}</p>
                      <SVGPathPlayer {...e.props}/>
                      <pre className="props">{ JSON.stringify(e.props, null, '    ') }</pre>
                    </div>
                    { (() => {
                        if ((i + 1) % 2 === 0) {
                            return <div className="clearfix visible-sm-block visible-md-block visible-xs-block"/>
                        } else if ((i + 1) % 3 === 0) {
                            return <div className="clearfix visible-xs-block visible-lg-block"/>
                        } else {
                            return <div className="clearfix visible-xs-block"/>
                        }
                    })() }
                </div>
                )}
                </div>);
    }
}
