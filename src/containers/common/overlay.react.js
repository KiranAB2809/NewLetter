import React from 'react';

const Overlay = (props) => {
    return (
        <div className={'overlay' + (props.className ? ' ' + props.className : '')}>
            <div className={'flex flex-row overlay-child'}>
                {props.children}
            </div>
        </div>
    )
}

export default Overlay;