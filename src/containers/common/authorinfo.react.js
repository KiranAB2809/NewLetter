import React from 'react';
import './common.css';
// import Logo from './../../assets/images/Kiran.jpg';

class AuthorInfo extends React.Component {

    readyToPublish = () => {
        if (this.props.showReadytoPublish) {
            return (
                <button className="userButton" style={{ marginLeft: 'auto', padding: '5px 10px', borderColor: 'green', color: 'green' }} onClick={this.props.readyToPublish}>
                    {this.props.buttonText}
                </button>
            )
        }
        return null;
    }
    render() {
        let { name, email, team, img } = this.props.user;
        return (
            <div className={'author-detail'}>
                <div className={'image'}>
                    <img src={ img || 'http://localhost:8000/static/defaultUser.png'} className={'author-image avatar-image'}></img>
                </div>
                <div className={'author-desc'}>
                    <p className={'pname'}>
                        {name || 'Anyonoums'}
                </p>
                    <p className={'pother'}>
                        {(email || 'Seriously emailID?') + ' - ' + (team || 'Anyonomus Team') }
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