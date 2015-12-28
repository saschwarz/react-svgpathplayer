import React from 'react';


export default function Spinner({loading}) {
    let show = loading ? {} : {display: 'none'};
    return <div className="loading glyphicon glyphicon-refresh glyphicon-spin" style={show}></div>;
}
