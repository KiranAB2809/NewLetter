import React from 'react';
import './common.css';

const Content = (props) => {
    return (
        <p className={'player ' + (props.className ? props.className : '')}>
            {props.desc}
        </p>
    );
}

export default Content;