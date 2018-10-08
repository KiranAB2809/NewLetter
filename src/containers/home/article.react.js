import React, { Component } from 'react';
import Row from '../common/rows.react';
import ContentHeader from './header.react';
import './home.css';

class Articles extends Component {

    monthArticle = () => {
        return (
            ['1', '2', '3', '4', 5, 6 , 7, 8, 9, 10].map( elemment => 
            <Row rowreverse={'row-reverse'} showDescription={true} height18 = {'height18'}/>
            )
        )
    }
    
    render() {
        return(
            <div className = "featured articlewidth60">
            <ContentHeader headername = {'This Month'} />
            {this.monthArticle()}
            </div>
        )
    }
}

export default Articles;