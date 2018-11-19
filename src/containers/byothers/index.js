import React, { Component } from 'react';
import './byothers.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getOtherUser, updateOtherUser, addUserToCurrentArticle } from '../../modules/actions'
import Overlay from '../common/overlay.react';
import OverlayCross from '../common/overlay.cross.react';
import Profile from '../common/profilecreate.react';
import { Article } from '../../models/article.class';

class ByOthers extends Component {

    state = {
        empId: '',
        isSearch: '',
        user: Object.assign({}, this.props.User.oUser),
        nextRoute: 'create'
    }

    constructor(props) {
        super(props);
        let type = this.props.match.params.type;
        if (type) {
            this.setState({ nextRoute: type });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.state.isSearch) {
            if (this.props.User.isFetching !== prevProps.User.isFetching) {
                this.setState({
                    isSearch: this.props.User.isFetching
                });
            }
        }
        if (this.state.user._id !== this.props.User.oUser._id) {
            this.setState({ user: Object.assign({}, this.props.User.oUser) });
        }
        if (this.props.match.params.type !== this.state.nextRoute) {
            let type = this.props.match.params.type;
            if (type) {
                this.setState({ nextRoute: type });
            }
        }
    }

    onChange = (event) => {
        this.setState({ empId: event.target.value });
    }

    onSearch = () => {
        if (this.state.empId) {
            this.setState({ isSearch: true });
            this.props.getOtherUser(this.state.empId);
        }
    }

    onInputChange = (event) => {
        const field = event.target.name;
        let user = Object.assign({}, this.state.user);
        user[field] = event.target.value;
        return this.setState({ user: user });
    }

    setImageSrc = (data) => {
        if (data.response && data.response.location) {
            let user = Object.assign({}, this.state.user);
            user.img = data.response.location;
            this.setState({ user: Object.assign({}, user) })
        }
    }

    onSave = () => {
        if (this.state.user._id) {
            let displayArticle = new Article();
            displayArticle.author = this.state.user;
            this.props.addUserToCurrentArticle({
                type: 'displayArticle',
                response: displayArticle
            });
            this.props.history.push("/" + this.state.nextRoute);
        } else {
            let user = Object.assign({}, this.state.user);
            this.props.updateOtherUser(user);
        }
    }

    empInputElement = () => {
        if (typeof this.state.isSearch === 'boolean') {
            let errorStatement = '';
            if (Object.keys(this.props.User.oUser).length > 0 && !this.props.User.oUser._id) {
                errorStatement = <div>User not found</div>
            }
            return (
                <div style={{ width: '500px', margin: 'auto' }}>
                    {errorStatement}
                    <Profile onImageUpload={this.setImageSrc} onInputChange={this.onInputChange} uniqueId={true} user={this.state.user}></Profile>
                    <div className={'flex flex-row'} style={{ width: '220px', justifyContent: 'space-between' }}>
                        <button className={'userButton'} style={{ borderColor: 'green', color: 'green' }} onClick={() => this.onSave()}>{this.state.user._id ? 'Ok' : 'Save'}</button>
                        <button className={'userButton'} style={{ borderColor: 'grey', color: 'grey' }} onClick={() => this.setState({ isSearch: '' })}>Cancel</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={'flex flex-column'} style={{ margin: 'auto', height: '200px', justifyContent: 'space-between' }}>
                    <input className={'input input-name width-100'} style={{ borderBottom: '1px solid grey' }} placeholder={'Emp ID'} onChange={(event) => this.onChange(event)} />
                    <button className={'userButton'} style={{ borderColor: 'green', color: 'green', width: '100px' }} onClick={() => this.onSearch()}>Search</button>
                </div>
            )
        }
    }

    render() {
        return (
            <Overlay className={'zindex-99'}>
                <OverlayCross></OverlayCross>
                {this.empInputElement()}
            </Overlay>
        )
    }
}

const mapStateToProps = ({ User }) => ({
    User: User
});

export default withRouter(connect(mapStateToProps, {
    getOtherUser,
    updateOtherUser,
    addUserToCurrentArticle
})(ByOthers));