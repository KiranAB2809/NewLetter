import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Featured from './featured.react';
import TopPicks from './toppicks.react';
import Articles from '../common/article.react';
import './home.css';
const Technical = 'Technical';
const General = 'General';
const DIDYOUKNOW = 'DID YOU KNOW';

class Home extends Component {

    goToArticle = (id, isBody) => {
        if (isBody)
            this.props.history.push('/cardeditor/false/' + id);
        else
            this.props.history.push('/article/' + id);
    }

    randomShuffle = (a) => {
        if (Array.isArray(a) && a.length > 0) {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
        }
        return a;
    }

    render() {
        let techFeatured;
        let generalFeatured;
        let completeList = [];
        let topPicks = [];
        let dId = ''
        if (this.props.categories && this.props.Articles && this.props.categories.length > 0 && this.props.Articles.length > 0) {
            let gId = this.props.categories.find(ele => ele.title === General)._id;
            let tId = this.props.categories.find(ele => ele.title === Technical)._id;
            dId = this.props.categories.find(ele => ele.title === DIDYOUKNOW)._id;
            let techArticles = [];
            let generalArticles = [];
            if (tId) {
                techArticles = this.props.Articles.find(ele => ele.category === tId) ? this.props.Articles.find(ele => ele.category === tId).articles : [];
                if (techArticles && techArticles.length > 0)
                    techFeatured = techArticles[0];
            }
            if (gId) {
                generalArticles = this.props.Articles.find(ele => ele.category === gId) ? this.props.Articles.find(ele => ele.category === gId).articles : [];
                if (generalArticles && generalArticles.length > 0)
                    generalFeatured = generalArticles[0];
            }
            if (dId) {
                let didyouknowArticles = Object.assign([], this.props.Articles.find(ele => ele.category === dId) ? this.props.Articles.find(ele => ele.category === dId).articles : []);
                if (Array.isArray(didyouknowArticles) && didyouknowArticles.length > 0) {
                    didyouknowArticles.map(ele => {
                        for (const rec of ele.list) {
                            topPicks.push(_.merge({}, rec, {
                                'author': ele.author,
                                'edited': ele.edited,
                                'modified': ele.modified
                            }));
                        }
                        return true;
                    });
                }
            }
            completeList = [...techArticles, ...generalArticles];
        }
        return (
            <div className="home-container">
                <div className="home-0">
                    <Featured additionalClass='height350' article={techFeatured} goToArticle={this.goToArticle} />
                    <TopPicks article={topPicks} id={dId} goToArticle={this.goToArticle} />
                    <Featured additionalClass='width26' article={generalFeatured} goToArticle={this.goToArticle} />
                </div>
                <hr style={{ width: '90%', border: '1px solid rgba(0,0,0,0.14)', margin: '15px auto' }} />
                <div className="home-1">
                    <Articles headername={'This Month'} articles={completeList} showAuthorInfo={true} navigateToArticle={this.goToArticle} />
                    {/* <Awards /> */}
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