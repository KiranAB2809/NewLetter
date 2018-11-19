import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import './cardeditor.css';
import AuthorInfo from '../common/authorinfo.react';
import User from '../../models/user.class';
import Card from '../common/card.react';
import { CardFormBlog } from './cardform.react';
import { CardForm, Article } from '../../models/article.class';
import { api, imgConv } from '../../services';
import { updateArticle, getArticle, updateReviewArticle } from '../../modules/actions'


class Cardeditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            article: new Article(),
            articleId: '',
            mode: false,
            categoryId: ''
        }
    }

    componentDidMount() {
        let state = Object.assign({}, this.state);
        var articleId = this.props.match.params.id;
        var mode = this.props.match.params.mode;
        state.mode = mode === "true" ? true : false;
        state.categoryId = this.props.match.params.type;
        if (state.mode) {
            this.setState({ categoryId: this.setCategory() });
        }
        if (!state.mode) {
            this.getAllArticles();
        }
        if (articleId) {
            state.articleId = articleId;
            this.props.getArticle(articleId);
        }
        this.setState(state);
    }

    setCategory = () => {
        if (this.state.mode && (this.state.categoryId === 'didyouknow' || this.state.categoryId === 'awards')) {
            let categoryTitle = this.state.categoryId === 'didyouknow' ? 'DID YOU KNOW' : 'Awards';
            if (Array.isArray(this.props.categories) && this.props.categories.length > 0) {
                let data = this.props.categories.find(ele => ele.title === categoryTitle);
                if (data && data.title) {
                    return (data._id);
                }
            }
        }
        return '';
    }

    componentDidUpdate(prevProps) {
        if (this.state.mode) {
            if (Object.keys(this.state.article).length > 0 && prevProps.Article.displayArticle._id !== this.state.article._id) {
                let stateArticle = Object.assign({}, this.props.Article.displayArticle, {
                    list: [...this.props.Article.displayArticle.list]
                });
                this.setState({ article: stateArticle });
            }
            let categoryId = this.setCategory();
            if (categoryId && this.state.categoryId !== categoryId) {
                this.setState({ categoryId: categoryId });
            }
        } else if (!this.state.mode) {
            this.getAllArticles();
        }
        let mode = this.props.match.params.mode === "true" ? true : false;
        if (mode !== this.state.mode) {
            this.setState({ mode: mode });
            if (mode) {
                this.setState({ categoryId: this.setCategory() });
            }
        }
        if (this.props.match.params.type !== prevProps.match.params.type) {
            this.setState({ categoryId: this.props.match.params.type });
        }
        if (this.props.match.params.id !== this.state.articleId) {
            this.setState({ articleId: this.props.match.params.id });
        }
    }

    getAllArticles = () => {
        let article = this.props.Article.Articles.find(ele => ele.category === this.state.categoryId);
        let stateArticle = [];
        if (article && Object.keys(article).length > 0) {
            for (const row of article.articles) {
                stateArticle = stateArticle.concat(row);
            }
        }
    }

    addOneMore = () => {
        let article = Object.assign({}, this.state.article);
        article.list.push(new CardForm());
        this.setState({ article: Object.assign([], article) });
    }

    onEdit = (event, i) => {
        this.updateState(event.target.value, event.target.name, i)
    }

    updateState = (value, field, index) => {
        let list = Object.assign([], this.state.article.list);
        list[index][field] = value;
        this.setState({
            article: Object.assign({}, this.state.article, {
                list: [...list]
            })
        });
    }

    onSave = () => {
        let article = Object.assign({}, this.state.article);
        var date = new Date();
        article.title = 'Did you know on ' + date.toDateString();
        article.author = article.author ? article.author : this.props.User._id;
        article.category = this.state.categoryId;
        if (this.props.User.isEditor) {
            if (this.state.articleId) {
                if (this.state.article.isDraft) {
                    article.isDraft = false;
                } else {
                    article.isPublished = true;
                }
            } else {
                article.isDraft = false;
            }
        } else {
            article.isDraft = false;
        }
        this.setState({ article: article });
        this.props.updateArticle(article);
    }

    uploadImageSrc = (data, index) => {
        let start = data.indexOf(':') + 1;
        let end = data.indexOf(';', start);
        let mime = data.substring(start, end);
        let base64 = data.replace(/^data:image\/(png|jpeg);base64,/, "")
        let blob = imgConv(base64, mime);
        api.uploadBlogImage(blob)
            .then(data => {
                if (data && data.response && data.response.location) {
                    this.updateState(data.response.location, 'image', index)
                }
            })
            .catch(err => console.log(err));
    }

    editForm = () => {
        return (
            <div style={{ padding: "10px" }}>
                <div style={{ marginBottom: '10px' }}>
                    {this.state.article.list.map((ele, index) =>
                        <Card key={index}>
                            <CardFormBlog data={ele} index={index} onEdit={this.onEdit} doUpload={true} className={'width-200 height-150 background-center background-norepeat opacity-7 background-200 border-4 padding-10 background-origin'} uploadImageSrc={this.uploadImageSrc} />
                        </Card>
                    )}
                </div>
                <button className="userButton" style={{ marginLeft: 'auto', padding: '5px 10px', borderColor: 'green', color: 'green' }} onClick={() => this.addOneMore()}>
                    Add one more
                </button>
            </div>
        )
    }

    render() {
        let user = new User();
        if (typeof this.state.article.author === 'string') {
            user = this.props.User
        } else {
            user = this.state.article.author;
        }
        return (
            <div className={'cardeditor-container'}>
                <AuthorInfo showReadytoPublish={true} user={user} buttonText={'Save'} readyToPublish={() => this.onSave()}></AuthorInfo>
                {this.editForm()}
            </div>
        )
    }
}

const mapStateToProps = ({ User, Article, Category }) => ({
    User: User.User,
    Article: Article,
    categories: Category.categories
});

export default connect(
    mapStateToProps,
    {
        updateArticle,
        getArticle,
        updateReviewArticle
    }
)(Cardeditor);