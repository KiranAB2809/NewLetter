import React, { Component } from 'react';
import './article.css';
import Logo from './../../assets/images/Kiran.jpg';
import ArticleBanner from './../../assets/images/Himalayas.jpeg';

class Article extends Component {
    render() {
        return (
            <div className="article-container">
                <div>
                    t1
                </div>
                <div className={'article-u1'}>
                    <div className={'author-detail'}>
                        <div className={'image'}>
                            <img src={Logo} className={'author-image avatar-image'}></img>
                        </div>
                        <div className={'author-desc'}>
                            <p className={'pname'}>
                                Kiran AB
                            </p>
                            <p className={'pother'}>
                                kiran.ab@volvo.com - MAS/DCL team
                            </p>
                            <p className={'pother'}>
                                Oct 8 - Reported by Bala
                            </p>
                        </div>
                    </div>
                    <div>
                        <h1>The Electrified Third “Data” Rail — How Data is Powering the Fourth Industrial Revolution</h1>
                    </div>
                    <div>
                        <img src={ArticleBanner} className={'banner'} />
                    </div>
                    <div>
                        <p>
                            It was the laughing, she said, that she couldn’t forget. Christine Blasey Ford, in testimony lauded on both sides of the political aisle as credible and moving, told the Senate Judiciary Committee on September 27 that the amusement of her tormentors was the most lasting memory of the sexual attack she alleges Brett Kavanaugh committed in 1982.
                            “They were laughing with each other,” she said through tears, “two friends having a…
                            It was the laughing, she said, that she couldn’t forget. Christine Blasey Ford, in testimony lauded on both sides of the political aisle as credible and moving, told the Senate Judiciary Committee on September 27 that the amusement of her tormentors was the most lasting memory of the sexual attack she alleges Brett Kavanaugh committed in 1982.
                            “They were laughing with each other,” she said through tears, “two friends having a…
                            It was the laughing, she said, that she couldn’t forget. Christine Blasey Ford, in testimony lauded on both sides of the political aisle as credible and moving, told the Senate Judiciary Committee on September 27 that the amusement of her tormentors was the most lasting memory of the sexual attack she alleges Brett Kavanaugh committed in 1982.
                            “They were laughing with each other,” she said through tears, “two friends having a…
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Article;