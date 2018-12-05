import React, { Component } from 'react';
import { connect } from 'react-redux';
import './article.css';
import SideList from './sidelist.react';
import AuthorInfo from '../common/authorinfo.react';
import { withRouter } from 'react-router-dom';
import { getArticle } from '../../modules/actions';

class Article extends Component {

    state = {
        Article: {},
        articleId: ''
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getArticle(id);
        this.setState({ articleId: id });
    }

    componentDidUpdate() {
        if (this.state.articleId !== this.props.match.params.id) {
            this.setState({ articleId: this.props.match.params.id });
            this.props.getArticle(this.props.match.params.id);
        }
    }

    navigateToArticle = (id) => {
        this.props.history.push('/article/' + id);
    }

    displayArticle = () => {
        if (Object.keys(this.props.Article).length > 0) {
            let image = 'http://segotn14123:85/static/edit.gif';
            let articles = [];
            if (Array.isArray(this.props.categories) && this.props.categories.length > 0) {
                let category = this.props.categories.find(ele => ele._id === this.props.Article.category);
                if (typeof category === 'object') {
                    image = category.coverImage || image;
                }
            }
            if (Array.isArray(this.props.articles) && this.props.articles.length > 0) {
                let data = this.props.articles.find(obj => obj.category === this.props.Article.category);
                if (typeof data === 'object' && data.articles && data.articles.length > 0) {
                    articles = data.articles.filter(obj => obj._id !== this.props.Article._id);
                    articles = articles.splice(0, 3);
                }
            }
            let modifiedDate = this.props.Article.modified || new Date().toISOString();
            return (
                <div className="article-container">
                    <SideList coverImage={image} articles={articles} navigateToArticle={this.navigateToArticle} />
                    <div className={'article-u1'}>
                        <AuthorInfo user={this.props.Article.author} editor={this.props.Article.edited} date={modifiedDate} />
                        <div>
                            <h1>{this.props.Article.title}</h1>
                        </div>
                        <div className={'article-body'} dangerouslySetInnerHTML={{ __html: this.props.Article.body }}>

                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }

    render() {
        return (
            <div>
                {this.displayArticle()}
            </div>
        );
    }
}

const mapStateToProps = ({ Article, Category }) => ({
    Article: Article.displayArticle,
    categories: Category.categories,
    articles: Article.Articles
})

export default withRouter(connect(
    mapStateToProps,
    {
        getArticle
    }
)(Article));