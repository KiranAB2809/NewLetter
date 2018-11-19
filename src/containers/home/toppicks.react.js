import React, { Component } from 'react';
import Row from '../common/rows.react';


class TopPicks extends Component {

    navigateToPage = (id) => {
        if(this.props.id && typeof this.props.goToArticle === 'function'){
            this.props.goToArticle(this.props.id, true);
        }
    }

    renderGist = () => {
        if (Array.isArray(this.props.article))
            return (
                this.props.article.map(ele => <Row key={ele._id} article={ele} height={'height100'} showAuthorInfo={true} navigateToArticle={this.navigateToPage}/>)
            );
        return (
            <div>
                No top picks
            </div>
        );
    }

    render() {
        return (
            <div className="homeDiv-1">
                {this.renderGist()}
            </div>
        )
    }
}

export default TopPicks;