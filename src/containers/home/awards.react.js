import React from 'react';
import ContentHeader from './header.react';
import NewsRow from './newsrows.react';
import './home.css';

const Awards = (props) => {

    const displayRows = () => {
        return (
            ['1', '2', '3'].map(elemment => <NewsRow height={'height100'} imageClass = {'avatar-image'}/>)
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