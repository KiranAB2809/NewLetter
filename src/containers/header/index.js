import React, { Component } from 'react';
import './header.css';
import logo from './../../assets/images/volvoLogo.jpg';
import {Link} from 'react-router-dom';
// import moment from 'moment';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }
    render() {
        return (
            <div className="topDiv">
                <div className="subDiv brandDiv">
                    <div className="positionRelative">
                        <img src = {logo} className = "brandLogo" alt="brand logo"/>
                    </div>
                    <div className="positionRelative title">
                        Dot Net Connect
                    </div>
                    <div className="positionRelative">
                        <button className="userButton">
                            Member
                        </button>
                    </div>
                </div>
                <div className="subDiv">
                    <nav>
                        <div className="flexTop">
                            <li>
                                <span className="navText">
                                    <a href=""><Link to="/">Home</Link></a>
                                </span>
                            </li>
                            <li>
                                <span className="navText">
                                    <a href=""><Link to="/articles">General</Link></a>
                                </span>
                            </li>
                            <li>
                                <span className="navText">
                                    <a href=""><Link to="/articles">Technical</Link></a>
                                </span>
                            </li>
                            <li>
                                <span className="navText">
                                    <a href="">Success Stories</a>
                                </span>
                            </li>
                            <li>
                                <span className="navText">
                                    <a href=""><Link to="/awards">Awards</Link></a>
                                </span>
                            </li>
                            <li>
                                <span className="navText">
                                    <a href=""><Link to="/didyouknow">Did You Know</Link></a>
                                </span>
                            </li>
                            <li>
                                <span className="navText">
                                    <a href=""><Link to="/articles">Archive</Link></a>
                                </span>
                            </li>
                        </div>
                    </nav>
                </div>
            </div>
        )
    }
}

export default Header;
