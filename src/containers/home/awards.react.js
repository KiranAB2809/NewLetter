import React from 'react';
import ContentHeader from '../common/header.react';
import Row from '../common/rows.react';
import './home.css';

const Awards = (props) => {

    const navigateToPage = (id) => {
        if (props.id && typeof props.goToArticle === 'function') {
            props.goToArticle(props.id, true);
        }
    }

    const displayRows = () => {
        if (Array.isArray(props.article) && props.article.length > 0)
            return (
                props.article.map(ele => <Row defaultImg={props.defautImg} height={'height100'} imageClass={'avatar-image'} key={ele._id} article={ele} navigateToArticle={navigateToPage} />)
            )
        else
            return '';
    }

    return (
        <div style={{ margin: '20px 0 0 50px', maxWidth: '30%' }}>
            <ContentHeader headername={'Awards and Reconization'} />
            {displayRows()}
        </div>
    )
}

export default Awards;