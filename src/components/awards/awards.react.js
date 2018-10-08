import React, { Component } from 'react';
import './awards.css';
import Kiran from './../../assets/images/Kiran.jpg';
import User from './../../assets/images/user.png';
import Background from './../../assets/images/Achievement.jpg';
import BGM from './../../assets/images/BGM.jpg';
import BGM1 from './../../assets/images/BGM1.jpg';
import BGM2 from './../../assets/images/BGM2.jpg';

class Awards extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }
    render() {
        return (
            <div style={{ "marginTop": "18vh", "width": "100%", "display": "flex", "flexDirection": "row" }} >
                <div style={{ "position": "fixed" }} >
                    <AwardImg />
                </div>
                <AwardsList />
            </div>
        )
    }
}

export default Awards;

class AwardImg extends Component {
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

class AwardsList extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div style={{ "marginLeft": "64vh", "marginRight": "2vh" }}>
                <div className="awardlist" >
                    <div className="awardlistHead">
                        <h1 className="awardheadline">Barun Kumar Goel</h1>
                        <p className="awardsubHeadline awardsubHeadlineSize">A222983</p>
                        <h5 className="awardType">SPOT AWARD</h5>
                    </div>
                    <div className="awardheadlineImage">
                            <img src={User} style={{ "maxWidth": "200px", "maxHeight": "150px" }} className="awardheadline-image-big awardheadline-image" />
                    </div>
                </div>
                <div className="awardlist" >
                    <div className="awardlistHead">
                        <h1 className="awardheadline">Sachin P</h1>
                        <p className="awardsubHeadline awardsubHeadlineSize">A242231</p>
                        <h5 className="awardType">SPOT AWARD</h5>
                    </div>
                    <div className="awardheadlineImage">
                            <img src={User} style={{ "maxWidth": "200px", "maxHeight": "150px" }} className="awardheadline-image-big awardheadline-image" />
                    </div>
                </div>
                <div className="awardlist" style={{"backgroundImage": `url(${BGM2})` }} >
                    <div className="awardlistHead">
                        <h1 className="awardheadline">Kiran AB</h1>
                        <p className="awardsubHeadline awardsubHeadlineSize">A242231</p>
                        <h5 className="awardType">SPOT AWARD</h5>
                    </div>
                    <div className="awardheadlineImage">
                            <img src={Kiran} style={{ "maxWidth": "200px", "maxHeight": "200px" }} className="awardheadline-image-big awardheadline-image" />
                    </div>
                </div>
               
            </div>
        )
    }
}
