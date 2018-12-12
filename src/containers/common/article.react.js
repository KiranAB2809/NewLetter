import React, { Component } from 'react';
import Row from './rows.react';
import ContentHeader from './header.react';
import './common.css';

class Articles extends Component {

    monthArticle = () => {
        if (this.props.articles) {
            return (
                this.props.articles.map(element =>
                    <Row key={element._id} 
                    rowreverse={'row-reverse'} 
                    showDescription={true} 
                    height18={'height18'} 
                    border={'mearger-border'} 
                    article={element} 
                    navigateToArticle={this.props.navigateToArticle}
                    showAuthorInfo = {this.props.showAuthorInfo ? this.props.showAuthorInfo : true} />
                )
            )
        }
        return null;
    }

    showHeader = () => {
        
        if(this.props.headername){
            return <ContentHeader headername={this.props.headername} />
        }
        return null;
    }

    render() {
        return (
            <div className={"featured articlewidth65 " + (this.props.className ? this.props.className : '')}>
                {this.showHeader()}
                {this.monthArticle()}
            </div>
        )
    }
}

export default Articles;