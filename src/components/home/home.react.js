import React, { Component } from 'react';
import './home.css';
import logo from './../../assets/images/volvoLogo.jpg';
import { Link } from 'react-router-dom';
// import moment from 'moment';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }
    render() {
        return (
            <div style={{ "marginTop": "18vh", "width": "100%" }} >
                <Body />
            </div>
        )
    }
}

export default Home;


class Body extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="paddingHorizontalBody marginAutoBody">
                <div className="flexRow">
                    <div className="flexcol">
                        <Link to='/article'>
                            <div className="cardImportant">
                                <img src={logo} className="newsImageImportant" />
                                <div className="newsContent">
                                    <div className="newsHead">
                                        <h3>Jeff Flake Explains Himself</h3>
                                    </div>
                                    <div className="newsBody">The Arizona Republican’s dramatic call for further FBI review came because he felt the Senate was “coming apart at the seams.”</div>
                                    <div className="newsAuthor">Kiran AB</div>
                                    <div className="newsDate">Oct 1 2018</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="flexcol">
                        <Link to='/article'>
                            <div className="card">
                                <img src={logo} className="newsImage" />
                                <div className="newsContent">
                                    <div className="newsHead maxHeight">How to Save Higher Education</div>
                                    <div className="newsBody maxHeight width36vh">A polemic on simple Solution and tough</div>
                                    <div className="newsAuthor">Kiran AB</div>
                                    <div className="newsDate">Sep 28 2018</div>
                                </div>
                            </div>
                        </Link>
                        <Link to='/article'>
                            <div className="card">
                                <img src={logo} className="newsImage" />
                                <div className="newsContent">
                                    <div className="newsHead maxHeight">How to Save Higher Education</div>
                                    <div className="newsBody maxHeight width36vh">A polemic on simple Solution and tough</div>
                                    <div className="newsAuthor">Kiran AB</div>
                                    <div className="newsDate">Sep 28 2018</div>
                                </div>
                            </div>
                        </Link>
                        <Link to='/article'>
                            <div className="card">
                                <img src={logo} className="newsImage" />
                                <div className="newsContent">
                                    <div className="newsHead maxHeight">How to Save Higher Education</div>
                                    <div className="newsBody maxHeight width36vh">A polemic on simple Solution and tough</div>
                                    <div className="newsAuthor">Kiran AB</div>
                                    <div className="newsDate">Sep 28 2018</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="flexcol">
                        <Link to='/article'>
                            <div className="card">
                                <img src={logo} className="newsImage" />
                                <div className="newsContent">
                                    <div className="newsHead maxHeight">How to Save Higher Education</div>
                                    <div className="newsBody maxHeight width36vh">A polemic on simple Solution and tough</div>
                                    <div className="newsAuthor">Kiran AB</div>
                                    <div className="newsDate">Sep 28 2018</div>
                                </div>
                            </div>
                        </Link>
                        <Link to='/article'>
                            <div className="card">
                                <img src={logo} className="newsImage" />
                                <div className="newsContent">
                                    <div className="newsHead maxHeight">How to Save Higher Education</div>
                                    <div className="newsBody maxHeight width36vh">A polemic on simple Solution and tough</div>
                                    <div className="newsAuthor">Kiran AB</div>
                                    <div className="newsDate">Sep 28 2018</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}