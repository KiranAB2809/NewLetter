import React from 'react';

const Overlay = (props) => {
    return (
        <div className={'overlay'}>
            <div className={'flex flex-row overlay-child'}>
                <div style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }} onClick={props.changeView}>
                    <i class="fas fa-times"></i>
                </div>
                {props.children}
            </div>
        </div>
    )
}

export default Overlay;