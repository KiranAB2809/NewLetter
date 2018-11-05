import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../modules/actions'
import './setting.css';
import Overlay from '../common/overlay.react';
import Logo from './../../assets/images/defaultUser.png';

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
        this.props.updateUser(this.state.user);
    }

    render() {
        return (
            <div className={'flex flex-column setting-container'}>
                <Profile onInputChange={this.onInputChange} user={this.state.user} />
                {/* For editor to add extra images
                <div className={'flex flex-column width-100'} style={{margin: '5px 0'}}>
                    <Profile />
                </div> */}
                <div className={'flex flex-row'} style={{ width: '220px', justifyContent: 'space-between' }}>
                    <button className={'userButton'} style={{ borderColor: 'green', color: 'green' }} onClick={() => this.onSave()}>Save</button>
                    <button className={'userButton'} style={{ borderColor: 'grey', color: 'grey' }}>Cancel</button>
                </div>
            </div>
        )
    }
}

class Profile extends Component {

    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }

    componentDidMount() {
        this.inputRef.current.onchange = () => this.onImageUpload();
    }

    onImageClick = () => {
        this.inputRef.current.click();
    }

    onImageUpload = () => {
        let file = this.inputRef.current.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            let data = reader.result;
        };
        reader.readAsDataURL(file);
    };

    render() {
        let { name, email, team, img } = this.props.user;
        return (
            <div className={'flex flex-row name-div width-100'} style={{ padding: '30px 0' }}>
                <div className={'flex flex-column'} style={{ flex: '1 1' }}>
                    <input name={'name'} value={name} placeholder={'Enter your Name'} className={'input input-name width-100'} onChange={(event) => this.props.onInputChange(event)}></input>
                    <input name={'email'} value={email} placeholder={'Your email ID'} className={'input input-email'} onChange={(event) => this.props.onInputChange(event)}></input>
                    <input name={'team'} value={team} placeholder={'and you belong to team?....'} className={'input input-email'} onChange={(event) => this.props.onInputChange(event)}></input>
                </div>
                <div className={'avatar-image default-image'} style={{ width: '100px', height: '100px', backgroundImage: `url(${Logo})`, backgroundSize: '100px 100px', position: "relative", opacity: 0.7 }}>
                    <div className={'flex'} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 'inherit', backgroundColor: 'rgba(0,0,0,0.64)', cursor: 'pointer' }} onClick={() => this.onImageClick()}>
                        <i className="fas fa-camera" style={{ margin: 'auto', color: 'white', fontSize: '35px' }}></i>
                    </div>
                    <input type="file" id="my_file" style={{ display: "none" }} ref={this.inputRef} accept={'.png, .jpg, .jpeg, .gif'} />
                </div>
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