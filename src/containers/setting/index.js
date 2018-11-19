import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../modules/actions'
import './setting.css';
import { api } from '../../services';
import ImageUpload from '../common/imageupload.react';

class Setting extends Component {

    constructor(props) {
        super(props);
        this.imageRef = React.createRef();
        this.state = {
            user: Object.assign({}, this.props.User)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ user: Object.assign(nextProps.User) });
    }

    onInputChange = (event) => {
        const field = event.target.name;
        let user = Object.assign({}, this.state.user);
        user[field] = event.target.value;
        return this.setState({ user: user });
    }

    onSave = () => {
        console.log(this.state.user);
        this.props.updateUser(this.state.user);
    }

    setImageSrc = (data) => {
        if(data.response && data.response.location){
            let user = Object.assign({}, this.state.user);
            user.img = data.response.location;
            this.setState({user: Object.assign({}, user)})
        }
    }

    // setLocation = (loc) => {
    //     if (loc.response && loc.response.location) {
    //         let user = Object.assign({}, this.state.user);
    //         user.img = loc.response.location;
    //         return this.setState({ user: user });
    //     }
    // }

    render() {
        return (
            <div className={'flex flex-column setting-container'}>
                <Profile onInputChange={this.onInputChange} user={this.state.user} onImageUpload={this.setImageSrc} />
                <div className={'flex flex-row'} style={{ width: '220px', justifyContent: 'space-between' }}>
                    <button className={'userButton'} style={{ borderColor: 'green', color: 'green' }} onClick={() => this.onSave()}>Save</button>
                    <button className={'userButton'} style={{ borderColor: 'grey', color: 'grey' }}>Cancel</button>
                </div>
            </div>
        )
    }
}

class Profile extends Component {

    uploadImageSrc = (data) => {
        api.uploadUserImage(data)
            .then(data => this.props.onImageUpload(data))
            .catch(err => console.log(err));
    }

    render() {
        let { name, email, team, img } = this.props.user;
        img = img || 'http://localhost:8000/static/defaultUser.png';
        return (
            <div className={'flex flex-row name-div width-100'} style={{ padding: '30px 0' }}>
                <div className={'flex flex-column'} style={{ flex: '1 1' }}>
                    <input name={'name'} value={name} placeholder={'Enter your Name'} className={'input input-name width-100'} onChange={(event) => this.props.onInputChange(event)}></input>
                    <input name={'email'} value={email} placeholder={'Your email ID'} className={'input input-email'} onChange={(event) => this.props.onInputChange(event)}></input>
                    <input name={'team'} value={team} placeholder={'and you belong to team?....'} className={'input input-email'} onChange={(event) => this.props.onInputChange(event)}></input>
                </div>
                <ImageUpload uploadImageSrc={this.uploadImageSrc} doUpload={true} editImage={true} className={'avatar-image default-image width-100px height-100 background-100 opacity-7'} img={img} />
            </div>
        )
    }
}

const mapStateToProps = ({ User }) => ({
    User: User.User
});


export default connect(
    mapStateToProps,
    {
        updateUser
    }
)(Setting);