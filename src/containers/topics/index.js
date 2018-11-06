import React, { Component } from 'react';
import { connect } from 'react-redux';
import Article from '../common/article.react';
import logo from '../../assets/images/DidYouKnow.jpg';
import { withRouter } from 'react-router-dom';
import './topic.css';

 
class Topic extends Component {

    state = {
        articles: []
    }

    componentDidMount(){
        let topicID = this.props.match.params.id;
        let topicData = this.props.Articles.find(obj => obj.category === topicID);
        this.setState({articles: Object.assign([], topicData)});
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        let topicID = this.props.match.params.id;
        let topicData = nextProps.Articles.find(obj => obj.category === topicID);
        if(topicData)
            this.setState({articles: Object.assign([], topicData.articles)});
    }

    navigateToArticle = (id) => {
        console.log(id);
    }
    
    render() {
        return (
            <div className="topic-container">
                <div style={{ position: 'realtive' }}>
                    <div style={{ position: 'sticky', top: 0 }}>
                        <img src = {logo} className={'banner'}/>
                    </div>
                </div>
                <Article articles = {this.state.articles} navigateToArticle = {this.navigateToArticle}/>
            </div>
        )
    }
}

const mapStateToProps = ({ Article }) => ({
    Articles: Article.Articles
});

export default withRouter(connect(
    mapStateToProps,
    null
)(Topic));