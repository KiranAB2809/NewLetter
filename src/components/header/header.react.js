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
            <div>
                <View />
            </div>
        )
    }
}

export default Header;

class View extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="topDiv">
                <div className="positionRelative maxWidth height65 paddingHorizontal marginAuto justifyContent flexCenter zIndex500">
                    <div className="flex">
                        <div >
                            <img src={logo} width="60" height="55" />
                        </div>
                        <div className="title" style={{"marginLeft": "335px", "marginTop": "12px" }} >
                            <Link to="/">Dot Net Connect</Link>
                        </div>
                    </div>
                </div>
                <div className="positionRelative maxWidth height25 paddingHorizontal marginAuto justifyContent flexCenter zIndex500">
                    <nav role="navigation">
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
                                    <a href=""><Link to="/articles">Success</Link></a>
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
