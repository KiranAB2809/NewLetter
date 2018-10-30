import React from 'react';
import './common.css';
import Logo from './../../assets/images/Kiran.jpg';

class AuthorInfo extends React.Component {

    readyToPublish = () => {
        if (this.props.showReadytoPublish) {
            return (
                <button className="userButton" style={{ marginLeft: 'auto', padding: '5px 10px' }} onClick={this.props.readyToPublish}>
                    Ready to publish?
                </button>
            )
        }
        return null;
    }
    render() {
        return (
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
                {this.readyToPublish()}
            </div>
        )
    }
}

export default AuthorInfo;