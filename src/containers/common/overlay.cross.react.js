import React from 'react';

const OverlayCross = (props) => (
    <div style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }} onClick={props.changeView}>
        <i className={"fas fa-times"}></i>
    </div>
)

export default OverlayCross;