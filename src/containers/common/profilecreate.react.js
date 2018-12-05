import React, { Component } from 'react';
import ImageUpload from './imageupload.react';
import { api } from '../../services';

class Profile extends Component {
    uploadImageSrc = (data) => {
        api.uploadUserImage(data)
            .then(data => this.props.onImageUpload(data))
            .catch(err => console.log(err));
    }

    render() {
        let { name, email, team, img, uniqueID } = this.props.user;
        img = img || 'http://segotn14123:85/static/defaultUser.png';
        let uniqueId = '';
        if (this.props.uniqueId) {
            uniqueId = <input name={'uniqueID'} value={uniqueID} placeholder={'Enter your ID'} className={'input input-name width-100'} onChange={(event) => this.props.onInputChange(event)}></input>
        }
        return (
            <div className={'flex flex-row name-div width-100'} style={{ padding: '30px 0' }}>
                <div className={'flex flex-column'} style={{ flex: '1 1' }}>
                    {uniqueId}
                    <input name={'name'} value={name} placeholder={'Enter your Name'} className={'input input-name width-100'} onChange={(event) => this.props.onInputChange(event)}></input>
                    <input name={'email'} value={email} placeholder={'Your email ID'} className={'input input-email'} onChange={(event) => this.props.onInputChange(event)}></input>
                    <input name={'team'} value={team} placeholder={'and you belong to team?....'} className={'input input-email'} onChange={(event) => this.props.onInputChange(event)}></input>
                </div>
                <ImageUpload uploadImageSrc={this.uploadImageSrc} doUpload={true} editImage={true} className={'avatar-image default-image width-100px height-100 background-100 opacity-7'} img={img} />
            </div>
        )
    }
}

export default Profile;