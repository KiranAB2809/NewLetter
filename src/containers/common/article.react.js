import React, { Component } from 'react';
import Row from './rows.react';
import ContentHeader from './header.react';
import './common.css';

class Articles extends Component {

    monthArticle = () => {
        return (
            this.props.articles.map(element => 
                <Row key={element._id} rowreverse={'row-reverse'} showDescription={true} height18 = {'height18'} border = {'mearger-border'} article = {element} navigateToArticle = {this.props.navigateToArticle}/>
            )
        )
    }
    
    render() {
        return(
            <div className = "featured articlewidth65">
            <ContentHeader headername = {'This Month'} />
            {this.monthArticle()}
            </div>
        )
    }
}

export default Articles;