import React from 'react';
import './common.css';

const Card = (props) => {
    return(
        <div className={'card' + (props.className ? ' ' + props.className : '')}>
            {props.children}
        </div>
    )
}

export default Card;