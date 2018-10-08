import React, { Component } from 'react';
import './newslist.css';
import himalaya from './../../assets/images/Himalayas.jpeg';
import kiran from './../../assets/images/Kiran.jpg';
import tech from './../../assets/images/tech.png';
import { Link } from 'react-router-dom'

class ArticleList extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }
    render() {
        return (
            <div style={{ "marginTop": "18vh", "width": "100%", "display": "flex", "flexDirection": "row" }} >
                <div style={{ "position": "fixed" }} >
                    <ListLeft />
                </div>
                <ListArticle />
            </div>
        )
    }
}

export default ArticleList;

class ListLeft extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                <img src={tech} width="350px" height="521px" />
            </div>
        )
    }
}

class ListArticle extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div style={{ "marginLeft": "64vh", "marginRight": "2vh" }}>
                <Link to="/article">
                    <div className="articlelist">
                        <div className="listHead" >
                            <h5 className="headline">This Is How Men Forget Women</h5>
                            <p className="subHeadline subHeadlineSize">Judge Kavanaugh was fighting for his reputation. Dr. Ford was fighting to be remembered.</p>
                            <div className="author">
                                <div className="avatarHeadline">
                                    <img src={kiran} className="headline-image-small headline-image" />
                                </div>
                                <div className="subHeadline subHeadlineAuthorSize" style={{ display: "flex", flexDirection: "column" }}>
                                    <p style={{ "margin": "0" }}>Kiran AB</p>
                                    <p style={{ "margin": "0" }}>A242231</p>
                                </div>
                            </div>
                        </div>
                        <div className="headlineImage">
                            <img src={tech} style={{ "maxWidth": "200px", "maxHeight": "150px" }} />
                        </div>
                    </div>
                </Link>
                <Link to="/article">
                    <div className="articlelist">
                        <div className="listHead" >
                            <h5 className="headline">This Is How Men Forget Women</h5>
                            <p className="subHeadline subHeadlineSize">Judge Kavanaugh was fighting for his reputation. Dr. Ford was fighting to be remembered.</p>
                            <div className="author">
                                <div className="avatarHeadline">
                                    <img src={kiran} className="headline-image-small headline-image" />
                                </div>
                                <div className="subHeadline subHeadlineAuthorSize" style={{ display: "flex", flexDirection: "column" }}>
                                    <p style={{ "margin": "0" }}>Kiran AB</p>
                                    <p style={{ "margin": "0" }}>A242231</p>
                                </div>
                            </div>
                        </div>
                        <div className="headlineImage">
                            <img src={himalaya} style={{ "maxWidth": "200px", "maxHeight": "150px" }} />
                        </div>
                    </div>
                </Link>
                <Link to="/article">
                    <div className="articlelist">
                        <div className="listHead" >
                            <h5 className="headline">This Is How Men Forget Women</h5>
                            <p className="subHeadline subHeadlineSize">Judge Kavanaugh was fighting for his reputation. Dr. Ford was fighting to be remembered.</p>
                            <div className="author">
                                <div className="avatarHeadline">
                                    <img src={kiran} className="headline-image-small headline-image" />
                                </div>
                                <div className="subHeadline subHeadlineAuthorSize" style={{ display: "flex", flexDirection: "column" }}>
                                    <p style={{ "margin": "0" }}>Kiran AB</p>
                                    <p style={{ "margin": "0" }}>A242231</p>
                                </div>
                            </div>
                        </div>
                        <div className="headlineImage">
                            <img src={himalaya} style={{ "maxWidth": "200px", "maxHeight": "150px" }} />
                        </div>
                    </div>
                </Link>
                <Link to="/article">
                    <div className="articlelist">
                        <div className="listHead" >
                            <h5 className="headline">This Is How Men Forget Women</h5>
                            <p className="subHeadline subHeadlineSize">Judge Kavanaugh was fighting for his reputation. Dr. Ford was fighting to be remembered.</p>
                            <div className="author">
                                <div className="avatarHeadline">
                                    <img src={kiran} className="headline-image-small headline-image" />
                                </div>
                                <div className="subHeadline subHeadlineAuthorSize" style={{ display: "flex", flexDirection: "column" }}>
                                    <p style={{ "margin": "0" }}>Kiran AB</p>
                                    <p style={{ "margin": "0" }}>A242231</p>
                                </div>
                            </div>
                        </div>
                        <div className="headlineImage">
                            <img src={himalaya} style={{ "maxWidth": "200px", "maxHeight": "150px" }} />
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}