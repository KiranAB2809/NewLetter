import React, { Component } from 'react';
import Article from '../common/article.react';
import logo from '../../assets/images/DidYouKnow.jpg'
import './topic.css';

class Topic extends Component {
    render() {
        return (
            <div className="topic-container">
                <div style={{ position: 'realtive' }}>
                    <div style={{ position: 'sticky', top: 0 }}>
                        <img src = {logo} className={'banner'}/>
                    </div>
                </div>
                <Article />
            </div>
        )
    }
}

export default Topic;