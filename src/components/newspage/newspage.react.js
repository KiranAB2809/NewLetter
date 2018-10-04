import React, { Component } from 'react';
import './newspage.css';
import logo from './../../assets/images/volvoLogo.jpg';
import himalaya from './../../assets/images/Himalayas.jpeg';
import kiran from './../../assets/images/Kiran.jpg';

class Article extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }
    render() {
        return (
            <div style={{ "marginTop": "18vh", "width": "100%" }} >
                <ArticleHead />
                <ArticleBody />
            </div>
        )
    }
}

export default Article;

class ArticleHead extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="paddingHorizontalBody marginAutoBody">
                <div className="pageHead">
                    <div className="articleHead" >
                        <h1 className="articleHeadMain">This Is How Men Forget Women</h1>
                        <p className="articleHeadSub articleHeadSubSize">Judge Kavanaugh was fighting for his reputation. Dr. Ford was fighting to be remembered.</p>
                        <div className="articleAuthor">
                            <div className="avatar">
                                <img src={kiran} className="avatar-image-small avatar-image" />
                            </div>
                            <div className="articleHeadSub articleHeadSubAuthorSize" style={{display:"flex", flexDirection:"column"}}>
                                <p style={{"margin":"0"}}>Kiran AB</p>
                                <p style={{"margin":"0"}}>A242231</p>
                            </div>                            
                        </div>
                    </div>
                    <div className="articleHeadImage">
                        <img src={himalaya} style={{"maxWidth":"485px", "maxHeight":"600px"}} />
                    </div>
                </div>
            </div>
        )
    }
}

class ArticleBody extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="windowFitBody" >
                It was the laughing, she said, that she couldn’t forget. Christine Blasey Ford, in testimony lauded on both sides of the political aisle as credible and moving, told the Senate Judiciary Committee on September 27 that the amusement of her tormentors was the most lasting memory of the sexual attack she alleges Brett Kavanaugh committed in 1982.
                “They were laughing with each other,” she said through tears, “two friends having a…
            </div>
        )
    }
}