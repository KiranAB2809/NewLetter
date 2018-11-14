import React, { Component } from 'react';
import './home.css';
// import logo from './../../assets/images/volvoLogo.jpg';


class Featured extends Component {

    renderOndata = () => {
        if (this.props.article) {
            let { _id, title, subtitle, coverImage, author, edited, modified } = this.props.article;
            return (
                <div className="featured">
                    <div>
                        <img src={coverImage} className="featuredImage" />
                    </div>
                    <div style={{ margin: '20px 0' }}>
                        <h3 className="headerh3 height18" style={{ WebkitBoxOrient: 'vertical' }} onClick = {() => this.props.goToArticle(_id)}>{title}</h3>
                        <p className="player" style={{ color: '#777777', fontSize: '15px' }}>{subtitle}</p>
                        <div style={{ marginTop: '20px' }}>
                            <p className="player" style={{ color: '#000000' }}>{author.name}</p>
                            <p className="player" style={{ color: '#777777', fontSize: '13px' }}>Nov 13 - Edited by {edited.name}</p>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div>
                No data
            </div>
        )
    }

    render() {
        return (
            <div className={`homeDiv ${this.props.additionalClass}`}>
                {this.renderOndata()}
            </div>
        )
    }
}

export default Featured;