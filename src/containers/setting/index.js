import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../modules/actions'
import './setting.css';
import { api } from '../../services';
import Profile from '../common/profilecreate.react';

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

const mapStateToProps = ({ User }) => ({
    User: User.User
});


export default connect(
    mapStateToProps,
    {
        updateUser
    }
)(Setting);