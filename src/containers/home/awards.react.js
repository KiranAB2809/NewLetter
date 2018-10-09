import React from 'react';
import ContentHeader from '../common/header.react';
import Row from '../common/rows.react';
import './home.css';

const Awards = (props) => {

    const displayRows = () => {
        return (
            ['1', '2', '3'].map(elemment => <Row height={'height100'} imageClass = {'avatar-image'}/>)
        )
    }

    return (
        <div style={{margin: '20px 0 0 50px', maxWidth: '30%'}}>
            <ContentHeader headername = {'Awards and Reconization'} />
            {displayRows()}
        </div>
    )
}

export default Awards;