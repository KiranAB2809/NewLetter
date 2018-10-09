import React from 'react';
import './common.css';

const ContentHeader = (props) => {
    return(
        <div className={'content-header'}>
            <p>
                {props.headername}
            </p>
        </div>
    )
}

export default ContentHeader;