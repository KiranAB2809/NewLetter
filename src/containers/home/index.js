import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Featured from './featured.react';
import TopPicks from './toppicks.react';
import Articles from '../common/article.react';
import './home.css';
import Awards from './awards.react';
const DIDYOUKNOW = 'did you know';
const AWARDS = 'awards';

class Home extends Component {

    goToArticle = (id, isBody) => {
        if (isBody) {
            this.props.history.push('/cardeditor/false/' + id);
        }
        else
            this.props.history.push('/article/' + id);
    }

    prepareList = (source) => {
        let data = [];
        let randomShuffle = (a) => {
            if (Array.isArray(a) && a.length > 0) {
                for (let i = a.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [a[i], a[j]] = [a[j], a[i]];
                }
            }
            return a;
        }
        if (Array.isArray(source) && source.length > 0) {
            source.map(ele => {
                for (const rec of ele.list) {
                    data.push(_.merge({}, rec, {
                        'author': ele.author,
                        'edited': ele.edited,
                        'modified': ele.modified
                    }));
                }
                return true;
            });
            data = Object.assign([], randomShuffle(data));
        }
        return data;
    }

    selectFeaturedAtRandom = (compareSrc, list) => {
        let article;
        if (list.length > 0) {
            let index = Math.floor(Math.random() * (list.length - 1 + 1) + 0);
            console.log(index);
            if (typeof compareSrc === 'object' && list[index]._id !== compareSrc._id) {
                article = list[index];
            } else {
                index = Math.floor(Math.random() * (list.length - 1 + 1) + 0);
                article = list[index];
            }
        }
        return article;
    }

    render() {
        let featuredLeft;
        let featuredRight;
        let completeList = [];
        let topPicks = [];
        let awards = []
        let dId = '';
        let aId = '';
        if (this.props.categories && this.props.Articles && this.props.categories.length > 0 && this.props.Articles.length > 0) {
            this.props.Articles.forEach(element => {
                let category = this.props.categories.find(ele => ele._id === element.category);
                if (typeof category === 'object' && Object.keys(category).length > 0 && category.isBody) {
                    let list = Array.isArray(element.articles) ? element.articles : [];
                    completeList.push(...list);
                    let featured = element.articles.filter(ele => ele.featured === true);
                    if (Array.isArray(featured) && featured.length > 0){
                        for (const record of featured) {
                            switch (record.position) {
                                case 'left': featuredLeft = record;
                                    break;
                                case 'right': featuredRight = record;
                                    break;
                                default: break;
                            }
                        }
                    }
                } else if (!category.isBody && category.title) {
                    switch (category.title.toLowerCase()) {
                        case DIDYOUKNOW:
                            dId = category._id;
                            topPicks = this.prepareList(element.articles);
                            break;
                        case AWARDS:
                            aId = category._id;
                            awards = this.prepareList(element.articles);
                            break;
                        default:
                            break;
                    }
                }
            });
            if (completeList.length > 0) {
                if (typeof featuredLeft !== 'object') {
                    featuredLeft = this.selectFeaturedAtRandom(featuredRight, completeList);
                }
                if (typeof featuredRight !== 'object') {
                    featuredRight = this.selectFeaturedAtRandom(featuredLeft, completeList);
                }
            }
        }
        return (
            <div className="home-container">
                <div className="home-0">
                    <Featured additionalClass='height350' article={featuredLeft} goToArticle={this.goToArticle} />
                    <TopPicks article={topPicks} id={dId} goToArticle={this.goToArticle} />
                    <Featured additionalClass='width26' article={featuredRight} goToArticle={this.goToArticle} />
                </div>
                <hr style={{ width: '90%', border: '1px solid rgba(0,0,0,0.14)', margin: '15px auto' }} />
                <div className="home-1">
                    <Articles headername={'This Month'} articles={completeList} showAuthorInfo={true} navigateToArticle={this.goToArticle} />
                    <Awards defautImg={'http://segotn14123:85/static/defaultUser.png'} article={awards} id={aId} goToArticle={this.goToArticle} />
                </div>
            </div>
        );
    }
}

const mapsStateToProps = ({ Article, Category }) => ({
    Articles: Article.Articles,
    categories: Category.categories
});

export default withRouter(connect(
    mapsStateToProps,
    null
)(Home));