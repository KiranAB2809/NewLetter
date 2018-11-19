import React, { Component } from 'react';
import { connect } from 'react-redux';
import './article.css';
import SideList from './sidelist.react';
import AuthorInfo from '../common/authorinfo.react';
import { getArticle } from '../../modules/actions';

class Article extends Component {

    state = {
        Article: {}
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getArticle(id);
    }

    displayArticle = () => {
        if (Object.keys(this.props.Article).length > 0)
            return (
                <div className="article-container">
                    <SideList />
                    <div className={'article-u1'}>
                        <AuthorInfo user = {this.props.Article.author}/>
                        <div>
                            <h1>{this.props.Article.title}</h1>
                        </div>
                        <div className={'article-body'} dangerouslySetInnerHTML={{__html : this.props.Article.body}}>
                            
                        </div>
                    </div>
                </div>
            );
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

const mapStateToProps = ({ Article }) => ({
    Article: Article.displayArticle
})

export default connect(
    mapStateToProps,
    {
        getArticle
    }
)(Article);