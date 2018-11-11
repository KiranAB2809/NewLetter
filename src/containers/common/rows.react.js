import React from 'react';
import './common.css';
import logo from './../../assets/images/volvoLogo.jpg';
import Content from './desc.react';


const Row = (props) => {
    const addDescripion = () => {
        if (props.showDescription) {
            return (
                <Content className={'articleSubtitle colorGrey'} desc={props.article.subtitle} />
            );
        }
        return null;
    }

    const authorInfo = () => {
        if (props.showAuthorInfo)
            return (
                <div>
                    <Content className={'colorBlack'} desc={props.article.author.name} />
                    <Content className={'colorGrey'} desc={'Nov 16 - Reported by Bala'} />
                </div>
            )
        return null;
    }
    return (
        <div className={`mearger ${props.rowreverse ? props.rowreverse : ''} ${props.height ? props.height : ''} ${props.border ? props.border : ''}`}>
            <div className="mearger-0">
                <img src={props.article.coverImage} className={`article-logo ${props.imageClass ? props.imageClass : ''}`} alt={'article image'} />
            </div>
            <div className="mearger-1">
                <h3 className={`headerh3 ${props.height18 ? props.height18 : ''}`} style={{ WebkitBoxOrient: 'vertical' }} onClick={() => props.navigateToArticle(props.article._id)}>{props.article.title}</h3>
                {addDescripion()}

            </div>
        </div>
    )
}

export default Row;