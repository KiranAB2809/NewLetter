import React, { Component } from 'react';
import { connect } from 'react-redux';
import Article from '../common/article.react';
import logo from '../../assets/images/success-signpost-md.png';
import { withRouter } from 'react-router-dom';
import { getReviewArticle, getUserArticle } from '../../modules/actions'
import './topic.css';
import ContentHeader from '../common/header.react';
import { Tabs, Tab } from '../common/tabs.react';
const DidYouKnow = 'DID YOU KNOW'

class Topic extends Component {

    state = {
        articles: [],
        isEditor: false,
        isUser: false,
        topicId: '',
        didCtrId:''
    }

    componentDidMount() {
        this.checkParamsId(this.props.match.params.id);
        this.setdidCtrId();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.checkParamsId(this.props.match.params.id);
        }
        if (Object.keys(this.props.User).length > 0 && this.props.User._id && this.props.User._id !== prevProps.User._id) {
            this.props.getUserArticle(this.props.User._id);
        }
        this.setdidCtrId();
    }

    setdidCtrId = () => {
        if(Array.isArray(this.props.categories) && this.props.categories.length > 0){
            let ctr = this.props.categories.find(ele => ele.title === DidYouKnow);
            if(Object.keys(ctr).length > 0 && ctr._id && ctr._id !== this.state.didCtrId){
                this.setState({didCtrId: ctr._id});
            }
        }
    }

    checkParamsId = (id) => {
        let state = Object.assign({}, this.state);
        if (id === 'editor') {
            state.isEditor = true;
            state.isUser = false;
            state.topicId = '';
            this.props.getReviewArticle();
        } else if (id === 'user') {
            state.isEditor = false;
            state.isUser = true;
            state.topicId = '';
            if (this.props.User._id) {
                this.props.getUserArticle(this.props.User._id);
            }
        } else {
            state.isEditor = false;
            state.isUser = false;
            state.topicId = id;
        }
        this.setState(state);
    }

    navigateToArticle = (id) => {
        let card = false
        if (this.state.isEditor && Array.isArray(this.props.Articles.articlesForReview)) {
            let data = this.props.Articles.articlesForReview.filter(ele => ele._id === id && ele.category === this.state.didCtrId);
            if (data.length > 0) {
                card = true;
            }
        } else if (this.state.isUser && Array.isArray(this.props.Articles.UserArticles)) {
            let data = this.props.Articles.UserArticles.filter(ele => ele._id === id && ele.category === this.state.didCtrId);
            if (data.length > 0) {
                card = true;
            }
        }
        if (card) {
            this.props.history.push("/cardeditor/true/didyouknow/" + id);
        } else {
            this.props.history.push(((this.state.isEditor || this.state.isUser) ? "/create/" : "/article/") + id);
        }
    }

    renderUserorTopic = () => {
        if (this.state.isUser) {
            let drafts = this.props.Articles.UserArticles.filter(ele => ele.isDraft);
            let underReview = this.props.Articles.UserArticles.filter(ele => !ele.isDraft && !ele.isPublished);
            let published = this.props.Articles.UserArticles.filter(ele => ele.isPublished);
            return (
                <div className="user-container">
                    <ContentHeader headername="Your Articles" className={'no-border no-margin'} />
                    <div>
                        <Tabs className="tabs-wrapper">
                            <Tab active="true" title={'Drafts'}>
                                <Article articles={drafts} className={'no-width'} navigateToArticle={this.navigateToArticle} showAuthorInfo={false}></Article>
                            </Tab>
                            <Tab title={'Under Review'}>
                                <Article articles={underReview} className={'no-width'} navigateToArticle={this.navigateToArticle} showAuthorInfo={false}></Article>
                            </Tab>
                            <Tab title={"Published"}>
                                <Article articles={published} className={'no-width'} navigateToArticle={this.navigateToArticle} showAuthorInfo={false}></Article>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            )
        } else {
            let topicData = [];
            if (this.state.isEditor) {
                topicData = this.props.Articles.articlesForReview;
            }
            else if (this.state.topicId) {
                let data = this.props.Articles.Articles.find(obj => obj.category === this.state.topicId);
                if (data)
                    topicData = data.articles;
            }
            return (
                <div className="topic-container">
                    <div style={{ position: 'realtive' }}>
                        <div style={{ position: 'sticky', top: 0, maxWidth: '400px' }}>
                            <img src={logo} className={'banner'} />
                        </div>
                    </div>
                    <Article headername={'This Month'} articles={topicData} showAuthorInfo={true} navigateToArticle={this.navigateToArticle} />
                </div>
            )
        }
        return null;
    }

    render() {
        return (
            <div>
                {this.renderUserorTopic()}
            </div>
        )
    }
}

const mapStateToProps = ({ Article, User, Category }) => ({
    Articles: Article,
    User: User.User,
    categories: Category.categories
});

export default withRouter(connect(
    mapStateToProps,
    {
        getReviewArticle,
        getUserArticle
    }
)(Topic));