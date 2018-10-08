import React, { Component } from 'react';
import './didyouknow.css';
import Kiran from './../../assets/images/Kiran.jpg';
import User from './../../assets/images/user.png';
import Background from './../../assets/images/DidYouKnow.jpg';


class DidYouKnow extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }
    render() {
        return (
            <div style={{ "marginTop": "18vh", "width": "100%", "display": "flex", "flexDirection": "row" }} >
                <div style={{ "position": "fixed" }} >
                    <DYKLeft />
                </div>
                <DYKRight />
            </div>
        )
    }
}

export default DidYouKnow;

class DYKLeft extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                <img src={Background} width="350px" height="521px" />
            </div>
        )
    }
}

class DYKRight extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div style={{ "marginLeft": "64vh", "marginRight": "2vh" }}>
                <div className="dyklist" >
                    <div className="dyklistHead">
                        <h5 className="dykContent">August has the highest percentage of births</h5>
                    </div>
                    <div className="dykheadlineImage">
                        <img src={User} style={{ "maxWidth": "200px", "maxHeight": "150px" }} />
                    </div>
                </div>
                <div className="dyklist" >
                    <div className="dyklistHead">
                        <h5 className="dykContent">Ralph Lauren's original name was Ralph Lifshitz</h5>
                    </div>
                    <div className="dykheadlineImage">
                        <img src={User} style={{ "maxWidth": "200px", "maxHeight": "150px" }} />
                    </div>
                </div>
                <div className="dyklist" >
                    <div className="dyklistHead">
                        <h5 className="dykContent">The 3 most common languages in the world are Mandarin Chinese, Spanish and English</h5>
                    </div>
                    <div className="dykheadlineImage">
                        <img src={User} style={{ "maxWidth": "200px", "maxHeight": "150px" }} />
                    </div>
                </div>
            </div>
        )
    }
}
