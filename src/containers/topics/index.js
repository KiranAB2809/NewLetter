import React, { Component } from 'react';
import Article from '../common/article.react'
import './topic.css';

class Topic extends Component {
    render(){
        return(
            <div className="topic-container">
            <div>
                Test
            </div>
            {/* <div style={{}}>
                test
            </div> */}
            <div>
                <Article />
            </div>
            </div>
        )
    }
}

export default Topic;