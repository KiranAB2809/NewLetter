import React, { Component } from 'react';
import { connect } from 'react-redux';
import Article from '../common/article.react';
import logo from '../../assets/images/DidYouKnow.jpg';
import { withRouter } from 'react-router-dom';
import { getReviewArticle } from '../../modules/actions'
import './topic.css';
// import { article } from '../../modules/actions'


class Topic extends Component {

    state = {
        articles: [],
        isEditor: false,
        topicId: ''
    }

    componentDidMount() {
        let topicID = this.props.match.params.id;
        this.setState({ topicId: topicID })
        if (topicID === 'editor') {
            this.setState({ isEditor: true });
            this.props.getReviewArticle();
        }
    }

    navigateToArticle = (id) => {
        this.props.history.push((this.state.isEditor ? "/create/" : "/article/") + id);
    }

    render() {
        let topicData = [];
        if (this.state.isEditor) {
            topicData = this.props.Articles.articlesForReview;
        }
        else {
            let data = this.props.Articles.Articles.find(obj => obj.category === this.state.topicId);
            if (data)
                topicData = data;
        }
        return (
            <div className="topic-container">
                <div style={{ position: 'realtive' }}>
                    <div style={{ position: 'sticky', top: 0 }}>
                        <img src={logo} className={'banner'} />
                    </div>
                </div>
                <Article articles={topicData} navigateToArticle={this.navigateToArticle} />
            </div>
        )
    }
}

const mapStateToProps = ({ Article }) => ({
    Articles: Article
});

export default withRouter(connect(
    mapStateToProps,
    {
        getReviewArticle
    }
)(Topic));