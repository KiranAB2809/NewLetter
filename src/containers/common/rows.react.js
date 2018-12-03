import React from 'react';
import './common.css';
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
        if (props.showAuthorInfo){ 
            let edited = '';  
            if (props.article && props.article.edited) {
                edited = <Content className={'colorGrey'} desc={'Nov 16 - Edited by ' + props.article.edited.name} />;
            }     
            return (
                <div>
                    <Content className={'colorBlack'} desc={props.article.author.name} />
                    {edited}
                </div>
            )}
        return null;
    }
    const renderOnData = () => {
        if (props.article) {
            return (
                <div className={`mearger ${props.rowreverse ? props.rowreverse : ''} ${props.height ? props.height : ''} ${props.border ? props.border : ''}`}>
                    <div className="mearger-0">
                        <img src={props.article.coverImage} className={`article-logo ${props.imageClass ? props.imageClass : ''}`} alt={'articlePic'} />
                    </div>
                    <div className="mearger-1">
                        <h3 className={`headerh3 ${props.height18 ? props.height18 : ''}`} style={{ WebkitBoxOrient: 'vertical' }} onClick={() => props.navigateToArticle(props.article._id)}>{props.article.title}</h3>
                        {addDescripion()}
                        {authorInfo()}
                    </div>
                </div>
            )
        }
        return (
            <div>
                No data
        </div>);
    }

    return (
        <div>
            {renderOnData()}
        </div>
    )
}

export default Row;