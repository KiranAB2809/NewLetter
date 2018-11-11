import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Featured from './featured.react';
import TopPicks from './toppicks.react';
import Articles from '../common/article.react';
import Awards from './awards.react';
import './home.css';

class Home extends Component {
    render(){
        return(
            <div className="home-container">
                <div className="home-0">
                    <Featured additionalClass = 'height350'/>
                    <TopPicks />
                    <Featured additionalClass = 'width26'/>
                </div>
                <hr style={{width: '90%', border: '0.5px solid rgba(0,0,0,0.14)', margin: '15px auto'}}/>
                <div className="home-1">
                    <Articles />
                    <Awards />
                </div>
            </div>
        );
    }
}

const mapsStateToProps = (Article) => ({
    Article: Article.Articles
});

export default withRouter(connect(
    mapsStateToProps,
    null
)(Home));